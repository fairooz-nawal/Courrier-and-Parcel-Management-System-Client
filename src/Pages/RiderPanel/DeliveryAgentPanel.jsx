import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Backend URL

export default function DeliveryAgentPanel({ parcelId }) {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    // Fetch parcel data from backend
    async function fetchParcelDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/parcels/${parcelId}`);
        const { pickupCoords, deliveryCoords } = response.data.parcel;

        setPosition({ lat: pickupCoords[0], lng: pickupCoords[1] });
        setDestination({ lat: deliveryCoords[0], lng: deliveryCoords[1] });

        console.log("📦 Parcel details loaded:", pickupCoords, deliveryCoords);

        // Simulate movement
        intervalId = setInterval(() => {
          setPosition((prev) => {
            if (!prev || !destination) return prev;

            // Simple linear movement simulation
            const step = 0.0005; // Adjust speed
            const latDiff = destination.lat - prev.lat;
            const lngDiff = destination.lng - prev.lng;

            if (Math.abs(latDiff) < step && Math.abs(lngDiff) < step) {
              console.log("✅ Parcel reached destination!");
              clearInterval(intervalId); // Stop simulation
              return destination;
            }

            const nextLat = prev.lat + step * Math.sign(latDiff);
            const nextLng = prev.lng + step * Math.sign(lngDiff);

            const newPos = { lat: nextLat, lng: nextLng };

            // Emit new location to backend
            socket.emit("updateLocation", {
              parcelId,
              lat: nextLat,
              lng: nextLng,
            });
            console.log("📡 Sent location:", newPos);

            return newPos;
          });
        }, 3000); // Update every 3 seconds

      } catch (err) {
        console.error("❌ Error fetching parcel:", err);
        setError("Failed to fetch parcel details.");
      }
    }

    fetchParcelDetails();

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
    };
  }, [parcelId, destination]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600">🚚 Delivery Agent Panel</h2>
      {error ? (
        <p className="text-red-500 mt-4">⚠️ {error}</p>
      ) : position ? (
        <p className="mt-4">
          📍 Current Location: <b>{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</b><br />
          📦 Sending live location updates for parcel: <b>{parcelId}</b>
        </p>
      ) : (
        <p className="mt-4 text-gray-500">⏳ Loading parcel details...</p>
      )}
    </div>
  );
}
