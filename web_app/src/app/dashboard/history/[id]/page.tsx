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
      <div className="mb-6">
        <Link href="/dashboard/history" className="text-sm font-medium text-neon-blue hover:text-cyan transition-colors flex items-center gap-1.5">
          <ArrowLeft size={14} />
          Back to History
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 glass-card p-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Analysis Review</h1>
          <p className="text-sm text-muted mt-1">Analysed on {dateStr}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-5/12 xl:w-1/2">
          <div className="glass-card p-3 h-full max-h-[600px] sticky top-24">
            <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-navy">
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
          <div className="glass-card p-6 sm:p-8">
            <div className="text-center mb-8">
              <GradeBadge grade={analysis.grade} size="lg" />
              <p className="mt-4 text-muted font-medium">
                Predicted with <span className="font-bold text-white">{(analysis.confidence * 100).toFixed(1)}%</span> confidence
              </p>
            </div>

            <ScoreDistribution scores={analysis.allScores} topGrade={analysis.grade} />
            
            <RecommendationCard grade={analysis.grade} />
            
            <div className="mt-8 border-t border-white/10 pt-8">
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
