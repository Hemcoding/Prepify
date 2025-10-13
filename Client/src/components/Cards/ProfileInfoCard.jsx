// import React, { useContext, useState } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// const ProfileInfoCard = () => {
// // const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

//   const { user, setOpenLogoutAlert} = useContext(UserContext);

// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     clearUser();
// //     navigate("/"); // Redirect to landing page after logout
// //   };

//   return (
//     user && (
//       <div className="flex items-center">
//         <FaUserCircle className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
//         <div>
//           <div className="text-[15px] text-black font-bold leading-3">
//             {user.name || ""}
//           </div>
//           <button
//             className="text-violet-500 text-sm font-semibold cursor-pointer hover:underline"
//             onClick={() => setOpenLogoutAlert(true)}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProfileInfoCard;

import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Menu, MenuItem, IconButton, Avatar, Divider } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";

const ProfileInfoCard = () => {
  const { user, setOpenLogoutAlert } = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <div className="flex items-center">
      {/* Desktop View */}
      <div className="hidden sm:flex items-center">
        {/* <FaUserCircle className="w-10 h-10 bg-gray-300 rounded-full mr-3" /> */}
        <div className="flex flex-col items-end">
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-red-500 text-sm font-semibold cursor-pointer hover:underline"
            onClick={() => setOpenLogoutAlert(true)}
          >
            Logout
          </button>
        </div>
        <div className="border-3 border-violet-500 rounded-full ml-2 p-0.5">
          <Avatar
            sx={{
              bgcolor: "black",
              width: 40,
              height: 40,
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </div>
      </div>

      {/* Mobile View (User Icon → Menu) */}
      <div className="sm:hidden">
        <IconButton onClick={handleMenuOpen} size="large">
          <Avatar
            sx={{
              bgcolor: "gray",
              width: 40,
              height: 40,
              fontSize: "1.5rem",
              cursor: "pointer",
              border: "2px solid #8E51FF",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              marginTop: "1rem",
              borderRadius: "12px",
              padding: "4px",
              minWidth: 150,
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem disabled>
            <div className="flex flex-col items-start">
              <span className="font-bold text-gray-900">
                {user.name || "User"}
              </span>
              <span className="text-sm text-gray-800">{user.email}</span>
            </div>
          </MenuItem>
          <Divider />
            <MenuItem
              onClick={() => navigate("/dashboard")}
              sx={{
                display: "flex",
                gap: "1rem",
                color: "#8E51FF",
                borderRadius:"10px",
                "&.Mui-focusVisible": {
                  backgroundColor: "white",
                },
                "&:hover": {
                  backgroundColor: "#f3e8ff",
                },
              }}
            >
              <MdSpaceDashboard /> Dashboard
            </MenuItem>
          <MenuItem
            onClick={() => navigate("/profile")}
            sx={{
              display: "flex",
              gap: "1rem",
              color: "#8E51FF",
              borderRadius:"10px",
              "&.Mui-focusVisible": {
                backgroundColor: "white",
              },
              "&:hover": {
                backgroundColor: "#f3e8ff",
              },
            }}
            disabled={true}
          >
            <FaUserCircle /> My Profile
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setOpenLogoutAlert(true);
              handleMenuClose();
            }}
            sx={{
              color: "red",
              display: "flex",
              gap: "1rem",
              borderRadius:"10px",
              "&:hover": {
                backgroundColor: "#FFD2D2",
              },
            }}
          >
            <TbLogout />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
