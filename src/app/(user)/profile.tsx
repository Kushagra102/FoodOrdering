import React from 'react';
import { supabase } from '@/src/lib/supabase';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => await supabase.auth.signOut()}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
