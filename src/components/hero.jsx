import { useEffect } from "react";
import Typed from "typed.js";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {

  useEffect(() => {
    AOS.init();

    const typed = new Typed("#typing", {
      strings: [
        "Fullstack Developer",
        "Java & Laravel Enthusiast",
        "I build real-world systems"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 data-aos="fade-up" className="text-4xl font-bold">
          Hi, I'm <span className="text-cyan-400">M. Khanan Mukhtar</span>
        </h1>

        <p data-aos="fade-up" data-aos-delay="200">
          <span id="typing"></span>
        </p>

        <a href="#projects"
          className="inline-block mt-5 px-6 py-3 bg-cyan-400 text-black rounded-lg hover:scale-110 transition">
          View My Work
        </a>
      </div>
    </section>
  )
}