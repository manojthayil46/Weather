import React, { useState } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@material-ui/icons/Search";

function Search({ getFromSearch }) {
  const [cityName, setCityName] = useState("");
  const [showError, setShowError] = useState(false);


  const handleInput = () => {
    if (cityName === "") {
      setShowError(true);
    } else {
      getFromSearch(cityName,true);
    }
  };


  return (
    <div className = {styles.Search}>
      <div className = "middle">
      <input
        type="text"
        placeholder="Enter A city name to search...."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className={styles.InputBox}
         ></input>

         
         <SearchIcon
          className={styles.header__searchIcon}  
          onClick={handleInput} 
          />
      
      {showError ? <h5>Please Enter a City Name default is Mumbai</h5> : <div></div>}
    </div>
    </div>
  );
}

export default Search;
