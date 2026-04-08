import React from 'react';
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
import { Colors } from '../utils/colors';
import { jyotirlingas } from '../data/jyotirlingas';
import { Jyotirlinga } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

export function JyotirlingaListScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jyotirlingas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.headerBanner}>
              <Text style={styles.headerTitle}>Om 🕉️ 12 Jyotirlingas</Text>
            </View>
            <View style={styles.introCard}>
              <Text style={styles.introText}>
                The 12 Jyotirlingas are the most sacred shrines of Lord Shiva, where he manifested as pillars of light (jyoti). A pilgrimage to all 12 is believed to grant moksha.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }: { item: Jyotirlinga; index: number }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('JyotirlingaDetailScreen', { jyotirlingaId: item.id })}
            activeOpacity={0.8}
          >
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.city}, {item.state}</Text>
              <Text style={styles.itemDeity}>{item.deity}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
          </TouchableOpacity>
        )}
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
    paddingBottom: 24,
  },
  headerBanner: {
    backgroundColor: Colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textWhite,
    textAlign: 'center',
  },
  introCard: {
    backgroundColor: Colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  introText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textWhite,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  itemMeta: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  itemDeity: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  separator: {
    height: 10,
  },
});
