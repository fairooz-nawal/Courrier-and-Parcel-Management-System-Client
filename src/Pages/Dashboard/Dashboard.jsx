import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    failedDeliveries: 0,
    totalCOD: 0,
    dailyStats: [],
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch admin metrics from backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/metrics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Daily Bookings</h2>
            <p className="text-4xl font-bold">{metrics.totalBookings}</p>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Failed Deliveries</h2>
            <p className="text-4xl font-bold">{metrics.failedDeliveries}</p>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">COD Amount</h2>
            <p className="text-4xl font-bold">৳{metrics.totalCOD}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-4">Parcel Trends (This Week)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics.dailyStats} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
            <Bar dataKey="failed" fill="#f87171" name="Failed Deliveries" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Manage Agents</h2>
            <p>Assign agents to parcels and view their current workloads.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/assign-agents")}
              >
                Assign Agents
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">View All Bookings</h2>
            <p>See all customer bookings and their statuses.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/bookings")}
              >
                View Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
