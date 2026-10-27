"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Build Modern Web Apps",
    desc: "We create fast, scalable and secure applications.",
    bg: "bg-blue-600",
  },
  {
    title: "Grow Your Business",
    desc: "Digital solutions that help you scale faster.",
    bg: "bg-green-600",
  },
  {
    title: "Next.js Development",
    desc: "High performance apps with modern UI/UX.",
    bg: "bg-purple-600",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* HERO CAROUSEL */}
      <section className="h-[70vh] flex items-center justify-center text-white">
        <div className={`w-full h-full flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ${slides[current].bg}`}>
          <h2 className="text-4xl font-bold mb-4">{slides[current].title}</h2>
          <p className="text-lg mb-6">{slides[current].desc}</p>

          <button className="bg-white text-black px-6 py-2 rounded-md">Learn More</button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Features</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl mb-2">Fast Performance</h3>
            <p>Optimized apps with best speed and UX.</p>
          </div>

          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl mb-2">Secure System</h3>
            <p>Built with security best practices.</p>
          </div>

          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl mb-2">Scalable</h3>
            <p>Grows with your business needs.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl">Web Development</h3>
          </div>

          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl">UI/UX Design</h3>
          </div>

          <div className="bg-white p-6 shadow rounded-md">
            <h3 className="font-bold text-xl">API Development</h3>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600">We are a modern software development company building scalable applications using Next.js, Node.js, and cloud technologies.</p>
      </section>

      
    </div>
  );
}
