"use client"

import { useState } from "react"
import { FileJson, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CriteriaUploader() {
  const [criteriaText, setCriteriaText] = useState(
    "Required Skills:\n- React.js (3+ years)\n- TypeScript (2+ years)\n- Node.js (2+ years)\n\nEducation:\n- Bachelor's degree in Computer Science or related field\n\nExperience:\n- 5+ years in web development\n- Experience with cloud platforms (AWS/Azure)",
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Criteria</CardTitle>
        <CardDescription>Define the criteria for matching candidates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="manual">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Textarea
              placeholder="Enter job requirements, skills, experience, etc."
              className="min-h-[200px]"
              value={criteriaText}
              onChange={(e) => setCriteriaText(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="upload">
            <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25">
              <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <FileJson className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Upload criteria file</h3>
              <p className="text-sm text-muted-foreground mb-3">JSON, CSV, or TXT format</p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-2">
          <div className="flex items-center text-sm text-green-600">
            <Check className="h-4 w-4 mr-1" />
            <span>Criteria format validated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
