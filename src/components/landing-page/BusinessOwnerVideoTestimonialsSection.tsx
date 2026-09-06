import { Star } from "lucide-react";

type VideoTestimonial = {
  src: string;
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: VideoTestimonial[] = [
  {
    src: "/saurabh-shinde.mp4",
    name: "Saurabh Shinde",
    role: "Business Owner",
    quote:
      "I was bleeding ₹4 lakhs every month on inefficient operations. Within 90 days of implementing these systems, I turned that into pure profit.",
  },
];

export default function BusinessOwnerVideoTestimonialsSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[1.85rem] sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Hear It From{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent inline-block">
              Our Business Owners
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
          <p className="text-gray-500 text-sm sm:text-lg max-w-3xl mx-auto mt-4">
            Don't take our word for it — hear from business owners who were exactly where you are right now.
          </p>
        </div>

        {/* Video cards */}
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.src}
              className="group rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-black">
                <video
                  className="w-full h-full object-cover"
                  src={`${item.src}#t=0.5`}
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
              <div className="p-5">
                <p className="text-gray-900 text-base font-semibold mb-3 leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.role}</div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
