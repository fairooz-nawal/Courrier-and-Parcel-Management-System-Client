import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Book Parcels Easily',
    description: 'Schedule parcel pickups from the comfort of your home or office.',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your parcel live on the map with status updates.',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
  },
  {
    title: 'Efficient Delivery Agents',
    description: 'Our delivery agents get optimized routes for faster delivery.',
    bgColor: 'bg-yellow-500',
    textColor: 'text-white',
  },
  {
    title: 'Admin Control & Reporting',
    description: 'Admin dashboard to manage all parcels, agents and generate reports.',
    bgColor: 'bg-purple-500',
    textColor: 'text-white',
  },
];

// Animation variants for fade-in + slide up
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Feature() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map(({ title, description, bgColor, textColor }) => (
          <motion.div
            key={title}
            className={`${bgColor} ${textColor} p-8 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-base">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
