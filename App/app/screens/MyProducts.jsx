import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { app } from "../../firebaseConfig";
import LatestProduct from "../Components/HomeScreen/LatestProduct";
import { useNavigation } from "@react-navigation/native";
export default function MyProducts() {
  const db = getFirestore(app);
  const { user } = useUser();
  const nav = useNavigation();

  const [postList, setpostList] = useState([]);
  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    nav.addListener("focus", (e) => {
      console.log(e);
      getUserPost();
    });
  }, [nav]);
  /*
User Post Details only
*/
  console.log("fghjkl", user.primaryEmailAddress.emailAddress);
  const getUserPost = async () => {
    setpostList([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log("11111=>", doc.data());

      setpostList((postList) => [...postList, doc.data()]);
    });
  };
  return (
    <View className="mt-3">
      <LatestProduct latestItemList={postList} heading={"My Products"} />
    </View>
  );
}
