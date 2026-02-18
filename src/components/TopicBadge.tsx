interface TopicBadgeProps {
  emoji: string;
  label: string;
}

const TopicBadge = ({ emoji, label }: TopicBadgeProps) => {
  return (
    <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-card-foreground font-medium">
      <span>{emoji}</span>
      {label}
    </span>
  );
};

export default TopicBadge;
