import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import { Entypo } from '@expo/vector-icons'; 

import Popup from '../Components/Popup'

export default function DropDown(props) {

	const [isPopup, setIsPopup] = useState(false);
	const [index, setIndex] = useState(0);

	return (
		<View>
			{(isPopup) ? 
				<View style={[t.wFull, {height: "100%"}, t.flex, t.itemsCenter, t.justifyCenter]}>
					<Popup title={props.popupTitle} pressOut={()=>{setIsPopup(false)}}>
						{props.children}
					</Popup> 
				</View>
			: <></>
			}
			<View style={[t.flex, t.flexCol, t.wFull, t.pX16, props.style]}>
				<Text style={[t.fontNormal, t.textXl]}>{props.title}</Text>
				<TouchableOpacity onPress={()=>{setIsPopup(true); props.close(()=>{setIsPopup(false)}); props.index((e)=>{setIndex(e)}) }}
					style={[t.wFull, t.bgWhite, t.itemsCenter, t.flex, t.flexRow, t.justifyBetween,
					{
						borderRadius: 8,
						height: 50,
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowOffset: {width: 0, height: 2},
						shadowRadius: 8,
						elevation: 4,
						paddingHorizontal: 12,
					}, t.pX4]}>
						<Text style={[{fontSize: 16}]}>{props.arr[index]}</Text>
						<Entypo name="chevron-thin-down" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	)
}