export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellwithimg">
          {/* <img className="cellimg" src={params.row.img} alt="avatar" /> */}
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Program",
    width: 230,
  },
  {
    field: "age",
    headerName: "Total",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellwithstatus ${params.row.status} `}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  //},
];
export const userRows = [
  {
    id: "629b75886e5c7a0b286c080b",
    username: "Place2",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "active",
    email: "Manali",
    age: 27,
  },
  {
    id: "629b76f76e5c7a0b286c080d",
    username: "Place2",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "pending",
    email: "Manali",
    age: 15,
  },
  {
    id: "629b76f76e5c7a0b286c080d",
    username: "Place2",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "passive",
    email: "Manali",
    age: 45,
  },
  {
    id: "629b7fb96e5c7a0b286c080f",
    username: "Place2",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "passive",
    email: "Manali",
    age: 89,
  },
  {
    id: "629b7fb96e5c7a0b286c080f",
    username: "Place2",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "active",
    email: "Manali",
    age: 47,
  },
  {
    id: 6,
    username: "Melisandre",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "active",
    email: "Manali",
    age: 150,
  },
  {
    id: 7,
    username: "Ferrara",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "active",
    email: "Manali",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "pending",
    email: "ruralAreas",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    // img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // status: "active",
    email: "ruralAreas",
    age: 65,
  },
];
