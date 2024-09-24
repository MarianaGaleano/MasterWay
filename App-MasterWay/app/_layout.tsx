import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'popins': require('./../assets/fonts/Poppins-Regular.ttf'),
    'popins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'popins-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    'popins-medium': require('./../assets/fonts/Poppins-Medium.ttf')
  })
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{
      headerShown: false
    }} />
    </Stack>
  );
}


