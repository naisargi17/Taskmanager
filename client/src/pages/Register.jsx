import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/authApiSlice"; // Assuming a register mutation exists
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader.jsx";
import { toast } from "sonner";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  
  const submitHandler = async (data) => {
    // Check if the role is 'admin' and set isAdmin accordingly
    data.isAdmin = data.role.toLowerCase() === "admin";

    try {
      const result = await registerUser(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#D1E9F6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3  rounded-full text-sm md:text-base  text-[#605678]'>
              Join us to manage all your tasks efficiently!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Create Your</span>
              <span>Task Manager Account</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[490px] flex flex-col gap-y-8 bg-[#f2f9f9] px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Create your account to get started.
              </p>
            </div>

            {/* 2-column grid for the textboxes */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <Textbox
                placeholder='John_Doe12'
                type='text'
                name='name'
                label='User Name'
                className='w-full rounded-full'
                register={register("username", {
                  required: "User Name is required!",
                })}
                error={errors.username ? errors.username.message : ""}
              />
              <Textbox
                placeholder='John Doe'
                type='text'
                name='name'
                label='Full Name'
                className='w-full rounded-full'
                register={register("name", {
                  required: "Full Name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <Textbox
                placeholder='Manager'
                type='text'
                name='role'
                label='Role'
                className='w-full rounded-full'
                register={register("role", {
                  required: "Role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />
              <Textbox
                placeholder='Team Lead'
                type='text'
                name='title'
                label='Title'
                className='w-full rounded-full'
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <div className='flex flex-col m-1 gap-2'>
                <Button
                  type='submit'
                  label='Submit'
                  className='w-full h-10 bg-blue-700 text-white rounded-full'
                />
                <Button
                  type='button'
                  onClick={() => navigate("/login")}
                  label='Sign in'
                  className='w-full h-10 text-[#6C48C5] bg-white border border-gray-400 rounded-full'
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
