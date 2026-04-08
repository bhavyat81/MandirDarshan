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
import { shaktiPeethas } from '../data/shaktiPeethas';
import { ShaktiPeetha } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

export function ShaktiPeethaListScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shaktiPeethas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.headerBanner}>
              <Text style={styles.headerTitle}>🌺 Shakti Peethas</Text>
            </View>
            <View style={styles.introCard}>
              <Text style={styles.introText}>
                The Shakti Peethas are sacred shrines associated with the story of Goddess Sati. When Lord Shiva carried Sati's body in grief, Lord Vishnu used his Sudarshana Chakra to cut it into pieces, and each spot where a body part fell became a Shakti Peetha — a seat of divine feminine power.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }: { item: ShaktiPeetha }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ShaktiPeethaDetailScreen', { shaktiPeethaId: item.id })}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.itemEmoji}>🌺</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.city}, {item.state}</Text>
              <Text style={styles.itemDeity}>{item.deityName}</Text>
              <Text style={styles.bodyPart}>Body Part: {item.bodyPart}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#7B2D8B" />
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
    backgroundColor: '#7B2D8B',
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 20,
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
    color: '#7B2D8B',
    marginTop: 2,
    fontWeight: '600',
  },
  bodyPart: {
    fontSize: 11,
    color: Colors.textLight,
    marginTop: 2,
    fontStyle: 'italic',
  },
  separator: {
    height: 10,
  },
});
