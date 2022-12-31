import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { t } from "react-native-tailwindcss";
import axios from 'axios';
import Logo from "../Images/Logo";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import SqBtn from '../Components/SqBtn'
import Master from './Master'
import WideBtn from '../Components/WideBtn'

export default function Account(props) {

	const signOut = () =>
	{
		axios.get("customer/signout")
		.then(resp=>{
			props.updateSession()
			props.navigation.popToTop();
			props.navigation.replace("Signin")
		}).catch(err=>{
			console.log(err.message)
		})
	}

	return (
		<View style={[t.wFull, t.hFull, t.flex, t.flexCol, {backgroundColor: "#F8F8F8"}]}>
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4]}>
				<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<FontAwesome name="angle-left" size={32} color="black" />
				</TouchableOpacity>
			</View>
			<View style={[t.mT24, t.itemsCenter, t.flexCol, t.flex]}>
				<SqBtn inner={(props.session["name"] != undefined) ? props.session["name"][0] : "?"} style={[{width:120, height: 120}]} textStyle={[t.text5xl]} trigger={()=>{}} />
				{(props.session["store"] == 1) ?
					<TouchableOpacity onPress={()=>{props.navigation.navigate("StorePage", {id: props.session["store_id"]})}}>
						<Text style={[{color: "#0088B2"}, t.mT2]}>Go to store</Text>
					</TouchableOpacity> : <></>
				}
			</View>
			{(props.session["store"] == 1) ? 
				<View style={[t.flex, t.flexCol, t.itemsCenter, t.wFull, t.pX8, t.pT8]}>
					<WideBtn trigger={()=>{props.navigation.navigate("ManageProducts")}} inner="Manage Products" />
					<WideBtn trigger={()=>{props.navigation.navigate("ManageStore")}} inner="Manage Page" />
					<WideBtn trigger={()=>{props.navigation.navigate("ManagePost")}} inner="Manage posts" />
					<WideBtn trigger={()=>{props.navigation.navigate("Orders")}} inner="Orders" />
					<WideBtn trigger={()=>{props.navigation.navigate("ScanOrder")}} inner="Scan order" />
					<WideBtn inner="Sign out" style={[t.textRed600]} trigger={()=>{signOut()}} />
				</View>
				:
				<View style={[t.flex, t.flexCol, t.itemsCenter, t.wFull, t.pX12, t.pT16]}>
					<WideBtn inner="Sign out" style={[t.textRed600]} trigger={()=>{signOut()}} />
				</View>
			}
		</View>
	)
}