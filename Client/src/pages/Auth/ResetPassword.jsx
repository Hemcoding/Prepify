import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { resetPassword } from "../../Api/authService";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

// Validation Schema
const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await resetPassword(token, data); 
      console.log(response);
      
      setLoading(false);

      if (response.success) {
        toast.success(response.data || "Password reset successfully!");
        navigate("/login"); 
        reset();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
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
              Reset Password
            </h2>
            <span className="text-gray-400">
              Please enter your new password below
            </span>
          </div>

          {/* New Password */}
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& label": { color: "#7c3aed" },
              "& label.Mui-focused": { color: "#7c3aed" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                "& fieldset": { borderColor: "#7c3aed" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
            }}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              "& label": { color: "#7c3aed" },
              "& label.Mui-focused": { color: "#7c3aed" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                "& fieldset": { borderColor: "#7c3aed" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
            }}
          />

          {/* Submit Button */}
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
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
