import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { forgotPassword } from "../../Api/authService";
import CircularProgress from "@mui/material/CircularProgress";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const response = await forgotPassword(data);
      console.log("response", response);

      if (response.success) {
        setLoading(false);
        toast.success(response.message);
        reset();
      }
    } catch (error) {
      toast.error(error.response);
      console.log(error);
      // setError(error)
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center bg-gradient-to-br from-violet-200 to-white p-4">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-8 backdrop-blur-2xl bg-gray-400/5 border border-gray-300 rounded-2xl p-6 sm:p-10 w-full max-w-md"
        >
          <div>
            <h2 className="text-2xl sm:text-2xl font-bold text-violet-500 text-center mb-2">
              Forgot password ?
            </h2>
            <span className="text-gray-400">
              No worries, we'll send you reset instruction
            </span>
          </div>

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& label": { color: "#7c3aed" }, // violet-500
              "& label.Mui-focused": { color: "#7c3aed" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "tranparent",
                "& fieldset": { borderColor: "#7c3aed" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
              "& .MuiOutlinedInput-input": {
                backgroundColor: "transparent",
              },
            }}
          />

          {/* Login button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#7c3aed",
              "&:hover": { backgroundColor: "#6d28d9" },
              color: "#fff",
              borderRadius: "0.75rem",
              padding: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Send email"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
