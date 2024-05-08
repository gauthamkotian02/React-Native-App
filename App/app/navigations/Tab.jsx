import { View, Text, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/ExploreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddPostScreen from "../screens/AddPostScreen";
import HomeScreenStackNav from "./HomeScreenStackNav";
import ExploreScreenStackNav from "./ExploreScreenStackNav";
import ProfileScreenStackNav from "./ProfileScreenStackNav";

export default function Tab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          marginBottom: 3,
        },
        activeTintColor: "#000", // Change the color of the active tab
        inactiveTintColor: "#999", // Change the color of the inactive tabs
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../images/3d-house.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
        name="Home"
        component={HomeScreenStackNav}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../images/search-bar.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
        name="Search"
        component={ExploreScreenStackNav}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../images/photo.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
        name="AddPost"
        component={AddPostScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../images/man.png")}
              style={{ width: size, height: size }}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreenStackNav}
      />
    </Tab.Navigator>
  );
}
