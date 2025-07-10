import React from 'react';
import { motion } from 'framer-motion';
import bg from "../assets/car.jpg";

const steps = [
  'Register or Login to your account',
  'Book a parcel pickup and provide delivery details',
  'Track your parcel in real-time on the map',
  'Receive your parcel delivered at your doorstep',
];

export default function HowItWorksSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 py-16 px-6 text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>

        <ol className="mx-auto space-y-8 list-decimal list-inside text-lg p-0">
          {steps.map((step, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5, ease: "easeOut" }}
              className="bg-white text-gray-800 p-5 rounded-r-full shadow-md hover:bg-sky-100 hover:scale-105 transform transition-all duration-300"
            >
              <span className="font-semibold text-sky-700">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <img
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          src={bg}
          alt="Courier Process"
        />
      </motion.div>
    </div>
  );
}
