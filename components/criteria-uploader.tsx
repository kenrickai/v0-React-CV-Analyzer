"use client"

import type React from "react"

import { useState } from "react"
import { FileJson, Check, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useResumeAnalysis } from "@/contexts/resume-analysis-context"
import { parseJobCriteria } from "@/services/analysis-service"

export default function CriteriaUploader() {
  const { state, dispatch } = useResumeAnalysis()
  const [jobTitle, setJobTitle] = useState("Senior Software Developer")
  const [criteriaText, setCriteriaText] = useState(
    `Required Skills:
- React.js (3+ years)
- TypeScript (2+ years)
- Node.js (2+ years)
- AWS or Azure cloud platforms
- RESTful API development

Preferred Skills:
- GraphQL
- Docker/Kubernetes
- CI/CD pipelines
- Microservices architecture

Education:
- Bachelor's degree in Computer Science or related field

Experience:
- 5+ years in web development
- Experience with agile development methodologies
- Strong problem-solving skills

Location:
- Remote or San Francisco Bay Area

Salary Range:
- $120,000 - $180,000 annually`,
  )
  const [criteriaFile, setCriteriaFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("manual")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isValidated, setIsValidated] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCriteriaText(e.target.value)
    setIsValidated(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]

    // Check file type
    const allowedTypes = [
      "application/json",
      "text/csv",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    ]

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload JSON, CSV, or TXT files only.")
      setTimeout(() => setError(null), 5000)
      e.target.value = ""
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.")
      setTimeout(() => setError(null), 5000)
      e.target.value = ""
      return
    }

    setCriteriaFile(file)
    setIsValidated(false)
    setSuccess("Criteria file uploaded successfully.")
    setTimeout(() => setSuccess(null), 3000)

    // Read file content and populate criteria text
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setCriteriaText(event.target.result as string)
      }
    }
    reader.readAsText(file)
  }

  const validateAndSaveCriteria = () => {
    if (activeTab === "manual" && criteriaText.trim().length === 0) {
      setError("Please enter job criteria.")
      setTimeout(() => setError(null), 5000)
      setIsValidated(false)
      return false
    }

    if (activeTab === "upload" && !criteriaFile && criteriaText.trim().length === 0) {
      setError("Please upload a criteria file or enter criteria manually.")
      setTimeout(() => setError(null), 5000)
      return false
    }

    try {
      // Parse the criteria text into structured data
      const parsedCriteria = parseJobCriteria(criteriaText, jobTitle)

      // Save to context
      dispatch({ type: "SET_JOB_CRITERIA", payload: parsedCriteria })

      setIsValidated(true)
      setSuccess("Job criteria validated and saved successfully.")
      setTimeout(() => setSuccess(null), 3000)
      return true
    } catch (err) {
      setError("Failed to parse job criteria. Please check the format.")
      setTimeout(() => setError(null), 5000)
      setIsValidated(false)
      return false
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Criteria</CardTitle>
        <CardDescription>Define the criteria for matching candidates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Input
            id="job-title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </div>

        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Textarea
              placeholder="Enter job requirements, skills, experience, etc."
              className="min-h-[300px]"
              value={criteriaText}
              onChange={handleTextChange}
            />
          </TabsContent>

          <TabsContent value="upload">
            <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25">
              <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <FileJson className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Upload criteria file</h3>
              <p className="text-sm text-muted-foreground mb-3">JSON, CSV, or TXT format</p>
              <label>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Browse Files
                </Button>
                <input type="file" className="hidden" accept=".json,.csv,.txt,.xlsx" onChange={handleFileUpload} />
              </label>
              {criteriaFile && (
                <p className="mt-3 text-sm">
                  Selected file: <span className="font-medium">{criteriaFile.name}</span>
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              {isValidated && state.jobCriteria ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Criteria validated and saved</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={validateAndSaveCriteria}>
                  Validate & Save Criteria
                </Button>
              )}
            </div>

            {state.jobCriteria && (
              <div className="text-xs text-muted-foreground">
                {state.jobCriteria.requiredSkills.length} required skills,
                {state.jobCriteria.minExperience}+ years experience
              </div>
            )}
          </div>
        </div>

        {state.jobCriteria && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="font-medium text-sm mb-2">Parsed Criteria Summary:</h4>
            <div className="text-xs space-y-1">
              <div>
                <strong>Required Skills:</strong> {state.jobCriteria.requiredSkills.join(", ")}
              </div>
              {state.jobCriteria.preferredSkills.length > 0 && (
                <div>
                  <strong>Preferred Skills:</strong> {state.jobCriteria.preferredSkills.join(", ")}
                </div>
              )}
              <div>
                <strong>Min Experience:</strong> {state.jobCriteria.minExperience} years
              </div>
              <div>
                <strong>Education:</strong> {state.jobCriteria.education.join(", ")}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
