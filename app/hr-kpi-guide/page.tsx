"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BookOpen,
  Target,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import SharedHeader from "@/components/shared-header"

// Global position data with comprehensive KPIs
const kpiData = {
  // Technology & Engineering
  "Software Engineer": {
    department: "Technology",
    description: "Develops, tests, and maintains software applications and systems",
    kpis: [
      {
        name: "Code Review Participation Rate",
        type: "leading",
        description: "Percentage of code reviews participated in vs. total reviews available",
        target: "≥ 80%",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "(Reviews Participated / Total Reviews Available) × 100",
        linkedIndicators: ["Code Quality Score", "Bug Rate"],
      },
      {
        name: "Code Quality Score",
        type: "lagging",
        description: "Automated code quality metrics including complexity, maintainability, and test coverage",
        target: "≥ 8.0/10",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "Weighted average of code metrics (complexity, coverage, maintainability)",
        linkedIndicators: ["Code Review Participation Rate", "Training Hours Completed"],
      },
      {
        name: "Sprint Commitment Accuracy",
        type: "leading",
        description: "Percentage of sprint commitments successfully delivered",
        target: "≥ 85%",
        frequency: "Sprint",
        category: "Delivery",
        importance: "High",
        calculation: "(Completed Story Points / Committed Story Points) × 100",
        linkedIndicators: ["Velocity Trend", "Project Delivery Rate"],
      },
      {
        name: "Bug Rate",
        type: "lagging",
        description: "Number of bugs per 1000 lines of code delivered to production",
        target: "≤ 2 bugs/1000 LOC",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Total Bugs / Total Lines of Code) × 1000",
        linkedIndicators: ["Code Review Participation Rate", "Sprint Commitment Accuracy"],
      },
    ],
  },
  "Data Scientist": {
    department: "Technology",
    description: "Analyzes complex data to extract insights and build predictive models",
    kpis: [
      {
        name: "Model Development Cycle Time",
        type: "leading",
        description: "Time from problem definition to model deployment",
        target: "≤ 6 weeks",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Average days from project start to model deployment",
        linkedIndicators: ["Model Accuracy", "Business Impact Score"],
      },
      {
        name: "Model Accuracy",
        type: "lagging",
        description: "Predictive accuracy of deployed models",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "Average accuracy score across all deployed models",
        linkedIndicators: ["Model Development Cycle Time", "Data Quality Checks"],
      },
    ],
  },
  "DevOps Engineer": {
    department: "Technology",
    description: "Manages infrastructure, deployment pipelines, and system reliability",
    kpis: [
      {
        name: "Deployment Frequency",
        type: "leading",
        description: "Number of successful deployments per week",
        target: "≥ 10/week",
        frequency: "Weekly",
        category: "Delivery",
        importance: "High",
        calculation: "Count of successful deployments per week",
        linkedIndicators: ["System Uptime", "Mean Time to Recovery"],
      },
      {
        name: "System Uptime",
        type: "lagging",
        description: "Percentage of time systems are operational",
        target: "≥ 99.9%",
        frequency: "Monthly",
        category: "Reliability",
        importance: "High",
        calculation: "(Total Uptime / Total Time) × 100",
        linkedIndicators: ["Deployment Frequency", "Infrastructure Monitoring"],
      },
    ],
  },

  // Product & Design
  "Product Manager": {
    department: "Product",
    description: "Defines product strategy, manages roadmap, and coordinates cross-functional teams",
    kpis: [
      {
        name: "User Research Sessions",
        type: "leading",
        description: "Number of user interviews, surveys, or usability tests conducted",
        target: "≥ 8/month",
        frequency: "Weekly",
        category: "Research",
        importance: "High",
        calculation: "Count of user research activities",
        linkedIndicators: ["Feature Adoption Rate", "User Satisfaction Score"],
      },
      {
        name: "Feature Adoption Rate",
        type: "lagging",
        description: "Percentage of users adopting new features within 30 days",
        target: "≥ 25%",
        frequency: "Monthly",
        category: "Product Success",
        importance: "High",
        calculation: "(Users Adopting Feature / Total Active Users) × 100",
        linkedIndicators: ["User Research Sessions", "Market Analysis Updates"],
      },
    ],
  },
  "UX Designer": {
    department: "Product",
    description: "Creates user-centered designs and improves user experience across products",
    kpis: [
      {
        name: "User Testing Sessions",
        type: "leading",
        description: "Number of usability tests and user feedback sessions conducted",
        target: "≥ 6/month",
        frequency: "Weekly",
        category: "Research",
        importance: "High",
        calculation: "Count of user testing sessions",
        linkedIndicators: ["User Experience Score", "Design Iteration Rate"],
      },
      {
        name: "User Experience Score",
        type: "lagging",
        description: "User satisfaction with interface and interaction design",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "User Success",
        importance: "High",
        calculation: "Average user experience rating from surveys",
        linkedIndicators: ["User Testing Sessions", "Prototype Completion Rate"],
      },
    ],
  },

  // Sales & Marketing
  "Sales Representative": {
    department: "Sales",
    description: "Generates leads, manages prospects, and closes deals to drive revenue growth",
    kpis: [
      {
        name: "Prospecting Activities",
        type: "leading",
        description: "Number of new prospects contacted per day",
        target: "≥ 20 contacts/day",
        frequency: "Daily",
        category: "Pipeline Building",
        importance: "High",
        calculation: "Count of new prospect contacts per day",
        linkedIndicators: ["Pipeline Value", "Conversion Rate"],
      },
      {
        name: "Revenue Achievement",
        type: "lagging",
        description: "Percentage of sales quota achieved",
        target: "≥ 100%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "(Actual Revenue / Sales Quota) × 100",
        linkedIndicators: ["Prospecting Activities", "Follow-up Consistency"],
      },
    ],
  },
  "Marketing Manager": {
    department: "Marketing",
    description: "Develops and executes marketing strategies to drive brand awareness and lead generation",
    kpis: [
      {
        name: "Campaign Planning Completeness",
        type: "leading",
        description: "Percentage of campaigns with complete strategic planning documentation",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Planning",
        importance: "High",
        calculation: "(Campaigns with Complete Plans / Total Campaigns) × 100",
        linkedIndicators: ["Campaign ROI", "Lead Quality Score"],
      },
      {
        name: "Campaign ROI",
        type: "lagging",
        description: "Return on investment for marketing campaigns",
        target: "≥ 300%",
        frequency: "Monthly",
        category: "Financial Impact",
        importance: "High",
        calculation: "(Campaign Revenue - Campaign Cost) / Campaign Cost × 100",
        linkedIndicators: ["Campaign Planning Completeness", "Market Research Activities"],
      },
    ],
  },

  // Finance & Operations
  "Financial Analyst": {
    department: "Finance",
    description: "Analyzes financial data and provides insights for business decision-making",
    kpis: [
      {
        name: "Report Accuracy Rate",
        type: "leading",
        description: "Percentage of financial reports delivered without errors",
        target: "≥ 98%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Error-free Reports / Total Reports) × 100",
        linkedIndicators: ["Stakeholder Satisfaction", "Decision Impact Score"],
      },
      {
        name: "Decision Impact Score",
        type: "lagging",
        description: "Measurable business value from financial analysis recommendations",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Business Value",
        importance: "High",
        calculation: "Stakeholder assessment of analysis value",
        linkedIndicators: ["Report Accuracy Rate", "Analysis Turnaround Time"],
      },
    ],
  },
  "Operations Manager": {
    department: "Operations",
    description: "Oversees daily operations and optimizes business processes",
    kpis: [
      {
        name: "Process Improvement Initiatives",
        type: "leading",
        description: "Number of process optimization projects initiated",
        target: "≥ 3/quarter",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Count of process improvement projects",
        linkedIndicators: ["Operational Efficiency", "Cost Reduction"],
      },
      {
        name: "Operational Efficiency",
        type: "lagging",
        description: "Overall efficiency score of operational processes",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "Weighted average of process efficiency metrics",
        linkedIndicators: ["Process Improvement Initiatives", "Team Productivity"],
      },
    ],
  },

  // Human Resources
  "HR Manager": {
    department: "Human Resources",
    description: "Manages human resources strategy, policies, and employee relations",
    kpis: [
      {
        name: "Employee Engagement Activities",
        type: "leading",
        description: "Number of engagement initiatives and programs implemented",
        target: "≥ 4/month",
        frequency: "Monthly",
        category: "Engagement",
        importance: "High",
        calculation: "Count of engagement activities",
        linkedIndicators: ["Employee Satisfaction", "Retention Rate"],
      },
      {
        name: "Employee Retention Rate",
        type: "lagging",
        description: "Percentage of employees retained over a 12-month period",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Retention",
        importance: "High",
        calculation: "((Employees at End - New Hires) / Employees at Start) × 100",
        linkedIndicators: ["Employee Engagement Activities", "Training Hours"],
      },
    ],
  },
  Recruiter: {
    department: "Human Resources",
    description: "Sources, screens, and hires qualified candidates for open positions",
    kpis: [
      {
        name: "Candidate Sourcing Rate",
        type: "leading",
        description: "Number of qualified candidates sourced per week",
        target: "≥ 15/week",
        frequency: "Weekly",
        category: "Sourcing",
        importance: "High",
        calculation: "Count of qualified candidates sourced",
        linkedIndicators: ["Time to Fill", "Hire Quality Score"],
      },
      {
        name: "Time to Fill",
        type: "lagging",
        description: "Average days from job posting to offer acceptance",
        target: "≤ 30 days",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Average days from posting to hire",
        linkedIndicators: ["Candidate Sourcing Rate", "Interview Conversion Rate"],
      },
    ],
  },

  // Customer Success
  "Customer Success Manager": {
    department: "Customer Success",
    description: "Ensures customer satisfaction, retention, and growth",
    kpis: [
      {
        name: "Customer Health Monitoring",
        type: "leading",
        description: "Frequency of customer health assessments and check-ins",
        target: "≥ 2/month per customer",
        frequency: "Weekly",
        category: "Proactive Support",
        importance: "High",
        calculation: "Count of customer health assessments",
        linkedIndicators: ["Customer Satisfaction", "Churn Rate"],
      },
      {
        name: "Customer Satisfaction Score",
        type: "lagging",
        description: "Average customer satisfaction rating",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Satisfaction",
        importance: "High",
        calculation: "Average customer satisfaction survey score",
        linkedIndicators: ["Customer Health Monitoring", "Response Time"],
      },
    ],
  },

  // Executive Roles
  "Chief Executive Officer": {
    department: "Executive",
    description: "Provides overall leadership and strategic direction for the organization",
    kpis: [
      {
        name: "Strategic Initiative Progress",
        type: "leading",
        description: "Percentage completion of key strategic initiatives",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Strategy",
        importance: "High",
        calculation: "(Completed Milestones / Total Milestones) × 100",
        linkedIndicators: ["Revenue Growth", "Market Share"],
      },
      {
        name: "Revenue Growth",
        type: "lagging",
        description: "Year-over-year revenue growth percentage",
        target: "≥ 15%",
        frequency: "Quarterly",
        category: "Financial Performance",
        importance: "High",
        calculation: "((Current Revenue - Previous Revenue) / Previous Revenue) × 100",
        linkedIndicators: ["Strategic Initiative Progress", "Market Expansion"],
      },
    ],
  },
  "Chief Technology Officer": {
    department: "Executive",
    description: "Leads technology strategy and innovation initiatives",
    kpis: [
      {
        name: "Technology Innovation Index",
        type: "leading",
        description: "Number of new technologies evaluated and adopted",
        target: "≥ 3/quarter",
        frequency: "Monthly",
        category: "Innovation",
        importance: "High",
        calculation: "Count of technology innovations implemented",
        linkedIndicators: ["System Performance", "Development Velocity"],
      },
      {
        name: "System Performance Score",
        type: "lagging",
        description: "Overall technology infrastructure performance rating",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "Weighted average of system performance metrics",
        linkedIndicators: ["Technology Innovation Index", "Infrastructure Investment"],
      },
    ],
  },

  // Specialized Roles
  "Data Analyst": {
    department: "Analytics",
    description: "Analyzes data to provide insights and support business decision-making",
    kpis: [
      {
        name: "Data Quality Checks",
        type: "leading",
        description: "Regular validation and quality assessment of data sources",
        target: "Daily checks",
        frequency: "Daily",
        category: "Quality",
        importance: "High",
        calculation: "Count of data quality validations performed",
        linkedIndicators: ["Analysis Accuracy Rate", "Data Reliability Score"],
      },
      {
        name: "Analysis Accuracy Rate",
        type: "lagging",
        description: "Percentage of analyses that are validated and error-free",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Accurate Analyses / Total Analyses) × 100",
        linkedIndicators: ["Data Quality Checks", "Analysis Documentation Rate"],
      },
    ],
  },
  "Project Manager": {
    department: "Operations",
    description: "Plans, executes, and delivers projects on time and within budget",
    kpis: [
      {
        name: "Risk Assessment Frequency",
        type: "leading",
        description: "Regular project risk assessments and mitigation planning",
        target: "≥ 2/month",
        frequency: "Weekly",
        category: "Risk Management",
        importance: "High",
        calculation: "Count of risk assessments performed",
        linkedIndicators: ["Project Success Rate", "Budget Variance"],
      },
      {
        name: "Project Success Rate",
        type: "lagging",
        description: "Percentage of projects delivered on time and within budget",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Delivery",
        importance: "High",
        calculation: "(Successful Projects / Total Projects) × 100",
        linkedIndicators: ["Risk Assessment Frequency", "Stakeholder Communication"],
      },
    ],
  },
}

// HR Theory References
const hrTheories = [
  {
    name: "Job Demands-Resources Model",
    author: "Bakker & Demerouti",
    year: "2007",
    description:
      "Framework for understanding employee well-being and performance based on the balance between job demands and available resources.",
    application: "Use to assess workload sustainability and identify burnout risk factors.",
    keyPrinciples: [
      "High demands + Low resources = Burnout",
      "High demands + High resources = Engagement",
      "Resources can buffer the impact of demands",
    ],
    relevantPositions: ["All positions", "Particularly high-stress roles"],
    link: "https://doi.org/10.1146/annurev.psych.58.110405.085530",
  },
  {
    name: "Goal Setting Theory",
    author: "Locke & Latham",
    year: "1990",
    description:
      "Theory explaining how specific and challenging goals lead to higher performance when combined with feedback.",
    application: "Design effective performance goals and KPI targets for maximum motivation.",
    keyPrinciples: [
      "Specific goals are more effective than vague goals",
      "Challenging goals lead to higher performance",
      "Feedback is essential for goal effectiveness",
      "Goal commitment affects performance",
    ],
    relevantPositions: ["All positions", "Sales roles", "Project-based roles"],
    link: "https://doi.org/10.1037/0003-066X.45.2.125",
  },
  {
    name: "Self-Determination Theory",
    author: "Deci & Ryan",
    year: "1985",
    description:
      "Theory of motivation focusing on autonomy, competence, and relatedness as drivers of intrinsic motivation.",
    application: "Create work environments that foster intrinsic motivation and employee engagement.",
    keyPrinciples: [
      "Autonomy: Need for self-direction",
      "Competence: Need to feel effective",
      "Relatedness: Need for connection with others",
      "Intrinsic motivation leads to better performance",
    ],
    relevantPositions: ["Creative roles", "Knowledge workers", "Management positions"],
    link: "https://doi.org/10.1037/0003-066X.55.1.68",
  },
  {
    name: "Job Characteristics Model",
    author: "Hackman & Oldham",
    year: "1976",
    description:
      "Model identifying five core job characteristics that influence motivation, satisfaction, and performance.",
    application: "Design jobs with optimal characteristics to enhance employee motivation and performance.",
    keyPrinciples: [
      "Skill variety increases engagement",
      "Task identity creates meaning",
      "Task significance enhances motivation",
      "Autonomy increases satisfaction",
      "Feedback improves performance",
    ],
    relevantPositions: ["All positions", "Particularly routine or specialized roles"],
    link: "https://doi.org/10.1016/0030-5073(76)90016-7",
  },
  {
    name: "Situational Leadership Theory",
    author: "Hersey & Blanchard",
    year: "1969",
    description:
      "Leadership model suggesting that effective leadership style should adapt to the development level of followers.",
    application: "Adapt management approach based on team member competence and commitment levels.",
    keyPrinciples: [
      "Directing: High directive, low supportive",
      "Coaching: High directive, high supportive",
      "Supporting: Low directive, high supportive",
      "Delegating: Low directive, low supportive",
    ],
    relevantPositions: ["Management roles", "Team lead positions", "Mentoring roles"],
    link: "https://doi.org/10.1177/105960117700200404",
  },
]

export default function HRKPIGuidePage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("Software Engineer")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("kpis")

  const positions = Object.keys(kpiData)
  const currentPositionData = kpiData[selectedPosition as keyof typeof kpiData]

  const filteredTheories = hrTheories.filter(
    (theory) =>
      theory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theory.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theory.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIndicatorIcon = (type: "leading" | "lagging") => {
    return type === "leading" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-blue-600" />
    )
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedHeader />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">HR References & KPI Guide</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive guide to HR theories, KPIs, and performance indicators for effective workforce management.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kpis">Position KPIs</TabsTrigger>
            <TabsTrigger value="theories">HR Theories</TabsTrigger>
            <TabsTrigger value="connections">KPI Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="kpis" className="space-y-6">
            {/* Position Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Position</CardTitle>
                <CardDescription>Choose a position to view its KPIs and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position} - {kpiData[position as keyof typeof kpiData].department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Position Overview */}
            {currentPositionData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {selectedPosition}
                  </CardTitle>
                  <CardDescription>
                    {currentPositionData.department} • {currentPositionData.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Unified KPI Display */}
            {currentPositionData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Key Performance Indicators
                  </CardTitle>
                  <CardDescription>Leading and lagging indicators for performance measurement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentPositionData.kpis.map((kpi, index) => (
                      <Card
                        key={index}
                        className={`border-l-4 ${kpi.type === "leading" ? "border-l-green-500" : "border-l-blue-500"}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {kpi.type === "leading" ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-blue-600" />
                              )}
                              <CardTitle className="text-lg">{kpi.name}</CardTitle>
                            </div>
                            <div className="flex gap-1">
                              <Badge variant={kpi.type === "leading" ? "default" : "secondary"} className="text-xs">
                                {kpi.type === "leading" ? "Leading" : "Lagging"}
                              </Badge>
                              <Badge className={getImportanceColor(kpi.importance)}>{kpi.importance}</Badge>
                            </div>
                          </div>
                          <CardDescription>{kpi.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Target:</span>
                              <div className="text-muted-foreground">{kpi.target}</div>
                            </div>
                            <div>
                              <span className="font-medium">Frequency:</span>
                              <div className="text-muted-foreground">{kpi.frequency}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-sm">Calculation:</span>
                            <div className="text-sm text-muted-foreground mt-1 font-mono bg-muted p-2 rounded">
                              {kpi.calculation}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-sm">
                              {kpi.type === "leading" ? "Influences:" : "Influenced by:"}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {kpi.linkedIndicators.map((linked, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {linked}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="theories" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>HR Theory Reference Library</CardTitle>
                <CardDescription>Evidence-based theories to guide HR decision-making</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search theories, authors, or concepts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Theory Cards */}
            <div className="grid gap-6">
              {filteredTheories.map((theory, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {theory.name}
                        </CardTitle>
                        <CardDescription>
                          {theory.author} ({theory.year})
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={theory.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Reference
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{theory.description}</p>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Practical Application:</h4>
                      <p className="text-sm text-muted-foreground">{theory.application}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Principles:</h4>
                      <ul className="space-y-1">
                        {theory.keyPrinciples.map((principle, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            {principle}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Most Relevant For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {theory.relevantPositions.map((position, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {position}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  KPI Connection Map
                </CardTitle>
                <CardDescription>
                  Visual representation of how leading indicators influence lagging indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-full mb-6">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {currentPositionData && (
                  <div className="space-y-6">
                    {currentPositionData.kpis
                      .filter((kpi) => kpi.type === "lagging")
                      .map((lagging, index) => (
                        <Card key={index} className="border-2">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              {lagging.name}
                            </CardTitle>
                            <CardDescription>{lagging.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Target:</span>
                                <Badge variant="outline">{lagging.target}</Badge>
                                <span className="font-medium">Frequency:</span>
                                <Badge variant="outline">{lagging.frequency}</Badge>
                              </div>

                              <div>
                                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  Influenced by Leading Indicators:
                                </h4>
                                <div className="grid gap-3">
                                  {lagging.linkedIndicators.map((leadingName, idx) => {
                                    const leadingIndicator = currentPositionData.kpis.find(
                                      (l) => l.name === leadingName,
                                    )
                                    return (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                                      >
                                        <div className="flex-1">
                                          <div className="font-medium text-sm">{leadingName}</div>
                                          {leadingIndicator && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                              {leadingIndicator.description}
                                            </div>
                                          )}
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                              <div className="pt-3 border-t">
                                <div className="text-xs text-muted-foreground">
                                  <strong>Connection Logic:</strong> Improvements in the leading indicators above should
                                  positively impact the {lagging.name} metric. Monitor leading indicators closely to
                                  predict and influence lagging indicator performance.
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-blue-600" />
                          KPI Management Best Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Monitor Leading First:</strong> Focus on leading indicators to predict and
                              influence future performance
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Balance the Mix:</strong> Use 70% leading and 30% lagging indicators for optimal
                              performance management
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Regular Review:</strong> Review KPI connections quarterly to ensure they remain
                              relevant and predictive
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Action-Oriented:</strong> Ensure each KPI has clear action plans for improvement
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
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
