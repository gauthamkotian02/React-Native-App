import React, { useState, useEffect } from "react";
import { StatusBar, ActivityIndicator, View } from "react-native";
import Tab from "./app/navigations/Tab.jsx";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating some asynchronous initialization process
    setTimeout(() => {
      setIsLoading(false); // Once initialization is complete, set isLoading to false
    }, 2000); // You can adjust the timeout duration as needed
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      {isLoading ? ( // Show loader if isLoading is true
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ClerkProvider publishableKey="pk_test_ZW5vdWdoLWNhbGYtODUuY2xlcmsuYWNjb3VudHMuZGV2JA">
          <SignedIn>
            <NavigationContainer>
              <Tab />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </ClerkProvider>
      )}
    </View>
  );
}
