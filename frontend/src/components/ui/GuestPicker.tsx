"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Users, Minus, Plus } from "lucide-react";

interface Guests{
    adults: number;
    children: number;
    rooms: number
}

interface GuestPickerProps {
    value: Guests;
    onChange: (value: Guests) => void
}

const Counter = ({ title, description, value, onValueChange}: { title: string; description: string; value: number; onValueChange: (value: number) => void}) => (
    <div className="flex items-center justify-between">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        disabled={value === (title === 'Adults' || title === 'Rooms' ? 1 : 0)}
        onClick={() => onValueChange(value - 1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => onValueChange(value + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

export function GuestPicker({ value, onChange}: GuestPickerProps) {
    const triggerText = `${value.adults} Adult(s), ${value.children} Child(ren), ${value.rooms} Room(s)`

    const handleValueChange = (field: keyof Guests, newValue: number) => {
        onChange({
            ...value,
            [field]: newValue
        })
    }

    return(
        <Popover>
      <PopoverTrigger asChild>
        <button className="flex-1 flex items-center px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-600">
          <Users className="w-4 h-4 text-gray-400 mr-2" />
          <span>{triggerText}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 space-y-4 bg-gray-50">
        <Counter 
          title="Adults" 
          description="Ages 13 or above"
          value={value.adults}
          onValueChange={(val) => handleValueChange('adults', val)}
        />
        <Separator />
        <Counter 
          title="Children" 
          description="Ages 2-12"
          value={value.children}
          onValueChange={(val) => handleValueChange('children', val)}
        />
        <Separator />
        <Counter 
          title="Rooms" 
          description="Number of rooms"
          value={value.rooms}
          onValueChange={(val) => handleValueChange('rooms', val)}
        />
      </PopoverContent>
    </Popover>
    )
}

