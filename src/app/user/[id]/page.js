import React from 'react';

const UserDetail = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const user = await response.json();

  if (!user) return <div className="text-gray-500 text-center">Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h1>
      <div className="flex justify-center mb-4">
        <img 
          src={user.image} 
          alt={user.name} 
          className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
        />
      </div>
      <div className="space-y-2">
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Age:</strong> {user.age}</p>
        <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
        <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
        <p className="text-gray-700"><strong>Password:</strong> {user.password}</p>
        <p className="text-gray-700"><strong>Birthday date:</strong> {user.birthDate}</p>
        <p className="text-gray-700"><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p className="text-gray-700"><strong>Weight:</strong> {user.weight}</p>
        <p className="text-gray-700"><strong>Height:</strong> {user.height}</p>
        <p className="text-gray-700"><strong>Eye Color:</strong> {user.eyeColor}</p>
        <p className="text-gray-700"><strong>Hair:</strong> {user.hair.color}, {user.hair.type}</p>
      </div>
    </div>
  );
};

export default UserDetail;
