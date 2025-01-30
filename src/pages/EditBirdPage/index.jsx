import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBirdPage({ apiBaseUrl }) {

    const navigate = useNavigate()
    const [bird, setBird] = useState([])
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState({})

    const { id } = useParams()

    useEffect(() => {
        fetch(apiBaseUrl + '/birds/' + id).then(response => response.json())
            .then(responseBody => {
                setBird(responseBody.data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
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
        const { lat, lng } = e.latlng;
        alert(`Clicked at: ${lat}, ${lng}. Close this alert to set the new co-ordinates in the form below`);
        setCoords({
            lat: lat,
            lng: lng
        }
        );
    };

    const MapEventsHandler = ({ handleMapClick }) => {
        useMapEvents({
            click: (e) => handleMapClick(e),
        });
        return null;
    };

    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Edit your bird using the form below</h1>
            <form className="my-3 flex flex-col gap-4 px-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name of bird seen</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="name" name="name" placeholder={bird.name} value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="imageURL">Link to an image</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="imageURL" name="imageURL" placeholder={bird.image} value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="location">Name of location of sighting</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="location" name="location" placeholder={bird.location} value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <div>
                    <h2>Click on the map below to change the location co-ordinates for your sighting</h2>
                    <MapContainer center={[51.34751, -2.290]} zoom={4} style={{ height: '500px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapEventsHandler handleMapClick={handleMapClick} />
                    </MapContainer>
                </div>
                <input className="bg-sky-700 text-white p-1" type="submit" value="Save changes" />
            </form>
        </>
    )
}