import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Star, MoreHorizontal, FileText, Users } from "lucide-react";
import { TEMPLATES, TEMPLATE_PAIRS } from "../data/templates";
import RecommendationBanner from "../components/RecommendationBanner";

const REGION_BADGE = {
  US: "bg-blue-100 text-blue-700",
  EU: "bg-purple-100 text-purple-700",
};

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(TEMPLATES.map(t => t.category))];
  const filtered = filter === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-inkwell">Templates</h1>
        <button className="flex items-center gap-2 bg-cobalt hover:bg-cobalt-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          New Template
        </button>
      </div>

      {/* AI Recommendation Banner */}
      <RecommendationBanner pairs={TEMPLATE_PAIRS} />

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat
                ? "bg-inkwell text-white"
                : "bg-ds-gray text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(template => (
          <div
            key={template.id}
            onClick={() => navigate(`/templates/${template.id}`)}
            className="border border-ds-border rounded-xl p-4 hover:border-cobalt hover:shadow-md cursor-pointer transition-all group bg-white"
          >
            {/* Document preview */}
            <div className="bg-ds-gray rounded-lg h-32 flex items-center justify-center mb-3 group-hover:bg-mist/20 transition-colors">
              <FileText size={40} className="text-gray-300 group-hover:text-cobalt transition-colors" />
            </div>

            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-semibold text-inkwell leading-snug">{template.name}</h3>
              <button className="text-gray-300 hover:text-yellow-400 shrink-0" onClick={e => e.stopPropagation()}>
                <Star size={15} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${REGION_BADGE[template.region]}`}>
                {template.region}
              </span>
              <span className="text-xs text-gray-400">{template.category}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Users size={12} />
                {template.usedCount} uses
              </span>
              <span>{template.documents.length} doc{template.documents.length > 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}