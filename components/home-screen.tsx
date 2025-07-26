"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Clock, Star, ChevronRight, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Screen, ShoppingItem } from "../app/page"
import Image from "next/image";
import Logo from "../public/grocspot-logo.jpeg";

interface Store {
  id: string
  name: string
  distance: string
  isOpen: boolean
  rating: number
  estimatedTime: string
}

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
  onStoreSelect: (store: string) => void
  onItemsUpdate: (items: ShoppingItem[]) => void
}

const suggestedItems = ["Milk", "Bread", "Eggs", "Bananas", "Chicken", "Rice", "Yogurt", "Apples"]

const nearbyStores: Store[] = [
  { id: "1", name: "Whole Foods Market", distance: "0.3 mi", isOpen: true, rating: 4.8, estimatedTime: "12 min" },
  { id: "2", name: "Safeway", distance: "0.7 mi", isOpen: true, rating: 4.2, estimatedTime: "15 min" },
  { id: "3", name: "Target Grocery", distance: "1.2 mi", isOpen: false, rating: 4.5, estimatedTime: "18 min" },
]

export default function HomeScreen({ onNavigate, onStoreSelect, onItemsUpdate }: HomeScreenProps) {
  const [searchInput, setSearchInput] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState("")

  const addItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item])
    }
    setSearchInput("")
  }

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput.trim()) {
      addItem(searchInput.trim())
    }
  }

  const handleFindItems = () => {
    if (selectedItems.length > 0 && selectedStoreId) {
      const selectedStore = nearbyStores.find((s) => s.id === selectedStoreId)
      if (selectedStore) {
        onStoreSelect(selectedStore.name)

        // Convert selected items to ShoppingItem format with mock data
        const shoppingItems: ShoppingItem[] = selectedItems.map((item, index) => ({
          id: `item-${index}`,
          name: item,
          aisle: `A${Math.floor(Math.random() * 5) + 1}`,
          section: ["Produce", "Dairy", "Bakery", "Meat", "Beverages"][Math.floor(Math.random() * 5)],
          found: false,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        }))

        onItemsUpdate(shoppingItems)
        onNavigate("navigation")
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
            {/* <span className="text-white font-bold text-lg">G</span> */}
            <Image src={Logo} alt="GrocSpot Logo" className="rounded-xl" width={40} height={40} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">GrocSpot</h1>
            <p className="text-sm text-gray-600">Find items faster in-store</p>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">Welcome back! 👋</h2>
              <p className="text-sm text-gray-600">What are you shopping for today?</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">🛒</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Add items to your list..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
          {searchInput && (
            <Button
              size="sm"
              onClick={() => addItem(searchInput.trim())}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-lg px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div className="px-4 py-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Shopping List ({selectedItems.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item) => (
                <div key={item} className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full">
                  <span className="text-sm font-medium">{item}</span>
                  <button onClick={() => removeItem(item)} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Items */}
        <div className="px-4 py-4">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Add</h3>
          <div className="grid grid-cols-4 gap-3">
            {suggestedItems.map((item) => (
              <button
                key={item}
                onClick={() => addItem(item)}
                disabled={selectedItems.includes(item)}
                className={`p-3 rounded-xl border-2 border-dashed text-center transition-all ${
                  selectedItems.includes(item)
                    ? "border-green-300 bg-green-50 text-green-600"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                <div className="text-lg mb-1">
                  {item === "Milk" && "🥛"}
                  {item === "Bread" && "🍞"}
                  {item === "Eggs" && "🥚"}
                  {item === "Bananas" && "🍌"}
                  {item === "Chicken" && "🍗"}
                  {item === "Rice" && "🍚"}
                  {item === "Yogurt" && "🥛"}
                  {item === "Apples" && "🍎"}
                </div>
                <span className="text-xs font-medium text-gray-700">{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Location & Stores */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Nearby Stores</h3>
            <button className="flex items-center text-green-600 text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1" />
              Current Location
            </button>
          </div>

          <div className="space-y-3">
            {nearbyStores.map((store) => (
              <Card
                key={store.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedStoreId === store.id
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedStoreId(store.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{store.name}</h4>
                      {store.isOpen ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">Open</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Closed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {store.distance}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {store.rating}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {store.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-4 bg-white border-t border-gray-200">
        <Button
          onClick={handleFindItems}
          disabled={selectedItems.length === 0 || !selectedStoreId}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find My Items in Store ({selectedItems.length})
        </Button>
      </div>
    </div>
  )
}
