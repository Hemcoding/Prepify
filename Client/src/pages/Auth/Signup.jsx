import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, TextField, Button, IconButton, CircularProgress } from "@mui/material";
import AiBot from "../../assets/lotties/Robot-Bot 3D.json";
import Lottie from "lottie-react";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { signup } from "../../Api/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";

// Validation Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3,"Name must have atleast 3 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain alphabets and spaces"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const response = await signup(data);
      console.log("response", response);

      if (response.success) {
        setLoading(false);
        toast.success("Signed up in successfully! 🎉");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data.message || "Somthing went wrong");
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-gradient-to-br from-violet-200 to-white p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side Illustration */}
        <div className="flex justify-center items-center">
          <Lottie
            animationData={AiBot}
            loop={true}
            autoplay={true}
            className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        {/* Right Side Signup Form */}
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-5 backdrop-blur-2xl bg-gray-400/5 border border-gray-300 rounded-2xl p-6 sm:p-8 w-full max-w-md"
          >
            <span className="text-4xl sm:text-3xl md:text-4xl lg:text-3xl font-extrabold text-violet-500 transition-all duration-300">
              Prepify
            </span>
            <h2 className="text-2xl sm:text-2xl font-bold text-violet-500 text-center mb-2">
              Login to Your Account
            </h2>

            {/* Name */}
            <TextField
              label="Name"
              type="name"
              fullWidth
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
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
                "& label": { color: "#7c3aed" }, 
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

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
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
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "transparent",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <MdOutlineVisibilityOff className="text-violet-500" />
                      ) : (
                        <MdOutlineVisibility className="text-violet-500" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              type={"password"}
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
                "&:hover": { backgroundColor: "#6d28d9" }, // darker violet
                color: "#fff",
                borderRadius: "0.75rem",
                padding: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <CircularProgress size={25} color="white" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="flex flex-col items-center">
              <p>Already have an account ?</p>
              <a
                className="w-[95%] text-center rounded-xl px-4 sm:px-6 py-2 font-semibold text-violet-500 cursor-pointer hover:scale-105 active:scale-95"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
