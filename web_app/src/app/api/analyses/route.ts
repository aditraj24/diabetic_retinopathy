import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { AnalysisModel } from "@/lib/models/Analysis";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cloudinaryUrl, cloudinaryPublicId, grade, confidence, allScores, notes } = body;

    if (cloudinaryUrl == null || cloudinaryPublicId == null || grade == null || confidence == null || !allScores) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (grade < 0 || grade > 4) {
      return NextResponse.json({ error: "Invalid grade strictly between 0 and 4 expected." }, { status: 400 });
    }

    await connectDB();

    const newAnalysis = new AnalysisModel({
      userId: new mongoose.Types.ObjectId((session.user as any).id),
      cloudinaryUrl,
      cloudinaryPublicId,
      grade,
      confidence,
      allScores,
      notes: notes || "",
    });

    const saved = await newAnalysis.save();

    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save analysis." }, { status: 500 });
  }
}
