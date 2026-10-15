export default function SetupEmptyState({ onOpen }) {
  return (
    <div className="card-ui text-center py-16">
      <h2 className="text-2xl font-bold mb-3">
        Connect your Google Sheets
      </h2>

      <p className="text-slate-400 mb-6">
        Add inventory, payments and staff sheets to activate OpsAgent.
      </p>

      <button
        onClick={onOpen}
        className="px-5 py-3 rounded-lg bg-accent/20 border border-accent/30"
      >
        + Connect Data
      </button>
    </div>
  );
}
