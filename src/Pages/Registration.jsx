import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import logo from "../assets/login.png";

export default function Registeration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    // TODO: Send `data` to backend API
    navigate('/login'); // redirect after success
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-5">
      {/* Registration Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl m-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              {...register('password', { required: 'Password is required', minLength: 6 })}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Role</span>
            </label>
            <select
              {...register('role', { required: 'Please select a role' })}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="agent">Delivery Agent</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
          >
            Register
          </motion.button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:flex justify-center items-center p-8"
      >
        <img
          src={logo}
          alt="Register Illustration"
          className="w-full rounded-3xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
