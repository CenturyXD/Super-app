import React from 'react';
import Calendar from  '../../Components/Celendar/calendar';
import NavbarPage from '../../Components/navbar/navbarPage';

const HomePage = () => {
  return (
    <>
    <NavbarPage />
    <div className="mt-16"> {/* Add margin-top to create space */}
        <Calendar />
      </div>
    </>
  );
};

export default HomePage;