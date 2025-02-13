'use client';

import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import "./globals.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage] = useState(6);
  const [search, setSearch] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [allUsers, setAllUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data.users);
      setAllUsers(data.users);
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      const filteredUsers = allUsers.filter(user => 
        user.firstName.toLowerCase().includes(value.toLowerCase()) || 
        user.lastName.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers); 
    }, 900);

    setTimeoutId(id);
  };

  const indexOfLastUser  = currentPage * countPage;
  const indexOfFirstUser  = indexOfLastUser  - countPage;
  const currentUsers = users.slice(indexOfFirstUser , indexOfLastUser );

  const totalPages = Math.ceil(users.length / countPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <input 
        type="text" 
        placeholder="Поиск пользователей" 
        value={search} 
        onChange={handleSearch} 
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Изменяем классы для сетки, чтобы было по 3 карточки в ряду */}
      <div className="user-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {currentUsers.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>
      
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={currentPage === index + 1}
            className={`mx-1 px-3 py-1 border border-gray-300 rounded-lg transition-colors duration-200 
                        ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;