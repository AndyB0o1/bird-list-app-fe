import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

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
            <div className="relative flex flex-wrap gap-1 justify-around">
                {birds.map(bird =>
                    <div className="basis-1/5 border border-sky-700 rounded-lg">
                        <p className="id hidden">{bird.id}</p>
                        <h3 className="p-2 h-14 text-sky-700 text-center text-xs font-bold">{bird.name}</h3>
                        <img src={bird.image} alt={bird.name} className="h-16 w-16 object-cover rounded-full mx-auto"></img>
                        <p className="p-2 text-sky-700 text-center text-xs">{bird.location}</p>
                    </div>)}
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