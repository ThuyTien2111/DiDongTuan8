import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export default function ChoseDrink({ navigation }) {
    const route = useRoute();
    var { shopToChose } = route.params;
    var drinks = shopToChose.drinks;
    var [cart, setCart] = useState([]);
    const [drinkQuantities, setDrinkQuantities] = useState({});
    // var [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('https://65522d185c69a7790329a6de.mockapi.io/cart')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             data = json;
    //             // console.log(data.at(1))
    //             setData(json)
    //         });
    // })

    const handleQuantityChange = (myDrink, action) => {
        const currentQuantities = { ...drinkQuantities };
        if (action === 'increment') {
            currentQuantities[myDrink.name] = (currentQuantities[myDrink.name] || 0) + 1;
        } else if (action === 'decrement' && currentQuantities[myDrink.name] > 0) {
            currentQuantities[myDrink.name] -= 1;
        }
    
        setDrinkQuantities(currentQuantities);
    
        // Cập nhật giỏ hàng
        const existingCartItemIndex = cart.findIndex(item => item.name === myDrink.name);
    
        if (existingCartItemIndex !== -1) {
            // Nếu loại thức uống đã có trong giỏ hàng, cập nhật số lượng
            const updatedCart = [...cart];
            updatedCart[existingCartItemIndex].quantity = currentQuantities[myDrink.name];
            setCart(updatedCart);
        } else {
            // Nếu loại thức uống chưa có trong giỏ hàng, thêm mới vào giỏ hàng
            const updatedCart = [...cart, { name: myDrink.name, price:myDrink.price, img:myDrink.img, quantity: currentQuantities[myDrink.name] }];
            setCart(updatedCart);
        }
    };
    
    // const addCart = (myCart) => {
    //     fetch('https://654099b845bedb25bfc225f4.mockapi.io/todo', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id:data.length+1,
    //             cartItems:myCart
    //         })
    //     })
    //     .then((response) => response.json())
    //     .then((newCart)=>{
    //         console.log(newCart)
    //     });
    //     navigation.navigate('Success', {})
    // };
    var myCart={
        id:18,
        shop:shopToChose,
        cartItems:cart
    }
    console.log(cart)
    return (
        <View style={styles.container}>
            <FlatList
                data={drinks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemShop}>
                        <Image source={{ uri: item.img }} style={styles.img} />
                        <View style={{ marginLeft: 20, width: 100 }}>
                            <Text style={styles.nameDrink}>{item.name}</Text>
                            <Text>
                                <Feather name="play-circle" size={20} color="black" style={{ marginRight: 5 }} />
                                {item.price} $</Text>
                        </View>
                        <View style={{ marginLeft: 20, justifyContent: 'space-around', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.modifyQuatityButton}
                                onPress={() => handleQuantityChange(item, 'decrement')}
                            >
                                <Text style={{ color: "white", fontWeight: '700' }}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modifyQuatityButton}>
                                <Text style={{ color: "white", fontWeight: '700' }}
                                    onPress={() => handleQuantityChange(item, 'increment')}
                                >+</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                )} />
            <TouchableOpacity style={styles.goCartButton} onPress={()=>{navigation.navigate('Success', {myCart})}}>
                <Text style={styles.goCartButtonText}>GO TO CART</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemShop: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 0.2,
        borderRadius: 10,
        borderColor: 'gray'
    },
    img: {
        width: 70,
        height: 70,
    },
    nameDrink: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        height: 26
    },
    modifyQuatityButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#33CC99',
        marginRight: 20,
        borderRadius: 10,

    },
    goCartButtonText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 26,
    },
    goCartButton: {
        backgroundColor: '#EFB034',
        borderRadius: 6,
        width: 347,
        paddingVertical: 10,
    }
})