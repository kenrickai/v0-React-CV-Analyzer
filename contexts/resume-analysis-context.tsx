"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types for our application state
export interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export interface JobCriteria {
  id: string
  title: string
  requiredSkills: string[]
  preferredSkills: string[]
  minExperience: number
  maxExperience?: number
  education: string[]
  location?: string
  salaryRange?: {
    min: number
    max: number
  }
  description: string
  createdAt: Date
}

export interface ParsedResume {
  id: string
  fileId: string
  candidateName: string
  email: string
  phone: string
  skills: string[]
  experience: number
  education: string
  location?: string
  summary: string
  workHistory: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
}

export interface MatchResult {
  id: string
  resumeId: string
  criteriaId: string
  overallScore: number
  skillsMatch: number
  experienceMatch: number
  educationMatch: number
  isMatch: boolean
  matchedSkills: string[]
  missingSkills: string[]
  feedback: string
  analyzedAt: Date
}

interface AppState {
  uploadedFiles: UploadedFile[]
  jobCriteria: JobCriteria | null
  parsedResumes: ParsedResume[]
  matchResults: MatchResult[]
  isAnalyzing: boolean
  analysisProgress: number
  currentStep: "upload" | "analyze" | "results"
  error: string | null
}

type AppAction =
  | { type: "ADD_FILES"; payload: UploadedFile[] }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "SET_JOB_CRITERIA"; payload: JobCriteria }
  | { type: "SET_PARSED_RESUMES"; payload: ParsedResume[] }
  | { type: "SET_MATCH_RESULTS"; payload: MatchResult[] }
  | { type: "SET_ANALYZING"; payload: boolean }
  | { type: "SET_ANALYSIS_PROGRESS"; payload: number }
  | { type: "SET_CURRENT_STEP"; payload: "upload" | "analyze" | "results" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_ANALYSIS" }

const initialState: AppState = {
  uploadedFiles: [],
  jobCriteria: null,
  parsedResumes: [],
  matchResults: [],
  isAnalyzing: false,
  analysisProgress: 0,
  currentStep: "upload",
  error: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_FILES":
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.payload],
      }
    case "REMOVE_FILE":
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter((file) => file.id !== action.payload),
      }
    case "SET_JOB_CRITERIA":
      return {
        ...state,
        jobCriteria: action.payload,
      }
    case "SET_PARSED_RESUMES":
      return {
        ...state,
        parsedResumes: action.payload,
      }
    case "SET_MATCH_RESULTS":
      return {
        ...state,
        matchResults: action.payload,
      }
    case "SET_ANALYZING":
      return {
        ...state,
        isAnalyzing: action.payload,
      }
    case "SET_ANALYSIS_PROGRESS":
      return {
        ...state,
        analysisProgress: action.payload,
      }
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    case "RESET_ANALYSIS":
      return {
        ...state,
        parsedResumes: [],
        matchResults: [],
        analysisProgress: 0,
        isAnalyzing: false,
        error: null,
      }
    default:
      return state
  }
}

const ResumeAnalysisContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function ResumeAnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <ResumeAnalysisContext.Provider value={{ state, dispatch }}>{children}</ResumeAnalysisContext.Provider>
}

export function useResumeAnalysis() {
  const context = useContext(ResumeAnalysisContext)
  if (!context) {
    throw new Error("useResumeAnalysis must be used within a ResumeAnalysisProvider")
  }
  return context
}
