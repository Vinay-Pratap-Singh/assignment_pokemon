import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const pokemon = router.query;

  if (!pokemon) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-wrap p-10 ">
      <div className="h-full flex items-center justify-center gap-16 shadow-md p-10 rounded-lg">
        <section className="w-1/2 space-y-3 shadow-md p-5 rounded-lg">
          <img
            className="w-60 h-60 m-auto"
            src={pokemon?.image}
            alt="pokemon image"
          />
          <div className="h-full grid grid-cols-2 font-semibold">
            <p>maxCP : </p>
            <p>{pokemon.maxCP}</p>
            <p>maxHP : </p>
            <p>{pokemon.maxHP}</p>
            <p>fleeRate : </p>
            <p>{pokemon.fleeRate}</p>
            <p>Height : </p>
            <p>0.79m to 0.61m</p>
            <p>Weight</p>
            <p>6.04kg to 7.76kg</p>
          </div>
        </section>

        <section className="w-1/2 h-full self-start space-y-3 shadow-md p-5 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">{pokemon?.name}</h1>
            <div>
              <h2 className="text-lg font-semibold">
                Number : <span>{pokemon?.number}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Classification : <span>{pokemon?.classification}</span>
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {/* for resistant */}
            <section className="space-y-2">
              <h2 className="font-bold text-lg">Resistant</h2>
              <div className="flex items-center flex-wrap gap-2">
                {pokemon.resistant &&
                  pokemon?.resistant.map((element) => {
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
                {pokemon.types &&
                  pokemon.types.map((element) => {
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
                {pokemon.weaknesses &&
                  pokemon?.weaknesses.map((element) => {
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
