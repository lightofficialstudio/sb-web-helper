// pages/index.tsx
"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/section/hero";
import AboutSection from "@/components/section/about";
import SkillsSection from "@/components/section/skill";
import WorksSection from "@/components/section/work-experience";
import ContactSection from "@/components/section/contact";

export default function Home() {
    useEffect(() => {
        const handleNavClick = (event: any) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        };

        document.querySelectorAll("nav a").forEach((anchor) => {
            anchor.addEventListener("click", handleNavClick);
        });

        return () => {
            document.querySelectorAll("nav a").forEach((anchor) => {
                anchor.removeEventListener("click", handleNavClick);
            });
        };
    }, []);

    return (
        <div className="bg-gray-100 text-white">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <WorksSection />
            <ContactSection />
        </div>
    );
}