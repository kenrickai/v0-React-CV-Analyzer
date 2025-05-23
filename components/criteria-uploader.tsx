"use client"

import type React from "react"

import { useState } from "react"
import { X, FileJson, Check, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useResumeAnalysis } from "@/contexts/resume-analysis-context"
import { createJobCriteria, parseJobCriteria } from "@/services/analysis-service"

// Common skills for suggestions
const COMMON_SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "GraphQL",
  "REST API",
  "Git",
  "CI/CD",
  "Agile",
  "Scrum",
  "HTML",
  "CSS",
  "Vue.js",
  "Angular",
  "Express",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "PHP",
  "C#",
  ".NET",
  "Redis",
  "Elasticsearch",
]

const EDUCATION_OPTIONS = [
  "High School Diploma",
  "Associate's degree",
  "Bachelor's degree in Computer Science",
  "Bachelor's degree in Software Engineering",
  "Bachelor's degree in Information Technology",
  "Bachelor's degree in related field",
  "Master's degree in Computer Science",
  "Master's degree in Software Engineering",
  "Master's degree in related field",
  "PhD in Computer Science",
  "PhD in related field",
  "Relevant certifications",
  "Self-taught with portfolio",
]

export default function CriteriaUploader() {
  const { state, dispatch } = useResumeAnalysis()

  // Guided form state
  const [jobTitle, setJobTitle] = useState("Senior Software Developer")
  const [requiredSkills, setRequiredSkills] = useState<string[]>(["React", "TypeScript", "Node.js"])
  const [preferredSkills, setPreferredSkills] = useState<string[]>(["AWS", "Docker"])
  const [minExperience, setMinExperience] = useState(3)
  const [maxExperience, setMaxExperience] = useState<number | undefined>(undefined)
  const [education, setEducation] = useState<string[]>(["Bachelor's degree in Computer Science"])
  const [location, setLocation] = useState("")
  const [salaryMin, setSalaryMin] = useState<number | undefined>(undefined)
  const [salaryMax, setSalaryMax] = useState<number | undefined>(undefined)
  const [description, setDescription] = useState("We are looking for a senior software developer to join our team...")

  // Text-based input state
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
  const [activeTab, setActiveTab] = useState("guided")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isValidated, setIsValidated] = useState(false)

  // Skill input states
  const [newRequiredSkill, setNewRequiredSkill] = useState("")
  const [newPreferredSkill, setNewPreferredSkill] = useState("")
  const [showRequiredSuggestions, setShowRequiredSuggestions] = useState(false)
  const [showPreferredSuggestions, setShowPreferredSuggestions] = useState(false)

  const addRequiredSkill = (skill: string) => {
    if (skill.trim() && !requiredSkills.includes(skill.trim())) {
      setRequiredSkills([...requiredSkills, skill.trim()])
      setNewRequiredSkill("")
      setShowRequiredSuggestions(false)
      setIsValidated(false)
    }
  }

  const addPreferredSkill = (skill: string) => {
    if (skill.trim() && !preferredSkills.includes(skill.trim())) {
      setPreferredSkills([...preferredSkills, skill.trim()])
      setNewPreferredSkill("")
      setShowPreferredSuggestions(false)
      setIsValidated(false)
    }
  }

  const removeRequiredSkill = (index: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index))
    setIsValidated(false)
  }

  const removePreferredSkill = (index: number) => {
    setPreferredSkills(preferredSkills.filter((_, i) => i !== index))
    setIsValidated(false)
  }

  const addEducation = (edu: string) => {
    if (edu && !education.includes(edu)) {
      setEducation([...education, edu])
      setIsValidated(false)
    }
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
    setIsValidated(false)
  }

  const getSkillSuggestions = (input: string, existingSkills: string[]) => {
    if (!input.trim()) return []
    return COMMON_SKILLS.filter(
      (skill) => skill.toLowerCase().includes(input.toLowerCase()) && !existingSkills.includes(skill),
    ).slice(0, 5)
  }

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
    try {
      let parsedCriteria

      if (activeTab === "guided") {
        // Validate guided form
        if (!jobTitle.trim()) {
          setError("Please enter a job title.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        if (requiredSkills.length === 0) {
          setError("Please add at least one required skill.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        if (minExperience < 0) {
          setError("Minimum experience cannot be negative.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        if (maxExperience && maxExperience < minExperience) {
          setError("Maximum experience cannot be less than minimum experience.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        if (education.length === 0) {
          setError("Please select at least one education requirement.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        // Create criteria from guided form
        parsedCriteria = createJobCriteria({
          title: jobTitle,
          requiredSkills,
          preferredSkills,
          minExperience,
          maxExperience,
          education,
          location: location || undefined,
          salaryRange: salaryMin && salaryMax ? { min: salaryMin, max: salaryMax } : undefined,
          description,
        })
      } else if (activeTab === "manual") {
        if (criteriaText.trim().length === 0) {
          setError("Please enter job criteria.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        // Parse the criteria text into structured data
        parsedCriteria = parseJobCriteria(criteriaText, jobTitle)
      } else if (activeTab === "upload") {
        if (!criteriaFile && criteriaText.trim().length === 0) {
          setError("Please upload a criteria file or enter criteria manually.")
          setTimeout(() => setError(null), 5000)
          return false
        }

        parsedCriteria = parseJobCriteria(criteriaText, jobTitle)
      }

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

        <Tabs defaultValue="guided" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="guided">Guided Form</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="guided" className="space-y-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title *</Label>
              <Input
                id="job-title"
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value)
                  setIsValidated(false)
                }}
                placeholder="e.g., Senior Software Developer"
              />
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <Label>Required Skills *</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="default" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeRequiredSkill(index)} />
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <Input
                  value={newRequiredSkill}
                  onChange={(e) => {
                    setNewRequiredSkill(e.target.value)
                    setShowRequiredSuggestions(e.target.value.length > 0)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addRequiredSkill(newRequiredSkill)
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                />
                {showRequiredSuggestions && newRequiredSkill && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {getSkillSuggestions(newRequiredSkill, requiredSkills).map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addRequiredSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Skills */}
            <div className="space-y-2">
              <Label>Preferred Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {preferredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removePreferredSkill(index)} />
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <Input
                  value={newPreferredSkill}
                  onChange={(e) => {
                    setNewPreferredSkill(e.target.value)
                    setShowPreferredSuggestions(e.target.value.length > 0)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addPreferredSkill(newPreferredSkill)
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                />
                {showPreferredSuggestions && newPreferredSkill && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {getSkillSuggestions(newPreferredSkill, preferredSkills).map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addPreferredSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-experience">Minimum Experience (years) *</Label>
                <Input
                  id="min-experience"
                  type="number"
                  min="0"
                  value={minExperience}
                  onChange={(e) => {
                    setMinExperience(Number(e.target.value))
                    setIsValidated(false)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-experience">Maximum Experience (years)</Label>
                <Input
                  id="max-experience"
                  type="number"
                  min="0"
                  value={maxExperience || ""}
                  onChange={(e) => {
                    setMaxExperience(e.target.value ? Number(e.target.value) : undefined)
                    setIsValidated(false)
                  }}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <Label>Education Requirements *</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {education.map((edu, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {edu}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeEducation(index)} />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={addEducation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education requirement" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_OPTIONS.filter((edu) => !education.includes(edu)).map((edu) => (
                    <SelectItem key={edu} value={edu}>
                      {edu}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                  setIsValidated(false)
                }}
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-min">Minimum Salary ($)</Label>
                <Input
                  id="salary-min"
                  type="number"
                  min="0"
                  value={salaryMin || ""}
                  onChange={(e) => {
                    setSalaryMin(e.target.value ? Number(e.target.value) : undefined)
                    setIsValidated(false)
                  }}
                  placeholder="e.g., 120000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-max">Maximum Salary ($)</Label>
                <Input
                  id="salary-max"
                  type="number"
                  min="0"
                  value={salaryMax || ""}
                  onChange={(e) => {
                    setSalaryMax(e.target.value ? Number(e.target.value) : undefined)
                    setIsValidated(false)
                  }}
                  placeholder="e.g., 180000"
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  setIsValidated(false)
                }}
                placeholder="Describe the role, responsibilities, and any additional requirements..."
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>

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
            <h4 className="font-medium text-sm mb-2">Criteria Summary:</h4>
            <div className="text-xs space-y-1">
              <div>
                <strong>Position:</strong> {state.jobCriteria.title}
              </div>
              <div>
                <strong>Required Skills:</strong> {state.jobCriteria.requiredSkills.join(", ")}
              </div>
              {state.jobCriteria.preferredSkills.length > 0 && (
                <div>
                  <strong>Preferred Skills:</strong> {state.jobCriteria.preferredSkills.join(", ")}
                </div>
              )}
              <div>
                <strong>Experience:</strong> {state.jobCriteria.minExperience}
                {state.jobCriteria.maxExperience ? `-${state.jobCriteria.maxExperience}` : "+"} years
              </div>
              <div>
                <strong>Education:</strong> {state.jobCriteria.education.join(", ")}
              </div>
              {state.jobCriteria.location && (
                <div>
                  <strong>Location:</strong> {state.jobCriteria.location}
                </div>
              )}
              {state.jobCriteria.salaryRange && (
                <div>
                  <strong>Salary:</strong> ${state.jobCriteria.salaryRange.min.toLocaleString()} - $
                  {state.jobCriteria.salaryRange.max.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
