import { useState } from "react";

export default function ReactCounter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="card border-2 border-indigo-500 text-center my-5">
      <h3 className="text-xl font-semibold mb-3 text-indigo-600">
        Contador React Interactivo
      </h3>
      <p className="mb-4 text-lg">
        Valor actual:{" "}
        <strong className="text-2xl text-indigo-800">{count}</strong>
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="btn bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="btn bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="btn bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          +1
        </button>
      </div>
    </div>
  );
}
