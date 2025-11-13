//Component for individual cell in the game grid

const Cell = ({ value, onClick }) => {
  let cellClasses =
    "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-blue-400/30"; //water color
  let cellContent = null;
  let ariaLabel = "Empty water cell";

  if (value === "S") {
    cellClasses =
      "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500/50"; //ship color
    ariaLabel = "Ship segment";
  } else if (value === "H") {
    cellClasses = "bg-gradient-to-br from-red-600 to-red-700 border-red-500/50"; //hit color
    cellContent = (
      <div
        role="presentation"
        aria-label="Hit marker"
        className="w-full h-full flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-red-200 rounded-full shadow-lg shadow-red-400/50"></div>
      </div>
    );
    ariaLabel = "Hit marker";
  } else if (value === "M") {
    cellClasses =
      "bg-gradient-to-br from-slate-400 to-slate-500 border-slate-300/50"; //miss color
    cellContent = (
      <div
        role="presentation"
        aria-label="Miss marker"
        className="w-full h-full flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
      </div>
    );
    ariaLabel = "Miss marker";
  }

  const isInteractive = typeof onClick === "function";

  return (
    <div
      role={isInteractive ? "button" : "img"}
      aria-label={ariaLabel}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      className={`w-9 h-9 sm:w-11 sm:h-11 border ${cellClasses} cursor-pointer transition-all duration-200 shadow-inner ${
        onClick ? "hover:scale-105 hover:shadow-lg" : ""
      }`}
      onKeyDown={(event) => {
        if (!isInteractive) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {cellContent}
    </div>
  );
};

export default Cell;
