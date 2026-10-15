export default function StatsCards({ stats }) {
  const cards = [
    { title: "Inventory Items", value: stats.inventoryCount },
    { title: "Pending Payments", value: `₹${stats.pendingPayments}` },
    { title: "Active Staff", value: stats.activeStaff },
    { title: "Risk Score", value: stats.riskScore },
  ];

  return (
<div className="grid md:grid-cols-4 gap-5 mb-2">
      {cards.map((c) => (
        <div key={c.title} className="card-ui">
          <p className="text-slate-400">{c.title}</p>
          <h3 className="text-2xl font-bold">{c.value}</h3>
        </div>
      ))}
    </div>
  );
}
