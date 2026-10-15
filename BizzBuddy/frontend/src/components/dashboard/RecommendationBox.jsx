export default function RecommendationBox({ recommendation }) {
  if (!recommendation) return null;

  const lines = recommendation
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) =>
      line
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*/g, "")     
    );

  return (
    <div className="card-ui bg-accent/10 py-6 px-6">
      <h3 className="font-semibold mb-4">🧠 AI Recommendations</h3>

      <ul className="space-y-3">
        {lines.map((line, i) => (
          <li key={i} className="text-slate-200 leading-relaxed flex gap-2">
            <span className="text-accent">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
