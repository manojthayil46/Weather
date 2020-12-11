import { act } from "react-dom/test-utils";

const initialState = {
    cityName : 'mumbai',
    key : null,
    day : '',
    id  : null,
    description : '',
    temp : '',
    lat : 72.85,
    lon : 19.01,
    pressure : null,
    humidity : null,
    dailyData  : [],
    cityData : '',
    daily : [],
    hourly :[],
    isSearched :false
}


const reducer = (state = initialState,action) => {
    switch(action.type){
    case 'CITY_NAME' : 
        return {
            ...state,
            cityName : action.value.cityName,
            isSearched : action.value.isSearched     
    } 

    case 'WEATHER_DATA':
        return {
            ...state,
        cityData : action.value.name,
        temp     : action.value.main.temp,
        lat      : action.value.coord.lat,
        lon      : action.value.coord.lon,
        pressure : action.value.main.pressure,
        humidity : action.value.main.humidity
        }

    case 'WEATHER_DAILY_DATA':
        console.log(action.value);
        return {
            ...state,
            dailyData : action.value,
            daily : action.value.daily,
            hourly : action.value.hourly
        }


     case 'IS_SEARCHED':
         return {
             ...state,
             isSearched : action.value
         }   

        

}
return state;
};

export default reducer;