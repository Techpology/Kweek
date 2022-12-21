import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, SafeAreaViewBase, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import WideImgBtn from '../../Components/WideImgBtn'
import InputField from '../../Components/InputField';
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';

export default function AddProduct(props) {

	const [vis, setVis] = useState(0)
	const [img, setImg] = useState(null)
	const [imgPath, setImgPath] = useState(null)
	const [imgExt, setImgExt] = useState(null)
	const [name, setName] = useState("")
	const [ean, setEAN] = useState("")
	const [description, setDescription] = useState("")
	const [unit, setUnit] = useState(0)
	const [price, setPrice] = useState(0)

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  base64: true,
		  quality: .5,
		});
	
		console.log(result);
	
		if (!result.canceled) {
			setImg(result.assets[0].base64);
			setImgPath(result.assets[0].uri);
			var _ext = result.assets[0].uri.split(".")
			setImgExt(_ext[_ext.length - 1])
		}
	};

	const addImg = () =>
	{
		axios.post("store/set/product/",{
			"visible": vis,
			"name": name,
			"description": description,
			"ean": ean,
			"unit": unit,
			"price": price,
			"img": img,
			"ext": imgExt
		}).then(resp=>{
			props.navigation.goBack()
		}).catch(err=>{
			alert(err.message)
		})
	}

	return (
		<SafeAreaView>
			<View style={[t.hFull, t.wFull]}>
				<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4, t.z30]}>
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
						<TouchableOpacity onPress={()=>{pickImage()}} style={[{backgroundColor: "#D9D9D980", height: 180, width: "85%"}, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
							<ImageBackground source={{uri: imgPath}} style={[t.wFull, t.hFull, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
								<Text style={[t.textXl, {color: "#00000080"}]}>Select image</Text>
							</ImageBackground>
						</TouchableOpacity>

						<View style={[t.w4_5, t.h12, t.flex, t.flexRow, t.itemsCenter, t.mT4]}>
							<TouchableOpacity style={[t.w1_2, (vis == 0) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedLFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setVis(0)}}>
								<Text style={[(vis == 0) ? t.textWhite: t.textBlack, t.textXl]}>Show in store</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[t.w1_2, (vis == 1) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedRFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setVis(1)}}>
								<Text style={[(vis == 1) ? t.textWhite: t.textBlack, t.textXl]}>Hide in store</Text>
							</TouchableOpacity>
						</View>

						<InputField val={(e)=>{setName(e)}} title="Name" placeholder="name" style={[t.mT8]} lines={1}/>
						<InputField val={(e)=>{setEAN(e)}} title="EAN" placeholder="0000000000000" style={[t.mT8]} lines={1}/>
						<InputField val={(e)=>{setDescription(e)}} title="Description" placeholder="description" style={[t.mT8]} _style={[t.h32]} lines={8}/>
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

						<InputField type="numeric" title="Price" placeholder="0.00" style={[t.mT8]} val={(e)=>{setPrice(e)}} lines={1}/>
						<Btn inner="Done" style={[t.mY12]} trigger={()=>{addImg()}} />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}