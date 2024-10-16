import { Link } from "react-router-dom";

export default function AddBirderSuccessPage() {
    return (
        <div className="p-2 my-2 flex flex-col">
            <div>
                <h1 className="mt-4 w-3/5 mx-auto p-2 rounded bg-sky-700 text-white text-2xl text-center">Registration successful!</h1>
            </div>
            <div className="my-8 mx-auto justify-center gap-2">
                <Link to="/add"><button className="w-fit p-2 border-2 border-sky-700 rounded bg-white text-sky-700 text-xl text-center">Add a bird</button></Link>
            </div>
        </div>
    )
}