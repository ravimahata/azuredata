import { useState, useEffect, useCallback } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  date: string;
}

const POSITIVE_WORDS = [
  "insightful", "helpful", "great", "well-structured", "practical",
  "confident", "clarity", "smoother", "structured", "up-to-date",
  "empowering", "boosting", "good", "really helpful",
];

function highlightPositiveWords(text: string) {
  let result = text;
  POSITIVE_WORDS.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    result = result.replace(
      regex,
      `<mark class="bg-accent/40 text-card-foreground font-semibold rounded px-0.5">$1</mark>`
    );
  });
  return result;
}

const StarRating = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
    ))}
  </div>
);

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating]
  );

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length, "next");
    }, 5000);
    return () => clearInterval(timer);
  }, [current, testimonials.length, goTo]);

  const t = testimonials[current];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-card-foreground">💬 What People Are Saying</h2>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <StarRating />
          <span className="font-semibold text-card-foreground ml-1">5.0</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative bg-testimonial rounded-2xl p-6 border border-border overflow-hidden min-h-[200px]">
        {/* Decorative quote */}
        <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />

        <div
          className={`transition-all duration-300 ease-out ${
            isAnimating
              ? direction === "next"
                ? "opacity-0 translate-x-4"
                : "opacity-0 -translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
        >
          <StarRating />
          <p
            className="text-base md:text-lg text-card-foreground leading-relaxed mt-4 mb-5 font-medium"
            dangerouslySetInnerHTML={{
              __html: `"${highlightPositiveWords(t.quote)}"`,
            }}
          />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full cta-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 cta-gradient"
                : "w-2 bg-border hover:bg-muted-foreground/30"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
