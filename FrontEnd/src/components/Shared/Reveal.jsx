import { motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

/**
 * Fait apparaître son contenu au scroll
 */
export default function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
