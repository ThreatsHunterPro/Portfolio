import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiMail, FiMapPin, FiSend, FiClock, FiMessageCircle } from "react-icons/fi";

import PageLayout from "../../Layouts/PageLayout";
import PageHeader from "../../Layouts/PageHeader";
import FormInput from "../../Shared/FormInput";
import Button from "../../Shared/Button";
import SocialLinks from "../../Shared/SocialLinks";
import { useProfile } from "../../../hooks/profile/useProfile";
import { useContactForm } from "../../../hooks/contact/useContactForm";
import { DOMAINS } from "../../../utils/domains";

const REQUEST_OPTIONS = [
  { value: "game", label: DOMAINS.game.label, icon: DOMAINS.game.icon },
  { value: "web", label: DOMAINS.web.label, icon: DOMAINS.web.icon },
  { value: "other", label: "Autre", icon: FiMessageCircle },
];

function ContactItem({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-night-800 text-brand-400 shadow-sm ring-1 ring-line">
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
        <div className="mt-0.5 text-ink font-medium">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { profile } = useProfile();
  const [searchParams] = useSearchParams();
  const { form, errors, status, feedback, handleChange, handleSubmit, setRequestType, reset } =
    useContactForm(searchParams.get("type"));

  return (
    <PageLayout title="Contact">
      <PageHeader
        eyebrow="Contact & devis"
        title="Travaillons ensemble"
        description="Un jeu à renforcer, une application web à créer, ou simplement une question ? Décrivez votre besoin, je vous réponds sous 48h."
      />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[360px_1fr]">
        {/* --- Coordonnées --- */}
        <div className="self-start rounded-3xl border border-line bg-night-900 p-8">
          <h2 className="font-display text-xl font-bold text-ink">Mes coordonnées</h2>
          <ul className="mt-6 space-y-5">
            {profile?.email && (
              <ContactItem icon={FiMail} label="Email">
                <a href={`mailto:${profile.email}`} className="hover:text-brand-300 break-all">{profile.email}</a>
              </ContactItem>
            )}
            {profile?.location && (
              <ContactItem icon={FiMapPin} label="Localisation">{profile.location}</ContactItem>
            )}
            <ContactItem icon={FiClock} label="Délai de réponse">Sous 48h</ContactItem>
          </ul>
          <SocialLinks socials={profile?.socials} className="mt-6 -ml-2.5" />
        </div>

        {/* --- Formulaire --- */}
        <div className="rounded-3xl border border-line bg-night-900 p-6 shadow-card sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  <FiCheckCircle className="w-8 h-8" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink">Message envoyé !</h2>
                <p className="mt-2 max-w-sm text-ink-soft">{feedback}</p>
                <Button variant="outlined" onClick={reset} label="Envoyer un autre message" className="mt-8" />
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} noValidate className="space-y-5" exit={{ opacity: 0 }}>
                <fieldset>
                  <legend className="block text-xs font-semibold text-ink-soft mb-2">Votre demande concerne</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {REQUEST_OPTIONS.map(({ value, label, icon: Icon }) => {
                      const active = form.requestType === value;
                      return (
                        <label
                          key={value}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            active ? "border-brand-400/60 bg-brand-400/10 text-brand-100 shadow-glow" : "border-line bg-night-900 text-ink-soft hover:border-brand-400/30"
                          }`}
                        >
                          <input type="radio" name="requestType" value={value} checked={active} onChange={() => setRequestType(value)} className="sr-only" />
                          <Icon className={`h-4 w-4 ${active ? "text-brand-300" : "text-ink-muted"}`} />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label="Nom" name="name" value={form.name} onChange={handleChange} placeholder="Votre nom" error={errors.name} required maxLength={80} />
                  <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="vous@exemple.fr" error={errors.email} required />
                </div>
                <FormInput label="Sujet" name="subject" value={form.subject} onChange={handleChange} placeholder="Mission gameplay, site vitrine, application..." maxLength={120} />
                <FormInput label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Bonjour Thomas, ..." error={errors.message} required multiline rows={6} maxLength={3000} />

                {/* Honeypot anti-spam, invisible pour les humains */}
                <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    <FiAlertCircle className="w-4 h-4 shrink-0" /> {feedback}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-muted">
                    Vos données servent uniquement à vous répondre.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    icon={FiSend}
                    disabled={status === "sending"}
                    label={status === "sending" ? "Envoi..." : "Envoyer le message"}
                  />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
}
