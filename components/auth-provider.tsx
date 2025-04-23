"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "merchant" | "admin"
  isVerified: boolean
  isMfaEnabled: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; requiresMfa?: boolean }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>
  verifyMfa: (code: string) => Promise<{ success: boolean; message: string }>
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the session
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating authentication logic
      if (email === "user@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "John Kamau",
          email: "user@example.com",
          role: "user",
          isVerified: true,
          isMfaEnabled: false,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return { success: true, message: "Login successful" }
      } else if (email === "merchant@example.com" && password === "password") {
        const userData: User = {
          id: "2",
          name: "Wanjiku Furniture",
          email: "merchant@example.com",
          role: "merchant",
          isVerified: true,
          isMfaEnabled: false,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return { success: true, message: "Login successful" }
      } else if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "3",
          name: "Admin Ochieng",
          email: "admin@example.com",
          role: "admin",
          isVerified: true,
          isMfaEnabled: true,
        }
        // For admin, we'll simulate MFA requirement
        return { success: true, message: "MFA required", requiresMfa: true }
      }

      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to register
      // Simulating registration logic
      if (email === "user@example.com") {
        return { success: false, message: "Email already in use" }
      }

      // Simulate successful registration
      return {
        success: true,
        message: "Registration successful. Please check your email to verify your account.",
      }
    } catch (error) {
      console.error("Registration failed:", error)
      return { success: false, message: "An error occurred during registration" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const verifyEmail = async (token: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to verify the email
      // Simulating verification logic
      if (token === "valid-token") {
        return { success: true, message: "Email verified successfully" }
      }

      return { success: false, message: "Invalid or expired verification token" }
    } catch (error) {
      console.error("Email verification failed:", error)
      return { success: false, message: "An error occurred during email verification" }
    } finally {
      setIsLoading(false)
    }
  }

  const verifyMfa = async (code: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to verify the MFA code
      // Simulating MFA verification logic
      if (code === "123456") {
        const userData: User = {
          id: "3",
          name: "Admin Ochieng",
          email: "admin@example.com",
          role: "admin",
          isVerified: true,
          isMfaEnabled: true,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return { success: true, message: "MFA verification successful" }
      }

      return { success: false, message: "Invalid MFA code" }
    } catch (error) {
      console.error("MFA verification failed:", error)
      return { success: false, message: "An error occurred during MFA verification" }
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerification = async (email: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to resend verification email
      // Simulating resend logic
      return { success: true, message: "Verification email sent successfully" }
    } catch (error) {
      console.error("Resend verification failed:", error)
      return { success: false, message: "An error occurred while resending verification email" }
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    verifyMfa,
    resendVerification,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
