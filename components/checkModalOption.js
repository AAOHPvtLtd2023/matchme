import React, { useState, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
const { height } = Dimensions.get("window");

const SelectableList = ({ data, selectedOption, selectOption }) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "baseline",
      }}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, selectedOption === item && styles.selectedItem]}
          onPress={() => selectOption(item)}
        >
          <Text style={{ color: "black" }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SelectModal = memo(
  ({ isModalVisible, data, selectedOption, closeModal, selectOption, headingName }) => {
    return (
      <Modal
        isVisible={isModalVisible}
        style={{ justifyContent: "flex-end", margin: 0,backgroundColor: 'rgba(0, 0, 0, 0.7)', }}
        onBackdropPress={closeModal}
      >
        <View style={{ height: height * 0.35, }}>
          <BlurView intensity={0} style={{ height: "100%" }}>
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 20,
                height: "100%",
                borderTopLeftRadius:40,
                borderTopRightRadius:40,
                marginHorizontal:4
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, }}>
                <TouchableOpacity onPress={closeModal}><MaterialIcons name="cancel" size={26} color="black" /></TouchableOpacity>
              </View>
              <Text style={styles.selectedItemText}>
                {selectedOption
            ? `You Selected : ${selectedOption.value}`
                  : "No item selected"}
              </Text>
              <ScrollView style={{ height: "100%", width: "100%" }}>
                <SelectableList
                  data={data}
                  selectedOption={selectedOption}
                  selectOption={selectOption}
                />
              </ScrollView>
            </View>
          </BlurView>
        </View>
      </Modal>
    );
  }
);

const CheckModalOption = ({ headingName, data, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectOption = (item) => {
    setSelectedOption(item);
    onSelect(item.value); // Invoke the onSelect callback with the selected option value
    setModalVisible(false); // Remove this line to keep the modal open after selection
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={toggleModal} style={{width:'90%'}}>
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          // opacity:0.6,
        }}
      >
        <Text style={{color:'black',fontSize:16}}>
          {selectedOption ? selectedOption.label : "No item selected"}
        </Text>
        <SelectModal
          isModalVisible={isModalVisible}
          data={data}
          selectedOption={selectedOption}
          closeModal={closeModal}
          selectOption={selectOption}
          headingName={headingName}
        />
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  item: {
    height: 50,
    width: "auto",
    borderRadius: 40,
    // backgroundColor: "#413F42",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 8,
    borderWidth:2
  },
  selectedItem: {
    backgroundColor: "#7F8487",
  },
  selectedItemText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color:"black",
    fontSize:18,

  },
});

export default CheckModalOption;
