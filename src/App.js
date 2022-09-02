import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex';
import { getPokemons, searchPokemon,getPokemonData } from './api';

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const itensPerPage = 60;
  const fetchPokemons = async ()=>{
    try{
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        await getPokemonData('https://pokeapi.co/api/v2/language/13/')
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    }
    catch(error){
      console.log("fetchPokemons error:", error)
    }
  }
  useEffect(()=>{
    fetchPokemons();
  },[page])
  const onSearchHandler = async (pokemon) => {
    const result = await searchPokemon(pokemon)
    setPokemons(result)
  }
  return (
    <>
    <Navbar/>
    <Searchbar onSearch={onSearchHandler}/>
    <Pokedex pokemons={pokemons} 
    loading={loading}
    page={page}
    setPage={setPage}
    totalPages={totalPages}
    />
    </>
    
  );
}

export default App;
