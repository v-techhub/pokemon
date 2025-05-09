/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./assets/loading-pokemon.json";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  // Load team from localStorage on component mount
  useEffect(() => {
    const savedTeam = localStorage.getItem("pokemonTeam");
    if (savedTeam) {
      try {
        setTeam(JSON.parse(savedTeam));
      } catch (e) {
        console.error("Failed to parse saved team:", e);
      }
    }
  }, []);

  // Function to fetch a random Pokémon
  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      // Generate a random ID between 1 and 898 (total number of Pokémon in the API)
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }

      const data = await response.json();
      setPokemon(data);
      setSelectedPokemon(data);
    } catch (err) {
      setError(
        "Error fetching Pokémon: " + (err as { [key: string]: string }).message
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a Pokémon by name
  const fetchPokemonByName = async (name: string): Promise<void> => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      setPokemon(data);
      setSelectedPokemon(data);
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to save team to localStorage
  const saveTeamToStorage = (updatedTeam: any[]) => {
    try {
      localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
    } catch (e) {
      console.error("Failed to save team to localStorage:", e);
    }
  };

  // Function to add a Pokémon to the team
  const addToTeam = () => {
    if (!pokemon) return;

    // Check if team already has 6 Pokémon
    if (team.length >= 6) {
      setError("Your team can only have a maximum of 6 Pokémon!");
      return;
    }

    // Check if Pokémon is already in the team
    if (team.some((p) => p.id === pokemon.id)) {
      setError("This Pokémon is already in your team!");
      return;
    }

    const updatedTeam = [...team, pokemon];
    setTeam(updatedTeam);
    saveTeamToStorage(updatedTeam);
    setError(null);
  };

  // Function to remove a Pokémon from the team
  const removeFromTeam = (id: string) => {
    const updatedTeam = team.filter((p) => p.id !== id);
    setTeam(updatedTeam);
    saveTeamToStorage(updatedTeam);

    if (selectedPokemon && selectedPokemon.id === id) {
      setSelectedPokemon(null);
    }
  };

  // Function to select a Pokémon from the team to view details
  const selectPokemonFromTeam = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setPokemon(pokemon);
  };

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (e: any) => {
    if (e) e.preventDefault();
    fetchPokemonByName(searchInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Pokémon Team Manager
        </h1>
        <div className="text-center text-gray-600 mb-6">
          Your team will be saved automatically and available when you return
        </div>

        {/* Home Section */}
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
                  onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit(e)}
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        {/* Pokémon Details Section */}
        {loading ? (
          <div className="flex justify-center p-6 bg-white rounded-lg shadow-md mb-6">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ height: 400, width: 400 }}
            />
          </div>
        ) : selectedPokemon ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Pokémon Details</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-40">
                <img
                  src={
                    selectedPokemon.sprites.other["official-artwork"]
                      .front_default || selectedPokemon.sprites.front_default
                  }
                  alt={selectedPokemon.name}
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold capitalize mb-2">
                  {selectedPokemon.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p>
                      <span className="font-semibold">ID:</span> #
                      {selectedPokemon.id}
                    </p>
                    <p>
                      <span className="font-semibold">Height:</span>{" "}
                      {selectedPokemon.height / 10}m
                    </p>
                    <p>
                      <span className="font-semibold">Weight:</span>{" "}
                      {selectedPokemon.weight / 10}kg
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Types:</p>
                    <div className="flex gap-2 mt-1">
                      {selectedPokemon.types.map((type: any) => (
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
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {selectedPokemon.stats.map((stat: any) => (
                      <div
                        key={stat.stat.name}
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm font-medium capitalize">
                          {stat.stat.name}:
                        </span>
                        <div className="h-2 bg-gray-200 rounded flex-1">
                          <div
                            className="h-2 bg-blue-500 rounded"
                            style={{
                              width: `${Math.min(100, stat.base_stat)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm">{stat.base_stat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {team.some((p) => p.id === selectedPokemon.id) ? (
                    <button
                      onClick={() => removeFromTeam(selectedPokemon.id)}
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
        ) : null}

        {/* Your Pokémon Team Section */}
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
      </div>
    </div>
  );
};

export default App;
