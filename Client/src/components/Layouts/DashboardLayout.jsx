import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Alert from "../Alert";

const DashboardLayout = ({ children }) => {
  const { user, openLogoutAlert, setOpenLogoutAlert, handleLogout } =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    const response = handleLogout();
    setOpenLogoutAlert(false);
    if (response.success) {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />

      {user && <div>{children}</div>}
      <Modal
        isOpen={openLogoutAlert}
        onClose={() => setOpenLogoutAlert(false)}
        title={"Logout"}
      >
        <div className="w-[90vw] md:w-[30vw]">
          <Alert
            content="Are you sure you want to Logout?"
            onDelete={() => handleLogoutAndRedirect()}
            buttonContent={"Logout"}
          />
        </div>
      </Modal>
     
    </div>
  );
};

export default DashboardLayout;
