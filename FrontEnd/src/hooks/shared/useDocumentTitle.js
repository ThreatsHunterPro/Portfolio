import { useEffect } from "react";

const SUFFIX = "Thomas COLIN — Portfolio";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : SUFFIX;
  }, [title]);
}
