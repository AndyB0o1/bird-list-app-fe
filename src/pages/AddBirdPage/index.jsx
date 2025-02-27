import axios from "axios"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet"
import { useNavigate } from "react-router-dom"

export default function AddBirdPage({ apiBaseUrl }) {

    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [birdName, setBirdName] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState({})

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                try {
                    const response = await axios.get(apiBaseUrl + '/user')
                    setUser(response.data)
                } catch (error) {
                    console.error('Error fetching user details', error)
                }
            }
        };
        fetchUserDetails()
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestBody = {
            name: birdName,
            image: image,
            location: location,
            lat: coords.lat,
            lon: coords.lng,
            user_id: user.id
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
                    const birdNameErrorsString = responseBody.errors.birdName?.join("\n") ?? ''
                    const imageErrorsString = responseBody.errors.image?.join("\n") ?? ''
                    const userErrorsString = responseBody.errors.user_id?.join("\n") ?? ''
                    const locationErrorsString = responseBody.errors.location?.join("\n") ?? ''
                    const latErrorsString = responseBody.errors.lat?.join("\n") ?? ''
                    const lonErrorsString = responseBody.errors.lon?.join("\n") ?? ''
                    alert("Adding the bird failed: \n"
                        + birdNameErrorsString + "\n"
                        + imageErrorsString + "\n"
                        + userErrorsString + "\n"
                        + locationErrorsString + "\n"
                        + latErrorsString + "\n",
                        + lonErrorsString)
                })
            }
        })
    }

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng
        alert(`Clicked at: ${lat}, ${lng}. Close this alert to set the co-ordinates in the form below`)
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

    return (
        <>
            <h1 className="mt-4 p-2 bg-emerald-600 text-white rounded">Add a bird by completing the form below</h1>
            <form className="my-3 flex flex-col gap-4 px-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <h2 className="text-sky-700">Username: {user.name}</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sky-700" htmlFor="name">Name of bird seen (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="birdName" name="birdName" placeholder="Species of bird seen" value={birdName} onChange={(event) => setBirdName(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sky-700" htmlFor="imageURL">Link to an image (if you have one)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="imageURL" name="imageURL" placeholder="imageURL" value={image} onChange={(event) => setImage(event.target.value)} />
                    <p><a href={"https://unsplash.com/s/photos/" + birdName} target="_blank" className="text-sky-700 font-bold">Click here</a> to search for an image of your bird on Unsplash.com</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sky-700" htmlFor="location">Name of location of sighting (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="location" name="location" placeholder="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <div>
                    <h2 className="text-sky-700">Click on the map below to add the location co-ordinates for your sighting (this will add a marker to the main map in your list)</h2>
                    <MapContainer center={[51.34751, -2.290]} zoom={4} style={{ height: '500px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapEventsHandler handleMapClick={handleMapClick} />
                    </MapContainer>
                </div>
                <input className="bg-emerald-600 text-white p-1" type="submit" value="Add bird" />
            </form>
        </>
    )
}