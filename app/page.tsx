"use client"

import { useState } from "react"
import HomeScreen from "../components/home-screen"
import NavigationScreen from "../components/navigation-screen"
import SummaryScreen from "../components/summary-screen"

export type Screen = "home" | "navigation" | "summary"

export interface ShoppingItem {
  id: string
  name: string
  aisle: string
  section: string
  found: boolean
  x: number
  y: number
}

export default function GrocSpotApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedStore, setSelectedStore] = useState("")
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([])

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const updateShoppingItems = (items: ShoppingItem[]) => {
    setShoppingItems(items)
  }

  const updateSelectedStore = (store: string) => {
    setSelectedStore(store)
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {currentScreen === "home" && (
        <HomeScreen
          onNavigate={navigateToScreen}
          onStoreSelect={updateSelectedStore}
          onItemsUpdate={updateShoppingItems}
        />
      )}
      {currentScreen === "navigation" && (
        <NavigationScreen
          selectedStore={selectedStore}
          shoppingItems={shoppingItems}
          onNavigate={navigateToScreen}
          onItemsUpdate={updateShoppingItems}
        />
      )}
      {currentScreen === "summary" && (
        <SummaryScreen shoppingItems={shoppingItems} selectedStore={selectedStore} onNavigate={navigateToScreen} />
      )}
    </div>
  )
}
