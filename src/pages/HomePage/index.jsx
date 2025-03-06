import { useEffect, useState } from "react"
import BirdDetail from "../../components/BirdDetail"
import Sightings from "../../components/Sightings"

export default function HomePage({ apiBaseUrl }) {

    const [recents, setRecents] = useState([])

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
                <h1 className="mb-1 md:mb-4 px-1 bg-amber-500 text-amber-950 font-bold md:text-2xl rounded">What is My Bird List?</h1>
                <p className="mb-1 text-amber-950 text-sm md:text-xl">My Bird List allows you to keep your life list of bird sightings in one handy place.
                    Once registered on the site you can add your sightings along with the location and a link to an image if you have one.
                    The birds you've seen are shown as a list and on a map, allowing you to keep track of what you've seen and where.
                    You can also update your sightings and edit or delete them as appropriate.</p>
                <br className="hidden md:block"></br>
                <p className="md:mb-2 text-amber-950 text-sm md:text-xl">Click on Login or Register above to get started.</p>

            </div>
            <h2 className="px-1 font-bold md:text-xl bg-amber-500 text-amber-950 rounded">Recent user sightings</h2>
            <div className="flex flex-col lg:flex-row gap-2 p-1 text-amber-950">
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