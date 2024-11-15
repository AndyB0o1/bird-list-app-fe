import { useEffect, useState } from "react"
import BirdDetail from "../../components/BirdDetail";
import Sightings from "../../components/Sightings";

export default function RecentPage({ apiBaseUrl }) {

    const [recents, setRecents] = useState([]);

    useEffect(() => {
        fetch(apiBaseUrl + '/recent').then(response => response.json())
            .then(responseBody => {
                setRecents(responseBody.data)
            })
    }, [])

    return (
        <div>
            <h2 className="p-2 font-bold text-xl text-sky-700">Recent sightings</h2>
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