"use client"

import { useState } from "react"
import { Navigation, Clock, ChevronDown, RotateCcw, Check, ZoomIn, ZoomOut, HelpCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import type { Screen, ShoppingItem } from "../app/page"

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
                <ChevronDown className="w-3 h-3 text-gray-400" />
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

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Store Layout Map */}
        <div className="absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: `scale(${zoomLevel})` }}>
            {/* Store Background */}
            <rect x="5" y="5" width="90" height="90" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" rx="2" />

            {/* Store Sections */}
            <rect x="10" y="15" width="20" height="8" fill="#e8f5e8" stroke="#c3e6c3" strokeWidth="0.3" rx="1" />
            <text x="20" y="20" textAnchor="middle" fontSize="2" fill="#2d5a2d" fontWeight="500">
              Produce
            </text>

            <rect x="40" y="55" width="15" height="12" fill="#e3f2fd" stroke="#90caf9" strokeWidth="0.3" rx="1" />
            <text x="47.5" y="62" textAnchor="middle" fontSize="2" fill="#1565c0" fontWeight="500">
              Dairy
            </text>

            <rect x="70" y="30" width="18" height="10" fill="#fff3e0" stroke="#ffcc02" strokeWidth="0.3" rx="1" />
            <text x="79" y="36" textAnchor="middle" fontSize="2" fill="#e65100" fontWeight="500">
              Bakery
            </text>

            <rect x="20" y="75" width="15" height="12" fill="#f3e5f5" stroke="#ce93d8" strokeWidth="0.3" rx="1" />
            <text x="27.5" y="82" textAnchor="middle" fontSize="2" fill="#7b1fa2" fontWeight="500">
              Beverages
            </text>

            <rect x="75" y="70" width="15" height="12" fill="#ffebee" stroke="#ef9a9a" strokeWidth="0.3" rx="1" />
            <text x="82.5" y="77" textAnchor="middle" fontSize="2" fill="#c62828" fontWeight="500">
              Meat
            </text>

            {/* Aisles */}
            <rect x="10" y="30" width="80" height="3" fill="#ffffff" stroke="#dee2e6" strokeWidth="0.2" />
            <rect x="10" y="45" width="80" height="3" fill="#ffffff" stroke="#dee2e6" strokeWidth="0.2" />

            {/* Shopping Route Path */}
            <path
              d="M 50 10 L 15 20 L 45 60 L 75 35 L 25 80 L 50 60 L 80 75"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.8"
              strokeDasharray="1,0.5"
              opacity="0.7"
            />

            {/* Current Position */}
            <circle cx="50" cy="10" r="2" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="50" cy="10" r="3" fill="none" stroke="#10b981" strokeWidth="0.3" opacity="0.5">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Item Pins */}
            {shoppingItems.map((item, index) => (
              <g key={item.id}>
                <circle
                  cx={item.x}
                  cy={item.y}
                  r="2.5"
                  fill={item.found ? "#10b981" : "#ef4444"}
                  stroke="#ffffff"
                  strokeWidth="0.5"
                />
                <text x={item.x} y={item.y + 0.5} textAnchor="middle" fontSize="1.5" fill="#ffffff" fontWeight="600">
                  {item.found ? "✓" : index + 1}
                </text>
              </g>
            ))}

            {/* Entrance */}
            <rect x="45" y="2" width="10" height="3" fill="#6b7280" rx="0.5" />
            <text x="50" y="4" textAnchor="middle" fontSize="1.5" fill="#ffffff" fontWeight="500">
              ENTRANCE
            </text>
          </svg>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 bg-white shadow-md"
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 bg-white shadow-md"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Help Button */}
        <div className="absolute top-4 left-4">
          <Button size="sm" variant="outline" className="bg-white shadow-md">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Me Find
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">You are here</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">To find</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Found</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Shopping List */}
      <div className="bg-white border-t border-gray-200 rounded-t-xl shadow-lg">
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
                  <Switch checked={item.found} onCheckedChange={() => toggleItemFound(item.id)} size="sm" />
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
