import { useState } from "react";
import { Users, FileText, MessageSquare, Clock, Plus, ArrowRight, Sparkles } from "lucide-react";
import { TEMPLATES } from "../data/templates";
import { useNavigate } from "react-router-dom";

const COLLABORATORS = [
  { initials: "AS", name: "Aarthi Srinivasan", role: "Owner", color: "bg-cobalt" },
  { initials: "JW", name: "James Wu", role: "Editor", color: "bg-purple-500" },
  { initials: "SM", name: "Sara Malik", role: "Viewer", color: "bg-teal-500" },
];

const ACTIVITY = [
  { user: "AS", action: "updated signing order in", target: "Account Opening - US Customer", time: "2 hours ago" },
  { user: "JW", action: "added GDPR clause to", target: "Vendor Agreement - EU Enterprise", time: "Yesterday" },
  { user: "SM", action: "commented on", target: "Employment Contract - EU", time: "2 days ago" },
  { user: "AS", action: "created workflow for", target: "Account Opening - Global", time: "3 days ago" },
];

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-inkwell">Workspace</h1>
          <p className="text-sm text-gray-500 mt-1">Collaborate on templates and envelopes with your team</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-cobalt/10 text-cobalt text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={12} /> Workspace Collaboration Trial — 14 days remaining
          </span>
          <button className="flex items-center gap-2 bg-cobalt hover:bg-cobalt-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} /> Invite Members
          </button>
        </div>
      </div>

      {/* Collaborators */}
      <div className="border border-ds-border rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Team Members</h2>
        <div className="flex items-center gap-4 flex-wrap">
          {COLLABORATORS.map(c => (
            <div key={c.initials} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${c.color} text-white text-sm font-semibold flex items-center justify-center`}>
                {c.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-inkwell">{c.name}</p>
                <p className="text-xs text-gray-400">{c.role}</p>
              </div>
            </div>
          ))}
          <button className="flex items-center gap-2 text-sm text-cobalt hover:underline ml-4">
            <Plus size={14} /> Add member
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-ds-border mb-6">
        {[
          { id: "templates", label: "Shared Templates", icon: FileText },
          { id: "activity", label: "Recent Activity", icon: Clock },
          { id: "comments", label: "Comments", icon: MessageSquare },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-cobalt text-cobalt"
                : "border-transparent text-gray-500 hover:text-inkwell"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "templates" && (
        <div>
          {/* IAM upsell for workspace */}
          <div className="bg-gradient-to-r from-[#EEE8FF] to-[#F5F0FF] border border-mist rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className="bg-cobalt rounded-lg p-2 shrink-0">
              <Users size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-inkwell">Unlock real-time co-editing with Workspaces</p>
              <p className="text-xs text-gray-600 mt-0.5">
                With Workspaces, your team can edit templates simultaneously, leave inline comments, and track
                every change with a full audit trail.
              </p>
            </div>
            <button
              onClick={() => navigate("/workspace/collaboration")}
              className="text-xs bg-cobalt text-white font-semibold px-4 py-2 rounded-lg hover:bg-cobalt-hover transition-colors shrink-0 flex items-center gap-1.5"
            >
              Learn more <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.slice(0, 6).map(t => (
              <div
                key={t.id}
                onClick={() => navigate(`/templates/${t.id}`)}
                className="border border-ds-border rounded-xl p-4 hover:border-cobalt hover:shadow-md cursor-pointer transition-all flex items-start gap-3"
              >
                <div className="bg-ds-gray rounded-lg p-2 shrink-0">
                  <FileText size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-inkwell leading-snug">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.documents.length} documents · {t.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-4">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-ds-border last:border-0">
              <div className={`w-8 h-8 rounded-full bg-cobalt text-white text-xs font-semibold flex items-center justify-center shrink-0`}>
                {a.user}
              </div>
              <div>
                <p className="text-sm text-inkwell">
                  <span className="font-medium">{COLLABORATORS.find(c => c.initials === a.user)?.name}</span>{" "}
                  {a.action}{" "}
                  <span className="font-medium text-cobalt">{a.target}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "comments" && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <MessageSquare size={40} className="mb-3 text-mist" />
          <p className="text-sm font-medium text-inkwell mb-1">Inline comments require IAM</p>
          <p className="text-xs text-gray-500 mb-4">Upgrade to leave comments directly on documents and templates.</p>
          <button className="bg-cobalt text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-cobalt-hover transition-colors">
            Try IAM free →
          </button>
        </div>
      )}

      {/* Upgrade banner */}
      <div className="mt-8 bg-gradient-to-r from-inkwell to-[#2D0070] text-white rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold">You're on a 14-day free trial of Workspace Collaboration</p>
          <p className="text-sm text-white/70 mt-1">
            Upgrade to IAM to keep real-time co-editing, inline comments, and full audit trails after your trial ends.
          </p>
        </div>
        <button className="bg-white text-inkwell text-sm font-semibold px-5 py-2 rounded-lg hover:bg-mist transition-colors shrink-0 ml-6">
          Upgrade to IAM →
        </button>
      </div>
    </div>
  );
}