import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Connect Google Sheets",
    text: "Add your inventory, payments, and staff sheet links once — no new software required.",
  },
  {
    title: "Automatic Data Analysis",
    text: "BizBuddy reads your sheet data and continuously monitors operations.",
  },
  {
    title: "Risk Detection Engine",
    text: "Detect low stock, missed payments, and operational risks before they happen.",
  },
  {
    title: "AI Recommendations",
    text: "Receive practical suggestions to improve operational efficiency and reduce risk.",
  },
  {
    title: "Live Dashboard & Alerts",
    text: "View insights, risk scores, and alerts instantly in one dashboard.",
  },
];

export default function Landing() {
  const lineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height;

      const visible = Math.min(total, Math.max(0, windowHeight - rect.top));
      setProgress((visible / total) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#030712] text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur border-b border-white/10">
        <div className="h-20 w-full px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">BizBuddy</h1>

          <div className="flex gap-3">
            <Link
              to="/signin"
              className="px-5 py-2 border border-white/20 rounded-lg hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-screen min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        {/* MOVING 3D BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[900px] h-[900px] bg-blue-500/25 blur-[180px] rounded-full top-[-260px] left-1/2 -translate-x-1/2" />

          <div
            className="absolute w-[650px] h-[650px] border border-blue-400/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "spinSlow 30s linear infinite" }}
          />

          <div
            className="absolute w-[500px] h-[500px] border border-cyan-300/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "spinReverse 22s linear infinite" }}
          />

          <div
            className="absolute right-[8%] top-[28%] w-[420px] h-[240px] rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_0_70px_rgba(59,130,246,.35)]"
            style={{ animation: "floatPanel 7s ease-in-out infinite" }}
          />

          <div
            className="absolute left-[10%] bottom-[18%] w-40 h-40 rounded-full bg-cyan-400/40 blur-[35px]"
            style={{ animation: "floatOrb 5s ease-in-out infinite" }}
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Transform Your <span className="text-blue-400">Google Sheets</span>
            <br />
            Into an AI Operations Assistant
          </h1>

          <p className="text-slate-300 mt-6 text-base md:text-lg">
            BizBuddy continuously monitors inventory, payments, and staff
            activity, detects risks early, and gives AI-powered recommendations
            so you act before problems happen.
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,.5)]"
            >
              Start Free
            </Link>
            <Link
              to="/signin"
              className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes spinSlow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes spinReverse {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
          }
          @keyframes floatPanel {
            0%,100% { transform: translateY(0px) rotate(-6deg); }
            50% { transform: translateY(-20px) rotate(-3deg); }
          }
          @keyframes floatOrb {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
          }
        `}</style>
      </section>

      {/*  HOW IT WORKS */}
      <section className="py-24 px-6 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          How BizBuddy Turns Data Into Decisions
        </h2>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 h-full w-[3px] bg-white/10 -translate-x-1/2 rounded-full"
          >
            <div
              className="w-full bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full transition-all duration-200"
              style={{ height: `${progress}%` }}
            />
          </div>

          <div className="space-y-14">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className="absolute left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 top-6 shadow-[0_0_15px_rgba(34,211,238,.8)]"></div>

                <div className="w-full md:w-[45%] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:scale-[1.02] transition">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES  */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14">
          Built for Small Business Operations
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Proactive Operational Alerts",
            "AI-Powered Recommendations",
            "Live Risk Monitoring",
            "Inventory & Payment Tracking",
            "Zero Manual Data Entry",
            "Google Sheets Integration",
          ].map((feature, i) => (
            <div
              key={i}
              className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 via-cyan-400/20 to-indigo-500/30"
            >
              <div className="h-full w-full rounded-2xl bg-[#0b1225]/90 backdrop-blur-xl p-6 transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(59,130,246,.35)]">
                <div className="w-10 h-10 mb-4 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                  ✦
                </div>
                <h3 className="text-lg font-semibold">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
