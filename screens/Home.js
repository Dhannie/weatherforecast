import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

// Yellow = #efd568
// Blueblack = #1d134b

const data = ["Accra", "France", "Paris", "Tokyo", "Brussels", "Abidjan", "Moscow"]
const icons = {
  Clear:"sunny.png",
  Clouds:"cloudy-day.png",
  Mist:"cloudy-day.png",
  Rain:"rainy.png",
  Snow:"snowy.png"
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home(params) {

  const [weatherData, setWeatherData] = useState({});

  const fetchWeather = (city="Accra") =>{
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8686202e88148f42a7a7340ccfd329e4`
    ).then(res=> res.json())
    .then(res => setWeatherData(res))
    .catch(e => {
      console.log(e);
    })

  }

  useEffect(()=>{
    fetchWeather();
  }, [])


  const renderItem = ({ item }) => (
    <TouchableOpacity 
    onPress={()=>fetchWeather(item)}
    style={{
      padding:20,
      margin:3, 
      backgroundColor:"#ffffff10",
      borderRadius:8, 
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    }}>
    <Text style={{color:"#fff",}}>{item}</Text>
    <Ionicons name={item === weatherData.name?"radio-button-on" :"radio-button-off" } color="white" />
  </TouchableOpacity>
  );

  return (
    <View
      style={styles.main}
    >
      <View style={styles.banner}>
        {/* Date info */}
        <View style={styles.dateBox}>
        <Text style={{fontSize:24, fontWeight:600, color:"#fff"}}>
          Today
        </Text>
        <Text style={{color:"#fff"}}>
          Sat, 3 Aug
        </Text>
        </View>
        {/* Temp and icon */}
        <View style={styles.itemBox}>
          <View style={styles.temp}>
            <Text
            style={{
              fontSize:60,
              color:"#fff",
              fontWeight:700
            }}>{weatherData?.main?.temp?tempConv(weatherData?.main?.temp):"00"}</Text>
            <Text
            style={{
              fontSize:28,
              color:"#efd568",
              fontWeight:500,
              marginTop:16,
              marginLeft:5
            }}>°C</Text>
          </View>
          <Image style={{width:100, height:100, marginRight:32}} source={require(`./../assets/${weatherData?.weather? icons[weatherData.weather[0].main]:"sunny.png" }`)} />
        </View>
        {/* Location and Name */}
        <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Ionicons name="location-outline"  size={18} color="#efd568"/>
            <Text
            style={{color:"#fff", fontSize:16, marginLeft:6}}
            >{weatherData?.name}, {weatherData?.sys?.country}</Text>
        </View>


      </View>

      <SafeAreaView style={styles.container}>
      <FlatList
      contentContainerStyle={{paddingTop:20}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </SafeAreaView>

    </View>
  );
}

const tempConv = temp => Math.floor(temp - 273.15);



const styles = StyleSheet.create({
  main:{
    backgroundColor: "#1d134b",
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 20,
    color:"#fff"
  },
  banner:{
    backgroundColor:"#ffffff10",
    minHeight: windowHeight * 0.25,
    borderRadius: 25,
    padding: 20,
    display:"flex",
    flexDirection:"column",
    marginBottom: 20,
    justifyContent:"space-around"
  },
  itemBox:{
    display:"flex",
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"space-between"
  },
  dateBox:{
    display:"flex",
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
  },
  temp:{
    display:"flex",
    flexDirection:"row",
    alignItems:"flex-start",
    // justifyContent:"space-between"
  }
  
})