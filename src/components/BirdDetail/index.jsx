export default function BirdDetail({ id, name, image, location }) {
    return (
        <>
        <div className="lg:hidden p-2 flex border border-amber-500 rounded-lg">
            <img src={image} alt={name} className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-full"></img>
            <div className="flex-col ml-2 p-1 my-auto">
            <h3 className="text-sm font-bold">{name}</h3>
            <p className="text-xs">{location}</p>
            </div>
        </div>
        <div className="hidden lg:block lg:mx-auto p-2 border border-amber-500 rounded-lg">
        <h3 className="p-2 h-12 text-center text-xs font-bold">{name}</h3>
        <img src={image} alt={name} className="h-16 w-16 object-cover rounded-full mx-auto"></img>
        <p className="text-center p-2 text-xs">{location}</p>
        </div>
        </>
    )
}