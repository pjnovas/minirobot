import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  deviceItem: {
    marginTop: 10,
    backgroundColor: 'lightgray'
  }
});

const Devices = props => {
  const { display, move, disconnect } = props;

  return (
    <View style={styles.layout}>
      <TouchableOpacity onPress={() => display(0)} style={styles.button}>
        <Text>Display 0</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => display(1)} style={styles.button}>
        <Text>Display 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => move('forward', 150)} style={styles.button}>
        <Text>Move Forward</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => move('backward', 150)} style={styles.button}>
        <Text>Move Backward</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={disconnect} style={styles.button}>
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

Devices.propTypes = {
  display: PropTypes.func,
  move: PropTypes.func
};

export default Devices;
