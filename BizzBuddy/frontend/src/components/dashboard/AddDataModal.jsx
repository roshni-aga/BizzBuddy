import { useState, useEffect } from "react";
import { saveSheetLinks } from "../../app/services/api";

export default function AddDataModal({ open, onClose }) {
  const [links, setLinks] = useState({
    inventory: "",
    payments: "",
    staff: "",
  });

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveSheetLinks(links);
      onClose();
      window.location.reload();
    } catch {
      alert("Failed to connect sheets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="card-ui w-[520px] relative space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold">Connect Google Sheets</h2>

        <input
          placeholder="Inventory CSV link"
          className="w-full p-3 rounded bg-black/30 border border-white/20"
          onChange={(e) =>
            setLinks({ ...links, inventory: e.target.value })
          }
        />

        <input
          placeholder="Payments CSV link"
          className="w-full p-3 rounded bg-black/30 border border-white/20"
          onChange={(e) =>
            setLinks({ ...links, payments: e.target.value })
          }
        />

        <input
          placeholder="Staff CSV link"
          className="w-full p-3 rounded bg-black/30 border border-white/20"
          onChange={(e) =>
            setLinks({ ...links, staff: e.target.value })
          }
        />

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded bg-accent/20 border border-accent/30"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 rounded border border-white/20 hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
