import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";

export default function AddBirdPage({ apiBaseUrl }) {

    const navigate = useNavigate()
    const [birders, setBirders] = useState([])
    const [birderId, setBirderId] = useState(0)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState({})

    console.log(apiBaseUrl)

    useEffect(() => {
        fetch(apiBaseUrl + '/birders').then(response => response.json())
            .then(responseBody => {
                setBirders(responseBody.data)
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
            birder_id: birderId
        }
        
        if (image === '') {
            requestBody.image = '/image.png'
        }

        fetch(apiBaseUrl + '/birds', {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if (response.status === 201) {
                navigate("/bird_added")
            }
            else {
                response.json().then(responseBody => {
                    const nameErrorsString = responseBody.errors.name?.join("\n") ?? ''
                    const imageErrorsString = responseBody.errors.image?.join("\n") ?? ''
                    const birderErrorsString = responseBody.errors.birder_id?.join("\n") ?? ''
                    const locationErrorsString = responseBody.errors.location?.join("\n") ?? ''
                    const latErrorsString = responseBody.errors.lat?.join("\n") ?? ''
                    const lonErrorsString = responseBody.errors.lon?.join("\n") ?? ''
                    alert("Adding the bird failed: \n"
                        + nameErrorsString + "\n"
                        + imageErrorsString + "\n"
                        + birderErrorsString + "\n"
                        + locationErrorsString + "\n"
                        + latErrorsString + "\n",
                        + lonErrorsString)
                })
            }
        })
    }

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        alert(`Clicked at: ${lat}, ${lng}. Close this alert to set the co-ordinates in the form below`);
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
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Add a bird by completing the form below</h1>
            <p className="p-1 text-rose-600"><span>*If you haven't registered your username yet, please </span><Link to="/register" className="text-sky-700">register here</Link><span> before trying to add a bird*</span></p>
            <form className="my-3 flex flex-col gap-4 px-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username (required)</label>
                    <select className="w-fit px-2 py-1" name="birderId" value={birderId} onChange={(event) => setBirderId(event.target.value)}>
                        <option value="0" disabled>Select</option>
                        {birders?.map(birder => <option value={birder.id} key={birder.id}>{birder.username}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name of bird seen (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="name" name="name" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="imageURL">Link to an image (if you have one)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="imageURL" name="imageURL" placeholder="imageURL" value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="location">Name of location of sighting (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="location" name="location" placeholder="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <div>
                    <h2>Click on the map below to add the location co-ordinates for your sighting (this will add a marker to the main map in your list)</h2>
                    <MapContainer center={[51.34751, -2.290]} zoom={4} style={{ height: '500px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapEventsHandler handleMapClick={handleMapClick} />
                    </MapContainer>
                    {/* <div className="flex flex-row gap-1">
                        <div>
                            <label htmlFor="latitude">Latitude co-ords of sighting (if known)</label>
                            <input className="p-1 border border-sky-700 rounded" type="text" id="latitude" name="latitude" placeholder="latitude" value={lat} onChange={(event) => setLat(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitude co-ords of sighting (if known)</label>
                            <input className="p-1 border border-sky-700 rounded" type="text" id="longitude" name="longitude" placeholder="longitude" value={lon} onChange={(event) => setLon(event.target.value)} />
                        </div>
                    </div> */}
                </div>
                <input className="bg-sky-700 text-white p-1" type="submit" value="Add bird" />
            </form>
        </>
    )
}
