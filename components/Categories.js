import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import "url-polyfill";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category" ]
    `
      )
      .then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
      {/* <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Testing" /> */}

      {/* <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" />
      <CategoryCard imgUrl={url} title="Testing" /> */}
    </ScrollView>
  );
};

export default Categories;
