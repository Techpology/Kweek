import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';

export default function ManageProducts(props) {

	const [products, setProducts] = useState(null)

	const getProducts = () =>
	{
		axios.get("store/get/products")
		.then(resp=>{
			console.log(resp.data)
			setProducts(resp.data);
		}).catch(err=>{
			alert(err.message)
		})
	}

	useEffect(()=>{
		getProducts()
	},[])

	const renderProds = () =>
	{
		const ret = products.map((i,key) => 
			<WideImgBtn key={key} img={i["img"]} inner={i["name"]} />
		)
		return (
			<View>
				{ret}
			</View>
		)
	}

	const [isPop, setIsPop] = useState(false)

	return (
		<View style={[t.wFull, t.hFull]}>
			{(isPop) ?
			<Popup pressOut={()=>{setIsPop(false)}} >
				<Text style={[t.text2xl, t.selfCenter]}>Add product</Text>
				<View style={[t.flex, t.flexCol, t.itemsCenter, t.pT16]}>
					<Btn trigger={()=>{}} inner="Scan EAN" style={[t.mB8]} />
					<Btn trigger={()=>{props.navigation.navigate("AddProduct")}} inner="Manual" />
				</View>
			</Popup> : <></>
			}
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
				{(products != null) ? renderProds() : <></>}
			</ScrollView>

			<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB12, t.bottom0]}>
				<TouchableOpacity onPress={()=>{setIsPop(true)}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
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