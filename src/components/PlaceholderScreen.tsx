import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

interface PlaceholderScreenProps {
  screenName: string;
}

export function PlaceholderScreen({ screenName }: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.comingSoon}>Coming Soon</Text>
      <Text style={styles.screenName}>{screenName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  screenName: {
    fontSize: 16,
    color: Colors.textLight,
  },
});
