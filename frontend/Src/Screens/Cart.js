import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { t } from "react-native-tailwindcss";
import axios from "axios";
import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import WideImgBtn from '../Components/WideImgBtn';

export default function Cart() {
  return (
	<View style={[t.wFull, t.hFull, {backgroundColor: "#F8F8F8"}]}>
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
		<View style={[t.absolute, t.right0, t.top0, t.mT16, t.mX6]}>
			<Text style={[t.textLg]}>Cart</Text>
		</View>

		<Text style={[t.textLg, t.mT32, t.mX8]}>Cart for: </Text>
		<ScrollView style={[ t.wFull, t.pX8]}>
			<WideImgBtn inner="test" />
		</ScrollView>
		<Text style={[t.textLg, t.mX8]}>Active orders</Text>
		<ScrollView style={[t.wFull, t.pX8]}>
		<WideImgBtn inner="test" />
		</ScrollView>
	</View>
  )
}