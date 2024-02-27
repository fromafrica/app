import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

import { useStore } from './store';

const CustomDrawerContent = ({ navigation }) => {
    const message = useStore(state => state.message);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable onPress={() => navigation.navigate('Home')}>
            <Text>Screen One</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text>Screen Two</Text>
            </Pressable>
            <Text>{message}</Text>
        </SafeAreaView>
    );
};

export default CustomDrawerContent;