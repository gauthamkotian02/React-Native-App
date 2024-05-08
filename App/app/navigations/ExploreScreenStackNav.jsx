import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../screens/ExploreScreen";
import ProductDetails from "../screens/ProductDetails";

const Stack = createStackNavigator();

export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen-nav"
        options={{
          headerShown: false,
        }}
        component={ExploreScreen}
      />

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
