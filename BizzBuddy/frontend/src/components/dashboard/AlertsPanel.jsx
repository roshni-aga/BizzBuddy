export default function AlertsPanel({ alerts }) {
  return (
<div className="card-ui border border-red-400/30 py-6 px-6">
<h3 className="font-semibold mb-2">⚠ Alerts</h3>

<div className="space-y-2 mt-3">
  {alerts.map((a, i) => (
    <p key={i}>{a.message}</p>
  ))}
</div>

    </div>
  );
}
