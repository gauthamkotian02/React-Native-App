import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ItemList from "../screens/ItemList";
import ProductDetails from "../screens/ProductDetails";

const Stack = createStackNavigator();
export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home-nav"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        })}
        name="Item-List"
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
