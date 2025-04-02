import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useFavorites } from '../../contexts/FavoritasContext';
import { useTheme } from '../../contexts/ThemeContext';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>
      <Text style={[styles.header, { color: isDark ? '#fff' : '#2e4a36' }]}>🎬 Tus Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff', shadowColor: isDark ? '#000' : '#aaa' }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>{item.title}</Text>
              <Text style={{ color: isDark ? '#bbb' : '#666' }}>📅 {item.release_date}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: isDark ? '#bbb' : '#555', textAlign: 'center', marginTop: 20 }}>
            No tienes películas favoritas aún. 🎥
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 15,
    padding: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 12,
    marginRight: 15,
  },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default FavoritesScreen;
