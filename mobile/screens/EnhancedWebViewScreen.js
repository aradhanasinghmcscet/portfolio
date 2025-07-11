import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { IconButton, Text, Snackbar } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const { width } = Dimensions.get('window');

const EnhancedWebViewScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNavigationStateChange = (navState) => {
    if (navState.url) {
      // Handle external links
      if (!navState.url.includes('aradhana-portfolio.com')) {
        WebBrowser.openBrowserAsync(navState.url);
        return false;
      }
      return true;
    }
    return true;
  };

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'snackbar') {
        setSnackbarMessage(data.message);
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const handleBackButton = () => {
    if (Platform.OS === 'android') {
      return true; // Handle back button in WebView
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <IconButton
          icon="menu"
          onPress={() => {
            // Implement drawer or menu
          }}
          style={styles.toolbarButton}
        />
        <Text style={styles.toolbarTitle}>Portfolio</Text>
        <View style={styles.toolbarSpacer} />
        <IconButton
          icon="theme-light-dark"
          onPress={() => {
            // Implement theme toggle
          }}
          style={styles.toolbarButton}
        />
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Portfolio...</Text>
        </View>
      )}

      <WebView
        source={{ uri: 'https://aradhana-portfolio.com' }}
        style={styles.webview}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        startInLoadingState={true}
        renderLoading={() => null}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsBackForwardNavigationGestures={true}
        onShouldStartLoadWithRequest={handleNavigationStateChange}
      />

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setShowSnackbar(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2196f3',
  },
  toolbarButton: {
    marginHorizontal: 8,
  },
  toolbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  toolbarSpacer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnhancedWebViewScreen;
