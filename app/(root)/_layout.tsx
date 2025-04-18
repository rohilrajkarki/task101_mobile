import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { Redirect, Slot } from "expo-router";
import { useGlobalContext } from "@/app/lib/global-provider";

const AppLayout = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full    flex justify-center items-center">
        <ActivityIndicator
          className="text-primary-300"
          size="large"
        ></ActivityIndicator>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;
  return <Slot />;
};

export default AppLayout;
