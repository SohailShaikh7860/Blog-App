import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const user = await authService.login(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow`}
      >
        <div className="flex justify-center mb-6">
          <span className="inline-block w-full max-w-[100px]">
            <Logo className="w-32 h-32" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
             Don&apos;t have an account?&nbsp;
             <Link to="/signup" className="text-blue-600 font-semibold">
                Sign up
             </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
                  <div className="space-y-5">
                    <Input label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", { required:true, validate:{
                        matchPattern: (v) => v.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "Invalid email address")
                    } })}
                    />
                    <Input label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", { required:true, minLength:6 })}
                    />
                    <Button type="submit" bgColor="bg-blue-600" textColor="text-white" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                  </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
