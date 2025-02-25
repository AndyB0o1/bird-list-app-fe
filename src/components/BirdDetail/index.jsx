export default function BirdDetail({ name, image, location }) {
    return (
        <div className="p-2 sm:flex-wrap sm:basis-1/4 border rounded-lg">
            <h3 className="p-2 h-12 text-center text-xs font-bold">{name}</h3>
            <img src={image} alt={name} className="h-16 w-16 object-cover rounded-full mx-auto"></img>
            <p className="text-center p-2 text-xs">{location}</p>
        </div>
    )
}