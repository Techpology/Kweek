import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, SafeAreaViewBase, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import InputField from '../../Components/InputField';
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import DropDown from '../../Components/DropDown';
import Btn from '../../Components/Btn';

export default function EditProduct(props) {

	const { _prod } = props.route.params;

	const [isPopup, setIsPopup] = useState(false)
	const [categories, setCategories] = useState([])
	const [selectedCategories, setSelectedCategories] = useState(parseInt(_prod["category"]))

	const getCategories = () =>
	{
		axios.get("store/get/categories")
		.then(resp=>{
			console.log(resp.data);
			setCategories(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const listCategories = () =>
	{
		console.log(categories)
		console.log(categories.length)
		const ret = categories.map((i, key)=>
			<TouchableOpacity style={[t.wFull, t.pY2, t.pX4, t.mT4]} onPress={()=>{setSelectedCategories(key); console.log(key); setIsPopup(false)}}>
				<Text style={[t.textXl]}>{i}</Text>
			</TouchableOpacity>
		)
		return (
			<ScrollView style={[t.wFull, t.z30]}>
				{ret}
			</ScrollView>
		)
	}

	useEffect(()=>{
		getCategories();
		console.log(_prod)
	},[])

	const [vis, setVis] = useState(_prod["visible"])
	const [imgPath, setImgPath] = useState(_prod["img"])
	const [img, setImg] = useState(null)
	const [imgExt, setImgExt] = useState(null)
	const [name, setName] = useState(_prod["name"])
	const [category, setCategory] = useState(_prod["category"])
	const [ean, setEAN] = useState(_prod["ean"])
	const [description, setDescription] = useState(_prod["description"])
	const [unit, setUnit] = useState(_prod["unit"])
	const [price, setPrice] = useState(_prod["price"])

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

	const editProduct = () =>
	{
		axios.post("store/edit/product/",{
			"id": _prod["id"],
			"visible": vis,
			"name": name,
			"category": selectedCategories,
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
			{
				(isPopup) ?
				<Popup pressOut={()=>{setIsPopup(false)}}>
					<Text style={[t.selfCenter, t.text2xl]}>Categories</Text>
					{listCategories()}
				</Popup>
				:
				<></>
			}
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
							<ImageBackground source={{uri: axios.defaults.baseURL + imgPath}} style={[t.wFull, t.hFull, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
								<Text style={[t.textXl, {color: "#00000080"}]}>Select image</Text>
							</ImageBackground>
						</TouchableOpacity>

						<View style={[t.w4_5, t.h12, t.flex, t.flexRow, t.itemsCenter, t.mT4]}>
							<TouchableOpacity style={[t.w1_2, (vis == 1) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedLFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setVis(1)}}>
								<Text style={[(vis == 1) ? t.textWhite: t.textBlack, t.textXl]}>Show in store</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[t.w1_2, (vis == 0) ? {backgroundColor: "#55D967"} : t.bgWhite, t.roundedRFull, t.hFull,
							{
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowOffset: {width: 0, height: 2},
								shadowRadius: 8,
								elevation: 5,
							}, t.itemsCenter, t.justifyCenter]} onPress={()=>{setVis(0)}}>
								<Text style={[(vis == 0) ? t.textWhite: t.textBlack, t.textXl]}>Hide in store</Text>
							</TouchableOpacity>
						</View>

						<View style={[t.wFull]}>
							<View style={[t.flex, t.flexCol, t.wFull, t.pX16, t.mT6]}>
								<Text style={[t.fontNormal, t.textXl]}>Category</Text>
								<TouchableOpacity onPress={()=>{setIsPopup(true);}}
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
										{(categories.length != 0) ? <Text style={[{fontSize: 16}]}>{categories[selectedCategories]}</Text> : <></>}
										<Entypo name="chevron-thin-down" size={24} color="black" />
								</TouchableOpacity>
							</View>
						</View>

						<InputField _text={name} val={(e)=>{setName(e)}} title="Name" placeholder="name" style={[t.mT8]} lines={1}/>
						<InputField _text={ean} val={(e)=>{setEAN(e)}} title="EAN" placeholder="0000000000000" style={[t.mT8]} lines={1}/>
						<InputField _text={description} val={(e)=>{setDescription(e)}} title="Description" placeholder="description" style={[t.mT8]} _style={[t.h32]} lines={8}/>
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

						<InputField _text={price.toString()} type="numeric" title="Price" placeholder="0.00" style={[t.mT8]} val={(e)=>{setPrice(e)}} lines={1}/>
						<Btn inner="Done" style={[t.mY12]} trigger={()=>{editProduct()}} />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}