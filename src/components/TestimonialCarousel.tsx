import { useState, useRef, useEffect, useCallback } from "react";
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
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
);

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef(0);
  const dragStartTime = useRef(0);

  const count = testimonials.length;

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const goTo = useCallback((index: number) => {
    setCurrent(clamp(index, 0, count - 1));
  }, [count]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStart.current = clientX;
    dragStartTime.current = Date.now();
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - dragStart.current;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const elapsed = Date.now() - dragStartTime.current;
    const velocity = Math.abs(dragOffset) / elapsed;
    const threshold = velocity > 0.3 ? 30 : 80;

    if (dragOffset < -threshold) goTo(current + 1);
    else if (dragOffset > threshold) goTo(current - 1);

    setDragOffset(0);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const getCardStyle = (index: number) => {
    const diff = index - current;
    const normalizedOffset = isDragging ? dragOffset / 300 : 0;
    const pos = diff + normalizedOffset;

    const translateX = pos * 85;
    const scale = 1 - Math.abs(pos) * 0.12;
    const rotateY = pos * -8;
    const zIndex = 10 - Math.abs(Math.round(pos));
    const opacity = Math.abs(pos) > 1.8 ? 0 : 1 - Math.abs(pos) * 0.3;

    return {
      transform: `translateX(${translateX}%) scale(${Math.max(scale, 0.7)}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity: Math.max(opacity, 0),
      transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      position: "absolute" as const,
      width: "85%",
      left: "7.5%",
    };
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-card-foreground">💬 What People Are Saying</h2>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-1">
          <StarRating />
          <span className="font-semibold text-card-foreground ml-1">5.0</span>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ perspective: "1000px", height: "260px", cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {testimonials.map((t, i) => (
          <div key={i} style={getCardStyle(i)}>
            <div className="bg-testimonial rounded-2xl p-5 border border-border h-full relative overflow-hidden">
              <Quote className="absolute top-3 right-3 w-8 h-8 text-primary/10" />
              <StarRating />
              <p
                className="text-sm md:text-base text-card-foreground leading-relaxed mt-3 mb-4 font-medium line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: `"${highlightPositiveWords(t.quote)}"`,
                }}
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full cta-gradient flex items-center justify-center text-primary-foreground font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
