import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnhancedWebViewScreen from './screens/EnhancedWebViewScreen';
import DrawerMenu from './screens/DrawerMenu';
import AnalyticsScreen from './screens/AnalyticsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerMenu {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976d2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="Portfolio"
          component={EnhancedWebViewScreen}
          options={{
            title: 'Aradhana Portfolio',
          }}
        />
        <Drawer.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            title: 'Portfolio Analytics',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function EnhancedWebViewScreen() {
  return (
    <WebView
      source={{ uri: 'https://aradhana-portfolio.com' }}
      style={{ flex: 1 }}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={{ marginTop: 10 }}>Loading Portfolio...</Text>
        </View>
      )}
    />
  );
}

export default App;
