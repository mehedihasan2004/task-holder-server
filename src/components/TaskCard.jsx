import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { EditModal, DeleteModal } from "./index";
import { MdVerifiedUser } from "react-icons/md";

const TaskCard = ({
  taskImg,
  taskTitle,
  taskDesc,
  handleComplete,
  completeStatus,
  deleteTask,
  taskId,
  handleCompleteText,
}) => {
  const { deleteModal, editModal, setEditModal, setDeleteModal } =
    useContext(AuthContext);
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 h-fit mx-auto">
      {taskImg && (
        <img
          className="object-cover object-center w-full h-40"
          src={taskImg}
          alt="task_img"
        />
      )}

      <div className="flex items-center px-6 py-3 bg-gray-900">
        {completeStatus && <MdVerifiedUser className="fill-blue-500 mr-2" />}
        <h1 className="text-lg font-semibold text-white">{taskTitle}</h1>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Patterson johnson
        </h1>

        <p className="py-2 text-gray-700 dark:text-gray-400">{taskDesc}</p>
        <div className="p-1.5 w-full overflow-hidden bg-white rounded-lg dark:bg-gray-800 ">
          <div className="flex justify-between">
            <button
              onClick={handleComplete}
              className="w-full px-4 py-1 text-white transition-colors duration-300 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              {handleCompleteText}
            </button>

            <button
              onClick={() => setEditModal(true)}
              className="w-full px-4 py-1 text-white transition-colors duration-300 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              className="w-full px-4 py-1 text-white transition-colors duration-300 transform bg-red-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-red-500 focus:bg-red-500 focus:ring focus:ring-red-300 focus:ring-opacity-40"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {editModal && (
        <EditModal preTaskTitle={taskTitle} preTaskDesc={taskDesc} />
      )}
      {deleteModal && <DeleteModal deleteTask={deleteTask} />}
    </div>
  );
};

export default TaskCard;
