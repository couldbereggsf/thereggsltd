import { useState } from "react";

const TECH_OPTIONS      = ["Java", "Node.js", "Python", "React", "AWS", "Azure"];
const CHALLENGE_OPTIONS = [
  "App is too slow",
  "Security or compliance gaps",
  "Cloud costs out of control",
  "Frequent downtime or incidents",
  "Cannot scale the team or code",
];

export default function StackAssessment() {
  const [selectedTech, setSelectedTech] = useState([]);
  const [challenge,    setChallenge]    = useState("");
  const [result,       setResult]       = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);

  const toggleTech = (tech) =>
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );

  const handleSubmit = async () => {
    if (!selectedTech.length || !challenge) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prompt = `You are a senior full-stack engineer and cloud architect. A developer's stack is: ${selectedTech.join(", ")}. Their biggest challenge: "${challenge}". Give exactly 3 specific, actionable recommendations. Be direct and technical — no fluff. Return ONLY a JSON array of 3 objects with "title" (4-6 words) and "detail" (2 sentences max). No markdown, no preamble.`;

      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model:      "claude-sonnet-4-6",
          max_tokens: 1000,
          messages:   [{ role: "user", content: prompt }],
        }),
      });

      const data  = await res.json();
      const text  = data.content.map((b) => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ready = selectedTech.length > 0 && challenge;

  return (
    <section className="assessment">
      <div className="section-inner">
        <p className="eyebrow">Try it</p>
        <h2 className="section-heading">
          Get a free <em>stack assessment</em>
        </h2>
        <p className="assessment__intro">
          Select your tech stack and your biggest challenge. Get three specific,
          actionable recommendations in under 30 seconds.
        </p>

        <div className="assessment__form">
          <div className="assessment__group">
            <p className="assessment__group-label">
              YOUR TECH STACK <span>(select all that apply)</span>
            </p>
            <div className="assessment__pills">
              {TECH_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`assessment__pill${selectedTech.includes(t) ? " assessment__pill--active" : ""}`}
                  onClick={() => toggleTech(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="assessment__group">
            <label className="assessment__group-label" htmlFor="challenge">
              BIGGEST CHALLENGE RIGHT NOW
            </label>
            <select
              id="challenge"
              className="assessment__select"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
            >
              <option value="">— Select one —</option>
              {CHALLENGE_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`btn btn--primary${!ready ? " btn--disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!ready || loading}
          >
            {loading ? "Analysing your stack…" : "Get my assessment"}
          </button>
        </div>

        {error && <p className="assessment__error">{error}</p>}

        {result && (
          <div className="assessment__results">
            <p className="assessment__results-label">Your 3 recommendations</p>
            <ol className="assessment__result-list">
              {result.map((rec, i) => (
                <li key={i} className="assessment__result-item">
                  <strong>{rec.title}</strong>
                  <p>{rec.detail}</p>
                </li>
              ))}
            </ol>
            <a href="#contact" className="btn btn--outline">
              Discuss these with Reagan
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
