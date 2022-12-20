import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, SafeAreaViewBase } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import InputField from '../../Components/InputField';
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';

export default function AddProduct(props) {

	const [img, setImg] = useState("")
	const [name, setName] = useState("")
	const [ean, setEAN] = useState("")
	const [description, setDescription] = useState("")
	const [unit, setUnit] = useState(0)
	const [price, setPrice] = useState(0)

	return (
		<SafeAreaView>
			<View style={[t.hFull, t.wFull]}>
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
				<ScrollView>
					<View style={[t.flex, t.flexCol, t.itemsCenter, t.pT32]}>
						<TouchableOpacity style={[{backgroundColor: "#D9D9D980", height: 180, width: "85%"}, t.itemsCenter, t.justifyCenter, t.roundedLg]} onPress={()=>{}}>
							<Text style={[t.textXl, {color: "#00000080"}]}>Select image</Text>
						</TouchableOpacity>

						<InputField multi={false} title="Name" placeholder="name" style={[t.mT8]} />
						<InputField multi={false} title="EAN" placeholder="0000000000000" style={[t.mT8]} />
						<InputField multi={true} lines={8} title="Description" placeholder="description" style={[t.mT8]} _style={[t.h32]} />
						<Text style={[t.fontNormal, t.textXl, t.mT4, t.mB2]}>Unit</Text>
						<View style={[t.w4_5, t.h12, t.flex, t.flexRow, t.itemsCenter]}>
							<TouchableOpacity style={[t.w1_2, (unit == 0) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedLFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setUnit(0)}}>
								<Text style={[(unit == 0) ? t.textWhite: t.textBlack, t.textXl]}>St</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[t.w1_2, (unit == 1) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedRFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setUnit(1)}}>
								<Text style={[(unit == 1) ? t.textWhite: t.textBlack, t.textXl]}>Kg</Text>
							</TouchableOpacity>
						</View>
						<InputField multi={false} title="Price" placeholder="0.00kr" style={[t.mT8]} />
						<Btn inner="Done" style={[t.mY12]} />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}