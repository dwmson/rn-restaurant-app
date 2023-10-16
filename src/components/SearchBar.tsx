import React, { useState, FC } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  SelectList,
  SelectListProps,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

export interface SearchBarProps {
  location: string;
  onLocationChange: React.Dispatch<React.SetStateAction<string>>;
  onTermSubmit: React.Dispatch<React.SetStateAction<string | undefined>>;
  term: string;
  onTermChange: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: FC<SearchBarProps> = ({
  location,
  onLocationChange,
  onTermSubmit,
  term,
  onTermChange,
  setSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    { key: "10", value: 10 },
    { key: "20", value: 20 },
    { key: "30", value: 30 },
    { key: "40", value: 40 },
    { key: "50", value: 50 },
  ];

  return (
    <View>
      <View>
        <Pressable
          style={styles.backgroundStyle}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="search" style={styles.iconStyle} />
          <Text style={styles.inputTopStyle}>Search Restaurants</Text>
        </Pressable>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              style={styles.modalBackDrop}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modalBackgroundStyle}>
                    <Feather name="search" style={styles.modalIconStyle} />
                    <TextInput
                      style={styles.inputStyle}
                      autoCorrect={false}
                      placeholder="Restaurant name, category, etc."
                      placeholderTextColor="#999999"
                      value={term}
                      onChangeText={onTermChange}
                      onSubmitEditing={() => {
                        onTermSubmit(undefined);
                        setModalVisible(!modalVisible);
                      }}
                      clearButtonMode="always"
                    />
                  </View>
                  <View style={styles.modalBackgroundStyle}>
                    <Entypo
                      style={styles.modalIconLocation}
                      name="location-pin"
                      color="black"
                    />

                    <TextInput
                      style={styles.inputStyle}
                      autoCorrect={false}
                      placeholder="Near location"
                      placeholderTextColor="#999999"
                      value={location}
                      onChangeText={onLocationChange}
                      onSubmitEditing={() => {
                        onTermSubmit(undefined);
                        setModalVisible(!modalVisible);
                      }}
                      clearButtonMode="always"
                    />
                  </View>
                  <View style={styles.selectListContainer}>
                    <Text style={styles.selectListLabel}>
                      Number of Results:
                    </Text>
                    <SelectList
                      style={styles.selectList}
                      data={data}
                      setSelected={setSelected}
                      defaultOption={{ key: "50", value: 50 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    //backgroundColor: "#C5C6D0",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
  },
  modalBackgroundStyle: {
    marginTop: 5,
    //backgroundColor: "#ededed",
    height: 40,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  inputTopStyle: {
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
  },
  modalHeadingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  modalIconStyle: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  modalIconLocation: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: "75%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#b5d4ff",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalBackDrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },
  numberSelectStyle: {
    flex: 1,
    fontSize: 18,
  },
  selectListContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectListLabel: {
    marginRight: 10,
    fontSize: 18,
  },
  selectList: {
    flex: 1,
    fontSize: 18,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchBar;
