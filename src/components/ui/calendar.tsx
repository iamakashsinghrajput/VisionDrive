"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col text-white sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-bold text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 hover:bg-zinc-800 hover:text-cyan-300 border-none"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-zinc-400 rounded-md w-12 font-medium text-sm",
        row: "flex w-full mt-2",
        cell: "h-12 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected])]:bg-cyan-600/50 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
        day: "h-12 w-12 p-0 font-normal text-cyan-700 aria-selected:opacity-70 rounded-full",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 font-bold",
        day_today: "bg-zinc-800 text-cyan-700",
        day_outside: "day-outside text-zinc-100 text-white",
        day_disabled: "text-muted-foreground opacity-10",
        day_range_middle: "bg-cyan-700 text-black rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
