import React, { createContext, useState } from 'react'
import { ExtendedPurchaseInCartDetailType } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchaseInCartDetail: ExtendedPurchaseInCartDetailType[]
  setExtendedPurchaseInCartDetail: React.Dispatch<React.SetStateAction<ExtendedPurchaseInCartDetailType[]>>
  reset: () => void
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchaseInCartDetail: [],
  setExtendedPurchaseInCartDetail: () => null,
  reset: () => null
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [extendedPurchaseInCartDetail, setExtendedPurchaseInCartDetail] = useState<ExtendedPurchaseInCartDetailType[]>(
    []
  )
  const reset = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setIsAuthenticated(false), setProfile(null), setExtendedPurchaseInCartDetail([])
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchaseInCartDetail,
        setExtendedPurchaseInCartDetail,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
