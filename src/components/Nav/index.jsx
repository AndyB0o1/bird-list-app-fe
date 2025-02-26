import { Link } from "react-router-dom"
import AuthService from "../../services/auth/AuthService"

export default function Nav() {

    const handleLogout = () => {
        AuthService.logout();
        alert('User logged out successfully')
    }

    return (
        <div className="h-32 md:h-48 mb-2 p-1.5 sm:p-4 bg-[url('/murmurationmobile.jpeg')] sm:bg-[url('/murmuration.jpeg')] text-white">
            <h1 className="p-1 font-bold text-xl md:text-3xl">My Bird List</h1>
            <h2 className="p-1 text-sm md:text-xl">Keep your life list of birds in one easy to manage place</h2>
            <div className="p-1 md:mt-4 flex gap-x-1 md:gap-x-2 text-xs md:text-lg">
                <Link to="/"><button className="p-1.5 border border-white rounded">Home</button></Link>
                <Link to="/register"><button className="p-1.5 border border-white rounded">Register</button></Link>
                <Link to="/login"><button className="p-1.5 border border-white rounded">Login</button></Link>
                <Link to="/mylist"><button className="p-1.5 border border-white rounded">My list</button></Link>
                <Link to="/"><button className="p-1.5 border border-white rounded" onClick={handleLogout}>Logout</button></Link>
            </div>
        </div>
    )
}