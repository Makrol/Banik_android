
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image,FlatList,Dimensions } from 'react-native';
import {NativeBaseProvider,HStack,Stack} from "native-base";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc,orWhere  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";
import {useState,useEffect} from 'react';
import { Select } from "native-base";
import { acc } from 'react-native-reanimated';



export default function History({navigation}){
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('screen').width);
  const[accountNumber,setAccountNumber] = useState("");
  const [accountList,setAccountList] = useState([]);
  const [userData,setUserData] = useState(-1);
  const [tarnsferList,setTransferList] = useState([]);
  onAuthStateChanged(auth, (user) => {
    if (user) 
    {
      const docRef = doc(db,"users",user.email);
      getDoc(docRef).then(docSnap=>{
      if (docSnap.exists()) {
          setUserData(docSnap.data().accountNumber); 
      }
      });  
    } 
    else {
      // User is signed out
    }  

  });

  useEffect(()=>{
    if(userData != -1){
      const q = query(collection(db,"accounts"),where("owner","==",userData));
      getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
        querySnapshot.forEach((doc) => {
              tmpTab.push(doc.id); 
        });
        setAccountList(tmpTab);
        //console.log(tmpTab);
    });
    }
  },[userData])

  useEffect(()=>{
      if(accountNumber!="")
      {
        const conditions = [
          where("fromAccount", "==", accountNumber),
          where("toAccount", "==", accountNumber)
        ];
        const tmpTab=[];
        const tmpTab2=[];
        const q = query(collection(db, "transfers"), where("fromAccount", "==", accountNumber));
        const q2 = query(collection(db,"transfers"),where("toAccount","==",accountNumber));

        getDocs(q).then(querySnapshot=>{
         querySnapshot.forEach((doc) => {
                tmpTab.push({ key: doc.id, value: element(doc.data().title,doc.data().amount,doc.data().type,doc.id) });
         });
        });
        getDocs(q2).then(querySnapshot=>{
          querySnapshot.forEach((doc) => {
                tmpTab.push({ key: doc.id,date: doc.data().operationDate, value: element(doc.data().title,doc.data().amount,doc.data().type,doc.id) });
          });
          tmpTab.sort((a,b)=>{
            if(a.date<b.date)
            {return 1;}
            else
            {return -1}
            return 0;
          })
          setTransferList(tmpTab);
          
        });
      }
  },[accountNumber])
  const onChange = (dimensions) => {
    setScreenWidth(dimensions.screen.width);
  }
  Dimensions.addEventListener('change', onChange);

   
      function  element(title,amount,type,transferId)
      {
          const styles = StyleSheet.create({
              historyIcon:{
              margin:10,
              width:40,
              height: 40
              },
              historyElement:{
              //padding: 20,
              flex: 1,
              
              //flexDirection: 'row',
              alignSelf: 'stretch',
             // width:"100%",
              //backgroundColor:'yellow',
              //flex: 1, justifyContent: 'flex-end'
              width: screenWidth,
              },
             
              mainContent:{
                
              },
              hstack:{
                width:"100%",
                height:"100%",
                
                //backgroundColor:'yellow',
                borderBottomWidth:1,
                
              },
              summ:{
                flex: 1, 
                justifyContent: 'flex-end',
                //backgroundColor:'red',
                width:"100%",
                //alignItems: 'flex-start',
                
              },
              sum:{
                position: 'absolute', 
                top: 0,
                right:0,
                //color:"red",
                //width: "30%",
                //left:"0",
                
                textAlign:"right"
              },
              
             
          });
          return(
              <TouchableOpacity
                                  style={styles.historyElement}
                                  onPress={() => navigation.navigate("TransferDetails",{transferId})}
                                  >
                                  <HStack style={styles.hstack}>
                                      <Image
                                          style={styles.historyIcon}
                                          resizeMode="cover"
                                          source={require("../assets/creditcard.png")}
                                      />
                                      <View style={styles.mainContent}>
                                          <Text>{title}</Text>
                                          <Text>{type}</Text>
                                      </View>
                                      <View style={styles.summ}>
                                      <Text style={styles.sum}>{amount}PLN</Text> 
                                      </View>
                                  </HStack>
              </TouchableOpacity>
          );
      }
  return (
          
          <View style={styles.container}>
              <NativeBaseProvider>
                  
                  <View style={styles.backElement}>
                      <Text style={styles.header}>Historia Operacji</Text>
                      <Select  variant="filled" size="2xl" placeholder="Numer klienta" onValueChange={value => setAccountNumber(value)}>
                         
                             
                                {accountList.map((item, index) => {
                  
                                  return <Select.Item label={item} value={item} key={item} />
                                })}
                             
                              </Select>
                      <FlatList
                          style={styles.lista}
                          horizontal={false}
                          data={tarnsferList}
                          renderItem={({ item }) => <Text style={styles.items}>{item.value}</Text>}
                        />
                     
                  </View>
              
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
  minHeight: "60%",
  height: "95%",
  borderTopLeftRadius: 38,
  borderTopRightRadius:38,
  position: "absolute",
  bottom: 0,
},
content:{

  marginTop: "10%"
},
header:{
  color: "#D45500",
  fontWeight: "bold",
  fontSize: 32,
  padding:'5%',
  alignSelf: 'center',
  
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


lista:{
  width:"100%",
   

},
  items:{
    flexDirection: 'row',
  //width:"100%",
  
 // backgroundColor:"blue",
},


});