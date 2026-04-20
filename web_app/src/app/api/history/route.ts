import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { AnalysisModel } from "@/lib/models/Analysis";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const gradeParam = searchParams.get("grade");
    const searchParam = searchParams.get("search");

    await connectDB();

    const query: any = { userId: new mongoose.Types.ObjectId((session.user as any).id) };

    if (gradeParam && gradeParam !== "all") {
      query.grade = parseInt(gradeParam);
    }

    if (searchParam) {
      query.notes = { $regex: searchParam, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [analyses, total] = await Promise.all([
      AnalysisModel.find(query).sort({ savedAt: -1 }).skip(skip).limit(limit).exec(),
      AnalysisModel.countDocuments(query).exec()
    ]);

    return NextResponse.json({
      analyses,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch history" }, { status: 500 });
  }
}
