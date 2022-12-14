import React from 'react'
import Pokemon from './Pokemon';
import Pagination from './Pagination'

export default function Pokedex(props) {
    const { pokemons, loading, page, setPage, totalPages, notFound } = props;
    const onLeftClickHandler = () => {
        if(page > 0) {
            setPage(page-1)
        }
    }
    const onRightClickHandler = () => {
        if(page+1 !== totalPages){
            setPage(page+1)
        }
    }
  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
            page={page+1}
            totalPages={totalPages}
            onLeftClick={onLeftClickHandler}
            onRightClick={onRightClickHandler}
        />
      </div>
      {notFound && (<div class-name="not-found-text"> Pokemon não encontrado </div>) }
      {loading ? (<div>Carregando...</div>):(
      <div className="pokedex-grid">
          {pokemons && pokemons.map((pokemon, index) => {
            return (
                <Pokemon key={index} pokemon={pokemon}/>
            );
          })}
        </div>)}
    </div>
  )
}
