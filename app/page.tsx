"use client"

import Link from "next/link"
import ResumeUploader from "@/components/resume-uploader"
import CriteriaUploader from "@/components/criteria-uploader"
import AnalysisProcessor from "@/components/analysis-processor"
import ResultsTable from "@/components/results-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MobileNav from "@/components/mobile-nav"
import { ResumeAnalysisProvider, useResumeAnalysis } from "@/contexts/resume-analysis-context"

function MainContent() {
  const { state, dispatch } = useResumeAnalysis()

  const handleContinueToAnalysis = () => {
    if (state.uploadedFiles.length === 0) {
      dispatch({ type: "SET_ERROR", payload: "Please upload at least one resume before continuing." })
      return
    }

    if (!state.jobCriteria) {
      dispatch({ type: "SET_ERROR", payload: "Please define job criteria before continuing." })
      return
    }

    dispatch({ type: "SET_CURRENT_STEP", payload: "analyze" })
  }

  const canContinueToAnalysis = state.uploadedFiles.length > 0 && state.jobCriteria !== null

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
            NAMIRecruit
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary flex items-center gap-1">
                Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a
                    href="/dashboard/overview"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Overview
                  </a>
                  <a
                    href="/dashboard/analytics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Analytics
                  </a>
                  <a
                    href="/dashboard/recent-activity"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Recent Activity
                  </a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link href="/job-analysis" className="text-sm font-medium hover:text-primary">
                Job Analysis
              </Link>
            </div>

            <Link href="/resume-database" className="text-sm font-medium hover:text-primary">
              Resume Database
            </Link>

            <Link href="/hr-kpi-guide" className="text-sm font-medium hover:text-primary">
              HR KPI Guide
            </Link>

            <div className="relative group">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Team Management
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Subscription
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    API Access
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Resume Analysis</h2>
          <p className="text-muted-foreground mt-2">
            Upload resumes and job criteria to match candidates with your requirements.
          </p>
        </div>

        <Tabs
          value={state.currentStep}
          onValueChange={(value) => dispatch({ type: "SET_CURRENT_STEP", payload: value as any })}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analyze" disabled={!canContinueToAnalysis}>
              Analyze
            </TabsTrigger>
            <TabsTrigger value="results" disabled={state.matchResults.length === 0}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <ResumeUploader />
              <CriteriaUploader />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {state.uploadedFiles.length > 0 && state.jobCriteria ? (
                  <span className="text-green-600">✓ Ready to analyze {state.uploadedFiles.length} resumes</span>
                ) : (
                  <span>Upload resumes and define job criteria to continue</span>
                )}
              </div>
              <Button size="lg" onClick={handleContinueToAnalysis} disabled={!canContinueToAnalysis}>
                Continue to Analysis
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analyze">
            <AnalysisProcessor />
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Match Results</h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    dispatch({ type: "RESET_ANALYSIS" })
                    dispatch({ type: "SET_CURRENT_STEP", payload: "upload" })
                  }}
                >
                  Start New Analysis
                </Button>
              </div>
              <ResultsTable />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NAMIRecruit. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <ResumeAnalysisProvider>
      <MainContent />
    </ResumeAnalysisProvider>
  )
}
