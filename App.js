import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import {useState} from 'react';
import { Button, Box, Center, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login1 from './screens/loginScreen1';
import Login2 from './screens/loginScreen2';
import mainMenu from './screens/mainMenu';
import transfer from './screens/transfer';
import TransferTypes from './screens/transferTypes';
import TransferForm from './screens/transferForm';
import BlikForm from './screens/blikForm';
import GenerateCode from './screens/GenerateCode';
import History from './screens/History';
import TransferDetails from './screens/TransferDetails';
import RegisterUser from './screens/registerUser';
import ScanScreen from './screens/ScanQr';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import * as React from "react";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabsRoot({ navigation }) {
  return (
    

    <Tab.Navigator
    screenOptions={
      {
          "tabBar Active TintColor": "#fff",
          "tabBarlnactiveTintColor": "lightgray",
          "tabBarActiveBackgroundColor": "#c4461c",
          "tabBarlnactiveBackgroundColor": "#b55031",
          "tabBarLabelStyle": {
            "fontSize": 10,
            'fontWeight': 'bold',
            "color": "#ffffff"
          },
          "tabBarStyle": [
            {
              "backgroundColor": '#D45500',
              "display": "flex",
            },
            null
          ]
      }}
    >
      <Tab.Screen
        name="Menu"
        component={mainMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
                <Image
                  style={styles.bottomIcon}
                  resizeMode="cover"
                  source={require('./assets/menu.png')}
                />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Blik"
        component={mainMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
                <Image
                  style={styles.bottomIcon}
                  resizeMode="cover"
                  source={require('./assets/blik.png')}
                />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Przelewy"
        component={transfer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
                <Image
                  style={styles.bottomIcon}
                  resizeMode="cover"
                  source={require('./assets/transfer.png')}
                />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Historia"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
                <Image
                  style={styles.bottomIcon}
                  resizeMode="cover"
                  source={require('./assets/history.png')}
                />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Limity"
        component={mainMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
                <Image
                  style={styles.bottomIcon}
                  resizeMode="cover"
                  source={require('./assets/limits.png')}
                />
            </View>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications
function DrawerRoot({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false}}
    >
      <Drawer.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
    </Drawer.Navigator>
    
  );
}

const StartScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
            <NativeBaseProvider>
                  <Center flex={1} px="3">
                          <Text> Mobilna Aplikacja Banku </Text>
                          <Button onPress={() =>navigation.navigate("login1")}>Użytkownik nie zalogowany</Button>
                          <Button onPress={() => console.log("hello world")}>Użytkownik zalogowany</Button>
                  </Center>
            </NativeBaseProvider>
      </View>
    );
}


export default function App() {
  console.disableYellowBox = true;
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="start" component={StartScreen} />
            <Stack.Screen name="login1" component={Login1} />
            <Stack.Screen name="login2" component={Login2} />
            <Stack.Screen name="mainMenu" component={mainMenu} />
            <Stack.Screen name="DrawerRoot" component={DrawerRoot}/>
            <Stack.Screen name="TransferTypes" component={TransferTypes}/>
            <Stack.Screen name="TransferForm" component={TransferForm}/>
            <Stack.Screen name="BlikForm" component={BlikForm}/>
            <Stack.Screen name="GenerateCode" component={GenerateCode}/>
            <Stack.Screen name="TransferDetails" component={TransferDetails}/>
            <Stack.Screen name="registerUser" component={RegisterUser}/>
            <Stack.Screen name="ScanQr" component={ScanScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    backgroundColor: "#ffffff"
  },
  bottomIcon:{
    width: 40,
    height: 40
  },
  bottomText:{
    color: "#ffffff",
    fontWeight: "bold",
  }
});
