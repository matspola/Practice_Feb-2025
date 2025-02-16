'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const InfoUser = ({ params }) => {
  const id = React.use(params).id;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${id}`);
        
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        setError(error.message); 
      } 
    };

    fetchUserData();
  }, [id]); // Зависимость от id


  if (!user) {
    return <div>Загрузка...</div>; // Если пользователь не найден
  }

  return (
    <div className="max-w-lg mx-auto h-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.firstName}</h1>
      <div className="flex justify-center mb-4">
        <img 
          src={user.image} 
          alt={user.firstName} 
          className="w-24 h-24 rounded-full border border-gray-300 object-cover"
        />
      </div>
      <div className="text-gray-700">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Birthday date:</strong> {user.birthDate}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Weight:</strong> {user.weight}</p>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Eye Color:</strong> {user.eyeColor}</p>
        <p><strong>Hair:</strong> {user.hair.color}, {user.hair.type}</p>
        <p><strong>Ip:</strong> {user.ip}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Address:</strong> {user.address.state}, {user.address.city}, {user.address.address}</p>
        <p><strong>Address (in detail):</strong> <i>state code:</i> {user.address.stateCode}, <i>postal code:</i> {user.address.postalCode}, coordinates: {user.address.coordinates.lat} (lat), {user.address.coordinates.lng} (lng)</p>
        <p><strong>Ein:</strong> {user.ein}</p>
        <p><strong>Ssn:</strong> {user.ssn}</p>
        <p><strong>User Agent:</strong> {user.userAgent}</p>
        <p><strong>Crypto:</strong> {user.crypto.coin}, {user.crypto.wallet}, {user.crypto.network}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p className='my-4'>
          <Link href="/" className="bg-gray-200 hover:bg-gray-300 py-2 px-2 rounded">
            Быстро назад я сказала!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default InfoUser;
