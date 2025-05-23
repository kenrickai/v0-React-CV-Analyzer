import { Check, X, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for demonstration
const candidates = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    match: true,
    matchScore: 92,
    skills: ["React.js", "TypeScript", "Node.js", "AWS"],
    experience: "7 years",
    education: "BS Computer Science",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    match: true,
    matchScore: 87,
    skills: ["React.js", "JavaScript", "Node.js", "Azure"],
    experience: "5 years",
    education: "MS Information Technology",
  },
  {
    id: 3,
    name: "Michael Williams",
    email: "m.williams@example.com",
    phone: "+1 (555) 456-7890",
    match: false,
    matchScore: 65,
    skills: ["Angular", "JavaScript", "Java", "GCP"],
    experience: "4 years",
    education: "BS Software Engineering",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    match: true,
    matchScore: 95,
    skills: ["React.js", "TypeScript", "Node.js", "AWS", "Docker"],
    experience: "6 years",
    education: "BS Computer Science",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "+1 (555) 876-5432",
    match: false,
    matchScore: 58,
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "8 years",
    education: "Self-taught",
  },
]

export default function ResultsTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Candidate</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-center">Match</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{candidate.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {candidate.experience} • {candidate.education}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {candidate.match ? (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <X className="h-5 w-5 text-red-600" />
                  </div>
                )}
              </TableCell>
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
                            stroke={candidate.match ? "#10b981" : "#ef4444"}
                            strokeWidth="3"
                            strokeDasharray={`${candidate.matchScore}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                          {candidate.matchScore}%
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Match score based on job criteria</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
