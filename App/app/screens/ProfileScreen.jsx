import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      name: "My Products",
      icon: require("../images/procurement.png"), // Require the image directly
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: require("../images/exploration.png"), // Require the image directly
      path: "Search",
    },
    {
      id: 3,
      name: "Shopy",
      icon: require("../images/shopy_edited.jpg"), //quire the image directly
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../images/logout.png"), // Require the image directly
    },
  ];
  const onMenuPress = (item) => {
    if (item.name === "Logout") {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel logout"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => signOut(),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    console.log("My product");
    item?.path ? navigation.navigate(item.path) : null;
  };

  return (
    <View className="pt-5">
      <View className="items-center mt-14">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[80px] h-[80px] rounded-full"
        />
        <Text className="font-bold text-[25px] mt-2">{user.fullName}</Text>
        <Text className=" text-[25px] mt-2 text-gray-400">
          {user.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <View className="pt-5">
        <FlatList
          data={menuList}
          numColumns={3}
          style={{ marginTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onMenuPress(item)}
              style={{
                flex: 1,
                padding: 3,
                borderWidth: 1,
                alignItems: "center",
                marginHorizontal: 4,
                marginTop: 4,
                borderRadius: 8,
                borderColor: "blue",
                backgroundColor: "lightblue",
              }}
            >
              {item.icon && (
                <Image source={item.icon} style={{ width: 50, height: 50 }} />
              )}
              <Text style={{ fontSize: 12, marginTop: 2, color: "blue" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
