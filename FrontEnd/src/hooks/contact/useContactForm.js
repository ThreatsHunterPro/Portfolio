import { useState } from "react";
import { sendContactMessage } from "../../utils/api";

const EMPTY_FORM = { name: '', email: '', requestType: 'other', subject: '', message: '', website: '' };
const REQUEST_TYPES = ['game', 'web', 'other'];

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Adresse email invalide.";
  if (form.message.trim().length < 10) errors.message = "Votre message doit faire au moins 10 caractères.";
  return errors;
};

export function useContactForm(initialType) {
  const startForm = { ...EMPTY_FORM, requestType: REQUEST_TYPES.includes(initialType) ? initialType : 'other' };
  const [form, setForm] = useState(startForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setStatus('sending');
    try {
      const res = await sendContactMessage(form);
      setStatus('success');
      setFeedback(res.message);
      setForm({ ...EMPTY_FORM, requestType: form.requestType });
    } catch (err) {
      setStatus('error');
      setFeedback(err.message);
    }
  };

  const reset = () => {
    setStatus('idle');
    setFeedback('');
  };

  const setRequestType = (requestType) => setForm((prev) => ({ ...prev, requestType }));

  return { form, errors, status, feedback, handleChange, handleSubmit, setRequestType, reset };
}
