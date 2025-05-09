import type { Pokemon } from "../types";

export const saveTeamToStorage = (updatedTeam: Pokemon[]) => {
  try {
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
  } catch (e) {
    console.error("Failed to save team to localStorage:", e);
  }
};
