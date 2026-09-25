import { motion } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import { pageTransition } from "../../utils/motion";
import { useDocumentTitle } from "../../hooks/shared/useDocumentTitle";

/**
 * Squelette commun à toutes les pages : Header + contenu animé + Footer
 */
export default function PageLayout({ title, children, className = "" }) {
  useDocumentTitle(title);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <motion.main
        className={`flex-grow ${className}`}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
