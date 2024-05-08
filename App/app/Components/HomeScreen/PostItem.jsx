import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("product-detail", {
          product: item,
        })
      }
      className="flex-1 m-2 p-2 border-[1px] border-slate-200 bg-blue-50 rounded-lg"
    >
      <Image
        source={{ uri: item?.image }}
        className="h-[140px] w-full  rounded-lg  "
      />
      <View>
        <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[20px] font-bold text-blue-500">
          ₹{item.price}
        </Text>
        <Text className="text-blue-500 bg-blue-200 p-[2px] mt-1 text-center rounded-full px-2 text-[12px] w-[70px]">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
