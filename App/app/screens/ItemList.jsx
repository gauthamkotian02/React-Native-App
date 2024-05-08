import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestProduct from "../Components/HomeScreen/LatestProduct";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const q = query(
        collection(db, "UserPost"),
        where("category", "==", params.category)
      );
      const snapshot = await getDocs(q);
      const tempList = [];
      snapshot.forEach((doc) => {
        tempList.push(doc.data());
      });
      setItemList(tempList);
    } catch (error) {
      console.error("Error fetching item list:", error);
    } finally {
      setLoading(false); // Set loading to false after data fetching is done (whether success or failure)
    }
  };

  return (
    <View>
      {loading ? ( // Show loader if loading is true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <LatestProduct latestItemList={itemList} heading={"Latest Items"} />
      )}
    </View>
  );
}
