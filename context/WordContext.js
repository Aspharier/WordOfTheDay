import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockWords = [
  {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time',
    example: 'The ephemeral beauty of cherry blossoms makes them all the more special.',
  },
  {
    word: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy or beneficial way',
    example: 'Finding that rare book was pure serendipity.',
  },
  {
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere',
    example: 'Mobile phones have become ubiquitous in modern society.',
  },
  {
    word: 'Mellifluous',
    definition: 'Sweet or musical; pleasant to hear',
    example: 'She spoke in a mellifluous voice that captivated the audience.',
  },
  {
    word: 'Quixotic',
    definition: 'Extremely idealistic; unrealistic and impractical',
    example: 'His quixotic plan to sail around the world in a small boat was met with skepticism.',
  },
  {
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing',
    example: 'Her eloquent speech moved the entire crowd to tears.',
  },
  {
    word: 'Resilience',
    definition: 'The capacity to recover quickly from difficulties; toughness',
    example: 'The resilience of the community after the disaster was remarkable.',
  },
];

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [wordHistory, setWordHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * mockWords.length);
    return {
      ...mockWords[randomIndex],
      date: new Date().toISOString(),
    };
  };

  useEffect(() => {
    const loadSavedWords = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('wordHistory');
        if (savedHistory) {
          setWordHistory(JSON.parse(savedHistory));
        }
        
        const savedCurrentWord = await AsyncStorage.getItem('currentWord');
        if (savedCurrentWord) {
          setCurrentWord(JSON.parse(savedCurrentWord));
        } else {
          fetchNewWord();
        }
      } catch (error) {
        console.error('Error loading saved words:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedWords();
  }, []);

  useEffect(() => {
    const saveWords = async () => {
      try {
        if (wordHistory.length > 0) {
          await AsyncStorage.setItem('wordHistory', JSON.stringify(wordHistory));
        }
        if (currentWord) {
          await AsyncStorage.setItem('currentWord', JSON.stringify(currentWord));
        }
      } catch (error) {
        console.error('Error saving words:', error);
      }
    };

    saveWords();
  }, [wordHistory, currentWord]);

  const fetchNewWord = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newWord = getRandomWord();
      
      setCurrentWord(newWord);
      
      setWordHistory(prevHistory => {
        if (!prevHistory.some(item => item.word === newWord.word)) {
          return [...prevHistory, newWord];
        }
        return prevHistory;
      });
      
      setIsLoading(false);
    }, 500);
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('wordHistory');
      setWordHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <WordContext.Provider
      value={{
        currentWord,
        wordHistory,
        isLoading,
        fetchNewWord,
        clearHistory,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};
