import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddTask = (data) => {
    const formData = new FormData();
    formData.append("image", data?.image[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_Image_API_Key}`,
      { method: "POST", body: formData }
    )
      .then((res) => res.json())
      .then((imgData) => {
        const task = {
          userName: user?.displayName,
          userEmail: user?.email,
          postTime: moment().format("MMM Do YY"),
          taskImg: imgData?.data?.url || "",
          taskTitle: data.title,
          taskDesc: data.task_desc,
          isCompleted: false,
          comment: "",
        };
        fetch("https://task-holder-sever.vercel.app/tasks", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(task),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.info("Task added", {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/my-tasks");
            }
          })
          .catch((err) => console.error("Error", err));
      })
      .catch((err) => console.log("Error", err));
  };
  return (
    <div>
      <section className="max-w-3xl md:w-[600px] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          New Task
        </h2>

        <form onSubmit={handleSubmit(handleAddTask)}>
          <div className="flex flex-col gap-6 mt-4">
            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>

              <h2 className="mx-3 text-gray-400">Upload a Photo</h2>

              <input
                {...register("image")}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </label>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                {...register("title", {
                  required: "Title must be required",
                })}
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Title "
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="task_desc"
              >
                Task Description
              </label>
              <textarea
                {...register("task_desc", {
                  required: "Task description is required",
                })}
                id="task_desc"
                rows="5"
                placeholder="Write about your task"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.task_desc && (
                <p className="text-red-500">{errors.task_desc.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <input
              className="cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTask;
