import React,{useState, useEffect} from "react";
import {Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import Signin from "./Src/Screens/Signin";
import Signup from "./Src/Screens/Signup";
import Home from "./Src/Screens/Home";
import Account from "./Src/Screens/Account";
import BarScanner from "./Src/Screens/BarScanner";

import ManageProducts from "./Src/Screens/Store/ManageProducts";
import AddProduct from "./Src/Screens/Store/AddProduct";

const Stack = createNativeStackNavigator();

export default function App() {
	axios.defaults.baseURL = 'http://192.168.1.190:8000/';

	const [session, setSession] = useState({})
	const [issession, setIsSession] = useState(false)

	const GetSession = () => {
		axios.get("customer/get/session")
		.then(resp=>{
			console.log(resp.data)
			setSession(resp.data)
			setIsSession(true)
		}).catch(err=>{
			alert(err.message)
		})
	}

	useEffect(()=>{
		GetSession()
	},[])

	return (
		<NavigationContainer>
			{(issession) ?
				<Stack.Navigator initialRouteName={(issession) ? "Home" : "Signin"} screenOptions={{ headerShown: false }}>
					<Stack.Screen  name="Home">
						{(props) => <Home {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signin">
						{(props)=> <Signin {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signup">
						{(props)=> <Signup {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Account">
						{(props)=> <Account {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="BarScanner">
						{(props)=> <BarScanner {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					
					<Stack.Screen  name="ManageProducts">
						{(props)=> <ManageProducts {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="AddProduct">
						{(props)=> <AddProduct {...props} isSession={issession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
				</Stack.Navigator> : <></>
			}
		</NavigationContainer>
	);
}
