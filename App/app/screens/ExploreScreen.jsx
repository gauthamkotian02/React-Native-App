import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestProduct from "../Components/HomeScreen/LatestProduct";
export default function ExploreScreen(latestItemList) {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);
  // const { params } = useRoute();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    setProductList([]);
    const q = query(collection(db, "UserPost"), orderBy("desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <ScrollView className="pt-15  bg-white flex-1">
      <Text className=" pt-6 text-[30px] font-bold">ExploreScreen</Text>
      <LatestProduct latestItemList={productList} />
    </ScrollView>
  );
}
