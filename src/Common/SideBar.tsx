import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/inventory", label: "Inventory" },
    { to: "/category", label: "Category" },
    { to: "/rentals", label: "Rentals" },
    { to: "/users", label: "Users" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col shadow-lg overflow-x-scroll">
      <h2 className="text-xl font-bold mb-6">ELVI Music Studio</h2>
      <ul className="space-y-4 flex-grow">
        {links.map(({ to, label }) => {
          const isActive = location.pathname === to;

          return (
            <li key={to}>
              <Link
                to={to}
                className={`block p-3 rounded-lg hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
