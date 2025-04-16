import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useAppwrite } from "@/app/lib/useAppwrite";
import { getCurrentUser, login, logout } from "@/app/lib/appwrite";
import "../../global.css";

const Home = () => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const handleLogin = async () => {
    console.log("login clicked");
    const result = await login();
    if (result) {
      refetch();
      console.log(result);
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  console.log("data===>", user);
  return (
    <View>
      <Text>Home</Text>
      <View className="flex justify-between text-white uppercase">
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>

        <TouchableOpacity onPress={handleLogin}>
          <Text>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
