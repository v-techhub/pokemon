import React from "react";
import type { Pokemon } from "../types";

interface Props {
  team: Pokemon[];
  selectedPokemon: Pokemon | null;
  removeFromTeam: (pokemonId: string) => void;
  selectPokemonFromTeam: (pokemon: Pokemon) => void;
}

const Team = ({
  team,
  removeFromTeam,
  selectedPokemon,
  selectPokemonFromTeam,
}: Props): React.JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Your Pokémon Team ({team.length}/6)
      </h2>

      {team.length === 0 ? (
        <p className="text-gray-500">
          Your team is empty. Search for Pokémon to add them to your team!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {team.map((teamPokemon) => (
            <div
              key={teamPokemon.id}
              className={`relative p-2 border rounded cursor-pointer transition ${
                selectedPokemon && selectedPokemon.id === teamPokemon.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => selectPokemonFromTeam(teamPokemon)}
            >
              <button
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromTeam(teamPokemon.id);
                }}
              >
                ×
              </button>

              <img
                src={teamPokemon.sprites.front_default}
                alt={teamPokemon.name}
                className="w-full"
              />
              <p className="text-center capitalize text-sm mt-1 truncate">
                {teamPokemon.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
