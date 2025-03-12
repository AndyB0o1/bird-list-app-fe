import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useEffect, useState } from "react"

export default function Sightings({ apiBaseUrl }) {

    const [sightings, setSightings] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/map').then(response => response.json())
            .then(responseBody => {
                setSightings(responseBody.data)
            })
    }, [])

    return (
        <div>
            <h2 className="px-1 mb-1 font-bold md:text-xl bg-amber-500 text-amber-950 rounded">Bird sighting locations</h2>
            <MapContainer className="h-32 rounded" center={[51.34751, -2.290]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {sightings.map(sighting =>
                    <Marker position={[sighting.lat, sighting.lon]} >
                        <Popup>
                            {sighting.name} <br />
                            Seen at {sighting.location} <br />
                            by {sighting.user.name}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}