import { View, Text, Image, Linking, Alert, Share } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { app } from "../../firebaseConfig";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function ProductDetails({ navigation }) {
  const { params } = useRoute();
  const db = getFirestore(app);

  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const nav = useNavigation();
  useEffect(() => {
    console.log("234", params);
    params && setProduct(params?.product);
    shareButton();
  }, [params, navigation, product]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct(product)}>
          <Image
            source={require("../images/share.png")}
            style={{ marginRight: 30, width: 20, height: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  };

  const shareProduct = async (item) => {
    try {
      console.log(item);
      const message =
        await `Title: ${product?.title}\n\nDescription: ${product?.desc}\n\nImage: ${product?.image}\n\nPosted by: ${product?.userName} )`;

      const result = await Share.share({
        message: message,
        title: product?.title,
      });

      if (result.action === Share.sharedAction) {
        if (result?.activityType) {
          // shared with activity type of result.activityType
          console.log("Shared via", result?.activityType);
        } else {
          // shared
          console.log("Shared");
          console.log(product);
        }
      } else if (result?.action === Share?.dismissedAction) {
        // dismissed
        console.log("Dismissed");
      }
    } catch (error) {
      console.error("Error sharing product:", error.message);
    }
  };

  const deleteUserPost = () => {
    console.log("delete");

    Alert.alert("Do you want to delete", "Are You Sure", [
      {
        text: "Yes",
        onPress: () => deleteFromFirestore(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  const deleteFromFirestore = async () => {
    console.log("111delete");
    console.log(product?.title);

    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product?.title)
    );

    console.log("12345", [q]);
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc?.ref).then((resp) => {
        console.log("Delete the Doc..");
        nav.goBack();
      });
    });
  };

  const sendEmailAddress = () => {
    const subject = "Regarding" + product.title;
    const body =
      "Hi" + product.userName + "\n" + "I am intrested in this product";
    Linking.openURL(
      "mailTo:" + product?.userEmail + "?subject" + subject + "&body" + body
    );
  };
  return (
    <View>
      <Image source={{ uri: product?.image }} className="h-[320px] w-full" />
      <View className="pl-2">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline ">
          <Text className=" p-1 px-3 bg-blue-200 text-blue-500 rounded-full ">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-5 font-bold text-[20px]">Discription</Text>
        <Text className=" mb-8 text-[17px] text-gray-500 ">
          {product?.desc}
        </Text>
      </View>
      <View className="p-3 px-3 mt-7  flex flex-row items-center gap-3 border-[1-px] border-gray-400 bg-blue-100">
        <Image
          source={{ uri: product?.userImage }}
          className="w-12  h-12 rounded-full"
        />

        <View>
          <Text className="font-bold text-[18px]">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress?.emailAddress == product?.userEmail ? (
        <TouchableOpacity
          onPress={() => deleteUserPost()}
          className="z-40 bg-red-500 w-8-0 rounded-lg  p-4 m-3 "
        >
          <Text className="text-center text-white ">Delete Post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailAddress()}
          className="z-40 bg-blue-500 w-8-0 rounded-lg  p-4 m-3 "
        >
          <Text className="text-center text-white ">Send Message</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
