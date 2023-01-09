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

import Art_Intro2 from "../Images/Art_Intro2";
import Art_LightTop from "../Images/Art_LightTop";
import V3InputField from '../Components/V3InputField';

export default function Signup2(props) {
	const [_h, set_h] = useState(Dimensions.get("window").height);
	const [_w, set_w] = useState(Dimensions.get("window").width);

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")

	const createAccount = () =>
	{
		axios.post("customer/create/",{
			"name": fullName,
			"email": email,
			"password": password,
			"city": city,
			"region": country
		}).then(resp=>{
			console.log(resp.data)
			if(resp.status == 200){
				setPageIndex(4)
			}
		}).catch(err=>{
			alert(err.message)
		})
	}

	const [flowIndex, setFlowIndex] = useState(0)
	const [pageIndex, setPageIndex] = useState(0)

	const TxtBtn = (props) =>
	{
		return (
			<TouchableOpacity onPress={()=>{props.trigger()}} style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
				<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 20}, t.textWhite]}>{props.title}</Text>
				<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 16}, t.textWhite]}>{props.value}</Text>
			</TouchableOpacity>
		)
	}

	const [errTxt, setErrTxt] = useState("")

	const inner = () =>
	{
		if(pageIndex == 0)
		{
			return (
				<ScrollView>
					<Animatable.View animation={(flowIndex <= 1) ? "fadeInLeft" : "fadeOutUp"} style={[t.z0]} onAnimationEnd={()=>{((flowIndex > 1) ? setPageIndex(1) : {})}}>
						<View style={[t.top0, t.left0]}>
							<Art_Intro2 />
							<Text style={[t.textWhite, {fontFamily: "Kodchasan_semiBold", fontSize: 32}, t.mL4, t.mT12, t.z10, t.absolute]}>Sign up</Text>
						</View>
					</Animatable.View>
	
					<Animatable.View animation={(flowIndex <= 1) ? "" : "fadeOutLeft"} delay={800}>
						<SafeAreaView style={[t.z20, t.wFull, t.hFull]}>
							<Text style={[t.selfCenter, {fontFamily: "Kodchasan_semiBold", fontSize: 12, color: "#FF0000"}]}>{errTxt}</Text>
							{(flowIndex == 0) ?
								<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
									<V3InputField txt={fullName} val={(e)=>{setFullName(e)}} delay={400} title="Full name" placeholder="full-name" icon={(<Ionicons name="person-outline" size={18} color="#00000080" />)} />
									<V3InputField txt={email} val={(e)=>{setEmail(e)}} delay={800} title="Email" placeholder="e-mail" icon={(<Feather name="mail" size={18} color="#00000080" />)}/>
								</View>:<></>
							}
							{(flowIndex > 0) ?
								<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
									<V3InputField pass={true} txt={password} val={(e)=>{setPassword(e)}} delay={400} title="Password" placeholder="password" 			icon={(<Ionicons name="ios-keypad-outline" size={18} color="black" />)} />
									<V3InputField pass={true} txt={repeatPassword} val={(e)=>{setRepeatPassword(e)}} delay={800} title="Repeat password" placeholder="password"	icon={(<Ionicons name="ios-keypad-outline" size={18} color="black" />)}/>
								</View>:<></>
							}
							<Animatable.View style={[t.wFull, t.pX16, t.pY3, t.flex, t.flexRow, t.justifyEnd]} animation={(flowIndex <= 1) ? "fadeInLeft" : "fadeOutLeft"} delay={1000} duration={1800}>
								{(flowIndex > 0) ?
								<TouchableOpacity onPress={()=>{setFlowIndex(flowIndex - 1)}} style={[{width: 50, height: 50, backgroundColor: "#3E3E3E"}, t.roundedFull, t.itemsCenter, t.justifyCenter, t.mR2]}>
									<AntDesign name="arrowleft" size={24} color="white" />
								</TouchableOpacity>:<></>
								}
	
								<TouchableOpacity onPress={()=>{
									if(fullName == "" || email == ""){setErrTxt("Missing fields")}
									else if(!email.includes("@")){setErrTxt("Invalid email")}
									else if(password != repeatPassword && flowIndex != 0){setErrTxt("Repeat password doesn't match")}
									else{setFlowIndex(flowIndex + 1); setErrTxt("")}
								}} style={[{width: 50, height: 50, backgroundColor: "#3E3E3E"}, t.roundedFull, t.itemsCenter, t.justifyCenter]}>
									<AntDesign name="arrowright" size={24} color="white" />
								</TouchableOpacity>
							</Animatable.View>
	
						</SafeAreaView>
					</Animatable.View>
				</ScrollView>
			)
		}
		else if (pageIndex == 1)
		{
			return(
				<Animatable.View animation={(pageIndex == 1) ? "fadeInDown" : "fadeOutUp"} style={[t.z10, {width: _w, height: _h}, t.pX4, t.itemsCenter, t.justifyCenter]} delay={(pageIndex > 1) ? 7000 : 0}
				onAnimationEnd={()=>{
					setInterval(()=>{
						setPageIndex(2)
					}, 7000)
				}}>
					<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 16}, t.textWhite, t.textCenter]}>
						If your country or city is not included in the list,
						that means that no store or company uses this app in your area.
						Contact them and ask them to apply for an account.
					</Text>
				</Animatable.View>
			)
		}
		else if (pageIndex == 2)
		{
			/* style={[{backgroundColor: "#323232"}]} */
			return(
				<ScrollView>
					<Animatable.View animation={(pageIndex == 2) ? "fadeInDown" : "fadeOutUp"} style={[t.z10]} delay={(pageIndex > 2) ? 800 : 0}>
						<View style={[t.top0, t.left0]}>
							<Art_LightTop />
							<Text style={[t.textWhite, {fontFamily: "Kodchasan_semiBold", fontSize: 32, color: "#323232"}, t.mL4, t.mT12, t.z10, t.absolute]}>Sign up</Text>
						</View>
					</Animatable.View>

					<Animatable.View animation={(pageIndex == 2) ? "fadeInLeft" : "fadeOutRight"}>
						<SafeAreaView style={[t.z20, t.wFull, t.hFull]}>
							<TxtBtn trigger={()=>{setIsSelectCountry(true)}} title="Select country" value={country} />
							<TxtBtn title="Select city" value={city} trigger={()=>{setIsSelectCity(true)}} />
							<View style={[t.wFull, t.itemsEnd, t.justifyCenter, t.pX16, t.pY8]}>
								<TouchableOpacity style={[{width: 50, height: 50, backgroundColor: "#FFFFFF"}
								, t.roundedFull, t.itemsCenter, t.justifyCenter]} onPress={()=>{createAccount(); setPageIndex(3)}}>
									<AntDesign name="arrowright" size={24} color="#323232" />
								</TouchableOpacity>
							</View>
						</SafeAreaView>
					</Animatable.View>
				</ScrollView>
			)
		}else if(pageIndex == 3)
		{
			return(
				<SafeAreaView style={[t.itemsCenter, t.hFull, t.wFull]}>
					<AnimatedLoader
						visible={true}
						overlayColor={"#323232"}
						animationStyle={{height: _h, width: _w}}
						source={{uri: "https://assets10.lottiefiles.com/private_files/lf30_ykdoon9j.json"}}
						loop={true}
						speed={1}/>
				</SafeAreaView>
			)
		}
		else if (pageIndex == 4){
			return(
				<Animatable.View animation={"fadeInUp"} style={[t.z10, {width: _w, height: _h}, t.pX4, t.itemsCenter, t.justifyCenter]}
				onAnimationEnd={()=>{
					setInterval(()=>{
						props.navigation.navigate("Signin")
					}, 800)
				}}>
					<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 16}, t.textWhite, t.textCenter]}>
						Account has been created
					</Text>
				</Animatable.View>
			)
		}
	}

	const [isSelectCountry, setIsSelectCountry] = useState(false)
	const [isSelectCity, setIsSelectCity] = useState(false)

	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])

	const getCountries = () =>{
		axios.get("utils/countries")
		.then(resp=>{
			console.log(resp.data);
			setCountries(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const getCities = () =>{
		axios.get("utils/cities")
		.then(resp=>{
			console.log(resp.data);
			setCities(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	useEffect(()=>{
		getCountries()
		getCities()
	},[])

	const [country, setCountry] = useState("")
	const [city, setCity] = useState("")

	const listCountries = () =>
	{
		const ret = countries.map((i,key)=>(
			<TouchableOpacity onPress={()=>{setCountry(i); setIsSelectCountry(false)}} style={[t.bgWhite, t.wFull]}>
				<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 24, color: "#323232"}]}>{i}</Text>
			</TouchableOpacity>
		))

		return(
			<ScrollView style={[t.pY8]}>
				{ret}
			</ScrollView>
		)
	}

	const listCities = () =>
	{
		const ret = cities.map((i,key)=>(
			<TouchableOpacity onPress={()=>{setCity(i); setIsSelectCity(false)}} style={[t.bgWhite, t.wFull]}>
				<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 24, color: "#323232"}]}>{i}</Text>
			</TouchableOpacity>
		))

		return(
			<ScrollView style={[t.pY8]}>
				{ret}
			</ScrollView>
		)
	}

	return (
		<View style={[{backgroundColor: (pageIndex >= 1) ? "#323232" : "#FFFFFF"}, t.wFull, t.hFull]}>
			{
				(isSelectCountry)?
				<Animatable.View animation="fadeInUp" style={[{width: _w, height: parseInt((_h / 5) * 3), borderTopLeftRadius: 40, borderTopRightRadius: 40,
				shadowColor: 'rgba(0, 0, 0, 0.8)',
				shadowOffset: {width: 0, height: -2},
				shadowRadius: 8,
				elevation: 5,
				}, t.bgWhite, t.z40, t.absolute, t.bottom0, t.itemsCenter, t.pY4]}>
					<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 20, color: "#323232"}]}>Select Country</Text>
					{listCountries()}
				</Animatable.View> : <></>
			}
			{
				(isSelectCity)?
				<Animatable.View animation="fadeInUp" style={[{width: _w, height: parseInt((_h / 5) * 3), borderTopLeftRadius: 40, borderTopRightRadius: 40,
				shadowColor: 'rgba(0, 0, 0, 0.8)',
				shadowOffset: {width: 0, height: -2},
				shadowRadius: 8,
				elevation: 5,
				}, t.bgWhite, t.z40, t.absolute, t.bottom0, t.itemsCenter, t.pY4]}>
					<Text style={[{fontFamily: "Kodchasan_regular", fontSize: 20, color: "#323232"}]}>Select City</Text>
					{listCities()}
				</Animatable.View> : <></>
			}
			{inner()}
		</View>
	)
}