import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux'
import * as placesAction from '../store/places-action'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = props => {

  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text)
  }

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath)
  }

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  }

  const locationPickedHandler = useCallback(location => {
    console.log(location);
    setSelectedLocation(location)
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={titleChangeHandler}
          value={titleValue}
          style={styles.textInput}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Place'
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2

  }

});

export default NewPlaceScreen;
