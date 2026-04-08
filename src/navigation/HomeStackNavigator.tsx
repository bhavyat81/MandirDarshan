import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../utils/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { StateListScreen } from '../screens/StateListScreen';
import { CityListScreen } from '../screens/CityListScreen';
import { TempleListScreen } from '../screens/TempleListScreen';
import { TempleDetailScreen } from '../screens/TempleDetailScreen';
import { JyotirlingaListScreen } from '../screens/JyotirlingaListScreen';
import { JyotirlingaDetailScreen } from '../screens/JyotirlingaDetailScreen';
import { ShaktiPeethaListScreen } from '../screens/ShaktiPeethaListScreen';
import { ShaktiPeethaDetailScreen } from '../screens/ShaktiPeethaDetailScreen';
import { CharDhamListScreen } from '../screens/CharDhamListScreen';
import { CharDhamDetailScreen } from '../screens/CharDhamDetailScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  StateListScreen: undefined;
  CityListScreen: { stateId: string; stateName: string };
  TempleListScreen: { city: string; stateId: string };
  TempleDetailScreen: { templeId: string };
  JyotirlingaListScreen: undefined;
  JyotirlingaDetailScreen: { jyotirlingaId: string };
  ShaktiPeethaListScreen: undefined;
  ShaktiPeethaDetailScreen: { shaktiPeethaId: string };
  CharDhamListScreen: undefined;
  CharDhamDetailScreen: { charDhamId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.textWhite,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StateListScreen" component={StateListScreen} options={{ title: 'Browse by State' }} />
      <Stack.Screen name="CityListScreen" component={CityListScreen} options={{ title: 'Cities' }} />
      <Stack.Screen name="TempleListScreen" component={TempleListScreen} options={{ title: 'Temples' }} />
      <Stack.Screen name="TempleDetailScreen" component={TempleDetailScreen} options={{ title: 'Temple Details' }} />
      <Stack.Screen name="JyotirlingaListScreen" component={JyotirlingaListScreen} options={{ title: '12 Jyotirlingas' }} />
      <Stack.Screen name="JyotirlingaDetailScreen" component={JyotirlingaDetailScreen} options={{ title: 'Jyotirlinga' }} />
      <Stack.Screen name="ShaktiPeethaListScreen" component={ShaktiPeethaListScreen} options={{ title: 'Shakti Peethas' }} />
      <Stack.Screen name="ShaktiPeethaDetailScreen" component={ShaktiPeethaDetailScreen} options={{ title: 'Shakti Peetha' }} />
      <Stack.Screen name="CharDhamListScreen" component={CharDhamListScreen} options={{ title: 'Char Dham' }} />
      <Stack.Screen name="CharDhamDetailScreen" component={CharDhamDetailScreen} options={{ title: 'Char Dham' }} />
    </Stack.Navigator>
  );
}
