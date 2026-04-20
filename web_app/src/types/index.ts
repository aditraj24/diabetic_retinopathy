export interface GradeInfo {
  label: string;
  color: string;
  recommendation: string;
  urgency: "routine" | "soon" | "urgent" | "emergency" | "watch";
}

export interface AnalysisResult {
  grade: number;
  confidence: number;
  allScores: number[];
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
}

export interface SavedAnalysis {
  _id: string;
  userId: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  grade: number;
  confidence: number;
  allScores: number[];
  notes: string;
  savedAt: string;
}

export interface UserSession {
  id: string;
  username: string;
  displayName?: string;
}
