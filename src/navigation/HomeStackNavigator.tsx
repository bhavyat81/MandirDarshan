import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import { Colors } from '../utils/colors';

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
      <Stack.Screen
        name="HomeScreen"
        options={{ title: 'Mandir Darshan 🛕' }}
      >
        {() => <PlaceholderScreen screenName="Home Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="StateListScreen"
        options={{ title: 'States' }}
      >
        {() => <PlaceholderScreen screenName="State List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="CityListScreen"
        options={{ title: 'Cities' }}
      >
        {() => <PlaceholderScreen screenName="City List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="TempleListScreen"
        options={{ title: 'Temples' }}
      >
        {() => <PlaceholderScreen screenName="Temple List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="TempleDetailScreen"
        options={{ title: 'Temple Details' }}
      >
        {() => <PlaceholderScreen screenName="Temple Detail Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="JyotirlingaListScreen"
        options={{ title: '12 Jyotirlingas' }}
      >
        {() => <PlaceholderScreen screenName="Jyotirlinga List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="JyotirlingaDetailScreen"
        options={{ title: 'Jyotirlinga Details' }}
      >
        {() => <PlaceholderScreen screenName="Jyotirlinga Detail Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="ShaktiPeethaListScreen"
        options={{ title: 'Shakti Peethas' }}
      >
        {() => <PlaceholderScreen screenName="Shakti Peetha List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="ShaktiPeethaDetailScreen"
        options={{ title: 'Shakti Peetha Details' }}
      >
        {() => <PlaceholderScreen screenName="Shakti Peetha Detail Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="CharDhamListScreen"
        options={{ title: 'Char Dham' }}
      >
        {() => <PlaceholderScreen screenName="Char Dham List Screen" />}
      </Stack.Screen>
      <Stack.Screen
        name="CharDhamDetailScreen"
        options={{ title: 'Char Dham Details' }}
      >
        {() => <PlaceholderScreen screenName="Char Dham Detail Screen" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
