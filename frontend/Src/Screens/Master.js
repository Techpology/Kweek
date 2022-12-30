import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import Logo from "../Images/Logo"
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import SqBtn from '../Components/SqBtn'

export default function Master(props) {
  return (
	<View style={[{backgroundColor: "#F8F8F8"}, t.wFull, t.hFull]}>
		
		<View style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.wFull, t.mT8, t.pX8]}>
			{(props.top) ?
				<View style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.wFull]}>
					<Logo width={80} height={80} />
					<SqBtn trigger={()=>{props.sqTrigger()}} inner={(props.session["name"] != undefined) ? props.session["name"][0] : "?"} />
				</View>
				:
				props.topInner()
			}
		</View>

		<View style={[t.absolute, t.bottom0, t.wFull, t.z10]}>
			<TouchableOpacity style={[t.absolute, t.flex, t.itemsCenter, t.justifyCenter, t.bgWhite, t.p3, t.roundedFull, {bottom: 100}, t.z20, t.right0, t.mR4,
			{
				shadowColor: 'rgba(0, 0, 0, 0.4)',
				shadowOffset: {width: 0, height: 2},
				shadowRadius: 8,
				elevation: 4,
			}]} onPress={()=>{props.cartPress()}}>
				<Ionicons name="md-cart-outline" size={24} color="black" />
			</TouchableOpacity>
			<View style={[t.itemsCenter, t.flex, t.flexRow, t.justifyCenter, t.wFull, t.bottom0, t.absolute, t.pX8, t.bgWhite,
			{
				shadowColor: 'rgba(0, 0, 0, 0.4)',
				shadowOffset: {width: 0, height: 2},
				shadowRadius: 8,
				elevation: 4,
				height: 65
			}]}>
				<TouchableOpacity style={[t.roundedFull, t.absolute, {height: 60, width: 60}, t.bgWhite,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 2,
					bottom: 40
				}, t.itemsCenter, t.justifyCenter]} onPress={()=>{props.searchTrigger()}}>
					<Ionicons name="ios-search" size={24} color={(props.searchIC) ? "black" : "gray"} />
				</TouchableOpacity>
				<View style={[t.wFull, t.hFull, t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}>
					<TouchableOpacity onPress={()=>{props.navTrigger()}} style={[t.w2_5, t.itemsCenter, t.justifyCenter, t.hFull]}>
						<Entypo name="compass" size={28} color={(props.compassIC) ? "black" : "gray"} />
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{props.favTrigger()}} style={[t.w2_5, t.itemsCenter, t.justifyCenter, t.hFull]}>
						<Entypo name="star" size={28} color={(props.starIC) ? "black" : "gray"} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
		<View style={[t.wFull, t.hFull, t.pT18, t.z0]}>
			{props.children}
		</View>
	</View>
  )
}