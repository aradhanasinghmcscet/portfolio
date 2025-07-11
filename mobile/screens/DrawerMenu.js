import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Text, List, Divider } from 'react-native-paper';

const DrawerMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Drawer.Section title="Portfolio">
        <List.Item
          title="Home"
          left={(props) => <List.Icon {...props} icon="home" />}
          onPress={() => navigation.navigate('Home')}
        />
        <List.Item
          title="Skills"
          left={(props) => <List.Icon {...props} icon="brain" />}
          onPress={() => navigation.navigate('Skills')}
        />
        <List.Item
          title="Experience"
          left={(props) => <List.Icon {...props} icon="briefcase" />}
          onPress={() => navigation.navigate('Experience')}
        />
        <List.Item
          title="Projects"
          left={(props) => <List.Icon {...props} icon="code-tags" />}
          onPress={() => navigation.navigate('Projects')}
        />
        <List.Item
          title="Contact"
          left={(props) => <List.Icon {...props} icon="email" />}
          onPress={() => navigation.navigate('Contact')}
        />
      </Drawer.Section>

      <Divider />

      <Drawer.Section title="Settings">
        <List.Item
          title="Dark Mode"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          onPress={() => {
            // Implement theme toggle
          }}
        />
        <List.Item
          title="Font Size"
          left={(props) => <List.Icon {...props} icon="text-size" />}
          onPress={() => {
            // Implement font size adjustment
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerMenu;
