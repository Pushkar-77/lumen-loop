import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyDetailView } from "@/components/work/CaseStudyDetailView";
import { siteConfig } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return {
      title: "Case Study Not Found | " + siteConfig.name,
    };
  }

  return {
    title: `${cs.clientName} Case Study (${cs.headlineResult}) | ${siteConfig.name}`,
    description: `${cs.summary} Discover how Lumen Loop delivered ${cs.headlineResult} for ${cs.clientName}.`,
    openGraph: {
      title: `${cs.clientName}: ${cs.headlineResult}`,
      description: cs.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);

  if (index === -1) {
    notFound();
  }

  const caseStudy = caseStudies[index];
  const prevCaseStudy = caseStudies[index === 0 ? caseStudies.length - 1 : index - 1];
  const nextCaseStudy = caseStudies[index === caseStudies.length - 1 ? 0 : index + 1];

  return (
    <CaseStudyDetailView
      caseStudy={caseStudy}
      prevCaseStudy={prevCaseStudy}
      nextCaseStudy={nextCaseStudy}
    />
  );
}
