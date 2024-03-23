import React, { useEffect, useState } from "react";
import searchIcon from "/searchicon.svg";
import "./Searchbar.css";
import { useFileHandle } from "../context/Context";

const Searchbar = () => {
  const { receivedData, setSearchDataOnTable,tableUpdated } = useFileHandle();
  const filterEmails = receivedData?.map((item) => item && item.Email);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [paraclicked, setParaclicked] = useState(false);

useEffect(()=>{
setQuery("")
setSuggestions([])
setParaclicked(false)
}, [tableUpdated])


  useEffect(() => {
    function handleQuery(query) {
      const filteredQuery = filterEmails.filter((item) =>
        item.toLowerCase().split(" ").join("").includes(query.toLowerCase())
          ? item
          : null
      );
      setSuggestions(filteredQuery);
    }

    handleQuery(query);
  }, [query]);

  useEffect(() => {
    if (paraclicked) {
      setSuggestions([]);
    }

    return () => setParaclicked(false);
  }, [paraclicked]);

function handleEnterQuery(e){
    if(e.key ==="Enter" && query !==""){
        const userdata = receivedData.find(item=>item.Email === query)
        setSearchDataOnTable(prev=>({...prev, state: true, value: [userdata]}))
    }

}



  return (
    <div className="nav-input-area">
      <div className="input-search-bar">
        <input
          type="text"
          id="nav-input"
          placeholder="Search by Email Id....."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyUp={handleEnterQuery}
        
        />
        <img src={searchIcon} alt="search icon image" />
      </div>

      {suggestions !== null && query !== "" ? (
        <div className="float-search" onMouseLeave={()=>setParaclicked(true)}>
          {suggestions.map((item, index) => {
            return (
              <p
                key={item}
                onClick={(e) => {
                  setParaclicked(true);
                  setQuery(e.target.textContent);
                  
                }}
                
              >
                {item}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Searchbar;
