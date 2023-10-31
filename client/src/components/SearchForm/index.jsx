import React, { useEffect, useState } from "react";
import TimetableCard from '../../components/TimetableCard';

export default function SearchForm() {
    const [inputValue, setInputValue] = useState('')
    const [search, setSearch] = useState("");
    const [showData, setShowData] = useState([]);


    useEffect(() => {
       async function displaySearch() {
        const response = await fetch(`https://time-table-server.onrender.com/notes/${search}`);
        const data = await response.json();
        setShowData(data);
        }
        displaySearch();

    }, [search])

    function handelInput(e) {        
        setInputValue(e.target.value)
    }

    function handelSubmit(e) {
        e.preventDefault()       
        setSearch(inputValue)
        setInputValue('')
    }



  return (
    <>
      <form onSubmit={handelSubmit}>
            <input type="text" onChange={handelInput} required />
            <input type="submit" value="Search" />
        </form>
        {
            showData.map((show) => <TimetableCard key={show.show.id} show={show.show} />)
        }


    </>
  );
}