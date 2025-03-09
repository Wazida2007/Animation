"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const slidesData = [
  { id: 1, src: "https://picsum.photos/600/800?random=1" },
  { id: 2, src: "https://picsum.photos/600/801?random=2" },
  { id: 3, src: "https://picsum.photos/600/802?random=3" },
  { id: 4, src: "https://picsum.photos/600/803?random=4" },
  { id: 5, src: "https://picsum.photos/600/804?random=5" },
];

export default function VideoAnimation() {
  const [current, setCurrent] = useState(2); 
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const animateSlides = () => {
      gsap.to(".slide", {
        scale: (index) => (index === current ? 1 : 0.85), 
        opacity: (index) => (index === current ? 1 : 0.6),
        x: (index) => (index - current) * 250, 
        zIndex: (index) => (index === current ? 10 : 5),
        duration: 0.5,
        ease: "power2.out",
      });
    };

    animateSlides();

    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev < slidesData.length - 1 ? prev + 1 : 0));
      }, 2000); 
    }

    return () => clearInterval(interval);
  }, [current, isPlaying]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="relative w-[550px] h-[350px] flex items-center justify-center">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className="slide absolute w-[250px] h-[350px] rounded-lg text-3xl font-bold shadow-lg transform transition-transform duration-500"
          >
            <img src={slide.src} alt="Slide" className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-5 flex space-x-4">
        <button onClick={togglePlay} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex space-x-2">
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-2 rounded-full transition-all duration-200 ${
              index === current ? "bg-white w-6" : "bg-gray-400 w-4"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
