import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Loader, TaskCard } from "../components";
import { AuthContext } from "../context/AuthProvider";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://task-holder-sever.vercel.app/my-tasks?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const completeTask = (id) => {
    fetch(`https://task-holder-sever.vercel.app/my-tasks/${id}`, {
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
    <div className="flex justify-start items-start">
      {myTasks.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2">
          {myTasks.map((myTask) => (
            <TaskCard
              key={myTask._id}
              taskImg={myTask.taskImg}
              taskTitle={myTask.taskTitle}
              taskDesc={myTask.taskDesc}
              deleteTask={() => deleteTask(myTask._id)}
              handleComplete={() => completeTask(myTask._id)}
              completeStatus={myTask.isCompleted}
              handleCompleteText="Complete"
            />
          ))}
        </div>
      ) : (
        <h1 className="text-sky-400 text-center mt-4 font-semibold text-xl">
          You haven't any Task !!!
        </h1>
      )}
    </div>
  );
};

export default MyTasks;
