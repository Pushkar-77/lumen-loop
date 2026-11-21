"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, Share2, MessageSquare } from "lucide-react";

interface SampleTestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  city: string;
  metric: string;
  initialReactions: {
    like: number;
    share: number;
    comment: number;
  };
}

const sampleTestimonialsData: SampleTestimonialItem[] = [
  {
    id: "nexus",
    quote:
      "Most agencies pitched us vanity impressions. Lumen Loop connected our Google Ads and organic search directly to closed CRM pipeline. Our cost-per-qualified-lead dropped 38% in five months.",
    author: "Rohan Deshmukh",
    role: "VP of Growth",
    company: "Nexus Cloud Platforms",
    city: "Pune",
    metric: "+240% Pipeline Velocity",
    initialReactions: { like: 42, share: 28, comment: 19 },
  },
  {
    id: "kinetic",
    quote:
      "We were burning ₹18 Lakhs a month on Meta ads with erratic ROAS. Lumen Loop built a structured creative testing pipeline and lifecycle retention engine that took us to a consistent 4.8x blended return.",
    author: "Ananya Sen",
    role: "Founder & CEO",
    company: "Kinetic D2C Apparel",
    city: "Bengaluru",
    metric: "4.8x Blended ROAS",
    initialReactions: { like: 56, share: 34, comment: 27 },
  },
  {
    id: "solaria",
    quote:
      "Their SEO roadmap is unlike typical keyword stuffing. They targeted high-intent decision-maker search clusters, bringing us three enterprise deals directly from search within two quarters.",
    author: "Vikramaditya Patil",
    role: "Chief Revenue Officer",
    company: "Solaria HealthTech",
    city: "Mumbai",
    metric: "₹4.2Cr Attributed ARR",
    initialReactions: { like: 38, share: 21, comment: 15 },
  },
];

export function Testimonials() {
  const [reactions, setReactions] = useState<{
    [key: string]: { like: number; share: number; comment: number; userClicked?: { [type: string]: boolean } };
  }>(() => {
    const initial: { [key: string]: { like: number; share: number; comment: number; userClicked: { [type: string]: boolean } } } = {};
    sampleTestimonialsData.forEach((t) => {
      initial[t.id] = { ...t.initialReactions, userClicked: {} };
    });
    return initial;
  });

  const [activeBubble, setActiveBubble] = useState<{ id: string; type: string } | null>(null);

  const handleReactionClick = (id: string, type: "like" | "share" | "comment") => {
    setReactions((prev) => {
      const current = prev[id] || { like: 0, share: 0, comment: 0, userClicked: {} };
      const alreadyClicked = current.userClicked?.[type];

      return {
        ...prev,
        [id]: {
          ...current,
          [type]: alreadyClicked ? current[type] - 1 : current[type] + 1,
          userClicked: {
            ...current.userClicked,
            [type]: !alreadyClicked,
          },
        },
      };
    });

    // Trigger floating bubble
    setActiveBubble({ id, type });
    setTimeout(() => {
      setActiveBubble(null);
    }, 700);
  };

  return (
    <section id="testimonials" className="relative w-full py-24 bg-[#0B0F19] text-[#F8FAFC] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2563EB]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header with balanced wrap */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E8D5A3] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
            <span>Sample Client Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#F8FAFC] [text-wrap:balance]">
            Validated by operators who care<br className="hidden sm:inline" /> about{" "}
            <span className="font-serif italic text-[#C8A25A] font-normal">balance sheets, not buzzwords.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-2xl font-sans leading-relaxed">
            All reviews below are illustrative sample client profiles modeled on representative growth outcomes across B2B SaaS, D2C, and enterprise verticals.
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonialsData.map((item) => {
            const currentRec = reactions[item.id] || item.initialReactions;
            const clicked = reactions[item.id]?.userClicked || {};

            return (
              <div
                key={item.id}
                className="rounded-3xl p-7 glass-heavy bg-[#131928]/50 hover:bg-[#131928]/80 border border-white/10 hover:border-[#C8A25A]/40 transition-all duration-300 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
              >
                <div>
                  {/* Top Bar: 5-Star Rating & Sample Metric */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-[#C8A25A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C8A25A]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] font-semibold text-[#E8D5A3]">
                      {item.metric}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-200 font-sans leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div>
                  {/* Author Bio */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mb-5">
                    <div>
                      <div className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                        {item.author}
                        <span className="text-[10px] font-mono text-[#C8A25A] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                          Sample
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-sans">
                        {item.role}, <span className="text-slate-300">{item.company}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{item.city}</span>
                  </div>

                  {/* Interactive Social Reactions with Lucide Icons & Floating Bubble Animation */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2 relative">
                    {/* Like Reaction */}
                    <div className="relative">
                      <button
                        onClick={() => handleReactionClick(item.id, "like")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          clicked.like
                            ? "bg-[#C8A25A]/20 border border-[#C8A25A] text-[#E8D5A3]"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white"
                        }`}
                        aria-label="Like review"
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${clicked.like ? "text-[#C8A25A]" : ""}`} />
                        <span>{currentRec.like}</span>
                      </button>
                      {activeBubble?.id === item.id && activeBubble.type === "like" && (
                        <span className="motion-reduce:hidden absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce text-[#C8A25A] pointer-events-none">
                          <ThumbsUp className="w-3 h-3 fill-[#C8A25A]" />
                        </span>
                      )}
                    </div>

                    {/* Share Reaction */}
                    <div className="relative">
                      <button
                        onClick={() => handleReactionClick(item.id, "share")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          clicked.share
                            ? "bg-[#2563EB]/25 border border-[#60A5FA] text-[#60A5FA]"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white"
                        }`}
                        aria-label="Share review"
                      >
                        <Share2 className={`w-3.5 h-3.5 ${clicked.share ? "text-[#60A5FA]" : ""}`} />
                        <span>{currentRec.share}</span>
                      </button>
                      {activeBubble?.id === item.id && activeBubble.type === "share" && (
                        <span className="motion-reduce:hidden absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce text-[#60A5FA] pointer-events-none">
                          <Share2 className="w-3 h-3 text-[#60A5FA]" />
                        </span>
                      )}
                    </div>

                    {/* Comment Reaction */}
                    <div className="relative">
                      <button
                        onClick={() => handleReactionClick(item.id, "comment")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          clicked.comment
                            ? "bg-white/20 border border-white text-white"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white"
                        }`}
                        aria-label="Comment on review"
                      >
                        <MessageSquare className={`w-3.5 h-3.5 ${clicked.comment ? "text-white" : ""}`} />
                        <span>{currentRec.comment}</span>
                      </button>
                      {activeBubble?.id === item.id && activeBubble.type === "comment" && (
                        <span className="motion-reduce:hidden absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce text-white pointer-events-none">
                          <MessageSquare className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
