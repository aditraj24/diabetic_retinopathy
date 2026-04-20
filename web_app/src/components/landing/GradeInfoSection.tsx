import { GRADE_MAP } from "@/lib/gradeSeverity";

export function GradeInfoSection() {
  return (
    <div className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Understanding DR Grades</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The platform utilizes a 5-stage classification system for Diabetic Retinopathy severity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[0, 1, 2, 3, 4].map((grade) => {
            const info = GRADE_MAP[grade];
            return (
              <div key={grade} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className={`absolute top-0 left-0 w-full h-1 ${info.barColor}`}></div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${info.barColor}`}></span>
                  <span className="font-bold text-gray-500 text-sm tracking-widest uppercase">Grade {grade}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.label}</h3>
                
                <p className="text-sm text-gray-600 line-clamp-4">
                  {info.recommendation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
