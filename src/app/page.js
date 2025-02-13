'use client';

import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import "./globals.css";

const Home = () => {
  //определяем состояния для всего
  const [users, setUsers] = useState([]); //users - массив, который изначально 0, а setUsers изменяет, т.е. он обновляет пользователей которых мы видим на экране
  const [currentPage, setCurrentPage] = useState(1); //страница,с  которой мы начинаем
  const [countPage] = useState(6); //сколько юзеров на странице
  const [search, setSearch] = useState(''); //серч - переменная, куда записывается из поиска слово, и setSearch ищет этого пользователя
  const [timeoutId, setTimeoutId] = useState(null); // это таймер setTimeout'a равен null изначально
  const [allUsers, setAllUsers] = useState([]); //это массив всех пользователей, он просто хранит и по нему проходимся, не записвая в него ничего и не изменяя

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data.users);
      setAllUsers(data.users);
    };// подключаемся к апишке и записываем в два массива юзеров

    fetchUsers();
  }, []); //пустые [] - то что один раз сработает

  const handleSearch = (event) => {
    const value = event.target.value; //перехватывает значение сразу из поля ввода поиска
    setSearch(value); //записывает это значение

    if (timeoutId) {
      clearTimeout(timeoutId);
    } //очистка таймера, чтобы не вызывалась несколько раз, допустим вводится имя слишком быстро, поэтому дожидается, пока не введет пользователь все 

    const id = setTimeout(() => {
      const filteredUsers = allUsers.filter(user => 
        user.firstName.toLowerCase().includes(value.toLowerCase()) || 
        user.lastName.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers); //запись пользователя, который соответствует введеному значению
    }, 900); //сам поиск юзера, выводит через 0,9 секунд после того, как перестанет польз. писать

    setTimeoutId(id);
  };

  //пагинация
  const indexOfLastUser  = currentPage * countPage; //рассчет какой индекс пользователя должен быть последний на этой странице
  const indexOfFirstUser  = indexOfLastUser  - countPage; // какой индекс пользователя должен быть первый на этой странице
  const currentUsers = users.slice(indexOfFirstUser , indexOfLastUser ); //выбор подходящий пользователей

  const totalPages = Math.ceil(users.length / countPage); //подсчёт сколько всего страниц

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };  //

  //вывод, сама разметка
  return (
    <div className="max-w-3xl mx-auto p-4">
      <input 
        type="text" 
        placeholder="Поиск пользователей" 
        value={search} 
        onChange={handleSearch} 
        className="input w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
  
      <div className="user-list flex flex-wrap justify-between gap-4 mt-4">
        {currentUsers.map(user => (
          <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3" key={user.id}>
            <Card user={user} />
          </div>
        ))}
      </div>
  
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={currentPage === index + 1}
            className={`page-button mx-1 px-3 py-1 border rounded-lg transition-colors duration-200 
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