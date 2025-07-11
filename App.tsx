import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import ExperienceScreen from './src/screens/ExperienceScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#2196f3',
              tabBarInactiveTintColor: '#666',
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#2196f3',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <HomeIcon color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Skills" 
              component={SkillsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <SkillsIcon color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Experience" 
              component={ExperienceScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <ExperienceIcon color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Projects" 
              component={ProjectsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <ProjectsIcon color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Contact" 
              component={ContactScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <ContactIcon color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
