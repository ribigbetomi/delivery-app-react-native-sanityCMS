import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { Ionicons } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //   const {
  //     id,
  //     imgUrl,
  //     title,
  //     rating,
  //     genre,
  //     address,
  //     short_description,
  //     dishes,
  //     long,
  //     lat,
  //   } = route.params;
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute w-10 top-10 left-5 p-2 bg-gray-100 rounded-full z-50"
      >
        <Ionicons name="arrow-back" size={20} color="#00CCBB" />
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="star" color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating} </Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Ionicons
                  name="location"
                  color="gray"
                  opacity={0.4}
                  size={22}
                />
                <Text className="text-xs text-gray-500">
                  Nearby -{" "}
                  {address.length > 28 ? `${address.slice(0, 28)}...` : address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">
              {short_description}{" "}
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Ionicons name="help-circle" size={20} color="gray" opacity={0.6} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?{" "}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
