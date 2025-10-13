import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { createSession } from "../../Api/sessionsService";
import toast from "react-hot-toast";
import { generateQuestions } from "../../Api/aiService";
import { useNavigate } from "react-router-dom";

// Validation schema with yup
const schema = yup.object().shape({
  role: yup.string().required("Target role is required"),
  experience: yup
    .number()
    .typeError("Enter a valid number")
    .positive("Must be positive")
    .required("Experience is required"),
  topicsToFocus: yup.string().required("Topics are required"),
  description: yup.string().required("Description is required"),
});

const CreateSessionForm = ({
  onSubmitForm,
  setLoading,
  setOpen,
  fetchSessions,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data); 
    try {
      setLoading(true);

      const aiResponse = await generateQuestions({
        role: data.role,
        experience: data.experience,
        topicsToFocus: data.topicsToFocus,
        numberOfQuestions: "5",
      });

      const generatedQuestion = aiResponse.data;

      const response = await createSession({
        ...data,
        questions: generatedQuestion,
      });

      if (response.success) {
        setLoading(false);
        setOpen(false);
        navigate(`/interview-prep/${response.data?._id}`);
        toast.success("Sessions created successfully! 🎉");
      }

      if (onSubmitForm) onSubmitForm(data);
      reset();
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data.message || "Somthing went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="create-session-form"
      className="flex flex-col gap-5 py-10"
    >
      {/* Role */}
      <TextField
        label="Target Role"
        placeholder="(e.g. frontend developer, ui/ux designer)"
        variant="outlined"
        fullWidth
        {...register("role")}
        error={!!errors.role}
        helperText={errors.role?.message}
        sx={{
          "& label": { color: "#7c3aed" },
          "& label.Mui-focused": { color: "#7c3aed" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#7c3aed" },
            "&:hover fieldset": { borderColor: "#7c3aed" },
            "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
          },
        }}
      />

      {/* Experience */}
      <TextField
        label="Years of Experience"
        placeholder="(e.g. 1, 3, 5+)"
        variant="outlined"
        fullWidth
        type="number"
        {...register("experience")}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        sx={{
          "& label": { color: "#7c3aed" },
          "& label.Mui-focused": { color: "#7c3aed" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#7c3aed" },
            "&:hover fieldset": { borderColor: "#7c3aed" },
            "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
          },
        }}
      />

      {/* Topics */}
      <TextField
        label="Topics To Focus On"
        placeholder="(Comma-separated, e.g. React, Node.js, MongoDB)"
        variant="outlined"
        fullWidth
        {...register("topicsToFocus")}
        error={!!errors.topicsToFocus}
        helperText={errors.topicsToFocus?.message}
        sx={{
          "& label": { color: "#7c3aed" },
          "& label.Mui-focused": { color: "#7c3aed" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#7c3aed" },
            "&:hover fieldset": { borderColor: "#7c3aed" },
            "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
          },
        }}
      />

      {/* Description */}
      <TextField
        label="Description"
        placeholder="(Any specific goals or notes for this session)"
        variant="outlined"
        fullWidth
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{
          "& label": { color: "#7c3aed" },
          "& label.Mui-focused": { color: "#7c3aed" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#7c3aed" },
            "&:hover fieldset": { borderColor: "#7c3aed" },
            "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
          },
        }}
      />
    </form>
  );
};

export default CreateSessionForm;
