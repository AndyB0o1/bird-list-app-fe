import { Link } from "react-router-dom";

export default function AddBirdPage() {
    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Add a bird by completing the form below</h1>
            <p className="p-1 text-rose-600"><span>*If you haven't registered yet, please </span><Link to="/register" className="text-sky-700">register here</Link><span> before trying to add a bird*</span></p>
            <form className="my-3 flex flex-col gap-4 px-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Your username (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="username" name="username" placeholder="Username" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name of bird seen (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="name" name="name" placeholder="name" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="imageURL">Link to an image (if you have one)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="imageURL" name="imageURL" placeholder="imageURL" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Location">Location of sighting (required)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="Location" name="Location" placeholder="Location" />
                </div>
                <input className="bg-sky-700 text-white p-1" type="submit" value="Add bird" />
            </form>
        </>
    )
}