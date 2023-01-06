import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as Animatable from "react-native-animatable";
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

export default function Signup2(props) {
	const [flowIndex, setFlowIndex] = useState(0)

	return (
		<ScrollView>
			<Animatable.View animation="fadeInLeft" style={[t.z0]}>
				<View style={[t.top0, t.left0]}>
					<Art_DarkTop />
					<Text style={[t.textWhite, {fontFamily: "Kodchasan_semiBold", fontSize: 32}, t.mL4, t.mT12, t.z10, t.absolute]}>Signup</Text>
				</View>
			</Animatable.View>

			<SafeAreaView style={[t.z20, t.wFull, t.hFull]}>
				<View style={[t.wFull, t.itemsCenter, t.justifyCenter]}>
					<V3InputField delay={400} title="Full name" placeholder="full-name" icon={(<Ionicons name="person-outline" size={18} color="#00000080" />)} />
					<V3InputField delay={800} title="Email" placeholder="e-mail"		icon={(<Feather name="mail" size={18} color="#00000080" />)}/>
				</View>
				
				<Animatable.View style={[t.wFull, t.pX16, t.pY3, t.flex, t.flexRow, t.justifyEnd]} animation="fadeInLeft" delay={1000} duration={1800}>
					{(flowIndex > 0) ?
					<TouchableOpacity style={[{width: 50, height: 50, backgroundColor: "#3E3E3E"}, t.roundedFull, t.itemsCenter, t.justifyCenter, t.mR2]}>
						<AntDesign name="arrowleft" size={24} color="white" />
					</TouchableOpacity>:<></>
					}

					<TouchableOpacity style={[{width: 50, height: 50, backgroundColor: "#3E3E3E"}, t.roundedFull, t.itemsCenter, t.justifyCenter]}>
						<AntDesign name="arrowright" size={24} color="white" />
					</TouchableOpacity>
				</Animatable.View>

			</SafeAreaView>
		</ScrollView>
	)
}