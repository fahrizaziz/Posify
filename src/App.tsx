import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PosifyWebAdmin } from './components/posify/PosifyWebAdmin';
import { LoginPage } from './components/posify/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { SEED_USERS } from './data/posifySeedData';

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage 
                onLogin={(user, token) => setAuth(user, token, '')} 
                allUsers={SEED_USERS}
                themeMode="system"
                onThemeChange={() => {}}
                isResolvedDark={false}
                langMode="system"
                resolvedLang="id"
                onLangModeChange={() => {}}
              />
            )
          } 
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<PosifyWebAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
