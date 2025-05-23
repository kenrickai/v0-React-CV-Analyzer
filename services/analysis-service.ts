import type { UploadedFile, JobCriteria, ParsedResume, MatchResult } from "@/contexts/resume-analysis-context"

// Enhanced mock CV parsing service with consistent data
export async function parseResume(file: UploadedFile): Promise<ParsedResume> {
  // Simulate parsing delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  // Generate consistent mock data based on file properties
  const mockData = generateConsistentResumeData(file)

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

// Enhanced matching algorithm
export function calculateMatch(resume: ParsedResume, criteria: JobCriteria): MatchResult {
  // Skills matching with fuzzy matching
  const requiredSkillsMatched = criteria.requiredSkills.filter((skill) =>
    resume.skills.some((resumeSkill) => skillsMatch(skill, resumeSkill)),
  )

  const preferredSkillsMatched = criteria.preferredSkills.filter((skill) =>
    resume.skills.some((resumeSkill) => skillsMatch(skill, resumeSkill)),
  )

  // Calculate skills match percentage
  const requiredSkillsScore =
    criteria.requiredSkills.length > 0 ? (requiredSkillsMatched.length / criteria.requiredSkills.length) * 100 : 100

  const preferredSkillsScore =
    criteria.preferredSkills.length > 0 ? (preferredSkillsMatched.length / criteria.preferredSkills.length) * 100 : 0

  const skillsMatchPercentage = Math.round(requiredSkillsScore * 0.8 + preferredSkillsScore * 0.2)

  // Experience matching
  let experienceMatch = 100
  if (resume.experience < criteria.minExperience) {
    experienceMatch = Math.max(0, (resume.experience / criteria.minExperience) * 100)
  } else if (criteria.maxExperience && resume.experience > criteria.maxExperience) {
    const overExperience = resume.experience - criteria.maxExperience
    experienceMatch = Math.max(70, 100 - overExperience * 5) // Slight penalty for being overqualified
  }

  // Education matching
  const educationMatch = criteria.education.some((edu) => educationMatches(resume.education, edu)) ? 100 : 60 // Partial credit if education doesn't exactly match

  // Location matching (if specified)
  let locationMatch = 100
  if (criteria.location && resume.location) {
    locationMatch = resume.location.toLowerCase().includes(criteria.location.toLowerCase()) ? 100 : 80
  }

  // Calculate overall score with weighted factors
  const overallScore = Math.round(
    skillsMatchPercentage * 0.4 + experienceMatch * 0.3 + educationMatch * 0.2 + locationMatch * 0.1,
  )

  // Determine if it's a strong match
  const isMatch =
    overallScore >= 75 &&
    requiredSkillsMatched.length >= Math.ceil(criteria.requiredSkills.length * 0.7) &&
    resume.experience >= criteria.minExperience * 0.8

  const missingSkills = criteria.requiredSkills.filter((skill) => !requiredSkillsMatched.includes(skill))

  return {
    id: `match-${resume.id}-${criteria.id}`,
    resumeId: resume.id,
    criteriaId: criteria.id,
    overallScore: Math.min(100, Math.max(0, overallScore)),
    skillsMatch: Math.round(skillsMatchPercentage),
    experienceMatch: Math.round(experienceMatch),
    educationMatch: Math.round(educationMatch),
    isMatch,
    matchedSkills: [...requiredSkillsMatched, ...preferredSkillsMatched],
    missingSkills,
    feedback: generateDetailedFeedback(
      overallScore,
      requiredSkillsMatched,
      missingSkills,
      resume.experience,
      criteria.minExperience,
      criteria.maxExperience,
      resume.education,
      criteria.education,
    ),
    analyzedAt: new Date(),
  }
}

// Helper function for fuzzy skill matching
function skillsMatch(criteriaSkill: string, resumeSkill: string): boolean {
  const criteria = criteriaSkill.toLowerCase().trim()
  const resume = resumeSkill.toLowerCase().trim()

  // Exact match
  if (criteria === resume) return true

  // Contains match
  if (criteria.includes(resume) || resume.includes(criteria)) return true

  // Common variations
  const skillVariations: Record<string, string[]> = {
    javascript: ["js", "ecmascript", "es6", "es2015"],
    typescript: ["ts"],
    react: ["reactjs", "react.js"],
    node: ["nodejs", "node.js"],
    python: ["py"],
    postgresql: ["postgres", "psql"],
    mongodb: ["mongo"],
    aws: ["amazon web services"],
    gcp: ["google cloud platform", "google cloud"],
    azure: ["microsoft azure"],
  }

  for (const [key, variations] of Object.entries(skillVariations)) {
    if ((criteria === key && variations.includes(resume)) || (resume === key && variations.includes(criteria))) {
      return true
    }
  }

  return false
}

// Helper function for education matching
function educationMatches(resumeEducation: string, criteriaEducation: string): boolean {
  const resume = resumeEducation.toLowerCase()
  const criteria = criteriaEducation.toLowerCase()

  // Check for degree levels
  const degreeHierarchy = ["associate", "bachelor", "master", "phd", "doctorate"]
  const resumeDegree = degreeHierarchy.find((degree) => resume.includes(degree))
  const criteriaDegree = degreeHierarchy.find((degree) => criteria.includes(degree))

  if (resumeDegree && criteriaDegree) {
    const resumeLevel = degreeHierarchy.indexOf(resumeDegree)
    const criteriaLevel = degreeHierarchy.indexOf(criteriaDegree)
    return resumeLevel >= criteriaLevel
  }

  // Fallback to contains matching
  return resume.includes(criteria) || criteria.includes(resume)
}

// Generate consistent mock data based on file properties
function generateConsistentResumeData(file: UploadedFile) {
  // Use file name and size to generate consistent data
  const seed = file.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + file.size

  const candidateProfiles = [
    {
      namePattern: ["John", "Smith"],
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL", "PostgreSQL"],
      experience: 7,
      education: "Bachelor's degree in Computer Science",
      location: "San Francisco, CA",
      summary: "Senior full-stack developer with extensive experience in modern web technologies and cloud platforms.",
      workHistory: [
        {
          company: "TechCorp Inc.",
          position: "Senior Software Engineer",
          duration: "2020 - Present",
          description:
            "Lead development of React-based applications serving 1M+ users. Architected microservices using Node.js and AWS.",
        },
        {
          company: "StartupXYZ",
          position: "Full Stack Developer",
          duration: "2018 - 2020",
          description:
            "Built scalable web applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines.",
        },
      ],
    },
    {
      namePattern: ["Sarah", "Johnson"],
      skills: ["React", "JavaScript", "Node.js", "Azure", "MongoDB", "Express", "CSS"],
      experience: 5,
      education: "Master's degree in Information Technology",
      location: "New York, NY",
      summary: "Experienced frontend developer with strong backend skills and cloud platform expertise.",
      workHistory: [
        {
          company: "Digital Solutions Ltd.",
          position: "Software Developer",
          duration: "2019 - Present",
          description:
            "Developed responsive web applications using React and Node.js. Managed Azure cloud deployments.",
        },
      ],
    },
    {
      namePattern: ["Michael", "Williams"],
      skills: ["Angular", "JavaScript", "Java", "Spring Boot", "MySQL", "GCP", "Kubernetes"],
      experience: 4,
      education: "Bachelor's degree in Software Engineering",
      location: "Austin, TX",
      summary: "Backend-focused developer with strong experience in Java ecosystem and cloud technologies.",
      workHistory: [
        {
          company: "Enterprise Corp",
          position: "Java Developer",
          duration: "2020 - Present",
          description: "Built enterprise applications using Spring Boot and microservices architecture on GCP.",
        },
      ],
    },
    {
      namePattern: ["Emily", "Davis"],
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes", "Python", "Redis"],
      experience: 6,
      education: "Bachelor's degree in Computer Science",
      location: "Seattle, WA",
      summary: "Full-stack engineer with DevOps experience and expertise in scalable cloud architecture.",
      workHistory: [
        {
          company: "Cloud Innovations",
          position: "Senior Developer",
          duration: "2019 - Present",
          description: "Architected cloud-native applications using React, Node.js, and AWS. Led DevOps initiatives.",
        },
      ],
    },
    {
      namePattern: ["Robert", "Brown"],
      skills: ["PHP", "Laravel", "MySQL", "Vue.js", "jQuery", "Linux"],
      experience: 8,
      education: "Self-taught developer",
      location: "Chicago, IL",
      summary: "Experienced PHP developer with strong background in web development and database management.",
      workHistory: [
        {
          company: "Web Agency Pro",
          position: "Senior PHP Developer",
          duration: "2016 - Present",
          description: "Developed custom web applications using PHP and Laravel framework. Managed Linux servers.",
        },
      ],
    },
    {
      namePattern: ["Lisa", "Anderson"],
      skills: ["Python", "Django", "PostgreSQL", "React", "Docker", "AWS", "Machine Learning"],
      experience: 5,
      education: "Master's degree in Computer Science",
      location: "Boston, MA",
      summary: "Full-stack Python developer with machine learning expertise and cloud platform experience.",
      workHistory: [
        {
          company: "AI Solutions Inc.",
          position: "Python Developer",
          duration: "2019 - Present",
          description: "Built ML-powered web applications using Django and React. Deployed on AWS infrastructure.",
        },
      ],
    },
  ]

  // Select profile based on seed
  const profileIndex = seed % candidateProfiles.length
  const profile = candidateProfiles[profileIndex]

  // Generate email based on name
  const firstName = profile.namePattern[0].toLowerCase()
  const lastName = profile.namePattern[1].toLowerCase()
  const emailDomains = ["gmail.com", "email.com", "company.com", "tech.io"]
  const emailDomain = emailDomains[seed % emailDomains.length]

  return {
    name: `${profile.namePattern[0]} ${profile.namePattern[1]}`,
    email: `${firstName}.${lastName}@${emailDomain}`,
    phone: `+1 (555) ${String(Math.floor((seed % 900) + 100))}-${String(Math.floor((seed % 9000) + 1000))}`,
    skills: profile.skills,
    experience: profile.experience,
    education: profile.education,
    location: profile.location,
    summary: profile.summary,
    workHistory: profile.workHistory,
  }
}

function generateDetailedFeedback(
  score: number,
  matchedSkills: string[],
  missingSkills: string[],
  experience: number,
  minExperience: number,
  maxExperience?: number,
  education?: string,
  requiredEducation?: string[],
): string {
  let feedback = ""

  // Overall assessment
  if (score >= 90) {
    feedback = "🌟 Excellent candidate! Outstanding match across all criteria."
  } else if (score >= 80) {
    feedback = "✅ Very strong candidate with most requirements exceeded."
  } else if (score >= 70) {
    feedback = "👍 Good candidate who meets core requirements."
  } else if (score >= 60) {
    feedback = "⚠️ Potential candidate but may need additional training or experience."
  } else {
    feedback = "❌ Does not meet minimum requirements for this position."
  }

  // Skills feedback
  if (matchedSkills.length > 0) {
    feedback += ` Strong skills in: ${matchedSkills.slice(0, 3).join(", ")}`
    if (matchedSkills.length > 3) {
      feedback += ` and ${matchedSkills.length - 3} more.`
    } else {
      feedback += `.`
    }
  }

  if (missingSkills.length > 0) {
    feedback += ` Missing key skills: ${missingSkills.slice(0, 3).join(", ")}`
    if (missingSkills.length > 3) {
      feedback += ` and ${missingSkills.length - 3} others.`
    } else {
      feedback += `.`
    }
  }

  // Experience feedback
  if (experience < minExperience) {
    const shortfall = minExperience - experience
    feedback += ` Needs ${shortfall} more year${shortfall > 1 ? "s" : ""} of experience.`
  } else if (maxExperience && experience > maxExperience) {
    feedback += ` May be overqualified with ${experience} years of experience.`
  } else {
    feedback += ` Experience level is well-suited for this role.`
  }

  return feedback
}

// Parse job criteria from structured input
export function createJobCriteria(criteriaData: {
  title: string
  requiredSkills: string[]
  preferredSkills: string[]
  minExperience: number
  maxExperience?: number
  education: string[]
  location?: string
  salaryRange?: { min: number; max: number }
  description: string
}): JobCriteria {
  return {
    id: `criteria-${Date.now()}`,
    title: criteriaData.title,
    requiredSkills: criteriaData.requiredSkills,
    preferredSkills: criteriaData.preferredSkills,
    minExperience: criteriaData.minExperience,
    maxExperience: criteriaData.maxExperience,
    education: criteriaData.education,
    location: criteriaData.location,
    salaryRange: criteriaData.salaryRange,
    description: criteriaData.description,
    createdAt: new Date(),
  }
}

// Legacy function for backward compatibility
export function parseJobCriteria(text: string, title = "Software Developer"): JobCriteria {
  const lines = text.split("\n").filter((line) => line.trim())

  const requiredSkills: string[] = []
  const preferredSkills: string[] = []
  const education: string[] = []
  let minExperience = 0
  const description = text

  // Simple parsing logic (keeping existing logic for text-based input)
  lines.forEach((line) => {
    const lowerLine = line.toLowerCase()

    if (lowerLine.includes("required") && (lowerLine.includes("skill") || lowerLine.includes("tech"))) {
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
