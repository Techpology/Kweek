import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native' 
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';
import InputField from '../../Components/InputField'
import MultiLine from '../../Components/MultiLine'

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
			setExt(_ext[_ext.length - 1])
		}
	};

	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [img, setImg] = useState(null)
	const [ext, setExt] = useState(null)
	const [imgPath, setImgPath] = useState(null)
	const createPost = () =>
	{
		if(img == null){
			alert("Must choose an image.");
			return;
		}
		if(title == ""){
			alert("Must set a title.");
			return;
		}
		axios.post("/store/set/post/", {
			title: title,
			desc: desc,
			img: img,
			ext: ext
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
				<Popup pressOut={()=>{setIsPopup(false)}} _style={[{height:"75%", backgroundColor: "#fafafa"}, t.flex, t.flexCol, t.pX4]}>
					<TouchableOpacity onPress={()=>{pickImage()}} style={[{backgroundColor: "#D9D9D980", height: 180}, t.wFull, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
						<ImageBackground source={{uri: imgPath}} style={[t.wFull, t.hFull, t.itemsCenter, t.justifyCenter, t.roundedLg]}>
							<Text style={[t.textXl, {color: "#00000080"}]}>Select image</Text>
						</ImageBackground>
					</TouchableOpacity>

					<InputField val={(e)=>{setTitle(e)}} title="Title" placeholder="title" style={[t.pX4, t.mT8,]} />
					<MultiLine lines={8} val={(e)=>{setDesc(e)}} title="Description" placeholder="description" style={[t.pX4, t.mT8,]} />
					<View style={[t.wFull, t.itemsCenter, t.justifyCenter, t.mT8]}>
						<Btn inner="Post" trigger={()=>{createPost()}} />
					</View>
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