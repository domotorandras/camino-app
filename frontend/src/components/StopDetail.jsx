import React, { useState, useEffect } from "react";

export default function StopDetail({ selected, editMode, handleSave }) {
  const [formData, setFormData] = useState(selected || {});

  useEffect(() => {
    setFormData(selected || {});
  }, [selected]);

  if (!selected)
    return <p className="stop-detail-placeholder">Select a stop to see details</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "latitude" || name === "longitude"
          ? parseFloat(value)
          : value,
    });
  };

  return (
    <div className="stop-detail">
      {editMode ? (
        <div className="stop-edit-form">
          <h3>Edit: {selected.name}</h3>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />

          <div className="coord-fields">
            <div>
              <label htmlFor="latitude">Latitude:</label>
              <input
                id="latitude"
                type="number"
                name="latitude"
                value={formData.latitude || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="longitude">Longitude:</label>
              <input
                id="longitude"
                type="number"
                name="longitude"
                value={formData.longitude || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="save-btn" onClick={() => handleSave(formData)}>
            Save Changes
          </button>
        </div>
      ) : (
        <div className="stop-info">
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          <p>
            <strong>Lat:</strong> {selected.latitude} <br />
            <strong>Lng:</strong> {selected.longitude}
          </p>
        </div>
      )}
    </div>
  );
}
