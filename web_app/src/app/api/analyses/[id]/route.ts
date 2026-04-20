import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { AnalysisModel } from "@/lib/models/Analysis";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const analysis = await AnalysisModel.findById(id).exec();

    if (!analysis) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (analysis.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(analysis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch analysis" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const analysis = await AnalysisModel.findById(id).exec();
    if (!analysis) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (analysis.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Attempt cloudinary delete
    await deleteFromCloudinary(analysis.cloudinaryPublicId);

    // Delete document
    await AnalysisModel.findByIdAndDelete(id).exec();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete analysis" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { notes } = body;

    if (typeof notes !== "string" || notes.length > 500) {
      return NextResponse.json({ error: "Invalid notes string." }, { status: 400 });
    }

    const analysis = await AnalysisModel.findById(id).exec();
    if (!analysis) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (analysis.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    analysis.notes = notes;
    await analysis.save();

    return NextResponse.json(analysis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update analysis" }, { status: 500 });
  }
}
