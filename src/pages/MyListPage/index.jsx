import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import BirdInfo from "../../components/BirdInfo"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function MyListPage({ apiBaseUrl }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [birds, setBirds] = useState([])
    const [filteredBirds, setFilteredBirds] = useState(birds)
    const [user, setUser] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token')
            setLoading(false)
            if (!token) {
                navigate("/login")
            }
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                try {
                    setLoading(true)
                    const response = await axios.get(apiBaseUrl + '/user')
                    setUser(response.data)
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching user details', error)
                }
            }
        };
        fetchUserDetails()
    }, [])

    useEffect(() => {
        if (user) {
            fetch(apiBaseUrl + '/users/' + user.id).then(response => response.json())
                .then(responseBody => {
                    setLoading(true)
                    setBirds(responseBody.data.birds)
                    setFilteredBirds(responseBody.data.birds)
                    setLoading(false)
                })
        }
    }, [user])

    const handleSearch = e => {

        setSearchValue(e.target.value);
        if (searchValue) {
            const filteredData = birds.filter(item => {
                return Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            })
            setFilteredBirds(filteredData);
        } else {
            setFilteredBirds(birds);
        }
    }

    const handleClick = e => {
        setSearchValue('')
        setFilteredBirds(birds)
    }

    if (loading) {
        return <div className="flex flex-col g-2">
            <p>Loading....</p>
        </div>
    }

    if (birds.length < 1) {
        return <div className="p-2 font-bold text-sky-700">
            <h2 className="p-2 text-xl">Welcome {user.name}</h2>
            <p className="p-2 text-lg">You've not added any sightings yet</p>
            <p className="p-2 text-lg">Add a bird to get started</p>
            <Link to="/add"><button className="m-4 p-2 bg-sky-700 text-white rounded">Add your first bird</button></Link>
        </div>
    }

    return (
        <div>
            <div className="mb-2 flex justify-between">
                <h1 className="p-2 font-bold text-sky-700 md:text-xl">{user.name}'s list of birds</h1>
                <Link to="/add"><button className="p-2 bg-sky-700 rounded text-white text-xs md:text-base">Add a new sighting</button></Link>
            </div>
            <p className="px-2 text-sky-700 text-xs sm:text-sm">Scroll through, or search, your list of birds below. Click on a bird to edit it</p>
            <div className="flex p-2 mb-2 text-xs md:text-base">
                <input className="p-1 border border-sky-700 rounded" type="text" onChange={handleSearch} value={searchValue} placeholder="Search birds" />
                <button className="m-1 p-1 rounded bg-sky-700 text-white" onClick={handleClick}>Clear search</button>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2 p-1 text-sky-700 max-h-72 overflow-auto">
                {filteredBirds.map(bird => <BirdInfo
                    id={bird.id}
                    key={bird.id}
                    name={bird.name}
                    image={bird.image}
                    location={bird.location}
                    lat={bird.lat}
                    lon={bird.lon}
                />)}
            </div>
            <h2 className="p-2 font-bold md:text-xl text-sky-700">Where {user.name}'s birds were seen</h2>
            <MapContainer className="h-24 sm:h-48" center={[51.34751, -2.290]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredBirds.map(bird =>
                    <Marker position={[bird.lat, bird.lon]} >
                        <Popup>
                            {bird.name} <br></br>
                            seen at {bird.location}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}