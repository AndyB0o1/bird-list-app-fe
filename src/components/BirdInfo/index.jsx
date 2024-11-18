import { Link } from "react-router-dom";

export default function BirdInfo({ id, name, image, location }) {
    return (
        <div className="basis-[22%]">
        <Link to={/birds/ + id} >
            <div className="border border-sky-700 rounded-lg">
                <h3 className="p-2 text-sky-700 text-center text-xs font-bold">{name}</h3>
                <img src={image} alt={name} className="h-16 w-16 object-cover rounded-full mx-auto"></img>
                <p className="p-2 text-sky-700 text-center text-xs">{location}</p>
            </div>
        </Link>
        </div>
    )
}