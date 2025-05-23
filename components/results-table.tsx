"use client"

import { useState } from "react"
import { Download, Mail, Phone, Eye, Filter, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useResumeAnalysis } from "@/contexts/resume-analysis-context"

export default function ResultsTable() {
  const { state } = useResumeAnalysis()
  const [filterBy, setFilterBy] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("score")

  // Combine resume and match data
  const candidateResults = state.matchResults
    .map((match) => {
      const resume = state.parsedResumes.find((r) => r.id === match.resumeId)
      if (!resume) return null

      const originalFile = state.uploadedFiles.find((f) => f.id === resume.fileId)

      return {
        ...match,
        resume,
        originalFile,
      }
    })
    .filter(Boolean)

  // Apply filters
  const filteredResults = candidateResults.filter((result) => {
    switch (filterBy) {
      case "matches":
        return result.isMatch
      case "potential":
        return !result.isMatch && result.overallScore >= 60
      case "poor":
        return result.overallScore < 60
      default:
        return true
    }
  })

  // Apply sorting
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.overallScore - a.overallScore
      case "name":
        return a.resume.candidateName.localeCompare(b.resume.candidateName)
      case "experience":
        return b.resume.experience - a.resume.experience
      default:
        return 0
    }
  })

  const getMatchBadge = (result: (typeof candidateResults)[0]) => {
    if (result.isMatch) {
      return <Badge className="bg-green-100 text-green-800">Strong Match</Badge>
    } else if (result.overallScore >= 60) {
      return <Badge className="bg-amber-100 text-amber-800">Potential</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Poor Match</Badge>
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Overall Score",
      "Skills Match",
      "Experience Match",
      "Education Match",
      "Match Status",
      "Feedback",
      "Original Filename",
    ]
    const csvData = sortedResults.map((result) => [
      result.resume.candidateName,
      result.resume.email,
      result.resume.phone,
      result.overallScore,
      result.skillsMatch,
      result.experienceMatch,
      result.educationMatch,
      result.isMatch ? "Strong Match" : result.overallScore >= 60 ? "Potential" : "Poor Match",
      `"${result.feedback}"`,
      result.originalFile?.name || "",
    ])

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume-analysis-results-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (candidateResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No analysis results available. Please upload resumes and run analysis first.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="matches">Strong Matches</SelectItem>
                <SelectItem value="potential">Potential Matches</SelectItem>
                <SelectItem value="poor">Poor Matches</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Match Score</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Candidate</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-center">Match Status</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{result.resume.candidateName}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {result.resume.experience} years • {result.resume.education}
                    </div>
                    {result.resume.location && (
                      <div className="text-xs text-muted-foreground">{result.resume.location}</div>
                    )}
                    {result.originalFile && (
                      <div className="text-xs flex items-center mt-1 text-blue-600">
                        <FileText className="h-3 w-3 mr-1" />
                        {result.originalFile.name}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">{result.resume.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span>{result.resume.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getMatchBadge(result)}</TableCell>
                <TableCell className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-block w-12 h-12 relative">
                          <svg viewBox="0 0 36 36" className="w-12 h-12 transform -rotate-90">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e9e9e9"
                              strokeWidth="3"
                              strokeDasharray="100, 100"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={result.isMatch ? "#10b981" : result.overallScore >= 60 ? "#f59e0b" : "#ef4444"}
                              strokeWidth="3"
                              strokeDasharray={`${result.overallScore}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                            {result.overallScore}%
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p>Skills: {result.skillsMatch}%</p>
                          <p>Experience: {result.experienceMatch}%</p>
                          <p>Education: {result.educationMatch}%</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {result.matchedSkills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {result.matchedSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{result.matchedSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    {result.missingSkills.length > 0 && (
                      <div className="text-xs text-red-600">
                        Missing: {result.missingSkills.slice(0, 2).join(", ")}
                        {result.missingSkills.length > 2 && ` +${result.missingSkills.length - 2} more`}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{result.resume.candidateName}</DialogTitle>
                          <DialogDescription>
                            {result.originalFile ? `File: ${result.originalFile.name}` : "Detailed candidate profile"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Summary</h4>
                            <p className="text-sm text-muted-foreground">{result.resume.summary}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {result.resume.skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant={result.matchedSkills.includes(skill) ? "default" : "secondary"}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Work History</h4>
                            <div className="space-y-2">
                              {result.resume.workHistory.map((job, index) => (
                                <div key={index} className="border-l-2 border-muted pl-4">
                                  <div className="font-medium">
                                    {job.position} at {job.company}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{job.duration}</div>
                                  <div className="text-sm mt-1">{job.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Analysis Feedback</h4>
                            <p className="text-sm">{result.feedback}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {sortedResults.length} of {candidateResults.length} candidates
      </div>
    </div>
  )
}
