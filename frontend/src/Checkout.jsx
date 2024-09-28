import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [form, setForm] = useState({ name: "", number: "", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!form.name || !form.number || !form.amount) {
      alert("Please fill in all the details.");
      return;
    }

    const data = {
      name: form.name,
      mobileNumber: form.number,
      amount: form.amount,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/create-order",
        data
      );
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("Error in payment", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-slate-400 shadow-lg rounded-lg p-8 md:w-1/3 w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Checkout
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="number"
          placeholder="Enter your phone number"
          value={form.number}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
