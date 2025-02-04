import { useEffect, useState } from "react"
import BirdDetail from "../../components/BirdDetail";
import Sightings from "../../components/Sightings";
import { Link } from "react-router-dom";

export default function HomePage({ apiBaseUrl }) {

    const [recents, setRecents] = useState([]);

    useEffect(() => {
        fetch(apiBaseUrl + '/recent').then(response => response.json())
            .then(responseBody => {
                setRecents(responseBody.data)
            })
    }, [])

    useEffect(() => {
        if (recents.length === 0) {
            setRecents(recents)
        }
    })

    return (
        <div>
            <div>
                <h1 className="mb-4 text-sky-700 font-bold text-2xl">What is My Bird List?</h1>
                <p className="text-sky-700 text-xl">My Bird List allows you to keep your life list of bird sightings in one handy place.
                    Once registered on the site you can add your sightings along with the location and a link to an image if you have one.
                    The birds you've seen are shown as a list and on a map, allowing you to keep track of what you've seen and where.
                    You can also update your sightings and edit or delete them as appropriate.</p>
                    <br></br>
                    <p className="mb-2 text-sky-700 text-xl">Click on Login or Register above to get started.</p>

            </div>
            <h2 className="p-2 font-bold text-xl text-sky-700">Recent member sightings</h2>
            <div className="flex gap-2 p-2 text-sky-700">
                {recents.map(recent => <BirdDetail
                    key={recent.id}
                    name={recent.name}
                    image={recent.image}
                    location={recent.location}
                />)}
            </div>
            <Sightings apiBaseUrl={apiBaseUrl} />
        </div>
    )
}