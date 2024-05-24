import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
const { height, width } = Dimensions.get("window");
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckModalOption from "../components/checkModalOption.js";
import { options } from "../data/options.js";
import { Dropdown } from "react-native-element-dropdown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import HeightSelectorModal from '../components/numberInput.js';
import { WeightSelector } from "../components/numberInput.js";
import MultiSelection from "./multipleSelect.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./Loading.js";

export default function InputProfileScreen({ navigation }) {
  const [formData, setformData] = useState(
    {
      id: '',
      phoneNumber: '',
      name: '',
      age: '',
      gender: '',
      lookingFor: '',
      address: '',
      personHeight: '',
      personWeight: '',
      language: [],
      aboutme: '',
      surpriseThing: '',
      Zodiac: '',
      education: '',
      communicationStyle: '',
      loveStyle: '',
      personalityType: '',
      smoking: '',
      pets: '',
      drinking: '',
      workout: '',
      dietaryPreference: '',
      socialMedia: '',
      sleeping: '',
      intrests: []
    }
  );
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [age, setAge] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [fontsLoaded, fontError] = useFonts({
  //   'Inter-Black1': require('../assets/fonts/KINKIE__.ttf'),
  //   'Inter-Black2': require('../assets/fonts/LoveLight-Regular.ttf'),
  //   'Inter-Black3': require('../assets/fonts/Romanesco-Regular.ttf'),
  //   'Classic': require('../assets/fonts/ClassyFont.ttf'),
  // });

  // profile pic
  const pickImage = async (setImageFunction) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Image selection cancelled");
      } else if (!result.assets || result.assets.length === 0) {
        console.error("Error: Image result is invalid");
      } else {
        const selectedImages = result.assets
          .map((asset) => asset.uri)
          .slice(0, 3);
        setImageFunction(selectedImages);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const uploadMedia = async (images, imageCount) => {
    
  };

  // for gender select
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    handleChange('gender', gender);
  };

  // for set form data values
  const updateFormData = (field, selectedValue) => {
    setformData(prevState => ({
      ...prevState,
      [field]: selectedValue
    }));
  };
  const handleChange = (name, value) => {
    setformData({ ...formData, [name]: value });
  };

  // for age calculating
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
    const age = calculateAge(currentDate);
    setAge(age);
    setformData({
      ...formData,
      age: age
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const ageDiff = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    const calculatedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? ageDiff - 1 : ageDiff;

    return calculatedAge;
  };

  // Calculate 16 years ago date
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 16);


  // Get phone Number and id from User Tokenn
  useEffect(() => {
    const checkPhone = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const userPhone = await AsyncStorage.getItem('phone');
      if (userToken) {
        updateFormData('id', userToken);
      }
      if (userPhone) {
        updateFormData('phoneNumber', userPhone);
      }
     
    }
    checkPhone();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  // finally data entry on firebase
  const handleRegister = async () => {
    if (formData.id === '' || formData.phoneNumber === '') {
      Alert.alert("Something was wrong", " User not found. Please try again later ");
      return;
    }

    const isEmpty = (array) => {
      return array.length === 0;
    };

    if (isEmpty(images1)) {
      alert('Please Upload all photos');
      return;
    }
    if (isEmpty(images2)) {
      alert('Please Upload all photos');
      return;
    }
    if (isEmpty(images3)) {
      alert('Please Upload all photos');
      return;
    }


    const requiredFields = [
      { field: 'name', label: 'Name' },
      { field: 'gender', label: 'Gender' },
      { field: 'lookingFor', label: 'Looking For' },
      { field: 'address', label: 'Address' },
      { field: 'personHeight', label: 'Height' },
      { field: 'personWeight', label: 'Weight' },
      { field: 'aboutme', label: 'Bio' },
    ];
    const nullFields = requiredFields.filter(({ field }) => !formData[field]);

    if (nullFields.length > 0) {
      // If any required field is null, show an alert
      const fieldLabels = nullFields.map(({ label }) => label);
      Alert.alert(
        'Empty Fields',
        `Please fill in the following fields: ${fieldLabels.join(', ')}`,
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    if (formData.age <= 0) {
      setError(`${formData.age} is not a valid age`);
      return;
    }

    if (formData.language.length < 0) {
      Alert.alert(
        'Please selct atleast one Language',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    
    setLoading(true);
  }

  if (loading) {
    return(
      <LoadingScreen/>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        {/* <StatusBar
                barStyle="dark-content" // Change this to "light-content" if you prefer light text on dark background
                backgroundColor="transparent" // Change this to your desired color
                translucent={true} // Set to true to make the status bar transparent
                // hidden
            /> */}
        <LinearGradient
          colors={["#9169c1", "#fff", "#dfc8e4"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={Number[(0.1, 0.7)]}
        >

          <View style={{ display: 'flex', height: height * 0.05, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text></Text>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: '80%', width: width * 0.2, borderRadius: 20, marginRight: width * 0.035, borderColor: 'black', borderWidth: 1 }} onPress={handleRegister}>
              <Text style={{ color: 'black' }}>Save</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ height: "100%",marginTop:15 }}>
            <View
              style={{
                width: "100%",
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Image input */}
              <ScrollView horizontal={true}>
                <View style={{
                  height: height * 0.7, width: width * 0.9, flexDirection: 'column', marginRight: 20,
                  marginLeft: 20,
                }}>
                  <View
                    style={{
                      height: height * 0.5,
                      width: width * 0.9,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 10
                    }}
                  >

                    <TouchableOpacity
                      onPress={() => pickImage(setImages1)}
                      style={{
                        marginTop: height * 0.0001,
                        ...Platform.select({
                          ios: {
                            shadowColor: "rgba(0, 0, 0, 0.3)",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 4,
                          },
                          android: {
                            elevation: 30,
                            shadowColor: "white",
                          },
                        }),
                      }}
                    >

                      {images1.length > 0 ? (
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                          {images1.map((image, index) => (
                            <Image
                              key={index}
                              source={{ uri: image }}
                              style={{
                                width: width * 0.886,
                                height: height * 0.49,
                                borderRadius: 10,
                              }}
                            />
                          ))}
                        </View>
                      ) : (
                        <Image source={require('../assets/icons/addPhoto.png')} style={{ width: 80, height: 80, elevation: 5 }} />
                      )}

                    </TouchableOpacity>

                  </View>
                  {images1.length > 0 &&
                    <View style={{ display: 'flex', marginTop: height * 0.02, alignItems: 'center' }}>
                      <Text style={{ color: 'black' }}>Slide to upload more image</Text>
                      <AntDesign name="arrowright" size={24} color="black" style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </View>}
                </View>

                <View style={{
                  height: height * 0.7, width: width * 0.9, flexDirection: 'column', marginRight: 20,
                  marginLeft: 20,
                }}>
                  <View
                    style={{
                      height: height * 0.5,
                      width: width * 0.9,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => pickImage(setImages2)}
                      style={{
                        marginTop: height * 0.0001,
                        ...Platform.select({
                          ios: {
                            shadowColor: "rgba(0, 0, 0, 0.3)",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 4,
                          },
                          android: {
                            elevation: 30,
                            shadowColor: "white",
                          },
                        }),
                      }}
                    >
                      {images2.length > 0 ? (
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                          {images2.map((image, index) => (
                            <Image
                              key={index}
                              source={{ uri: image }}
                              style={{
                                width: width * 0.886,
                                height: height * 0.49,
                                borderRadius: 10,
                              }}
                            />
                          ))}
                        </View>
                      ) : (<Image source={require('../assets/icons/addPhoto.png')} style={{ width: 80, height: 80, elevation: 5 }} />
                      )}
                    </TouchableOpacity>

                  </View>
                  {images2.length > 0 &&
                    <View style={{ display: 'flex', marginTop: height * 0.01, alignItems: 'center' }}>
                      <Text style={{ color: 'black' }}>Slide to upload more image</Text>
                      <AntDesign name="arrowright" size={24} color="black" style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </View>}
                </View>


                <View
                  style={{
                    height: height * 0.5,
                    width: width * 0.9,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 20,
                    marginLeft: 20,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => pickImage(setImages3)}
                    style={{
                      marginTop: height * 0.0001,
                      ...Platform.select({
                        ios: {
                          shadowColor: "rgba(0, 0, 0, 0.3)",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.8,
                          shadowRadius: 4,
                        },
                        android: {
                          elevation: 30,
                          shadowColor: "white",
                        },
                      }),
                    }}
                  >
                    {images3.length > 0 ? (
                      <View style={{ display: 'flex', alignItems: 'center' }}>
                        {images3.map((image, index) => (
                          <Image
                            key={index}
                            source={{ uri: image }}
                            style={{
                              width: width * 0.886,
                              height: height * 0.49,
                              borderRadius: 10,
                            }}
                          />
                        ))}
                      </View>
                    ) : (
                      <Image source={require('../assets/icons/addPhoto.png')} style={{ width: 80, height: 80, elevation: 5 }} />
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {/* personal information */}
            <View style={PersonNamestyles.container}>
              <View style={PersonNamestyles.cardContainer}>
                {/* Name */}
                <View style={{ marginBottom: 2, width: '100%' }}>
                  <Text style={PersonNamestyles.title}>Enter Your Name*</Text>
                  <View style={Essentialsstyles.inputRow}>
                    <Ionicons name="person-sharp" size={24} color="black" />
                    <TextInput
                      placeholder="Share Your Name "
                      style={PersonNamestyles.input}
                      placeholderTextColor={"#979797"}
                      onChangeText={(value) => handleChange('name', value)}
                      value={formData.name}
                      maxLength={25}
                    />
                  </View>
                </View>

                {/* Age */}
                <View style={{ marginBottom: 2 }}>
                  <Text style={PersonNamestyles.title}>Enter Your Age*</Text>
                  <View style={Essentialsstyles.inputRow}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <AntDesign name="calendar" size={24} color="black" />
                      {showDatePicker && (
                        <DateTimePicker
                          testID="datePicker"
                          value={dateOfBirth}
                          mode="date"
                          is24Hour={true}
                          display="spinner"
                          onChange={handleDateChange}
                          maximumDate={minDate} // Setting maximum date
                          theme={{ backgroundColor: 'black', calendarTextColor: 'black', textDayFontFamily: 'monospace' }}

                        />
                      )}
                      <Text style={{ color: 'black', marginLeft: width * 0.01 }}>Your Age : </Text>
                      {age !== null && <Text style={{ color: 'black', marginLeft: width * 0.01, }}>{age} Years</Text>}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* gender */}
                <View style={PersonNamestyles.inputGen}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: "60%",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: "90%",
                        width: "30%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        borderRadius: 10,
                        borderWidth: 2,
                        backgroundColor:
                          selectedGender === "male"
                            ? "rgba(65, 65, 65, 0.708)"
                            : "rgba(65, 65, 65, 0.308)",
                        borderColor: selectedGender === "male"
                          ? "black"
                          : "rgba(255, 255, 255, 0.089)",
                      }}
                      onPress={() => handleGenderSelect("male")}
                    >
                      <Image
                        source={require("../assets/icons/male.png")}
                        style={{ height: 80, width: 80 }}
                      />

                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: "90%",
                        width: "30%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        borderRadius: 10,
                        borderWidth: 2,
                        backgroundColor:
                          selectedGender === "female"
                            ? "rgba(65, 65, 65, 0.708)"
                            : "rgba(65, 65, 65, 0.308)",
                        borderColor: selectedGender === "female"
                          ? "black"
                          : "rgba(255, 255, 255, 0.089)",
                      }}
                      onPress={() => handleGenderSelect("female")}
                    >
                      <Image
                        source={require("../assets/icons/woman.png")}
                        style={{ height: 80, width: 80 }}
                      />

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* //Lokking For// */}
            <View style={LokkingForstyles.container}>
              <View style={LokkingForstyles.cardContainer}>
                <Text style={LokkingForstyles.lookingForTitle}>
                  Looking For*
                </Text>
                <Dropdown
                  style={Dstyles.dropdown}
                  placeholderStyle={Dstyles.placeholderStyle}
                  selectedTextStyle={Dstyles.selectedTextStyle}
                  inputSearchStyle={Dstyles.inputSearchStyle}
                  iconStyle={Dstyles.iconStyle}
                  data={options.lookingFor}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  searchPlaceholder="Search..."
                  value={formData.lookingFor}
                  mode="modal"
                  onChange={(selectedValue) => updateFormData('lookingFor', selectedValue.value)}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={Dstyles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  maxSelect={1}
                />
              </View>
            </View>

            {/* //Essentials// */}
            <View style={Essentialsstyles.container}>
              <View style={Essentialsstyles.inputContainer}>
                <Text style={Essentialsstyles.title}>Essentials</Text>
                <View style={Essentialsstyles.inputGroup}>
                  {/* Address */}

                  <Text style={{
                    fontSize: 22, color: "black",
                    fontFamily: "Classic",
                    marginLeft: 5
                  }}
                  >City*</Text>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5,
                    borderBottomColor: "red",
                    marginBottom: 5,
                  }}>
                    <Entypo name="address" size={24} color="black" />
                    <TextInput
                      placeholder="Enter Your City"
                      style={PersonNamestyles.input}
                      placeholderTextColor={"#979797"}
                      onChangeText={(value) => handleChange('address', value)}
                      value={formData.address}
                    />
                  </View>

                  {/* Height */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                      marginLeft: 5
                    }}
                  >Height*
                  </Text>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5,
                    borderBottomColor: "red",
                    marginBottom: 5,
                  }}>
                    <MaterialCommunityIcons name="human-male-height" size={24} color="black" style={{ marginRight: 5, }} />
                    <HeightSelectorModal onSelect={(selectedValue) => updateFormData('personHeight', selectedValue)} />

                  </View>
                  {/* Weight */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                      marginLeft: 5
                    }}
                  >
                    Weight*
                  </Text>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5,
                    borderBottomColor: "red",
                    marginBottom: 5,
                  }}>
                    <FontAwesome5 name="weight" size={24} color="black" style={{ marginRight: 5, }} />
                    <WeightSelector onSelect={(selectedValue) => updateFormData('personWeight', selectedValue)} />

                  </View>
                  {/* Language */}
                  <Text style={{
                    fontSize: 22, color: "black", fontFamily: "Classic",
                  }}>Preferred Language*</Text>
                  <View style={Essentialsstyles.inputRow}>
                    <Entypo name="language" size={24} color="black" style={{ marginRight: 5, }} />
                    <MultiSelection
                      headingName={"Language"}
                      data={options.language}
                      onSelect={(selectedValue) => setformData({
                        ...formData,
                        language: selectedValue
                      })}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* About Me */}
            <View style={Suprisestyles.container}>
              <View style={Suprisestyles.absoluteContainer}>
                <View style={Suprisestyles.overlay}>
                  <Text style={Suprisestyles.label}>
                    Bio *
                  </Text>
                  <TextInput
                    placeholder="About me"
                    style={{ fontSize: 20, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 5,color:'black' }}
                    placeholderTextColor={"black"}
                    multiline
                    value={formData.aboutme}
                    onChangeText={(text) => handleChange('aboutme', text)}
                  />
                </View>
              </View>
            </View>

            {/* //Suprise things// */}
            <View style={Suprisestyles.container}>
              <View style={Suprisestyles.absoluteContainer}>
                <View style={Suprisestyles.overlay}>
                  <Text style={Suprisestyles.label}>
                    A Surprise thing about me is..
                  </Text>
                  <TextInput
                    placeholder="A Surprise thing about me is....."
                    style={Suprisestyles.input}
                    placeholderTextColor={"black"}
                    value={formData.surpriseThing}
                    onChangeText={(text) => handleChange('surpriseThing', text)}
                    maxLength={50}
                  />
                </View>
              </View>
            </View>

            {/* //Basics// */}
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <View style={styles.headersection}>
                  <MaterialCommunityIcons
                    name="label-multiple"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Basics</Text>
                </View>
                <View style={styles.contentGroup}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Zodiac
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="weather-night"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      headingName={"Zodiac"}
                      data={options.Zodiac}
                      onSelect={(selectedValue) => updateFormData('Zodiac', selectedValue)}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Education
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="book-education-outline"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      data={options.education}
                      onSelect={(selectedValue) => updateFormData('education', selectedValue)}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Communication Style
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="weather-night"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      data={options.communication}
                      onSelect={(selectedValue) => updateFormData('communicationStyle', selectedValue)}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Love Style
                  </Text>
                  <View style={Newstyles.row}>
                    <Entypo name="heart" size={20} color="black" />
                    <CheckModalOption
                      data={options.loveStyle}
                      onSelect={(selectedValue) => updateFormData('loveStyle', selectedValue)}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Personality Type
                  </Text>
                  <View style={Newstyles.row}>
                    <Ionicons name="extension-puzzle" size={20} color="black" />
                    <CheckModalOption
                      data={options.personalType}
                      onSelect={(selectedValue) => updateFormData('personalityType', selectedValue)}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* //Life Cycle// */}
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <View style={styles.headersection}>
                  <MaterialCommunityIcons
                    name="label-multiple"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Life Cycle</Text>
                </View>
                <View style={styles.contentGroup}>
                  {/* Pets */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Pets
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialIcons name="pets" size={20} color="black" />
                    <CheckModalOption
                      data={options.pets}
                      onSelect={(selectvalue) => updateFormData('pets', selectvalue)}
                    />
                  </View>
                  {/* Drinking */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Drinking
                  </Text>
                  <View style={Newstyles.row}>
                    <Entypo name="drink" size={20} color="black" />
                    <CheckModalOption
                      data={options.drinking}
                      onSelect={(selectedValue) => updateFormData('drinking', selectedValue)}
                    />
                  </View>
                  {/* Smoking */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Smoking
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="cigar"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      data={options.smoking}
                      onSelect={(selectedValue) => updateFormData('smoking', selectedValue)}
                    />
                  </View>

                  {/* Workout */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Workout
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="dumbbell"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      data={options.workout}
                      onSelect={(selectedValue) => updateFormData('workout', selectedValue)}
                    />
                  </View>

                  {/* Dietary Preference */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Dietary Preference
                  </Text>
                  <View style={Newstyles.row}>
                    <Ionicons name="fast-food" size={20} color="black" />
                    <CheckModalOption
                      data={options.dietaryPreference}
                      onSelect={(selectedValue) => updateFormData('dietaryPreference', selectedValue)}
                    />
                  </View>
                  {/* Social Media */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Social Media
                  </Text>
                  <View style={Newstyles.row}>
                    <Entypo name="email" size={20} color="black" />

                    <CheckModalOption
                      data={options.socialMedia}
                      onSelect={(selectedValue) => updateFormData('socialMedia', selectedValue)}
                    />
                  </View>
                  {/* Sleeping */}
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "Classic",
                    }}
                  >
                    Sleeping Habits
                  </Text>
                  <View style={Newstyles.row}>
                    <MaterialCommunityIcons
                      name="sleep"
                      size={20}
                      color="black"
                    />
                    <CheckModalOption
                      data={options.sleeping}
                      onSelect={(selectedValue) => updateFormData('sleeping', selectedValue)}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Intrests */}
            <View
              style={{
                flex: 1,
                marginTop: 5,
                alignItems: "center",
                justifyContent: 'center',
                marginBottom: height * 0.05,
              }}
            >
              <View
                style={{
                  width: "95%",
                  backgroundColor: "#fff",
                  opacity: 1,
                  justifyContent: "center",
                  borderRadius: 5,
                  height: "100%",
                  alignItems: "center",
                  borderWidth: 0.5,
                  // flex:1
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "Classic"
                  }}
                >
                  Intrests
                </Text>
                <View
                  style={{
                    display: "flex",
                    width: "95%",
                  }}
                >
                  <SectionedMultiSelect
                    items={options.intrests}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Select Your intrests..."
                    showDropDowns={true}
                    animateDropDowns={true}
                    showCancelButton={true}
                    readOnlyHeadings={true}
                    showRemoveAll={true}
                    modalAnimationType={"slide"}
                    IconRenderer={MaterialIcons}
                    maxSelect={5}
                    onSelectedItemsChange={(selectedValue) => setformData({
                      ...formData,
                      intrests: selectedValue
                    })}
                    selectedItems={formData.intrests}
                    styles={{
                      selectToggleText: {
                        color: 'white',
                      },
                      selectToggle: {
                        backgroundColor: '#333', // Change background color of select toggle button
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: height * 0.009,
                      },
                    }}
                  />
                </View>
              </View>
            </View>

          </ScrollView>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    borderRadius: 8,
    color: "#333", // Dark gray text color
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    borderRadius: 8,
    color: "#333", // Dark gray text color
    paddingRight: 30,
  },
});

// \\ Suprise Things //
const Suprisestyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    width: "100%",
    justifyContent: "center",
  },
  absoluteContainer: {
    width: "95%",
    height: "auto",
    backgroundColor: "green",
    borderRadius: 5,
    backgroundColor: "#fff",
    opacity: 0.7,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
  },
  inputContainer: {
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  label: {
    fontSize: 22,
    color: "black",
    marginBottom: 10,
    fontFamily: "Classic",
  },
  input: {
    fontSize: 22,
    color: "black",
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: 50,
    flexWrap: "wrap",
    marginBottom: 5,
    fontFamily: "Classic",
  },
});

// Essentials
const Essentialsstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  inputContainer: {
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.7,
    borderRadius: 5,
    padding: 10,
    borderWidth:0.5
  },
  title: {
    fontSize: 28,
    color: "black",
    // marginBottom: 10,
    fontFamily: "Classic",
    fontWeight: "600",
  },
  inputGroup: {
    // marginTop: 50,
    // backgroundColor: "green",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "red",
    marginBottom: 5,
    fontFamily: "Classic"
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    color: "black",
    flex: 1,
    fontFamily: "Classic",
  },

  language: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
});

const PersonNamestyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    height: 'auto'
  },
  cardContainer: {
    width: "95%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    opacity: 0.7,
    // justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth:0.5

  },
  title: {
    fontSize: 22,
    color: "black",
    marginBottom: 10,
    fontFamily: "Classic",
  },
  lookingForTitle: {
    fontSize: 15,
    fontStyle: "italic",
    color: "black",
    marginBottom: 5,
  },
  lookingForText: {
    fontSize: 25,
    color: "black",
  },
  inputGen: {
    width: "100%",
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    color: "black",
    flex: 1,
    fontFamily: "Classic",
  },
});
const LokkingForstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  cardContainer: {
    width: "95%",
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 5,
    opacity: 0.7,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 0.5,
  },
  lookingForTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "Classic",
  },
  lookingForText: {
    fontSize: 20,
    color: "black",
    fontFamily: "IClassic",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  cardContainer: {
    height: "100%",
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.7,
    borderRadius: 5,
    flexDirection: "column",
    overflow: "hidden",
    marginTop: 5,
    borderWidth: 0.5
  },
  headersection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 22,
    color: "black",
    marginLeft: 5,
  },
  contentGroup: {
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "red",
    alignItems: "center",
    height: height * 0.05,
  },
  input: {
    flexDirection: "row",
  },
});

const LifeCyclestyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    // height: height * 0.62,
  },
  cardContainer: {
    height: "100%",
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.7,
    borderRadius: 5,
    justifyContent: "center",
    // padding: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    color: "black",
    marginLeft: 5,
    fontFamily: "Classic",
  },
  inputRow: {
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderBottomColor: "red",
    marginBottom: 10,
    height: height * 0.07,
    backgroundColor: "green",
  },
  label: {
    fontSize: 25,
    color: "black",
    marginLeft: 5,
    fontFamily: "Classic",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "black",
    fontFamily: "IClassic",
  },
});

const Newstyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "red",
    opacity: 0.6,
  },
});

const Dstyles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: "auto",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    // backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});