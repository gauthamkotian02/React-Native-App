import { View, Text, FlatList, Image } from "react-native";

import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig"; // Ensure the correct export in firebaseConfig.js
import React, { useEffect, useState } from "react";

export default function Slider() {
  const db = getFirestore(app);
  const [sliderList, setsliderList] = useState([]);

  useEffect(() => {
    getsliderList();
  }, []);
  const getsliderList = async () => {
    setsliderList([]);
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      // sliders.push(doc.data());
      setsliderList((sliderList) => [...sliderList, doc.data()]);
      console.log(...sliderList);
    });
  };
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="h-[200px] w-[330px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      />
    </View>
  );
}
