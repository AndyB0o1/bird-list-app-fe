import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import BirdInfo from "../../components/BirdInfo"

export default function MyListPage({ apiBaseUrl }) {

    const [birds, setBirds] = useState([])
    const [birder, setBirder] = useState('')

    useEffect(() => {
        fetch(apiBaseUrl + '/birders/1').then(response => response.json())
            .then(responseBody => {
                setBirder(responseBody.data.username)
                setBirds(responseBody.data.birds)
            })
    }, [])

    return (
        <div>
            <h1 className="p-2 font-bold text-sky-700 text-xl">{birder}'s list of birds seen</h1>
            <div className="flex flex-wrap gap-1 justify-around">
                {birds.map(bird => <BirdInfo
                    id={bird.id}
                    key={bird.id}
                    name={bird.name}
                    image={bird.image}
                    location={bird.location}
                    lat={bird.lat}
                    lon={bird.lon}
                />)}
            </div>
            <h2 className="p-2 font-bold text-xl text-sky-700">Where {birder}'s birds were seen</h2>
            <MapContainer className="h-48" center={[51.34751, -2.290]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {birds.map(bird =>
                    <Marker position={[bird.lat, bird.lon]} >
                        <Popup>
                            {bird.name}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}