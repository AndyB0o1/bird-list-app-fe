import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="h-48 p-4 bg-[url('/lammergeier.png')]">
            <h1 className="p-2 font-bold text-white text-4xl">My Bird List</h1>
            <div className="mt-16 flex gap-2">

                <Link to="/"><button className="p-2 border border-white rounded text-white">Home</button></Link>
                <Link to="/about"><button className="p-2 border border-white rounded text-white">About</button></Link>
                <Link to="/add"><button className="p-2 border border-white rounded text-white">Add bird</button></Link>
                {/* <button className="p-2 border border-white rounded text-white">Log in</button>
                <button className="p-2 border border-white rounded text-white">See all recent sightings</button> */}
            </div>
        </div>
    )
}