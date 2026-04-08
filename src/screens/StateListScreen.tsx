import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { SearchBar } from '../components/SearchBar';
import { Colors } from '../utils/colors';
import { states } from '../data/states';
import { State } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

export function StateListScreen() {
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');

  const filtered = states.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: State }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CityListScreen', { stateId: item.id, stateName: item.name })}
      activeOpacity={0.8}
    >
      <View style={styles.itemLeft}>
        <View style={styles.stateIcon}>
          <Ionicons name="map-outline" size={20} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.stateName}>{item.name}</Text>
          <Text style={styles.stateMeta}>{item.templeCount} temples across {item.cities.length} cities</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search states..." />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stateName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  stateMeta: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  separator: {
    height: 10,
  },
});
