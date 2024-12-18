"use client";

import {User} from "@/types/User";
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {getMe} from "@/services/user/getMe";
import {getCookie} from "cookies-next";


interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);


const UserProvider = ({children}: { children: ReactNode }) => {

    const token = getCookie('token');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const logout = () => {
    }

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchMe = async () => {
            try {
                const user = await getMe();
                setUser(user);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setLoading(false);
            }
        }

        fetchMe();

    }, [token]);

    const value = useMemo(() => ({
        user,
        setUser,
        loading,
        setLoading,
        logout
    }), [user, loading]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;