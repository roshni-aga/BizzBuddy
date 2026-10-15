import { useState } from "react";
import AddDataModal from "../dashboard/AddDataModal";

export default function Topbar({ onLogout, hideAddButton = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-black/20">
        <h2 className="text-2xl font-semibold">Smart Operations Dashboard</h2>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-3">
          {/*NEW LOGOUT BUTTON */}
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>

          {/* EXISTING BUTTON (UNCHANGED) */}
          {!hideAddButton && (
            <button
              data-add="true"
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-accent/20 border border-accent/30 hover:bg-accent/30 transition"
            >
              + Add Data
            </button>
          )}
        </div>
      </header>

      <AddDataModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
