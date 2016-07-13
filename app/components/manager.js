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
  const { move, disconnect } = props;

  return (
    <View style={styles.layout}>
      <TouchableOpacity style={styles.button}
        onPressIn={() => move('forward', 50)} onPressOut={() => move('stop')} >
        <Text>Move Forward</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPressIn={() => move('backward', 50)} onPressOut={() => move('stop')} >
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
