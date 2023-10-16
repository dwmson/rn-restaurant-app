import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface Props {
  result: {
    image_url?: string;
    name: string;
    review_count: number;
    rating: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    location: {
      city: string;
      state: string;
    };
  };
}

const ResultsDetail: FC<Props> = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: result.image_url }} />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.rating} ★ {result.review_count} Reviews
      </Text>
      <Text>
        {result.location.city}, {result.location.state}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsDetail;
