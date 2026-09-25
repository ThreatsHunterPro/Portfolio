export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  multiline = false,
  rows = 5,
  maxLength,
}) {
  const id = `field-${name}`;
  const Field = multiline ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-ink-soft mb-1.5">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      <Field
        id={id}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`input-field ${multiline ? "resize-none" : ""} ${error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}
