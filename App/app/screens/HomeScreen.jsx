import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // Ensure the correct export in firebaseConfig.js
import Category from "../Components/HomeScreen/Category";
import ProductList from "../Components/HomeScreen/ProductList";
export default function HomeScreen() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());

      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <ScrollView className="pt-15 pb-4  bg-white flex-1">
      <Header />
      <Slider />
      <Category categoryList={categoryList} />
      <ProductList />
    </ScrollView>
  );
}
