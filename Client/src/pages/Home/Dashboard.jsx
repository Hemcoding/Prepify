import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
// import axiosInstance from '../../utils/axiosInstance'
// import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from "../../Components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../Components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import Button1 from "../../components/Buttons/Button1";
import CustomDialog from "../../components/Dialog";
import { Button, CircularProgress } from "@mui/material";
import { deleteSession, fetchAllSessions } from "../../Api/sessionsService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchSessions = async () => {
    try {
      const response = await fetchAllSessions();
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSessionFromSessions = async (sessionData) => {
    try {
      console.log(sessionData);
      const response = await deleteSession(sessionData);
      if (response.success) {
        toast.success("Session deleted successfully");
        setOpenDeleteAlert({ open: false, data: null });
        fetchSessions();
      }
    } catch (error) {
      console.error("Error Deleting Session Data:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <DashboardLayout>
      {/* Background */}
      <div className="w-full pt-15 min-h-screen bg-gradient-to-br from-violet-200 to-white">
        <div className="container mx-auto pt-10 pb-20 px-6">
          {/* Title */}
          <h1 className="text-2xl md:text-2xl font-bold text-violet-500 mb-10 text-center">
            Your Interview Prep Sessions
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 space-y-6">
            {sessions?.map((data, index) => (
              <div key={data?._id} className="break-inside-avoid">
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("DD MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data: data._id })}
                  className="rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition transform bg-white/90 backdrop-blur-md"
                />
              </div>
            ))}
          </div>

          <Button1
            className="fixed bottom-10 right-10"
            onClick={() => setOpen(true)}
          >
            <span className="flex items-center gap-2">
              <LuPlus className="text-lg" />
              Add New
            </span>
          </Button1>
        </div>
      </div>

      {/* Create Modal */}
      {/* <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        hideHeader
      >
        <div className="p-4">
          <CreateSessionForm />
        </div>
      </Modal> */}

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Start a new interview journey"
        actions={
          <>
            <div className="flex justify-center w-full">
              <Button
                key="submit"
                type="submit"
                form="create-session-form"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#7F22FE",
                  "&:hover": { backgroundColor: "#6d28d9" }, // darker violet
                  color: "#fff",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                  fontWeight: "bold",
                  width: "95%",
                }}
              >
                {loading ? (
                  <CircularProgress size={25} color="white" />
                ) : (
                  "Create session"
                )}
              </Button>
            </div>
          </>
        }
      >
        <p className="text-xs text-slate-600 mb-3">
          Fill out a few quick details and unlock your personalized set of
          interview questions!
        </p>
        <CreateSessionForm
          setLoading={setLoading}
          setOpen={setOpen}
          fetchSessions={fetchSessions}
        />
      </CustomDialog>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title={"Delete Session"}
      >
        <div className="w-[90vw] md:w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSessionFromSessions(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
