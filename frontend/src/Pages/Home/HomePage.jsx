<<<<<<< HEAD
import React from 'react';
import Calendar from  '../../Components/Celendar/calendar';
import NavbarPage from '../../Components/navbar/navbarPage';
=======
>>>>>>> d1eb0b3d2f48c6536b8af5d2bda9a333f8bb0b0c

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