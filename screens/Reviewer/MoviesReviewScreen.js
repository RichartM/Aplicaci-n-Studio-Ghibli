import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useFeatured } from '../../contexts/FeaturedContext';

const MoviesReviewScreen = () => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [people, setPeople] = useState([]);
  const [locations, setLocations] = useState([]);

  const { themeMode } = useTheme();
  const { toggleFeatured, featured } = useFeatured();
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
      const resPeople = await fetch('https://ghibliapi.vercel.app/people');
      const dataPeople = await resPeople.json();
      setPeople(dataPeople.filter(p => p.films.includes(movie.url)));

      const resLoc = await fetch('https://ghibliapi.vercel.app/locations');
      const dataLoc = await resLoc.json();
      setLocations(dataLoc.filter(l => l.films.includes(movie.url)));
    } catch (err) {
      setPeople([]);
      setLocations([]);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
    setPeople([]);
    setLocations([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1b1b1b' : '#e8f0e6' }]}>
      <Text style={[styles.header, { color: isDark ? '#fff' : '#2e4a36' }]}>🎬 Películas (Revisor)</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isStarred = featured.find(f => f.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
              onPress={() => openModal(item)}
            >
              <Text style={[styles.title, { color: isDark ? '#fff' : '#2e4a36' }]}>
                {item.title} {isStarred ? '⭐' : ''}
              </Text>
              <Text style={{ color: isDark ? '#ccc' : '#666' }}>Director: {item.director}</Text>
              <Text style={{ color: isDark ? '#ccc' : '#666' }}>Productor: {item.producer}</Text>
              <Text style={{ color: isDark ? '#aaa' : '#444', fontSize: 12, marginTop: 5 }}>
                {item.description.substring(0, 100)}...
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={[styles.modal, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
          {selectedMovie && (
            <>
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>
                Detalles de "{selectedMovie.title}"
              </Text>

              <Image source={{ uri: selectedMovie.image }} style={styles.modalImage} />

              <Text style={[styles.modalSubtitle, { color: isDark ? '#fff' : '#000' }]}>👤 Personajes:</Text>
              {people.length === 0 ? (
                <Text style={{ color: isDark ? '#aaa' : '#444' }}>No hay personajes.</Text>
              ) : (
                people.map(p => (
                  <Text key={p.id} style={{ color: isDark ? '#fff' : '#000' }}>• {p.name}</Text>
                ))
              )}

              <Text style={[styles.modalSubtitle, { color: isDark ? '#fff' : '#000', marginTop: 20 }]}>
                🌍 Ubicaciones:
              </Text>
              {locations.length === 0 ? (
                <Text style={{ color: isDark ? '#aaa' : '#444' }}>No hay ubicaciones.</Text>
              ) : (
                locations.map(l => (
                  <Text key={l.id} style={{ color: isDark ? '#fff' : '#000' }}>• {l.name}</Text>
                ))
              )}

              <View style={{ marginVertical: 20 }}>
                <Button
                  title="Marcar como destacada"
                  onPress={() => toggleFeatured(selectedMovie)}
                  color={isDark ? '#80c080' : '#2e7d32'}
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
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
});

export default MoviesReviewScreen;
