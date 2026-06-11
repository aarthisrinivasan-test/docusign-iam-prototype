import { useNavigate } from "react-router-dom";
import { FileText, GitBranch, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { AGREEMENTS, TEMPLATES } from "../data/templates";

const STATUS_STYLE = {
  completed: "bg-green-100 text-green-700",
  sent: "bg-blue-100 text-blue-700",
  declined: "bg-red-100 text-red-700",
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-inkwell mb-6">Home</h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Templates", value: "8", icon: FileText, color: "text-cobalt" },
          { label: "Active Agreements", value: "2", icon: TrendingUp, color: "text-teal-500" },
          { label: "Workflows Available", value: "0", icon: GitBranch, color: "text-orange-400", trial: true },
          { label: "Team Members", value: "3", icon: Users, color: "text-purple-500" },
        ].map(s => (
          <div key={s.label} className="border border-ds-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</p>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-3xl font-bold text-inkwell">{s.value}</p>
            {s.trial && (
              <p className="text-xs text-cobalt mt-1 font-medium">Unlock with IAM →</p>
            )}
          </div>
        ))}
      </div>

      {/* IAM nudge */}
      <div
        onClick={() => navigate("/workflow-builder")}
        className="bg-gradient-to-r from-inkwell to-[#2D0070] text-white rounded-xl p-5 mb-8 flex items-center gap-4 cursor-pointer hover:opacity-95 transition-opacity"
      >
        <div className="bg-cobalt rounded-xl p-3 shrink-0">
          <Sparkles size={22} />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Your templates are ready for Workflow Builder</p>
          <p className="text-sm text-white/70 mt-0.5">
            4 US/EU template pairs detected. Combine them into smart workflows with automatic regional routing.
          </p>
        </div>
        <ArrowRight size={20} className="text-white/60 shrink-0" />
      </div>

      {/* Recent agreements */}
      <h2 className="text-base font-semibold text-inkwell mb-3">Recent Agreements</h2>
      <div className="border border-ds-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ds-gray border-b border-ds-border">
              {["Subject", "Recipient", "Status", "Sent", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AGREEMENTS.map(a => (
              <tr key={a.id} className="border-b border-ds-border last:border-0 hover:bg-ds-gray/50 transition-colors">
                <td className="px-4 py-3 font-medium text-inkwell">{a.subject}</td>
                <td className="px-4 py-3 text-gray-500">{a.recipient}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLE[a.status]}`}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{a.sent}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-cobalt text-xs hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}