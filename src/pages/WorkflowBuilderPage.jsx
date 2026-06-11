import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Plus, Settings } from "lucide-react";

// Node types
const NODE_TYPES = {
  trigger: { icon: "✏️", color: "bg-inkwell text-white" },
  form: { icon: "📋", color: "bg-white border border-ds-border" },
  condition: { icon: "👤", color: "bg-white border border-ds-border" },
  id_verify: { icon: "🪪", color: "bg-white border border-ds-border" },
  prepare: { icon: "📝", color: "bg-white border border-ds-border" },
  sign: { icon: "✍️", color: "bg-white border border-ds-border" },
  message: { icon: "💬", color: "bg-white border border-ds-border" },
  merge: { icon: "⊕", color: "bg-mist/30 border border-cobalt/30 rounded-full" },
  confirmation: { icon: "🖥️", color: "bg-white border border-ds-border" },
};

function WorkflowNode({ node, highlight }) {
  const type = NODE_TYPES[node.type] || NODE_TYPES.form;
  return (
    <div
      className={`${type.color} rounded-xl p-4 w-52 shadow-sm relative ${
        highlight ? "ring-2 ring-cobalt" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-lg">{type.icon}</span>
        <button className="text-gray-300 hover:text-gray-500">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <p className="text-sm font-medium text-inkwell leading-snug">{node.label}</p>
      {node.action && (
        <button className={`mt-3 w-full text-xs font-semibold py-1.5 rounded-lg ${
          node.action === "Configure"
            ? "bg-cobalt text-white hover:bg-cobalt-hover"
            : "border border-ds-border text-inkwell hover:bg-ds-gray"
        } transition-colors`}>
          {node.action}
        </button>
      )}
    </div>
  );
}

function Arrow({ vertical = true }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center`}>
      <div className={`${vertical ? "w-0.5 h-8" : "h-0.5 w-8"} bg-cobalt/40`} />
      <div className={`border-cobalt/60 ${
        vertical
          ? "border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent"
          : "border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent"
      } w-0 h-0`} />
    </div>
  );
}

export default function WorkflowBuilderPage() {
  const navigate = useNavigate();
  const [trialActive] = useState(true);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate("/templates")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-inkwell mb-4 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Templates
      </button>

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-inkwell">
          Account Opening — Global Workflow
        </h1>
        <div className="flex items-center gap-2">
          {trialActive && (
            <span className="bg-cobalt/10 text-cobalt text-xs font-semibold px-3 py-1.5 rounded-full">
              ✨ Workflow Builder Trial — 12 days remaining
            </span>
          )}
          <button className="p-2 rounded-lg hover:bg-ds-gray text-gray-500"><Settings size={18} /></button>
          <button className="bg-cobalt hover:bg-cobalt-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Publish Workflow
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-8">
        Combines <span className="font-medium text-inkwell">Account Opening - US Customer</span> and{" "}
        <span className="font-medium text-inkwell">Account Opening - EU Client</span> into a single
        smart workflow with automatic regional routing.
      </p>

      {/* Workflow canvas */}
      <div className="bg-[#F8F7FC] border border-ds-border rounded-2xl p-8 overflow-x-auto">
        <div className="flex flex-col items-center min-w-[900px]">

          {/* Trigger */}
          <WorkflowNode node={{ type: "trigger", label: "From a link" }} />
          <Arrow />

          {/* Step 1 */}
          <WorkflowNode node={{ type: "form", label: "Customer Selects Region", action: "Edit" }} />
          <Arrow />

          {/* Step 2 */}
          <WorkflowNode node={{ type: "condition", label: "Customer's Selected Region", action: "Edit" }} />

          {/* Three branches */}
          <div className="flex items-start gap-6 mt-2">
            {/* Left connector line */}
            <div className="flex flex-col items-center" style={{ marginTop: "-4px" }}>
              <div className="w-px h-6 bg-cobalt/40" />
            </div>
          </div>

          <div className="flex items-start gap-8 relative mt-0">
            {/* Branch line across top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-cobalt/30" style={{ top: "0px" }} />

            {/* USA Branch */}
            <div className="flex flex-col items-center gap-0">
              <Arrow />
              <div className="mb-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full">USA</div>
              <WorkflowNode node={{ type: "id_verify", label: "Verify US ID", action: "Configure" }} highlight />
              <Arrow />
              <WorkflowNode node={{ type: "prepare", label: "Prepare US Client Account Agreement", action: "Edit" }} />
              <Arrow />
              <WorkflowNode node={{ type: "sign", label: "Send US Agreement for Signature", action: "Configure" }} highlight />
              <Arrow />
              <div className="w-8 h-8 bg-cobalt rounded-lg flex items-center justify-center text-white">
                <Plus size={16} />
              </div>
            </div>

            {/* EU Branch */}
            <div className="flex flex-col items-center gap-0">
              <Arrow />
              <div className="mb-1 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-0.5 rounded-full">EU</div>
              <WorkflowNode node={{ type: "id_verify", label: "Verify ID for QES", action: "Configure" }} highlight />
              <Arrow />
              <WorkflowNode node={{ type: "prepare", label: "Prepare EU Client Account Agreement", action: "Edit" }} />
              <Arrow />
              <WorkflowNode node={{ type: "prepare", label: "Prepare GDPR Privacy Policy", action: "Edit" }} />
              <Arrow />
              <WorkflowNode node={{ type: "sign", label: "Send EU Documents for Signature", action: "Configure" }} highlight />
              <Arrow />
              <div className="w-8 h-8 bg-cobalt rounded-lg flex items-center justify-center text-white">
                <Plus size={16} />
              </div>
            </div>

            {/* No Conditions Branch */}
            <div className="flex flex-col items-center gap-0">
              <Arrow />
              <div className="mb-1 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">Other</div>
              <WorkflowNode node={{ type: "message", label: "Unsupported Region Message", action: "Edit" }} />
              <Arrow />
              <div className="w-8 h-8 bg-cobalt rounded-lg flex items-center justify-center text-white">
                <Plus size={16} />
              </div>
            </div>
          </div>

          {/* Merge node */}
          <div className="mt-4 flex flex-col items-center">
            <Arrow />
            <div className="w-10 h-10 rounded-full bg-mist/40 border-2 border-cobalt/30 flex items-center justify-center text-cobalt font-bold text-lg">
              ⊕
            </div>
            <Arrow />
            {/* Final step */}
            <WorkflowNode node={{ type: "confirmation", label: "Customer Confirmation Screen", action: "Edit" }} />
          </div>
        </div>
      </div>

      {/* IAM upgrade prompt */}
      <div className="mt-6 bg-gradient-to-r from-inkwell to-[#2D0070] text-white rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold">Unlock Workflow Builder permanently with IAM</p>
          <p className="text-sm text-white/70 mt-1">
            Get unlimited workflows, advanced conditions, audit trails, and workspace collaboration.
          </p>
        </div>
        <button className="bg-white text-inkwell text-sm font-semibold px-5 py-2 rounded-lg hover:bg-mist transition-colors shrink-0 ml-6">
          Upgrade to IAM →
        </button>
      </div>
    </div>
  );
}