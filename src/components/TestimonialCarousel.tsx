import { useState, useRef, useCallback } from "react";
import { Star, Quote, Shield, BadgeCheck, Users, TrendingUp } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  date: string;
  role?: string;
  highlight?: string;
}

const POSITIVE_WORDS = [
  "insightful", "helpful", "great", "well-structured", "practical",
  "confident", "clarity", "smoother", "structured", "up-to-date",
  "empowering", "boosting", "good", "really helpful", "cracked",
];

function highlightPositiveWords(text: string) {
  let result = text;
  POSITIVE_WORDS.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    result = result.replace(
      regex,
      `<mark class="bg-accent/30 text-card-foreground font-bold rounded px-0.5">$1</mark>`
    );
  });
  return result;
}

const StarRating = ({ size = "sm" }: { size?: "sm" | "md" }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`fill-accent text-accent ${size === "md" ? "w-5 h-5" : "w-4 h-4"}`}
      />
    ))}
  </div>
);

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const trustCompanies = ["Deloitte", "TCS", "Infosys", "Wipro", "Accenture", "Microsoft"];

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef(0);
  const dragStartTime = useRef(0);
  const count = testimonials.length;

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const goTo = useCallback(
    (i: number) => setCurrent(clamp(i, 0, count - 1)),
    [count]
  );

  const handleDragStart = (x: number) => {
    setIsDragging(true);
    dragStart.current = x;
    dragStartTime.current = Date.now();
  };
  const handleDragMove = (x: number) => {
    if (!isDragging) return;
    setDragOffset(x - dragStart.current);
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

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const getCardStyle = (index: number) => {
    const diff = index - current;
    const norm = isDragging ? dragOffset / 300 : 0;
    const pos = diff + norm;
    const tx = pos * 82;
    const scale = 1 - Math.abs(pos) * 0.1;
    const z = 10 - Math.abs(Math.round(pos));
    const op = Math.abs(pos) > 1.8 ? 0 : 1 - Math.abs(pos) * 0.35;
    return {
      transform: `translateX(${tx}%) scale(${Math.max(scale, 0.75)})`,
      zIndex: z,
      opacity: Math.max(op, 0),
      transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      position: "absolute" as const,
      width: "88%",
      left: "6%",
    };
  };

  return (
    <div className="space-y-6">
      {/* ── Section Header ── */}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">
          Testimonials
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold text-card-foreground">
          💬 What People Are Saying
        </h2>
        <p className="text-sm text-muted-foreground">
          Trusted by <span className="font-bold text-card-foreground">1,000+</span> learners worldwide
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <StarRating size="md" />
          <span className="text-lg font-bold text-card-foreground">5.0</span>
          <span className="text-xs text-muted-foreground">(50+ reviews)</span>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ height: "280px", cursor: isDragging ? "grabbing" : "grab" }}
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
            <div className="bg-card rounded-2xl p-5 border border-border shadow-lg h-full relative overflow-hidden">
              <Quote className="absolute top-3 right-3 w-8 h-8 text-primary/8" />

              {/* Verified badge */}
              <div className="flex items-center justify-between mb-3">
                <StarRating />
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                  <BadgeCheck className="w-3 h-3" />
                  Verified Purchase
                </span>
              </div>

              <p
                className="text-sm md:text-base text-card-foreground leading-relaxed mb-4 font-medium line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: `"${highlightPositiveWords(t.quote)}"`,
                }}
              />

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full cta-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-card-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role ?? "Data Engineer"} · {t.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots + arrows */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-card-foreground hover:border-primary/40 transition-colors disabled:opacity-30"
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 cta-gradient" : "w-2 bg-border hover:bg-muted-foreground/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === count - 1}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-card-foreground hover:border-primary/40 transition-colors disabled:opacity-30"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* ── Social Proof Strip ── */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-testimonial rounded-xl p-3 border border-border">
          <Users className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-extrabold text-card-foreground">1,000+</p>
          <p className="text-[10px] text-muted-foreground">Learners Enrolled</p>
        </div>
        <div className="bg-testimonial rounded-xl p-3 border border-border">
          <Star className="w-5 h-5 fill-accent text-accent mx-auto mb-1" />
          <p className="text-lg font-extrabold text-card-foreground">5.0</p>
          <p className="text-[10px] text-muted-foreground">Average Rating</p>
        </div>
        <div className="bg-testimonial rounded-xl p-3 border border-border">
          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-extrabold text-card-foreground">89%</p>
          <p className="text-[10px] text-muted-foreground">Interview Success</p>
        </div>
      </div>

      {/* Companies Strip */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground font-medium">
          <Shield className="w-3 h-3 inline mr-1 -mt-0.5" />
          Our learners got placed at
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {trustCompanies.map((c) => (
            <span key={c} className="text-xs font-semibold text-muted-foreground/70">{c}</span>
          ))}
        </div>
      </div>

      {/* CTA line */}
      <p className="text-center text-sm font-semibold text-primary">
        🚀 Join thousands of successful learners — start preparing today!
      </p>
    </div>
  );
};

export default TestimonialCarousel;
