import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import { AntDesign } from '@expo/vector-icons'; 

import axios from "axios"

export default function PostCard(props) {
	const [lines, setLines] = useState(3)
	const [likes, setLikes] = useState(props.likes)
	const [isLiked, setIsLiked] = useState(props.liked)

	const _like = () =>{
		axios.post("/customer/like/post/", {id: props.id})
		.then(resp =>{
			console.log(resp.data);
		}).catch(err=>{
			alert(err.message)
		})
	}

	return (
		<View style={[{width:"90%", borderRadius: 8}, t.bgWhite, t.flex, t.flexCol, t.pB5, t.selfCenter, {
			shadowColor: 'rgba(0, 0, 0, 0.1)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 4,
		}, t.mY2]}>
			<View style={[{height: 225, borderTopLeftRadius: 8, borderTopRightRadius: 8}, t.wFull]}>
				<Image source={{uri: props.image}} style={[{height: 225, borderTopLeftRadius: 8, borderTopRightRadius: 8}, t.wFull]}/>
				<TouchableOpacity onPress={()=>{setLikes((isLiked) ? likes - 1 : likes + 1); setIsLiked(!isLiked); _like()}}
				style={[t.absolute, t.bgWhite, {height: 30}, t.bottom0, t.right0, t.flex, t.flexRow, t.roundedLLg, t.pX2, t.itemsCenter, t.justifyCenter]}>
					<Text style={[t.mR2]}>Likes: {likes}</Text>
					{(isLiked) ?
						<AntDesign name="like1" size={18} color="black" />
						:
						<AntDesign name="like2" size={18} color="black" />
					}
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={[t.pX4, t.flex, t.flexCol, t.mT4, t.mB2]} onPress={()=>{if(lines == 100){setLines(3)}else{setLines(100)}}}>
				<Text>{props.title}</Text>
				<Text numberOfLines={lines} style={[t.textGray700, {fontSize: 12}]}>{props.date}</Text>
				<Text numberOfLines={lines} style={[t.mL2, t.textGray700]}>{props.desc}</Text>
			</TouchableOpacity>
		</View>
	)
}