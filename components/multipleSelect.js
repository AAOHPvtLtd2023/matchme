import React, { useState, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
const { height } = Dimensions.get("window");
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const SelectableList = ({ data, selectedOptions, toggleOption }) => {
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
          style={[styles.item, selectedOptions.includes(item) && styles.selectedItem]}
          onPress={() => toggleOption(item)}
        >
          <Text style={{ color: "black" }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SelectModal = memo(
  ({ isModalVisible, data, selectedOptions, closeModal, toggleOption, headingName }) => {

    return (
      <Modal
        isVisible={isModalVisible}
        style={{ justifyContent: "flex-end", margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}
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
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                marginHorizontal: 4
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, }}>
                <TouchableOpacity onPress={closeModal}><MaterialIcons name="cancel" size={26} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={closeModal}><AntDesign name="rightcircle" size={26} color="black" /></TouchableOpacity>
              </View>
              <Text style={styles.selectedItemText}>
                {selectedOptions.length > 0
                  ? `Your ${headingName}: ${selectedOptions.map(option => option.value).join(', ')}`
                  : "Please Select"}
              </Text>

              <ScrollView style={{ height: "100%", width: "100%" }}>
                <SelectableList
                  data={data}
                  selectedOptions={selectedOptions}
                  toggleOption={toggleOption}
                />
              </ScrollView>
            </View>
          </BlurView>
        </View>
      </Modal>
    );
  }
);

const MultiSelection = ({ headingName, data, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleOption = (item) => {
    const isItemSelected = selectedOptions.includes(item);

    // If deselecting this item would leave no options selected, prevent the deselection
    if (isItemSelected && selectedOptions.length === 1) {
      return;
    }

    if (selectedOptions.includes(item)) {
      setSelectedOptions(selectedOptions.filter(option => option !== item));
    } else {
      setSelectedOptions([...selectedOptions, item]);
    }
  };

  const closeModal = () => {
    const values = selectedOptions.map((e) => (e.value));
    onSelect(values);
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={toggleModal} style={{ width: '90%' }}>
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        {selectedOptions.length > 0 ? (
          <Text style={{ fontSize: 18, color: 'black' }}>
            {selectedOptions.map(option => option.label).join(', ')}
          </Text>
        ) : (
          <Text style={{ color: 'black' }}>
            Please Select atleast one {headingName}
          </Text>
        )}
        <SelectModal
          isModalVisible={isModalVisible}
          data={data}
          selectedOptions={selectedOptions}
          closeModal={closeModal}
          toggleOption={toggleOption}
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 8,
    borderWidth: 2
  },
  selectedItem: {
    backgroundColor: "#7F8487",
  },
  selectedItemText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    fontSize: 18,

  },
});

export default MultiSelection;
