import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { runDRInference } from "@/lib/huggingface";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/jpeg") && !file.type.startsWith("image/png")) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG and PNG are supported." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max size is 10MB." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const { secure_url, public_id } = await uploadToCloudinary(buffer, file.name);

    // Call HF inference
    const { grade, confidence, allScores } = await runDRInference(secure_url);

    return NextResponse.json({
      grade,
      confidence,
      allScores,
      cloudinaryUrl: secure_url,
      cloudinaryPublicId: public_id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process image." }, { status: 500 });
  }
}
