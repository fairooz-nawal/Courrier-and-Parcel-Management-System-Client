import React from 'react';
import bg from "../assets/car.jpg"
const steps = [
    'Register or Login to your account',
    'Book a parcel pickup and provide delivery details',
    'Track your parcel in real-time on the map',
    'Receive your parcel delivered at your doorstep',
];

export default function HowItWorksSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="bg-sky-500 py-16 px-6 text-white">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <ol className="mx-auto space-y-8 list-decimal list-inside text-lg text-white p-0">
                    {steps.map((step, idx) => (
                        <li className='bg-white text-black p-5 rounded-r-full' key={idx}>{step}</li>
                    ))}
                </ol>
            </div>
            <div className="">
                <img className='w-full h-full object-cover' src={bg} alt="" />
            </div>
        </div>

    );
}
