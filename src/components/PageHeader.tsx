import React from "react";

const PageHeader = (): React.JSX.Element => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Pokémon Team Manager
      </h1>
      <div className="text-center text-gray-600 mb-6">
        Your team will be saved automatically and available when you return
      </div>
    </>
  );
};

export default PageHeader;
