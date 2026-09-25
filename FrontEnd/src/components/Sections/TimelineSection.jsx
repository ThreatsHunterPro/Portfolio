import { useProfile } from "../../hooks/profile/useProfile";
import Reveal from "../Shared/Reveal";

export default function TimelineSection() {
  const { profile } = useProfile();

  if (!profile?.timeline?.length) return null;

  return (
    <ol className="relative border-l-2 border-line ml-3">
      {profile.timeline.map((step, i) => (
        <Reveal as="li" key={`${step.period}-${step.title}`} delay={i * 0.06} className="relative pl-8 pb-10 last:pb-0">
          <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-night-950 bg-brand-500 ring-2 ring-brand-400/20" aria-hidden />
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-400">{step.period}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">{step.title}</h3>
          <p className="text-sm font-medium text-ink-muted">{step.place}</p>
          <p className="mt-2 text-ink-soft leading-relaxed">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
