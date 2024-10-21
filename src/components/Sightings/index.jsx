import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function Sightings({ apiBaseUrl }) {

    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch(apiBaseUrl + '/map').then(response => response.json())
            .then(responseBody => {
                setSightings(responseBody.data)
            })
    }, [])

    return (
        <div>
            <h2 className="p-2 font-bold text-xl text-sky-700">Where birds have been seen</h2>
            <MapContainer className="h-48" center={[51.34751, -2.290]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {sightings.map(sighting =>
                    <Marker position={[sighting.lat, sighting.lon]} >
                        <Popup>
                            {sighting.name} <br /> Seen by {sighting.birder.username}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}