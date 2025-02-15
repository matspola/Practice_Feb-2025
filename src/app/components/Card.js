'use client';

import React from 'react';
import Link from 'next/link';

const Card = ({ user }) => {
  return (
    <div className="user-card border rounded-lg shadow-sm overflow-hidden mx-8 my-10">
      <Link href={`/user/${user.id}`}>
      <div className="flex flex-col text-center">
        <img 
          src={user.image} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-56 h-56" 
        />
        
          <h3 className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName} {user.maidenName}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
