import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, Dimensions  } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { AntDesign } from '@expo/vector-icons'; 

import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

import Art_Intro from "../../Images/Art_Intro"
import Art_Intro2 from "../../Images/Art_Intro2"
import Art_Transition_1 from "../../Images/Art_Transition_1"
import LogoLight from "../../Images/LogoLight"

export default function Intro(props) {
	const [_h, set_h] = useState(Dimensions.get("window").height);
	const [_w, set_w] = useState(Dimensions.get("window").width);

	useEffect(()=>{
		setInterval(()=>{setFlowIndex(1)}, 3000)
	},[])

	const [flowIndex, setFlowIndex] = useState(1)
	const [flowCardIndex, setFlowCardIndex] = useState(0)

	const [isTransitionOut, setIsTransitionOut] = useState(false)

	const flow = () =>
	{
		switch (flowIndex) {
			case 0:
				return (
					<Animatable.View animation={"fadeOutUp"} delay={2000} >
						<Animatable.View animation="fadeInUp" style={[{height: _h, width: _w}, t.justifyCenter, t.itemsCenter, t.absolute]} duration={1200}>
							<LogoLight style={[t.mB40]} />
						</Animatable.View>
						<Animatable.View animation="fadeInUp" style={[{height: _h, width: _w}, t.justifyEnd]} duration={2000}>
							<Art_Intro />
						</Animatable.View>
					</Animatable.View>
				)
				break;
			case 1:
				return (
					<Animatable.View animation="fadeInDown" style={[{height: _h, width: _w}, t.justifyStart]} duration={1000}>
						<View style={[t.absolute, {top: -30}]}>
							<Art_Intro2 />
						</View>
						{flowCard()}
					</Animatable.View>
				)
				break;
		}
	}

	const flowCard = () => {
		let _inner = () => {
			switch (flowCardIndex) {
				case 0:
					return(
						<View style={[t.flex, t.flexCol, t.hFull, t.wFull, t.pT8]}>
							<View style={[t.flex, t.flexRow, t.w1_4, t.itemsCenter, t.justifyEvenly, t.selfCenter]}>
								<Animatable.View animation="fadeInLeft" style={[t.roundedFull, {width: 60, height: 8, backgroundColor: "#FE5E54"}]} />
								<View style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
								<View style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
							</View>
							<View style={[t.itemsCenter, t.mT2]}>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_medium", fontSize: 20, color: "#FE5E54"}]}>Access shops online</Animatable.Text>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_light", fontSize: 14, color: "#00000080"}, t.textCenter, t.mT4]}>
									Kweek provides access to order and shop{"\n"}through stores within your city for easier{"\n"}access to goods
								</Animatable.Text>
								<TouchableOpacity onPress={()=>{setFlowCardIndex(1)}}
									style={[{height: 60, width: 60, backgroundColor: "#FE5E54"}, t.roundedFull, t.mT8, t.itemsCenter, t.justifyCenter]}>
									<AntDesign name="arrowright" size={24} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					)
					break;
				case 1:
					return(
						<View style={[t.flex, t.flexCol, t.hFull, t.wFull, t.pT8]}>
							<View style={[t.flex, t.flexRow, t.w1_4, t.itemsCenter, t.justifyEvenly, t.selfCenter]}>
								<Animatable.View animation="fadeInLeft" delay={250} style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
								<Animatable.View animation="fadeInLeft" style={[t.roundedFull, {width: 60, height: 8, backgroundColor: "#FE5E54"}]} />
								<View style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
							</View>
							<View style={[t.itemsCenter, t.mT2]}>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_medium", fontSize: 20, color: "#FE5E54"}]}>Keep up to date with all sales</Animatable.Text>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_light", fontSize: 14, color: "#00000080"}, t.textCenter, t.mT4]}>
									We provide you with constant access to a{"\n"}platform reporting on the cheapest prices{"\n"}from all stores near you to get the best{"\n"}prices
								</Animatable.Text>
								<TouchableOpacity onPress={()=>{setFlowCardIndex(2)}}
									style={[{height: 60, width: 60, backgroundColor: "#FE5E54"}, t.roundedFull, t.mT8, t.itemsCenter, t.justifyCenter]}>
									<AntDesign name="arrowright" size={24} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					)
					break;
				case 2:
					return(
						<View style={[t.flex, t.flexCol, t.hFull, t.wFull, t.pT8]}>
							<View style={[t.flex, t.flexRow, t.w1_4, t.itemsCenter, t.justifyEvenly, t.selfCenter]}>
								<Animatable.View animation="fadeInLeft" delay={500} style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
								<Animatable.View animation="fadeInLeft" delay={250} style={[t.roundedFull, {width: 10, height: 8, backgroundColor: "#D9D9D9"}]} />
								<Animatable.View animation="fadeInLeft" style={[t.roundedFull, {width: 60, height: 8, backgroundColor: "#FE5E54"}]} />
							</View>
							<View style={[t.itemsCenter, t.mT2]}>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_medium", fontSize: 20, color: "#FE5E54"}]}>Sign up</Animatable.Text>
								<Animatable.Text animation="fadeInLeft" style={[{fontFamily: "Kodchasan_light", fontSize: 14, color: "#00000080"}, t.textCenter, t.mT4]}>
									Create an account to start surfing.
								</Animatable.Text>
								<Animatable.View animation="fadeInLeft">
									<TouchableOpacity onPress={()=>{props.navigation.navigate("Signin")}}>
										<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 14, color: "#FE5E54"}, t.textCenter]}>
											Already have an account?
										</Text>
									</TouchableOpacity>
								</Animatable.View>
								<TouchableOpacity onPress={()=>{props.navigation.navigate("Signup")}}
									style={[{height: 60, width: 60, backgroundColor: "#FE5E54"}, t.roundedFull, t.mT8, t.itemsCenter, t.justifyCenter]}>
									<AntDesign name="arrowright" size={24} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					)
					break;
			}
		}

		return(
			<Animatable.View animation="fadeInUp" 
				style={[t.bgWhite, t.wFull, {height: parseInt(_h/3)+40, borderTopLeftRadius: 43, borderTopRightRadius: 43}, t.absolute, t.bottom0, t.flex, t.flexCol,{
					shadowColor: 'rgba(0, 0, 0, 1)',
					shadowOffset: {width: 0, height: -4},
					shadowRadius: 8,
					elevation: 10,
				}]}>
				{_inner()}
			</Animatable.View>
		)

	}

	return (
		<SafeAreaView style={[{backgroundColor: "#FFFFFF"}]}>
			{flow()}
		</SafeAreaView>
	)
}