import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MoveRight, Zap, Gauge, Battery } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Keeping stats simple and readable
const STATS = [
  { label: "Efficiency", value: "98%", icon: Zap },
  { label: "0-60 MPH", value: "2.4s", icon: Gauge },
  { label: "Range", value: "450mi", icon: Battery },
];

export default function App() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const carRef = useRef(null);

  useGSAP(
    () => {
      // Intro animation (runs once)
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(headlineRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.1,
        })
        .from(
          ".stat-item",
          {
            y: 40,
            opacity: 0,
            stagger: 0.2,
            duration: 0.7,
          },
          "-=0.6"
        )
        .from(
          carRef.current,
          {
            x: -150,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        );

      // Car movement while scrolling
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        x: "120vw",
        scale: 1.15,
        rotation: 4,
        ease: "none",
      });

      // Background text drift
      gsap.to(".bg-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        x: -500,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#0a0a0a] text-white"
    >
      // Big background typography 
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden">
        <h2 className="bg-text text-[40vw] font-black whitespace-nowrap">
          PERFORMANCE PERFORMANCE PERFORMANCE
        </h2>
      </div>

      // HERO - sticky 
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="relative z-10 text-center mb-24">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-7xl lg:text-8xl font-extrabold uppercase mb-8"
          >
            W E L C O M E <br />
            <span className="text-emerald-500">I T Z F I Z Z</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-10">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-item flex flex-col items-center">
                <div className="p-3 mb-3 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-xs uppercase tracking-widest text-white/40 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        //Car visual 
        <div
          ref={carRef}
          className="absolute bottom-20 left-[-20%] w-[80%] max-w-[800px] z-20 pointer-events-none"
        >
          <div className="relative">
            // Shadow 
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/60 blur-2xl rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200"
              alt="Performance car"
              className="w-full rounded-2xl drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />

            // Accent glow 
            <div className="absolute top-[45%] right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
          </div>
        </div>

        // Scroll hint 
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll to drive
          </span>
          <MoveRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      // Content sections 
      <section className="relative z-10 h-screen flex items-center px-8 md:px-24">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-6">
            Engineered for the <span className="text-emerald-500">Future</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Every detail is crafted to push performance forward — from instant
            torque to precision handling.
          </p>
        </div>
      </section>

      <section className="relative z-10 h-screen flex items-center justify-end px-8 md:px-24">
        <div className="max-w-2xl text-right">
          <h2 className="text-5xl font-bold mb-6">
            Pure <span className="text-emerald-500">Adrenaline</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Built to excite. Designed to dominate every road, every time.
          </p>

          <button className="mt-8 px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2 ml-auto">
            Configure Yours <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="relative z-10 py-24 border-t border-white/10 text-center">
        <p className="text-white/20 text-sm tracking-widest uppercase">
          © 2026 ITZ FIZZ AUTOMOTIVE
        </p>
      </footer>
    </div>
  );
}