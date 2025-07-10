import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import logo from "../assets/login.png";
import axios from 'axios';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await axios.post("http://localhost:5000/api/login", data);

            if (result.data.success) {
                // Save JWT Token in localStorage
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user)); // Save user info

                // Redirect based on role
                if (result.data.user.role === "admin") {
                    navigate("/");
                    alert("Admin login successful!");
                    console.log(localStorage.getItem("user"));
                } else if (result.data.user.role === "agent") {
                    navigate("/");
                    alert("Agent login successful!");
                } else {
                    navigate("/");
                    alert(" login successful!");
                }
            } else {
                alert(result.data.message); // show error from backend
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500">
            {/* Login Form */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl m-auto"
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            {...register('password', { required: 'Password is required' })}
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
                            {...register('role', { required: 'Please select your role' })}
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
                        Login
                    </motion.button>


                    {/* Redirect to Register */}
                    <p className="text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <span
                            className="text-purple-600 font-semibold cursor-pointer hover:underline"
                            onClick={() => navigate('/register')}
                        >
                            Register
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
                    alt="Login Illustration"
                    className="w-4/5 rounded-3xl shadow-2xl"
                />
            </motion.div>
        </div>
    );
}
