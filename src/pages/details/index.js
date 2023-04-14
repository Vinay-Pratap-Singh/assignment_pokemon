import Loader from "@/components/Loader";
import { GET_SINGLE_POKEMON } from "@/graphql/Query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const { id, name } = router?.query;
  let pokemonData = undefined;

  const { loading, error, data } = useQuery(GET_SINGLE_POKEMON, {
    variables: { id: id, name: name },
  });

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-lg font-medium">:( Oops! Something went wrong...</p>
      </div>
    );

  if (data) {
    pokemonData = data.pokemon;
  } else {
    return <Loader />;
  }

  return !pokemonData ? (
    <Loader />
  ) : (
    <div className="w-full h-screen flex items-center justify-center flex-wrap p-10 ">
      <div className="h-full flex items-center justify-center gap-16 shadow-md p-10 rounded-lg">
        <section className="w-1/2 space-y-3 shadow-md p-5 rounded-lg">
          <img
            className="w-60 h-60 m-auto"
            src={pokemonData?.image}
            alt="pokemon image"
          />
          <div className="h-full grid grid-cols-2 font-semibold">
            <p>maxCP : </p>
            <p>{pokemonData.maxCP}</p>
            <p>maxHP : </p>
            <p>{pokemonData.maxHP}</p>
            <p>fleeRate : </p>
            <p>{pokemonData.fleeRate}</p>
            <p>Height : </p>
            <p>
              {pokemonData?.height?.minimum} to {pokemonData?.height?.maximum}
            </p>
            <p>Weight</p>
            <p>
              {pokemonData?.weight?.minimum} to {pokemonData?.weight?.maximum}
            </p>
          </div>
        </section>

        <section className="w-1/2 h-full self-start space-y-3 shadow-md p-5 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">{pokemonData?.name}</h1>
            <div>
              <h2 className="text-lg font-semibold">
                Number : <span>{pokemonData?.number}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Classification : <span>{pokemonData?.classification}</span>
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {/* for resistant */}
            <section className="space-y-2">
              <h2 className="font-bold text-lg">Resistant</h2>
              <div className="flex items-center flex-wrap gap-2">
                {pokemonData.resistant &&
                  pokemonData?.resistant.map((element) => {
                    return (
                      <span className="bg-green-500 font-semibold px-3 py-1 text-sm text-white rounded-md">
                        {element}
                      </span>
                    );
                  })}
              </div>
            </section>

            {/* for types */}
            <section className="space-y-2">
              <h2 className="font-bold text-lg">Types</h2>
              <div className="flex items-center flex-wrap gap-2">
                {pokemonData.types &&
                  pokemonData.types.map((element) => {
                    return (
                      <span className="bg-green-500 font-semibold px-3 py-1 text-sm text-white rounded-md">
                        {element}
                      </span>
                    );
                  })}
              </div>
            </section>

            {/* for weeknesses */}
            <section className="space-y-2">
              <h2 className="font-bold text-lg">Weeknesses</h2>
              <div className="flex items-center flex-wrap gap-2">
                {pokemonData.weaknesses &&
                  pokemonData?.weaknesses.map((element) => {
                    return (
                      <span className="bg-green-500 font-semibold px-3 py-1 text-sm text-white rounded-md">
                        {element}
                      </span>
                    );
                  })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default index;
