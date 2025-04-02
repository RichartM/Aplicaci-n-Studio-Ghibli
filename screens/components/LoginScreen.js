import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const LoginScreen = () => {
  const { login } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isDark = themeMode === 'dark';

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: isDark ? '#ffffff' : '#222222' }]}>
        Bienvenido a Ghibli App
      </Text>

      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>
          Cambiar a modo {isDark ? 'claro' : 'oscuro'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#333' : '#fff' }]}
        placeholder="Correo"
        placeholderTextColor={isDark ? '#aaaaaa' : '#888888'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#333' : '#fff' }]}
        placeholder="Contraseña"
        placeholderTextColor={isDark ? '#aaaaaa' : '#888888'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={[styles.error, { color: 'salmon' }]}>{error}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} color={isDark ? '#8bc34a' : '#388e3c'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 180,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
});

export default LoginScreen;