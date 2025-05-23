"use client"

import { useEffect, useState } from "react"
import { Upload, Brain, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useResumeAnalysis } from "@/contexts/resume-analysis-context"
import { parseResume, calculateMatch } from "@/services/analysis-service"

export default function AnalysisProcessor() {
  const { state, dispatch } = useResumeAnalysis()
  const [currentStep, setCurrentStep] = useState<string>("")
  const [processedCount, setProcessedCount] = useState(0)

  useEffect(() => {
    if (state.currentStep === "analyze" && !state.isAnalyzing && state.uploadedFiles.length > 0 && state.jobCriteria) {
      startAnalysis()
    }
  }, [state.currentStep, state.uploadedFiles, state.jobCriteria])

  const startAnalysis = async () => {
    if (!state.jobCriteria) {
      dispatch({ type: "SET_ERROR", payload: "Job criteria not defined. Please set job criteria first." })
      return
    }

    if (state.uploadedFiles.length === 0) {
      dispatch({ type: "SET_ERROR", payload: "No files uploaded. Please upload resumes first." })
      return
    }

    dispatch({ type: "SET_ANALYZING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })
    setProcessedCount(0)

    try {
      // Step 1: Parse all resumes
      setCurrentStep("Parsing resumes...")
      const parsedResumes = []

      for (let i = 0; i < state.uploadedFiles.length; i++) {
        const file = state.uploadedFiles[i]
        setCurrentStep(`Parsing resume ${i + 1} of ${state.uploadedFiles.length}: ${file.name}`)

        const parsed = await parseResume(file)
        parsedResumes.push(parsed)

        setProcessedCount(i + 1)
        dispatch({
          type: "SET_ANALYSIS_PROGRESS",
          payload: ((i + 1) / state.uploadedFiles.length) * 50,
        })
      }

      dispatch({ type: "SET_PARSED_RESUMES", payload: parsedResumes })

      // Step 2: Calculate matches
      setCurrentStep("Calculating matches...")
      const matchResults = []

      for (let i = 0; i < parsedResumes.length; i++) {
        const resume = parsedResumes[i]
        setCurrentStep(`Analyzing candidate ${i + 1} of ${parsedResumes.length}: ${resume.candidateName}`)

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 500))

        const match = calculateMatch(resume, state.jobCriteria)
        matchResults.push(match)

        dispatch({
          type: "SET_ANALYSIS_PROGRESS",
          payload: 50 + ((i + 1) / parsedResumes.length) * 50,
        })
      }

      dispatch({ type: "SET_MATCH_RESULTS", payload: matchResults })

      // Complete analysis
      setCurrentStep("Analysis complete!")
      dispatch({ type: "SET_ANALYSIS_PROGRESS", payload: 100 })

      // Wait a moment then transition to results
      setTimeout(() => {
        dispatch({ type: "SET_ANALYZING", payload: false })
        dispatch({ type: "SET_CURRENT_STEP", payload: "results" })
      }, 1500)
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "An error occurred during analysis. Please try again." })
      dispatch({ type: "SET_ANALYZING", payload: false })
      dispatch({ type: "SET_ANALYSIS_PROGRESS", payload: 0 })
    }
  }

  const getStepIcon = () => {
    if (state.error) return <AlertCircle className="h-8 w-8 text-red-500" />
    if (state.analysisProgress === 100) return <CheckCircle className="h-8 w-8 text-green-500" />
    if (state.isAnalyzing) return <Brain className="h-8 w-8 text-primary animate-pulse" />
    return <Upload className="h-8 w-8 text-primary" />
  }

  const getStatusMessage = () => {
    if (state.error) return state.error
    if (state.analysisProgress === 100) return "Analysis completed successfully!"
    if (state.isAnalyzing) return currentStep
    return "Ready to analyze resumes"
  }

  return (
    <div className="space-y-6">
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
          <CardDescription>Processing {state.uploadedFiles.length} resumes against your job criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              {getStepIcon()}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                {state.analysisProgress === 100 ? "Analysis Complete" : "Analyzing Resumes"}
              </h3>
              <p className="text-muted-foreground mb-4">{getStatusMessage()}</p>
            </div>

            <div className="w-full max-w-md mx-auto space-y-2">
              <Progress value={state.analysisProgress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(state.analysisProgress)}% complete</span>
                <span>
                  {processedCount} of {state.uploadedFiles.length} processed
                </span>
              </div>
            </div>

            {state.isAnalyzing && (
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div className="text-center">
                  <div className="font-medium">{state.parsedResumes.length}</div>
                  <div className="text-muted-foreground">Resumes Parsed</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{state.matchResults.length}</div>
                  <div className="text-muted-foreground">Matches Calculated</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {state.analysisProgress === 100 && state.matchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {state.matchResults.filter((r) => r.isMatch).length}
                </div>
                <div className="text-sm text-muted-foreground">Strong Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {state.matchResults.filter((r) => !r.isMatch && r.overallScore >= 60).length}
                </div>
                <div className="text-sm text-muted-foreground">Potential Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {state.matchResults.filter((r) => r.overallScore < 60).length}
                </div>
                <div className="text-sm text-muted-foreground">Poor Matches</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
