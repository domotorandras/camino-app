import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5050/api/coordinates");
        if (!res.ok) throw new Error("Failed to fetch coordinates");
        const data = await res.json();
        setCoordinates(data);
      } catch (err) {
        console.error("Error fetching coordinates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

  const handleAdd = async () => {
    const lastPoint = coordinates[coordinates.length - 1];


    const newPoint = {
      name: `New Stop`,
      description: "Click on the map to adjust location",
      latitude: lastPoint ? lastPoint.latitude : 41.1579,
      longitude: lastPoint ? lastPoint.longitude : -8.6291,
    };

    try {
      const res = await fetch("http://127.0.0.1:5050/api/coordinates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPoint),
      });

      const saved = await res.json();

      setCoordinates((prev) => [...prev, saved]);
      setSelected(saved);
      setEditMode(true);
    } catch (err) {
      console.error("Error adding new point:", err);
    }
  };

  const handleSave = async (updatedPoint) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5050/api/coordinates/${updatedPoint.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPoint),
        }
      );

      const saved = await res.json();

      setCoordinates((prev) =>
        prev.map((p) => (p.id === saved.id ? saved : p))
      );

      setSelected(saved);
      setEditMode(false);
    } catch (err) {
      console.error("Error saving point:", err);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;

    try {
      await fetch(`http://127.0.0.1:5050/api/coordinates/${selected.id}`, {
        method: "DELETE",
      });

      setCoordinates(coordinates.filter((p) => p.id !== selected.id));
      setSelected(null);
      setEditMode(false);
    } catch (err) {
      console.error("Error deleting point:", err);
    }
  };


  if (loading) return <p>Loading Camino stops...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <Sidebar
        coordinates={coordinates}
        selected={selected}
        setSelected={setSelected}
        editMode={editMode}
        setEditMode={setEditMode}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />

      <MapView
        coordinates={coordinates}
        selected={selected}
        setSelected={setSelected}
        editMode={editMode}
        handleSave={handleSave}
      />
    </div>
  );
}
