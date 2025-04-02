import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useFeatured } from '../../contexts/FeaturedContext';

const FeaturedScreen = () => {
  const { featured } = useFeatured();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f0f5f1' }]}>
      <Text style={[styles.header, { color: isDark ? '#fff' : '#2e4a36' }]}>⭐ Destacadas</Text>
      <FlatList
        data={featured}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: isDark ? '#222' : '#fff' }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: isDark ? '#fff' : '#2e4a36' }]}>{item.title}</Text>
              <Text style={{ color: isDark ? '#ccc' : '#666' }}>{item.description.substring(0, 100)}...</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: isDark ? '#aaa' : '#666', textAlign: 'center', marginTop: 20 }}>
            Aún no hay películas destacadas.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default FeaturedScreen;