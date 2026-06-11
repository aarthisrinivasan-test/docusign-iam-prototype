import { useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecommendationBanner({ pairs }) {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-inkwell to-[#2D0070] text-white rounded-xl p-5 mb-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-48 h-full opacity-10">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="150" cy="30" r="80" fill="white"/>
          <circle cx="180" cy="100" r="50" fill="white"/>
        </svg>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-white/60 hover:text-white"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3 max-w-3xl">
        <div className="bg-cobalt rounded-lg p-2 shrink-0 mt-0.5">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold text-mist uppercase tracking-widest mb-1">
            AI Recommendation
          </p>
          <h3 className="font-semibold text-lg mb-1">
            You have {pairs.length} template pairs that can be unified
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Your US and EU templates for{" "}
            <span className="font-medium text-mist">
              {pairs.map(p => p.category).join(", ")}
            </span>{" "}
            cover the same workflow but are maintained separately. Docusign Workflow Builder can
            combine these into a single smart workflow with automatic regional routing — reducing
            maintenance overhead and signing errors.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/workflow-builder")}
              className="bg-cobalt hover:bg-cobalt-hover text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Try Workflow Builder free — 14 days
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/workflow-builder")}
              className="text-sm text-white/70 hover:text-white underline"
            >
              See how it works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}