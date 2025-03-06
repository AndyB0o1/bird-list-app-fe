import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import { useNavigate, useParams } from "react-router-dom"

export default function EditBirdPage({ apiBaseUrl }) {

    const navigate = useNavigate()
    const [bird, setBird] = useState([])
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState({})
    const [birdLat, setBirdLat] = useState(0)
    const [birdLon, setBirdLon] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        fetch(apiBaseUrl + '/birds/' + id).then(response => response.json())
            .then(responseBody => {
                setBird(responseBody.data);
                setBirdLat(responseBody.data.lat)
                setBirdLon(responseBody.data.lon)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = {
            name: name,
            image: image,
            location: location,
            lat: coords.lat,
            lon: coords.lng,
            user_id: bird.user_id
        }

        fetch(apiBaseUrl + '/birds/' + id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            navigate("/bird_edited")
        })
    }

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng
        alert(`Clicked at: ${lat}, ${lng}. Close this alert to set the new co-ordinates in the form below`);
        setCoords({
            lat: lat,
            lng: lng
        }
        )
    }

    const MapEventsHandler = ({ handleMapClick }) => {
        useMapEvents({
            click: (e) => handleMapClick(e),
        })
        return null
    }

    const handleClick = e => {
        e.preventDefault()
        setIsOpen(true)
    }

    const handleYes = e => {
        e.preventDefault()
        fetch(apiBaseUrl + '/birds/' + id, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then(response => {
            alert('Sighting deleted')
            navigate("/mylist")
    })
}

    const handleNo = e => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <div className="relative">
            {isOpen &&
                <div className="absolute inset-x-6 md:inset-x-32 top-10 h-16 w-72 bg-amber-500 rounded-t">
                    <p className="p-1 font-bold text-amber-950 text-center">Are you sure?</p> 
                    <p className="p-1 font-bold text-amber-950 text-center">This cannot be undone</p>
                    <div className="flex justify-around bg-amber-500 rounded-b">
                        <button className="px-2 my-2 bg-amber-950 text-white text-sm rounded" type="submit" onClick={handleYes}>Yes</button>
                        <button className="px-2 my-2 bg-amber-950 text-white text-sm rounded" type="submit" onClick={handleNo}>No, cancel</button>
                    </div>
                </div>}
                <div className="flex justify-between">
                    <h1 className="lg:mt-4 p-1 lg:p-2 bg-amber-500 rounded text-xs lg:text-base text-amber-950">Edit your bird using the form below</h1>
                    <button className="lg:mt-4 p-1 lg:p-2 bg-red-500 text-xs lg:text-base text-white rounded" type="submit" onClick={handleClick}>Delete sighting</button>
                </div>
                <form className="my-3 flex flex-col gap-4 px-3 text-sm lg:text-base text-amber-950" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name of bird seen</label>
                        <input className="p-1 border border-amber-500 rounded" type="text" id="name" name="name" placeholder={bird.name} value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="imageURL">Link to an image</label>
                        <input className="p-1 border border-amber-500 rounded" type="text" id="imageURL" name="imageURL" placeholder={bird.image} value={image} onChange={(event) => setImage(event.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="location">Name of location of sighting</label>
                        <input className="p-1 border border-amber-500 rounded" type="text" id="location" name="location" placeholder={bird.location} value={location} onChange={(event) => setLocation(event.target.value)} />
                    </div>
                    <div>
                        <h2 className="text-amber-950">Click on the map below to change the location co-ordinates for your sighting</h2>
                        {birdLat &&
                            <MapContainer center={[birdLat, birdLon]} zoom={8} style={{ height: '500px' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[birdLat, birdLon]} >
                                    <Popup>
                                        {bird.name} <br></br>
                                        seen at {bird.location}
                                    </Popup>
                                </Marker>
                                <MapEventsHandler handleMapClick={handleMapClick} />
                            </MapContainer>
                        }
                    </div>
                    <input className="bg-amber-500 text-amber-950 p-1 rounded" type="submit" value="Save changes" />
                </form>
            </div>
    )
}