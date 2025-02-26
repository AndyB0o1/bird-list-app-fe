import { useEffect, useState } from "react"

export default function Recents({ apiBaseUrl}) {

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
            {recents.map(recent => <BirdDetail
                                key={recent.id}
                                name={recent.name}
                                image={recent.image}
                                location={recent.location}
                            />)}
        </div>
    )
}