import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Animations from "@/components/Animations";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { About, Expertise } from "@/components/About";
import Work from "@/components/Work";
import VideoSection from "@/components/VideoSection";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DevBanner from "@/components/DevBanner";
import { loadPortfolio } from "@/lib/assets";
import { site } from "@/lib/content";

export default function Page() {
  const { categories, videos, portrait, aboutImg, missing } = loadPortfolio();

  // Only link to sections that actually render
  const links = [
    { id: "about", label: "About" },
    ...(categories.length ? [{ id: "work", label: "Work" }] : []),
    ...(videos.length ? [{ id: "video", label: "Video" }] : []),
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav links={links} email={site.email} />
      <main>
        <Hero portrait={portrait} />
        <About image={aboutImg} />
        <Expertise />
        {categories.length ? <Work categories={categories} /> : null}
        {videos.length ? <VideoSection videos={videos} /> : null}
        <Experience />
        <Contact />
      </main>
      <Footer links={links} />
      <Animations />
      <DevBanner missing={missing} />
    </>
  );
}
