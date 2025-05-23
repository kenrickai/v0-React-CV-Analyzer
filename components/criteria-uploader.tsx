"use client"

import type React from "react"

import { useState } from "react"
import { FileJson, Check, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CriteriaUploader() {
  const [criteriaText, setCriteriaText] = useState(
    "Required Skills:\n- React.js (3+ years)\n- TypeScript (2+ years)\n- Node.js (2+ years)\n\nEducation:\n- Bachelor's degree in Computer Science or related field\n\nExperience:\n- 5+ years in web development\n- Experience with cloud platforms (AWS/Azure)",
  )
  const [criteriaFile, setCriteriaFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("manual")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isValidated, setIsValidated] = useState(true)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCriteriaText(e.target.value)
    // Simple validation - check if there's content
    setIsValidated(e.target.value.trim().length > 0)
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
    setIsValidated(true)
    setSuccess("Criteria file uploaded successfully.")
    setTimeout(() => setSuccess(null), 3000)
  }

  const validateCriteria = () => {
    if (activeTab === "manual" && criteriaText.trim().length === 0) {
      setError("Please enter job criteria.")
      setTimeout(() => setError(null), 5000)
      setIsValidated(false)
      return false
    }

    if (activeTab === "upload" && !criteriaFile) {
      setError("Please upload a criteria file.")
      setTimeout(() => setError(null), 5000)
      return false
    }

    setIsValidated(true)
    setSuccess("Criteria validated successfully.")
    setTimeout(() => setSuccess(null), 3000)
    return true
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

        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Textarea
              placeholder="Enter job requirements, skills, experience, etc."
              className="min-h-[200px]"
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
          <div className="flex items-center text-sm">
            {isValidated ? (
              <div className="flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" />
                <span>Criteria format validated</span>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={validateCriteria}>
                Validate Criteria
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
