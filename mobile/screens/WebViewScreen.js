import React, { useState } from 'react';
import { View, WebView, ActivityIndicator, StyleSheet } from 'react-native';

const WebViewScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>Loading Portfolio...</Text>
        </View>
      )}
      <WebView
        source={{ uri: 'https://aradhana-portfolio.com' }}
        style={styles.webview}
        onLoadEnd={() => setIsLoading(false)}
        startInLoadingState={true}
        renderLoading={() => null} // We handle loading state separately
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginTop: 10,
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WebViewScreen;
