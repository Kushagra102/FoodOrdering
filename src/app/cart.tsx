import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/src/providers/CartProvider'
import CartListItem from '@/src/components/CartListItem'
import { Stack } from 'expo-router'
import Button from '../components/Button'

const CartScreen = () => {
    const { items, total, checkout } = useCart()

    return (
        <View style={{ padding: 10 }}>
            <Stack.Screen options={{ title: "Cart", headerTitleAlign: "center" }} />
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total: ${total}</Text>
            <Button text="Checkout" onPress={checkout} />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen