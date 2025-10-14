"use client"

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return user ? children : null;
};

export default ProtectedRoute;
