import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import BirdInfo from "../../components/BirdInfo"
import axios from "axios"
import { Link } from "react-router-dom"

export default function MyListPage({ apiBaseUrl }) {

    const [birds, setBirds] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get(apiBaseUrl + '/user');
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user details', error);
                }
            }
        };
        fetchUserDetails();

    }, []);

    useEffect(() => {
        if (user) {
            fetch(apiBaseUrl + '/users/' + user.id).then(response => response.json())
                .then(responseBody => {
                    setBirds(responseBody.data.birds);
                })
        }
    }, [user])

    if (birds.length < 1) {
        return <div className="p-2 font-bold text-sky-700">
            <h2 className="p-2 text-xl">Welcome {user.name}</h2>
            <p className="p-2 text-lg">You've not added any sightings yet</p>
            <p className="p-2 text-lg">Add a bird to get started</p>
            <Link to="/add"><button className="m-4 p-2 bg-sky-700 text-white">Add Bird</button></Link>
        </div>
    };

    return (
        <div>
            <div className="mb-2 flex justify-between">
                <h1 className="p-2 font-bold text-sky-700 text-xl">{user.name}'s list of birds seen</h1>
                <Link to="/add"><button className="p-2 bg-sky-700 rounded text-white">Add a new sighting</button></Link>
            </div>
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
            <h2 className="p-2 font-bold text-xl text-sky-700">Where {user.name}'s birds were seen</h2>
            <MapContainer className="h-48" center={[51.34751, -2.290]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {birds.map(bird =>
                    <Marker position={[bird.lat, bird.lon]} >
                        <Popup>
                            {bird.name} <br></br>
                            seen at {bird.location}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}