import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  email: string
  name: string
  picture?: string
  phoneNumber?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
  verifyOTP: (otp: string) => Promise<boolean>
  sendOTP: (phoneNumber: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('agrisense_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error parsing stored user:', e)
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('agrisense_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('agrisense_user')
  }

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    // Mock OTP sending - In production, this would call your backend API
    // which would send OTP via SMS service (Twilio, Firebase, etc.)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Store OTP in sessionStorage for verification (mock)
        const mockOTP = '123456' // In production, generate random OTP
        sessionStorage.setItem('otp_code', mockOTP)
        sessionStorage.setItem('otp_phone', phoneNumber)
        console.log(`Mock OTP sent to ${phoneNumber}: ${mockOTP}`)
        resolve(true)
      }, 1000)
    })
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Mock OTP verification - In production, this would call your backend API
    const storedOTP = sessionStorage.getItem('otp_code')
    const phoneNumber = sessionStorage.getItem('otp_phone')
    
    if (storedOTP === otp && phoneNumber) {
      // Update user with verified phone number
      if (user) {
        const updatedUser = { ...user, phoneNumber, isVerified: true }
        setUser(updatedUser)
        localStorage.setItem('agrisense_user', JSON.stringify(updatedUser))
      }
      sessionStorage.removeItem('otp_code')
      sessionStorage.removeItem('otp_phone')
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        verifyOTP,
        sendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

