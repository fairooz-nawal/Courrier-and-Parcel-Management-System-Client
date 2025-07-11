import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import {MapContainer,TileLayer,Marker,Popup,Polyline,useMap,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { ContextAPI } from "../../Component/Context/AuthProvider";

// Dhaka addresses
const dhakaAddresses = [
  { label: "Banani, Dhaka", coords: [23.7925, 90.4078] },
  { label: "Gulshan-2, Dhaka", coords: [23.7916, 90.4152] },
  { label: "Dhanmondi, Dhaka", coords: [23.7465, 90.3760] },
  { label: "Uttara Sector-7, Dhaka", coords: [23.8745, 90.3984] },
  { label: "Mirpur-10, Dhaka", coords: [23.8041, 90.3654] },
  { label: "Motijheel, Dhaka", coords: [23.7333, 90.4167] },
  { label: "Bashundhara R/A, Dhaka", coords: [23.8190, 90.4273] },
  { label: "Shahbagh, Dhaka", coords: [23.7388, 90.3954] },
  { label: "Khilgaon, Dhaka", coords: [23.7421, 90.4247] },
  { label: "Mohammadpur, Dhaka", coords: [23.7581, 90.3676] },
  { label: "Wari, Dhaka", coords: [23.7104, 90.4196] },
  { label: "Mohakhali DOHS, Dhaka", coords: [23.7921, 90.4041] },
  { label: "Farmgate, Dhaka", coords: [23.7568, 90.3844] },
  { label: "Tejgaon, Dhaka", coords: [23.7681, 90.3985] },
  { label: "Paltan, Dhaka", coords: [23.7361, 90.4173] },
  { label: "Rampura, Dhaka", coords: [23.7544, 90.4221] },
  { label: "Adabor, Dhaka", coords: [23.7740, 90.3536] },
  { label: "Elephant Road, Dhaka", coords: [23.7381, 90.3806] },
  { label: "Badda, Dhaka", coords: [23.7801, 90.4260] },
  { label: "Hatirjheel, Dhaka", coords: [23.7546, 90.4006] },
];

// Helper component to update map bounds
function FitBounds({ routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoords.length > 0) {
      map.fitBounds(routeCoords, { padding: [50, 50] });
    }
  }, [map, routeCoords]);

  return null;
}




// main function
export default function AddParcel() {
  const {user} = useContext(ContextAPI);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // Get driving route from OSRM
  const fetchRoute = async (start, end) => {
    try {
      const res = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      const coords = res.data.routes[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);
      setRouteCoords(coords);
    } catch (err) {
      console.error("Failed to fetch route:", err);
    }
  };

  // Trigger route fetch when both locations are selected
  useEffect(() => {
    if (pickupLocation && deliveryLocation) {
      fetchRoute(pickupLocation, deliveryLocation);
    } else {
      setRouteCoords([]); // Clear route if locations change
    }
  }, [pickupLocation, deliveryLocation]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const parcelData = {
        ...data,
        userId: user.id,
        userEmail: user.email,
        pickupCoords: pickupLocation,
        deliveryCoords: deliveryLocation,
      };

      console.log("Parcel Data:", parcelData);
      
      const response = await axios.post("http://localhost:5000/api/parcels", parcelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("✅ Parcel booked successfully!");
        reset();
        navigate("/book-parcel");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      alert("❌ Failed to book parcel. Try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl rounded-xl p-8 mt-10">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        📦 Send Your Parcel with Ease
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg shadow-md p-6"
      >
        {/* Pickup Address */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">📍 Pickup Address</span>
          </label>
          <select
            {...register("pickupAddress", { required: "Pickup address is required" })}
            onChange={(e) => {
              const selected = dhakaAddresses.find((addr) => addr.label === e.target.value);
              setPickupLocation(selected.coords);
            }}
            className="select select-bordered w-full"
          >
            <option value="">Select Pickup Address</option>
            {dhakaAddresses.map((addr, idx) => (
              <option key={idx} value={addr.label}>{addr.label}</option>
            ))}
          </select>
          {errors.pickupAddress && (
            <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>
          )}
        </div>

        {/* Delivery Address */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">📦 Delivery Address</span>
          </label>
          <select
            {...register("deliveryAddress", { required: "Delivery address is required" })}
            onChange={(e) => {
              const selected = dhakaAddresses.find((addr) => addr.label === e.target.value);
              setDeliveryLocation(selected.coords);
            }}
            className="select select-bordered w-full"
          >
            <option value="">Select Delivery Address</option>
            {dhakaAddresses.map((addr, idx) => (
              <option key={idx} value={addr.label}>{addr.label}</option>
            ))}
          </select>
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>
          )}
        </div>

        {/* Parcel Size */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">📏 Parcel Size/Type</span>
          </label>
          <select
            {...register("parcelType", { required: "Please select a parcel type" })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="small">Small (Up to 2kg)</option>
            <option value="medium">Medium (2-5kg)</option>
            <option value="large">Large (5kg+)</option>
          </select>
          {errors.parcelType && (
            <p className="text-red-500 text-sm">{errors.parcelType.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">💳 Payment Method</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="COD"
                {...register("paymentMethod", { required: "Select a payment method" })}
                className="radio radio-primary"
              />
              COD
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
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Map Display */}
        <div className="h-96 rounded-lg overflow-hidden border-2 border-purple-300 shadow">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pickupLocation && (
              <Marker position={pickupLocation}>
                <Popup>Pickup: {dhakaAddresses.find((a) => a.coords === pickupLocation)?.label}</Popup>
              </Marker>
            )}
            {deliveryLocation && (
              <Marker position={deliveryLocation}>
                <Popup>Delivery: {dhakaAddresses.find((a) => a.coords === deliveryLocation)?.label}</Popup>
              </Marker>
            )}
            {routeCoords.length > 0 && (
              <Polyline positions={routeCoords} pathOptions={{ color: "blue", weight: 5 }} />
            )}
            <FitBounds routeCoords={routeCoords} />
          </MapContainer>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-gradient w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all text-lg py-3"
        >
          🚀 Book Parcel
        </button>
      </form>
    </div>
  );
}
