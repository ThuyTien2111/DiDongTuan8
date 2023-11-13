import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export default function Success({ navigation }) {
    const route = useRoute();
    var { myCart } = route.params;
    var drinks=myCart.cartItems;
    var [cart, setCart] = useState(drinks);
    // var [drinkQuantities, setDrinkQuantities] = useState({});
    const handleQuantityChange = (myDrink, action) => {
        if (action === 'increment') {
            var newItem=cart.find((item)=>item.name==myDrink.name);
            newItem.quantity++;
            setCart([...cart]);
        } else if (action === 'decrement') {
            var newItem=cart.find((item)=>item.name==myDrink.name);
            newItem.quantity--;
            if(newItem.quantity===0){
                var newCart=cart.filter((item)=>item.name!==newItem.name)
                setCart(newCart)
            }else if(newItem.quantity>0){
                setCart([...cart]);
            }
        }
    };
    var totalPrice=0;
    cart.forEach((item)=>{
        totalPrice+=item.price*item.quantity
    })
    console.log(cart)
    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
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
                <View style={styles.ship}>
                    <View style={{justifyContent:'space-between'}}>
                        <Text style={styles.shipText}>CAFE DELIVERY</Text>
                        <Text style={styles.shipText}>Order #{myCart.id}</Text>
                    </View>
                    <View style={{justifyContent:'center', marginRight:20}}>
                    <Text style={styles.shipText}>{myCart.shop.ship} $</Text>
                    </View>
                </View>
                <View style={styles.total}>
                    <View style={{justifyContent:'space-between'}}>
                        <Text style={styles.shipText}>CAFE DELIVERY</Text>
                        <Text style={styles.shipText}>Order #{myCart.id}</Text>
                    </View>
                    <View style={{justifyContent:'center', marginRight:20}}>
                    <Text style={styles.shipText}>{totalPrice} $</Text>
                    </View>
                </View>
            <TouchableOpacity style={styles.goCartButton} onPress={()=>{navigation.navigate('Success', {myCart})}}>
                <Text style={styles.goCartButtonText}>PAY NOW</Text>
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
    },
    ship:{
        backgroundColor: '#00BDD6',
        borderRadius: 6,
        width: 347,
        paddingVertical: 20,
        flexDirection:'row',
        marginBottom:10,
        justifyContent:'space-between'
    },
    shipText: {
        marginLeft:20,
        alignSelf: 'flex-start',
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 26,
    },
    total:{
        backgroundColor: '#8353E2',
        borderRadius: 6,
        width: 347,
        paddingVertical: 20,
        flexDirection:'row',
        marginBottom:10,
        justifyContent:'space-between'
    },
})