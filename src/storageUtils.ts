import * as FileSystem from 'expo-file-system'
import { Platform } from 'react-native'
import { useStore } from './store'
const FILE_URI = FileSystem.documentDirectory + 'storeData.json'

// Define an abstract storage interface
interface Storage {
  save: (data: string) => Promise<void>;
  load: () => Promise<string | null>;
}

// Implement web storage
const webStorage: Storage = {
  save: async (data: string) => {
    console.log('saving: '+ data)
    localStorage.setItem('storeData', data);
  },
  load: async () => {
    console.log('loading...')
    return localStorage.getItem('storeData');
  },
};

// Implement native storage
const nativeStorage: Storage = {
  save: async (data: string) => {
    await FileSystem.writeAsStringAsync(FILE_URI, data);
  },
  load: async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(FILE_URI);
      if (fileInfo.exists) {
        return await FileSystem.readAsStringAsync(FILE_URI);
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
    return null;
  },
};

// Select the appropriate storage implementation based on the platform
const storage = Platform.OS === 'web' ? webStorage : nativeStorage;

// Export save and load functions that use the selected storage
const saveState = async () => {
  const state = useStore.getState();
  const jsonState = JSON.stringify(state);
  await storage.save(jsonState);
};

const loadState = async () => {
  const jsonState = await storage.load();
  if (jsonState) {
    return JSON.parse(jsonState);
  } else {
    // Return the default state if there was an error or file doesn't exist
    return useStore.getState();
  }
};

export { saveState, loadState };