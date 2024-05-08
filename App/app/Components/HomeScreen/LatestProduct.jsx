import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { getFirestore, getDocs, collection, orderBy } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function LatestProduct({ latestItemList, heading }) {
  const db = getFirestore(app);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const querySnapshot = await getDocs(
        collection(db, "UserPost"),
        orderBy("createdAt")
      );
      const tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push(doc.data());
      });
      setPostList(tempList);
    } catch (error) {
      console.error("Error fetching post list:", error);
    } finally {
      setLoading(false); // Set loading to false after data fetching is done (whether success or failure)
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{heading}</Text>
      {loading ? ( // Conditionally render the loader while loading is true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={latestItemList}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <PostItem item={item} />}
        />
      )}
    </View>
  );
}
