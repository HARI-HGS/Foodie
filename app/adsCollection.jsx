import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const SlidePriceCalculator = () => {
  const [slide, setSlide] = useState('');
  const [days, setDays] = useState('');
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [slidePrice, setSlidePrice] = useState(0);
  const router = useRouter();

  const slidePrices = {
    "First Slide": 20,
    "Second Slide": 15,
    "Third Slide": 10,
    "Fourth Slide": 5,
  };

  const calculateTotal = () => {
    const price = slidePrices[slide];
    const totalDays = parseInt(days, 10);
    if (price && totalDays) {
      setSlidePrice(price);
      setTotal(price + totalDays);
      setModalVisible(true);
    } else {
      alert('Please enter valid slide and days');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slideDetails}>
        <Text style={styles.heading}>Slide price details</Text>
        <Text style={styles.slideText}>First Slide @20</Text>
        <Text style={styles.slideText}>Second Slide @15</Text>
        <Text style={styles.slideText}>Third Slide @10</Text>
        <Text style={styles.slideText}>Fourth Slide @05</Text>
        <Text style={styles.note}>All Slides will display 1 rs / per day</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeading}>Details</Text>
        <Text>Slide:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={slide}
            onValueChange={(itemValue) => setSlide(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choose Slide" value="" />
            <Picker.Item label="First Slide" value="First Slide" />
            <Picker.Item label="Second Slide" value="Second Slide" />
            <Picker.Item label="Third Slide" value="Third Slide" />
            <Picker.Item label="Fourth Slide" value="Fourth Slide" />
          </Picker>
        </View>
        <Text>How many Days:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter days"
          keyboardType="numeric"
          value={days}
          onChangeText={setDays}
        />
        <TouchableOpacity style={styles.calculateButton} onPress={calculateTotal}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Slide price: {slidePrice}</Text>
            <Text style={styles.modalText}>Total days: {days}</Text>
            <Text style={styles.modalText}>Total: {total}</Text>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  slideDetails: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slideText: {
    fontSize: 18,
  },
  note: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  detailsContainer: {
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  detailsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  calculateButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
});

export default SlidePriceCalculator;
