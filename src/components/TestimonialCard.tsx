interface TestimonialCardProps {
  quote: string;
  name: string;
  date: string;
}

const TestimonialCard = ({ quote, name, date }: TestimonialCardProps) => {
  return (
    <div className="bg-testimonial rounded-xl p-5 border border-border">
      <p className="text-card-foreground text-sm leading-relaxed mb-3">"{quote}"</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-card-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
