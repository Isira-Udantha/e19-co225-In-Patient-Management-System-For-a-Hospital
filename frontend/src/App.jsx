import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminDashboard from './components/adminFiles/displayDashboard';
// import AdminDoctors from './components/adminFiles/displayDoctors';
import AdminDoctors from './components/adminFiles/AdminDoctors';
import AdminNurses from './components/adminFiles/displayNurses';
import AdminWards from './components/adminFiles/displayWards';
import AdminAddStaff from './components/adminFiles/AdminAddStaff';

import PatientDashboard from './components/patientFiles/patientDashboard';
import PatientProfile from './components/patientFiles/patientProfile';

import DoctorDashboard from './components/doctorFiles/doctorDashboard';
import DoctorProfile from './components/doctorFiles/doctorProfile';

import NurseDashboard from './components/NurseFiles/NurseDashboard';
import NurseProfile from './components/NurseFiles/NurseProfile';
import UnAuthorized from './components/unauthorized';
import Login from './components/loginfiles/Login';

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth > 600);
        };

        // Add event listener to window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard isMobile={isMobile} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard isMobile={isMobile} />} />
            <Route path="/admin/doctors" element={<AdminDoctors isMobile={isMobile} />} />
            <Route path="/admin/nurses" element={<AdminNurses isMobile={isMobile} />} />
            <Route path="/admin/wards" element={<AdminWards isMobile={isMobile} />} />
            <Route path="/admin/addStaff" element={<AdminAddStaff isMobile={isMobile} />} />

            <Route path="/patient" element={<PatientDashboard isMobile={isMobile} />} />
            <Route path="/patient/dashboard" element={<PatientDashboard isMobile={isMobile} />} />
            <Route path="/patient/profile" element={<PatientProfile isMobile={isMobile} />} />

            <Route path="/doctor" element={<DoctorDashboard isMobile={isMobile} />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard isMobile={isMobile} />} />
            <Route path="/doctor/profile" element={<DoctorProfile isMobile={isMobile} />} />

            <Route path="/nurse" element={<NurseDashboard isMobile={isMobile} />} />
            <Route path="/nurse/dashboard" element={<NurseDashboard isMobile={isMobile} />} />
            <Route path="/nurse/profile" element={<NurseProfile isMobile={isMobile} />} />

            <Route path="unauthorized" element={<UnAuthorized isMobile={isMobile} />} />
        </Routes>
    );
}

export default App;
