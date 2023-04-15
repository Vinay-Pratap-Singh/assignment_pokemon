import Link from "next/link";
import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <Link
      href={{
        pathname: `/details`,
        query: { id: pokemon?.id, name: pokemon?.name },
      }}
    >
      <div className="w-52 shadow-md hover:shadow-cyan-100 p-3 rounded-md space-y-2 cursor-pointer relative hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white">
        <img
          className="w-fit h-28 m-auto"
          src={pokemon?.image}
          alt="pokemon image"
        />
        <h3 className="text-gray-500 text-sm font-semibold">
          {pokemon?.number}
        </h3>
        <h1 className="font-bold text-center text-xl">{pokemon?.name}</h1>
        <div className="flex items-center flex-wrap gap-3">
          {pokemon?.types.map((type) => {
            return (
              <span className="bg-cyan-500 font-medium text-sm py-1 px-3 text-white rounded-sm">
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
