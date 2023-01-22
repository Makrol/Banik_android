import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,Center} from "native-base";
import SetMainAccount from './setMainAccount';


export default function Settings({ navigation }){
   
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    <Center>
                        <Text style={styles.header}>Ustawienia</Text>
                        <View style={styles.content}>
                        <TouchableOpacity onPress={() => navigation.navigate("NewPin")} style={styles.button} >
                                  <Text style={styles.buttonText}>Zmień pin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("SetMainAccount")} style={styles.button} >
                                  <Text style={styles.buttonText}>Wybierz główne konto</Text>
                        </TouchableOpacity>
                        </View>
                    </Center>   
                    </View>
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
    backElement:{
      backgroundColor: "#ffffff",
      width: "100%",
      minHeight: "40%",
      height: "90%",
      borderTopLeftRadius: 38,
      borderTopRightRadius:38,
      position: "absolute",
      alignItems: "center",
      bottom: 0,
      
    },
    content:{
      width: 300,
      marginTop: "10%"
    },
    header:{
      color: "#D45500",
      fontWeight: "bold",
      fontSize: 32,
      padding: "5%"
    },
    button:{
        backgroundColor: "#D45500",
        padding: 20,
        borderRadius: 38,
        width: "100%",
        marginTop: "8%",
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonIcon:{
      width:70,
      height:70
    },
    buttonText:{
      backgroundColor: "#D45500",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: 40,
      width: "100%",
      textAlign: "center"
    },
    vstack:{
    
      width:"100%",
      alignItems: "center",
      height: 300,
      justifyContent: 'center',
  
    },
  });