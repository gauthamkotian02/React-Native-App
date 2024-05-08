import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { app } from "../../../firebaseConfig";

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useUser();

  const searchFirestore = async (text) => {
    const q = query(
      collection(db, "UserPost"),
      where("title", ">=", text),
      where("title", "<=", text + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    console.log(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchText.trim().length > 0) {
      searchFirestore(searchText.trim());
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <View style={{ paddingTop: 5 }}>
      {/* User Info Section */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ borderRadius: 50, width: 50, height: 50 }}
        />
        <View>
          <Text style={{ fontSize: 16 }}>Welcome</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {user.fullName}
          </Text>
        </View>
      </View>
      {/* Search bar */}
      <View
        style={{
          padding: 7,
          marginHorizontal: 4,
          paddingHorizontal: 5,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EDF2F7",
          marginTop: 5,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#A0AEC0",
        }}
      >
        <TextInput
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          style={{ marginRight: 3, flex: 1 }}
        />
      </View>
      {/* Display search results */}
      <View>
        {searchResults.map((result) => (
          <View key={result.id}>
            <Text>{result.title}</Text>
            {/* Add more fields to display */}
          </View>
        ))}
      </View>
    </View>
  );
}
