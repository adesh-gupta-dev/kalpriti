import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "../components/ui/Button";

// export default function NotFoundPage() {
//   return (
//     <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
//       <SearchX className="h-12 w-12 text-primary" />
//       <h1 className="mt-4 font-display text-3xl font-bold">Page Not Found</h1>
//       <p className="mt-2 text-sm text-muted">
//         The page you are looking for does not exist or has been moved.
//       </p>
//       <Button as={Link} to="/dashboard" className="mt-6">
//         Back to Dashboard
//       </Button>
//     </main>
//   );
// }
import { useEffect, useRef } from "react";

export default function Space404() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 4000);

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.09,
          parallaxFactor: Math.random() * 0.01,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      starsRef.current.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        const px =
          star.x + (mouse.current.x - canvas.width / 2) * star.parallaxFactor;
        const py =
          star.y + (mouse.current.y - canvas.height / 2) * star.parallaxFactor;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="text-slate-200 min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <main className="relative z-10 w-full max-w-4xl px-6 py-12 flex flex-col items-center text-center">
        {/* 404 */}
        <h1 className="text-[clamp(8rem,20vw,16rem)] font-black text-white glow-text">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold mt-4">
          It looks like you've drifted into deep space.
        </h2>

        <p className="text-slate-400 max-w-lg mx-auto text-lg mt-4">
          The coordinates you entered don't seem to lead anywhere in this
          galaxy. Let's get you back home.
        </p>

        {/* Button */}
        <Button
          as={Link}
          to="/dashboard"
          className="mt-10 inline-flex items-center px-8 py-4 font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          Back to Dashboard{" "}
        </Button>
        {/* Footer Links */}
      </main>
    </div>
  );
}
