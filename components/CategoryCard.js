import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative my-2 mr-3">
      <Image source={{ uri: imgUrl }} className="h-28 w-32 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
