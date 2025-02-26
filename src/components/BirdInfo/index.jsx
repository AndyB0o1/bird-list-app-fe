import { Link } from "react-router-dom"

export default function BirdInfo({ id, name, image, location }) {
    return (
        <>
            <Link to={/birds/ + id} >
                <div className="lg:hidden p-2 flex border rounded-lg text-sky-700">
                    <img src={image} alt={name} className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-full"></img>
                    <div className="md:mt-2 align-center flex-col ml-2 p-1">
                        <h3 className="text-sm font-bold">{name}</h3>
                        <p className="text-xs">{location}</p>
                    </div>
                </div>
            </Link>
            <div className="hidden lg:block mx-1 basis-[45%] sm:basis-[22%]">
                <Link to={/birds/ + id} >
                    <div className="border border-sky-700 rounded-lg">
                        <h3 className="p-2 h-12 text-sky-700 text-center text-xs font-bold">{name}</h3>
                        <img src={image} alt={name} className="h-16 w-16 object-cover rounded-full mx-auto"></img>
                        <p className="p-2 h-12 text-sky-700 text-center text-xs">{location}</p>
                    </div>
                </Link>
            </div>
        </>)
}