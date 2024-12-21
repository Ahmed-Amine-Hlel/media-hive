import type {Metadata} from 'next';
import './globals.css';
import UserProvider from "@/context/UserContext";
import ActorProvider from "@/context/ActorContext";
import MovieProvider from "@/context/MovieContext";
import {Toaster} from "@/components/ui/toaster";
import GenreProvider from "@/context/GenreContext";

export const metadata: Metadata = {
    title: 'MediaHive',
    description: 'MediaHive',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <UserProvider>
            <ActorProvider>
                <MovieProvider>
                    <GenreProvider>
                        {children}
                    </GenreProvider>
                    <Toaster/>
                </MovieProvider>
            </ActorProvider>
        </UserProvider>
        </body>
        </html>
    );
}
