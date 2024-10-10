import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import SightingMarkers from "../SightingMarkers";

export default function Sightings() {

    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/birds').then(response => response.json())
            .then(responseBody => {
                setSightings(responseBody.data)
            })
    }, [])

    return (
        <div>
            <h2 className="p-2">Where birds have been seen</h2>
            <MapContainer className="h-48" center={[51.34751, -2.290]} zoom={7} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {sightings.map(sighting =>
                    <Marker position={[sighting.lat, sighting.lon]}>
                        <Popup>
                            {sighting.name} <br /> Seen by {sighting.birder.username}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}