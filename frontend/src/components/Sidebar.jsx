import React from "react";
import StopList from "./StopList";
import StopDetail from "./StopDetail";

export default function Sidebar({
  coordinates,
  selected,
  setSelected,
  editMode,
  setEditMode,
  handleAdd,
  handleDelete,
  handleSave,
}) {
  return (
    <aside className="sidebar">
      <h2>El Camino Planner</h2>
      <div className="sidebar-buttons">

        <button onClick={handleAdd}>Add New Point</button>

        {selected && <button onClick={handleDelete}>Delete Point</button>}

        {editMode && selected && (<button onClick={() => handleSave(selected)}>Save</button>)}

        {selected && (
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel Edit" : "Edit Point"}
          </button>
        )}
        
      </div>

      <StopList
        coordinates={coordinates}
        selected={selected}
        setSelected={setSelected}
      />

      <StopDetail
        selected={selected}
        editMode={editMode}
        handleSave={handleSave}
      />
    </aside>
  );
}
