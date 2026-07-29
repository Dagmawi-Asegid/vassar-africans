"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Professional "Apple-like" animation curve (Ease Out Quint)
const smoothCurve = [0.22, 1, 0.36, 1];

// Executive Board Members Data
const boardMembers = [
  {
    name: "Dagmawi Asegid",
    role: "President",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Co-President",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Treasurer",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Secretary",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Program Coordinator",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Web Editor & Designer",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Asegid",
    role: "Social Media Manager",
    major: "Computer Science and Math '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
];

// Comprehensive Guides Data
const resourcesData = [
  {
    id: "ssn",
    icon: "📄",
    title: "SSN & Work Authorization",
    shortDesc: "Your complete guide to applying for a Social Security Number for on-campus employment.",
    content: (
      <div className="space-y-4 text-gray-700">
        <p className="font-medium text-gray-950">As an international F-1 student, you cannot get an SSN just for identification. You must have a job offer first.</p>
        <h4 className="font-bold text-gray-950 mt-4">Step-by-Step Process:</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Secure an On-Campus Job:</strong> Apply for jobs via Vassar's Student Employment office (JobX). You must have an official job offer.</li>
          <li><strong>Get an Employer Letter:</strong> Ask your new supervisor to write an official letter confirming your employment.</li>
          <li><strong>Request an OIS Support Letter:</strong> Submit your employer letter to Vassar's Office of International Services (OIS). They will issue a specialized SSN support letter.</li>
          <li><strong>Fill out Form SS-5:</strong> Download and complete the <a href="https://www.ssa.gov/forms/ss-5.pdf" target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline">Social Security Application Form (SS-5)</a>.</li>
          <li><strong>Visit the local SSA Office:</strong> Take a bus or taxi to the Poughkeepsie Social Security Office (332 Main St). <strong>Bring:</strong> Your Passport, F-1 Visa, Most recent I-94 form, I-20, Employer Letter, OIS Letter, and Form SS-5.</li>
        </ol>
        <p className="text-sm mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <strong>Pro-tip:</strong> It usually takes 2-4 weeks for your card to arrive in the mail. You can generally start working before it arrives, provided you have a receipt from the SSA office.
        </p>
      </div>
    )
  },
  {
    id: "cpt-opt",
    icon: "⚖️",
    title: "Understanding CPT & OPT",
    shortDesc: "Navigate the complex rules and legal regulations for off-campus internships and post-grad jobs.",
    content: (
      <div className="space-y-4 text-gray-700">
        <p className="font-medium text-gray-950">To work off-campus in the US, you need specific work authorization tied to your degree.</p>
        
        <h4 className="font-bold text-gray-950 mt-4">1. CPT (Curricular Practical Training)</h4>
        <p className="text-sm">Used for internships <strong>before</strong> graduation.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>You must have been enrolled full-time for at least one academic year.</li>
          <li>The internship <strong>must</strong> be directly related to your declared major.</li>
          <li><strong>Steps:</strong> Get an internship offer &rarr; Apply for CPT through Vassar OIS &rarr; Receive a new I-20 with CPT authorization on page 2 &rarr; Start working.</li>
          <li><em>Cost: Free. Processing time: Usually 1-2 weeks by OIS.</em></li>
        </ul>

        <h4 className="font-bold text-gray-950 mt-4">2. OPT (Optional Practical Training)</h4>
        <p className="text-sm">Used for employment <strong>after</strong> graduation.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Allows you to work anywhere in the US for 12 months (up to 36 months for STEM majors like Computer Science).</li>
          <li>You do <strong>not</strong> need a job offer to apply for OPT.</li>
          <li><strong>Steps:</strong> Apply to OIS for an OPT recommendation I-20 &rarr; Submit Form I-765 online to USCIS &rarr; Wait for your EAD (Employment Authorization Document) Card.</li>
          <li><strong>Timeline:</strong> Apply up to 90 days before graduation. USCIS processing takes 2–4 months.</li>
        </ul>
        <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students" target="_blank" rel="noopener noreferrer" className="text-yellow-600 font-bold underline text-sm block mt-2">Read Official USCIS OPT Guide &rarr;</a>
      </div>
    )
  },
  {
    id: "housing",
    icon: "🏢",
    title: "Housing, Banking and SIM",
    shortDesc: "Tips for finding off-campus housing, setting up a US bank account and getting a SIM card.",
    content: (
      <div className="space-y-6 text-gray-700">
        <div>
          <h4 className="font-bold text-gray-950 border-b pb-1 mb-2">📱 Getting a US Phone Number</h4>
          <p className="text-sm mb-2">You need an unlocked phone from your home country. eSIMs are the easiest option.</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><strong>Mint Mobile:</strong> Highly recommended. ~$15/month. Order online, instantly activate via eSIM.</li>
            <li><strong>AT&T / T-Mobile:</strong> More expensive but have physical stores in Poughkeepsie if you need in-person help.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-950 border-b pb-1 mb-2">🏦 Opening a Bank Account</h4>
          <p className="text-sm mb-2">You do not need an SSN to open a basic student checking account.</p>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            <li>Go to a branch (Chase Bank or Bank of America are near Vassar).</li>
            <li><strong>Bring:</strong> Passport, I-20 form, Vassar Student ID, and a proof of address (a letter from Vassar residential life).</li>
            <li>Ask to open a "College Checking Account" to avoid monthly maintenance fees.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold text-gray-950 border-b pb-1 mb-2">🏠 Off-Campus Housing</h4>
          <p className="text-sm mb-2">If you move off-campus (usually junior/senior year):</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Landlords usually require a US credit score. Since you might not have one, you will likely need to show your I-20 financial proof, a bank statement, or have a guarantor.</li>
            <li>Use <strong>Zillow</strong>, <strong>Apartments.com</strong>, or Vassar Facebook groups to find leases.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "health",
    icon: "🏥",
    title: "Health Insurance",
    shortDesc: "How to understand and use Vassar's international student health insurance.",
    content: (
      <div className="space-y-4 text-gray-700">
        <p className="font-medium text-gray-950">Healthcare in the US is extremely expensive without insurance. Vassar requires all international students to have coverage.</p>
        
        <h4 className="font-bold text-gray-950 mt-4">How it works:</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Automatic Enrollment:</strong> As an F-1 student, you are automatically enrolled in the Vassar Student Health Insurance Plan (usually managed by Gallagher Student Health). It is billed directly to your student account.</li>
          <li><strong>On-Campus Care:</strong> For most basic illnesses, testing, or prescriptions, go to <strong>Baldwin Medical Center</strong> on campus. It is often free or very low cost for students.</li>
          <li><strong>Off-Campus Care (In-Network):</strong> If you need a specialist off-campus, you must make sure the doctor is "In-Network" with your insurance (often UnitedHealthcare Choice Plus). If you go "Out-of-Network", you will pay much more.</li>
        </ul>

        <h4 className="font-bold text-gray-950 mt-4">Action Items:</h4>
        <ol className="list-decimal pl-5 space-y-1 text-sm mb-4">
          <li>Create an account on the Gallagher Student Health website.</li>
          <li>Download your Digital ID Card to your Apple Wallet / Google Pay. You MUST show this card at off-campus pharmacies (like CVS/Walgreens) and hospitals.</li>
        </ol>
        
        <a href="https://www.gallagherstudent.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 font-bold underline text-sm mt-2">Visit Gallagher Student Health Portal &rarr;</a>
      </div>
    )
  }
];

export default function Home() {
  // State for the interactive guide modal
  const [activeGuide, setActiveGuide] = useState<null | typeof resourcesData[0]>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="https://imgs.search.brave.com/423e6QATJnNt0I4cjbiQGpbHP0sywyFgpXAWXgLCcF4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/MzA3LzgyMy9zbWFs/bC9mYXNoaW9uLW1v/ZGVsLXdlYXJpbmct/Y29sb3JmdWwtaGVh/ZGRyZXNzLXBvc2lu/Zy1pbi1mcm9udC1v/Zi1zYXZhbm5hLWxh/bmRzY2FwZS1waG90/by5qcGc" 
              alt="Vassar Africans Logo" 
              className="rounded-full w-10 h-10 object-cover border-2 border-yellow-500 shadow-sm" 
            />
            <h1 className="text-2xl font-bold text-gray-950">Vassar Africans</h1>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {['About', 'Resources', 'Events', 'Board'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-700 hover:text-yellow-600 font-bold transition">
                {item}
              </a>
            ))}
            
            <Link href="/login" className="bg-gray-950 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-500 hover:text-gray-950 hover:border-yellow-500 transition shadow-sm border border-gray-800">
              Student Login
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Golden African Background Hero Section */}
      <header className="relative pt-32 pb-24 md:pt-48 md:pb-36 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://imgs.search.brave.com/uyzDWSjOmywYSsjGEl7iJcDYwrferM7Vy17GDEYsXII/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE4Lzc1Lzk3LzQ3/LzM2MF9GXzE4NzU5/NzQ3NzZfSjRtMVdX/R2FYSjl0Wnd4bVdm/WndlMWtCeENZUjVY/RFcuanBn" 
            alt="African Culture Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/60"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: smoothCurve }}
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <span className="inline-block bg-yellow-500/20 text-yellow-400 px-5 py-1.5 rounded-full text-sm font-bold mb-6 border border-yellow-500/30 shadow-lg tracking-wide">
            Vassar College African Students Association
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter leading-tight drop-shadow-md">
            Building Community. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500">
              Celebrating Culture.
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mb-12 drop-shadow-sm font-medium">
            A welcoming home away from home for African students. Join us to find resources, build connections, navigate international life, and excel at Vassar.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
            <a href="#resources" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-950 px-8 py-3.5 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center gap-2">
              Explore Resources &rarr;
            </a>
            <a href="#events" className="bg-white/10 backdrop-blur-md border border-yellow-500/30 text-yellow-400 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition shadow-sm">
              View Upcoming Events
            </a>
          </div>
        </motion.div>
      </header>

      {/* 3. About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: smoothCurve }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-extrabold text-gray-950 tracking-tight mb-4">Our Three Pillars</h3>
          <p className="text-lg text-yellow-700 max-w-2xl mx-auto font-medium">We are dedicated to supporting the whole student experience.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: "🤝", title: "Community", desc: "Forging lifelong connections and a strong support network." },
            { icon: "🌍", title: "Culture", desc: "Celebrating the diverse cultures of the African continent." },
            { icon: "🎓", title: "Excellence", desc: "Providing academic guidance and professional development." },
          ].map((pillar, index) => (
            <motion.div 
              key={pillar.title} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.15, ease: smoothCurve }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-[0_10px_30px_rgba(234,179,8,0.1)] transition hover:border-yellow-200"
            >
              <span className="text-6xl mb-6 block">{pillar.icon}</span>
              <h4 className="text-2xl font-bold text-gray-950 mb-3">{pillar.title}</h4>
              <p className="text-gray-700/80">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Events Spotlight */}
      <section id="events" className="relative py-24 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://imgs.search.brave.com/XNKwMTFoEWz-JRtKKJAukqtkKJKGqfjCQsbcPgSSxU8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNjE5/MjQ2My9wZXhlbHMt/cGhvdG8tNjE5MjQ2/My5qcGVnP2NzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw" 
            alt="Events Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: smoothCurve }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4"
          >
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight">Featured Events</h3>
              <p className="text-yellow-500/80 mt-2 font-medium">Mark your calendar for our upcoming meetings and cultural activities.</p>
            </div>
            <a href="#events" className="bg-yellow-500 text-gray-950 px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition whitespace-nowrap text-center">
              View All Events
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i, index) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.15, ease: smoothCurve }}
                className="bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex gap-4 hover:border-yellow-500/80 transition cursor-pointer hover:bg-gray-900/60 shadow-xl"
              >
                <div className="w-20 h-20 bg-yellow-500/20 border border-yellow-500/50 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl">🗓️</div>
                <div>
                  <h4 className="text-lg font-bold text-white">African Welcome Dinner {i}</h4>
                  <p className="text-yellow-400/90 text-sm font-medium">Saturday, Sept. 12 at 7:00 PM</p>
                  <p className="text-gray-300 text-xs mt-1">Matthew's Salon, College Center</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Essential International Resources (UPDATED W/ MODALS) */}
      <section id="resources" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: smoothCurve }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-extrabold text-gray-950 tracking-tight mb-4">Navigating International Life</h3>
          <p className="text-lg text-yellow-700 max-w-2xl mx-auto font-medium">Key resources and step-by-step guides open for all African students.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourcesData.map((resource, index) => (
            <motion.div 
              key={resource.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.1, ease: smoothCurve }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:border-yellow-400 hover:shadow-md transition cursor-pointer"
              onClick={() => setActiveGuide(resource)}
            >
              <span className="text-4xl">{resource.icon}</span>
              <div>
                <h4 className="text-xl font-bold text-gray-950 mb-2">{resource.title}</h4>
                <p className="text-gray-700/80 mb-4 text-sm">{resource.shortDesc}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGuide(resource);
                  }}
                  className="text-yellow-600 font-bold text-sm hover:underline flex items-center gap-1"
                >
                  Read Comprehensive Guide &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resource Modal Overlay */}
      <AnimatePresence>
        {activeGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveGuide(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: smoothCurve }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Modal Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{activeGuide.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-950">{activeGuide.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="text-gray-400 hover:text-gray-950 bg-gray-200/50 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {activeGuide.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Executive Board Section */}
      <section id="board" className="py-24 px-6 bg-gray-50/50 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: smoothCurve }}
            className="text-center mb-16"
          >
            <span className="text-yellow-600 text-sm font-bold tracking-wider uppercase mb-2 block">Leadership</span>
            <h3 className="text-4xl font-extrabold text-gray-950 tracking-tight mb-4">Meet the Executive Board</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Dedicated student leaders working to represent, connect, and empower the African community at Vassar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={`${member.role}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.08, ease: smoothCurve }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-yellow-500/30 group-hover:border-yellow-500 transition shadow-inner">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-950 mb-1">{member.name}</h4>
                <p className="text-yellow-600 font-semibold text-sm mb-1">{member.role}</p>
                <p className="text-gray-500 text-xs mb-4">{member.major}</p>
                
                <a 
                  href={`mailto:${member.email}`}
                  className="inline-block bg-gray-100 hover:bg-yellow-500 hover:text-gray-950 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Contact
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-950 font-bold text-xl mb-4">Vassar Africans</p>
          <p className="text-sm text-gray-500 font-medium">A community for support, culture, and connections.</p>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-yellow-600 font-bold">
              Instagram @vassarafricans
            </a>
            <a href="mailto:vassarafricans@vassar.edu" className="text-sm text-gray-600 hover:text-yellow-600 font-bold">
              Contact Us vassarafricans@vassar.edu
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-12">&copy; {new Date().getFullYear()} Vassar Africans Association. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
