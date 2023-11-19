import React from 'react';

const EmployeeDashboard = ({ role, username }) => {
  const renderDashboardContent = () => {
    if (!role || !username) {
      return <p>Please provide role and username for the employee.</p>;
    }

    switch (role) {
      case 'cashier':
        return (
          <div>
            <h3>Cashier Dashboard</h3>
            <p>Welcome, {username}!</p>
            {/* cashier information and actions */}
          </div>
        );
      case 'manager':
        return (
          <div>
            <h3>Manager Dashboard</h3>
            <p>Welcome, {username}!</p>
            {/* manager information and actions */}
          </div>
        );
      default:
        return <p>Invalid role</p>;
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      {renderDashboardContent()}
    </div>
  );
};

export default EmployeeDashboard;
