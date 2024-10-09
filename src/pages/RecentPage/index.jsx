import { useEffect, useState } from "react"
import BirdDetail from "../../components/BirdDetail";

export default function RecentPage() {

    const [recents, setRecents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/recent').then(response => response.json())
            .then(responseBody => {
                setRecents(responseBody.data)
            })
    }, [])

    return (
        <div>
            <h2 className="p-2">Recent sightings</h2>
            <div className="flex gap-2 p-2">
                {recents.map(recent => <BirdDetail
                    key={recent.id}
                    name={recent.name}
                    image={recent.image}
                    location={recent.location}
                />)}
            </div>
        </div>
    )
}