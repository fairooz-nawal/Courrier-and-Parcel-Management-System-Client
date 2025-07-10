import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion"; // animation library
import { FaBoxOpen, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

export default function AddParcel() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token"); // get token for auth
      const response = await axios.post("http://localhost:5000/api/parcels", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("✅ Parcel booked successfully!");
        reset();
        navigate("/"); // Redirect to dashboard
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      alert("❌ Failed to book parcel. Try again.");
    }
  };

   const dhakaAddresses = [
    "Banani, Dhaka",
    "Gulshan-2, Dhaka",
    "Dhanmondi, Dhaka",
    "Uttara Sector-7, Dhaka",
    "Mirpur-10, Dhaka",
    "Motijheel, Dhaka",
    "Bashundhara R/A, Dhaka",
    "Shahbagh, Dhaka",
    "Khilgaon, Dhaka",
    "Mohammadpur, Dhaka",
    "Wari-Goriomor, Dhaka",
    "Mohakhali, Dhaka"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 flex justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700 flex justify-center items-center gap-3">
          <FaBoxOpen className="text-pink-500" /> Send a Parcel
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pickup Address */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                <FaMapMarkerAlt className="inline mr-1 text-purple-500" /> Pickup Address
              </span>
            </label>
            <select
              {...register("pickupAddress", { required: "Pickup address is required" })}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Pickup Address</option>
              {dhakaAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
            {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>}
          </div>

          {/* Delivery Address */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                <FaMapMarkerAlt className="inline mr-1 text-pink-500" /> Delivery Address
              </span>
            </label>
            <select
              {...register("deliveryAddress", { required: "Delivery address is required" })}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Delivery Address</option>
              {dhakaAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
            {errors.deliveryAddress && <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>}
          </div>

          {/* Parcel Size/Type */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">📦 Parcel Size/Type</span>
            </label>
            <select
              {...register("parcelType", { required: "Please select a parcel type" })}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select</option>
              <option value="small">Small (Up to 2kg)</option>
              <option value="medium">Medium (2-5kg)</option>
              <option value="large">Large (5kg+)</option>
            </select>
            {errors.parcelType && <p className="text-red-500 text-sm">{errors.parcelType.message}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                <FaMoneyBillWave className="inline mr-1 text-green-500" /> Payment Method
              </span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="COD"
                  {...register("paymentMethod", { required: "Select a payment method" })}
                  className="radio radio-primary"
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Prepaid"
                  {...register("paymentMethod", { required: "Select a payment method" })}
                  className="radio radio-primary"
                />
                Prepaid
              </label>
            </div>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            🚀 Book Parcel
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
