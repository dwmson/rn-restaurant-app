import React, { useState, useRef, FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { withNavigation } from "react-navigation";
import ResultsDetail from "../components/ResultsDetail";
import { ResultsListProps } from "./ResultsList";
import { Region } from "react-native-maps/lib/sharedTypes";

const Map: FC<ResultsListProps> = ({ navigation, results }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (results.length > 0) {
      const newRegion = {
        latitude: results[0].coordinates.latitude,
        longitude: results[0].coordinates.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  }, [results]);

  return (
    <View style={styles.container}>
      <MapView
        //provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 39.742043,
          longitude: -104.991531,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        region={region}
        ref={mapRef}
      >
        {results.map((result) => (
          <Marker
            key={result.id}
            coordinate={{
              latitude: result.coordinates.latitude,
              longitude: result.coordinates.longitude,
            }}
          >
            <Callout
              onPress={() => {
                console.log(result.id);
                try {
                  navigation.navigate("ResultsShow", { id: result.id });
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <View>
                <ResultsDetail result={result} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default withNavigation(Map);
