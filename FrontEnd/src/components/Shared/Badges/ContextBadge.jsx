import { CONTEXTS } from "../../../utils/domains";

/**
 * Contexte de réalisation : Prestation, Studio, Personnel, Formation
 */
export default function ContextBadge({ context, client, className = "" }) {
  if (!context) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${CONTEXTS[context] || CONTEXTS.Personnel} ${className}`}>
      {context}
      {client && <span className="opacity-70">· {client}</span>}
    </span>
  );
}
