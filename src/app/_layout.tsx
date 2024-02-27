import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { loadState, saveState } from '../storageUtils';
import { useStore } from '../store';
import { LoginForm } from '../core/LoginForm';
import CustomDrawerContent from '../menu';
import Home from './Home';
import Settings from './Settings';

import "../global.css"


export default function Layout() {
  const Drawer = createDrawerNavigator();

  const isAuthenticated = useStore(state => state.isAuthenticated);

  useEffect(() => {
    const initializeState = async () => {
      const loadedState = await loadState();
      if (loadedState) {
        // Update your state accordingly
        useStore.setState(loadedState);
      }
    };
  
    initializeState();
  }, []);

  useEffect(() => {
    const unsubscribe = useStore.subscribe((state) => {
      // State is the entire store state
      saveState();
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <SafeAreaView style={{ flex: 1 }}>
        {isAuthenticated ? (
          <Drawer.Navigator 
            drawerContent={props => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
          >
          <Drawer.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerShown: false
            }}
          />

          <Drawer.Screen 
            name="Settings" 
            component={Settings} 
            options={{
              headerShown: false
            }}
          />
        </Drawer.Navigator>
        ) : (
          <LoginForm />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}