import { FiArrowRight } from "react-icons/fi";
import Title from "../Shared/Title";
import Eyebrow from "../Shared/Eyebrow";
import Button from "../Shared/Button";
import Reveal from "../Shared/Reveal";

export default function SectionBanner({ eyebrow, title, description, moreLink, moreLabel = "Voir tout" }) {
  return (
    <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Title level={2}>{title}</Title>
        {description && <p className="mt-4 text-ink-soft leading-relaxed">{description}</p>}
      </div>

      {moreLink && (
        <Button to={moreLink} variant="outlined" iconRight={FiArrowRight} label={moreLabel} className="self-start sm:self-auto" />
      )}
    </Reveal>
  );
}
