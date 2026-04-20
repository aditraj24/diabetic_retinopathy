import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/User";
import { AnalysisModel } from "@/lib/models/Analysis";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { GRADE_MAP } from "@/lib/gradeSeverity";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;

  await connectDB();
  
  const user = await UserModel.findById((session.user as any).id).lean();
  if (!user) return null;

  // Aggregate stats
  const totalAnalyses = await AnalysisModel.countDocuments({ userId: user._id });
  
  const gradeDistribution = await AnalysisModel.aggregate([
    { $match: { userId: user._id } },
    { $group: { _id: "$grade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  
  const lastAnalysis = await AnalysisModel.findOne({ userId: user._id }).sort({ savedAt: -1 }).select("savedAt").lean();
  
  let mostCommonGrade = -1;
  let maxCount = 0;
  
  const distMap: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  gradeDistribution.forEach(g => {
    distMap[g._id] = g.count;
    if (g.count > maxCount) {
      maxCount = g.count;
      mostCommonGrade = g._id;
    }
  });

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase();

  return (
    <>
      <div className="-mx-6 -mt-8 mb-8" />
      
      <PageHeader title="Account Profile" subtitle="Manage your account preferences and view statistics." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm col-span-1 flex flex-col items-center">
           <div className="w-32 h-32 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-5xl font-bold mb-6">
             {initial}
           </div>
           <ProfileClient userId={user._id.toString()} username={user.username} initialName={user.displayName} />
           <p className="text-sm text-gray-500 mt-6">Member since {memberSince}</p>
        </div>
        
        <div className="col-span-1 lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <p className="text-sm font-medium text-gray-500 mb-1">Total Analyses</p>
                 <p className="text-3xl font-bold text-gray-900">{totalAnalyses}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <p className="text-sm font-medium text-gray-500 mb-1">Most Common</p>
                 <p className="text-xl font-bold text-gray-900 mt-1">
                   {mostCommonGrade !== -1 ? GRADE_MAP[mostCommonGrade].shortLabel : "N/A"}
                 </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <p className="text-sm font-medium text-gray-500 mb-1">Last Analysis</p>
                 <p className="text-lg font-bold text-gray-900 mt-2">
                   {lastAnalysis ? new Date(lastAnalysis.savedAt).toLocaleDateString() : "Never"}
                 </p>
              </div>
           </div>
           
           <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Grade Distribution</h3>
              <div className="space-y-4">
                 {[0, 1, 2, 3, 4].map(grade => {
                   const count = distMap[grade];
                   const pct = totalAnalyses > 0 ? (count / totalAnalyses) * 100 : 0;
                   const info = GRADE_MAP[grade];
                   return (
                     <div key={grade} className="flex items-center gap-4">
                       <div className="w-24 text-sm font-medium text-gray-700">{info.shortLabel}</div>
                       <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${info.barColor} rounded-full`} style={{ width: `${pct}%` }} />
                       </div>
                       <div className="w-12 text-right text-sm font-bold text-gray-900">{count}</div>
                     </div>
                   );
                 })}
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
