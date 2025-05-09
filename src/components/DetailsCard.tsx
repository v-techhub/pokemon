/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { Pokemon } from "../types";

interface Props {
  pokemon: Pokemon;
  team: Pokemon[];
  removeFromTeam: (pokemonId: string) => void;
  addToTeam: () => void;
}

function DetailsCard({
  pokemon,
  team,
  removeFromTeam,
  addToTeam,
}: Props): React.JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Pokémon Details</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-40">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <span className="font-semibold">ID:</span> #{pokemon.id}
              </p>
              <p>
                <span className="font-semibold">Height:</span>{" "}
                {pokemon.height / 10}m
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {pokemon.weight / 10}kg
              </p>
            </div>

            <div>
              <p className="font-semibold">Types:</p>
              <div className="flex gap-2 mt-1">
                {pokemon.types.map((type: any) => (
                  <span
                    key={type.type.name}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded capitalize text-sm"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Base Stats:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
              {pokemon.stats.map((stat: any) => (
                <div key={stat.stat.name} className="flex items-center gap-2">
                  <span className="text-sm font-medium capitalize">
                    {stat.stat.name}:
                  </span>
                  <div className="h-2 bg-gray-200 rounded flex-1">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{
                        width: `${Math.min(100, stat.base_stat / 2)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {team.some((p) => p.id === pokemon.id) ? (
              <button
                onClick={() => removeFromTeam(pokemon.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove from Team
              </button>
            ) : (
              <button
                onClick={addToTeam}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add to Team
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
