import mongoose, { Schema } from "mongoose";

export interface IAnalysis {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  grade: number;
  confidence: number;
  allScores: number[];
  notes: string;
  savedAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    cloudinaryUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    grade: { type: Number, required: true, min: 0, max: 4 },
    confidence: { type: Number, required: true },
    allScores: { 
      type: [Number], 
      required: true,
      validate: {
        validator: function(v: number[]) {
          return v.length === 5;
        },
        message: 'allScores must be an array of length 5'
      }
    },
    notes: { type: String, default: "" },
    savedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false
  }
);

analysisSchema.index({ userId: 1, savedAt: -1 });

export const AnalysisModel: mongoose.Model<IAnalysis> = mongoose.models.Analysis || mongoose.model<IAnalysis>("Analysis", analysisSchema);
