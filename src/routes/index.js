import React, { Suspense, lazy, StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));
const Users = lazy(() => import("../pages/Users"));
const Parameters = lazy(() => import("../pages/Parameters"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export default function MyRouter() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<>Error message</>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/parameters" element={<Parameters />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  );
}
