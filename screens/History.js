
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image,FlatList} from 'react-native';
import {NativeBaseProvider,HStack,Stack} from "native-base";






export default function History({navigation}){
    const data = [
        { key: "1", value: element() },
        { key: "2", value: element() },
        { key: "3", value: element() },
        { key: "4", value: element() },
        { key: "5", value: element() },
        { key: "6", value: element() },
        { key: "7", value: element() },
        { key: "8", value: element() },
        { key: "9", value: element() },
        { key: "10", value: element() },
        { key: "11", value: element() },
        { key: "12", value: element() },
        { key: "13", value: element() },
        { key: "14", value: element() },
        { key: "15", value: element() },
        { key: "16", value: element() },
        { key: "17", value: element() },
        { key: "18", value: element() },
        { key: "19", value: element() },
        { key: "20", value: element() },
      ];
      function  element()
        {
            const styles = StyleSheet.create({
                historyIcon:{
                margin:10,
                width:40,
                height: 40
                },
                historyElement:{

                padding: 20
                },
                sum:{
                textAlign:"right"
                },
                mainContent:{

                }
            });
            return(
                <TouchableOpacity
                                    style={styles.historyElement}
                                    onPress={() => navigation.navigate("TransferDetails")}
                                    >
                                    <HStack>
                                        <Image
                                            style={styles.historyIcon}
                                            resizeMode="cover"
                                            source={require("../assets/creditcard.png")}
                                        />
                                        <View style={styles.mainContent}>
                                            <Text>STACJA PALIW NR 7...</Text>
                                            <Text>*********0045967</Text>
                                            <Text>KONTO PRZEKORZYSTNE</Text>
                                        </View>
                                        <Text style={styles.sum}>-49,84 PLN</Text> 
                                    </HStack>
                                        
                                    
                </TouchableOpacity>
            );
        }
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                        <Text style={styles.header}>Historia Operacji</Text>
                        <FlatList
                            style={styles.lista}
                            horizontal={false}
                            data={data}
                            renderItem={({ item }) => <Text>{item.value}</Text>}
                          />
                       
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
    height: 110,
    width:110,
    borderRadius: 90,
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
    width: 110,
    textAlign: "center"
  },
  vstack:{
    width:"100%",
    alignItems: "center",
    height: 300,
    justifyContent: 'center',

  },
  historyIcon:{
    margin:10,
    width:50,
    height:50
  },
  historyElement:{
    width:"100%"
  },
  sum:{
    width: "30%",
    textAlign:"right"
  },
  lista:{

   
  }
});