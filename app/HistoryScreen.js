import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { WordContext } from '../context/WordContext';

const HistoryScreen = () => {
  const { wordHistory, clearHistory } = useContext(WordContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your word history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: clearHistory,
          style: 'destructive',
        },
      ]
    );
  };

  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.definition}>{item.definition}</Text>
      <Text style={styles.example}>{item.example}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {wordHistory.length > 0 ? (
        <>
          <FlatList
            data={[...wordHistory].reverse()}
            keyExtractor={(item, index) => `${item.word}-${index}`}
            renderItem={renderWordItem}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Text style={styles.clearButtonText}>Clear History</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Your word history is empty.
          </Text>
          <Text style={styles.emptySubText}>
            Words will appear here after you view them on the home screen.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  wordItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  date: {
    color: '#666',
    marginBottom: 8,
    fontSize: 14,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  definition: {
    fontSize: 16,
    marginBottom: 12,
    color: '#444',
  },
  example: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default HistoryScreen;
