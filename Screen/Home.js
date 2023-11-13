import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-web';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function Home({navigation}) {
    var [data, setData] = useState([])
    useEffect(() => {
        fetch('https://654099b845bedb25bfc225f4.mockapi.io/shop')
            .then((response) => response.json())
            .then((json) => {
                data = json;
                setData(json)
            });
    })
    // console.log(data.at(1))
    function hangleChoseShop(id){
         // Tìm đối tượng todo dựa vào id
         var shopToChose = data.find((item) => item.id === id);
         navigation.navigate('ChoseDrink', { shopToChose });
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemShop}>
                        <TouchableOpacity onPress={()=>hangleChoseShop(item.id)}>
                        <Image source={{ uri: item.img }} style={styles.img} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F3F4F6', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={item.status == 'Accepting Orders' ? styles.acceptStatus : styles.notAcceptStatus}>
                                {item.status == 'Accepting Orders' &&
                                    <Ionicons name="checkmark-done-sharp" size={18} color="green"style={{ marginRight: 10 }} />
                                }
                                {item.status == 'Tempory Unavailable' &&
                                    <MaterialIcons name="lock" size={18} color="red"style={{ marginRight: 10 }} />}
                                {item.status}</Text>
                            <Text>
                                <FontAwesome5 name="clock" size={18} color="green" style={{ marginRight: 10 }} />
                                {item.delivery}
                            </Text>
                        </View>
                        <Text style={styles.nameShop}>{item.name}</Text>
                        <Text style={styles.addr}>{item.addr}</Text>
                        </TouchableOpacity>
                    </View>
                )} />

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
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor:'white',
        padding:10,
        borderWidth:0.2,
        borderRadius:10,
        borderColor:'gray'
    },
    img: {
        width: 350,
        height: 120,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20

    },
    acceptStatus: {
        marginRight: 60,
        color: '#1DD75B',
    },
    notAcceptStatus: {
        marginRight: 30,
        color: '#DE3B40',
    },
    nameShop:{
        alignSelf:'flex-start',
        marginLeft:15,
        fontSize:18,
        fontWeight:'700',
        lineHeight:26,
        height:26,

    },
    addr:{
        alignSelf:'flex-start',
        marginLeft:15,
        fontSize:16,
        fontWeight:'400',
        lineHeight:22,
        height:22,
    }

});