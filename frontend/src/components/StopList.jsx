export default function StopList({ coordinates, selected, setSelected }) {
  return (
    <div className="stop-list">
      {coordinates.map((stop) => {
        const isSelected = selected?.id === stop.id;
        return (
          <button
            key={stop.id}
            className={`stop-list-item ${isSelected ? "selected" : ""}`}
            onClick={() => setSelected(stop)}
          >
            {stop.name || "Untitled stop"}
          </button>
        );
      })}
    </div>
  );
}
