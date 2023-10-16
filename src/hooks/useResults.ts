import { useEffect, useState } from "react";
import { Text } from "react-native";
import yelp from "../api/yelp";
import useSWR from "swr";
import { AnimatedRegion } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Category {
  alias: string;
  title: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  country: string;
  display_address: string[];
  state: string;
  zip_code: string;
}

export interface Business {
  alias: string;
  categories: Category[];
  coordinates: Coordinates;
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: Location;
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: string[];
  url: string;
}

export interface Center {
  latitude: number;
  longitude: number;
}

export interface Region {
  center: Center;
}

export interface Result {
  businesses: Business[];
  region: Region;
  total: number;
  price?: string;
  length?: number;
  id: string;
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
}

type UseResults = {
  searchApi: (
    searchTerm: string,
    searchLocation: string,
    searchSelected: string
  ) => Promise<void>;
  error?: Error | undefined;
  errorMessage?: string;
  results: Result[];
};

const fetcher = async (url: string) => {
  const response = await yelp.get(url);
  return response.data.businesses;
};

export const useResults = (): UseResults => {
  let searchSelected = "50";
  let searchTerm = "Food";
  let searchLocation = "Denver, CO";
  const [apiUrl, setApiUrl] = useState(
    `/search?limit=${searchSelected}&term=${searchTerm}&location=${searchLocation}`
  );

  const { data: results, error, mutate } = useSWR(apiUrl, fetcher);

  const errorMessage = error ? error.message : "";

  console.log(error);

  if (error) {
    {
      return error.message;
    }
  }

  const searchApi = async (
    searchTerm: string,
    searchLocation: string,
    searchSelected: string
  ) => {
    const url = `search?limit=${searchSelected}&term=${searchTerm}&location=${searchLocation}`;
    try {
      await AsyncStorage.setItem("searchTerm", searchTerm);
      await AsyncStorage.setItem("searchLocation", searchLocation);
      await AsyncStorage.setItem("searchSelected", searchSelected);

      const response = await fetcher(url);
      mutate(response, false);
    } catch (error) {
      console.log("Error storing data in AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const searchTerm = await AsyncStorage.getItem("searchTerm");
        const searchLocation = await AsyncStorage.getItem("searchLocation");
        const searchSelected = await AsyncStorage.getItem("searchSelected");

        if (searchTerm && searchLocation && searchSelected) {
          const newUrl = `/search?limit=${searchSelected}&term=${searchTerm}&location=${searchLocation}`;
          setApiUrl(newUrl);

          searchApi(searchTerm, searchLocation, searchSelected);
        }
        console.log(searchTerm, searchLocation, searchSelected);
      } catch (error) {
        console.log("Error retrieving data from AsyncStorage:", error);
      }
    };

    getStoredData();
  }, []);

  return {
    searchApi,
    results: results || [],
    error: errorMessage,
  };
};
