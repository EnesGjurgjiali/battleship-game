//Component for individual cell in the game grid

const Cell = ({ value, onClick }) => {
  let cellColor = "bg-blue-500 hover:bg-blue-500"; //water color

  if (value === "S") cellColor = "bg-gray-400"; //ship color
  if (value === "H") cellColor = "bg-red-600"; //hit color
  if (value === "M") cellColor = "bg-sky-300"; //miss color
  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 sm:w-10 sm:h-10 border border-gray-700 ${cellColor} cursor-pointer transition-colors`}
    ></div>
  );
};

export default Cell;
