import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleClick = async (category) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      const joke = response.data.value;

      Swal.fire({
        title: `${category}`,
        text: joke,
        showCancelButton: true,
        confirmButtonText: 'Next',
        cancelButtonText: 'Back',
        customClass: {
          confirmButton: 'swal-button',
          cancelButton: 'swal-button',
          popup: 'dialouge-box',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          fetchAnotherJoke(category);
        }
      });
    } catch (error) {
      console.error('Error fetching random joke:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error occurred while fetching joke.',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-popup',
        },
      });
    }
  };

  const fetchAnotherJoke = async (category) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      const joke = response.data.value;

      Swal.fire({
        title: `${category}`,
        text: joke,
        showCancelButton: true,
        confirmButtonText: 'Next',
        cancelButtonText: 'Back',
        customClass: {
          confirmButton: 'swal-button',
          cancelButton: 'swal-button',
          popup: 'dialouge-box',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          fetchAnotherJoke(category);
        }
      });
    } catch (error) {
      console.error('Error fetching random joke:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error occurred while fetching joke.',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'dialouge-box',
        },
      });
    }
  };

  return (
    <div>
      <h2 className="heading">Chuck Norris</h2>
      <ul className="background">
        {items.map(item => (
          <button key={item} onClick={() => handleClick(item)}>
            <li>{item}</li>
            <span>Unlimited Joke on {item}</span>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default ItemList; 