import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Image, View,TouchableOpacity  } from 'react-native';
import { Text, Center, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {buttonStyle} from '../shered/Styles.js';


export default function Login1({ navigation }){
    return (
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                      <Center>
                        <Image
                            source={require('../assets/banklogo.png')}
                            style={styles.logo}>
                        </Image>
                        <TouchableOpacity 
                        onPress={() =>navigation.navigate("login2")}
                        style={buttonStyle.buttonOrange}>
                          <Text style={buttonStyle.buttonOrangeText}>Logowanie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() =>navigation.navigate("registerUser")}
                        style={buttonStyle.buttonWhite}>
                          <Text style={buttonStyle.buttonWhiteText}>Rejestracja</Text>
                        </TouchableOpacity>
                      </Center>
                        

                    </ImageBackground>
                    
                </NativeBaseProvider>
              </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
      width: '100%',
      height: '100%'
  },
  logo:{
    width: 220,
    height: 220,
    marginTop: "20%"
  }

});