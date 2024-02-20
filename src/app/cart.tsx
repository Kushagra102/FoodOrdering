import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/src/providers/CartProvider'
import CartListItem from '@/src/components/CartListItem'
import { Stack } from 'expo-router'

const CartScreen = () => {
    const { items } = useCart()

    return (
        <View>
            <Stack.Screen options={{ title: "Cart", headerTitleAlign: "center" }} />
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen