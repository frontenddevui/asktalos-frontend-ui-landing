import { lazy, Suspense, useState, useEffect } from "react";
import { DemoModalSkeleton } from "./skeletons";
import Footer from "./Footer";
import VoiceWidget from "./VoiceWidget";
import VoiceAgentModal from "./VoiceAgentModal";
const DemoRequestModal = lazy(() => import("./DemoRequestModal"));

interface LandingLayoutProps {
  children: React.ReactNode;
  showDemoPopup?: boolean;
  demoPopupDelay?: number;
}

/**
 * Slim standalone replacement for the main app's Layout.tsx.
 * Renders the same Footer / VoiceWidget / VoiceAgentModal / DemoRequestModal
 * stack and demo-popup logic, but intentionally omits the Navbar — this
 * project only ever renders the single landing page, with no navigation.
 */
const LandingLayout = ({ children, showDemoPopup = false, demoPopupDelay = 10000 }: LandingLayoutProps) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVoiceWidgetOpen, setIsVoiceWidgetOpen] = useState(false);

  // Make the function available globally so any button can trigger the modal
  useEffect(() => {
    (window as any).openDemoModal = () => setIsDemoModalOpen(true);
    return () => {
      delete (window as any).openDemoModal;
    };
  }, []);

  // Global scroll animations — runs once on mount (single page, no route changes)
  useEffect(() => {
    let rafId: number;
    let observer: IntersectionObserver;

    const setup = () => {
      document.querySelectorAll<HTMLElement>('.scroll-animate').forEach((el) => {
        el.classList.remove('in-view');
      });

      const sectionTargets = Array.from(
        document.querySelectorAll<HTMLElement>('main section, main > div')
      );
      const innerTargets = Array.from(
        document.querySelectorAll<HTMLElement>(
          'main section h1, main section h2, main section h3, main section h4, ' +
          'main section > div > img, main section .card, main section [class*="grid"] > *'
        )
      );

      const targets = [...sectionTargets, ...innerTargets];

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
        el.classList.add('scroll-animate');
        if (alreadyVisible) {
          el.classList.add('in-view');
        } else {
          observer.observe(el);
        }
      });
    };

    rafId = requestAnimationFrame(setup);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {children}
      </main>

      {/* Voice Widget (left side) */}
      <VoiceWidget onOpenChange={setIsVoiceWidgetOpen} />

      {/* Demo Request Modal */}
      <Suspense fallback={isDemoModalOpen ? <DemoModalSkeleton /> : null}>
        <DemoRequestModal
          isOpenExternal={isDemoModalOpen}
          onCloseExternal={() => setIsDemoModalOpen(false)}
          showAutoPopup={showDemoPopup}
          autoPopupDelay={demoPopupDelay}
          preventAutoPopup={isVoiceWidgetOpen}
        />
      </Suspense>

      <Footer />
    </div>
  );
};

export default LandingLayout;
