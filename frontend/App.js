import React,{useState, useEffect} from "react";
import {Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import Signin from "./Src/Screens/Signin";
import Signup from "./Src/Screens/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  axios.defaults.baseURL = 'http://192.168.1.190:8000/';

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Signin"	component={Signin}/>
				<Stack.Screen name="Signup"	component={Signup}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
