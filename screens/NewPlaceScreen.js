import React, { useState } from 'react';
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

const NewPlaceScreen = props => {

  const [titleValue, setTitleValue] = useState('')

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(titleValue));
    props.navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={titleChangeHandler}
          value={titleValue}
          style={styles.textInput}
        />
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
