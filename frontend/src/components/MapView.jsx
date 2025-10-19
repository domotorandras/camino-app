import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapFocus({ selected }) {
  const map = useMap();

  React.useEffect(() => {
    if (selected) {
      map.setView([selected.latitude, selected.longitude], 11, {
        animate: true,
      });
    }
  }, [selected, map]);

  return null;
}

function ClickHandler({ editMode, selected, handleSave }) {
  useMapEvents({
    click(e) {
      if (editMode && selected) {
        const updated = {
          ...selected,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        handleSave(updated);
      }
    },
  });

  return null;
}

export default function MapView({
  coordinates,
  selected,
  setSelected,
  editMode,
  handleSave,
}) {
  const center = [41.9, -8.6];

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {editMode && (
        <div className="click-on-the-map">
          Click on the map to place this point
        </div>
      )}

      
      <MapContainer center={center} zoom={8} style={{ height: "100%", width: "100%" }}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler editMode={editMode} selected={selected} handleSave={handleSave} />

        {coordinates.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            eventHandlers={{ click: () => setSelected(point) }}
          >
            <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.description}
            </Popup>
          </Marker>
        ))}

        <Polyline
          positions={coordinates.map((p) => [p.latitude, p.longitude])}
          pathOptions={{ color: "blue", weight: 4 }}
        />

        <MapFocus selected={selected} />
      </MapContainer>
    </div>
  );
}
