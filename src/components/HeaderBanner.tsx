import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/colors';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';

interface HeaderBannerProps {
  name: string;
  nameHindi: string;
  id: string;
}

export function HeaderBanner({ name, nameHindi, id }: HeaderBannerProps) {
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

  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nameHindi}>{nameHindi}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={28} color={favorited ? '#FFD700' : 'rgba(255,255,255,0.8)'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textWhite,
    lineHeight: 28,
  },
  nameHindi: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  heartButton: {
    paddingLeft: 12,
    paddingTop: 4,
  },
});
