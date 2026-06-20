import { useState } from "react";

const METHODS = [
  { label: "EMAIL",    value: "reaganfwambaa@gmail.com",        href: "mailto:reaganfwambaa@gmail.com" },
  { label: "PHONE",    value: "+254 790 028 542",               href: "tel:+254790028542" },
  { label: "LINKEDIN", value: "reagan-f-04a448244",             href: "https://linkedin.com/in/reagan-f-04a448244" },
  { label: "GITHUB",   value: "couldbereggsf",                  href: "https://github.com/couldbereggsf" },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form,      setForm]      = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend API or EmailJS / Formspree
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <p className="eyebrow">Contact</p>
        <h2 className="section-heading">
          Let's Build <em>Something</em>
        </h2>
        <p className="contact__intro">
          I'm currently available for freelance projects and full-time opportunities.
          Let's talk about how I can help your business grow.
        </p>

        <div className="contact__grid">

          <div className="contact__methods">
            {METHODS.map((m) => (
              <a
                key={m.label}
                href={m.href}
                className="contact__method"
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="contact__method-label">{m.label}</span>
                <span className="contact__method-value">{m.value}</span>
              </a>
            ))}
          </div>

          <div className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success">
                <p>Message sent — I'll be in touch within 4 hours.</p>
                <button
                  className="btn btn--outline"
                  onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {[
                  { id: "name",    type: "text",  label: "NAME",    placeholder: "Your name" },
                  { id: "email",   type: "email", label: "EMAIL",   placeholder: "your@email.com" },
                  { id: "subject", type: "text",  label: "SUBJECT", placeholder: "What's this about?" },
                ].map(({ id, type, label, placeholder }) => (
                  <div key={id} className="contact__field">
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id} name={id} type={type}
                      value={form[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                    />
                  </div>
                ))}
                <div className="contact__field">
                  <label htmlFor="message">MESSAGE</label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary">Send Message</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
