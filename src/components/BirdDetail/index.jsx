export default function BirdDetail({ name, image, location }) {
    return (
        <div className="basis-1/5 border rounded-lg">
            <h3 className="p-2 h-14 text-center text-xs font-bold">{name}</h3>
            <img src={image} alt={name} className="h-16 w-16 rounded-full mx-auto"></img>
            <p className="text-center p-2 text-xs">{location}</p>
        </div>
    )
}