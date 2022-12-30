import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { t } from "react-native-tailwindcss";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import Popup from '../../Components/Popup';
import ProductCard from '../../Components/ProductCard';
import Btn from "../../Components/Btn";

export default function StorePage(props) {
	const { id } = props.route.params

	const [store, setStore] = useState({})
	const [isstore, setIsStore] = useState(false)
	const getStore = () =>
	{
		axios.post("customer/get/store/", {"id": id})
		.then(resp=>{
			console.log(resp.data);
			setStore(resp.data);
			setIsStore(true);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [amtPoppup, setAmtPoppup] = useState(false)
	const [amt, setAmt] = useState(1)
	const addToCart = () =>
	{
		axios.post("customer/add/cart/", {storeName: store["name"], product: {id: selectedProd["id"], amt: amt}})
		.then(resp=>{
			console.log(resp.data);
			props.updateSession()
		}).catch(err=>{
			alert(err.message);
		})
	}

	useEffect(()=>{
		getStore();
		getFave();
	},[])

	const listCategories = () =>
	{
		let categ = store["categories"]
		categ = categ.replace(/'/g,'"')
		console.log(JSON.parse(categ))

		const ret = JSON.parse(categ).map((i, key)=>
			<TouchableOpacity key={key} style={[t.bgWhite, t.wFull, {height: 100}, t.roundedLg, t.itemsCenter, t.justifyCenter, t.mY2]} onPress={()=>{setSelectedCateg(i); getProds(i); setIsPopup(true)}}>
				<Text style={[{color: "#00000080"}]}>{i}</Text>
			</TouchableOpacity>
		)

		return (
			<ScrollView style={[t.pT4, t.pX8, t.pB4]}>
				{ret}
			</ScrollView>
		)
	}

	const [isPopup, setIsPopup] = useState(false)
	const [prods, setProds] = useState([])
	const [selectedCateg, setSelectedCateg] = useState("")

	const getProds = (x) =>
	{
		axios.post("customer/get/store/category/products/", {id: id, ind: x})
		.then(resp=>{
			console.log(resp.data);
			setProds(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [isProdPopup, setIsProdPopup] = useState(false)
	const [selectedProd, setSelectedProd] = useState({})

	const listProds = () =>
	{
		const ret = prods.map((i, key)=>
			<ProductCard key={key} name={i["name"]} price={i["price"]} img={i["img"]} trigger={()=>{setSelectedProd(i); setIsProdPopup(true);}} />
		)

		return(
			<ScrollView style={[t.wFull, t.hFull]}>
				{ret}
			</ScrollView>
		)
	}

	const [isFave, setIsFave] = useState(false)
	const triggerFave = () =>
	{
		axios.post("customer/set/fave/", {
			"id": id,
			"state": isFave
		}).then(resp=>{
			console.log(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const getFave = () =>
	{
		axios.get("customer/get/fave")
		.then(resp=>{
			console.log(resp.data);
			resp.data.forEach(element => {
			if(element["id"] == id)
			{
				setIsFave(true)
			}
			});
		}).catch(err=>{
			alert(err.message);
		})
	}

	return (
		<SafeAreaView>
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4, t.z10]}>
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

			{
				(isPopup) ?
				<Popup pressOut={()=>{setIsPopup(false)}} _style={[{height: "70%"}, t.pT0]} title={""}>
					<Text style={[t.textLg, t.mB4]}>{selectedCateg}</Text>
					{(prods.length != 0) ? listProds() : <></>}
				</Popup>
				:
				<></>
			}

			{
				(isProdPopup) ?
				<Popup pressOut={()=>{setIsProdPopup(false); setIsPopup(false)}} _style={[{height: "70%"}, t.pX0, t.pY0]}>
					{
						(amtPoppup)?
						<View style={[t.absolute, t.wFull, t.hFull, {backgroundColor: "#00000040"}, t.z40, t.itemsCenter, t.justifyCenter]}>
							<View style={[t.bgWhite, t.wFull, t.pY4, t.itemsCenter, t.flex, t.flexCol, t.roundedLg]}>
								<Text style={[t.textLg]}>How many would you like to have?</Text>
								<View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyCenter, t.mT6]}>
									<TouchableOpacity style={[t.pY2, t.pX2, t.bgBlue400, t.roundedFull]} onPress={()=>{setAmt(amt - 1)}}>
										<AntDesign name="minus" size={24} color="black" />
									</TouchableOpacity>
									<Text style={[t.textXl, t.mX8]}>{amt}</Text>
									<TouchableOpacity style={[t.pY2, t.pX2, t.bgBlue400, t.roundedFull]} onPress={()=>{setAmt(amt + 1)}}>
										<AntDesign name="plus" size={24} color="black" />
									</TouchableOpacity>
								</View>
								<Btn inner="Done" style={[t.mT6]} trigger={()=>{setAmtPoppup(false); setIsProdPopup(false); addToCart();}} />
							</View>
						</View>
						:
						<></>
					}
					
					<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT4, t.mX2, t.z10]}>
						<TouchableOpacity onPress={()=>{setIsProdPopup(false)}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter,
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

					<Image style={[t.wFull, t.bgGray300, {height: "35%", borderTopLeftRadius: 20, borderTopRightRadius: 20}, t.objectContain, t.roundedBLg]} 
							source={{uri: axios.defaults.baseURL + selectedProd["img"]}} />
					<View style={[t.flex, t.flexRow, t.justifyBetween, t.mT6, t.pX6]}>
						<Text style={[t.text2xl]}>{selectedProd["name"]}</Text>
						<Text style={[t.text2xl]}>{selectedProd["price"]}kr</Text>
					</View>
					<View style={[t.pX8, t.mT4]}>
						<Text style={[t.textGray600]}>{selectedProd["description"]}</Text>
					</View>
					<View style={[t.absolute, t.bottom0, t.wFull, t.pY2, t.itemsCenter, t.justifyCenter]}>
						<Btn inner="Add to cart" trigger={()=>{setAmtPoppup(true) }}/>
					</View>
				</Popup>
				:
				<></>
			}

			{
				(isstore) ?
				<ScrollView style={[t.wFull, t.hFull]}>
					<View style={[t.wFull, t.itemsCenter, t.justifyEnd]}>
						<Image style={[t.wFull, {height: 240}, t.z20]} source={{uri: axios.defaults.baseURL + store["banner"]}} />
						<Image source={{uri: axios.defaults.baseURL + store["pfp"]}} style={[t.absolute, {width: 90, height: 90, bottom: -30}, t.z30, t.roundedFull]}/>
					</View>
					<View style={[t.wFull, {paddingTop: 30}, t.z20, t.itemsCenter, t.bgWhite, t.pB10, t.roundedBLg]}>
						<Text style={[t.textXl]}>{store["name"]}</Text>
						<Text style={[{color: "#00000080"}]}>{store["address"]}</Text>
						<Text style={[{color: "#00000080"}]}>Mobile: {store["phone"]}</Text>
						<View style={[t.wFull, t.absolute, t.bottom0, t.flex, t.flexRow, t.itemsCenter, t.justifyEnd, t.pX6]}>
							<TouchableOpacity style={[t.bgWhite, t.roundedFull, 
								{
									shadowColor: 'rgba(0, 0, 0, 0.4)',
									shadowOffset: {width: 0, height: 2},
									shadowRadius: 8,
									elevation: 5,
									height: 40,
									width: 40
								}, t.mB2, t.itemsCenter, t.justifyCenter]} onPress={()=>{setIsFave(!isFave); triggerFave()}}>
									{
										(isFave) ?
										<AntDesign name="heart" size={20} color="red" />
										:
										<AntDesign name="hearto" size={20} color="red" />
									}
							</TouchableOpacity>
						</View>
					</View>
					{listCategories()}
				</ScrollView>
				:
				<></>
			}

		</SafeAreaView>
	)
}