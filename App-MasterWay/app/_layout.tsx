import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {
  
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }  

  useFonts({
    'popins': require('./../assets/fonts/Poppins-Regular.ttf'),
    'popins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'popins-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    'popins-medium': require('./../assets/fonts/Poppins-Medium.ttf')
  })
  
  return (
    <ClerkProvider
    tokenCache={tokenCache} 
    publishableKey={publishableKey}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/*<Stack.Screen name="index" options={{
        headerShown: false
        }} />*/}
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </ClerkProvider>
  );
}


