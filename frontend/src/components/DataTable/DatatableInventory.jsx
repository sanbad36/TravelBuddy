import React, { useState } from "react";
import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  inventoryColumns,
  inventoryRows,
} from "../../pages/DatatablesourceInventory";
import { Link } from "react-router-dom";
const Datatable = () => {
  const [data, setData] = useState(inventoryRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new Inventory
        <Link to="/users/new " className="link">
          Add new
        </Link>
      </div>{" "}
      <DataGrid
        rows={data}
        columns={inventoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
