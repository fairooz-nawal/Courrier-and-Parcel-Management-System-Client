import React, { useContext } from "react";
import { Outlet, Link } from "react-router";
import { motion } from "framer-motion";
import { ContextAPI } from "../Component/Context/AuthProvider";


export default function AdminLayout() {
  const { logout} = useContext(ContextAPI);
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-5 hidden md:block">
        <h2 className="text-3xl font-bold mb-10 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="btn btn-ghost w-full text-left">
            Dashboard
          </Link>
          <Link to="/admin/parcels" className="btn btn-ghost w-full text-left">
            Parcels
          </Link>
          <Link to="/admin/agents" className="btn btn-ghost w-full text-left">
            Agents
          </Link>
          <Link to="/admin/users" className="btn btn-ghost w-full text-left">
            Users
          </Link>
          <Link to="/admin/reports" className="btn btn-ghost w-full text-left">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-600">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, Admin</span>
            <button onClick={logout} className="btn btn-error btn-sm">Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-6"
        >
          <Outlet /> {/* This will render nested routes */}
        </motion.main>
      </div>
    </div>
  );
}
