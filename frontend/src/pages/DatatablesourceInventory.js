import { Button } from "@mui/material";

export const inventoryColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "Inventory",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="cellwithimg">
            <img className="cellimg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "age",
      headerName: "Number",
      width: 280,
    }
  ];

  export const inventoryRows = [
    {
      id: 1,
      username: "Cement",
      img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      status: "active",
      email: "Andheri West, Mumbai",
      age: 500,
    },
    {
      id: 2,
      username: "Tiles",
      img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      status: "pending",
      email: "Thane, Mumbai",
      age: 500,
    },
    {
      id: 3,
      username: "Wires",
      img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      status: "passive",
      email: "Sagarcity, Pune",
      age: 2000,
    }
  ];
  