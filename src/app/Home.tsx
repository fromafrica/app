import { Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

import { useStore } from '../store';
import { useEffect } from "react";
import { useColorScheme } from 'nativewind';

export default function HomeScreen() {
    const { bottom } = useSafeAreaInsets();

    const navigation = useNavigation();

    const onToggle = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    }

    const messageState = useStore(state => state.message);

    const setMessage = useStore(state => state.setMessage);

    const logout = useStore(state => state.logout);

    const { isDarkMode, toggleDarkMode } = useStore();
    const { setColorScheme } = useColorScheme();

    const handleDarkModeToggle = () => {
      toggleDarkMode();
      setColorScheme(isDarkMode ? 'light' : 'dark');
    };

    useEffect(() => {
      console.log(messageState);
    }, [messageState]);

    return (
      <View
        className="flex flex-1 bg-gray-100 dark:bg-black dark:text-white"
        style={{ paddingBottom: bottom }}
      >
        <View className="py-6 flex-1 items-start px-4 md:px-6 ">
            <View><Pressable onPress={onToggle}><Text className="w-100 h-100 bg-black text-white">menu</Text></Pressable></View>
            <View><Pressable onPress={() => setMessage('New Message')}><Text className="mt-5 p-5 bg-sky-400 rounded">New Message</Text></Pressable></View>
            <View><Pressable onPress={() => setMessage('Another Message')}><Text className="mt-5 p-5 bg-sky-400 rounded">Another Message</Text></Pressable></View>
            <View><Pressable onPress={() => handleDarkModeToggle()}><Text className="mt-5 p-5 bg-sky-400 rounded">Dark Mode Toggle</Text></Pressable></View>
            <View><Pressable onPress={() => logout() }><Text className="mt-5 p-5 bg-sky-400 rounded">logout</Text></Pressable></View>
        </View>
      </View>
    );
  }