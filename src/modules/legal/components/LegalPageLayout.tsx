import { ReactNode } from "react";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

export interface LegalBlock {
  type: "paragraph" | "list";
  text?: string;
  items?: string[];
}

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "list") {
    return (
      <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
        {block.items?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="mb-4 text-sm leading-relaxed text-muted">{block.text}</p>;
}

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <div key={i}>
          <h2 className="mb-3 mt-8 font-display text-lg font-bold text-ink first:mt-0">
            {section.heading}
          </h2>
          {section.blocks.map((block, j) => (
            <LegalBlockView key={j} block={block} />
          ))}
        </div>
      ))}
    </>
  );
}

export function LegalPageLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="bg-brand pb-14 pt-20">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-4xl font-extrabold text-white">{title}</h1>
          {intro && <p className="mt-3 text-white/80">{intro}</p>}
          <p className="mt-2 text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-14">{children}</main>

      <Footer />
    </>
  );
}
