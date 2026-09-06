import img7 from "@/assets/trusted/img7-C3bCmecA.png";
import img8 from "@/assets/trusted/img8-DBvEg5LJ.png";
import img10 from "@/assets/trusted/img10-CVz0O96m.png";
import img12 from "@/assets/trusted/img12-By0Z8JB5.png";
import img13 from "@/assets/trusted/img13-DaanTewb.png";
import img14 from "@/assets/trusted/img14-qpk2pzJM.png";
import param from "@/assets/trusted/param-CwFHs4IP.png";
import novaretail from "@/assets/trusted/novaretail-CTv5ZO1e.png";
import zenithcare from "@/assets/trusted/zenithcare-CPQUpRA7.png";
import brickline from "@/assets/trusted/brickline-BsrYES4L.png";

const logos: { name: string; src: string; imgClass?: string }[] = [
  { name: "Convverge",                src: img7 },
  { name: "InsideAIML",               src: img8 },
  { name: "Param Ply & Hardware",     src: param },
  { name: "Cool Point Refrigeration", src: img10 },
  { name: "NovaRetail",               src: novaretail },
  { name: "ZenithCare",               src: zenithcare, imgClass: "max-h-12 sm:max-h-14 -translate-y-1.5 sm:-translate-y-2" },
  { name: "Brickline Realty",         src: brickline },
  { name: "Pemeco Consulting",        src: img12 },
  { name: "Fairsys",                  src: img13 },
  { name: "Credbot Fincare",          src: img14 },
];

const LogoCarousel = ({ gap = "mx-6" }: { gap?: string }) => {
  const track = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden bg-transparent mt-3">
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10" style={{ background: "linear-gradient(to left, white, transparent)" }} />

      {/* Track — 2 identical sets so the loop point is invisible */}
      <div className="flex w-max logo-marquee">
        {track.map((logo, index) => (
          <div key={index} className={`flex-shrink-0 ${gap} flex items-center justify-center h-20 sm:h-24 w-36 sm:w-48`}>
            <img
              src={logo.src}
              alt={logo.name}
              className={`${logo.imgClass ?? "max-h-16 sm:max-h-20"} max-w-full w-auto object-contain`}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logo-marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-marquee {
          animation: logo-marquee-scroll 35s linear infinite;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .logo-marquee { animation-duration: 25s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default LogoCarousel;
