import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as Animatable from "react-native-animatable";
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
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import Search from '../Components/Search';

export default function Home2(props) {

	const RectBtnLg = (props) =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1500} delay={1000}>
				<TouchableOpacity style={[{height: 130, width: 130, marginHorizontal: 5, borderRadius: 10}, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mY2, 
				{
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffset: {width: 0, height: 0},
					shadowRadius: 8,
					elevation: 4,
				}]} onPress={()=>{}}>
					<Image style={[t.hFull, t.wFull, {borderRadius: 10}]} source={{uri: props.bg}} />
					<Image style={[{height: 80, width: 80}, t.absolute, t.roundedFull, t.bgWhite]} 
					source={{uri: props.front}} />
				</TouchableOpacity>
			</Animatable.View>
		)
	}

	const RectPillBtn = (props) =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1000} delay={1800}>
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
			</Animatable.View>
		)
	}

	const RectBtnMd = () =>
	{
		return(
			<Animatable.View animation="fadeInRight" duration={1500} delay={2000}>
				<TouchableOpacity style={[{height: 100, width: 210, marginHorizontal: 5, marginVertical: 10, borderRadius: 10}, t.bgWhite, t.flex, t.flexRow, 
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
			</Animatable.View>
		)
	}

	return (
		<SafeAreaView style={[{backgroundColor: "#F6F6F6"}, t.flex, t.flexCol, t.wFull]}>
			
			<BlurView intensity={90} tint="light" style={[t.wFull, {height: 90}, t.absolute, t.bottom0, t.z40, {backgroundColor: "#ffffffe6"}, t.flex, t.flexRow, t.itemsCenter, t.justifyEvenly]}>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{}}>
					<Octicons name="home" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{}}>
					<MaterialCommunityIcons name="post-outline" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Posts</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{}}>
					<AntDesign name="staro" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[t.flex, t.flexCol, t.itemsCenter]} onPress={()=>{}}>
					<Ionicons name="person-outline" size={24} color="black" />
					<Text style={[{fontFamily: "Kodchasan_light"}]}>Profile</Text>
				</TouchableOpacity>
			</BlurView>

			<ScrollView style={[{paddingBottom: 90}]}>
				<Animatable.Text style={[{fontFamily: "Kodchasan_semiBold", fontSize: 24, marginTop: 40, marginLeft: 20}]} animation="fadeInLeft">
					Where would you like{"\n"}to shop today
				</Animatable.Text>
				
				<Animatable.View animation="fadeInUp" duration={1500}>
					<Search placeholder="Search"/>
					<TouchableOpacity><Text style={[{fontFamily: "Kodchasan_light", fontSize: 14}, t.selfEnd, t.mR10]}>Change city</Text></TouchableOpacity>
				</Animatable.View>
				
				<Animatable.View animation="fadeInUp" duration={1500}>
					<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
					<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
						<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
							front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />

						<RectBtnLg bg="https://vernsglass.com/wp-content/uploads/2019/09/Commercial-Storefronts.jpg"
							front="https://images-platform.99static.com//6m2oEkLGOcAM-NspjIsGTF_x0do=/992x996:1866x1870/fit-in/500x500/projects-files/81/8156/815645/5513ffc1-e979-45e3-9684-6b725aa4df71.jpg" />

						<RectBtnLg bg="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmVmcm9udHxlbnwwfHwwfHw%3D&w=1000&q=80"
							front="https://www.logodesign.net/logo-new/basket-with-grocery-store-items-9065ld.png?industry=grocery-shop" />

						<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
							front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />
					</ScrollView>
				</Animatable.View>

				<Animatable.View animation="fadeInRight" duration={1500}>
					<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 30, marginLeft: 20}]}>Categories</Text>
					<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
						<RectPillBtn inner="All" />
						<RectPillBtn inner="Groceries" icon={(<MaterialIcons name="storefront" size={18} color="black" />)}/>
						<RectPillBtn inner="Restaurants" icon={(<Ionicons name="restaurant-outline" size={18} color="black" />)}/>
						<RectPillBtn inner="Electronics" icon={(<Ionicons name="phone-portrait-outline" size={18} color="black" />)} />
					</ScrollView>
				</Animatable.View>

				<Animatable.View animation="fadeInRight" duration={1500}>
					<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured posts</Text>
					<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5, marginTop: 10}]} horizontal={true} showsHorizontalScrollIndicator={false} >
						<RectBtnMd /><RectBtnMd /><RectBtnMd /><RectBtnMd />
					</ScrollView>
				</Animatable.View>

				<Text style={[{fontFamily: "Kodchasan_medium", fontSize: 16, marginTop: 20, marginLeft: 20}]}>Featured stores</Text>
				<ScrollView style={[t.wFull, t.flex, t.flexRow, {marginLeft: 5}]} horizontal={true} showsHorizontalScrollIndicator={false} >
					<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
						front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />

					<RectBtnLg bg="https://vernsglass.com/wp-content/uploads/2019/09/Commercial-Storefronts.jpg"
						front="https://images-platform.99static.com//6m2oEkLGOcAM-NspjIsGTF_x0do=/992x996:1866x1870/fit-in/500x500/projects-files/81/8156/815645/5513ffc1-e979-45e3-9684-6b725aa4df71.jpg" />

					<RectBtnLg bg="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmVmcm9udHxlbnwwfHwwfHw%3D&w=1000&q=80"
						front="https://www.logodesign.net/logo-new/basket-with-grocery-store-items-9065ld.png?industry=grocery-shop" />

					<RectBtnLg bg="https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg"
						front="https://t4.ftcdn.net/jpg/03/31/93/85/360_F_331938599_nmkc39B7E74s1G5P01b0YCJ6x0MNMqJz.jpg" />
				</ScrollView>

				<View style={[{height: 90}, t.itemsCenter, t.justifyCenter]} />
			</ScrollView>
		</SafeAreaView>
	)
}