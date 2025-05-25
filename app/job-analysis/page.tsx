"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calculator, CheckCircle, ArrowRight, ArrowLeft, Plus, X, Target, Award } from "lucide-react"
import SharedHeader from "@/components/shared-header"

// Job ranking criteria
const jobRankings = [
  { level: "Entry Level", minScore: 0, maxScore: 30, description: "Junior positions with basic responsibilities" },
  { level: "Associate", minScore: 31, maxScore: 50, description: "Mid-level positions with moderate complexity" },
  { level: "Senior", minScore: 51, maxScore: 70, description: "Senior positions with significant responsibilities" },
  { level: "Lead/Principal", minScore: 71, maxScore: 85, description: "Leadership roles with high complexity" },
  {
    level: "Director/VP",
    minScore: 86,
    maxScore: 95,
    description: "Executive positions with strategic responsibilities",
  },
  { level: "C-Level", minScore: 96, maxScore: 100, description: "Top executive positions" },
]

export default function JobAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1: Job Description & Hours
    jobTitle: "",
    jobDescription: "",
    dailyHours: "",
    monthlyHours: "",
    quarterlyHours: "",
    annualHours: "",

    // Step 2: KPIs
    kpis: [""],

    // Step 3: Subordinates
    numberOfSubordinates: "",
    subordinateRoles: [""],

    // Step 4: Technical Skills
    technicalSkills: [""],
    skillLevels: {},

    // Step 5: Reporting Requirements
    reportingRequirements: [""],
    reportingFrequency: {},
  })

  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const totalSteps = 6 // 5 input steps + 1 results step

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayAdd = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }))
  }

  const handleArrayRemove = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  const handleArrayUpdate = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const calculateJobComplexity = () => {
    let score = 0

    // Job Description Complexity (0-20 points)
    const descriptionLength = formData.jobDescription.length
    if (descriptionLength > 1000) score += 20
    else if (descriptionLength > 500) score += 15
    else if (descriptionLength > 200) score += 10
    else score += 5

    // Hours Demand (0-15 points)
    const dailyHours = Number.parseFloat(formData.dailyHours) || 0
    if (dailyHours > 10) score += 15
    else if (dailyHours > 8) score += 12
    else if (dailyHours > 6) score += 8
    else score += 5

    // KPI Complexity (0-20 points)
    const kpiCount = formData.kpis.filter((kpi) => kpi.trim()).length
    if (kpiCount > 8) score += 20
    else if (kpiCount > 5) score += 15
    else if (kpiCount > 3) score += 10
    else score += 5

    // Management Responsibility (0-25 points)
    const subordinates = Number.parseInt(formData.numberOfSubordinates) || 0
    if (subordinates > 50) score += 25
    else if (subordinates > 20) score += 20
    else if (subordinates > 10) score += 15
    else if (subordinates > 5) score += 10
    else if (subordinates > 0) score += 5

    // Technical Skills (0-15 points)
    const skillCount = formData.technicalSkills.filter((skill) => skill.trim()).length
    if (skillCount > 10) score += 15
    else if (skillCount > 7) score += 12
    else if (skillCount > 5) score += 8
    else score += 5

    // Reporting Requirements (0-5 points)
    const reportingCount = formData.reportingRequirements.filter((req) => req.trim()).length
    if (reportingCount > 5) score += 5
    else if (reportingCount > 3) score += 4
    else if (reportingCount > 1) score += 3
    else score += 2

    return Math.min(score, 100)
  }

  const calculateFTE = () => {
    const dailyHours = Number.parseFloat(formData.dailyHours) || 8
    const monthlyHours = Number.parseFloat(formData.monthlyHours) || dailyHours * 22
    const subordinates = Number.parseInt(formData.numberOfSubordinates) || 0
    const kpiCount = formData.kpis.filter((kpi) => kpi.trim()).length
    const skillCount = formData.technicalSkills.filter((skill) => skill.trim()).length

    // Base FTE calculation
    let baseFTE = Math.ceil(monthlyHours / 176) // 176 = standard monthly hours (8h * 22 days)

    // Adjustments based on complexity
    if (subordinates > 10) baseFTE += Math.ceil(subordinates / 15)
    if (kpiCount > 5) baseFTE += 1
    if (skillCount > 8) baseFTE += 1

    // Management overhead
    if (subordinates > 0) {
      baseFTE += Math.ceil(subordinates * 0.1) // 10% management overhead
    }

    return Math.max(1, baseFTE)
  }

  const getJobRanking = (score: number) => {
    return jobRankings.find((rank) => score >= rank.minScore && score <= rank.maxScore) || jobRankings[0]
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const complexityScore = calculateJobComplexity()
    const recommendedFTE = calculateFTE()
    const jobRanking = getJobRanking(complexityScore)

    // Estimate salary range based on ranking
    const salaryRanges = {
      "Entry Level": { min: 45000, max: 65000 },
      Associate: { min: 65000, max: 85000 },
      Senior: { min: 85000, max: 120000 },
      "Lead/Principal": { min: 120000, max: 160000 },
      "Director/VP": { min: 160000, max: 250000 },
      "C-Level": { min: 250000, max: 500000 },
    }

    const salaryRange = salaryRanges[jobRanking.level as keyof typeof salaryRanges]

    setAnalysisResults({
      jobTitle: formData.jobTitle,
      complexityScore,
      jobRanking,
      recommendedFTE,
      salaryRange,
      totalAnnualCost: recommendedFTE * ((salaryRange.min + salaryRange.max) / 2),
      keyInsights: generateInsights(formData, complexityScore, recommendedFTE),
    })

    setIsAnalyzing(false)
    setCurrentStep(totalSteps - 1)
  }

  const generateInsights = (data: any, score: number, fte: number) => {
    const insights = []

    if (score > 80) {
      insights.push("High complexity role requiring experienced professionals")
    }
    if (Number.parseInt(data.numberOfSubordinates) > 10) {
      insights.push("Significant management responsibilities require leadership skills")
    }
    if (data.technicalSkills.filter((s: string) => s.trim()).length > 8) {
      insights.push("Diverse technical skill requirements may need specialized training")
    }
    if (Number.parseFloat(data.dailyHours) > 8) {
      insights.push("Extended hours may impact work-life balance and require additional support")
    }
    if (fte > 3) {
      insights.push("Consider team structure optimization to improve efficiency")
    }

    return insights
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.jobTitle && formData.jobDescription && formData.dailyHours
      case 1:
        return formData.kpis.some((kpi) => kpi.trim())
      case 2:
        return formData.numberOfSubordinates !== ""
      case 3:
        return formData.technicalSkills.some((skill) => skill.trim())
      case 4:
        return formData.reportingRequirements.some((req) => req.trim())
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetAnalysis = () => {
    setCurrentStep(0)
    setFormData({
      jobTitle: "",
      jobDescription: "",
      dailyHours: "",
      monthlyHours: "",
      quarterlyHours: "",
      annualHours: "",
      kpis: [""],
      numberOfSubordinates: "",
      subordinateRoles: [""],
      technicalSkills: [""],
      skillLevels: {},
      reportingRequirements: [""],
      reportingFrequency: {},
    })
    setAnalysisResults(null)
    setIsAnalyzing(false)
  }

  const renderCurrentStep = () => {
    // Step 0: Job Description & Hours
    if (currentStep === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Job Description & Time Requirements</CardTitle>
            <CardDescription>Define the position and time demands</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                placeholder="Detailed description of responsibilities, duties, and expectations..."
                value={formData.jobDescription}
                onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                rows={6}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dailyHours">Average Daily Hours *</Label>
                <Input
                  id="dailyHours"
                  type="number"
                  placeholder="8"
                  value={formData.dailyHours}
                  onChange={(e) => handleInputChange("dailyHours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyHours">Average Monthly Hours</Label>
                <Input
                  id="monthlyHours"
                  type="number"
                  placeholder="176"
                  value={formData.monthlyHours}
                  onChange={(e) => handleInputChange("monthlyHours", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quarterlyHours">Average Quarterly Hours</Label>
                <Input
                  id="quarterlyHours"
                  type="number"
                  placeholder="528"
                  value={formData.quarterlyHours}
                  onChange={(e) => handleInputChange("quarterlyHours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualHours">Average Annual Hours</Label>
                <Input
                  id="annualHours"
                  type="number"
                  placeholder="2112"
                  value={formData.annualHours}
                  onChange={(e) => handleInputChange("annualHours", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Step 1: KPIs
    if (currentStep === 1) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Key Performance Indicators (KPIs)</CardTitle>
            <CardDescription>Define measurable performance metrics for this position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.kpis.map((kpi, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`KPI ${index + 1} (e.g., Code quality score ≥ 8.5/10)`}
                  value={kpi}
                  onChange={(e) => handleArrayUpdate("kpis", index, e.target.value)}
                />
                {formData.kpis.length > 1 && (
                  <Button variant="outline" size="icon" onClick={() => handleArrayRemove("kpis", index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={() => handleArrayAdd("kpis")} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add KPI
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Step 2: Subordinates
    if (currentStep === 2) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Team Management</CardTitle>
            <CardDescription>Define reporting structure and team size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfSubordinates">Number of Direct Subordinates *</Label>
              <Input
                id="numberOfSubordinates"
                type="number"
                placeholder="0"
                value={formData.numberOfSubordinates}
                onChange={(e) => handleInputChange("numberOfSubordinates", e.target.value)}
              />
            </div>

            {Number.parseInt(formData.numberOfSubordinates) > 0 && (
              <div className="space-y-4">
                <Label>Subordinate Roles</Label>
                {formData.subordinateRoles.map((role, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Role ${index + 1} (e.g., Junior Developer)`}
                      value={role}
                      onChange={(e) => handleArrayUpdate("subordinateRoles", index, e.target.value)}
                    />
                    {formData.subordinateRoles.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleArrayRemove("subordinateRoles", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => handleArrayAdd("subordinateRoles")} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )
    }

    // Step 3: Technical Skills
    if (currentStep === 3) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Technical Skills Required</CardTitle>
            <CardDescription>List all technical competencies needed for this position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.technicalSkills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Technical Skill ${index + 1} (e.g., React.js, Python, AWS)`}
                  value={skill}
                  onChange={(e) => handleArrayUpdate("technicalSkills", index, e.target.value)}
                />
                <Select
                  value={formData.skillLevels[index] || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      skillLevels: { ...prev.skillLevels, [index]: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                {formData.technicalSkills.length > 1 && (
                  <Button variant="outline" size="icon" onClick={() => handleArrayRemove("technicalSkills", index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={() => handleArrayAdd("technicalSkills")} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Technical Skill
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Step 4: Reporting Requirements
    if (currentStep === 4) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 5: Reporting Requirements</CardTitle>
            <CardDescription>Define what reports and documentation this position must produce</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.reportingRequirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Report ${index + 1} (e.g., Weekly status report, Monthly metrics dashboard)`}
                  value={requirement}
                  onChange={(e) => handleArrayUpdate("reportingRequirements", index, e.target.value)}
                />
                <Select
                  value={formData.reportingFrequency[index] || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      reportingFrequency: { ...prev.reportingFrequency, [index]: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
                {formData.reportingRequirements.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleArrayRemove("reportingRequirements", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={() => handleArrayAdd("reportingRequirements")} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Reporting Requirement
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Final Step: Analysis Results
    if (currentStep === totalSteps - 1) {
      if (isAnalyzing) {
        return (
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold">Analyzing Position Requirements</h3>
                <p className="text-muted-foreground">Processing job complexity, FTE requirements, and ranking...</p>
                <Progress value={65} className="w-full max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>
        )
      }

      if (analysisResults) {
        return (
          <div className="space-y-6">
            {/* Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Analysis Complete: {analysisResults.jobTitle}
                </CardTitle>
                <CardDescription>FTE calculation and job ranking based on complexity analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysisResults.recommendedFTE}</div>
                    <div className="text-sm text-muted-foreground">Recommended FTE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysisResults.complexityScore}</div>
                    <div className="text-sm text-muted-foreground">Complexity Score</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {analysisResults.jobRanking.level}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">Job Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${(analysisResults.totalAnnualCost / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Cost</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Job Ranking Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <Badge>{analysisResults.jobRanking.level}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Score Range:</span>
                        <span className="text-sm text-muted-foreground">
                          {analysisResults.jobRanking.minScore}-{analysisResults.jobRanking.maxScore}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{analysisResults.jobRanking.description}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Salary Range
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>${analysisResults.salaryRange.min.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum:</span>
                        <span>${analysisResults.salaryRange.max.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per FTE Cost:</span>
                        <span>
                          ${((analysisResults.salaryRange.min + analysisResults.salaryRange.max) / 2).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {analysisResults.keyInsights.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.keyInsights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <Button onClick={resetAnalysis} variant="outline" className="w-full">
                    Start New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }

      // Review step before analysis
      return (
        <Card>
          <CardHeader>
            <CardTitle>Review Your Input</CardTitle>
            <CardDescription>Review all information before generating the FTE analysis and job ranking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Job Information</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    <div>
                      <strong>Title:</strong> {formData.jobTitle}
                    </div>
                    <div>
                      <strong>Daily Hours:</strong> {formData.dailyHours}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">KPIs ({formData.kpis.filter((k) => k.trim()).length})</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData.kpis
                      .filter((k) => k.trim())
                      .slice(0, 3)
                      .join(", ")}
                    {formData.kpis.filter((k) => k.trim()).length > 3 && "..."}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Team Size</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData.numberOfSubordinates} direct subordinates
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">
                    Technical Skills ({formData.technicalSkills.filter((s) => s.trim()).length})
                  </h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData.technicalSkills
                      .filter((s) => s.trim())
                      .slice(0, 3)
                      .join(", ")}
                    {formData.technicalSkills.filter((s) => s.trim()).length > 3 && "..."}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">
                    Reporting ({formData.reportingRequirements.filter((r) => r.trim()).length})
                  </h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formData.reportingRequirements
                      .filter((r) => r.trim())
                      .slice(0, 2)
                      .join(", ")}
                    {formData.reportingRequirements.filter((r) => r.trim()).length > 2 && "..."}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={runAnalysis} className="w-full" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate FTE & Job Ranking
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedHeader />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Job Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Follow the 5-step process to analyze position requirements and calculate FTE with job ranking.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          {currentStep < totalSteps - 1 && !isAnalyzing && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === totalSteps - 2 ? "Review & Calculate" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
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
