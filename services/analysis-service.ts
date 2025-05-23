import type { UploadedFile, JobCriteria, ParsedResume, MatchResult } from "@/contexts/resume-analysis-context"

// Mock CV parsing service (in production, this would use actual CV parsing libraries)
export async function parseResume(file: UploadedFile): Promise<ParsedResume> {
  // Simulate parsing delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  // Mock parsed data based on filename patterns
  const mockData = generateMockResumeData(file.name)

  return {
    id: `parsed-${file.id}`,
    fileId: file.id,
    candidateName: mockData.name,
    email: mockData.email,
    phone: mockData.phone,
    skills: mockData.skills,
    experience: mockData.experience,
    education: mockData.education,
    location: mockData.location,
    summary: mockData.summary,
    workHistory: mockData.workHistory,
  }
}

// Mock matching algorithm
export function calculateMatch(resume: ParsedResume, criteria: JobCriteria): MatchResult {
  // Skills matching
  const requiredSkillsMatched = criteria.requiredSkills.filter((skill) =>
    resume.skills.some(
      (resumeSkill) =>
        resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(resumeSkill.toLowerCase()),
    ),
  )

  const preferredSkillsMatched = criteria.preferredSkills.filter((skill) =>
    resume.skills.some(
      (resumeSkill) =>
        resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(resumeSkill.toLowerCase()),
    ),
  )

  const skillsMatchPercentage =
    criteria.requiredSkills.length > 0 ? (requiredSkillsMatched.length / criteria.requiredSkills.length) * 100 : 100

  // Experience matching
  const experienceMatch =
    resume.experience >= criteria.minExperience
      ? Math.min(100, (resume.experience / criteria.minExperience) * 100)
      : (resume.experience / criteria.minExperience) * 100

  // Education matching
  const educationMatch = criteria.education.some((edu) => resume.education.toLowerCase().includes(edu.toLowerCase()))
    ? 100
    : 50

  // Calculate overall score
  const overallScore = Math.round(skillsMatchPercentage * 0.5 + experienceMatch * 0.3 + educationMatch * 0.2)

  const isMatch = overallScore >= 70 && requiredSkillsMatched.length >= Math.ceil(criteria.requiredSkills.length * 0.7)

  const missingSkills = criteria.requiredSkills.filter((skill) => !requiredSkillsMatched.includes(skill))

  return {
    id: `match-${resume.id}-${criteria.id}`,
    resumeId: resume.id,
    criteriaId: criteria.id,
    overallScore,
    skillsMatch: Math.round(skillsMatchPercentage),
    experienceMatch: Math.round(experienceMatch),
    educationMatch: Math.round(educationMatch),
    isMatch,
    matchedSkills: [...requiredSkillsMatched, ...preferredSkillsMatched],
    missingSkills,
    feedback: generateFeedback(
      overallScore,
      requiredSkillsMatched,
      missingSkills,
      resume.experience,
      criteria.minExperience,
    ),
    analyzedAt: new Date(),
  }
}

function generateMockResumeData(filename: string) {
  const mockCandidates = [
    {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL"],
      experience: 7,
      education: "Bachelor's in Computer Science",
      location: "San Francisco, CA",
      summary: "Senior full-stack developer with 7 years of experience building scalable web applications.",
      workHistory: [
        {
          company: "Tech Corp",
          position: "Senior Software Engineer",
          duration: "2020 - Present",
          description: "Lead development of React-based applications serving 1M+ users",
        },
        {
          company: "StartupXYZ",
          position: "Full Stack Developer",
          duration: "2018 - 2020",
          description: "Built microservices architecture using Node.js and AWS",
        },
      ],
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      skills: ["React", "JavaScript", "Node.js", "Azure", "MongoDB", "Express"],
      experience: 5,
      education: "Master's in Information Technology",
      location: "New York, NY",
      summary: "Experienced developer specializing in modern web technologies and cloud platforms.",
      workHistory: [
        {
          company: "Digital Solutions",
          position: "Software Developer",
          duration: "2019 - Present",
          description: "Developed and maintained React applications with Node.js backends",
        },
      ],
    },
    {
      name: "Michael Williams",
      email: "m.williams@email.com",
      phone: "+1 (555) 456-7890",
      skills: ["Angular", "JavaScript", "Java", "Spring Boot", "MySQL", "GCP"],
      experience: 4,
      education: "Bachelor's in Software Engineering",
      location: "Austin, TX",
      summary: "Backend-focused developer with strong experience in Java and cloud technologies.",
      workHistory: [
        {
          company: "Enterprise Corp",
          position: "Java Developer",
          duration: "2020 - Present",
          description: "Built enterprise applications using Spring Boot and microservices",
        },
      ],
    },
    {
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 234-5678",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes", "Python"],
      experience: 6,
      education: "Bachelor's in Computer Science",
      location: "Seattle, WA",
      summary: "Full-stack engineer with DevOps experience and a passion for scalable architecture.",
      workHistory: [
        {
          company: "Cloud Innovations",
          position: "Senior Developer",
          duration: "2019 - Present",
          description: "Architected cloud-native applications using React, Node.js, and AWS",
        },
      ],
    },
    {
      name: "Robert Brown",
      email: "robert.b@email.com",
      phone: "+1 (555) 876-5432",
      skills: ["PHP", "Laravel", "MySQL", "Vue.js", "jQuery"],
      experience: 8,
      education: "Self-taught",
      location: "Chicago, IL",
      summary: "Experienced PHP developer with strong background in web development and databases.",
      workHistory: [
        {
          company: "Web Agency",
          position: "Senior PHP Developer",
          duration: "2016 - Present",
          description: "Developed custom web applications using PHP and Laravel framework",
        },
      ],
    },
  ]

  // Return a random candidate or match based on filename
  const randomIndex = Math.abs(filename.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % mockCandidates.length
  return mockCandidates[randomIndex]
}

function generateFeedback(
  score: number,
  matchedSkills: string[],
  missingSkills: string[],
  experience: number,
  minExperience: number,
): string {
  let feedback = ""

  if (score >= 90) {
    feedback = "Excellent candidate! Strong match across all criteria."
  } else if (score >= 80) {
    feedback = "Very good candidate with most requirements met."
  } else if (score >= 70) {
    feedback = "Good candidate, meets minimum requirements."
  } else if (score >= 60) {
    feedback = "Potential candidate but may need additional training."
  } else {
    feedback = "Does not meet minimum requirements for this position."
  }

  if (missingSkills.length > 0) {
    feedback += ` Missing skills: ${missingSkills.join(", ")}.`
  }

  if (experience < minExperience) {
    feedback += ` Requires ${minExperience - experience} more years of experience.`
  }

  return feedback
}

// Parse job criteria from text
export function parseJobCriteria(text: string, title = "Software Developer"): JobCriteria {
  const lines = text.split("\n").filter((line) => line.trim())

  const requiredSkills: string[] = []
  const preferredSkills: string[] = []
  const education: string[] = []
  let minExperience = 0
  const description = text

  // Simple parsing logic
  lines.forEach((line) => {
    const lowerLine = line.toLowerCase()

    if (lowerLine.includes("required") && (lowerLine.includes("skill") || lowerLine.includes("tech"))) {
      // Extract skills from bullet points
      const skillMatches = line.match(/[-•]\s*([^(]+)/g)
      if (skillMatches) {
        skillMatches.forEach((match) => {
          const skill = match
            .replace(/[-•]\s*/, "")
            .split("(")[0]
            .trim()
          if (skill) requiredSkills.push(skill)
        })
      }
    }

    if (lowerLine.includes("preferred") && lowerLine.includes("skill")) {
      const skillMatches = line.match(/[-•]\s*([^(]+)/g)
      if (skillMatches) {
        skillMatches.forEach((match) => {
          const skill = match
            .replace(/[-•]\s*/, "")
            .split("(")[0]
            .trim()
          if (skill) preferredSkills.push(skill)
        })
      }
    }

    if (lowerLine.includes("education") || lowerLine.includes("degree")) {
      const eduMatches = line.match(/[-•]\s*([^(]+)/g)
      if (eduMatches) {
        eduMatches.forEach((match) => {
          const edu = match.replace(/[-•]\s*/, "").trim()
          if (edu) education.push(edu)
        })
      }
    }

    if (lowerLine.includes("year") && lowerLine.includes("experience")) {
      const expMatch = line.match(/(\d+)\+?\s*years?/i)
      if (expMatch) {
        minExperience = Number.parseInt(expMatch[1])
      }
    }
  })

  // Default values if parsing doesn't find anything
  if (requiredSkills.length === 0) {
    requiredSkills.push("React.js", "TypeScript", "Node.js")
  }
  if (education.length === 0) {
    education.push("Bachelor's degree in Computer Science or related field")
  }
  if (minExperience === 0) {
    minExperience = 3
  }

  return {
    id: `criteria-${Date.now()}`,
    title,
    requiredSkills,
    preferredSkills,
    minExperience,
    education,
    description,
    createdAt: new Date(),
  }
}
