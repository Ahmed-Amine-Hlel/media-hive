"use client";

import {User} from "@/types/User";
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {getMe} from "@/services/user/getMe";
import {getCookie, deleteCookie} from "cookies-next";
import {useRouter} from "next/navigation";


interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);


const UserProvider = ({children}: { children: ReactNode }) => {

    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const logout = useMemo(() => () => {
        deleteCookie('token');
        setUser(null);
        setToken(null);
        router.push('/signin');
    }, [router]);

    useEffect(() => {

        const token = getCookie('token');

        if (!token) {
            setLoading(false);
            return;
        }

        setToken(token);

        const fetchMe = async () => {
            try {
                const user = await getMe();

                if (user.role !== 'admin') {
                    logout();
                    return;
                }

                setUser(user);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setLoading(false);
            }
        }

        fetchMe();

    }, [token, logout]);

    const value = useMemo(() => ({
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
        logout
    }), [user, loading, logout, token]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;