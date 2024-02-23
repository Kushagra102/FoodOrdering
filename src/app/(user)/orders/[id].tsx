import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { useOrderDetails } from '@/src/api/orders'
import { useupdateOrderSubscription } from '@/src/api/orders/subscriptions'

const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, isLoading, error } = useOrderDetails(id)
    
    useupdateOrderSubscription(id)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to Fetch Order Details</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${id}`, headerTitleAlign: 'center' }} />
            <OrderListItem order={order} />
            <FlatList
                data={order?.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
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


