import React,{useState, useEffect} from "react";
import {Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"

import Signin from "./Src/Screens/Signin";
import Signup from "./Src/Screens/Signup";
import Home from "./Src/Screens/Home";
import Account from "./Src/Screens/Account";
import Cart from "./Src/Screens/Cart";

import ManageProducts from "./Src/Screens/Store/ManageProducts";
import BarScanner from "./Src/Screens/BarScanner";
import AddProduct from "./Src/Screens/Store/AddProduct";
import EditProduct from "./Src/Screens/Store/EditProduct";
import ManageStore from "./Src/Screens/Store/ManageStore";
import StorePage from "./Src/Screens/Store/StorePage";
import Orders from "./Src/Screens/Store/Orders";
import ScanOrder from "./Src/Screens/Store/ScanOrder";

const Stack = createNativeStackNavigator();

export default function App() {
	//axios.defaults.baseURL = 'http://192.168.1.190:8000/';
	axios.defaults.baseURL = 'http://94.237.33.77:8000/';

	const [session, setSession] = useState({})
	const [showsession, setShowSession] = useState(false)
	const [issession, setIsSession] = useState(false)

	const GetSession = () => {
		axios.get("customer/get/session")
		.then(resp=>{
			console.log(resp.data)
			if(resp.data != "0")
			{
				setShowSession(true)
			}
			setSession(resp.data)
			setIsSession(true)
		}).catch(err=>{
			alert(err.message)
		})
	}

	useEffect(()=>{
		GetSession()
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
	},[])

	return (
		<NavigationContainer>
			{(issession) ?
				<Stack.Navigator initialRouteName={(showsession) ? "Home" : "Signin"} screenOptions={{ headerShown: false }}>
					<Stack.Screen  name="Home">
						{(props) => <Home {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signin">
						{(props)=> <Signin {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signup">
						{(props)=> <Signup {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Account">
						{(props)=> <Account {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Cart">
						{(props)=> <Cart {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					
					<Stack.Screen  name="ManageProducts">
						{(props)=> <ManageProducts {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="BarScanner">
						{(props)=> <BarScanner {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="AddProduct">
						{(props)=> <AddProduct {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="EditProduct">
						{(props)=> <EditProduct {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="ManageStore">
						{(props)=> <ManageStore {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="StorePage">
						{(props)=> <StorePage {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Orders">
						{(props)=> <Orders {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="ScanOrder">
						{(props)=> <ScanOrder {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
				</Stack.Navigator> : <></>
			}
		</NavigationContainer>
	);
}
