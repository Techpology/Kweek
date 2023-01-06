import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { useFonts } from 'expo-font';
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import Search from '../Components/Search';

export default function Home2(props) {

	const RectBtnLg = () =>
	{
		return(
			<TouchableOpacity style={[{height: 130, width: 130, marginHorizontal: 5, borderRadius: 10}, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mY2, 
			{
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffset: {width: 0, height: 0},
				shadowRadius: 8,
				elevation: 4,
			}]} onPress={()=>{}}>
				<View style={[{height: 80, width: 80}, t.roundedFull, t.bgGray600]} />
			</TouchableOpacity>
		)
	}

	const RectPillBtn = (props) =>
	{
		return(
			<TouchableOpacity style={[{height: 35, marginHorizontal: 5}, t.mY2, t.pX6, t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, 
			{
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffset: {width: 0, height: 0},
				shadowRadius: 8,
				elevation: 4,
			}, t.flex, t.flexRow]} onPress={()=>{}}>
				{props.icon}
				<Text style={[{marginLeft: 4}]}>{props.inner}</Text>
			</TouchableOpacity>
		)
	}

	const RectBtnMd = () =>
	{
		return(
			<TouchableOpacity style={[{height: 100, width: 210, marginHorizontal: 5, borderRadius: 10}, t.bgWhite, t.flex, t.flexRow, 
			{
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffset: {width: 0, height: 0},
				shadowRadius: 8,
				elevation: 4,
			},
			t.itemsCenter, t.pX2,]} onPress={()=>{}}>
				<View style={[{height: 80, width: 80}, t.roundedLg, t.bgGray600]} />
				<View style={[t.hFull, t.itemsCenter, t.pY4, t.flex, t.flexCol]}>
					<Text style={[{fontFamily: "Kodchasan_light", fontSize: 14}]}>Title</Text>
					<View style={[t.pL3]}>
						<Text style={[{fontFamily: "Kodchasan_light", color: "#00000080", fontSize: 12}]}>Desc</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<SafeAreaView style={[{backgroundColor: "#F6F6F6"}, t.flex, t.flexCol, t.wFull]}>
			
			<BlurView intensity={110} tint="light" style={[t.wFull, {height: 90}, t.absolute, t.bottom0, t.z40, {backgroundColor: "#ffffffe6"}, t.flex, t.flexRow]}>
			</BlurView>

			<ScrollView>
				<Text style={[{fontFamily: "Kodchasan_semiBold", fontSize: 24, marginTop: 40, marginLeft: 20}]}>Where would you like{"\n"}to shop today</Text>
				
				<Search placeholder="Search"/>
				<TouchableOpacity><Text style={[{fontFamily: "Kodchasan_light", fontSize: 14}, t.selfEnd, t.mR10]}>Change city</Text></TouchableOpacity>
				
				<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
				<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
					<RectBtnLg /><RectBtnLg /><RectBtnLg /><RectBtnLg />
				</ScrollView>

				<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 30, marginLeft: 20}]}>Categories</Text>
				<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
					<RectPillBtn inner="All" />
					<RectPillBtn inner="Groceries" icon={(<MaterialIcons name="storefront" size={18} color="black" />)}/>
					<RectPillBtn inner="Restaurants" icon={(<Ionicons name="restaurant-outline" size={18} color="black" />)}/>
					<RectPillBtn inner="Electronics" icon={(<Ionicons name="phone-portrait-outline" size={18} color="black" />)} />
				</ScrollView>

				<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured posts</Text>
				<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5, marginTop: 10}]} horizontal={true} showsHorizontalScrollIndicator={false} >
					<RectBtnMd /><RectBtnMd /><RectBtnMd /><RectBtnMd />
				</ScrollView>

				<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
				<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
					<RectBtnLg /><RectBtnLg /><RectBtnLg /><RectBtnLg />
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	)
}