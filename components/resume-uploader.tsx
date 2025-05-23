"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ResumeUploader() {
  const [files, setFiles] = useState<string[]>([
    "john_smith_resume.pdf",
    "sarah_johnson_cv.pdf",
    "michael_williams_resume.docx",
  ])

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // In a real app, we would process the dropped files here
    setFiles([...files, "new_dropped_file.pdf"])
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Upload</CardTitle>
        <CardDescription>Upload up to 100 resumes in PDF or DOCX format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Button variant="outline" size="sm">
            Browse Files
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{files.length} files uploaded</span>
              <span className="text-muted-foreground">3 of 100 max</span>
            </div>
            <Progress value={3} className="h-2" />

            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center">
                    <File className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{file}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
