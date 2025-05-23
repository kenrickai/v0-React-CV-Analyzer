"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for demonstration
const userData = [
  {
    id: 1,
    name: "Alex Johnson",
    totalSubmissions: 42,
    highMatchCount: 18,
    mediumMatchCount: 15,
    lowMatchCount: 9,
    jobCategories: {
      development: 22,
      design: 8,
      marketing: 5,
      management: 7,
    },
    monthlySubmissions: [
      { month: "Jan", submissions: 3 },
      { month: "Feb", submissions: 5 },
      { month: "Mar", submissions: 4 },
      { month: "Apr", submissions: 6 },
      { month: "May", submissions: 8 },
      { month: "Jun", submissions: 7 },
      { month: "Jul", submissions: 9 },
    ],
  },
  {
    id: 2,
    name: "Emma Wilson",
    totalSubmissions: 37,
    highMatchCount: 22,
    mediumMatchCount: 10,
    lowMatchCount: 5,
    jobCategories: {
      development: 10,
      design: 5,
      marketing: 15,
      management: 7,
    },
    monthlySubmissions: [
      { month: "Jan", submissions: 4 },
      { month: "Feb", submissions: 3 },
      { month: "Mar", submissions: 5 },
      { month: "Apr", submissions: 7 },
      { month: "May", submissions: 6 },
      { month: "Jun", submissions: 5 },
      { month: "Jul", submissions: 7 },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    totalSubmissions: 29,
    highMatchCount: 12,
    mediumMatchCount: 10,
    lowMatchCount: 7,
    jobCategories: {
      development: 15,
      design: 3,
      marketing: 4,
      management: 7,
    },
    monthlySubmissions: [
      { month: "Jan", submissions: 2 },
      { month: "Feb", submissions: 3 },
      { month: "Mar", submissions: 4 },
      { month: "Apr", submissions: 5 },
      { month: "May", submissions: 4 },
      { month: "Jun", submissions: 6 },
      { month: "Jul", submissions: 5 },
    ],
  },
  {
    id: 4,
    name: "Sophia Garcia",
    totalSubmissions: 51,
    highMatchCount: 31,
    mediumMatchCount: 15,
    lowMatchCount: 5,
    jobCategories: {
      development: 20,
      design: 12,
      marketing: 8,
      management: 11,
    },
    monthlySubmissions: [
      { month: "Jan", submissions: 5 },
      { month: "Feb", submissions: 6 },
      { month: "Mar", submissions: 7 },
      { month: "Apr", submissions: 8 },
      { month: "May", submissions: 9 },
      { month: "Jun", submissions: 8 },
      { month: "Jul", submissions: 8 },
    ],
  },
]

// Prepare data for charts
const matchDistributionData = userData.map((user) => ({
  name: user.name,
  high: user.highMatchCount,
  medium: user.mediumMatchCount,
  low: user.lowMatchCount,
}))

const jobCategoryData = [
  { name: "Development", value: userData.reduce((sum, user) => sum + user.jobCategories.development, 0) },
  { name: "Design", value: userData.reduce((sum, user) => sum + user.jobCategories.design, 0) },
  { name: "Marketing", value: userData.reduce((sum, user) => sum + user.jobCategories.marketing, 0) },
  { name: "Management", value: userData.reduce((sum, user) => sum + user.jobCategories.management, 0) },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const monthlyTrendData = [
  { month: "Jan", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[0].submissions, 0) },
  { month: "Feb", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[1].submissions, 0) },
  { month: "Mar", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[2].submissions, 0) },
  { month: "Apr", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[3].submissions, 0) },
  { month: "May", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[4].submissions, 0) },
  { month: "Jun", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[5].submissions, 0) },
  { month: "Jul", submissions: userData.reduce((sum, user) => sum + user.monthlySubmissions[6].submissions, 0) },
]

export default function AnalyticsPage() {
  const [selectedUser, setSelectedUser] = useState("all")

  // Filter data based on selected user
  const filteredMatchData =
    selectedUser === "all" ? matchDistributionData : matchDistributionData.filter((item) => item.name === selectedUser)

  const filteredTrendData =
    selectedUser === "all"
      ? monthlyTrendData
      : userData.find((user) => user.name === selectedUser)?.monthlySubmissions || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {userData.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="match-distribution">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="match-distribution">Match Distribution</TabsTrigger>
          <TabsTrigger value="job-categories">Job Categories</TabsTrigger>
          <TabsTrigger value="submission-trends">Submission Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="match-distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CV Match Distribution</CardTitle>
              <CardDescription>Breakdown of high, medium, and low match percentages by recruiter</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  high: {
                    label: "High Match (>85%)",
                    color: "hsl(var(--chart-1))",
                  },
                  medium: {
                    label: "Medium Match (70-85%)",
                    color: "hsl(var(--chart-2))",
                  },
                  low: {
                    label: "Low Match (<70%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredMatchData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="high" stackId="a" fill="var(--color-high)" />
                    <Bar dataKey="medium" stackId="a" fill="var(--color-medium)" />
                    <Bar dataKey="low" stackId="a" fill="var(--color-low)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {selectedUser === "all"
                  ? "Showing match distribution for all recruiters"
                  : `Showing match distribution for ${selectedUser}`}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="job-categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Category Distribution</CardTitle>
              <CardDescription>Breakdown of CV submissions by job category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {jobCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} CVs`, "Submissions"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Total CVs analyzed across all job categories:{" "}
                {userData.reduce((sum, user) => sum + user.totalSubmissions, 0)}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="submission-trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Submission Trends</CardTitle>
              <CardDescription>CV submission volume over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  submissions: {
                    label: "CV Submissions",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredTrendData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="submissions" fill="var(--color-submissions)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {selectedUser === "all"
                  ? "Showing submission trends for all recruiters"
                  : `Showing submission trends for ${selectedUser}`}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
