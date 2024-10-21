import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

export default function ClickableMap() {

  const [coords, setCoords] = useState({})
  const [marker, setMarker] = useState('')

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    alert(`Clicked at: ${lat}, ${lng}. Close this alert to set the co-ordinates in the form below`);
    setCoords({
      lat: lat,
      lng: lng
    })
  };

  console.log(marker)

  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };

  return (
    <div>
      <h2>Click on the map below to add the location co-ordinates for your sighting (this will add a marker to the main map in your list)</h2>
      <MapContainer center={[51.34751, -2.290]} zoom={4} style={{ height: '500px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventsHandler handleMapClick={handleMapClick} />
      </MapContainer>
      <div className="flex flex-row gap-1">
                    <div>
                        <label htmlFor="latitude">Latitude co-ords of sighting (if known)</label>
                        <input className="p-1 border border-sky-700 rounded" type="text" id="latitude" name="latitude" placeholder="latitude" value={coords.lat} onChange={(event) => setLat(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="longitude">Longitude co-ords of sighting (if known)</label>
                        <input className="p-1 border border-sky-700 rounded" type="text" id="longitude" name="longitude" placeholder="longitude" value={coords.lng} onChange={(event) => setLon(event.target.value)} />
                    </div>
                </div>
    </div>
  );
};
