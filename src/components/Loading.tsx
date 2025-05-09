import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading-pokemon.json";

const Loading = () => {
  return (
    <div className="flex justify-center p-6 bg-white rounded-lg shadow-md mb-6">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ height: 400, width: 400 }}
      />
    </div>
  );
};

export default Loading;
