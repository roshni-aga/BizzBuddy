import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
export default function DashboardLayout({ children, hideAddButton }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar onLogout={handleLogout} hideAddButton={hideAddButton} />

      <main className="p-8 space-y-6">
        {children}
      </main>
    </div>
  );
}
