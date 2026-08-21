"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Professional "Apple-like" animation curve
const smoothCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Executive Board Members Data
const boardMembers = [
  {
    name: "Dagmawi Desta Asegid",
    role: "President",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Desta Asegid",
    role: "Co-President",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi DestaAsegid",
    role: "Treasurer",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Desta Asegid ",
    role: "Secretary",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi Desta Asegid",
    role: "Program Coordinator",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi DestaAsegid",
    role: "Web Editor & Designer",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
  {
    name: "Dagmawi DestaAsegid",
    role: "Social Media Manager",
    major: "Computer Science '29",
    image: "https://github.com/Dagmawi-Asegid.png",
    email: "dasegid@vassar.edu",
  },
];

// Events Data with Google Calendar Links
const eventsData = [
  {
    id: "welcome-dinner",
    title: "Annual African Welcome Dinner",
    month: "SEP",
    day: "12",
    time: "7:00 PM - 9:00 PM",
    location: "Matthew's Salon, College Center",
    description: "Kick off the semester with traditional cuisine, music, and an opportunity to meet new and returning members of the community.",
    gcalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Annual+African+Welcome+Dinner&dates=20240912T230000Z/20240913T010000Z&details=Kick+off+the+semester+with+traditional+cuisine,+music,+and+an+opportunity+to+meet+new+and+returning+members+of+the+community.&location=Matthew's+Salon,+Vassar+College"
  },
  {
    id: "career-panel",
    title: "International Alumni Career Panel",
    month: "OCT",
    day: "05",
    time: "5:30 PM - 7:30 PM",
    location: "Rocky 200 (Rockefeller Hall)",
    description: "Learn from Vassar African alumni about navigating OPT, H1-B sponsorships, and thriving in the US job market.",
    gcalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=International+Alumni+Career+Panel"
  },
  {
    id: "cultural-showcase",
    title: "Pan-African Cultural Showcase",
    month: "NOV",
    day: "18",
    time: "8:00 PM - 10:30 PM",
    location: "UpCDC (Students' Building)",
    description: "Our biggest event of the year! Join us for a night of vibrant fashion, dance performances, spoken word, and celebration.",
    gcalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pan-African+Cultural+Showcase&dates=20241119T010000Z/20241119T033000Z&details=Our+biggest+event+of+the+year!+Join+us+for+a+night+of+vibrant+fashion,+dance+performances,+spoken+word,+and+celebration.&location=Students'+Building,+Vassar+College"
  }
];

// THREE PILLARS DATA
const pillarsData = [
  {
    icon: "🤝",
    title: "Community & Belonging",
    tagline: "A safe haven away from home",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
    desc: "Transitioning to life at Vassar can feel overwhelming. We cultivate an inclusive, family-like environment where students share experiences, build lifelong friendships, and navigate campus life together.",
  },
  {
    icon: "🌍",
    title: "Cultural Pride & Heritage",
    tagline: "Celebrating the richness of Africa",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop",
    desc: "From traditional dinners and vibrant music showcases to critical discussions on continental affairs, we elevate African voices and share the incredible diversity of our roots with the broader Vassar community.",
  },
  {
    icon: "🎓",
    title: "Academic & Professional Excellence",
    tagline: "Empowering future global leaders",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
    desc: "We foster continuous growth by providing peer mentorship, career guidance, internship resources, and networking opportunities tailored to helping international and African students excel.",
  },
];

// HIGHLY VISUAL & INTERACTIVE GUIDES DATA
const resourcesData = [
  {
    id: "ssn",
    icon: "🇺🇸",
    title: "SSN & Work Authorization",
    shortDesc: "The 5-step visual blueprint to legally working on campus and securing your Social Security Number.",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop",
    content: (
      <div className="space-y-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-2xl flex gap-4 items-start shadow-sm">
          <span className="text-2xl">🛑</span>
          <div>
            <h4 className="text-red-800 font-bold text-lg">Crucial Rule for F-1 Students</h4>
            <p className="text-red-700/90 text-sm mt-1">You <strong>cannot</strong> apply for an SSN just to have one or to build credit. You MUST have an official on-campus job offer first. If you apply without one, you will be rejected.</p>
          </div>
        </div>

        <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
          <div className="relative pl-8">
            <div className="absolute -left-[17px] top-1 bg-gray-950 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white">1</div>
            <h4 className="font-bold text-gray-950 text-xl">Get Hired On-Campus</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">Find a job through Vassar's Student Employment portal (JobX). Apply for positions at the library, dining, or as a research assistant.</p>
            <a href="https://vassar.studentemployment.ngwebsolutions.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-gray-950 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition shadow-sm">
              Open Vassar JobX Portal <span className="text-lg">↗</span>
            </a>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[17px] top-1 bg-gray-950 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white">2</div>
            <h4 className="font-bold text-gray-950 text-xl">Supervisor Letter</h4>
            <p className="text-sm text-gray-600 mt-1">Once hired, ask your manager to fill out the official "Employer Letter" on Vassar letterhead proving you actually have a job starting soon.</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[17px] top-1 bg-gray-950 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white">3</div>
            <h4 className="font-bold text-gray-950 text-xl">OIS Support Letter</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">Bring your supervisor's letter to the Office of International Services. They will verify your visa status and print a support letter for the government.</p>
            <a href="https://offices.vassar.edu/international-services/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition">
              Contact Vassar OIS <span className="text-lg">↗</span>
            </a>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[17px] top-1 bg-gray-950 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white">4</div>
            <h4 className="font-bold text-gray-950 text-xl">Government Form (SS-5)</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">Download, print, and fill out the official application for a Social Security Card in blue or black ink.</p>
            <a href="https://www.ssa.gov/forms/ss-5.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm">
              📄 Download Form SS-5 (PDF)
            </a>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[17px] top-1 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white">5</div>
            <h4 className="font-bold text-gray-950 text-xl">Visit the Poughkeepsie SSA</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">Take all your physical documents (Passport, Visa, I-20, I-94, Employer Letter, OIS Letter, SS-5) downtown to apply in person.</p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="font-bold text-gray-900 flex items-center gap-2 mb-2">📍 Social Security Administration</p>
              <p className="text-sm text-gray-600 mb-3">332 Main St, Poughkeepsie, NY 12601</p>
              <a href="https://goo.gl/maps/PoughkeepsieSSA" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-bold">Open in Google Maps &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "cpt-opt",
    icon: "💼",
    title: "Off-Campus Work (CPT vs OPT)",
    shortDesc: "Don't get deported for an illegal internship. Learn exactly how to authorize off-campus jobs.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
    content: (
      <div className="space-y-8">
        <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
          <strong>Visa Warning:</strong> Working off-campus without explicit authorization on your I-20 will result in immediate visa termination. You have two legal pathways:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-2 border-yellow-200 overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="bg-yellow-100 px-5 py-3 border-b border-yellow-200 flex justify-between items-center">
              <h4 className="font-bold text-yellow-900 text-lg">CPT</h4>
              <span className="bg-yellow-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Before Grad</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">Curricular Practical Training. Used for summer internships while you are still studying.</p>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-start gap-2">✅ <strong>Rule:</strong> Job MUST relate to declared major.</li>
                <li className="flex items-start gap-2">💸 <strong>Cost:</strong> Free</li>
                <li className="flex items-start gap-2">⏱ <strong>Time:</strong> 1-2 weeks</li>
                <li className="flex items-start gap-2">🏢 <strong>Authority:</strong> Vassar OIS (No Gov filing)</li>
              </ul>
              <a href="https://offices.vassar.edu/international-services/" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-gray-100 text-gray-800 text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition">
                Vassar CPT Guidelines &rarr;
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 px-5 py-3 border-b border-blue-200 flex justify-between items-center">
              <h4 className="font-bold text-blue-900 text-lg">OPT</h4>
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">After Grad</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">Optional Practical Training. Gives you 1 year (or 3 for STEM) to work anywhere in the US.</p>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-start gap-2">✅ <strong>Rule:</strong> No job offer needed to apply!</li>
                <li className="flex items-start gap-2">💸 <strong>Cost:</strong> ~$410 Gov Fee</li>
                <li className="flex items-start gap-2">⏱ <strong>Time:</strong> 2-4 Months (Apply early!)</li>
                <li className="flex items-start gap-2">🏢 <strong>Authority:</strong> USCIS (Gov filing)</li>
              </ul>
              <a href="https://www.uscis.gov/i-765" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-blue-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                File Form I-765 at USCIS &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "setup",
    icon: "🏠",
    title: "Life Setup (Bank, Phone, Housing)",
    shortDesc: "Skip the heavy research. Use these vetted services to establish your digital and physical life in the US.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    content: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl bg-gray-50 p-2 rounded-xl">📱</span>
            <div>
              <h4 className="font-bold text-gray-950 text-xl">US Phone Number (eSIM)</h4>
              <p className="text-sm text-gray-500">Don't buy $60/month AT&T plans. Use these digital MVNOs.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="https://www.mintmobile.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between p-4 rounded-xl border border-green-200 bg-green-50/30 hover:bg-green-50 transition">
              <div>
                <strong className="text-green-700 text-lg block mb-1">Mint Mobile</strong>
                <p className="text-xs text-gray-600">The #1 choice for students. Plans start at $15/mo. You can activate it instantly via eSIM right now on Wi-Fi.</p>
              </div>
              <span className="mt-4 text-green-700 font-bold text-sm group-hover:translate-x-1 transition-transform">Get Mint &rarr;</span>
            </a>
            <a href="https://www.usmobile.com/" target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 transition">
              <div>
                <strong className="text-indigo-700 text-lg block mb-1">US Mobile</strong>
                <p className="text-xs text-gray-600">Highly customizable data pools. Excellent if you need to call your home country frequently.</p>
              </div>
              <span className="mt-4 text-indigo-700 font-bold text-sm group-hover:translate-x-1 transition-transform">Get US Mobile &rarr;</span>
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl bg-gray-50 p-2 rounded-xl">🏦</span>
            <div>
              <h4 className="font-bold text-gray-950 text-xl">US Bank Account</h4>
              <p className="text-sm text-gray-500">You do NOT need an SSN. Bring your Passport, I-20, and Vassar ID to a physical branch.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://locator.chase.com/ny/poughkeepsie" target="_blank" rel="noopener noreferrer" className="bg-[#117aca] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#0d5d9a] transition flex items-center gap-2">
              Find Chase Bank (Poughkeepsie)
            </a>
            <a href="https://locators.bankofamerica.com/ny/poughkeepsie" target="_blank" rel="noopener noreferrer" className="bg-[#e31837] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#b0132b] transition flex items-center gap-2">
              Find Bank of America
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl bg-gray-50 p-2 rounded-xl">🔑</span>
            <div>
              <h4 className="font-bold text-gray-950 text-xl">Off-Campus Housing</h4>
              <p className="text-sm text-gray-500">No US Credit Score? Use a "Guarantor" service to secure an apartment.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="https://www.zillow.com/poughkeepsie-ny/rentals/" target="_blank" rel="noopener noreferrer" className="bg-gray-50 border border-gray-200 text-center text-sm font-bold px-3 py-3 rounded-xl hover:bg-gray-100 transition">Zillow</a>
            <a href="https://www.apartments.com/poughkeepsie-ny/" target="_blank" rel="noopener noreferrer" className="bg-gray-50 border border-gray-200 text-center text-sm font-bold px-3 py-3 rounded-xl hover:bg-gray-100 transition">Apts.com</a>
            <a href="https://www.theguarantors.com/" target="_blank" rel="noopener noreferrer" className="bg-gray-950 text-white text-center text-sm font-bold px-3 py-3 rounded-xl hover:bg-gray-800 transition md:col-span-2">The Guarantors (No Credit)</a>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "health",
    icon: "🏥",
    title: "Healthcare & Insurance",
    shortDesc: "US healthcare is famously expensive. Learn how to use your Vassar insurance correctly.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
    content: (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-yellow-300 transition group">
          <h4 className="font-bold text-gray-950 text-xl mb-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded-md">Step 1</span> On-Campus First
          </h4>
          <p className="text-sm text-gray-600 mb-4">For fevers, basic injuries, or STD testing, ALWAYS go to Baldwin Health Center first. It is included in tuition and requires no complex billing.</p>
          <a href="https://healthservice.vassar.edu/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-sm font-bold px-4 py-2 rounded-xl group-hover:bg-yellow-100 transition">
            Vassar Baldwin Health Center &rarr;
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 transition group">
          <h4 className="font-bold text-gray-950 text-xl mb-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded-md">Step 2</span> Get Your Insurance Card
          </h4>
          <p className="text-sm text-gray-600 mb-4">To get prescriptions at CVS or see a specialist, you need your digital Insurance Card. Vassar uses Gallagher Student Health (usually underwritten by UnitedHealthcare).</p>
          <a href="https://www.gallagherstudent.com/vassar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm">
            Log in to Gallagher Health &rarr;
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-yellow-300 transition group">
          <h4 className="font-bold text-gray-950 text-xl mb-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded-md">Step 3</span> Find "In-Network" Doctors
          </h4>
          <p className="text-sm text-gray-600 mb-4">Never go to a random clinic without checking if they are "In-Network." Use Zocdoc to filter doctors in Poughkeepsie who accept your exact UnitedHealthcare Student plan.</p>
          <a href="https://www.zocdoc.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FFDD00] text-gray-950 text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#E6C700] transition">
            Find Doctors on Zocdoc &rarr;
          </a>
        </div>
      </div>
    )
  }
];

export default function Home() {
  const [activeGuide, setActiveGuide] = useState<null | typeof resourcesData[0]>(null);

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
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
            Building Community <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500">
              Celebrating Culture
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

      {/* 3. High-Level Visual Pillars Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: smoothCurve }}
          className="text-center mb-16"
        >
          <span className="text-yellow-600 text-sm font-bold tracking-wider uppercase mb-2 block">Our Identity</span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">Our Three Pillars</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            The foundational core driving our mission to uplift, empower, and celebrate African students at Vassar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillarsData.map((pillar, index) => (
            <motion.div 
              key={pillar.title} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.15, ease: smoothCurve }}
              className="group relative h-[480px] rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end border border-gray-200/80"
            >
              <img 
                src={pillar.image} 
                alt={pillar.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                {pillar.icon}
              </div>

              <div className="relative z-10 p-8 flex flex-col justify-end">
                <span className="text-yellow-400 font-semibold text-xs uppercase tracking-widest mb-1">{pillar.tagline}</span>
                <h4 className="text-2xl font-bold text-white mb-3 leading-snug">{pillar.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Events Spotlight with Calendar Links */}
      <section id="events" className="relative py-24 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          
          {/* UPDATED BACKGROUND IMAGE HERE */}
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
            alt="Events Background" 
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: smoothCurve }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Featured Events</h3>
            <p className="text-yellow-500/90 text-lg font-medium">Mark your calendar and join our vibrant community gatherings.</p>
          </motion.div>

          <div className="space-y-6">
            {eventsData.map((event, index) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: smoothCurve }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center group shadow-2xl"
              >
                <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[90px] shadow-lg border border-yellow-300/30">
                  <span className="text-yellow-950 text-sm font-bold uppercase tracking-widest">{event.month}</span>
                  <span className="text-yellow-950 text-4xl font-black">{event.day}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{event.title}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300 mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {event.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                </div>

                <a 
                  href={event.gcalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto mt-4 md:mt-0 text-center bg-white/10 hover:bg-yellow-500 hover:text-gray-950 text-white border border-white/20 hover:border-yellow-500 font-bold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Add to Your Calendar
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Navigating Resources */}
      <section id="resources" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: smoothCurve }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">Navigating the US System</h3>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">No fluff. Just the exact steps, official links, and visual blueprints you need as an F-1 international student.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourcesData.map((resource, index) => (
            <motion.div 
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: smoothCurve }}
              className="bg-white rounded-[2rem] p-2 pr-2 shadow-sm border border-gray-100 hover:border-yellow-400 hover:shadow-xl transition-all cursor-pointer group flex flex-col sm:flex-row overflow-hidden"
              onClick={() => setActiveGuide(resource)}
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden rounded-3xl m-2 relative">
                <img src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent flex items-end p-4">
                  <span className="text-4xl drop-shadow-md">{resource.icon}</span>
                </div>
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-950 mb-2 group-hover:text-yellow-600 transition">{resource.title}</h4>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{resource.shortDesc}</p>
                <div className="mt-auto">
                  <button className="bg-gray-50 border border-gray-200 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-gray-950 transition w-full sm:w-auto">
                    Start Process &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Guide Modal */}
      <AnimatePresence>
        {activeGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveGuide(null)}
          >
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: smoothCurve }}
              className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 md:h-64 flex-shrink-0">
                <img src={activeGuide.image} alt="Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-950/50"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-5xl mb-2">{activeGuide.icon}</span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{activeGuide.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="absolute top-6 right-6 bg-white/20 hover:bg-white text-white hover:text-gray-950 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center transition shadow-lg"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 md:p-10 overflow-y-auto bg-white">
                {activeGuide.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Executive Board Section */}
      <section id="board" className="py-24 px-6 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.08, ease: smoothCurve }}
                className="bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group"
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
                  className="inline-block bg-white hover:bg-yellow-500 hover:text-gray-950 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition border border-gray-200 hover:border-yellow-500"
                >
                  Contact
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-950 font-bold text-xl mb-4">Vassar Africans</p>
          <p className="text-sm text-gray-500 font-medium">A community for support, culture, and connections.</p>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-yellow-600 font-bold">
              Instagram @vassarafricans/ vassarbsu
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