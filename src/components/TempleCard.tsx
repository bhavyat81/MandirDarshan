import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/colors';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';

interface TempleCardProps {
  id: string;
  name: string;
  nameHindi: string;
  city: string;
  state: string;
  deity: string;
  description: string;
  category?: string[];
  onPress: () => void;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  jyotirlinga: { label: 'Jyotirlinga', color: '#FF6B00' },
  shaktiPeetha: { label: 'Shakti Peetha', color: '#8B0000' },
  charDham: { label: 'Char Dham', color: '#2E7D32' },
};

export function TempleCard({ id, name, nameHindi, city, state, deity, description, category, onPress }: TempleCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(id).then(setFavorited);
  }, [id]);

  const toggleFavorite = async () => {
    if (favorited) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
    setFavorited(!favorited);
  };

  const specialCategories = (category || []).filter((c) => c in CATEGORY_LABELS);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.nameHindi} numberOfLines={1}>{nameHindi}</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color={favorited ? '#E53935' : Colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={14} color={Colors.textLight} />
        <Text style={styles.location}>{city}, {state}</Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="flower-outline" size={14} color={Colors.primary} />
        <Text style={styles.deity}>{deity}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>{description}</Text>

      {specialCategories.length > 0 && (
        <View style={styles.badgeRow}>
          {specialCategories.map((cat) => (
            <View key={cat} style={[styles.badge, { backgroundColor: CATEGORY_LABELS[cat].color }]}>
              <Text style={styles.badgeText}>{CATEGORY_LABELS[cat].label}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  nameHindi: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 1,
  },
  heartButton: {
    paddingLeft: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: Colors.textLight,
    marginLeft: 4,
  },
  deity: {
    fontSize: 13,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 18,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    color: Colors.textWhite,
    fontWeight: '600',
  },
});
