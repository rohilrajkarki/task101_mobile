import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login, logout } from "./lib/appwrite";
import { useGlobalContext } from "./lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  console.log("isloggedIn=>", isLoggedIn);
  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log("login Success");
      refetch();
    } else {
      Alert.alert("Error", "Failed to login signIN");
    }
  };

  // # appwrite email : rohil01
  // # google console email:rohil101

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Real Scout.
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google auth
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
