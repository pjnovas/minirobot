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
  const { scanner, scan, connect, disconnect } = props;

  const {
    checkingState,
    hasBT,
    scanning,
    devices,
    ready,
    connecting,
    active,
    error
  } = scanner;

  return (
    <View style={styles.layout}>
      { error &&
        <View>
          <Text>ERROR</Text>
          <Text>TYPE: {error.type}</Text>
          <Text>{error.data.message}</Text>
        </View>
      }

      { checkingState && <Text>Checking Bluetooth state ... </Text> }
      { !checkingState && !hasBT && <Text>Please Activate Bluetooth</Text> }

      { scanning && <Text>Scanning Devices ... </Text> }


      { !connecting && ready &&
        <TouchableOpacity onPress={scan} style={styles.button}>
          <Text>Scan Devices</Text>
        </TouchableOpacity>
      }

      { !connecting && devices && devices.length ?
        devices.map( device => {
          return (
            <TouchableOpacity key={device.id} onPress={() => connect(device)} style={styles.deviceItem}>
              <Text>{device.name} [{device.id}]</Text>
            </TouchableOpacity>
          );
        })
      : null }

      { connecting && <Text>Connecting ... </Text> }
      { active && <Text>Connected to {active.name} [{active.id}] </Text> }
      <TouchableOpacity onPress={disconnect} style={styles.button}>
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

Devices.propTypes = {
  scanner: PropTypes.shape({
    scanning: PropTypes.bool,
    devices: PropTypes.array,
    ready: PropTypes.bool
  }),
  scan: PropTypes.func,
  connect: PropTypes.func
};

export default Devices;
