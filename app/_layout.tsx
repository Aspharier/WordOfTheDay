import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WordProvider } from '../context/WordContext';

export default function RootLayout() {
  return (
    <WordProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#5048E5',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#5048E5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Word of the Day',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="HistoryScreen"
          options={{
            title: 'Word History',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'list' : 'list-outline'} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </WordProvider>
  );
}
