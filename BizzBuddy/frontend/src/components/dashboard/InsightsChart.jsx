import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function InsightsCharts({ inventory = [], stats }) {
  if (!stats) return null;

  //INVENTORY DATA
  const inventoryData = inventory.map((item) => ({
    name: item.itemName || item.Item || "Item",
    stock: Number(item.currentStock || item.Quantity || 0),
  }));

  //STAFF DATA
  const staffData = [
    { name: "Active", value: stats.activeStaff || 0 },
    {
      name: "Inactive",
      value: (stats.totalStaff || 0) - (stats.activeStaff || 0),
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* INVENTORY BAR CHART */}
      <div className="card-ui p-6">
        <h3 className="font-semibold mb-4">📦 Inventory Stock Levels</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inventoryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.15)"
              />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip cursor={{ fill: "transparent" }} />

              <Bar dataKey="stock" fill="#5b8cff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STAFF DONUT CHART */}
      <div className="card-ui p-6">
        <h3 className="font-semibold mb-4">👨‍💼 Staff Activity</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={staffData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
              >
                {staffData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
