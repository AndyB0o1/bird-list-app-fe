import Sightings from "../../components/Sightings";

export default function AboutPage({ apiBaseUrl }) {
    return (
        <div>
            <h1 className="mb-4 text-sky-700 font-bold text-2xl">What is My Bird List?</h1>
            <p className="text-sky-700 text-xl">My Bird List allows you to keep your life list of bird sightings in one handy place.</p>
            <br></br>
            <p className="text-sky-700 text-xl">Click on 'Add Bird' to get started. If you're able to add the co-ordinates for latitude and
                longitude when you add the bird to the list, a marker will be added to the map to show where the bird was seen.</p>
            <Sightings apiBaseUrl={apiBaseUrl} />
        </div>
    )
}