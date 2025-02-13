import React from 'react';

const InfoUser = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const user = await response.json();

  if (!user) return <div className="text-gray-500 text-center">Загрузка...</div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h1>
      <div className="flex justify-center mb-4">
        <img 
          src={user.image} 
          alt={user.name} 
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
      </div>
    </div>
  );
};

export default InfoUser;
