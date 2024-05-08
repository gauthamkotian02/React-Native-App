import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

import { StatusBar } from "expo-status-bar";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="">
      <Image
        source={require("../../assets/d561165996956f1d19023b39977c97ff.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl ">
        <Text className="text-[30px] font-bold">Shopy</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy and Sell Shopy Where You can Sell and make real Money
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-3 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px] ">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
