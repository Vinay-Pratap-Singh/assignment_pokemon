import PokemonCard from "@/components/PokemonCard";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const index = () => {
  const GET_POKEMONS = gql`
    query pokemons($first: Int!) {
      pokemons(first: $first) {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 20 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex items-center justify-center flex-wrap gap-10 m-10 ">
      {data.pokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};

export default index;
