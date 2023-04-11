import Loader from "@/components/Loader";
import PokemonCard from "@/components/PokemonCard";
import { GET_POKEMONS } from "@/graphql/Query";
import { useQuery } from "@apollo/client";
import React from "react";

const index = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 20 },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-lg font-medium">:( Oops! Something went wrong...</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center flex-wrap gap-10 m-10 ">
      {data.pokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};

export default index;
