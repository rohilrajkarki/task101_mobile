import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  ScrollView,
} from "react-native";

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
    <ScrollView className="flex-1 bg-gray-900 px-5 pt-10">
      <View className="bg-gray-800 rounded-2xl px-6 py-8 space-y-8 shadow-md border border-gray-700">
        {/* Header */}
        <View className="items-center space-y-1">
          <Text className="text-xl font-bold text-white">Welcome, User</Text>
          <Text className="text-base text-gray-300">
            Total Fines:{" "}
            <Text className="text-green-400 font-bold">${totalAmount}</Text>
          </Text>
        </View>

        {/* Latest Fine Info */}
        <View className="bg-gray-700 rounded-lg p-4">
          <Text className="text-sm text-gray-300">
            📋 Latest fines details will appear here.
          </Text>
        </View>

        {/* Add/Subtract Buttons */}
        <View className="flex-row justify-center space-x-8">
          <Pressable
            className="bg-green-600 px-6 py-3 rounded-full"
            onPress={() => addSubAmount("add")}
          >
            <Text className="text-white text-lg font-bold">+5</Text>
          </Pressable>

          <Pressable
            className="bg-red-600 px-6 py-3 rounded-full"
            onPress={() => addSubAmount()}
          >
            <Text className="text-white text-lg font-bold">-5</Text>
          </Pressable>
        </View>

        {/* Display Pending Update */}
        {amount !== 0 && (
          <Text className="text-center text-yellow-400 text-base font-semibold">
            Pending Update:{" "}
            {amount > 0 ? `+$${amount}` : `-$${Math.abs(amount)}`}
          </Text>
        )}

        {/* Manual Input */}
        <View className="space-y-2">
          <Text className="text-white font-medium">Manual Fine Entry</Text>
          <View className="flex-row space-x-3">
            <TextInput
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#9ca3af"
              value={manualAmount.toString()}
              onChangeText={(text) => setManualAmount(Number(text))}
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600"
            />
            <Pressable
              onPress={updateAmount}
              className="bg-blue-600 px-5 py-3 rounded-md"
            >
              <Text className="text-white font-medium">Confirm</Text>
            </Pressable>
          </View>
        </View>

        {/* Tasks Section */}
        <View className="pt-6 border-t border-gray-700">
          <Text className="text-white text-lg font-semibold mb-2">
            Upcoming Tasks
          </Text>
          <Text className="text-gray-400 text-sm">
            📝 List of tasks to complete will be displayed here.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FinePage;
