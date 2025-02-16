'use client';

import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import "./globals.css";

const countPage = 10; //сколько юзеров на странице

const Home = () => {
  //определяем состояния для всего
  const [users, setUsers] = useState([]); //users - массив, который изначально 0, а setUsers изменяет, т.е. он обновляет пользователей которых мы видим на экране
  const [currentPage, setCurrentPage] = useState(1); //страница,с  которой мы начинаем
  const [search, setSearch] = useState(''); //серч - переменная, куда записывается из поиска слово, и setSearch ищет этого пользователя
  const [timeoutId, setTimeoutId] = useState(null); // это таймер setTimeout'a равен null изначально
  const [totalPages, settotalPages] = useState([0]); //это массив всех пользователей, он просто хранит и по нему проходимся, не записвая в него ничего и не изменяя

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/all?search=${search}&limit=${countPage}&skip=${(currentPage - 1) * countPage}`);
      if (!response.ok) {
        throw new Error (`Ошибка HTTP: ${response.status}`)
      }  
      const data = await response.json();
      setUsers(data.users);
      settotalPages(Math.ceil(data.total / countPage));
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };// подключаемся к апишке и записываем в два массива юзеров

    fetchUsers();
  }, [currentPage, search]); //обновление происходит после изменения переменной currentPage, search

  const handleSearch = (event) => {
    const value = event.target.value; // Перехватывает значение из поля ввода
    setSearch(value); // Записывает это значение

    if (timeoutId) {
      clearTimeout(timeoutId); // Очищаем предыдущий таймер
    }

    const id = setTimeout(() => {
      // Просто вызываем обновление состояния через 900 мс
      setCurrentPage(1);
    }, 900); // Задержка 900 миллисекунд

    setTimeoutId(id); // Сохраняем ID таймера
  };
  
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  //вывод, сама разметка
  return (
    <div className="">
      <center>
        <input 
            type="text" 
            placeholder="Поиск пользователей" 
            value={search} 
            onChange={handleSearch} 
            className="input px-48 p-2 border rounded-lg "
        />
      </center>

      <div className=" flex flex-wrap justify-center mt-4r"> 
          {users.map(user => (
            <Card user={user} key={user.id} />
          ))}
      </div>

      <div className="pagination flex flex-wrap justify-center mt-4">
          {pages.map(page => (
              <button 
                  key={page} 
                  onClick={() => setCurrentPage(page)} 
                  className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
              >
                  {page}
              </button>
          ))}
      </div>
  </div>

  );
  
};

export default Home;