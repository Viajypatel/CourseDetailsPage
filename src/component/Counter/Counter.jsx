import React from "react";
import useCounterStore from "../../store/counterStore";

const Counter = () => {
  const { count, increase, decrease, reset } = useCounterStore();

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Zustand Counter</h1>
      <p className="text-lg mb-4">Count: {count}</p>
      <div className="flex justify-center gap-4">
        <button onClick={increase} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Increase</button>
        <button onClick={decrease} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Decrease</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Reset</button>
      </div>
    </div>
  );
};

export default Counter;
