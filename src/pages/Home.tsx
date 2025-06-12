import React, { useState } from "react";

interface HomeProps {
  initialLoading?: boolean;
}

const Home: React.FC<HomeProps> = ({ initialLoading = false }) => {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  console.log("Home render time:", performance.now());

  const handleSubmit = () => {
    setLoading(true);
    setSuccess("");
    setError("");
    // Simulate API
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setLoading(false);
      if (isSuccess) {
        setSuccess("Action completed successfully!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }, 2000);
  };

  return (
    <main className="container mx-auto px-4">
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading}
          className={`
            px-4 
            py-2 
            bg-blue-600 
            text-white 
            rounded 
            hover:bg-blue-700 
            disabled:opacity-50
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-offset-2
          `}
        >
          {loading ? "Processing..." : "Click Me"}
        </button>
        {success && (
          <p role="status" className="text-green-600 mt-4 font-medium">
            {success}
          </p>
        )}
        {error && (
          <p role="alert" className="text-red-600 mt-4 font-medium">
            {error}
          </p>
        )}
      </div>
    </main>
  );
};

export default Home; 