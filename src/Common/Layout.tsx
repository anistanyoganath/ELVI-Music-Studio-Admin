import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 w-100">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
