import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import background from "../../assets/image/bg2.jpeg";
import logo from "../../assets/image/mbbaylogo.png";
import { toast, ToastContainer } from "react-toastify";
import Sliding from "../Reuseable/Sliding";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAdmin } from "../services/adminApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const bg = {
  backgroundImage: `url(${background})`,
};

type FormData = {
  emailOrPhone: string;
  password: string;
};

const LoginAdmin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginAdmin(data);
  
      if (response?.data?.user && response?.data?.token) {
        dispatch(setUser({ user: response.data.user, token: response.data.token }));
        toast.success(response.message || "Login successful");
        navigate("/app");
      } else {
       
        throw new Error("Invalid response format from server");
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "An unexpected error occurred", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented yet", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="w-full h-screen">
      <ToastContainer />

      <div className="flex flex-col md:flex-row">
        <Sliding />
        <div
          style={bg}
          className="bg-center bg-no-repeat bg-cover w-full min-h-screen px-4 lg:ml-[500px]"
        >
          {/* Logo for small screens */}
          <div className="flex justify-between items-center px-4 my-6">
            <div className="lg:hidden">
              <img src={logo} width={50} alt="Logo" />
            </div>
            {/* Sign Up Link */}
            <div className="w-full hidden text-end lg:block">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-6">
              <h2 className="text-2xl font-semibold text-left mb-4">Login</h2>
              <a href="/" className="text-left text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mt-2">
                  <label className="block text-sm font-medium">Email or Phone</label>
                  <input
                    type="text"
                    {...register("emailOrPhone", {
                      required: "Email or phone is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter email or phone"
                  />
                  <p className="text-red-500 text-sm">{errors.emailOrPhone?.message}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter password"
                  />
                  <p className="text-red-500 text-sm">{errors.password?.message}</p>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label className="text-sm">Keep me logged in</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-3 font-semibold rounded-md 
                  hover:bg-orange-600 transition duration-300 flex items-center justify-center 
                  disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-2 mt-4 border rounded-md flex items-center justify-center"
              >
                <span className="text-xl">
                  <FcGoogle />
                </span>
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
