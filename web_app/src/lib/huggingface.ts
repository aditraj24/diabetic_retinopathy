import { client, handle_file } from "@gradio/client";

export async function runDRInference(imageUrl: string): Promise<{ grade: number; confidence: number; allScores: number[] }> {
  const hfSpaceUrl = process.env.HF_SPACE_URL;
  const hfToken = process.env.HF_TOKEN;

  if (!hfSpaceUrl) {
    throw new Error("HF_SPACE_URL is not configured.");
  }

  const options = hfToken ? { token: hfToken as any } : {};

  // Retry logic for 503 Cold Start
  let attempt = 0;
  const maxAttempts = 3;

  while (attempt < maxAttempts) {
    try {
      const app = await client(hfSpaceUrl, options);
      const result = await app.predict("/gradio_predict", [handle_file(imageUrl)]);

      // Parse the response
      const data = result.data as any[];
      if (!data || data.length === 0) {
        throw new Error("HuggingFace returned empty data");
      }

      let allScores = [0, 0, 0, 0, 0];
      let topLabel = -1;
      let topConfidence = 0;

      // data[0] = "Grade 2: Moderate  (77.69% confidence)"
      if (typeof data[0] === 'string') {
        const gradeMatch = data[0].match(/Grade\s*(\d)/i);
        if (gradeMatch) {
            topLabel = parseInt(gradeMatch[1], 10);
        } else {
            // fallback if it just says "No DR" = Grade 0
            if (data[0].toLowerCase().includes("no dr")) topLabel = 0;
            else if (data[0].toLowerCase().includes("mild")) topLabel = 1;
            else if (data[0].toLowerCase().includes("moderate")) topLabel = 2;
            else if (data[0].toLowerCase().includes("severe")) topLabel = 3;
            else if (data[0].toLowerCase().includes("proliferative")) topLabel = 4;
        }

        const confMatch = data[0].match(/\(([\d.]+)%\s*confidence\)/i);
        if (confMatch) {
            topConfidence = parseFloat(confMatch[1]) / 100;
        }
      }

      // data[1] = "No DR: 3.64%\nMild: 2.52%\nModerate: 77.69%\nSevere: 12.66%\nProliferative DR: 3.49%"
      if (typeof data[1] === 'string') {
          const lines = data[1].split('\n');
          lines.forEach(line => {
              const [labelStr, pctStr] = line.split(':');
              if (labelStr && pctStr) {
                  const pct = parseFloat(pctStr) / 100;
                  const L = labelStr.trim().toLowerCase();
                  if (L.includes("no dr")) allScores[0] = pct;
                  else if (L.includes("mild")) allScores[1] = pct;
                  else if (L.includes("moderate")) allScores[2] = pct;
                  else if (L.includes("severe")) allScores[3] = pct;
                  else if (L.includes("proliferative")) allScores[4] = pct;
              }
          });
      }

      // Clean fallback if completely unparseable
      if (topLabel === -1) topLabel = 0;
      if (topConfidence === 0 && allScores[topLabel] > 0) {
          topConfidence = allScores[topLabel];
      } else if (topConfidence === 0) {
          topConfidence = 1.0;
          allScores[topLabel] = 1.0;
      }


      // Normalize scores if they don't sum to ~1 or are missing
      const sum = allScores.reduce((a,b)=>a+b, 0);
      if (sum > 0) {
          allScores = allScores.map(s => s / sum);
          topConfidence = allScores[topLabel];
      }

      return {
        grade: topLabel,
        confidence: topConfidence,
        allScores
      };
    } catch (error: any) {
      if (error.message?.includes("503") || error.status === 503) {
        attempt++;
        if (attempt >= maxAttempts) {
          throw new Error("Model is warming up, please try again in a moment.");
        }
        await new Promise((resolve) => setTimeout(resolve, 8000));
      } else {
        throw new Error(`Inference failed: ${error.message}`);
      }
    }
  }

  throw new Error("Unexpected end of inference loop.");
}
