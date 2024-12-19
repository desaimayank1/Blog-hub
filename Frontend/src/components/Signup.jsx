import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/user/update/role", {
        method: "PATCH",
        body: JSON.stringify({ role }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Top Section (Background 1) */}
      <div className="bg-black h-1/2 absolute top-0 left-0 w-full"></div>

      {/* Bottom Section (Background 2) */}
      <div className="bg-blue-700 h-1/2 absolute bottom-0 left-0 w-full"></div>

      {/* Centered Card */}
      <div className="relative z-10 bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
        <h3 className="text-4xl font-extrabold mb-10 text-gray-700 text-center">
          Choose your role
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-around items-center mb-6 text-2xl">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="0"
                className="form-radio h-5 w-5"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span className="text-gray-600">Creator</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="1"
                className="form-radio h-5 w-5"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span className="text-gray-600">Reader</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create my account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
