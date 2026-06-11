import { useState } from "react";
import { FileText, Clock, CheckCircle, XCircle, Send, Filter, Download } from "lucide-react";
import { AGREEMENTS, TEMPLATES } from "../data/templates";

const STATUS_META = {
  completed: { label: "Completed", style: "bg-green-100 text-green-700", icon: CheckCircle },
  sent:      { label: "Awaiting",  style: "bg-blue-100 text-blue-700",   icon: Clock },
  declined:  { label: "Declined",  style: "bg-red-100 text-red-700",     icon: XCircle },
};

const TABS = ["All", "Awaiting", "Completed", "Declined"];

export default function AgreementsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = AGREEMENTS.filter(a => {
    if (activeTab === "All") return true;
    return STATUS_META[a.status].label === activeTab;
  });

  const counts = {
    All: AGREEMENTS.length,
    Awaiting: AGREEMENTS.filter(a => a.status === "sent").length,
    Completed: AGREEMENTS.filter(a => a.status === "completed").length,
    Declined: AGREEMENTS.filter(a => a.status === "declined").length,
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-inkwell">Agreements</h1>
          <p className="text-sm text-gray-500 mt-0.5">{AGREEMENTS.length} total agreements</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-ds-border rounded-lg text-gray-600 hover:bg-ds-gray transition-colors">
            <Filter size={15} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-ds-border rounded-lg text-gray-600 hover:bg-ds-gray transition-colors">
            <Download size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-cobalt text-white rounded-lg hover:bg-cobalt-hover transition-colors font-medium">
            <Send size={15} />
            Send Agreement
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Awaiting Signature", value: counts.Awaiting, icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Completed",          value: counts.Completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Declined",           value: counts.Declined,  icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
        ].map(s => (
          <div key={s.label} className="border border-ds-border rounded-xl p-4 flex items-center gap-4">
            <div className={`${s.bg} p-3 rounded-xl`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-inkwell">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + Table */}
      <div className="border border-ds-border rounded-xl overflow-hidden">
        <div className="flex border-b border-ds-border bg-white px-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors mr-2 ${
                activeTab === tab
                  ? "border-cobalt text-cobalt"
                  : "border-transparent text-gray-500 hover:text-inkwell"
              }`}
            >
              {tab}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab ? "bg-cobalt/10 text-cobalt" : "bg-ds-gray text-gray-500"
              }`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ds-gray border-b border-ds-border">
              {["Subject", "Recipient", "Template", "Status", "Sent", "Completed", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  <FileText size={32} className="mx-auto mb-2 opacity-30" />
                  No agreements found
                </td>
              </tr>
            ) : filtered.map(a => {
              const meta = STATUS_META[a.status];
              const template = TEMPLATES.find(t => t.id === a.template);
              return (
                <tr key={a.id} className="border-b border-ds-border last:border-0 hover:bg-ds-gray/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-inkwell">{a.subject}</td>
                  <td className="px-4 py-3 text-gray-500">{a.recipient}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {template ? (
                      <span className="px-2 py-1 bg-mist/30 text-cobalt rounded-md font-medium">
                        {template.category} · {template.region}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${meta.style}`}>
                      <meta.icon size={11} />
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{a.sent}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{a.completed ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-cobalt text-xs hover:underline font-medium">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
