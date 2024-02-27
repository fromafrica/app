// LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { useStore } from '../store'; // Adjust the import path as necessary

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore(state => state.login);

  return (
    <View className='flex flex-1 justify-center'>
      <View className='p-5 w-2/3 ml-auto mr-auto bg-orange-400 rounded-xl'>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className='text-lg p-3'
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className='text-lg p-3 mt-3'
        />
        <Pressable  onPress={() => login(username, password)}>
          <Text className='p-3 bg-sky-500 text-white text-xl text-center rounded-lg mt-4'>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};
