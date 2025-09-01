"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Search, Filter, Calendar, MapPin, Users, Star, Download } from "lucide-react"

// Mock trip history data
const tripHistory = [
  {
    id: "TR001",
    property: "Seaside Resort & Spa",
    location: "Santorini, Greece",
    checkIn: "2024-07-10",
    checkOut: "2024-07-17",
    guests: 2,
    status: "completed",
    amount: "$2,450",
    rating: 5,
    image: "/santorini-resort.png",
  },
  {
    id: "TR002",
    property: "Mountain Cabin Retreat",
    location: "Aspen, Colorado",
    checkIn: "2024-05-20",
    checkOut: "2024-05-25",
    guests: 4,
    status: "completed",
    amount: "$1,680",
    rating: 4,
    image: "/mountain-cabin-aspen.png",
  },
  {
    id: "TR003",
    property: "City Center Loft",
    location: "Paris, France",
    checkIn: "2024-03-15",
    checkOut: "2024-03-22",
    guests: 3,
    status: "completed",
    amount: "$1,890",
    rating: 5,
    image: "/paris-loft-apartment.png",
  },
  {
    id: "TR004",
    property: "Desert Oasis Villa",
    location: "Dubai, UAE",
    checkIn: "2024-01-08",
    checkOut: "2024-01-15",
    guests: 6,
    status: "cancelled",
    amount: "$3,200",
    rating: null,
    image: "/dubai-villa-desert.png",
  },
]

const HistoryTripsPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
      </div>
    )
  }

  return (
      <div className="p-6">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Trip History</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search trips..." className="pl-10 w-full sm:w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {tripHistory.map((trip) => (
                <Card key={trip.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Property Image */}
                      <div className="w-full lg:w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.property}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Trip Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{trip.property}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {trip.location}
                            </div>
                          </div>
                          <Badge className={getStatusColor(trip.status)}>
                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {new Date(trip.checkIn).toLocaleDateString()} -{" "}
                              {new Date(trip.checkOut).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{trip.guests} guests</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="font-semibold text-gray-900">{trip.amount}</span>
                          </div>
                        </div>

                        {/* Rating */}
                        {trip.rating && <div className="pt-2">{renderStars(trip.rating)}</div>}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            View Details
                          </Button>
                          {trip.status === "completed" && (
                            <>
                              <Button variant="outline" size="sm">
                                Download Receipt
                              </Button>
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                              {!trip.rating && (
                                <Button variant="outline" size="sm">
                                  Leave Review
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {tripHistory.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trip history</h3>
                <p className="text-gray-500 mb-4">Your completed trips will appear here.</p>
                <Button className="bg-orange-500 hover:bg-orange-600">Start Exploring</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  )
}

export default HistoryTripsPage
