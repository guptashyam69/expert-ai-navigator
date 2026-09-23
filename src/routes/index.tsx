import { createFileRoute } from "@tanstack/react-router";
import { ExpertSystemsDeck } from "@/components/ExpertSystemsDeck";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Expert Systems — Interactive AI Presentation" },
    { name: "description", content: "An interactive BSc IT presentation explaining expert systems, inference engines, applications, and limitations." },
    { property: "og:title", content: "Expert Systems — Interactive AI Presentation" },
    { property: "og:description", content: "Explore how knowledge-based AI reasons through facts and explains decisions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ExpertSystemsDeck,
});
