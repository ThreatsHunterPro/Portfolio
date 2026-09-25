import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import Button from "./Button";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-5 text-red-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <FiAlertTriangle className="w-6 h-6 shrink-0" aria-hidden />
      <p className="text-sm font-medium flex-1">{message || "Une erreur est survenue."}</p>
      {onRetry && (
        <Button variant="outlined" size="sm" icon={FiRefreshCw} onClick={onRetry} label="Réessayer" />
      )}
    </div>
  );
}
