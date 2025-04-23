"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our context
type Currency = {
  code: string
  symbol: string
  name: string
  exchangeRate: number // Rate relative to KSh (Kenyan Shilling)
}

type Country = {
  code: string
  name: string
  currency: Currency
  flag: string
}

type CurrencyContextType = {
  selectedCountry: Country
  selectedCurrency: Currency
  countries: Country[]
  setSelectedCountry: (country: Country) => void
  formatPrice: (price: number) => string
}

// Create the context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Sample exchange rates (in a real app, these would come from an API)
// These rates are relative to KSh (Kenyan Shilling)
const currencies: Currency[] = [
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", exchangeRate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", exchangeRate: 0.0078 },
  { code: "EUR", symbol: "€", name: "Euro", exchangeRate: 0.0072 },
  { code: "GBP", symbol: "£", name: "British Pound", exchangeRate: 0.0062 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", exchangeRate: 1.17 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", exchangeRate: 0.056 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", exchangeRate: 0.65 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", exchangeRate: 0.012 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", exchangeRate: 0.011 },
  { code: "ZAR", symbol: "R", name: "South African Rand", exchangeRate: 0.14 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", exchangeRate: 3.56 },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound", exchangeRate: 0.24 },
  { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi", exchangeRate: 0.095 },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling", exchangeRate: 29.1 },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling", exchangeRate: 19.6 },
  { code: "RWF", symbol: "RF", name: "Rwandan Franc", exchangeRate: 9.3 },
]

// Sample countries with their currencies
// In a real app, this would be a complete list of all countries
const allCountries: Country[] = [
  { code: "KE", name: "Kenya", currency: currencies.find((c) => c.code === "KES")!, flag: "🇰🇪" },
  { code: "US", name: "United States", currency: currencies.find((c) => c.code === "USD")!, flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", currency: currencies.find((c) => c.code === "GBP")!, flag: "🇬🇧" },
  { code: "DE", name: "Germany", currency: currencies.find((c) => c.code === "EUR")!, flag: "🇩🇪" },
  { code: "FR", name: "France", currency: currencies.find((c) => c.code === "EUR")!, flag: "🇫🇷" },
  { code: "JP", name: "Japan", currency: currencies.find((c) => c.code === "JPY")!, flag: "🇯🇵" },
  { code: "CN", name: "China", currency: currencies.find((c) => c.code === "CNY")!, flag: "🇨🇳" },
  { code: "IN", name: "India", currency: currencies.find((c) => c.code === "INR")!, flag: "🇮🇳" },
  { code: "AU", name: "Australia", currency: currencies.find((c) => c.code === "AUD")!, flag: "🇦🇺" },
  { code: "CA", name: "Canada", currency: currencies.find((c) => c.code === "CAD")!, flag: "🇨🇦" },
  { code: "ZA", name: "South Africa", currency: currencies.find((c) => c.code === "ZAR")!, flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", currency: currencies.find((c) => c.code === "NGN")!, flag: "🇳🇬" },
  { code: "EG", name: "Egypt", currency: currencies.find((c) => c.code === "EGP")!, flag: "🇪🇬" },
  { code: "GH", name: "Ghana", currency: currencies.find((c) => c.code === "GHS")!, flag: "🇬🇭" },
  { code: "UG", name: "Uganda", currency: currencies.find((c) => c.code === "UGX")!, flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", currency: currencies.find((c) => c.code === "TZS")!, flag: "🇹🇿" },
  { code: "RW", name: "Rwanda", currency: currencies.find((c) => c.code === "RWF")!, flag: "🇷🇼" },
  // In a real app, this would include all countries worldwide
]

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Kenya
  const [selectedCountry, setSelectedCountry] = useState<Country>(allCountries[0])
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0])

  // Update selected currency when country changes
  useEffect(() => {
    setSelectedCurrency(selectedCountry.currency)
  }, [selectedCountry])

  // Format price based on selected currency
  const formatPrice = (priceInKSh: number): string => {
    const convertedPrice = priceInKSh * selectedCurrency.exchangeRate

    // Format the price with the appropriate number of decimal places
    let formattedPrice: string

    if (selectedCurrency.code === "JPY" || selectedCurrency.code === "KRW") {
      // Currencies like Yen don't typically show decimal places
      formattedPrice = Math.round(convertedPrice).toLocaleString()
    } else {
      // Most currencies show 2 decimal places
      formattedPrice = convertedPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    return `${selectedCurrency.symbol}${formattedPrice}`
  }

  // In a real app, we would fetch exchange rates from an API
  // For example:
  // useEffect(() => {
  //   const fetchExchangeRates = async () => {
  //     try {
  //       const response = await fetch('https://api.exchangerate-api.com/v4/latest/KES')
  //       const data = await response.json()
  //       // Update exchange rates
  //     } catch (error) {
  //       console.error('Failed to fetch exchange rates:', error)
  //     }
  //   }
  //
  //   fetchExchangeRates()
  //   // Set up a refresh interval (e.g., every hour)
  //   const interval = setInterval(fetchExchangeRates, 60 * 60 * 1000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        selectedCurrency,
        countries: allCountries,
        setSelectedCountry,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

// Custom hook to use the currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
