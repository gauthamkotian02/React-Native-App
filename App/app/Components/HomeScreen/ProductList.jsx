import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig"; // Ensure the correct export in firebaseConfig.js
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function ProductList({ heading }) {
  const db = getFirestore(app);
  const [postList, setpostList] = useState([]);

  useEffect(() => {
    getpostList();
  }, []);

  const getpostList = async () => {
    setpostList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt")
    );
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());

      setpostList((postList) => [...postList, doc.data()]);
    });
  };
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
        data={postList}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => index <= 10 && <PostItem item={item} />}
      />
    </View>
  );
}
