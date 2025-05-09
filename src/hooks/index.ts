import { useEffect, useState } from "react";
import type { Pokemon } from "../types";
import { saveTeamToStorage } from "../storage";

const URL = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 898 as const;

export const usePokemon = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
      const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
      const response = await fetch(`${URL}/${randomId}`);

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
      const response = await fetch(`${URL}/${name.toLowerCase()}`);

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      setPokemon(data);
      setSelectedPokemon(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a Pokémon to the team
  const addToTeam = () => {
    if (!pokemon) return;

    // Check if team already has 6 Pokémon
    if (team.length >= 6) {
      return setError("Your team can only have a maximum of 6 Pokémon!");
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
  const selectPokemonFromTeam = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setPokemon(pokemon);
  };

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (e: Pokemon) => {
    if (e) e.preventDefault();
    fetchPokemonByName(searchInput);
  };

  return {
    handleSearchChange,
    handleSearchSubmit,
    selectPokemonFromTeam,
    removeFromTeam,
    addToTeam,
    fetchPokemonByName,
    fetchRandomPokemon,
    loading,
    error,
    team,
    searchInput,
    selectedPokemon,
  };
};
