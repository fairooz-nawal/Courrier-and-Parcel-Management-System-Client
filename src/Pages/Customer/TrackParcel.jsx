import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

// Connect to backend Socket.IO server
const socket = io("http://localhost:5000"); // Backend URL

// Helper component to update map center dynamically
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {
        animate: true, // smooth animation
      });
    }
  }, [position, map]);
  return null;
}

export default function TrackParcel({ parcelId }) {
  const [position, setPosition] = useState([23.8103, 90.4125]); // Default center
  const [isParcelMoving, setIsParcelMoving] = useState(false);

  useEffect(() => {
    console.log("📡 Listening for parcel location updates...");

    // Listen for location updates
    socket.on(`parcelLocation-${parcelId}`, (data) => {
      console.log("📦 Received new parcel location:", data);
      setPosition([data.lat, data.lng]);
      setIsParcelMoving(true);
    });

    return () => {
      socket.off(`parcelLocation-${parcelId}`); // Clean up
    };
  }, [parcelId]);

  return (
    <div className="h-screen w-full">
      <h2 className="text-3xl font-bold text-center my-4">
        📦 Tracking Parcel: <span className="text-blue-600">{parcelId}</span>
      </h2>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            🚚 Parcel Current Location<br />
            Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
          </Popup>
        </Marker>

        {/* Auto-recenter map when position changes */}
        <RecenterMap position={position} />
      </MapContainer>

      {isParcelMoving ? (
        <p className="text-center mt-4 text-green-600 font-semibold">
          🛰️ Live location updates enabled.
        </p>
      ) : (
        <p className="text-center mt-4 text-gray-500">
          Waiting for delivery agent to start moving...
        </p>
      )}
    </div>
  );
}
