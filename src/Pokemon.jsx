import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
    const [pokemon,setPokemon]=useState([])
    const [loading,setLoading]=useState(true)
    const [search,setSearch]=useState("")
const API="https://pokeapi.co/api/v2/pokemon?limit=124"
    const fetchPokemon= async ()=>{
      try {
        const res = await fetch(API)
        const data= await res.json()
        console.log(data);
        const detailedPokemonData=data.results.map(async(curPokemon)=>{
            const  res=  await fetch(curPokemon.url)
            const data= await res.json()
            // console.log(data);
            return data
        })
        console.log(detailedPokemonData);
        
        const detailedResponses= await Promise.all(detailedPokemonData)
        // console.log(detailedResponses)
        setPokemon(detailedResponses)
        setLoading(false)
        
      } catch (error) {
        console.log(error);
        setLoading(false)
        
      }

    }
    useEffect(()=>{
        fetchPokemon()
    },[])

    const searchData= pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()))

if(loading){
    return(
        <dir>
            <h1>Loading...</h1>
        </dir>
    )
}

  return (
    <>
     <section className="container">
        <header>
            <h1>Let Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" placeholder="Enter pokemon"value={search} onChange={(e)=>setSearch(e.target.value)} /> </div>
        <div>
        <ul className="cards">
        {/* {pokemon.map((curPokemon)=>{ */}
        {searchData.map((curPokemon)=>{
            return(
                <PokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
            )
        })}    
        </ul>     
        </div>
     </section>
    </>
  );
};