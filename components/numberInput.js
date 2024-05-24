import React, { useState, memo } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
const { height } = Dimensions.get("window");
import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const SelectModal = memo(
  ({ isModalVisible, closeModal, onChange }) => {
    const [selectedHeight, setSelectedHeight] = useState("160"); // Default height as string

    const handleScroll = (event) => {
      const position = Math.floor(event.nativeEvent.contentOffset.y / 30); // Assuming each item's height is 30
      setSelectedHeight((position + 100).toString()); // Starting height converted to string
    };

    const handleSelectHeight = (height) => {
      // Cap selected height at 275
      const cappedHeight = Math.min(height, 275);
      setSelectedHeight(cappedHeight.toString()); // Convert selected height to string
      closeModal(); // Close the modal after selecting the height
      onChange && onChange(cappedHeight.toString()); // Trigger the onChange callback if provided
    };


    return (
      <Modal
        isVisible={isModalVisible}
        style={{ justifyContent: "flex-end", margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}
        onBackdropPress={closeModal}
        animationType='slide'
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
                marginHorizontal: 4,
              }}
            >
              <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginHorizontal: 10,}}>
              <TouchableOpacity><MaterialIcons name="cancel" size={26} color="black" /></TouchableOpacity>
              
              <TouchableOpacity><AntDesign name="rightcircle" size={26} color="black" /></TouchableOpacity>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
              >
                {Array.from({ length: 176 }, (_, i) => ( // Change length to reflect maximum selectable height
                  <TouchableOpacity key={i} onPress={() => handleSelectHeight(i + 100)} >
                    <Text style={[styles.item, selectedHeight === (i + 100).toString() && styles.selectedItem]}>{(i + 100).toString()} cm</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </BlurView>
        </View>
      </Modal>
    );
  }
);

const HeightSelectorModal = ({ onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(null); // Change initialization to null

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChange = (height) => {
    setSelectedHeight(height);
    onSelect(height);
    toggleModal(); // Close the modal after selecting height
  };

  return (
    <TouchableOpacity onPress={toggleModal} style={{ width: '90%' }}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        {selectedHeight ? <Text style={{color:'black',fontSize:16}}>{selectedHeight} cm</Text> : <Text style={{color:'black',fontSize:16}}>Select Height</Text>}
        <SelectModal
          isModalVisible={isModalVisible}
          closeModal={toggleModal}
          onChange={handleChange}
        />
      </View>
    </TouchableOpacity>
  );
};

HeightSelectorModal.propTypes = {
  onSelect: PropTypes.func.isRequired, // Ensure onSelect is marked as required
};


const WeightSelectorModal = memo(
  ({ isModalVisible, closeModal, onChange }) => {
    const [selectedWeight, setSelectedWeight] = useState("50"); // Default weight as string

    const handleScroll = (event) => {
      const position = Math.floor(event.nativeEvent.contentOffset.y / 30); // Assuming each item's height is 30
      setSelectedWeight((position + 30).toString()); // Starting weight converted to string
    };

    const handleSelectWeight = (weight) => {
      // Cap selected weight at 150
      const cappedWeight = Math.min(weight, 150);
      setSelectedWeight(cappedWeight.toString()); // Convert selected weight to string
      closeModal(); // Close the modal after selecting the weight
      onChange && onChange(cappedWeight.toString()); // Trigger the onChange callback if provided
    };


    return (
      <Modal
        isVisible={isModalVisible}
        style={{ justifyContent: "flex-end", margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}
        onBackdropPress={closeModal}
        animationType='slide'
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
                marginHorizontal: 4,
              }}
            >
               <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginHorizontal: 10,}}>
              <TouchableOpacity><MaterialIcons name="cancel" size={26} color="black" /></TouchableOpacity>
              
              <TouchableOpacity><AntDesign name="rightcircle" size={26} color="black" /></TouchableOpacity>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
              >
                {Array.from({ length: 121 }, (_, i) => ( // Change length to reflect maximum selectable weight
                  <TouchableOpacity key={i} onPress={() => handleSelectWeight(i + 30)} >
                    <Text style={[styles.item, selectedWeight === (i + 30).toString() && styles.selectedItem]}>{(i + 30).toString()} kg</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </BlurView>
        </View>
      </Modal>
    );
  }
);

export const WeightSelector = ({ onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null); // Change initialization to null

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChange = (weight) => {
    setSelectedWeight(weight);
    onSelect(weight);
    toggleModal(); // Close the modal after selecting weight
  };

  return (
    <TouchableOpacity onPress={toggleModal} style={{ width: '90%' }}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        {selectedWeight ? <Text style={{color:'black',fontSize:16}}>{selectedWeight} kg</Text> : <Text style={{color:'black',fontSize:16}}>Select Weight</Text>}
        <WeightSelectorModal
          isModalVisible={isModalVisible}
          closeModal={toggleModal}
          onChange={handleChange}
        />
      </View>
    </TouchableOpacity>
  );
};

WeightSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // Ensure onSelect is marked as required
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  scrollView: {
    maxHeight: 600,
    // backgroundColor: 'red',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  selectButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    height: 40,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 10,
    marginHorizontal: 10,
    padding: 8,
    color:'black',
    borderWidth:0.5,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: "#7F8487",
  },
  selectedItemText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    fontSize: 18,
 
  },
});

export default HeightSelectorModal;
