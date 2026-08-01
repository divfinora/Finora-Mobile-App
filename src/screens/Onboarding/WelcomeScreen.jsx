import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (
  

    <View className="flex-1 bg-white items-center px-6 pt-12 border">
      
      {/* Title */}
      <Text className="text-xl font-bold text-black mb-6 text-[20px]">
        Lorem Ipsum
      </Text>

      {/* Illustration */}
      <Image
        source={require('../Onboarding/assets/welcome.png')}
        className="w-72 h-72 mb-8"
        resizeMode="contain"
      />

      {/* Heading */}
      <Text className="text-2xl font-bold text-black-700 mb-3">
        Fast Services
      </Text>

      {/* Description */}
      <Text className="text-center text-gray-600 text-base leading-6 mb-10">
        Book trusted professionals for plumbing, cleaning, beauty, and more —
        right to your doorstep. Track every step of your booking and get
        instant updates from booking to completion.
      </Text>

      {/* Button */}
      <Pressable
        className="bg-blue-600 w-full  rounded-xl items-center"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-white text-lg font-semibold">
          Get Started
        </Text>
      </Pressable>  

    </View>
  );
}





















