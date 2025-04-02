import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const [people, setPeople] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const res = await fetch('https://ghibliapi.vercel.app/api/people');
      const data = await res.json();
      const filtered = data.filter(p => p.films.includes(movie.url));
      setPeople(filtered);
    };

    const fetchLocations = async () => {
      const res = await fetch('https://ghibliapi.vercel.app/api/locations');
      const data = await res.json();
      const filtered = data.filter(l => l.films.includes(movie.url));
      setLocations(filtered);
    };

    fetchPeople();
    fetchLocations();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Detalles de "{movie.title}"
      </Text>

      <Text style={[styles.subtitle, { color: isDark ? '#fff' : '#000' }]}>Personajes:</Text>
      {people.length === 0 ? <Text style={{ color: isDark ? '#aaa' : '#444' }}>No hay personajes.</Text> : null}
      <FlatList
        data={people}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: isDark ? '#fff' : '#000' }}>• {item.name}</Text>
        )}
      />

      <Text style={[styles.subtitle, { color: isDark ? '#fff' : '#000', marginTop: 20 }]}>Ubicaciones:</Text>
      {locations.length === 0 ? <Text style={{ color: isDark ? '#aaa' : '#444' }}>No hay ubicaciones.</Text> : null}
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: isDark ? '#fff' : '#000' }}>• {item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
});

export default MovieDetailsScreen;