import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

export default function TestimonialsCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Craig Bator",
      position: "CEO & Co Founder",
      company: "Zendesk",
      avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-17.png",
      rating: 5,
      text: "AskTalos has made automating customer support effortless. The AI components are easy to customize and integrate seamlessly into our workflows!"
    },
    {
      id: 2,
      name: "Martin Dorwart",
      position: "Product Manager",
      company: "Orbit",
      avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-5.png",
      rating: 4.5,
      text: "With AskTalos, we can easily manage customer communications and see engagement metrics in real-time. The platform is intuitive and powerful."
    },
    {
      id: 3,
      name: "Alexandra Lee",
      position: "Lead Developer",
      company: "TechNova",
      avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png",
      rating: 5,
      text: "AskTalos's components saved us so much time! The responsive designs and intuitive interface made our development process faster and more efficient."
    },
    {
      id: 4,
      name: "Jason Wu",
      position: "Product Designer",
      company: "InnovateX",
      avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-12.png",
      rating: 5,
      text: "AskTalos's design library helped us scale our AI automation efforts while maintaining a consistent, professional look. Couldn't have asked for a better tool!"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            {i < Math.floor(rating) ? (
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ) : i < rating ? (
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 opacity-50" />
            ) : (
              <Star className="w-6 h-6 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-6 sm:py-10 lg:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full gap-12 max-lg:flex-col md:gap-16 lg:items-center lg:gap-24">
          {/* Left Content - Navigation Only */}
          <div>
            <div className="mt-10 flex gap-4">
              <button
                onClick={prevSlide}
                className="btn btn-square btn-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg p-2 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-square btn-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg p-2 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="w-full">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                <div className="flex gap-6">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="min-w-full md:min-w-[calc(50%-12px)]"
                    >
                      <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors h-full shadow-sm hover:shadow-md">
                        {/* Star Rating */}
                        {renderStars(testimonial.rating)}

                        {/* User Info */}
                        <div className="flex items-center gap-3 mt-5">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full"
                          loading="lazy"

                          />
                          <div>
                            <h4 className="text-gray-900 font-medium">{testimonial.name}</h4>
                            <p className="text-gray-600 text-sm">
                              {testimonial.position} at{" "}
                              <span className="text-gray-900 font-semibold">{testimonial.company}</span>
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-gray-600 mt-5">{testimonial.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
