import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { t } from "react-native-tailwindcss";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import WideImgBtn from '../../Components/WideImgBtn';
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import ProductCard from '../../Components/ProductCard';

export default function Orders(props) {

	const [orders, setOrders] = useState([])
	const getOrders = () =>
	{
		axios.get("store/get/active_orders")
		.then(resp=>{
			console.log(resp.data);
			setOrders(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [selectedOrder, setSelectedOrder] = useState(null)
	const [isPop, setIsPop] = useState(false)
	const listOrders = () =>
	{
		const ret = orders.map((i, key) =>
			<WideImgBtn key={key} inner={i["orderId"]} trigger={()=>{setSelectedOrder(i); getOrderProducts(i["products"]); setIsPop(true);}}/>
		)

		return(
			<ScrollView style={[t.wFull, t.pX2, t.pT4]}>
				{ret}
			</ScrollView>
		)
	}

	useEffect(()=>{
		getOrders();
	},[])

	const [prods, setProds] = useState([])
	const getOrderProducts = (x) =>
	{
		axios.post("store/get/order/products/", {products: x})
		.then(resp=>{
			console.log(resp.data);
			setProds(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const editOrder = (x) =>
	{
		axios.post("store/edit/order/products/", {id: selectedOrder["id"], prodKey: x})
		.then(resp=>{
			console.log(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const listOrderProducts = () =>
	{
		var j = 0
		const ret = prods.map((i, key) =>
			{
				j += parseFloat(i["price"]).toFixed(2) * parseInt(i["amt"])
				return(
					<ProductCard key={key} name={i["name"] + " " + i["amt"] + ((i["unit"] == 0) ? "st" : "kg")} price={parseFloat(i["price"]) * parseInt(i["amt"])} img={i["img"]}
					trigger={()=>{let x = prods; x[key]["check"] = !x[key]["check"]; setProds(x); editOrder(key); getOrders()}} _style={[(i["check"] == true) ? t.bgGreen300 : t.bgWhite]} />
				)
			}
		)

		return(
			<ScrollView style={[t.wFull, t.pX2, t.pT4]}>
				<Text style={[t.textLg, t.selfEnd]}>Total: {j.toFixed(2)}kr</Text>
				{ret}
			</ScrollView>
		)
	}

	return (
		<View>
			{
				(isPop) ?
				<Popup _style={[{height: "75%"}]} pressOut={()=>{setIsPop(false)}}>
					{
						(selectedOrder != null) ?
						<View>
							<Text>{selectedOrder["orderId"]}</Text>
							{(prods.length != 0) ? listOrderProducts() : <></>}
						</View>
						:
						<></>
					}
				</Popup>
				:
				<></>
			}
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4, t.justifyBetween]}>
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
				<Text style={[t.mR12, t.textLg, t.textGray700]}>Manage orders</Text>
			</View>

			<View style={[t.wFull, t.hFull, t.pT24]}>
				<Search placeholder="Search" val={(e)=>{}} />
				{(orders.length != 0) ? listOrders() : <></>}
			</View>
		</View>
	)
}