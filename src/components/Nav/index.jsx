import { Link } from "react-router-dom"
import AuthService from "../../services/auth/AuthService"

export default function Nav() {

    const handleLogout = () => {
        AuthService.logout();
        alert('User logged out successfully')
    }

    return (
        <div className="relative flex flex-col m-2 pt-1.5 h-60 lg:h-64 xl:h-96 bg-cover bg-[url('/cartoonbird.png')] border-b border-amber-950">
            <div className="flex-row">
                <h1 className="h-fit w-fit mt-4 p-2 border border-white bg-amber-500 font-bold text-xl md:text-3xl lg:text-4xl text-orange-950 rounded">My Bird List</h1>
            </div>
            <div className="absolute bottom-0 flex self-end gap-1 px-1 mb-1 text-xs lg:text-base xl:text-lg font-bold text-orange-950">
                <Link to="/"><button className="p-1.5 border border-white bg-amber-500 hover:underline rounded">Home</button></Link>
                <Link to="/register"><button className="p-1.5 border border-white bg-amber-500 hover:underline rounded">Register</button></Link>
                <Link to="/login"><button className="p-1.5 border border-white bg-amber-500 hover:underline rounded">Login</button></Link>
                <Link to="/mylist"><button className="p-1.5 border border-white bg-amber-500 hover:underline rounded">My list</button></Link>
                <Link to="/"><button className="p-1.5 border border-white bg-amber-500 hover:underline rounded" onClick={handleLogout}>Logout</button></Link>
            </div>
        </div>
    )
}