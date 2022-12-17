import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  axios.defaults.baseURL = 'http://192.168.1.190:8000/';
  
  axios.get("")
  .then(resp=>{
    alert(resp.data);
  }).catch(err=>{
    alert(err.message)
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
