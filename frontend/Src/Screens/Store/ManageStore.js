import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
  } from 'react-native-safe-area-context';
  

import Btn from '../../Components/Btn';
import Popup from '../../Components/Popup';
import InputField from '../../Components/InputField';

export default function ManageStore(props) {
	const [pfpPath, setPfpPath] =useState("")
	const [pfp, setPfp] 		=useState("")
	const [pfpExt, setPfpExt]	=useState("")
	
	const pickPfp = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  base64: true,
		  quality: .5,
		});
	
		console.log(result);
	
		if (!result.canceled) {
			setPfp(result.assets[0].base64);
			setPfpPath(result.assets[0].uri);
			var _ext = result.assets[0].uri.split(".")
			setPfpExt(_ext[_ext.length - 1])
			setStorePfp(result.assets[0].base64, _ext[_ext.length - 1])
		}
	};

	const [bannerPath, setBannerPath]	=useState("")
	const [banner, setBanner]			=useState("")
	const [bannerExt, setBannerExt] 	=useState("")
	
	const pickBanner = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  base64: true,
		  quality: .5,
		});
	
		console.log(result);
	
		if (!result.canceled) {
			setBanner(result.assets[0].base64);
			setBannerPath(result.assets[0].uri);
			var _ext = result.assets[0].uri.split(".")
			setBannerExt(_ext[_ext.length - 1])
			setStoreBanner(result.assets[0].base64, _ext[_ext.length - 1])
		}
	};

	const setStorePfp = (a, b) =>
	{
		axios.post("store/set/pfp/", {"img": a, "ext": b})
		.then(resp=>{
			console.log(resp.data);
			props.updateSession();
			console.log(axios.defaults.baseURL + props.session["store_pfp"])
		}).catch(err=>{
			alert(err.message)
		})
	}

	const setStoreBanner = (a, b) =>
	{
		axios.post("store/set/banner/", {"img": a, "ext": b})
		.then(resp=>{
			console.log(resp.data);
			props.updateSession();
		}).catch(err=>{
			alert(err.message)
		})
	}

	const [categories, setCategories] = useState([])
	const [newCategoryName, setNewCategoryName] = useState("")
	const [categoryPopup, setCategoryPopup] = useState(false)

	const getCategories = () =>
	{
		axios.get("store/get/categories")
		.then(resp=>{
			console.log(resp.data)
			setCategories(resp.data)
		}).catch(err=>{
			alert(err.message)
		})
	}

	const delCategory = (x) =>
	{
		axios.post("store/del/category/", {"ind": x})
		.then(resp=>{
			console.log(resp.data);
			getCategories();
		}).catch(err=>{
			alert(err.message);
		})
	}

	const createCategory = () =>
	{
		axios.post("store/add/category/", {"name": newCategoryName})
		.then(resp=>{
			console.log(resp.data);
			getCategories();
			setCategoryPopup(false);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [editCategoryPopup, setEditCategoryPopup] = useState(false)
	const [editCategoryName, setEditCategoryName] = useState("")
	const [editCategoryIndex, setEditCategoryIndex] = useState(-1)

	const editCategory = () =>
	{
		axios.post("store/edit/category/", {"ind": editCategoryIndex, "val": editCategoryName})
		.then(resp=>{
			console.log(resp.data);
			getCategories();
			setEditCategoryPopup(false);
		}).catch(err=>{
			alert(err.message);
		})
	}

	useEffect(()=>{
		getCategories();
	},[])

	const listCategories = () =>
	{
		const ret = categories.map((i,key) =>
			<TouchableOpacity style={[t.wFull, t.bgWhite, t.pX3, t.pY5, t.roundedLg, t.mB2, t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]} onPress={()=>{setEditCategoryPopup(true); setEditCategoryName(i); setEditCategoryIndex(key);}}>
				<Text style={[{fontSize: 16}]}>{i}</Text>
				<TouchableOpacity style={[t.w1_6, t.absolute, t.right0, t.hFull, t.itemsCenter, t.justifyCenter]} onPress={()=>{delCategory(key)}}>
					<MaterialCommunityIcons name="window-close" size={24} color="black" />
				</TouchableOpacity>
			</TouchableOpacity>
		)

		return (
			<View style={[t.wFull, t.p3, {backgroundColor:"#9e9e9e20"}, t.roundedLg]}>
				{ret}
			</View>
		)
	}


	return (
		<SafeAreaView style={[t.hFull, t.wFull]}>
			{
				(categoryPopup) ?
				<Popup pressOut={()=>{setCategoryPopup(false)}}>
					<ScrollView>
						<Text style={[t.text2xl, t.selfCenter]}>Create category</Text>
						<View style={[t.wFull, t.itemsCenter, t.justifyCenter, t.flex, t.flexCol]}>
							<InputField _style={[{backgroundColor: "#00000010"}]} placeholder="category name" title="Category name" style={[t.mT6]} val={(e)=>{setNewCategoryName(e)}}/>
							<View style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.wFull, t.mT8, t.pX10]}>
								<Btn inner="Cancel" style={[t.h10, t.w24, t.selfEnd, t.mY2]} _style={[t.textSm]} trigger={()=>{setCategoryPopup(false)}} />
								<Btn inner="Create" style={[t.h10, t.w24, t.selfEnd, t.mY2]} _style={[t.textSm]} trigger={()=>{createCategory()}} />
							</View>
						</View>
					</ScrollView>
				</Popup>
				:
				<></>
			}
			{
				(editCategoryPopup) ?
				<Popup pressOut={()=>{setEditCategoryPopup(false)}}>
					<ScrollView>
						<Text style={[t.text2xl, t.selfCenter]}>Edit category</Text>
						<View style={[t.wFull, t.itemsCenter, t.justifyCenter, t.flex, t.flexCol]}>
							<InputField _style={[{backgroundColor: "#00000010"}]} placeholder="category name" title="Category name" style={[t.mT6]} _text={editCategoryName} val={(e)=>{setEditCategoryName(e)}}/>
							<View style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.wFull, t.mT8, t.pX10]}>
								<Btn inner="Cancel" style={[t.h10, t.w24, t.selfEnd, t.mY2]} _style={[t.textSm]} trigger={()=>{setEditCategoryPopup(false)}} />
								<Btn inner="Edit" style={[t.h10, t.w24, t.selfEnd, t.mY2]} _style={[t.textSm]} trigger={()=>{editCategory()}} />
							</View>
						</View>
					</ScrollView>
				</Popup>
				:
				<></>
			}
			<ScrollView>
				<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT4, t.mX4, t.justifyBetween]}>
					<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter,
					{
						shadowColor: 'rgba(0, 0, 0, 0.4)',
						shadowOffset: {width: 0, height: 2},
						shadowRadius: 8,
						elevation: 5,
						height: 40,
						width: 40
					}]}>
						<FontAwesome name="angle-left" size={32} color="black" />
					</TouchableOpacity>
					<Text style={[t.mR12, t.textLg, t.textGray700]}>Manage page</Text>
				</View>

				<View style={[t.wFull, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter, t.pT16]}>
					<TouchableOpacity style={[{backgroundColor: "#00000040"}, t.roundedFull, t.itemsCenter, t.justifyCenter]} onPress={()=>{pickPfp()}}>
						<Image source={{uri: axios.defaults.baseURL + props.session["store_pfp"]}} style={[t.roundedFull, {width: 120, height: 120},
						{
							shadowColor: 'rgba(0, 0, 0, 0.1)',
							shadowOffset: {width: 0, height: 2},
							shadowRadius: 8,
							elevation: 5,
						}]}/>
						<View style={[t.absolute]}>
							<FontAwesome5 name="images" size={20} color="gray" />
						</View>
					</TouchableOpacity>

					<Text style={[t.textXl, t.mT2]}>{props.session["store_name"]}</Text>
					<Text style={[t.mT2, {color: "#00000080"}]}>{props.session["store_address"]}</Text>

					<TouchableOpacity style={[{backgroundColor: "#00000040"}, t.w5_6, t.h40, t.mT8, t.itemsCenter, t.justifyCenter, t.roundedLg]} onPress={()=>{pickBanner()}}>
						<Image source={{uri: axios.defaults.baseURL + props.session["store_banner"]}} style={[t.roundedLg, t.wFull, t.hFull,
						{
							shadowColor: 'rgba(0, 0, 0, 0.1)',
							shadowOffset: {width: 0, height: 2},
							shadowRadius: 8,
							elevation: 5,
						}]}/>
						<View style={[t.absolute]}>
							<FontAwesome5 name="images" size={20} color="gray" />
						</View>
					</TouchableOpacity>

					<View style={[t.wFull, t.mT4, t.mB8, t.pX6]}>
						<Text style={[t.textXl]}>Categories</Text>
						{(categories.length != 0) ?
							listCategories()
							:
							<Text style={[t.textCenter, {color: "#00000080"}]}>No categories found. Create a new one using the (Add) button below</Text>
						}
						<Btn inner="New category" style={[t.h14, t.selfEnd, t.mY2]} _style={[{fontSize: 16}]} trigger={()=>{setCategoryPopup(true)}} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}