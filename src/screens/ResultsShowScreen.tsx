import React, { useState, useEffect, FC } from "react";
import { View, Text, StyleSheet, FlatList, Image, Linking } from "react-native";
import yelp from "../api/yelp";
import { Entypo } from "@expo/vector-icons";
import type { NavigationInjectedProps } from "react-navigation";

type ResultsShowProps = {
  navigation: NavigationInjectedProps["navigation"];
};

const ResultsShowScreen: FC<ResultsShowProps> = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  const address = `${result.location.address1}, ${result.location.city}, ${result.location.state} ${result.location.zip_code}`;

  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <View style={styles.horizontalBorder}></View>
      <Text style={styles.businessName}>{result.name}</Text>
      <Text>
        {result.rating} ★ {result.review_count} Reviews
      </Text>
      <Text>{result.price}</Text>
      <View style={styles.horizontalBorder}></View>
      <View style={styles.formatStyleLocation}>
        <Entypo
          style={styles.iconLocationStyle}
          name="location-pin"
          color="black"
        />
        <Text
          style={styles.address}
          selectable
          onPress={() => {
            openGoogleMap();
          }}
        >
          {address}
        </Text>
      </View>
      <View style={styles.formatStyleLocation}>
        <Entypo style={styles.iconPhoneStyle} name="phone" color="black" />
        <Text
          style={styles.phone}
          selectable
          onPress={() => {
            Linking.openURL(`tel:${result.display_phone}`);
          }}
        >
          {result.display_phone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    marginHorizontal: 15,
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  address: {
    alignSelf: "center",
  },
  phone: {
    alignSelf: "center",
  },
  iconLocationStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginRight: 10,
  },
  iconPhoneStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginRight: 15,
  },
  formatStyleLocation: {
    flexDirection: "row",
    marginBottom: 10,
  },
  photosText: {
    marginBottom: 10,
  },
  horizontalBorder: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default ResultsShowScreen;
