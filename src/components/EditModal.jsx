import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const EditModal = ({ preTaskTitle, preTaskDesc, _id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setEditModal } = useContext(AuthContext);
  const handleUpdateTask = (data) => {
    const updatedData = {
      taskTitle: data.title,
      taskDesc: data.task_desc,
    };
    fetch(`https://task-holder-sever.vercel.app/update-task/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  };
  return (
    <div className="relative flex justify-center">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <h3
              className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
              id="modal-title"
            >
              Invite your team
            </h3>
            <form onSubmit={handleSubmit(handleUpdateTask)}>
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
                    defaultValue={preTaskTitle}
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
                    defaultValue={preTaskDesc}
                    rows="5"
                    placeholder="Write about your task"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                  {errors.task_desc && (
                    <p className="text-red-500">{errors.task_desc.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-x-2">
                <button
                  onClick={() => setEditModal(false)}
                  className="cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Cancel
                </button>
                <input
                  onClick={() => setEditModal(false)}
                  className="cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
