import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../Components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../pages/InterviewPrep/components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../Components/Drawer";
import SkeletonLoader from "../../Components/Loader/SkeletonLoader";
import { fetchSessionById } from "../../Api/sessionsService";
import { pinQuestion, questionAddtoSession } from "../../Api/questionService";
import { generateExplanation, generateQuestions } from "../../Api/aiService";
import { MdAutoAwesome } from "react-icons/md";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session details
  const fetchSessionDetailsById = async () => {
    try {
      const response = await fetchSessionById(sessionId);
      if (response.success) setSessionData(response.data);
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Failed to fetch session data");
    }
  };

  // Generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await generateExplanation({ question });
      if (response.data) setExplanation(response.data);
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, try again later");
    } finally {
      setIsLoading(false);
    }
  };

  // Pin/unpin question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await pinQuestion({ _id: questionId });
      if (response.success) {
        toast.success("Question pinned successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to pin question");
    }
  };

  // Add more questions
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await generateQuestions({
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 5,
      });

      const generatedQuestions = aiResponse.data;
      const response = await questionAddtoSession({
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Added more Q&A");
        fetchSessionDetailsById();
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-violet-200 to-white">
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || ""}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
          openLeanMoreDrawer={openLeanMoreDrawer}
        />

        {/* Container */}
        <div className="container mx-auto pt-4 pb-10 px-4 sm:px-6 md:px-10 lg:px-20">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Interview Q & A
          </h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
            <div
              className={`col-span-12 ${
                openLeanMoreDrawer
                  ? "md:col-span-6 lg:col-span-7"
                  : "md:col-span-9"
              }`}
            >
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                    className="mb-4"
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLeanMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {/* Load More Button */}
                    {!isLoading &&
                      sessionData?.questions?.length === index + 1 && (
                        <div className="flex items-center justify-center mt-6">
                          <button
                            className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-white font-medium bg-violet-500 px-4 sm:px-5 py-2 rounded-lg hover:bg-violet-700 transition disabled:opacity-70"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <div className="animate-pulse flex gap-2 items-center">
                                <MdAutoAwesome />
                                AI is generating...
                              </div>
                            ) : (
                              <div className="flex gap-2 items-center">
                                <LuListCollapse className="text-lg" />
                                Load More
                              </div>
                            )}
                          </button>
                        </div>
                      )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Drawer Section */}
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <div className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg">
                <AIResponsePreview content={explanation?.explanation} />
              </div>
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
