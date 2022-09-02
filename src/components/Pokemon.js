import React from 'react'

export default function Pokemon(props) {
    const {key,pokemon} = props;
  return (
    <div className="pokemon-card">
    <div className="pokemon-image-container">
        <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image"/>
    </div>
    <div className="card-body">
        <div className="card-top">
            <h3> {pokemon.name}</h3>
            <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
            <div className="pokemon-type">
                {pokemon.types.map((type, index) => {
                    return (
                        <div key={index} className="pokemon-type-text">{type.type.name}</div>
                    )
                })}
            </div>
            
        </div>
    </div>
</div>
  )
}