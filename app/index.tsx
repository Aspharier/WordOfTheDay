import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { WordContext } from '../context/WordContext';

const HomeScreen = () => {
  const { currentWord, fetchNewWord, isLoading } = useContext(WordContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#5048E5" />
      ) : currentWord ? (
        <View style={styles.wordContainer}>
          <Text style={styles.date}>{formatDate(currentWord.date)}</Text>
          <Text style={styles.word}>{currentWord.word}</Text>
          <Text style={styles.definition}>{currentWord.definition}</Text>
          <Text style={styles.example}>{currentWord.example}</Text>
        </View>
      ) : (
        <Text style={styles.noWord}>No word available. Tap New Word to get started.</Text>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={fetchNewWord}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'New Word'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  wordContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  date: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  definition: {
    fontSize: 18,
    marginBottom: 15,
    color: '#444',
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  noWord: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5048E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
