import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyProducts from "../screens/MyProducts";
import ProductDetails from "../screens/ProductDetails";

const Stack = createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-tab"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen name="my-product" component={MyProducts} />
      <Stack.Screen
        component={ProductDetails}
        options={{
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
          headerTitle: "Details",
        }}
        name="product-detail"
      />
    </Stack.Navigator>
  );
}
