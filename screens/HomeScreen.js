import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import "url-polyfill";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      //   headerTitle: "CurrentPage",
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
        ...,
        restaurants[] -> {
          ...,
          dishes[]->
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log(featuredCategories);

  // const url = new URL("https://links.papareact.com/wru");
  // url.pathname = "/wru";

  return (
    <SafeAreaView
      className={` pt-5 ${Platform.OS === "android" ? "mt-6" : ""}`}
    >
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <FontAwesome name="chevron-down" size={20} color="#00CCBB" />
          </Text>
          {/* <HeroIcons name="search" size={20} color="00CCBB" /> */}
          {/* <SearchIcon /> */}
        </View>
        <View>
          <Ionicons name="person-outline" size={35} color="#00CCBB" />
        </View>
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <FontAwesome name="search" size={20} color="gray" />
          <TextInput
            placeholder="Restuarants and cuisines"
            keyboardType="default"
          />
          {/* <FontAwesome name="search" size={20} /> */}
        </View>
        <FontAwesome name="sliders" size={25} color="#00CCBB" />
      </View>
      <ScrollView
        className=""
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}

        {featuredCategories?.map((category) => (
          // {
          //   console.log(category, "kk");
          // }
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
