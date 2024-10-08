import { useEffect, useState } from "react"
import BirdDetail from "../BirdDetail";

export default function Recent() {

    const [recents, setRecents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/recent').then(response => response.json())
            .then(responseBody => {
                setRecents(responseBody.data)
            })
    }, [])

    console.log(recents)

    return (
        <div>
            <h2 className="p-2">Recent sightings</h2>
            <div className="flex gap-2 p-2 content-center">
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