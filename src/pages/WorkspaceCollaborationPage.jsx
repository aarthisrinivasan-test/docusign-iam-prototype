import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, UserPlus, Send, Smile, Paperclip, MoreHorizontal, Circle } from "lucide-react";

const MEMBERS = [
  { initials: "AS", name: "Aarthi Srinivasan", role: "Owner",  color: "bg-cobalt",      online: true,  email: "aarthi.srinivasan@company.com" },
  { initials: "JW", name: "James Wu",          role: "Editor", color: "bg-purple-500",  online: true,  email: "james.wu@company.com" },
  { initials: "SM", name: "Sara Malik",        role: "Viewer", color: "bg-teal-500",    online: false, email: "sara.malik@company.com" },
];

const SUGGESTED = [
  { initials: "TR", name: "Taylor Rivera",  email: "t.rivera@company.com",  color: "bg-orange-400" },
  { initials: "PK", name: "Priya Kapoor",   email: "p.kapoor@company.com",  color: "bg-pink-500" },
  { initials: "ML", name: "Marcus Lee",     email: "m.lee@company.com",     color: "bg-green-600" },
];

const INITIAL_MESSAGES = [
  { id: 1, from: "JW",  text: "Hey team — I've updated the signing order on the EU Account Opening template.", time: "10:02 AM" },
  { id: 2, from: "SM",  text: "Looks good! Should we also update the US version?", time: "10:05 AM" },
  { id: 3, from: "JW",  text: "Good point. I'll add that to the queue.", time: "10:06 AM" },
  { id: 4, from: "AS",  text: "Also added the GDPR notice to the Vendor EU template — can someone review?", time: "10:14 AM" },
  { id: 5, from: "SM",  text: "On it!", time: "10:15 AM" },
];

export default function WorkspaceCollaborationPage() {
  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [addSearch, setAddSearch]   = useState("");
  const [messages, setMessages]     = useState(INITIAL_MESSAGES);
  const [draft, setDraft]           = useState("");
  const [activeChat, setActiveChat] = useState("team");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMembers = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSuggested = SUGGESTED.filter(m =>
    m.name.toLowerCase().includes(addSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(addSearch.toLowerCase())
  );

  function sendMessage() {
    if (!draft.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from: "AS", text: draft.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setDraft("");
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      {/* Back */}
      <button
        onClick={() => navigate("/workspace")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-inkwell mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Workspace
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-inkwell">Workspace Collaboration</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your team and chat in real time</p>
        </div>
        <span className="bg-cobalt/10 text-cobalt text-xs font-semibold px-3 py-1.5 rounded-full">
          ✨ Trial — 14 days remaining
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left panel: members + add */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* Team members */}
          <div className="border border-ds-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-ds-gray border-b border-ds-border flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Team Members</h2>
              <span className="text-xs text-gray-400">{MEMBERS.length} members</span>
            </div>

            {/* Search members */}
            <div className="px-3 py-2 border-b border-ds-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search members…"
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-ds-border rounded-lg bg-white focus:outline-none focus:border-cobalt"
                />
              </div>
            </div>

            <ul className="divide-y divide-ds-border">
              {filteredMembers.map(m => (
                <li
                  key={m.initials}
                  onClick={() => setActiveChat(m.initials)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    activeChat === m.initials ? "bg-cobalt/5" : "hover:bg-ds-gray"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className={`w-9 h-9 rounded-full ${m.color} text-white text-sm font-semibold flex items-center justify-center`}>
                      {m.initials}
                    </div>
                    <Circle
                      size={9}
                      className={`absolute bottom-0 right-0 ${m.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-inkwell truncate">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.role} · {m.online ? "Online" : "Offline"}</p>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500 shrink-0">
                    <MoreHorizontal size={15} />
                  </button>
                </li>
              ))}
              {filteredMembers.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-400">No members found</li>
              )}
            </ul>
          </div>

          {/* Add members */}
          <div className="border border-ds-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-ds-gray border-b border-ds-border">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Add Members</h2>
            </div>
            <div className="px-3 py-2 border-b border-ds-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  value={addSearch}
                  onChange={e => setAddSearch(e.target.value)}
                  placeholder="Search by name or email…"
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-ds-border rounded-lg bg-white focus:outline-none focus:border-cobalt"
                />
              </div>
            </div>
            <ul className="divide-y divide-ds-border">
              {filteredSuggested.map(m => (
                <li key={m.initials} className="flex items-center gap-3 px-4 py-3 hover:bg-ds-gray transition-colors">
                  <div className={`w-9 h-9 rounded-full ${m.color} text-white text-sm font-semibold flex items-center justify-center shrink-0`}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-inkwell truncate">{m.name}</p>
                    <p className="text-xs text-gray-400 truncate">{m.email}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-cobalt font-semibold hover:underline shrink-0">
                    <UserPlus size={13} /> Invite
                  </button>
                </li>
              ))}
              {filteredSuggested.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-400">No suggestions found</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right panel: chat */}
        <div className="lg:col-span-2 border border-ds-border rounded-xl flex flex-col overflow-hidden" style={{ height: "600px" }}>
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-ds-border bg-ds-gray flex items-center gap-3">
            {activeChat === "team" ? (
              <>
                <div className="flex -space-x-2">
                  {MEMBERS.map(m => (
                    <div key={m.initials} className={`w-7 h-7 rounded-full ${m.color} text-white text-xs font-semibold flex items-center justify-center ring-2 ring-white`}>
                      {m.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-inkwell">Team Channel</p>
                  <p className="text-xs text-gray-400">{MEMBERS.filter(m => m.online).length} online</p>
                </div>
              </>
            ) : (() => {
              const m = MEMBERS.find(x => x.initials === activeChat);
              return (
                <>
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full ${m.color} text-white text-sm font-semibold flex items-center justify-center`}>
                      {m.initials}
                    </div>
                    <Circle size={9} className={`absolute bottom-0 right-0 ${m.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-inkwell">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.online ? "Online" : "Offline"}</p>
                  </div>
                </>
              );
            })()}
            <button
              onClick={() => setActiveChat("team")}
              className={`ml-auto text-xs px-3 py-1 rounded-full border transition-colors ${
                activeChat === "team"
                  ? "bg-cobalt text-white border-cobalt"
                  : "border-ds-border text-gray-500 hover:border-cobalt hover:text-cobalt"
              }`}
            >
              Team
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white">
            {messages.map(msg => {
              const member = MEMBERS.find(m => m.initials === msg.from) || MEMBERS[0];
              const isMe = msg.from === "AS";
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                  {!isMe && (
                    <div className={`w-7 h-7 rounded-full ${member.color} text-white text-xs font-semibold flex items-center justify-center shrink-0`}>
                      {member.initials}
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-sm ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    {!isMe && <p className="text-xs text-gray-400 ml-1">{member.name}</p>}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                      isMe
                        ? "bg-cobalt text-white rounded-br-sm"
                        : "bg-ds-gray text-inkwell rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <p className="text-xs text-gray-300 mx-1">{msg.time}</p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-ds-border bg-white flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-cobalt transition-colors"><Paperclip size={17} /></button>
            <button className="p-2 text-gray-400 hover:text-cobalt transition-colors"><Smile size={17} /></button>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Message the team…"
              className="flex-1 px-4 py-2 text-sm border border-ds-border rounded-full focus:outline-none focus:border-cobalt bg-ds-gray"
            />
            <button
              onClick={sendMessage}
              disabled={!draft.trim()}
              className="p-2 bg-cobalt text-white rounded-full hover:bg-cobalt-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
