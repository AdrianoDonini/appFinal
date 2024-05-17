import * as React from 'react';
import { Button, View,Text,StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function ProductsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem vindo aos Produtos</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
  return (
    <NavigationContainer 
    screenOptions={{
      drawerStyle: {
        backgroundColor: 'black',
      },
    }}>
      <Drawer.Navigator initialRouteName="Home" style={styles.navContainer}
       screenOptions={{
        drawerStyle: {
          backgroundColor: 'black',
        },
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  }

const styles = StyleSheet.create({
  navContainer:{
    backgroundColor: "Black",
  }
})