"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>KAMINAMI</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="dashboard">
              <AccordionTrigger>Dashboard</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <a href="/dashboard/overview" className="text-sm py-1 hover:text-primary">
                    Overview
                  </a>
                  <a href="/dashboard/analytics" className="text-sm py-1 hover:text-primary">
                    Analytics
                  </a>
                  <a href="/dashboard/recent-activity" className="text-sm py-1 hover:text-primary">
                    Recent Activity
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jobs">
              <AccordionTrigger>Jobs</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Active Listings
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Create New Job
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Job Templates
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Archived Jobs
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="candidates">
              <AccordionTrigger>Candidates</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    All Candidates
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Matched Candidates
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Resume Database
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Talent Pool
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reports">
              <AccordionTrigger>Reports</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Match Analytics
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Hiring Metrics
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Candidate Sources
                  </a>
                  <a href="#" className="text-sm py-1 hover:text-primary">
                    Custom Reports
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium mb-2 px-4">Account</h3>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Profile Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Team Management
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Subscription
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              API Access
            </a>
            <div className="border-t border-gray-100 my-2"></div>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Sign Out
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
