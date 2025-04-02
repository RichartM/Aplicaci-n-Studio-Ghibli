import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritasContext';

const PelisScreen = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeMode } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();
  const isDark = themeMode === 'dark';

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const openModal = async (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);

    try {
      const res = await fetch('https://ghibliapi.vercel.app/people');
      const people = await res.json();
      const filtered = people.filter(p => p.films.includes(movie.url));
      setCharacters(filtered);
    } catch (err) {
      setCharacters([]);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
    setCharacters([]);
  };

  const isFav = selectedMovie && favorites.some(f => f.id === selectedMovie.id);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1b1b1b' : '#e8f0e6' }]}>
      <Text style={[styles.header, { color: isDark ? '#fff' : '#2e4a36' }]}>🎬 Películas</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const fav = favorites.some(m => m.id === item.id);
          return (
            <TouchableOpacity onPress={() => openModal(item)} style={[styles.item]}>
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.poster} />
                <Text style={{ color: isDark ? '#fff' : '#2e4a36', fontSize: 16, marginLeft: 10 }}>
                  {item.title} ({item.release_date}) {fav ? '⭐' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={[styles.modalContainer, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          {selectedMovie && (
            <>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>
                {selectedMovie.title}
              </Text>
              <Image source={{ uri: selectedMovie.image }} style={styles.modalImage} />
              <Text style={[styles.text, { color: isDark ? '#ccc' : '#333' }]}>🎬 Director: {selectedMovie.director}</Text>
              <Text style={[styles.text, { color: isDark ? '#ccc' : '#333' }]}>🎥 Productor: {selectedMovie.producer}</Text>
              <Text style={[styles.text, { color: isDark ? '#ccc' : '#333', marginTop: 10 }]}>📝 {selectedMovie.description}</Text>

              <Text style={[styles.subheader, { color: isDark ? '#fff' : '#000' }]}>👤 Personajes:</Text>
              {characters.length === 0 ? (
                <Text style={{ color: isDark ? '#aaa' : '#444' }}>Sin personajes disponibles.</Text>
              ) : (
                characters.map(c => (
                  <Text key={c.id} style={{ color: isDark ? '#eee' : '#222' }}>• {c.name}</Text>
                ))
              )}

              <View style={{ marginVertical: 20 }}>
                <Button
                  title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  onPress={() => toggleFavorite(selectedMovie)}
                  color={isDark ? '#8bc34a' : '#2e7d32'}
                />
              </View>
              <Button title="Cerrar" onPress={closeModal} color="#888" />
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  item: { paddingVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  poster: { width: 60, height: 90, borderRadius: 8 },
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalImage: { width: '100%', height: 200, marginBottom: 15, borderRadius: 10 },
  text: { fontSize: 14, marginBottom: 6 },
  subheader: { fontSize: 16, marginTop: 10, fontWeight: 'bold' },
});

export default PelisScreen;
