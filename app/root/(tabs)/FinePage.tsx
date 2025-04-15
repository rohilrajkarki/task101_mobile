import { useEffect, useState } from "react";

const FinePage = () => {
  const [amount, setAmount] = useState(0);
  const [manualAmount, setManualAmount] = useState(0);

  const [totalAmount, setTotalAmount] = useState(40);

  const addSubAmount = (text?: string) => {
    if (text === "add") {
      setAmount((prev) => prev + 5);
    } else {
      setAmount((prev) => prev - 5);
    }
    console.log(text);
  };

  const updateAmount = () => {
    if (amount !== 0) {
      setTotalAmount((prev) => prev + amount);
      console.log(amount);
      setAmount(0);
    } else {
      console.log(manualAmount);
      setTotalAmount((prev) => prev + manualAmount);
      setManualAmount(0);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-gray-700 bg-gray-900 mx-auto mt-10 space-y-6 text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">User Name</h2>
        <span>
          Total Fines: <strong>${totalAmount}</strong>
        </span>
      </div>

      {/* Latest Fine Details */}
      <div className="p-4 border border-gray-600 rounded-lg shadow-sm text-gray-200">
        <p className="text-sm">Latest fines details will appear here.</p>
      </div>

      {/* Fine Adjustment Buttons */}
      <div className="flex justify-between">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-lg shadow"
          onClick={() => addSubAmount("add")}
        >
          +5
        </button>
        <strong>Update {amount}</strong>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-lg shadow"
          onClick={() => addSubAmount()}
        >
          -5
        </button>
      </div>

      {/* Manual Fine Input */}
      <div className="flex items-center space-x-3">
        <label htmlFor="manualFine" className="font-medium text-gray-200">
          Enter amount:
        </label>
        <input
          id="manualFine"
          type="number"
          className="w-32 px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 10"
          value={manualAmount}
          onChange={(e) => setManualAmount(Number(e.target.value))}
        />
      </div>

      <button onClick={updateAmount}>Confirm</button>

      {/* Upcoming Tasks */}
      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-md font-semibold mb-2">Upcoming Tasks</h3>
        <p className="text-gray-400 text-sm">
          List of tasks to complete will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default FinePage;
