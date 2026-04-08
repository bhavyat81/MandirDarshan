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
import { charDhamList } from '../data/charDham';
import { CharDham } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

export function CharDhamListScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={charDhamList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.headerBanner}>
              <Text style={styles.headerTitle}>🙏 Char Dham Yatra</Text>
            </View>
            <View style={styles.introCard}>
              <Text style={styles.introText}>
                The Char Dham pilgrimage comprises four sacred Hindu sites: Badrinath, Dwarka, Puri, and Rameswaram. Visiting all four is believed to cleanse all sins and lead to moksha (liberation).
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }: { item: CharDham }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CharDhamDetailScreen', { charDhamId: item.id })}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>🙏</Text>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardNameHindi}>{item.nameHindi}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#2E7D32" />
            </View>
            <View style={styles.cardMeta}>
              <Ionicons name="location-outline" size={13} color={Colors.textLight} />
              <Text style={styles.cardMetaText}>{item.city}, {item.state}</Text>
            </View>
            <View style={styles.cardMeta}>
              <Ionicons name="flower-outline" size={13} color="#2E7D32" />
              <Text style={[styles.cardMetaText, styles.deity]}>{item.deity}</Text>
            </View>
            <Text style={styles.cardDesc} numberOfLines={3}>{item.story}</Text>
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
    backgroundColor: '#2E7D32',
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
  card: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },
  cardNameHindi: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 1,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardMetaText: {
    fontSize: 13,
    color: Colors.textLight,
    marginLeft: 4,
  },
  deity: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 19,
    marginTop: 6,
  },
  separator: {
    height: 12,
  },
});
