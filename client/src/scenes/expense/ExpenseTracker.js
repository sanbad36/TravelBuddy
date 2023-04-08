import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from 'components/ListItem';
import './ExpenseTracker.css';
import Navbar from '../navbar';

const ExpenseTracker = () => {
  const [place, setPlace] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [items, setItems] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const addItem = async (e) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        place: place,
        expenditure: expenditure
      }
    ]);
    setPlace('');
    setExpenditure('');
    // const { data } = await axios.post('/task', { text });
    // setLoading(true);
  };

  const deleteItem = async (id) => {
    const { data } = await axios.delete(`/task/${id}`);
    setLoading(true);
  };

  const setUpdate = async (val, id) => {
    console.log(`${val}`);
    const { data } = await axios.put(`/task/${id}`, { text: val });
    setLoading(true);
  };

  useEffect(() => {
    setTotalExpense(0);
    if (items.length != 0) {
      items.forEach((item, idx) => {
        setTotalExpense((prev) => prev + Number(item.expenditure));
      });
    }
  }, [items]);

  return (
    <>
      <Navbar />
      <div className="expense-body">
        <div className="expense-app">
          <span style={{ fontSize: '2.5rem', color: '#FFF', display:"block", paddingTop:"2rem" }}>Expense Tracker</span>
          <header>
            <form id="to-do-form" onSubmit={(e) => addItem(e)}>
              <input type="text" placeholder="Enter place" value={place} onChange={(e) => setPlace(e.target.value)} />
              <input
                type="text"
                placeholder="Enter expense"
                value={expenditure}
                onChange={(e) => setExpenditure(e.target.value)}
              />
              <button type="submit" style={{ fontSize: '1.3rem' }}>
                Add
              </button>
            </form>
          </header>
          {items &&
            items.map((item, idx) => {
              return <ListItem key={idx} item={item} deleteItem={deleteItem} setUpdate={setUpdate} />;
            })}

          <span style={{ color: '#fff', fontSize: '1.5rem' }}>Total Expense: {totalExpense}</span>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
