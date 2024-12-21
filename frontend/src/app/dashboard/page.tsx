"use client";

import React from 'react';
import useUser from "@/hooks/user/useUser";

const Dashboard = () => {

    const {user, loading} = useUser();

    if (loading) {
        return (
            <div className="h-full flex justify-center items-center">
                Loading...
            </div>
        )
    }

    return (
        <div>

            Welcome {user?.firstName + ' ' + user?.lastName}

        </div>
    );
};

export default Dashboard;