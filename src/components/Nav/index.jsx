import { Link } from "react-router-dom"
import AuthService from "../../services/auth/AuthService"

export default function Nav() {

    const handleLogout = () => {
        AuthService.logout();
        alert('User logged out successfully')
    }

    return (
        <div className="relative h-48 lg:h-64 xl:h-96 mb-2 pt-1.5 bg-cover bg-[url('/murmurationmobile.jpeg')] lg:bg-[url('/murmuration.jpeg')] text-white">
            <h1 className="w-fit ml-1 p-2 bg-emerald-600 font-bold text-xl md:text-3xl lg:text-4xl rounded">My Bird List</h1>
            <h2 className="max-w-[30%] px-1.5 text-xs lg:text-sm font-bold rounded">Keep your life list of birds in one easy to manage place</h2>
            <div className="absolute bottom-0 w-fit px-1 flex text-xs lg:text-base xl:text-lg font-bold">
                <Link to="/"><button className="p-1.5 hover:underline">Home |</button></Link>
                <Link to="/register"><button className="p-1.5 hover:underline"> Register |</button></Link>
                <Link to="/login"><button className="p-1.5 hover:underline"> Login |</button></Link>
                <Link to="/mylist"><button className="p-1.5 hover:underline"> My list |</button></Link>
                <Link to="/"><button className="p-1.5 hover:underline" onClick={handleLogout}> Logout</button></Link>
            </div>
        </div>
    )
}