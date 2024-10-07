export default function Nav() {
    return (
        <div className="h-48 p-4 bg-[url('/lammergeier.png')]">
            <h1 className="p-2 font-bold text-white text-4xl">My Bird List</h1>
            <div className="mt-16 flex gap-2">
                <button className="p-2 border border-white rounded text-white">Add bird</button>
                <button className="p-2 border border-white rounded text-white">Log in</button>
                <button className="p-2 border border-white rounded text-white">See all recent sightings</button>
            </div>
        </div>
    )
}