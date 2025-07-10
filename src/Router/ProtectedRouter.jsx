import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import {  ContextAPI } from '../Component/Context/AuthProvider';

const ProtectedRouter = ({ children }) => {
    const { user, loading, setLoading } = useContext(ContextAPI);
    const location = useLocation();

   
    if (loading) {
        return <div className="max-w-full md:max-w-5xl lg:max-w-7xl mx-auto p-5 gap-4 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 py-[50px] md:py-[100px] lg:py-[100px]">
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
     if(!user) {
        setLoading(false);
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRouter;