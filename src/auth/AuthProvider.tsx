import { createContext, useContext, useState } from "react";
import { type AuthContextType, type AuthResponse, type User } from "../types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);
const usersKey = "users";
const currentUserKey = "currentUser";

function getUsers(): User[] {
  const user = localStorage.getItem(usersKey);

  if(user) return JSON.parse(user) as User[]

  return []
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(currentUserKey)
    if(saved) return JSON.parse(saved) as User

    return null
  });

  const updateUser = (user: User) => {
    
    setUser(user);
    localStorage.setItem(currentUserKey, JSON.stringify(user));

    const users = getUsers();

    const updatedUsers = users.map(oldUser => {
      if(oldUser.id === user.id){
        return user
      }
      else{
        return oldUser
      }
    })

    localStorage.setItem(usersKey, JSON.stringify(updatedUsers));

  };

  const register = (username: string, password: string): AuthResponse => {

    const users = getUsers();
    const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());

    if (exists) {
      return{
        success: false,
        message: "User already exists"
      };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      password,
      festivals: []
    };

    users.push(newUser);
    localStorage.setItem(usersKey, JSON.stringify(users));
    updateUser(newUser)

    return{
      success: true,
      user: newUser
    };
  };

  const login = (username: string, password: string): AuthResponse => {

    const users = getUsers();
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if(!existingUser){
      return{
        success: false,
        message: "Specified username doesn't exist"
      }
    }
    if(password !== existingUser.password){
      return{
        success: false,
        message: "Incorrect Password"
      }
    }

    localStorage.setItem(currentUserKey, JSON.stringify(existingUser));
    setUser(existingUser);

    return{
      success: true,
      user: existingUser
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(currentUserKey);
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}