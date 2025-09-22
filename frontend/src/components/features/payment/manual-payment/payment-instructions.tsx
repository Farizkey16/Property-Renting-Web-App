import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, AlertCircle } from "lucide-react";

type PaymentInstructionProps = {
    totalPriceDisplay: string
}


export const PaymentInstruction = ({totalPriceDisplay}: PaymentInstructionProps) => {

    return(<Card className="py-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Bank Transfer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Bank Name:</span>
                        <span className="font-medium">
                          Bank Central Asia (BCA)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Account Number:</span>
                        <span className="font-medium font-mono">
                          1234567890
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Account Name:</span>
                        <span className="font-medium">
                          PT. Homz Hotels Indonesia
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Amount:</span>
                        <span className="font-bold text-lg text-emerald-600">
                          {totalPriceDisplay}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">
                        Important Notes:
                      </p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Transfer the exact amount shown above</li>
                        <li>• Keep your transfer receipt for upload</li>
                        <li>
                          • Payment must be completed within the time limit
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>)
}

