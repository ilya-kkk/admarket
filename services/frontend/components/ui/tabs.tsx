import React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Tabs({ className, ...props }: TabsProps) {
  return <div className={cn("flex flex-col", className)} {...props} />
}

export function TabsList({ className, ...props }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-800 p-1 text-gray-400",
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-700 data-[state=active]:text-white",
        className
      )}
      {...props}
    />
  )
} 