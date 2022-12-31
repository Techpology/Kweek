import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native' 
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';

export default function ManagePost(props) {

	const [posts, setPosts] = useState([])
	const getPosts = () =>
	{
		axios.get("/store/get/posts")
		.then(resp=>{
			setPosts(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [img, setImg] = useState("")
	const [imgPath, setImgPath] = useState("")
	const createPost = () =>
	{
		axios.post("/store/set/post", {
			title,
			desc,
			img
		}).then(resp=>{
			console.log(resp.data)
		}).catch(err=>{
			alert(err.message)
		})
	}

	const [isPopup, setIsPopup] = useState(false)
	return (
		<View style={[t.wFull, t.hFull]}>
			{
				(isPopup) ?
				<Popup pressOut={()=>{setIsPopup(false)}} _style={[{height:"75%"}]}>
					<ImageBackground source={{uri: imgPath}} style={[t.wFull, t.hFull, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
						<Text style={[t.textXl, {color: "#00000080"}]}>Select image</Text>
					</ImageBackground>
				</Popup>
				:
				<></>
			}
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4]}>
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
			</View>
			<View style={[t.wFull, t.pT24]}>
				<Search placeholder="search" />
			</View>
			<ScrollView style={[t.pX4, t.pT4]}>
				{/* {(showProducts) && renderProds()} */}
			</ScrollView>

			<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB32, t.bottom0]}>
				<TouchableOpacity onPress={()=>{/* getProducts() */}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<Feather name="refresh-cw" size={28} color="black" />
				</TouchableOpacity>
			</View>
			<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB12, t.bottom0]}>
				<TouchableOpacity onPress={()=>{setIsPopup(true)}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<AntDesign name="plus" size={32} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	)
}