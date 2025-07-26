"use client"

import { Star, Trophy, RotateCcw, Home, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Screen, ShoppingItem } from "../app/page"

interface SummaryScreenProps {
  shoppingItems: ShoppingItem[]
  selectedStore: string
  onNavigate: (screen: Screen) => void
}

export default function SummaryScreen({ shoppingItems, selectedStore, onNavigate }: SummaryScreenProps) {
  const foundItems = shoppingItems.filter((item) => item.found)
  const notFoundItems = shoppingItems.filter((item) => !item.found)
  const completionRate = Math.round((foundItems.length / shoppingItems.length) * 100)
  const timeSaved = "8 minutes"
  const pointsEarned = foundItems.length * 10

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("navigation")} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Shopping Complete!</h1>
            <p className="text-xs text-gray-600">{selectedStore}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Achievement Banner */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-orange-50 border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Great job! 🎉</h2>
            <p className="text-gray-600 mb-4">
              You found {foundItems.length} out of {shoppingItems.length} items in your list
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-600 text-lg">{completionRate}%</div>
                <div className="text-gray-600">Complete</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600 text-lg">{timeSaved}</div>
                <div className="text-gray-600">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-orange-600 text-lg">{pointsEarned}</div>
                <div className="text-gray-600">Points</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Items Summary */}
        <div className="space-y-4">
          {/* Found Items */}
          {foundItems.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Items Found</h3>
                <Badge className="bg-green-100 text-green-800">{foundItems.length}</Badge>
              </div>
              <div className="space-y-2">
                {foundItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.aisle} • {item.section}
                        </p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">✓</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Not Found Items */}
          {notFoundItems.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-gray-900">Items Not Found</h3>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  {notFoundItems.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {notFoundItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.aisle} • {item.section}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Ask Staff
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Rewards Section */}
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Rewards Earned</h3>
              <p className="text-sm text-gray-600">Keep shopping to earn more points!</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-1">
                <span className="text-white font-bold">+{pointsEarned}</span>
              </div>
              <p className="text-xs text-gray-600">Points</p>
            </div>
          </div>
        </Card>

        {/* Feedback Section */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">How was your experience?</h3>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button key={rating} className="p-1">
                <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400 transition-colors" />
              </button>
            ))}
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <Star className="w-4 h-4 mr-2" />
            Rate Store Experience
          </Button>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-3">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onNavigate("home")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New List
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onNavigate("home")}>
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <Button variant="ghost" className="w-full text-sm text-gray-600">
          Explore Other Stores
        </Button>
      </div>
    </div>
  )
}
