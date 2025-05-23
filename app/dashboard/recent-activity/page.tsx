import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const activityLogs = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "uploaded",
    target: "senior-developer-john-smith.pdf",
    timestamp: "2025-05-23T09:32:45",
    details: "Uploaded for Senior Developer position",
  },
  {
    id: 2,
    user: {
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "analyzed",
    target: "marketing-specialist-david-chen.pdf",
    timestamp: "2025-05-23T09:15:22",
    details: "89% match for Marketing Specialist position",
  },
  {
    id: 3,
    user: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "exported",
    target: "Match Results - Backend Developer",
    timestamp: "2025-05-23T08:55:10",
    details: "Exported 12 candidate profiles as PDF",
  },
  {
    id: 4,
    user: {
      name: "Sophia Garcia",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created",
    target: "UX Designer Job Criteria",
    timestamp: "2025-05-23T08:42:33",
    details: "Created new job criteria template",
  },
  {
    id: 5,
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "deleted",
    target: "outdated-resume-template.pdf",
    timestamp: "2025-05-23T08:30:15",
    details: "Removed outdated resume from database",
  },
  {
    id: 6,
    user: {
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "updated",
    target: "Frontend Developer Job Criteria",
    timestamp: "2025-05-23T08:22:47",
    details: "Updated required skills and experience",
  },
  {
    id: 7,
    user: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "logged in",
    target: "System",
    timestamp: "2025-05-23T08:15:00",
    details: "Logged in from 192.168.1.105",
  },
  {
    id: 8,
    user: {
      name: "Sophia Garcia",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "bulk uploaded",
    target: "Project Manager Candidates",
    timestamp: "2025-05-22T17:45:22",
    details: "Uploaded 15 resumes for Project Manager position",
  },
  {
    id: 9,
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "shared",
    target: "Data Scientist Match Results",
    timestamp: "2025-05-22T16:32:10",
    details: "Shared results with hiring manager via email",
  },
  {
    id: 10,
    user: {
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "commented",
    target: "frontend-dev-sarah-parker.pdf",
    timestamp: "2025-05-22T15:18:45",
    details: "Added comment: 'Great candidate, schedule interview ASAP'",
  },
]

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Get action badge color
function getActionColor(action: string) {
  switch (action) {
    case "uploaded":
    case "bulk uploaded":
    case "created":
      return "bg-green-100 text-green-800"
    case "analyzed":
    case "exported":
    case "shared":
      return "bg-blue-100 text-blue-800"
    case "deleted":
      return "bg-red-100 text-red-800"
    case "updated":
    case "commented":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function RecentActivityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recent Activity</h1>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity Log</CardTitle>
          <CardDescription>Recent actions performed by users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4">
                <Avatar className="h-10 w-10 mt-0.5">
                  <AvatarImage src={log.user.avatar || "/placeholder.svg"} alt={log.user.name} />
                  <AvatarFallback>{log.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{log.user.name}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(log.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                    <span className="text-sm font-medium">{log.target}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
