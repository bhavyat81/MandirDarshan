import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './HomeStackNavigator';
import { PlaceholderScreen } from '../components/PlaceholderScreen';
import { Colors } from '../utils/colors';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search">
        {() => <PlaceholderScreen screenName="Search Screen" />}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {() => <PlaceholderScreen screenName="Favorites Screen" />}
      </Tab.Screen>
      <Tab.Screen name="About">
        {() => <PlaceholderScreen screenName="About Screen" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
