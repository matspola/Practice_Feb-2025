import React from 'react';
import Link from 'next/link';

const Card = ({ user }) => {
  return (
    <div className="user-card border rounded-lg shadow-sm overflow-hidden">
      <Link href={`/user/${user.id}`}>
        <img 
          src={user.image} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-full h-50" 
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName} {user.maidenName}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
