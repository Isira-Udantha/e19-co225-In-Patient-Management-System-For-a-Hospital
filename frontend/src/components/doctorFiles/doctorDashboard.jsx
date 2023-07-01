import React, { useState } from 'react';
import DoctorSidebar from './doctorSidebar';
import { AiOutlineUserAdd, AiOutlineMessage, AiOutlineBell, AiOutlineCalendar } from "react-icons/ai";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DoctorDashboard(props) {
  const { isMobile } = props;
  const open = isMobile;
  const totalPatients = 20;
  const totalMeetings = 3; // New variable for total meetings
  const [profilePicture, setProfilePicture] = useState(null);
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleMessageAdmin = () => {
    // Handle message to administration
    console.log("Message to administration");
  };

  const handleViewNotifications = () => {
    // Handle view notifications
    console.log("View notifications");
  };

  const toggleDutyStatus = () => {
    setIsOnDuty(!isOnDuty);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <DoctorSidebar isMobile={isMobile} />
      <div className={` ${open ? "left-72 w-[calc(100%-288px)]" : "left-20 w-[calc(100%-80px)]"} absolute p-2`} style={{ backgroundColor: "red" }}>
        {/* Section 1 - Dashboard Heading */}
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white" style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
          <h1 className="font-bold pl-2"> Dashboard </h1>
        </div>

        {/* Section 2 - User Detail Section */}
        <div className="bg-slate-300 p-6">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {/* item1 */}
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <label htmlFor="profilePictureUpload" className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-8 grid h-32 w-32 place-items-center cursor-pointer">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="object-cover w-30 h-30 rounded-full" />
                ) : (
                  <AiOutlineUserAdd size={50} />
                )}
              </label>
              <input
                id="profilePictureUpload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Doctor Name</p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">John Doe</h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  Any Detail Here
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6">
          {/* Doctors, Nurse, User count */}
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      {/* image here */}
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Total Appointments</h2>
                    <p className="font-bold text-3xl">{totalPatients}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* New section for Total Meetings */}
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-yellow-600 to-purple-400 border-b-4 border-blue-800 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-purple-800">
                      {/* image here */}
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Staff Meetings</h2>
                    <p className="font-bold text-3xl">{totalMeetings}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 - Action Buttons */}
        <div className="bg-white p-6">
          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-purple-200 border border-gray-300 rounded-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={handleMessageAdmin}
            >
              <AiOutlineMessage className="mr-2" /> Message Administration
            </button>
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-yellow-200 border border-gray-300 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleViewNotifications}
            >
              <AiOutlineBell className="mr-2" /> View Notifications
            </button>
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                isOnDuty ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
              onClick={toggleDutyStatus}
            >
              {isOnDuty ? 'Off Duty' : 'On Duty'}
            </button>
          </div>
        </div>

        {/* Section 4 - Calendar View */}
        <div className="bg-white p-6">
          <div className="flex flex-col items-center">
            <AiOutlineCalendar className="text-4xl mb-4" />
            <h2 className="text-xl font-bold mb-2">Calendar View</h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;
