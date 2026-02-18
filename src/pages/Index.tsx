import TestimonialCarousel from "@/components/TestimonialCarousel";
import TopicBadge from "@/components/TopicBadge";
import CompanyList from "@/components/CompanyList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Zap, Brain, Trophy, Target, Clock } from "lucide-react";
import posterImg from "@/assets/poster.png";
import posterCoverImg from "@/assets/poster-cover.png";

const topics = [
  { emoji: "🛠", label: "ADF (Azure Data Factory)" },
  { emoji: "⚡", label: "Azure Databricks" },
  { emoji: "🧠", label: "Synapse Analytics" },
  { emoji: "🗂", label: "ADLS Gen2" },
  { emoji: "🧪", label: "Delta Lake" },
  { emoji: "🧾", label: "SQL & PySpark" },
  { emoji: "🐍", label: "Python" },
  { emoji: "❄️", label: "Snowflake" },
  { emoji: "🧱", label: "Microsoft Fabric" },
  { emoji: "🔄", label: "Real company-based scenario questions" },
];

const benefits = [
  { icon: Brain, text: "Clarity on the most frequently asked topics" },
  { icon: Zap, text: "Confidence to handle 3–4 technical rounds" },
  { icon: CheckCircle, text: "Highly structured, outcome-oriented preparation" },
  { icon: Trophy, text: "Competitive advantage over other candidates" },
  { icon: Target, text: "Focused learning → faster results" },
];

const highlights = [
  { emoji: "📌", text: "Real company-specific Q&A" },
  { emoji: "🔍", text: "Concept clarity + real-world scenarios" },
  { emoji: "⏳", text: "Saves hours of preparation time" },
  { emoji: "🎓", text: "Prepares you for interviews at 24+ top companies" },
  { emoji: "📈", text: "Built for serious candidates aiming for fast, outcome-driven preparation" },
];

const testimonials = [
  {
    quote: "Very insightful and easy to understand. These Azure Data Engineer interview questions made my preparation smoother and more structured.",
    name: "Anonymous",
    date: "Nov 2025",
  },
  {
    quote: "It's a great helpful content in preparing for interview.",
    name: "Rajendra Prasad",
    date: "Nov 2025",
  },
  {
    quote: "It was really helpful, felt confident for my upcoming interview.",
    name: "Abhishek Kumar Gupta",
    date: "Oct 2025",
  },
  {
    quote: "I recently purchased a learning package from Rabi Sankar Mahata, and it was truly insightful and well-structured. The content was practical, up-to-date, and delivered with great clarity.",
    name: "Susmita Biswas",
    date: "Oct 2025",
  },
  {
    quote: "Very good and helpful for interviews",
    name: "Vaishnavii S",
    date: "Oct 2025",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-6 px-4">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1.5 cta-gradient" />

          {/* Back button */}
          <div className="p-4 pb-0">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-card-foreground transition-colors border border-border rounded-full px-3 py-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          {/* Poster Images */}
          <div className="px-6 pt-2">
            <img
              src={posterCoverImg}
              alt="Azure Data Engineering Interview Guide - Cover"
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Hero section */}
          <div className="p-6 pt-4">
            {/* Best Seller Badge */}
            <span className="inline-block bg-badge text-badge-foreground text-xs font-bold px-3 py-1 rounded-md mb-3">
              Best Seller
            </span>

            <h1 className="text-2xl md:text-3xl font-extrabold text-card-foreground leading-tight mb-4">
              🚀 Top 24+ MNC Data Engineer Interview Qs and Ans
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pb-4 border-b border-border">
              <span>📦</span>
              <span className="font-medium">Digital Product</span>
            </div>

            {/* AI Summary box */}
            <div className="bg-testimonial rounded-xl p-4 mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {["Clear", "Practical", "Insightful"].map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-card border border-border rounded-full px-3 py-1 text-card-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-card-foreground leading-relaxed">
                Rabi Sankar Mahata's insightful, practical learning resources empower learners, enhancing their skills and boosting their career confidence.
              </p>
              <p className="text-xs text-muted-foreground mt-2">AI-generated based on testimonials</p>
            </div>

            {/* Second Poster */}
            <img
              src={posterImg}
              alt="Azure Data Engineering Interview Guide - Details"
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="px-6 pb-6 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">
                🚀 Crack Your Azure Data Engineering Interviews with Confidence!
              </h2>
              <p className="text-sm text-card-foreground leading-relaxed">
                Your ultimate interview preparation bundle with <strong>1200+ real interview questions & answers</strong> asked in Big 4 firms, top MNCs, product companies, and high-growth startups.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                🎯 No boring theory — only real, scenario-based Q&A that interviewers actually ask.
              </p>
            </div>

            {/* Why this bundle */}
            <div>
              <h2 className="text-lg font-bold text-card-foreground mb-3">💡 Why This Bundle Is a Game-Changer</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Designed for professionals with <strong>2–10 years of experience</strong>, this kit helps you target mid to senior-level roles with ease.
              </p>
              <div className="space-y-2">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-start gap-2 text-sm text-card-foreground">
                    <span>{item.emoji}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Inside */}
            <div>
              <h2 className="text-lg font-bold text-card-foreground mb-4">🔥 What's Inside?</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {topics.map((topic) => (
                  <TopicBadge key={topic.label} emoji={topic.emoji} label={topic.label} />
                ))}
              </div>
              <div className="flex flex-col gap-2 text-sm text-card-foreground">
                <span>📅 <strong>Latest 2025 Updated Content.</strong></span>
                <span>📄 Instant <strong>PDF/DOC Download.</strong></span>
              </div>
            </div>

            {/* Companies */}
            <div>
              <h2 className="text-lg font-bold text-card-foreground mb-4">🏢 Asked in Companies Like</h2>
              <CompanyList />
            </div>

            {/* What You'll Gain */}
            <div>
              <h2 className="text-lg font-bold text-card-foreground mb-4">🎯 What You'll Gain</h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-3">
                    <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-card-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-testimonial rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-card-foreground mb-2">🌟 Ready to Level Up Your Career?</h2>
              <p className="text-sm text-muted-foreground mb-1">Stop wasting hours on random preparation.</p>
              <p className="text-sm text-card-foreground font-medium mb-4">Save time. Strengthen your concepts. Boost your confidence.</p>
              <p className="text-xs text-muted-foreground mb-4">📈 Upgrade your preparation. Upgrade your career.</p>
            </div>

            {/* Testimonials */}
            <TestimonialCarousel testimonials={testimonials} />

          </div>
        </div>
      </div>

      {/* Fixed Sticky Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-3 sm:pb-4">
        <div className="w-full max-w-2xl cta-gradient shadow-[0_-8px_30px_rgba(0,0,0,0.4)] border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 backdrop-blur-sm">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] sm:text-xs font-bold text-primary-foreground/80 uppercase tracking-widest animate-pulse">
              🔥 Limited Offer
            </span>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black text-primary-foreground tracking-tight">₹560</span>
              <span className="text-xs sm:text-sm text-primary-foreground/50 line-through">₹5,000</span>
              <span className="text-[10px] sm:text-xs font-extrabold bg-primary-foreground/20 text-primary-foreground rounded-full px-2 py-0.5">
                89% OFF
              </span>
            </div>
          </div>
          <Button
            className="bg-primary-foreground text-primary font-black px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_6px_30px_rgba(255,255,255,0.4)] transition-all duration-200 whitespace-nowrap"
            size="lg"
            asChild
          >
            <a href="https://topmate.io/rabi_sankar_mahata/1702331" target="_blank" rel="noopener noreferrer">
              🔥 Buy Now
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-24" />
    </div>
  );
};

export default Index;
