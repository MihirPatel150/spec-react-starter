import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('nitc-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('nitc-user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call - replace with actual authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const mockUsers = [
      {
        id: '1',
        email: 'admin@nitc.ac.in',
        name: 'NITC Admin',
        role: 'admin',
        department: 'Administration'
      },
      {
        id: '2',
        email: 'student@nitc.ac.in',
        name: 'John Doe',
        role: 'student',
        department: 'Computer Science',
        registrationNumber: 'CS2021001'
      },
      {
        id: '3',
        email: 'faculty@nitc.ac.in',
        name: 'Dr. Jane Smith',
        role: 'faculty',
        department: 'Computer Science'
      }
    ];

    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === 'password123') {
      localStorage.setItem('nitc-user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      department: data.department,
      registrationNumber: data.registrationNumber,
    };

    localStorage.setItem('nitc-user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('nitc-user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};