import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@asseinfo/react-kanban";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Home from "./Home/home.scss";
import '@asseinfo/react-kanban/dist/styles.css'
const board = {
  columns: [
    {
      id: 1,
      title: "Pending",
      cards: [
        {
          id: 1,
          title: "Task 1",
          description: "Painting, Bandra"
        },
        {
          id: 2,
          title: "Task 2",
          description: "Colouring, Marol"
        },
        {
          id: 3,
          title: "Task 3",
          description: "Transporting, Borivali"
        }
      ]
    },
    {
      id: 2,
      title: "Assigned",
      cards: [
        {
          id: 9,
          title: "Task 9",
          description: "Logistics, Borivali"
        }
      ]
    },
    {
      id: 3,
      title: "In Progress",
      cards: [
        {
          id: 10,
          title: "Task 10",
          description: "Cleaning, Juhu"
        },
        {
          id: 11,
          title: "Task 11",
          description: "Working, Pumphouse"
        }
      ]
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Task 12",
          description: "Coloring, Andheri"
        },
        {
          id: 13,
          title: "Task 13",
          description: "Painting, Bhopal"
        }
      ]
    }
  ]
};

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}

function UncontrolledBoard() {
  return (
     
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={draftCard => ({
        id: new Date().getTime(),
        ...draftCard
      })}
      onCardNew={console.log}
    />
  );
}

function AssignTasks() {
  return (
    <>
 <div className="home"><Sidebar />
 <div className="homeContainer">
 <Navbar />
 <div style={{margin:"5%"}}>
     <h1>Task Assignment and Status</h1>
     <br />
 <UncontrolledBoard />
 </div>
      </div>
      </div>
    </>
  );
}

export default AssignTasks
