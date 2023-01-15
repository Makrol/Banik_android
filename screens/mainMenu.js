
import { ImageBackground,StyleSheet, Image, View,TouchableOpacity,Text,FlatList} from 'react-native';
import React, { useState,useEffect } from 'react';
import {NativeBaseProvider, ScrollView,HStack } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import {User,userConverter} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs  } from "firebase/firestore";
import{getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
function accountElement(name, money){
  const styles = StyleSheet.create({
    accountText:{
      color:"#ffffff",
      fontSize: 30,
      fontWeight: "bold"
    },
    accountInfo:{
      backgroundColor:"#D45500",
      width:400,
      height:200,
      borderRadius:90,
      alignItems: "center",
      justifyContent: 'center',
      color:"#ffffff",
    }
  });
  return(
    <TouchableOpacity 
    style={styles.accountInfo} 
      >
      <View >
        <Text style={styles.accountText}>{name}</Text>
        <Text style={styles.accountText}>{money} PLN</Text>
      </View>
        
    </TouchableOpacity>
  );
}



export default function Menu({ navigation }){
  const [accountList,setAccountList] = useState([]);
  const [userData,setUserData] = useState(-1);
  
  onAuthStateChanged(auth, (user) => {
    
    if (user) 
    {
      const docRef = doc(db,"users",user.email).withConverter(userConverter);
      getDoc(docRef).then(docSnap=>{
      if (docSnap.exists()) {
          setUserData(docSnap.data().accountNumber);  
      }
      });  
    } 
    else {
      // User is signed out
      // ...
    }  

  });

  useEffect(()=>{
    const q = query(collection(db,"accounts"),where("owner","==",userData));
    getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
        querySnapshot.forEach((doc) => {
              tmpTab.push({ key: doc.id, value: accountElement(doc.data().name,doc.data().money)});
        });
        setAccountList(tmpTab);
    });
          
  },[userData])


  
  
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                        <SafeAreaView>
                          <TouchableOpacity style={styles.settings} onPress={() =>navigation.openDrawer()}>
                            <Image
                                source={require('../assets/setting.png')}
                                style={styles.logoSettings}>
                            </Image>
                          </TouchableOpacity>
                        </SafeAreaView>
                          <FlatList
                            style={styles.lista}
                            horizontal={true}
                            data={accountList}
                            renderItem={({ item }) => <Text>{item.value}</Text>}
                          />
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
  settings:{
    backgroundColor: "#D45500",
    height: 60,
    width:60,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: 'center'
  },
  logoSettings:{
    width: 40,
    height: 40,
    
  },
  lista:{
    marginTop: "50%"
  },
});