import { useParams, useNavigate } from "react-router-dom";
import { Star, MoreHorizontal, FileText, ShieldCheck, PenLine, ArrowLeft, Sparkles } from "lucide-react";
import { TEMPLATES, TEMPLATE_PAIRS } from "../data/templates";

export default function TemplateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = TEMPLATES.find(t => t.id === id);
  const pair = template ? TEMPLATE_PAIRS.find(p => p.usId === id || p.euId === id) : null;
  const pairedTemplate = template?.pair ? TEMPLATES.find(t => t.id === template.pair) : null;

  if (!template) return <div className="p-8">Template not found</div>;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      {/* Back */}
      <button
        onClick={() => navigate("/templates")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-inkwell mb-4 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Templates
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-inkwell">{template.name}</h1>
          <button className="text-xs text-cobalt underline mt-1">Template ID</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-yellow-400 p-1"><Star size={20} /></button>
          <button
            onClick={() => {}}
            className="bg-cobalt hover:bg-cobalt-hover text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Use
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal size={20} /></button>
        </div>
      </div>

      {/* IAM Upsell Banner — shown when a paired template exists */}
      {pairedTemplate && (
        <div className="bg-gradient-to-r from-[#EEE8FF] to-[#F5F0FF] border border-mist rounded-xl p-4 mb-6 flex items-start gap-3">
          <div className="bg-cobalt rounded-lg p-1.5 shrink-0 mt-0.5">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-inkwell mb-0.5">
              Pair detected: <span className="text-cobalt">{pairedTemplate.name}</span>
            </p>
            <p className="text-xs text-gray-600 mb-2">
              Both templates serve the same purpose but for different regions. Workflow Builder can route
              signers automatically based on their location — no duplicate maintenance.
            </p>
            <button
              onClick={() => navigate("/workflow-builder")}
              className="text-xs bg-cobalt text-white font-semibold px-4 py-1.5 rounded-lg hover:bg-cobalt-hover transition-colors"
            >
              View combined workflow →
            </button>
          </div>
        </div>
      )}

      {/* Main content: two-column */}
      <div className="flex gap-6">
        {/* Left: recipients */}
        <div className="flex-1 border border-ds-border rounded-xl overflow-hidden">
          <div className="border-b border-ds-border">
            <div className="flex">
              <button className="px-6 py-3 text-sm font-medium border-b-2 border-cobalt text-cobalt">
                Recipients ({template.recipients.length})
              </button>
              <button className="px-6 py-3 text-sm text-gray-500 hover:text-inkwell">Details</button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 border border-ds-border rounded-lg px-4 py-2 w-fit mb-6 text-sm font-medium text-inkwell">
              <Users2Icon />
              Signing Order
            </div>

            {template.recipients.map((r, i) => (
              <div key={i} className="mb-4 pl-4 border-l-2 border-ds-border">
                <div className="flex items-start gap-3">
                  <div className="bg-ds-gray rounded-full p-1.5 mt-0.5">
                    <PersonIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-inkwell">{r.role}:</p>
                    <div className="flex items-start gap-2 mt-1">
                      <ShieldCheck size={14} className="text-cobalt mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-700">Authentication: {r.authType}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{r.authDetail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <PenLine size={13} className="text-cobalt" />
                    {r.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: documents */}
        <div className="w-64 shrink-0">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Documents</p>
          <div className="space-y-3">
            {template.documents.map((doc, i) => (
              <div key={i} className="border border-ds-border rounded-xl overflow-hidden hover:border-cobalt transition-colors cursor-pointer group">
                <div className="bg-ds-gray h-28 flex items-center justify-center group-hover:bg-mist/20 transition-colors">
                  <FileText size={32} className="text-gray-300 group-hover:text-cobalt transition-colors" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-inkwell leading-snug">{doc.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{doc.pages} pages</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Users2Icon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}