import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as Animatable from "react-native-animatable";
import AnimatedLoader from 'react-native-animated-loader';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

import Art_DarkTop from "../Images/Art_DarkTop";
import V3InputField from '../Components/V3InputField';

export default function Signin2(props) {
	const [_h, set_h] = useState(Dimensions.get("window").height);
	const [_w, set_w] = useState(Dimensions.get("window").width);

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const signIn = () =>
	{
		axios.post("customer/signin/",{
			"email": email,
			"password": password
		}).then(resp=>{
			console.log(resp.data);
			props.updateSession()
			props.navigation.popToTop();
			props.navigation.replace("Home")
		}).catch(err=>{
			console.log(err.message);
			setErrTxt("Incorrect email or password")
		})
	}

	const [errTxt, setErrTxt] = useState("")

	return (
		<ScrollView>
			<Animatable.View animation={"fadeInLeft"} style={[t.z0]}>
				<View style={[t.top0, t.left0]}>
					<Art_DarkTop />
					<Text style={[t.textWhite, {fontFamily: "Kodchasan_semiBold", fontSize: 32}, t.mL4, t.mT12, t.z10, t.absolute]}>Sign in</Text>
				</View>
			</Animatable.View>

			<Animatable.View>
				<SafeAreaView style={[t.z20, t.wFull, t.hFull]}>
					<Text style={[t.selfCenter, {fontFamily: "Kodchasan_semiBold", fontSize: 12, color: "#FF0000"}]}>{errTxt}</Text>
					<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
						<V3InputField txt={email} val={(e)=>{setEmail(e)}} delay={400} title="Email" placeholder="e-mail" icon={(<Feather name="mail" size={18} color="#00000080" />)}/>
						<V3InputField txt={password} val={(e)=>{setPassword(e)}} delay={800} title="Password" placeholder="password" icon={(<Ionicons name="ios-keypad-outline" size={18} color="#00000080" />)} />
					</View>

					<Animatable.View style={[t.wFull, t.pX16, t.pY3, t.flex, t.flexRow, t.justifyEnd]} animation={"fadeInLeft"} delay={1000} duration={1800}>
						<TouchableOpacity onPress={()=>{
							if(email == "" || password == ""){setErrTxt("Missing fields")}
							else{signIn()}
						}} style={[{width: 50, height: 50, backgroundColor: "#3E3E3E"}, t.roundedFull, t.itemsCenter, t.justifyCenter]}>
							<AntDesign name="arrowright" size={24} color="white" />
						</TouchableOpacity>
					</Animatable.View>

				</SafeAreaView>
			</Animatable.View>
		</ScrollView>
	)
}