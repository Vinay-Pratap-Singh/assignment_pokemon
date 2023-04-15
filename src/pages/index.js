import Loader from "@/components/Loader";
import PokemonCard from "@/components/PokemonCard";
import { GET_POKEMONS } from "@/graphql/Query";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const index = () => {
  const [orgData, setOrgData] = useState([]);
  const [displayPokemon, setDisplayPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const POKEMON_PER_PAGE = 20;
  let startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
  let endIndex =
    startIndex + POKEMON_PER_PAGE > displayPokemon.length
      ? displayPokemon.length
      : startIndex + POKEMON_PER_PAGE;

  // function to set the pokemon data to display
  const setPokemonData = () => {
    const data = [];
    startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    endIndex =
      startIndex + POKEMON_PER_PAGE > orgData.length
        ? orgData.length
        : startIndex + POKEMON_PER_PAGE;
    for (let i = startIndex; i < endIndex; i++) {
      data.push(orgData[i]);
    }
    setDisplayPokemon([...data]);
  };

  // function to load next page data
  const handleNextBtnClick = () => {
    // checking for the last page
    if (currentPage * POKEMON_PER_PAGE >= orgData.length) {
      return;
    }
    setCurrentPage((prevState) => prevState + 1);
    setPokemonData();
  };

  // function to load previous page data
  const handlePrevBtnClick = () => {
    // checking for the first page
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prevState) => prevState - 1);
    setPokemonData();
  };

  // for updating the start and end index to fetch recent data
  useEffect(() => {
    setPokemonData();
  }, [currentPage, orgData]);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 150 },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-lg font-medium">:( Oops! Something went wrong...</p>
      </div>
    );
  if (data && orgData.length === 0) {
    setOrgData([...data.pokemons]);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 bg-gray-100">
      <div className="flex items-center justify-center flex-wrap gap-10">
        {displayPokemon.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      {/* adding the button for pagination */}
      <div className="flex items-center justify-center gap-20 px-5 py-2 shadow-md rounded-md">
        <p className="font-semibold">
          {startIndex + 1} to {startIndex + endIndex} of {orgData.length}
        </p>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => handlePrevBtnClick()}
            className="bg-cyan-500 w-24 py-2 font-semibold text-white rounded-md hover:bg-cyan-400 transition-all duration-300 ease-in-out"
          >
            Previous
          </button>
          <button
            onClick={() => handleNextBtnClick()}
            className="bg-cyan-500 w-24 py-2 font-semibold text-white rounded-md hover:bg-cyan-400 transition-all duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
