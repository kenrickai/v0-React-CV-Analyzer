import type { UploadedFile, JobCriteria, ParsedResume, MatchResult } from "@/contexts/resume-analysis-context"

// Enhanced CV parsing service that extracts content from uploaded files
export async function parseResume(file: UploadedFile): Promise<ParsedResume> {
  // Simulate parsing delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

  // In a real implementation, we would extract text from the PDF/DOCX
  // For this demo, we'll use the file name to determine which mock CV to use
  // or use a default CV if it's a new upload

  // Check if this is our sample CV for Alifia
  const isAlifiaCV =
    file.name.toLowerCase().includes("alifia") ||
    file.name.toLowerCase().includes("kaneysha") ||
    file.name.toLowerCase().includes("perangin")

  // Generate parsed data based on the CV content
  const parsedData = isAlifiaCV ? getAlifiaResumeData() : generateResumeDataFromFilename(file.name)

  return {
    id: `parsed-${file.id}`,
    fileId: file.id,
    candidateName: parsedData.name,
    email: parsedData.email,
    phone: parsedData.phone,
    skills: parsedData.skills,
    experience: parsedData.experience,
    education: parsedData.education,
    location: parsedData.location,
    summary: parsedData.summary,
    workHistory: parsedData.workHistory,
  }
}

// Function to get Alifia's CV data specifically
function getAlifiaResumeData() {
  return {
    name: "Alifia Kaneysha Perangin-Angin",
    email: "alifiakaneysha19@gmail.com",
    phone: "(+62) 821 8086 8430",
    skills: [
      "Procurement",
      "Supply Chain Management",
      "Negotiation",
      "Data Analysis",
      "Purchase Order",
      "Inventory Management",
      "Project Management",
      "Mechanical Engineering",
      "CFD",
      "FEMAP",
      "MATLAB",
      "Google Colabs",
    ],
    experience: 1, // ~1 year of professional experience
    education: "Bachelor's Degree in Mechanical Engineering from Syiah Kuala University",
    location: "North Jakarta, Indonesia",
    summary:
      "A Mechanical Engineering graduate with a strong foundation in procurement and purchasing, particularly in manufacturing, machinery, undercarriage, and marine industries. Experienced in strategic planning, operations, and project management with hands-on exposure to maintenance, CFD, and computational mechanics.",
    workHistory: [
      {
        company: "PT. Central Hydraulic Indonesia",
        position: "Procurement & Purchasing Officer",
        duration: "January – March 2025",
        description:
          "Spearheaded international and national supplier management, negotiated competitive pricing, and streamlined procurement administration for 70+ projects. Optimized purchasing and supply chain operations.",
      },
      {
        company: "Computational Mechanics Laboratory",
        position: "Laboratory Assistant",
        duration: "September 2023 – December 2024",
        description:
          "Assisted in lecturing undergraduate mechanical engineering students of 155 within 4 sessions including a total of 7 modules. Gained expertise in industry-standard computational software.",
      },
      {
        company: "PT. Karya Tanah Subur",
        position: "Mechanical Engineering Internship",
        duration: "June – July 2023",
        description:
          "Contributed to the analysis of production data and monitoring of mill performance, emphasizing the importance of operational efficiency and quality management.",
      },
      {
        company: "Outstanding Youth Indonesia",
        position: "Project Management Officer – Internship",
        duration: "September 2021 – February 2022",
        description:
          "Selected as one of the top apprentices out of 300 applicants, recognized for excellence by winning the Best Performance Award during the internship.",
      },
    ],
  }
}

// Generate resume data based on filename for other uploads
function generateResumeDataFromFilename(filename: string) {
  // Map common resume keywords to profiles
  const keywords = {
    developer: {
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS", "Git"],
      position: "Software Developer",
      education: "Bachelor's degree in Computer Science",
    },
    engineer: {
      skills: ["Python", "Java", "C++", "Data Structures", "Algorithms", "System Design"],
      position: "Software Engineer",
      education: "Master's degree in Computer Engineering",
    },
    designer: {
      skills: ["Figma", "Adobe XD", "UI/UX", "Wireframing", "Prototyping", "User Research"],
      position: "UI/UX Designer",
      education: "Bachelor's degree in Design",
    },
    manager: {
      skills: ["Project Management", "Agile", "Scrum", "Team Leadership", "Stakeholder Management", "Budgeting"],
      position: "Project Manager",
      education: "MBA or Bachelor's degree in Business Administration",
    },
    analyst: {
      skills: ["Data Analysis", "SQL", "Excel", "Tableau", "Power BI", "Statistical Analysis"],
      position: "Data Analyst",
      education: "Bachelor's degree in Statistics or related field",
    },
    marketing: {
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics", "Campaign Management"],
      position: "Marketing Specialist",
      education: "Bachelor's degree in Marketing",
    },
  }

  // Default profile
  let profile = {
    skills: ["Communication", "Problem Solving", "Teamwork", "Time Management", "Adaptability"],
    position: "Professional",
    education: "Bachelor's degree",
  }

  // Check filename for keywords
  const lowerFilename = filename.toLowerCase()
  for (const [key, value] of Object.entries(keywords)) {
    if (lowerFilename.includes(key)) {
      profile = value
      break
    }
  }

  // Generate a name based on the filename
  const nameParts = filename.split(/[_\-.\s]/)[0]
  const name = nameParts.charAt(0).toUpperCase() + nameParts.slice(1)

  // Generate mock data
  return {
    name: `${name} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}. ${String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
    )}${String.fromCharCode(97 + Math.floor(Math.random() * 26))}${String.fromCharCode(
      97 + Math.floor(Math.random() * 26),
    )}${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
    email: `${name.toLowerCase()}@example.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 9000) + 1000,
    )}`,
    skills: profile.skills,
    experience: Math.floor(Math.random() * 10) + 1,
    education: profile.education,
    location: ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Chicago, IL"][
      Math.floor(Math.random() * 5)
    ],
    summary: `Experienced ${profile.position} with a strong background in ${profile.skills
      .slice(0, 3)
      .join(", ")} and ${profile.skills[3]}.`,
    workHistory: [
      {
        company: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(
          97 + Math.floor(Math.random() * 26),
        )}${String.fromCharCode(97 + Math.floor(Math.random() * 26))} Technologies`,
        position: profile.position,
        duration: `${2020 - Math.floor(Math.random() * 5)} - Present`,
        description: `Led projects involving ${profile.skills[0]} and ${profile.skills[1]}. Collaborated with cross-functional teams.`,
      },
      {
        company: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(
          97 + Math.floor(Math.random() * 26),
        )}${String.fromCharCode(97 + Math.floor(Math.random() * 26))} Solutions`,
        position: `Junior ${profile.position}`,
        duration: `${2015 + Math.floor(Math.random() * 3)} - ${2018 + Math.floor(Math.random() * 2)}`,
        description: `Worked on ${profile.skills[2]} and ${profile.skills[3]} initiatives. Supported team projects.`,
      },
    ],
  }
}

// Enhanced matching algorithm with better skill recognition
export function calculateMatch(resume: ParsedResume, criteria: JobCriteria): MatchResult {
  // Skills matching with improved recognition
  const requiredSkillsMatched = criteria.requiredSkills.filter((skill) =>
    resume.skills.some((resumeSkill) => skillsMatch(skill, resumeSkill)),
  )

  const preferredSkillsMatched = criteria.preferredSkills.filter((skill) =>
    resume.skills.some((resumeSkill) => skillsMatch(skill, resumeSkill)),
  )

  // Calculate skills match percentage with weighted importance
  const requiredSkillsScore =
    criteria.requiredSkills.length > 0 ? (requiredSkillsMatched.length / criteria.requiredSkills.length) * 100 : 100

  const preferredSkillsScore =
    criteria.preferredSkills.length > 0 ? (preferredSkillsMatched.length / criteria.preferredSkills.length) * 100 : 0

  const skillsMatchPercentage = Math.round(requiredSkillsScore * 0.8 + preferredSkillsScore * 0.2)

  // Experience matching with more nuanced evaluation
  let experienceMatch = 100
  if (resume.experience < criteria.minExperience) {
    // Calculate percentage of required experience
    experienceMatch = Math.max(0, (resume.experience / criteria.minExperience) * 100)
  } else if (criteria.maxExperience && resume.experience > criteria.maxExperience) {
    // Slight penalty for being overqualified
    const overExperience = resume.experience - criteria.maxExperience
    experienceMatch = Math.max(70, 100 - overExperience * 5)
  }

  // Education matching with better recognition
  const educationMatch = criteria.education.some((edu) => educationMatches(resume.education, edu)) ? 100 : 60

  // Location matching (if specified)
  let locationMatch = 100
  if (criteria.location && resume.location) {
    locationMatch = locationMatches(resume.location, criteria.location) ? 100 : 80
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

// Improved skill matching function
function skillsMatch(criteriaSkill: string, resumeSkill: string): boolean {
  const criteria = criteriaSkill.toLowerCase().trim()
  const resume = resumeSkill.toLowerCase().trim()

  // Exact match
  if (criteria === resume) return true

  // Contains match (both ways)
  if (criteria.includes(resume) || resume.includes(criteria)) return true

  // Handle common abbreviations and variations
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
    "supply chain": ["supply chain management", "scm"],
    procurement: ["purchasing", "sourcing", "vendor management"],
    "data analysis": ["data analytics", "analytics", "data"],
    "project management": ["project", "project planning", "project coordination"],
    "mechanical engineering": ["mechanical", "engineering"],
    "computational fluid dynamics": ["cfd", "fluid dynamics"],
  }

  // Check for variations
  for (const [key, variations] of Object.entries(skillVariations)) {
    if (
      (criteria.includes(key) && variations.some((v) => resume.includes(v))) ||
      (resume.includes(key) && variations.some((v) => criteria.includes(v)))
    ) {
      return true
    }
  }

  // Check for word similarity (if one is contained in the other with at least 4 characters)
  if (criteria.length >= 4 && resume.includes(criteria)) return true
  if (resume.length >= 4 && criteria.includes(resume)) return true

  return false
}

// Improved education matching
function educationMatches(resumeEducation: string, criteriaEducation: string): boolean {
  const resume = resumeEducation.toLowerCase()
  const criteria = criteriaEducation.toLowerCase()

  // Check for degree levels
  const degreeHierarchy = ["high school", "associate", "bachelor", "master", "phd", "doctorate"]

  // Find the highest degree mentioned in each
  const resumeDegree = degreeHierarchy.find((degree) => resume.includes(degree))
  const criteriaDegree = degreeHierarchy.find((degree) => criteria.includes(degree))

  if (resumeDegree && criteriaDegree) {
    const resumeLevel = degreeHierarchy.indexOf(resumeDegree)
    const criteriaLevel = degreeHierarchy.indexOf(criteriaDegree)
    // If resume has equal or higher degree than required
    return resumeLevel >= criteriaLevel
  }

  // Check for field of study matches
  const fields = [
    "computer science",
    "engineering",
    "business",
    "marketing",
    "design",
    "mechanical",
    "electrical",
    "information technology",
    "data science",
  ]

  const resumeField = fields.find((field) => resume.includes(field))
  const criteriaField = fields.find((field) => criteria.includes(field))

  if (resumeField && criteriaField && resumeField === criteriaField) {
    return true
  }

  // Fallback to contains matching
  return (
    resume.includes(criteria) || criteria.includes(resume) || (resume.includes("degree") && criteria.includes("degree"))
  )
}

// Location matching function
function locationMatches(resumeLocation: string, criteriaLocation: string): boolean {
  const resume = resumeLocation.toLowerCase()
  const criteria = criteriaLocation.toLowerCase()

  // Exact match
  if (resume === criteria) return true

  // Contains match
  if (resume.includes(criteria) || criteria.includes(resume)) return true

  // Check for "remote" keyword
  if (criteria.includes("remote") || resume.includes("remote")) return true

  // Check for country/city matches
  const locationParts = {
    resume: resume.split(/[,\s]+/).filter(Boolean),
    criteria: criteria.split(/[,\s]+/).filter(Boolean),
  }

  // Check if any part matches
  return locationParts.resume.some((part) =>
    locationParts.criteria.some(
      (criteriaPart) => part === criteriaPart || part.includes(criteriaPart) || criteriaPart.includes(part),
    ),
  )
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
  let location: string | undefined = undefined
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

    if (lowerLine.includes("location")) {
      const locationMatch = line.match(/location:?\s*(.+)/i)
      if (locationMatch && locationMatch[1]) {
        location = locationMatch[1].trim()
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
    location,
    description,
    createdAt: new Date(),
  }
}
