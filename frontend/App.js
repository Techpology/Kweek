import React,{useState, useEffect, useRef} from "react";
import {Text, View, Platform  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios"
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Intro from "./Src/Screens/IntroFlow/Intro";

import Signin from "./Src/Screens/Signin";
import Signin2 from "./Src/Screens/Signin2";
import Signup from "./Src/Screens/Signup";
import Signup2 from "./Src/Screens/Signup2";
import Home from "./Src/Screens/Home";
import Home2 from "./Src/Screens/Home2";
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
import ManagePost from "./Src/Screens/Store/ManagePost";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	}),
});

export default function App() {

	const [isFonts, setIsFonts] = useState(false)
	const loadFonts = async () =>
	{
		await Font.loadAsync({
			"Kodchasan_semiBold": require("./Src/fonts/Kodchasan/Kodchasan-SemiBold.ttf"),
			"Kodchasan_light": require("./Src/fonts/Kodchasan/Kodchasan-Light.ttf"),
			"Kodchasan_medium": require("./Src/fonts/Kodchasan/Kodchasan-Medium.ttf"),
			"Kodchasan_regular": require("./Src/fonts/Kodchasan/Kodchasan-Regular.ttf"),
		});
		setIsFonts(true);
	}

	/* const [fontsLoaded] = useFonts({
		"Kodchasan_semiBold": require("./Src/fonts/Kodchasan/Kodchasan-SemiBold.ttf"),
		"Kodchasan_light": require("./Src/fonts/Kodchasan/Kodchasan-Light.ttf"),
		"Kodchasan_medium": require("./Src/fonts/Kodchasan/Kodchasan-Medium.ttf"),
		"Kodchasan_regular": require("./Src/fonts/Kodchasan/Kodchasan-Regular.ttf"),
	}); */

	//axios.defaults.baseURL = 'http://192.168.1.189:8000/';
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

	registerForPushNotificationsAsync = async () =>
	{
		let token;
		if(Device.isDevice){
			const {status: existingStatus} = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if(existingStatus != 'granted')
			{
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if(finalStatus != 'granted')
			{
				alert("Failed to get push token for push notification");
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		}else{
			alert("Must use physical device for push notifications");
		}

		if(Platform.os == "android")
		{
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 0, 250],
				lightColor: "#FFFFFF"
			});
		}
		return token
	}

	useEffect(()=>{
		GetSession();
		loadFonts();
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
	},[])

	const setExpoPushToken = (x) =>
	{
		axios.post("customer/set/expo_notification_token/", {token: x})
		.then(resp=>{
			console.log(resp.data);
		}).catch(err=>{
			//alert("ERROR:" + err.data);
		})
	}

	return (
		<NavigationContainer>
			{(issession && isFonts) ?
				<Stack.Navigator initialRouteName={(showsession) ? "Home" : "Intro"} screenOptions={{ headerShown: false }}>
					<Stack.Screen  name="Home">
						{(props) => <Home2 {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Intro">
						{(props)=> <Intro {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signin">
						{(props)=> <Signin2 {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
					<Stack.Screen  name="Signup">
						{(props)=> <Signup2 {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
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
					<Stack.Screen  name="ManagePost">
						{(props)=> <ManagePost {...props} isSession={showsession} session={session} updateSession={()=>{GetSession()}} />}
					</Stack.Screen>
				</Stack.Navigator> : <></>
			}
		</NavigationContainer>
	);
}
