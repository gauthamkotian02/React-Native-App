import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";

import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // Ensure the correct export in firebaseConfig.js
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AddPostScreen() {
  const storage = getStorage();

  const db = getFirestore(app);
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "category"));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  onSubmitMethod = async (value) => {
    setLoading(true);
    //convert  Uri to Blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "myapp/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          (value.userName = user.fullName),
            (value.userEmail = user.primaryEmailAddress.emailAddress),
            (value.userImage = user.imageUrl);
          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            console.log("Document Added!!");
            Alert.alert("Sucess!!!", "Post Added sucessfully");
          }
        });
      });
  };
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">
        Create New Post Start Buying
      </Text>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
          userName: "",
          userEmail: "",
          userImage: "",
          createdAt:Date.now(),
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(value) => {
          const errors = {};
          if (!value.title) {
            console.log("Title Not Present");
            ToastAndroid.show("Title Must be filled", ToastAndroid.SHORT);
            errors.name = "Title Must be filled";
          }
          return errors;
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              ) : (
                <Image
                  source={require("../images/download.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Discription"
              value={values.desc}
              numberOfLines={5}
              onChangeText={handleChange("desc")}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="number-pad"
              value={values.price}
              onChangeText={handleChange("price")}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values.address}
              onChangeText={handleChange("address")}
            />
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      style={styles.input}
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
              className="p-4 bg-blue-500 rounded-full mt-10 "
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-[16px]">
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 17,
    fontSize: 19,
    textAlignVertical: "top",
  },
});
