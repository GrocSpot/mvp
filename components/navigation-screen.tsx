"use client"

import { useState } from "react"
import { Navigation, Clock, ChevronDown, RotateCcw, Check, ZoomIn, ZoomOut, HelpCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import type { Screen, ShoppingItem } from "../app/page"
import StoreMap from './store-map';

interface NavigationScreenProps {
  selectedStore: string
  shoppingItems: ShoppingItem[]
  onNavigate: (screen: Screen) => void
  onItemsUpdate: (items: ShoppingItem[]) => void
}

export default function NavigationScreen({
  selectedStore,
  shoppingItems,
  onNavigate,
  onItemsUpdate,
}: NavigationScreenProps) {
  const [estimatedTime] = useState("12 min")
  const [zoomLevel, setZoomLevel] = useState(1)

  const toggleItemFound = (id: string) => {
    const updatedItems = shoppingItems.map((item) => (item.id === id ? { ...item, found: !item.found } : item))
    onItemsUpdate(updatedItems)
  }

  const foundItems = shoppingItems.filter((item) => item.found).length
  const totalItems = shoppingItems.length

  const handleFinishShopping = () => {
    onNavigate("summary")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">Store Navigation</h1>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">{selectedStore}</span>
                {/* <ChevronDown className="w-3 h-3 text-gray-400" /> */}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">{estimatedTime}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {foundItems}/{totalItems}
            </Badge>
          </div>
        </div>
      </div>
       <div className="bg-white border-t border-gray-200 rounded-xl shadow-lg h-[98%] m-2 flex flex-col items-center justify-center">
  {/* Map will be displayed here shortly. */}
  <StoreMap/>
 </div>
      {/* Bottom Sheet - Shopping List */}
      <div className="bg-white border-t border-gray-200 rounded-t-xl shadow-lg ">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Shopping List</h3>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-xs">
                <RotateCcw className="w-3 h-3 mr-1" />
                Re-route
              </Button>
              <Badge variant="outline" className="text-xs">
                {totalItems - foundItems} remaining
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="h-48">
          <div className="p-4 space-y-3">
            {shoppingItems.map((item, index) => (
              <Card key={item.id} className="p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                      {item.found ? <Check className="w-3 h-3 text-green-600" /> : <span>{index + 1}</span>}
                    </div>
                    <div>
                      <p
                        className={`font-medium text-sm ${item.found ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.aisle} • {item.section}
                      </p>
                    </div>
                  </div>
                  <Switch checked={item.found} onCheckedChange={() => toggleItemFound(item.id)}  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onNavigate("home")}>
              Change Store
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleFinishShopping}>
              Finish Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
