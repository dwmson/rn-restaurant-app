import React, { useState, useRef } from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { useResults } from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
import { NavigationInjectedProps } from "react-navigation";
import Map from "../components/Map";

const SearchScreen = (props: NavigationInjectedProps<{}>) => {
  const [term, setTerm] = useState("food");
  const [location, setLocation] = useState("Denver, CO");
  const { searchApi, results, errorMessage } = useResults();
  const [selected, setSelected] = useState("");

  const filterResultsByPrice = (price: string) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        location={location}
        onLocationChange={setLocation}
        onTermSubmit={() => searchApi(term, location, selected)}
        setSelected={setSelected}
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <View style={styles.container}>
        <View style={styles.map}>
          <Map results={results} navigation={props.navigation} />
        </View>

        <View style={styles.list}>
          <ScrollView>
            <ResultsList
              results={filterResultsByPrice("$")}
              title="Cost Effective $"
              navigation={props.navigation}
            />
            <ResultsList
              results={filterResultsByPrice("$$")}
              title="A Bit Pricier $$"
              navigation={props.navigation}
            />
            <ResultsList
              results={filterResultsByPrice("$$$")}
              title="Premium Casual $$$"
              navigation={props.navigation}
            />
            <ResultsList
              results={filterResultsByPrice("$$$$")}
              title="Fine Dining $$$$"
              navigation={props.navigation}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "50%",
    width: "100%",
  },
  list: {
    height: "50%",
    width: "100%",
  },
});

export default SearchScreen;
