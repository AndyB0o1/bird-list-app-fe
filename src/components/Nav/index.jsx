import { Link } from "react-router-dom";
import AuthService from "../../services/auth/AuthService";

export default function Nav() {

    const handleLogout = () => {
        AuthService.logout();
        alert('User logged out successfully');
    };
    
    return (
        <div className="h-48 mb-2 p-4 bg-[url('/lammergeier.png')]">
            <h1 className="p-1 font-bold text-white text-3xl">My Bird List</h1>
            <h2 className="p-1 text-white text-xl">Keep your life list of birds in one easy to manage place</h2>
            <div className="p-1 mt-8 flex gap-x-2">
                <Link to="/"><button className="p-1.5 border border-white rounded text-white">Home</button></Link>
                <Link to="/register"><button className="p-1.5 border border-white rounded text-white">Register</button></Link>
                <Link to="/login"><button className="p-1.5 border border-white rounded text-white">Login</button></Link>
                <Link to="/mylist"><button className="p-1.5 border border-white rounded text-white">My list</button></Link>
                <Link to="/"><button className="p-1.5 border border-white rounded text-white" onClick={handleLogout}>Logout</button></Link>
            </div>
        </div>
    );
}