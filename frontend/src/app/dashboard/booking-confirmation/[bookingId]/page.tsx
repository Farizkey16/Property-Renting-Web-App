"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-select"
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Bed,
  Shield,
  Mail,
  Phone,
  CreditCard,
  Download,
  Star,
} from "lucide-react"
import { useParams } from "next/navigation"
import { useBookingById, useUserBookingByQuery } from "@/hooks/useBookings"
import { PaymentPageParams } from "../../payment-page/[bookingId]/page"

export default function BookingConfirmation() {

  const param = useParams<PaymentPageParams>()

  const { bookingId } = param

  const {data: booking, isLoading, isError } = useUserBookingByQuery(bookingId)
  console.log("booking data is:", booking)


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">h</span>
            </div>
            <span className="font-bold text-xl text-foreground">homz</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              Properties
            </a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              Support
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted text-lg">
            {"Your reservation has been successfully confirmed. We've sent a confirmation email to your inbox."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted">Full Name</label>
                    <p className="text-foreground font-medium">{}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted">Email Address</label>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      farizky@example.com
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted">Phone Number</label>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      +62 812 3456 789
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted">Guest Type</label>
                    <Badge variant="secondary" className="mt-1">
                      Primary Guest
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Payment Confirmed</p>
                    <p className="text-sm text-green-600">Your payment has been processed successfully</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted">Payment Method</label>
                    <p className="text-foreground font-medium">Credit Card (****1234)</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted">Transaction ID</label>
                    <p className="text-foreground font-medium">TXN-2025090312345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">Room Rate (1 night)</span>
                    <span className="font-medium">Rp 3,156,521</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Taxes & Fees</span>
                    <span className="font-medium">Rp 210,870</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">Rp 2,367,391</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Confirmation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Cancellation Policy</h4>
                  <p className="text-muted">Free cancellation until 24 hours before check-in</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Check-in Requirements</h4>
                  <p className="text-muted">Valid ID and credit card required at check-in</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Contact Property</h4>
                  <p className="text-muted">+65 6297 2828</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-6 text-sm text-muted">
              <a href="#" className="hover:text-foreground transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Customer Support
              </a>
            </div>
            <p className="text-sm text-muted">© 2025 hide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
