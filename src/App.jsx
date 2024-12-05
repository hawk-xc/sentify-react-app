import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import AboutMeContent from "./components/AboutMeContent";
import MenuToggle from "./particles/MenuToggle";
import SideBar from "./components/SideBar";
import MySkills from "./components/MySkills";
import MySkillsContent from "./components/MySkillsContent";
import MyCertificate from "./components/MyCertificate";
import MyCertificateContent from "./components/MyCertificateContent";
import MyProject from "./components/MyProject";
import MyProjectContent from "./components/MyProjectContent";
import ContactMe from "./components/ContactMe";
import ContactMeContent from "./components/ContactMeContent";
import ScrollProgress from "./components/ScrollProgress";
import ScrollButton from "./components/ScrollButton";
import Footer from "./components/Footer";

export default function App() {
  const [sidebar, setSideBar] = useState(false);
  const [currentRefIndex, setCurrentRefIndex] = useState(0); // State untuk melacak referensi yang terlihat saat ini

  const homeRef = useRef(null);
  const aboutmeRef = useRef(null);
  const skillsRef = useRef(null);
  const certificateRef = useRef(null);
  const projectRef = useRef(null);
  const contactmeRef = useRef(null);

  const refLists = {
    homeRef,
    aboutmeRef,
    skillsRef,
    certificateRef,
    projectRef,
    contactmeRef,
  };

  const reference = (ref) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
        left: 0,
      });
      setSideBar(false);
    } else {
      console.warn("scroll bug");
    }
  };

  const handleSideBarAction = () => {
    setSideBar(!sidebar);
  };

  // Fungsi untuk menangani klik tombol scroll ke referensi berikutnya
  const scrollToNextRef = () => {
    const refKeys = Object.keys(refLists);
    const nextRefIndex = (currentRefIndex + 1) % refKeys.length; // Menemukan indeks referensi berikutnya (looping kembali ke awal setelah yang terakhir)
    setCurrentRefIndex(nextRefIndex); // Update state dengan indeks referensi saat ini
    reference(refLists[refKeys[nextRefIndex]]); // Panggil fungsi untuk scroll ke ref berikutnya
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const refKey = Object.keys(refLists).find(
              (key) => refLists[key].current === entry.target
            );
            const index = Object.keys(refLists).indexOf(refKey);
            setCurrentRefIndex(index); // Update state dengan indeks referensi yang terlihat saat ini
          }
        });
      },
      { threshold: 0.5 } // Mengatur threshold 50% untuk dianggap terlihat
    );

    // Observasi semua elemen yang menggunakan refs
    Object.values(refLists).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect(); // Bersihkan observer saat komponen di-unmount
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden align-middle md:px-10 max-sm:px-0 primary-background lexend-deca-font">
      <ScrollProgress />
      <Hero homeRef={homeRef}>
        <Navbar reference={reference} refLists={refLists} />
        <HeroContent contactmeRef={contactmeRef} reference={reference} />
      </Hero>
      <AboutMe aboutmeRef={aboutmeRef}>
        <AboutMeContent />
      </AboutMe>
      <MySkills skillsRef={skillsRef}>
        <MySkillsContent />
      </MySkills>
      <MyCertificate certificateRef={certificateRef}>
        <MyCertificateContent />
      </MyCertificate>
      <MyProject projectRef={projectRef}>
        <MyProjectContent />
      </MyProject>
      <ContactMe contactmeRef={contactmeRef}>
        <ContactMeContent />
      </ContactMe>
      <Footer />
      <MenuToggle handleSideBarAction={handleSideBarAction} sidebar={sidebar} />
      <SideBar sidebar={sidebar} reference={reference} refLists={refLists} />
      <ScrollButton
        scrollToNextRef={scrollToNextRef}
        currentRefIndex={currentRefIndex}
      />
    </div>
  );
}
