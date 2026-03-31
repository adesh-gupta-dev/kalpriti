import { useEffect, useRef, useState } from "react";
export default function UnauthorizedPage() {
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const glow = glowRef.current;
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      glow.style.opacity = "1";
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      if (window.innerWidth > 768) {
        const xOffset = (e.clientX - window.innerWidth / 2) / 50;
        const yOffset = (e.clientY - window.innerHeight / 2) / 50;
        card.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }
    };
    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Redirecting to Secure Login Portal...");
      setLoading(false);
    }, 800);
  };
  const goHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="text-slate-400 flex items-center justify-center min-h-screen p-6 bg-[#020617] overflow-hidden font-[Inter]">
      <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden">
        <h1 className="text-[25rem] font-black opacity-[0.03] bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent select-none pointer-events-none">
          401
        </h1>
      </div>
      <main
        ref={cardRef}
        className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-150 opacity-20"></div>
            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse scale-125"></div>
            <div className="relative  p-6 rounded-2xl  ">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight glow-text">
            Access Denied
          </h2>
          <p className="text-slate-400  text-base md:text-lg leading-relaxed max-w-xs mx-auto">
            Authentication is required to access this resource. Please log in to
            your account.
          </p>
        </div>
        <p className="mt-12 text-xs text-slate-500 uppercase tracking-widest">
          Error Code: 401 • Unauthorized
        </p>
      </main>
      <div
        ref={glowRef}
        className="fixed pointer-events-none w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500"
      ></div>
    </div>
  );
}
