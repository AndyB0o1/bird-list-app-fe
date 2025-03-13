import { Link } from "react-router-dom"

export default function EditBirdSuccessPage() {
    return (
        <div className="p-2 my-2 flex flex-col">
            <div>
                <h1 className="mt-4 w-3/5 mx-auto p-2 rounded bg-amber-500 text-amber-950 text-sm lg:text-2xl text-center">Bird sighting successfully edited!</h1>
            </div>
            <div className="my-8 mx-auto justify-center gap-2">
                <Link to="/mylist"><button className="w-fit p-2 border-2 border-amber-500 rounded bg-white text-amber-950 text-xs lg:text-xl text-center">Back to your list</button></Link>
            </div>
        </div>
    )
}