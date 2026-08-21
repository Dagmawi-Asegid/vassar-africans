"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_initials: string;
  text: string;
  timestamp: string;
  channel: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  major: string;
  email?: string;
}

interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  askedBy: string;
}

const PAST_QA: QAItem[] = [
  {
    id: "1",
    question: "Where do I get my Vassar ID and student card on day one?",
    answer: "Pick up your Vassar ID card at the Card Office in the College Center (Main Building). Bring a government-issued photo ID.",
    category: "Campus Essentials",
    askedBy: "Freshman '28"
  },
  {
    id: "2",
    question: "How do course registration and add/drop period work?",
    answer: "During the first two weeks of classes, add or drop courses without penalty on Pre-Reg. Consult your pre-major advisor early for overrides!",
    category: "Academics",
    askedBy: "Freshman '27"
  },
  {
    id: "3",
    question: "What are the best dining halls and late-night food options?",
    answer: "Gordon Commons (Deece) is the main dining hall. The Retreat in Main Building is great for quick lunch grabs with Dining Bucks, and Express offers late-night snacks!",
    category: "Food & Living",
    askedBy: "Freshman '28"
  },
];

export default function ChatPage() {
  const router = useRouter();
  
  // Navigation & View State
  const [activeChannel, setActiveChannel] = useState<string>("freshmen-resources");
  const [freshmenTab, setFreshmenTab] = useState<"essentials" | "qa">("essentials");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDMUser, setActiveDMUser] = useState<UserProfile | null>(null);

  // User Profile State
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Vassar Student");
  const [userMajor, setUserMajor] = useState("Member");
  const [userList, setUserList] = useState<UserProfile[]>([]);

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editMajor, setEditMajor] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Messages State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender_id: "demo",
      sender_name: "Dagmawi Asegid",
      sender_initials: "DA",
      text: "Does anyone have the past papers for ECON 201? Professor Smith's exams are always tricky.",
      timestamp: "10:30 AM",
      channel: "exam-hacks"
    },
    {
      id: "2",
      sender_id: "demo2",
      sender_name: "Amina K.",
      sender_initials: "AK",
      text: "Anyone doing CS 102 lab assignments? Let's pair program in the library!",
      timestamp: "11:15 AM",
      channel: "cs-tech"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Load User & Directory Data
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUserId(user.id);

      // Load active user's profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, major")
        .eq("id", user.id)
        .maybeSingle();

      const defaultName = user.email ? user.email.split("@")[0] : "Vassar Student";
      const name = profile?.full_name || defaultName;
      const major = profile?.major || "Student";

      setUserName(name);
      setUserMajor(major);
      setEditName(name);
      setEditMajor(major);

      // Load Directory of Signed-Up Users
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, major");

      if (profiles) {
        setUserList(profiles as UserProfile[]);
      }
    }

    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

    const targetChannel = activeDMUser ? `dm-${activeDMUser.id}` : activeChannel;

    const messageObj: Message = {
      id: Date.now().toString(),
      sender_id: currentUserId || "user",
      sender_name: userName,
      sender_initials: initials,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      channel: targetChannel
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) return;

    setIsSavingProfile(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: currentUserId,
          full_name: editName,
          major: editMajor,
        });

      if (error) throw error;

      setUserName(editName);
      setUserMajor(editMajor);
      setIsEditModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";
  };

  const currentChannelMessages = messages.filter((m) => 
    activeDMUser ? m.channel === `dm-${activeDMUser.id}` : m.channel === activeChannel
  );

  const isChatBasedChannel = activeDMUser || 
    ["exam-hacks", "cs-tech", "econ-finance", "pre-med-bio", "international-studies", "math-stats", "arts-humanities", "events-socials", "buy-sell"].includes(activeChannel);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 
        flex flex-col justify-between transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://imgs.search.brave.com/423e6QATJnNt0I4cjbiQGpbHP0sywyFgpXAWXgLCcF4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/MzA3LzgyMy9zbWFs/bC9mYXNoaW9uLW1v/ZGVsLXdlYXJpbmct/Y29sb3JmdWwtaGVh/ZGRyZXNzLXBvc2lu/Zy1pbi1mcm9udC1v/Zi1zYXZhbm5hLWxh/bmRzY2FwZS1waG90/by5qcGc" 
                alt="Logo" 
                className="w-8 h-8 rounded-full border border-yellow-500 object-cover"
              />
              <span className="font-bold text-lg text-white">Vassar Africans</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">✕</button>
          </div>

          {/* Navigation Channels */}
          <div className="space-y-5 text-sm">
            {/* Academics & Prep */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">📚 Academics & Registration</p>
              <div className="space-y-1">
                {[
                  { id: "freshmen-resources", icon: "🌱", label: "Freshmen Resources" },
                  { id: "course-registration", icon: "📅", label: "Add/Drop, NRO & Majors" },
                  { id: "writing-advice", icon: "✍️", label: "Writing & Quant Center" },
                  { id: "exam-hacks", icon: "📝", label: "Exam Hacks & Papers" },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveChannel(item.id); setActiveDMUser(null); setIsSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 transition ${
                      activeChannel === item.id && !activeDMUser 
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Major-Specific Hubs (Hashtags) */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">🎓 Major-Specific Hubs</p>
              <div className="space-y-1">
                {[
                  { id: "cs-tech", label: "#cs-computer-science" },
                  { id: "econ-finance", label: "#economics-business" },
                  { id: "pre-med-bio", label: "#pre-med-biology" },
                  { id: "international-studies", label: "#international-studies" },
                  { id: "math-stats", label: "#math-statistics" },
                  { id: "arts-humanities", label: "#arts-humanities" },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveChannel(item.id); setActiveDMUser(null); setIsSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-mono text-xs transition ${
                      activeChannel === item.id && !activeDMUser 
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campus Activities & Services */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">🏆 Campus Life & Socials</p>
              <div className="space-y-1">
                {[
                  { id: "events-socials", icon: "🎉", label: "Events & Socials" },
                  { id: "buy-sell", icon: "🏷️", label: "Buy, Sell & Trade" },
                  { id: "sports-recreation", icon: "⚽", label: "Intramurals & Outdoors" },
                  { id: "house-preview", icon: "🏰", label: "Residential Houses & ROC" },
                  { id: "campus-utilities", icon: "🚌", label: "Shuttles, Laundry & Library" },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveChannel(item.id); setActiveDMUser(null); setIsSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 transition ${
                      activeChannel === item.id && !activeDMUser 
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Career & Internships */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">💼 Career & Internships</p>
              <div className="space-y-1">
                <button 
                  onClick={() => { setActiveChannel("career-internships"); setActiveDMUser(null); setIsSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 transition ${
                    activeChannel === "career-internships" && !activeDMUser 
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <span>💼</span>
                  <span>CCE & Handshake Portal</span>
                </button>
              </div>
            </div>

            {/* Direct Messages & User Directory */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">💬 Student Directory & DMs</p>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {userList.length > 0 ? (
                  userList.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => { setActiveDMUser(user); setIsSidebarOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center space-x-2 text-xs transition ${
                        activeDMUser?.id === user.id 
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                      <span className="truncate">{user.full_name || "Student User"}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-[10px] text-gray-500 px-3">No other registered users online.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Footer Profile & Actions */}
        <div className="p-3 bg-gray-900/80 border-t border-gray-800 flex items-center justify-between">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            title="Click to Edit Profile"
            className="flex items-center space-x-3 overflow-hidden text-left hover:opacity-80 transition flex-1 mr-2"
          >
            <div className="w-9 h-9 rounded-full bg-yellow-500/20 text-yellow-400 font-bold flex items-center justify-center shrink-0 border border-yellow-500/40">
              {getInitials(userName)}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate flex items-center gap-1">
                {userName} <span className="text-[10px] text-yellow-500">✏️</span>
              </p>
              <p className="text-xs text-gray-400 truncate">{userMajor}</p>
            </div>
          </button>

          <button 
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H8.25" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-gray-950 w-full overflow-hidden">
        {/* Header */}
        <header className="px-4 md:px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg">☰</button>
            <div>
              <h1 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <span>{activeDMUser ? "💬" : "#"}</span> 
                {activeDMUser ? `Chat with ${activeDMUser.full_name}` : activeChannel.replace("-", " ").toUpperCase()}
              </h1>
              <p className="text-xs text-gray-400">
                {activeDMUser 
                  ? `Direct message session with ${activeDMUser.full_name} (${activeDMUser.major})` 
                  : "Collaborate, share notes, and connect."}
              </p>
            </div>
          </div>
        </header>

        {/* Dynamic Views */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Chat Interface View (for Major Channels, DM, Exam Hacks, Events & Buy/Sell) */}
          {isChatBasedChannel && (
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4 overflow-y-auto max-h-[65vh]">
                {currentChannelMessages.length > 0 ? (
                  currentChannelMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3 bg-gray-900/60 p-3 rounded-2xl border border-gray-800">
                      <div className="w-9 h-9 rounded-full bg-amber-600/30 text-amber-400 flex items-center justify-center font-semibold text-sm shrink-0">
                        {msg.sender_initials}
                      </div>
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-semibold text-sm text-yellow-500">{msg.sender_name}</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{msg.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm font-semibold">Welcome to #{activeChannel}!</p>
                    <p className="text-xs mt-1">Be the first to drop a message, ask a question, or share resources.</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 mt-4">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={activeDMUser ? `Message ${activeDMUser.full_name}...` : `Message #${activeChannel}...`}
                  className="bg-transparent flex-1 text-sm text-white focus:outline-none"
                />
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold p-2 rounded-lg transition ml-2">➔</button>
              </form>
            </div>
          )}

          {/* Freshmen Resources View */}
          {!activeDMUser && activeChannel === "freshmen-resources" && (
            <div className="space-y-6">
              <div className="flex space-x-2 border-b border-gray-800 pb-3">
                <button
                  onClick={() => setFreshmenTab("essentials")}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    freshmenTab === "essentials" ? "bg-yellow-500 text-gray-950" : "bg-gray-900 text-gray-400"
                  }`}
                >
                  📚 Freshmen Essentials
                </button>
                <button
                  onClick={() => setFreshmenTab("qa")}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    freshmenTab === "qa" ? "bg-yellow-500 text-gray-950" : "bg-gray-900 text-gray-400"
                  }`}
                >
                  💬 Past Q&A Archive
                </button>
              </div>

              {freshmenTab === "essentials" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl">
                    <span className="text-2xl mb-2 block">🆔</span>
                    <h3 className="font-bold text-yellow-500 text-base mb-1">Campus Essentials</h3>
                    <p className="text-xs text-gray-300">Pick up your Student ID at the Card Office in Main Building. Set up campus Wi-Fi early.</p>
                  </div>
                  <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl">
                    <span className="text-2xl mb-2 block">📖</span>
                    <h3 className="font-bold text-yellow-500 text-base mb-1">Academic Survival Guide</h3>
                    <p className="text-xs text-gray-300">Wait until syllabus week before purchasing books; check library reserves for PDFs first.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {PAST_QA.map((qa) => (
                    <div key={qa.id} className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md">{qa.category}</span>
                      <h4 className="text-sm font-semibold text-white">Q: {qa.question}</h4>
                      <p className="text-xs text-gray-300 bg-gray-950/60 p-3 rounded-xl border border-gray-800/60">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Course Registration, Add/Drop, NRO & Majors View */}
          {!activeDMUser && activeChannel === "course-registration" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">⚡</span>
                <h3 className="font-bold text-yellow-500 text-base">Course Add/Drop Period</h3>
                <p className="text-xs text-gray-300">
                  You have the first 2 weeks of each semester to add or drop courses freely on Pre-Reg without penalty or academic transcript mark.
                </p>
                <a href="https://offices.vassar.edu/registrar/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Open Registrar Add/Drop Portal &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🛡️</span>
                <h3 className="font-bold text-yellow-500 text-base">NRO (Non-Recorded Option)</h3>
                <p className="text-xs text-gray-300">
                  Protect your GPA! Elect a target grade (e.g., B). If you earn that grade or higher, your letter grade displays; otherwise, it records as 'PA' (Pass).
                </p>
                <a href="https://offices.vassar.edu/registrar/nro/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  View NRO Deadlines & Rules &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🎓</span>
                <h3 className="font-bold text-yellow-500 text-base">Declaring Majors, Minors & Correlates</h3>
                <p className="text-xs text-gray-300">
                  Majors are declared in the 2nd semester of sophomore year. Correlate sequences (minors) require 5-6 units and approval from the department chair.
                </p>
                <a href="https://offices.vassar.edu/dean-of-studies/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Major Declaration Forms & Guidelines &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">📋</span>
                <h3 className="font-bold text-yellow-500 text-base">Pre-Reg Scheduler & Catalog</h3>
                <p className="text-xs text-gray-300">
                  Search course offerings, check prerequisites, track class capacities, and request instructor overrides before registration windows open.
                </p>
                <a href="https://prereg.vassar.edu" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Launch Pre-Reg Course Search &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Campus Utilities (Shuttles, Laundry & Library) View */}
          {!activeDMUser && activeChannel === "campus-utilities" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🚌</span>
                <h3 className="font-bold text-yellow-500 text-base">Campus Shuttles & Poughkeepsie Transit</h3>
                <p className="text-xs text-gray-300">Free weekend shopping shuttles to Galleria Mall, Target, and local Poughkeepsie Metro-North train station.</p>
                <a href="https://offices.vassar.edu/transportation/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  View Shuttle Schedule & Route Tracker &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🧺</span>
                <h3 className="font-bold text-yellow-500 text-base">Dorm Laundry Availability</h3>
                <p className="text-xs text-gray-300">Check open washers/dryers in your residence house in real-time before heading down with your laundry bag.</p>
                <a href="https://www.laundryview.com/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Check Live Washer Status &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">📚</span>
                <h3 className="font-bold text-yellow-500 text-base">Thompson Library Study Rooms</h3>
                <p className="text-xs text-gray-300">Reserve quiet individual study pods or group discussion rooms inside Thompson Library and Music Library.</p>
                <a href="https://library.vassar.edu/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Reserve Library Study Room &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🎨</span>
                <h3 className="font-bold text-yellow-500 text-base">VSA Student Organizations (VSA)</h3>
                <p className="text-xs text-gray-300">Discover over 150+ student-led clubs, cultural orgs, affinity spaces, and student government committees.</p>
                <a href="https://vsa.vassar.edu/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Browse Student Clubs Directory &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Sports, Outdoors & Intramurals View */}
          {!activeDMUser && activeChannel === "sports-recreation" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">⚽</span>
                <h3 className="font-bold text-yellow-500 text-base">Intramural Sports League</h3>
                <p className="text-xs text-gray-300">Join campus soccer, basketball, volleyball, and ultimate frisbee leagues.</p>
                <a href="https://vassarathetics.com" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Visit Vassar Athletics Portal &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🚴</span>
                <h3 className="font-bold text-yellow-500 text-base">Biking, Skating & Hiking Trails</h3>
                <p className="text-xs text-gray-300">Explore the Vassar Farm & Ecological Preserve or bike along the Dutchess Rail Trail.</p>
                <a href="https://www.vassar.edu/farm" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  View Preserve & Trail Maps &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Writing & Quantitative Center View */}
          {!activeDMUser && activeChannel === "writing-advice" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">✍️</span>
                <h3 className="font-bold text-yellow-500 text-base">Vassar Writing Center</h3>
                <p className="text-xs text-gray-300">Book 1-on-1 peer consultations for essay brainstorming, structure, and editing.</p>
                <a href="https://vassar.mywconline.com" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Schedule Writing Appointment &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">📊</span>
                <h3 className="font-bold text-yellow-500 text-base">Quantitative Reasoning Center (Q-Center)</h3>
                <p className="text-xs text-gray-300">Get tutoring for Math, Economics, Computer Science, Statistics, and Chemistry.</p>
                <a href="https://offices.vassar.edu/quantitative-reasoning-center/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  View Q-Center Drop-in Hours &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Career & Internships View */}
          {!activeDMUser && activeChannel === "career-internships" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">💼</span>
                <h3 className="font-bold text-yellow-500 text-base">Center for Career Education (CCE)</h3>
                <p className="text-xs text-gray-300">Access internship grants, resume reviews, alumni networking, and career fairs.</p>
                <a href="https://offices.vassar.edu/career-education/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Visit CCE Website &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🤝</span>
                <h3 className="font-bold text-yellow-500 text-base">Handshake Job Portal</h3>
                <p className="text-xs text-gray-300">Find active campus jobs, summer research opportunities, and full-time listings.</p>
                <a href="https://vassar.joinhandshake.com" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Login to Handshake &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Houses Preview & ROC View */}
          {!activeDMUser && activeChannel === "house-preview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🏰</span>
                <h3 className="font-bold text-yellow-500 text-base">Residential Houses Overview</h3>
                <p className="text-xs text-gray-300">Explore Main, Cushing, Davison, Jewett, Lathrop, Josselyn, Strong, Ferry house, Town houses, Terrace Apartments, South commons and Raymond houses.</p>
                <a href="https://offices.vassar.edu/residential-life/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  View ResLife Housing Guide &rarr;
                </a>
              </div>

              <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl space-y-2">
                <span className="text-2xl block">🏠</span>
                <h3 className="font-bold text-yellow-500 text-base">Residential Operations Center (ROC)</h3>
                <p className="text-xs text-gray-300">Submit room repair work orders, key replacements, and lockout assistance.</p>
                <a href="https://offices.vassar.edu/facilities-operations/" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-yellow-400 underline pt-2">
                  Submit Work Order / Request &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Edit Your Profile</h3>
            <p className="text-gray-400 text-xs mb-4">Update your display name and major.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Major</label>
                <input 
                  type="text" 
                  required
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-xs text-gray-400 hover:text-white transition">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSavingProfile}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50"
                >
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}