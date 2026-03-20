import { Link } from "react-router-dom";
import {
  LayoutGrid,
  LogIn,
  UserPlus,
  Rocket,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <header className="border-b border-gray-200/70 backdrop-blur bg-white/70 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <LayoutGrid size={20} className="text-gray-800" />
            Orenz
          </h1>

          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition"
            >
              <LogIn size={16} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-sm"
            >
              <UserPlus size={16} />
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 relative overflow-hidden">

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

        {/* Glow */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gray-200 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">

          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              Simple • Fast • Reliable
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Manage Your Sales
            <br />
            <span className="text-gray-400">
              Without the Complexity
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Categories, menus, and analytics — everything you need to run and
            grow your business in one simple dashboard.
          </p>

          {/* CTA */}
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <Rocket size={18} />
            Get Started
          </Link>
        </div>

      </main>

      {/* Footer */}
   {/* Footer */}
<footer className="border-t border-gray-200/70 bg-white/70 backdrop-blur mt-auto">
  <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Orenz. All rights reserved.
  </div>
</footer>
    </div>
  );
}