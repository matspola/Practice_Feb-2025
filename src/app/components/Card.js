import React from 'react';
import Link from 'next/link';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <Link href={`/user/${user.id}`}>
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <h3>{user.firstName} {user.lastName} {user.maidenName}</h3>
      </Link>
    </div>
  );
};

export default UserCard;