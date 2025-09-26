import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/'); // Redirect to landing page after logout
  };

  
  return user && (
    <div className='flex items-center'>

        <FaUserCircle className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
        <div >
            <div 
                className='text-[15px] text-black font-bold leading-3'
            >
                {user.name || ""}
            </div>
            <button 
                className='text-violet-500 text-sm font-semibold cursor-pointer hover:underline'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfoCard