import React from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <div>
      <header>
        <h2>Welcome to Admin Panel</h2>
        <nav>
          <span>{username}</span>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</button>
        </nav>
      </header>
      {/* Include navigation to Employee List */}
    </div>
  );
};

export default Dashboard;
