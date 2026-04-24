import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { AnalysisModel } from "@/lib/models/Analysis";
import { GradeBadge } from "@/components/analysis/GradeBadge";
import { ScoreDistribution } from "@/components/analysis/ScoreDistribution";
import { RecommendationCard } from "@/components/analysis/RecommendationCard";
import DetailClientComponents from "./DetailClientComponents";
import { ArrowLeft } from "lucide-react";

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return notFound();
  }

  await connectDB();
  
  let analysis;
  try {
    analysis = await AnalysisModel.findById(id).lean();
  } catch (err) {
    return notFound();
  }

  if (!analysis || analysis.userId.toString() !== (session.user as any).id) {
    return notFound();
  }

  const dateStr = new Date(analysis.savedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <div className="mb-5">
        <Link 
          href="/dashboard/history" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          Back to History
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 bg-white border border-gray-200 rounded-md p-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Analysis Review</h1>
          <p className="text-xs text-gray-500 mt-0.5">Analysed on {dateStr}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-5/12 xl:w-1/2">
          <div className="bg-white border border-gray-200 rounded-md p-3 h-full max-h-[600px] sticky top-24">
            <div className="relative w-full h-full min-h-[400px] rounded-sm overflow-hidden bg-gray-50">
              <Image 
                src={analysis.cloudinaryUrl} 
                alt="Retinal Image" 
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 xl:w-1/2">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <div className="text-center mb-6">
              <GradeBadge grade={analysis.grade} size="lg" />
              <p className="mt-3 text-sm text-gray-600">
                Predicted with <span className="font-semibold text-gray-900">{(analysis.confidence * 100).toFixed(1)}%</span> confidence
              </p>
            </div>

            <ScoreDistribution scores={analysis.allScores} topGrade={analysis.grade} />
            
            <RecommendationCard grade={analysis.grade} />
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <DetailClientComponents 
                analysisId={id} 
                initialNotes={analysis.notes || ""} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}