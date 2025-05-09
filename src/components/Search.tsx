import React from "react";
import ErrorText from "./ErrorText";

interface Props {
  searchInput: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearchSubmit: (e: any) => void;
  fetchRandomPokemon: () => void;
  errorMessage: string | null;
}

const Search = ({
  errorMessage,
  fetchRandomPokemon,
  handleSearchChange,
  handleSearchSubmit,
  searchInput,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Search for Pokémon</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search by name */}
        <div className="flex-1">
          <div className="flex">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Enter Pokémon name"
              className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Random Pokémon button */}
        <button
          onClick={fetchRandomPokemon}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Random Pokémon
        </button>
      </div>
      {/* Error message */}
      {errorMessage && <ErrorText error={errorMessage} />}
    </div>
  );
};

export default Search;
