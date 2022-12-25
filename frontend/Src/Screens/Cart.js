import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { t } from "react-native-tailwindcss";
import axios from "axios";
import React, {useState, useEffect} from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import WideImgBtn from '../Components/WideImgBtn';
import Popup from "../Components/Popup";

export default function Cart(props) {
	const [selectedStore, setSelectedStore] = useState("")
	const [storePopup, setStorePopup] = useState(false)
	const [prods, setProds] = useState([])
	const getProds = () =>
	{
		axios.post("customer/get/cart/products/", {storeName: selectedStore})
		.then(resp=>{
			console.log(resp.data);
			setProds(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const listProds = () =>
	{
		const ret = prods.map((i, key) =>
			<WideImgBtn key={key} inner={i}/>
		)

		return(
			<ScrollView style={[ t.wFull, t.pX8]}>
				{ret}
			</ScrollView>
		)
	}

	const listCart = () =>
	{
		let _c = JSON.parse(props.session["cart"])
		const ret = Object.keys(_c).map((i, key) =>
			<WideImgBtn key={key} inner={i} trigger={()=>{setSelectedStore(i);getProds();}}/>
		)

		return(
			<ScrollView style={[ t.wFull, t.pX8]}>
				{ret}
			</ScrollView>
		)
	}

	return (
		<View style={[t.wFull, t.hFull, {backgroundColor: "#F8F8F8"}]}>
			{
				(storePopup) ?
				<Popup _style={[{height: "75%"}]} pressOut={()=>{setStorePopup(false)}}>
					<View style={[t.wFull, t.hFull, t.flex, t.flexCol, t.pY4]}>
						<View style={[t.flex, t.flexRow, t.wFull, t.pX4, t.justifyBetween, t.itemsCenter]}>
							<Text style={[t.textXl]}>Store name</Text>
							<TouchableOpacity onPress={()=>{setStorePopup(false)}} style={[t.p1]}>
								<Feather name="x" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View style={[t.pX4, t.pY2, t.wFull, t.hFull]}>
							<Text style={[t.textMd]}>Items in order</Text>
							{(prods.length != 0) ? listProds() : <></>}
						</View>
						
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
			{listCart()}

			<Text style={[t.textLg, t.mX8]}>Active orders</Text>
			<ScrollView style={[t.wFull, t.pX8]}>
				<WideImgBtn inner="test" />
			</ScrollView>
		</View>
	)
}