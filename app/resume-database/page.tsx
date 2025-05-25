"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Star, Mail, Phone, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SharedHeader from "@/components/shared-header"

// Mock data for high-percentage candidates
const highPercentageCandidates = [
  {
    id: 1,
    name: "Alifia Kaneysha Perangin-Angin",
    email: "alifiakaneysha19@gmail.com",
    phone: "(+62) 821 8086 8430",
    location: "North Jakarta, Indonesia",
    position: "Procurement & Purchasing Officer",
    experience: 1,
    education: "Bachelor's Degree in Mechanical Engineering",
    skills: ["Procurement", "Supply Chain Management", "Negotiation", "Data Analysis", "Project Management"],
    matchPercentage: 92,
    lastAnalyzed: "2025-01-25",
    summary:
      "A Mechanical Engineering graduate with a strong foundation in procurement and purchasing, particularly in manufacturing, machinery, undercarriage, and marine industries.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Available",
    salaryExpectation: "$45,000 - $55,000",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    position: "Senior Software Developer",
    experience: 5,
    education: "Master's degree in Information Technology",
    skills: ["React", "JavaScript", "Node.js", "Azure", "MongoDB", "Express"],
    matchPercentage: 89,
    lastAnalyzed: "2025-01-24",
    summary: "Experienced frontend developer with strong backend skills and cloud platform expertise.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Available",
    salaryExpectation: "$95,000 - $115,000",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    position: "Product Manager",
    experience: 7,
    education: "MBA in Business Administration",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Stakeholder Management"],
    matchPercentage: 87,
    lastAnalyzed: "2025-01-23",
    summary: "Strategic product manager with extensive experience in tech startups and enterprise software.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Interviewing",
    salaryExpectation: "$130,000 - $150,000",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    position: "UX Designer",
    experience: 4,
    education: "Bachelor's degree in Design",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
    matchPercentage: 85,
    lastAnalyzed: "2025-01-22",
    summary: "Creative UX designer with a passion for user-centered design and accessibility.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Available",
    salaryExpectation: "$80,000 - $95,000",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    position: "Data Scientist",
    experience: 6,
    education: "PhD in Data Science",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistical Analysis"],
    matchPercentage: 91,
    lastAnalyzed: "2025-01-21",
    summary: "Data scientist with expertise in machine learning and predictive analytics.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Available",
    salaryExpectation: "$120,000 - $140,000",
  },
  {
    id: 6,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 567-8901",
    location: "Boston, MA",
    position: "Marketing Manager",
    experience: 5,
    education: "Master's degree in Marketing",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Campaign Management"],
    matchPercentage: 86,
    lastAnalyzed: "2025-01-20",
    summary: "Results-driven marketing manager with expertise in digital campaigns and growth strategies.",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Contacted",
    salaryExpectation: "$85,000 - $100,000",
  },
]

export default function ResumeDatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("matchPercentage")

  // Filter candidates
  const filteredCandidates = highPercentageCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSkill =
      !skillFilter || candidate.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

    const matchesLocation = !locationFilter || candidate.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesStatus = !statusFilter || candidate.status === statusFilter

    return matchesSearch && matchesSkill && matchesLocation && matchesStatus
  })

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case "matchPercentage":
        return b.matchPercentage - a.matchPercentage
      case "name":
        return a.name.localeCompare(b.name)
      case "experience":
        return b.experience - a.experience
      case "lastAnalyzed":
        return new Date(b.lastAnalyzed).getTime() - new Date(a.lastAnalyzed).getTime()
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Interviewing":
        return "bg-blue-100 text-blue-800"
      case "Contacted":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportCandidates = () => {
    const headers = ["Name", "Email", "Phone", "Position", "Experience", "Match %", "Status", "Location"]
    const csvData = sortedCandidates.map((candidate) => [
      candidate.name,
      candidate.email,
      candidate.phone,
      candidate.position,
      candidate.experience,
      candidate.matchPercentage,
      candidate.status,
      candidate.location,
    ])

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `high-percentage-candidates-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedHeader />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Resume Database</h1>
          <p className="text-muted-foreground mt-2">
            High-percentage candidates (85%+ match) from your resume analysis pool.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter Candidates</CardTitle>
            <CardDescription>Find the perfect candidates from your high-match database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Procurement">Procurement</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matchPercentage">Match %</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="lastAnalyzed">Last Analyzed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {sortedCandidates.length} high-percentage candidates
              </div>
              <Button variant="outline" size="sm" onClick={exportCandidates}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <CardDescription>{candidate.position}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{candidate.matchPercentage}%</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{candidate.experience} years experience</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{candidate.education}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                  <span className="text-xs text-muted-foreground">Analyzed {candidate.lastAnalyzed}</span>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{candidate.name}</DialogTitle>
                        <DialogDescription>{candidate.position}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Summary</h4>
                          <p className="text-sm text-muted-foreground">{candidate.summary}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Experience</h4>
                            <p className="text-sm">{candidate.experience} years</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Education</h4>
                            <p className="text-sm">{candidate.education}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Salary Expectation</h4>
                          <p className="text-sm">{candidate.salaryExpectation}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Match Score</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${candidate.matchPercentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{candidate.matchPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedCandidates.length === 0 && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No candidates found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to find candidates.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
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
