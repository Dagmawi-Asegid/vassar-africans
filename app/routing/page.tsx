import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-yellow-500 selection:text-gray-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="https://imgs.search.brave.com/423e6QATJnNt0I4cjbiQGpbHP0sywyFgpXAWXgLCcF4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/MzA3LzgyMy9zbWFs/bC9mYXNoaW9uLW1v/ZGVsLXdlYXJpbmct/Y29sb3JmdWwtaGVh/ZGRyZXNzLXBvc2lu/Zy1pbi1mcm9udC1v/Zi1zYXZhbm5hLWxh/bmRzY2FwZS1waG90/by5qcGc" 
              alt="Logo" 
              className="w-10 h-10 rounded-full border border-yellow-500/50 object-cover group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold text-xl tracking-tight text-white">Vassar Africans</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-yellow-400 transition">About</a>
            <a href="#resources" className="hover:text-yellow-400 transition">Resources</a>
            <a href="#events" className="hover:text-yellow-400 transition">Events</a>
            <a href="#board" className="hover:text-yellow-400 transition">Board</a>
          </nav>

          {/* Header CTA Button */}
          <Link 
            href="/login" 
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-5 py-2.5 rounded-xl text-sm transition transform active:scale-95 shadow-lg shadow-yellow-500/10"
          >
            Student Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span>Vassar College African Students Association</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight mb-6">
          Building Community. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
            Celebrating Culture.
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          A welcoming home away from home for African students. Join us to find resources, build connections, navigate international life, and excel at Vassar.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Directs user to login first */}
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-8 py-3.5 rounded-xl transition transform active:scale-95 shadow-lg shadow-yellow-500/20 flex items-center justify-center space-x-2"
          >
            <span>Explore Resources</span>
            <span>→</span>
          </Link>

          <a 
            href="#events" 
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center"
          >
            View Upcoming Events
          </a>
        </div>
      </section>

      {/* Pillars / Features Grid */}
      <section id="about" className="px-6 py-20 bg-gray-900/50 border-y border-gray-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">Our Three Pillars</h2>
            <p className="text-gray-400 text-sm md:text-base">We are dedicated to supporting the whole student experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div id="resources" className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-yellow-500/30 transition">
              <span className="text-4xl block">🎓</span>
              <h3 className="text-xl font-bold text-white">Academic Excellence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Exam archives, study groups, course registration tips, and major/correlate advising tailored for international and domestic African students.
              </p>
            </div>

            <div id="events" className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-yellow-500/30 transition">
              <span className="text-4xl block">🌍</span>
              <h3 className="text-xl font-bold text-white">Cultural Hub</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Annual cultural dinners, discussion panels, dance performances, and community celebrations keeping our traditions alive on campus.
              </p>
            </div>

            <div id="board" className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-4 hover:border-yellow-500/30 transition">
              <span className="text-4xl block">🤝</span>
              <h3 className="text-xl font-bold text-white">Peer Network</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Direct messaging, house guides, shuttle schedules, and career connection hubs connecting freshmen to upperclassmen and alumni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-10 md:p-14 rounded-3xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to join the community?</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Log in with your Vassar credentials to access course guides, direct messaging, and student forums.
          </p>
          <div>
            <Link 
              href="/login" 
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-8 py-3.5 rounded-xl transition transform active:scale-95 shadow-lg shadow-yellow-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 px-6 py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Vassar College African Students Association. All rights reserved.</p>
      </footer>
    </div>
  );
}