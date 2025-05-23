import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, PieChart, Users } from "lucide-react"

// Mock data for demonstration
const userData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSubmissions: 42,
    highMatchCount: 18,
    recentCVs: [
      { name: "senior-developer-john-smith.pdf", matchPercentage: 92 },
      { name: "frontend-dev-sarah-parker.pdf", matchPercentage: 88 },
      { name: "ui-designer-mike-ross.pdf", matchPercentage: 76 },
    ],
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSubmissions: 37,
    highMatchCount: 22,
    recentCVs: [
      { name: "product-manager-lisa-wong.pdf", matchPercentage: 95 },
      { name: "marketing-specialist-david-chen.pdf", matchPercentage: 89 },
      { name: "data-analyst-james-miller.pdf", matchPercentage: 91 },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSubmissions: 29,
    highMatchCount: 12,
    recentCVs: [
      { name: "backend-dev-anna-smith.pdf", matchPercentage: 87 },
      { name: "devops-engineer-robert-jones.pdf", matchPercentage: 82 },
      { name: "qa-tester-emily-davis.pdf", matchPercentage: 79 },
    ],
  },
  {
    id: 4,
    name: "Sophia Garcia",
    email: "sophia@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSubmissions: 51,
    highMatchCount: 31,
    recentCVs: [
      { name: "project-manager-thomas-wilson.pdf", matchPercentage: 94 },
      { name: "ux-researcher-olivia-martin.pdf", matchPercentage: 90 },
      { name: "full-stack-dev-william-taylor.pdf", matchPercentage: 93 },
    ],
  },
]

// Calculate total statistics
const totalSubmissions = userData.reduce((sum, user) => sum + user.totalSubmissions, 0)
const totalHighMatches = userData.reduce((sum, user) => sum + user.highMatchCount, 0)
const averageMatchRate = Math.round((totalHighMatches / totalSubmissions) * 100)

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CV Submissions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Match CVs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHighMatches}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Match Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMatchRate}%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recruiters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.length}</div>
            <p className="text-xs text-muted-foreground">+1 since last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>CV Submissions by Recruiter</CardTitle>
            <CardDescription>Overview of CV submissions and high match rates per recruiter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {userData.map((user) => (
                <div key={user.id} className="space-y-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.highMatchCount} / {user.totalSubmissions} high matches
                        </p>
                      </div>
                      <Progress value={(user.highMatchCount / user.totalSubmissions) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>High Percentage CVs</CardTitle>
            <CardDescription>Recent CVs with high match percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {userData.map((user) => (
                <div key={user.id} className="space-y-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                  </div>
                  <div className="ml-10 space-y-1">
                    {user.recentCVs
                      .filter((cv) => cv.matchPercentage >= 85)
                      .map((cv, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="truncate max-w-[200px]">{cv.name}</span>
                          <span
                            className={`font-medium ${
                              cv.matchPercentage >= 90
                                ? "text-green-600"
                                : cv.matchPercentage >= 80
                                  ? "text-amber-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {cv.matchPercentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
