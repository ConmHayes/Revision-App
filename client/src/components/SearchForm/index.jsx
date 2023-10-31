import { useEffect, useState } from "react";
import React from "react";

export default function SearchForm() {
const [inputValue, setInputValue] = useState("")
const [searchResults, setSearchResults] = useState([])
  function handleInput(event) {
    console.log(event.target.value);
  }
    useEffect(() => {
        async function searchAPI() {
            const response = await fetch(`to be added&query=${inputValue}`)
            const data = await response.json()
            setSearchResults(data.results)
        }

    }, [inputValue])
  return (
    <form>
      <input type="text" placeholder="Search" onChange={handleInput} />
      <input type="submit" value="search" />
    </form>
  );
}
