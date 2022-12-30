import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Loader, TaskCard } from "../components";
import { AuthContext } from "../context/AuthProvider";

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);
  const {
    data: completedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completed-tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://task-holder-sever.vercel.app/completed-tasks?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  const handleNotComplete = (id) => {
    fetch(`https://task-holder-sever.vercel.app/completed-tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      })
      .catch((err) => console.error("Error", err));
  };
  const deleteTask = (id) => {
    fetch(`https://task-holder-sever.vercel.app/my-tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.error("Task deleted !!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          refetch();
        }
      })
      .catch((err) => console.error("Error", err));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-start items-start my-2">
      {completedTasks.length ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 place-content-stretch">
          {completedTasks.map((completedTask) => (
            <TaskCard
              key={completedTask._id}
              taskImg={completedTask.taskImg}
              taskTitle={completedTask.taskTitle}
              taskDesc={completedTask.taskDesc}
              deleteTask={() => deleteTask(completedTask._id)}
              handleComplete={() => handleNotComplete(completedTask._id)}
              completeStatus={completedTask.isCompleted}
              handleCompleteText="Not Complete"
              taskId={completedTask._id}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-sky-400 text-center mt-4 font-semibold">
          You haven't complete any task yet !!
        </h1>
      )}
    </div>
  );
};

export default CompletedTasks;
