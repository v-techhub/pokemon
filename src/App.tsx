import { DetailsCard, Loading, PageHeader, Search, Team } from "./components";
import { usePokemon } from "./hooks";

const App = () => {
  const {
    addToTeam,
    error,
    fetchRandomPokemon,
    handleSearchChange,
    handleSearchSubmit,
    loading,
    removeFromTeam,
    selectPokemonFromTeam,
    searchInput,
    selectedPokemon,
    team,
  } = usePokemon();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <PageHeader />
        <Search
          errorMessage={error}
          fetchRandomPokemon={fetchRandomPokemon}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          searchInput={searchInput}
        />
        {loading ? (
          <Loading />
        ) : selectedPokemon ? (
          <DetailsCard
            addToTeam={addToTeam}
            pokemon={selectedPokemon}
            removeFromTeam={removeFromTeam}
            team={team}
          />
        ) : null}
        <Team
          selectPokemonFromTeam={selectPokemonFromTeam}
          removeFromTeam={removeFromTeam}
          selectedPokemon={selectedPokemon}
          team={team}
        />
      </div>
    </div>
  );
};

export default App;
