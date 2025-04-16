import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const isLogged = false;

  if (!isLogged) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
