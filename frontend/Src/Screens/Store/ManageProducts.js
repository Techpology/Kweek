import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import Search from '../../Components/Search';

export default function ManageProducts(props) {
  return (
	<View style={[t.wFull, t.hFull]}>
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
		<View style={[t.wFull, t.pT24]}>
			<Search placeholder="search" />
		</View>
		<ScrollView style={[t.pX4, t.pT4]}>
			<WideImgBtn img="https://punjabgrossen.se/storage/90056518-xl1-20210120-540x600.jpg" inner="Caned spinach" />
		</ScrollView>

		<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB12, t.bottom0]}>
			<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
			{
				shadowColor: 'rgba(0, 0, 0, 0.4)',
				shadowOffset: {width: 0, height: 2},
				shadowRadius: 8,
				elevation: 5,
				height: 60,
				width: 60
			}]}>
				<AntDesign name="plus" size={32} color="black" />
			</TouchableOpacity>
		</View>
	</View>
  )
}