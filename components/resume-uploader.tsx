"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useResumeAnalysis, type UploadedFile } from "@/contexts/resume-analysis-context"

// Define allowed file types
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
]

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Maximum number of files
const MAX_FILES = 100

export default function ResumeUploader() {
  const { state, dispatch } = useResumeAnalysis()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const validateFiles = (filesToValidate: File[]): { valid: File[]; errors: string[] } => {
    const validFiles: File[] = []
    const errors: string[] = []

    // Check if adding these files would exceed the maximum
    if (state.uploadedFiles.length + filesToValidate.length > MAX_FILES) {
      errors.push(`You can upload a maximum of ${MAX_FILES} files.`)
      return { valid: validFiles, errors }
    }

    filesToValidate.forEach((file) => {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type. Please upload PDF or DOCX files only.`)
        return
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds the maximum file size of 10MB.`)
        return
      }

      // Check for duplicate files
      if (state.uploadedFiles.some((existingFile) => existingFile.name === file.name)) {
        errors.push(`${file.name} has already been added.`)
        return
      }

      validFiles.push(file)
    })

    return { valid: validFiles, errors }
  }

  const handleFilesSelected = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return

    const fileArray = Array.from(selectedFiles)
    const { valid, errors } = validateFiles(fileArray)

    if (errors.length > 0) {
      setError(errors.join(" "))
      setTimeout(() => setError(null), 5000)
    }

    if (valid.length > 0) {
      const uploadedFiles: UploadedFile[] = valid.map((file) => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      }))

      dispatch({ type: "ADD_FILES", payload: uploadedFiles })
      setSuccess(`Added ${valid.length} file${valid.length > 1 ? "s" : ""} successfully.`)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFilesSelected(e.dataTransfer.files)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelected(e.target.files)
    // Reset the input value so the same file can be selected again if removed
    e.target.value = ""
  }

  const removeFile = (fileId: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileId })
  }

  const handleUpload = async () => {
    if (state.uploadedFiles.length === 0) {
      setError("Please select at least one file to upload.")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 500)

      // Simulate upload processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Show success message
      setSuccess(`Successfully uploaded ${state.uploadedFiles.length} files.`)

      // Reset after successful upload
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    } catch (err) {
      setError("An error occurred while uploading files. Please try again.")
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Upload</CardTitle>
        <CardDescription>Upload up to 100 resumes in PDF or DOCX format</CardDescription>
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

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Drag and drop resumes</h3>
          <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
          <Button variant="outline" size="sm" onClick={handleBrowseClick} disabled={isUploading}>
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
            accept=".pdf,.docx,.doc"
          />
        </div>

        {state.uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{state.uploadedFiles.length} files selected</span>
              <span className="text-muted-foreground">
                {state.uploadedFiles.length} of {MAX_FILES} max
              </span>
            </div>
            <Progress value={(state.uploadedFiles.length / MAX_FILES) * 100} className="h-2" />

            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              {state.uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center overflow-hidden">
                    <File className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{uploadedFile.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({formatFileSize(uploadedFile.size)})</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={() => removeFile(uploadedFile.id)}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>

            {isUploading ? (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Uploading...</span>
                  <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <Button onClick={handleUpload}>Upload Resumes</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
