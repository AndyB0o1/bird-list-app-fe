import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Sightings() {
    return (
        <div>
            <h2 className="p-2">Where birds have been seen</h2>
            <MapContainer className="h-48" center={[51.34751, -2.290]} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.34751, -2.290]}>
                    <Popup>
                        A Bird. <br /> Seen by....
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}