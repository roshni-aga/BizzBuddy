export function buildDashboard(inventory, payments, staff) {
  const alerts = [];

  //INVENTORY ALERTS
  inventory.forEach((item) => {
    if (Number(item.Quantity) <= Number(item.MinimumStock)) {
      alerts.push({
        message: `${item.Item} stock is low`,
        level: "CRITICAL",
      });
    }
  });

  //PAYMENT ALERTS
  payments.forEach((p) => {
    if ((p.Status || "").toLowerCase().trim() !== "paid") {
      alerts.push({
        message: `Payment due: ${p.Supplier}`,
        level: "WARNING",
      });
    }
  });

  //STATS
  const stats = {
    inventoryCount: inventory.length,

    pendingPayments: payments
      .filter((p) => (p.Status || "").toLowerCase().trim() !== "paid")
      .reduce((sum, p) => sum + Number(p.Amount || 0), 0),

    activeStaff: staff.filter(
      (s) => (s.Active || "").toLowerCase().trim() === "yes",
    ).length,

    totalStaff: staff.length,

    riskScore:
      alerts.length > 4 ? "High" : alerts.length > 1 ? "Medium" : "Low",
  };

  return { stats, alerts };
}
