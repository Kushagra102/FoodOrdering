import { Stack } from "expo-router";


export default function MenuLayout() {
    return (
        <Stack>
            <Stack.Screen name='list' options={{ headerShown: false }} />
        </Stack>
    )
}