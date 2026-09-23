import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BrainCircuit, Check, Expand, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExpertCore3D = lazy(() => import("./ExpertCore3D").then((module) => ({ default: module.ExpertCore3D })));

const slides = [
  { speaker: "Speaker 01", section: "Opening" }, { speaker: "Speaker 01", section: "Foundation" },
  { speaker: "Speaker 01", section: "Architecture" }, { speaker: "Speaker 01", section: "Reasoning" },
  { speaker: "Speaker 02", section: "Knowledge" }, { speaker: "Speaker 02", section: "Case Study" },
  { speaker: "Speaker 02", section: "Live Demo" }, { speaker: "Speaker 02", section: "Applications" },
  { speaker: "Speaker 03", section: "Evaluation" }, { speaker: "Speaker 03", section: "Limits" },
  { speaker: "Speaker 03", section: "Future" }, { speaker: "Speaker 03", section: "Close" },
];

const symptoms = ["High fever", "Dry cough", "Body ache"];

function Tag({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "lime" | "amber" }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function Node({ label, sub, tone = "cyan" }: { label: string; sub: string; tone?: "cyan" | "lime" | "amber" }) {
  return <div className={`logic-node logic-node-${tone}`}><strong>{label}</strong><small>{sub}</small></div>;
}

export function ExpertSystemsDeck() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<string[]>(["High fever", "Dry cough"]);
  const go = useCallback((delta: number) => setActive((value) => Math.max(0, Math.min(slides.length - 1, value + delta))), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(event.key)) go(1);
      if (["ArrowLeft", "PageUp"].includes(event.key)) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const toggleSymptom = (symptom: string) => setSelected((current) => current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]);
  const confidence = Math.min(96, 42 + selected.length * 16);

  return (
    <main className="deck-shell">
      <header className="deck-status">
        <div><span className="status-dot" /> EXPERT SYSTEMS <span className="status-muted">/ AI · BSC IT · YEAR 3</span></div>
        <div className="status-muted">REASONING CONSOLE · {slides[active]?.speaker}</div>
      </header>

      <section className="slide-stage" aria-live="polite">
        <div className="scanline" />
        <div key={active} className="slide-enter h-full">
          {active === 0 && <TitleSlide />}
          {active === 1 && <DefinitionSlide />}
          {active === 2 && <ArchitectureSlide />}
          {active === 3 && <ReasoningSlide />}
          {active === 4 && <KnowledgeSlide />}
          {active === 5 && <MycinSlide />}
          {active === 6 && <DemoSlide selected={selected} toggle={toggleSymptom} confidence={confidence} />}
          {active === 7 && <ApplicationsSlide />}
          {active === 8 && <ComparisonSlide />}
          {active === 9 && <LimitsSlide />}
          {active === 10 && <FutureSlide />}
          {active === 11 && <ClosingSlide />}
        </div>
      </section>

      <footer className="deck-controls">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => go(-1)} disabled={active === 0} aria-label="Previous slide"><ArrowLeft /></Button>
          <Button size="icon" onClick={() => go(1)} disabled={active === slides.length - 1} aria-label="Next slide"><ArrowRight /></Button>
        </div>
        <div className="progress-wrap"><span>{String(active + 1).padStart(2, "0")} / {slides.length}</span><div className="progress-track"><i style={{ width: `${((active + 1) / slides.length) * 100}%` }} /></div><span>{slides[active]?.section}</span></div>
        <Button variant="outline" size="icon" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter fullscreen"><Expand /></Button>
      </footer>
    </main>
  );
}

function Kicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="slide-kicker"><span>{number}</span>{children}</div>;
}

function TitleSlide() {
  return <div className="slide-grid title-layout">
    <div className="title-copy"><Kicker number="01">KNOWLEDGE-DRIVEN ARTIFICIAL INTELLIGENCE</Kicker><h1>EXPERT<br /><em>SYSTEMS</em></h1><p>Machines that capture human expertise, reason through facts, and explain every conclusion.</p><div className="presenters"><span>03 PRESENTERS</span><i /><span>12 SLIDES</span><i /><span>01 LIVE DEMO</span></div></div>
    <div className="core-panel"><ClientOnly fallback={<div className="core-fallback"><BrainCircuit /></div>}><Suspense fallback={<div className="core-fallback"><BrainCircuit /></div>}><ExpertCore3D /></Suspense></ClientOnly><div className="core-caption"><span>INFERENCE CORE</span><span className="live">● LIVE</span></div></div>
  </div>;
}

function DefinitionSlide() {
  return <div className="slide-pad"><Kicker number="02">THE IDEA</Kicker><div className="definition-layout"><h2>Not programmed with <span>answers.</span><br />Programmed with <em>expertise.</em></h2><div className="definition-side"><p>An expert system is AI software that imitates the decision-making ability of a human specialist in a narrow domain.</p><div className="formula"><Tag>KNOWLEDGE</Tag><b>+</b><Tag tone="amber">REASONING</Tag><b>=</b><Tag tone="lime">ADVICE</Tag></div></div></div><div className="bottom-statement">“IF conditions are true, THEN draw a conclusion.”</div></div>;
}

function ArchitectureSlide() {
  return <div className="slide-pad"><Kicker number="03">SYSTEM ARCHITECTURE</Kicker><h2 className="slide-title">Four parts. One intelligent decision.</h2><div className="architecture"><Node label="USER" sub="asks a question" /><span>→</span><Node label="INTERFACE" sub="captures facts" tone="amber" /><span>→</span><Node label="INFERENCE ENGINE" sub="fires rules" tone="lime" /><span>↔</span><Node label="KNOWLEDGE BASE" sub="facts + rules" /><div className="explain-line">EXPLANATION FACILITY · shows <strong>why</strong> the system reached its answer</div></div></div>;
}

function ReasoningSlide() {
  return <div className="slide-pad"><Kicker number="04">INFERENCE ENGINE</Kicker><h2 className="slide-title">Two ways to think.</h2><div className="reason-grid"><article><span className="direction">FACTS → GOAL</span><h3>Forward chaining</h3><p>Starts with known data and fires every matching rule until a conclusion appears.</p><div className="mini-flow"><i>Fever</i><b>→</b><i>Cough</i><b>→</b><i>Flu?</i></div><small>BEST FOR: monitoring, prediction</small></article><article><span className="direction amber">GOAL → FACTS</span><h3>Backward chaining</h3><p>Starts with a hypothesis, then asks which facts would prove or reject it.</p><div className="mini-flow reverse"><i>Flu?</i><b>←</b><i>Cough</i><b>←</b><i>Fever</i></div><small>BEST FOR: diagnosis, troubleshooting</small></article></div></div>;
}

function KnowledgeSlide() {
  return <div className="slide-pad"><Kicker number="05">KNOWLEDGE REPRESENTATION</Kicker><div className="knowledge-layout"><div><h2 className="slide-title">Expertise becomes<br />machine-readable.</h2><p className="lead">The knowledge engineer interviews specialists and converts their judgement into formal structures.</p></div><div className="rule-code"><span>RULE #27</span><code><b>IF</b> temperature &gt; 38°C<br /><b>AND</b> persistent_cough = true<br /><b>THEN</b> suspect_infection<br /><b>WITH</b> confidence = 0.82</code></div></div><div className="knowledge-types"><Tag>Production rules</Tag><Tag tone="amber">Semantic networks</Tag><Tag tone="lime">Frames</Tag></div></div>;
}

function MycinSlide() {
  return <div className="slide-pad mycin"><Kicker number="06">LANDMARK CASE · STANFORD · 1970s</Kicker><div className="case-number">MYCIN</div><div className="case-grid"><h2>An early medical expert system that diagnosed bacterial infections.</h2><div><p>Used around <strong>600 rules</strong> and certainty factors to recommend antibiotics.</p><p>Matched or exceeded specialists in controlled tests—but was never deployed clinically.</p></div></div><div className="case-metric"><strong>65%</strong><span>acceptability score<br />vs. human experts</span><small>Historical evaluation by Stanford researchers</small></div></div>;
}

function DemoSlide({ selected, toggle, confidence }: { selected: string[]; toggle: (s: string) => void; confidence: number }) {
  return <div className="slide-pad"><Kicker number="07">INTERACTIVE DEMO</Kicker><div className="demo-grid"><div><h2 className="slide-title">Try the reasoning engine.</h2><p className="lead">Select observations. Watch rules activate.</p><div className="symptoms">{symptoms.map((symptom) => <Button key={symptom} variant={selected.includes(symptom) ? "default" : "outline"} onClick={() => toggle(symptom)}>{selected.includes(symptom) ? <Check /> : <span className="empty-check" />}{symptom}</Button>)}</div></div><div className="diagnosis"><div className="diagnosis-head"><span>SYSTEM OUTPUT</span><span className="live">● ANALYSIS COMPLETE</span></div><BrainCircuit /><small>LIKELY CONCLUSION</small><h3>{selected.length >= 2 ? "VIRAL INFECTION" : selected.length ? "INSUFFICIENT EVIDENCE" : "AWAITING FACTS"}</h3><div className="confidence"><i style={{ width: `${selected.length ? confidence : 0}%` }} /></div><p>Confidence: {selected.length ? confidence : 0}% · {selected.length} rule{selected.length === 1 ? "" : "s"} matched</p></div></div></div>;
}

function ApplicationsSlide() {
  const items = [["MEDICINE", "Diagnosis & treatment"], ["FINANCE", "Credit & fraud"], ["INDUSTRY", "Fault detection"], ["AGRICULTURE", "Crop diagnosis"], ["EDUCATION", "Intelligent tutoring"], ["CYBERSECURITY", "Threat analysis"]];
  return <div className="slide-pad"><Kicker number="08">WHERE THEY WORK</Kicker><h2 className="slide-title">Narrow domains. Deep expertise.</h2><div className="application-grid">{items.map(([title, sub], i) => <div key={title}><b>0{i + 1}</b><h3>{title}</h3><p>{sub}</p></div>)}</div></div>;
}

function ComparisonSlide() {
  return <div className="slide-pad"><Kicker number="09">STRENGTHS</Kicker><h2 className="slide-title">Why use an expert system?</h2><div className="comparison"><div className="compare-head"><span>HUMAN EXPERT</span><span>EXPERT SYSTEM</span></div>{[["May tire or vary", "Consistent, 24 × 7"], ["Knowledge can leave", "Knowledge is preserved"], ["One case at a time", "Replicated at scale"], ["Reasoning may be implicit", "Decision trail is visible"]].map((row) => <div className="compare-row" key={row[0]}><span><X />{row[0]}</span><span><Check />{row[1]}</span></div>)}</div></div>;
}

function LimitsSlide() {
  return <div className="slide-pad"><Kicker number="10">LIMITATIONS</Kicker><div className="limits-layout"><h2>Smart inside<br />the box.<br /><span>Lost outside it.</span></h2><div className="limit-list">{[["01", "Knowledge bottleneck", "Extracting expert judgement is slow and expensive."], ["02", "No common sense", "Rules fail on situations their designer never anticipated."], ["03", "Maintenance", "Large rule bases become difficult to update consistently."], ["04", "No real intuition", "Confidence values are not human understanding."]].map(([n,t,p]) => <div key={n}><b>{n}</b><h3>{t}</h3><p>{p}</p></div>)}</div></div></div>;
}

function FutureSlide() {
  return <div className="slide-pad"><Kicker number="11">EXPERT SYSTEMS + MODERN AI</Kicker><h2 className="slide-title">The future is hybrid.</h2><div className="hybrid"><div><strong>SYMBOLIC AI</strong><p>Rules, logic, explainability</p></div><b>+</b><div><strong>MACHINE LEARNING</strong><p>Patterns, adaptation, scale</p></div><b>=</b><div className="hybrid-result"><strong>TRUSTED AI</strong><p>Flexible and accountable</p></div></div><div className="future-note"><BrainCircuit /><p>Neuro-symbolic systems combine learned patterns with explicit knowledge—making AI both powerful and easier to explain.</p></div></div>;
}

function ClosingSlide() {
  return <div className="closing"><div className="closing-core"><ClientOnly fallback={null}><Suspense fallback={null}><ExpertCore3D interactive={false} /></Suspense></ClientOnly></div><Kicker number="12">CONCLUSION</Kicker><h2>EXPERTISE<br /><em>ENCODED.</em></h2><p>Knowledge base. Inference engine. Explainable decisions.</p><div className="questions"><span>QUESTIONS?</span><RotateCcw /></div><small>PRESENTED BY · TEAM OF THREE · BSC IT YEAR 3</small></div>;
}