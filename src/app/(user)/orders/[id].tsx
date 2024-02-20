import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'

const OrderDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Not Found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${id}`, headerTitleAlign: 'center' }} />
            <OrderListItem order={order} />
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
    },
});


export default OrderDetailsScreen


