import { Navigate } from 'react-router-dom';
import type {JSX} from "react";
import isTokenExpired from "./isTokenExpired.tsx";

export default function ProtectedRoute({children}: {children: JSX.Element}) {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
        return <Navigate to="/" replace/>;
    }

    return children;
}