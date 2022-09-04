import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex';
import { getPokemons, searchPokemon,getPokemonData } from './api';
import { FavoriteProvider } from "./contexts/favoritesContext";

const favoritesKey = "f"
function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
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
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  useEffect(()=>{
    fetchPokemons();
  },[page])
  
  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    }else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites);
  }
  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
    <Navbar/>
    <Searchbar onSearch={onSearchHandler}/>
    {notFound ? (
          <div class-name="not-found-text"> Pokemon não encontrado </div>
        ) : (<Pokedex pokemons={pokemons} 
    loading={loading}
    page={page}
    setPage={setPage}
    totalPages={totalPages}
    />)}
    </FavoriteProvider>
    
  );
}

export default App;
