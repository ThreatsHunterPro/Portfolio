import Title from "../Shared/Title";
import Eyebrow from "../Shared/Eyebrow";

/**
 * En-tête des pages internes (Projets, À propos, Contact...)
 */
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="absolute inset-0 bg-grid bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <div className="relative container-page pt-14 pb-12 sm:pt-20 sm:pb-16">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Title level={1} className="max-w-3xl">{title}</Title>
        {description && <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">{description}</p>}
        {children}
      </div>
    </section>
  );
}
