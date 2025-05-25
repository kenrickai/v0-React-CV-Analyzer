"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BookOpen,
  Target,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import SharedHeader from "@/components/shared-header"

// Global position data with comprehensive KPI alternatives
const kpiData = {
  // Technology & Engineering
  "Software Engineer": {
    department: "Technology",
    description: "Develops, tests, and maintains software applications and systems",
    kpis: [
      {
        name: "Code Review Participation Rate",
        type: "leading",
        description: "Percentage of code reviews participated in vs. total reviews available",
        target: "≥ 80%",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "(Reviews Participated / Total Reviews Available) × 100",
        linkedIndicators: ["Code Quality Score", "Bug Rate"],
      },
      {
        name: "Sprint Commitment Accuracy",
        type: "leading",
        description: "Percentage of sprint commitments successfully delivered",
        target: "≥ 85%",
        frequency: "Sprint",
        category: "Delivery",
        importance: "High",
        calculation: "(Completed Story Points / Committed Story Points) × 100",
        linkedIndicators: ["Velocity Trend", "Project Delivery Rate"],
      },
      {
        name: "Training Hours Completed",
        type: "leading",
        description: "Hours spent on technical training and skill development",
        target: "≥ 40 hours/quarter",
        frequency: "Monthly",
        category: "Development",
        importance: "Medium",
        calculation: "Sum of training hours per period",
        linkedIndicators: ["Technical Skill Assessment", "Code Quality Score"],
      },
      {
        name: "Knowledge Sharing Activities",
        type: "leading",
        description: "Number of tech talks, documentation, or mentoring sessions conducted",
        target: "≥ 2/month",
        frequency: "Monthly",
        category: "Collaboration",
        importance: "Medium",
        calculation: "Count of knowledge sharing activities",
        linkedIndicators: ["Team Knowledge Score", "Onboarding Time"],
      },
      {
        name: "Unit Test Coverage Rate",
        type: "leading",
        description: "Percentage of code covered by automated unit tests",
        target: "≥ 80%",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "(Lines Covered by Tests / Total Lines of Code) × 100",
        linkedIndicators: ["Bug Rate", "Code Quality Score"],
      },
      {
        name: "Code Quality Score",
        type: "lagging",
        description: "Automated code quality metrics including complexity, maintainability, and test coverage",
        target: "≥ 8.0/10",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "Weighted average of code metrics (complexity, coverage, maintainability)",
        linkedIndicators: ["Code Review Participation Rate", "Training Hours Completed"],
      },
      {
        name: "Bug Rate",
        type: "lagging",
        description: "Number of bugs per 1000 lines of code delivered to production",
        target: "≤ 2 bugs/1000 LOC",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Total Bugs / Total Lines of Code) × 1000",
        linkedIndicators: ["Code Review Participation Rate", "Unit Test Coverage Rate"],
      },
      {
        name: "Velocity Trend",
        type: "lagging",
        description: "Story points completed per sprint over time",
        target: "Stable or increasing",
        frequency: "Sprint",
        category: "Productivity",
        importance: "Medium",
        calculation: "Moving average of story points completed per sprint",
        linkedIndicators: ["Sprint Commitment Accuracy", "Training Hours Completed"],
      },
      {
        name: "Technical Skill Assessment",
        type: "lagging",
        description: "Quarterly assessment of technical competencies",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Development",
        importance: "Medium",
        calculation: "Average score across technical competency areas",
        linkedIndicators: ["Training Hours Completed", "Knowledge Sharing Activities"],
      },
      {
        name: "Feature Delivery Time",
        type: "lagging",
        description: "Average time from feature start to production deployment",
        target: "≤ 2 weeks",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "Average days from feature development start to production",
        linkedIndicators: ["Sprint Commitment Accuracy", "Code Quality Score"],
      },
    ],
  },
  "Data Scientist": {
    department: "Technology",
    description: "Analyzes complex data to extract insights and build predictive models",
    kpis: [
      {
        name: "Data Exploration Sessions",
        type: "leading",
        description: "Number of exploratory data analysis sessions conducted",
        target: "≥ 15/month",
        frequency: "Weekly",
        category: "Research",
        importance: "High",
        calculation: "Count of EDA sessions performed",
        linkedIndicators: ["Model Accuracy", "Business Impact Score"],
      },
      {
        name: "Model Development Cycle Time",
        type: "leading",
        description: "Time from problem definition to model deployment",
        target: "≤ 6 weeks",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Average days from project start to model deployment",
        linkedIndicators: ["Model Accuracy", "Business Impact Score"],
      },
      {
        name: "Data Quality Validation Rate",
        type: "leading",
        description: "Percentage of datasets that pass quality validation checks",
        target: "≥ 95%",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "(Valid Datasets / Total Datasets) × 100",
        linkedIndicators: ["Model Accuracy", "Analysis Reliability"],
      },
      {
        name: "Stakeholder Consultation Hours",
        type: "leading",
        description: "Time spent understanding business requirements and context",
        target: "≥ 10 hours/week",
        frequency: "Weekly",
        category: "Collaboration",
        importance: "High",
        calculation: "Hours spent in stakeholder meetings and consultations",
        linkedIndicators: ["Business Impact Score", "Model Relevance Score"],
      },
      {
        name: "Experiment Documentation Rate",
        type: "leading",
        description: "Percentage of experiments with complete documentation",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Documentation",
        importance: "Medium",
        calculation: "(Documented Experiments / Total Experiments) × 100",
        linkedIndicators: ["Knowledge Transfer Score", "Model Reproducibility"],
      },
      {
        name: "Model Accuracy",
        type: "lagging",
        description: "Predictive accuracy of deployed models",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "Average accuracy score across all deployed models",
        linkedIndicators: ["Data Exploration Sessions", "Data Quality Validation Rate"],
      },
      {
        name: "Business Impact Score",
        type: "lagging",
        description: "Measurable business value generated from data science projects",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Business Value",
        importance: "High",
        calculation: "Stakeholder assessment of project business value",
        linkedIndicators: ["Stakeholder Consultation Hours", "Model Development Cycle Time"],
      },
      {
        name: "Model Deployment Success Rate",
        type: "lagging",
        description: "Percentage of models successfully deployed to production",
        target: "≥ 80%",
        frequency: "Monthly",
        category: "Delivery",
        importance: "Medium",
        calculation: "(Successfully Deployed Models / Total Models) × 100",
        linkedIndicators: ["Model Development Cycle Time", "Data Quality Validation Rate"],
      },
      {
        name: "Analysis Reproducibility Score",
        type: "lagging",
        description: "Ability to reproduce analysis results consistently",
        target: "≥ 95%",
        frequency: "Quarterly",
        category: "Quality",
        importance: "Medium",
        calculation: "Percentage of analyses that can be reproduced",
        linkedIndicators: ["Experiment Documentation Rate", "Data Quality Validation Rate"],
      },
      {
        name: "Model Performance Monitoring",
        type: "lagging",
        description: "Percentage of deployed models with active performance monitoring",
        target: "≥ 100%",
        frequency: "Monthly",
        category: "Maintenance",
        importance: "High",
        calculation: "(Monitored Models / Deployed Models) × 100",
        linkedIndicators: ["Model Development Cycle Time", "Business Impact Score"],
      },
    ],
  },
  "DevOps Engineer": {
    department: "Technology",
    description: "Manages infrastructure, deployment pipelines, and system reliability",
    kpis: [
      {
        name: "Infrastructure Automation Rate",
        type: "leading",
        description: "Percentage of infrastructure managed through automation",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Automation",
        importance: "High",
        calculation: "(Automated Infrastructure / Total Infrastructure) × 100",
        linkedIndicators: ["System Uptime", "Deployment Success Rate"],
      },
      {
        name: "Deployment Frequency",
        type: "leading",
        description: "Number of successful deployments per week",
        target: "≥ 10/week",
        frequency: "Weekly",
        category: "Delivery",
        importance: "High",
        calculation: "Count of successful deployments per week",
        linkedIndicators: ["System Uptime", "Mean Time to Recovery"],
      },
      {
        name: "Security Scan Frequency",
        type: "leading",
        description: "Number of security scans performed on infrastructure",
        target: "≥ Daily",
        frequency: "Daily",
        category: "Security",
        importance: "High",
        calculation: "Count of security scans performed",
        linkedIndicators: ["Security Incident Rate", "Compliance Score"],
      },
      {
        name: "Monitoring Coverage Rate",
        type: "leading",
        description: "Percentage of systems with comprehensive monitoring",
        target: "≥ 95%",
        frequency: "Weekly",
        category: "Monitoring",
        importance: "High",
        calculation: "(Monitored Systems / Total Systems) × 100",
        linkedIndicators: ["Mean Time to Detection", "System Uptime"],
      },
      {
        name: "Backup Verification Rate",
        type: "leading",
        description: "Percentage of backups verified for integrity",
        target: "≥ 100%",
        frequency: "Daily",
        category: "Reliability",
        importance: "High",
        calculation: "(Verified Backups / Total Backups) × 100",
        linkedIndicators: ["Data Recovery Success Rate", "System Reliability"],
      },
      {
        name: "System Uptime",
        type: "lagging",
        description: "Percentage of time systems are operational",
        target: "≥ 99.9%",
        frequency: "Monthly",
        category: "Reliability",
        importance: "High",
        calculation: "(Total Uptime / Total Time) × 100",
        linkedIndicators: ["Infrastructure Automation Rate", "Monitoring Coverage Rate"],
      },
      {
        name: "Mean Time to Recovery (MTTR)",
        type: "lagging",
        description: "Average time to restore service after an incident",
        target: "≤ 30 minutes",
        frequency: "Monthly",
        category: "Incident Response",
        importance: "High",
        calculation: "Average time from incident detection to resolution",
        linkedIndicators: ["Deployment Frequency", "Monitoring Coverage Rate"],
      },
      {
        name: "Deployment Success Rate",
        type: "lagging",
        description: "Percentage of deployments completed without rollback",
        target: "≥ 95%",
        frequency: "Weekly",
        category: "Quality",
        importance: "Medium",
        calculation: "(Successful Deployments / Total Deployments) × 100",
        linkedIndicators: ["Infrastructure Automation Rate", "Deployment Frequency"],
      },
      {
        name: "Security Incident Rate",
        type: "lagging",
        description: "Number of security incidents per month",
        target: "≤ 1/month",
        frequency: "Monthly",
        category: "Security",
        importance: "High",
        calculation: "Count of security incidents per month",
        linkedIndicators: ["Security Scan Frequency", "Monitoring Coverage Rate"],
      },
      {
        name: "Infrastructure Cost Efficiency",
        type: "lagging",
        description: "Cost per unit of infrastructure capacity utilized",
        target: "Decreasing trend",
        frequency: "Monthly",
        category: "Cost Management",
        importance: "Medium",
        calculation: "Total Infrastructure Cost / Utilized Capacity",
        linkedIndicators: ["Infrastructure Automation Rate", "Monitoring Coverage Rate"],
      },
    ],
  },

  // Product & Design
  "Product Manager": {
    department: "Product",
    description: "Defines product strategy, manages roadmap, and coordinates cross-functional teams",
    kpis: [
      {
        name: "User Research Sessions",
        type: "leading",
        description: "Number of user interviews, surveys, or usability tests conducted",
        target: "≥ 8/month",
        frequency: "Weekly",
        category: "Research",
        importance: "High",
        calculation: "Count of user research activities",
        linkedIndicators: ["Feature Adoption Rate", "User Satisfaction Score"],
      },
      {
        name: "Stakeholder Engagement Score",
        type: "leading",
        description: "Regular communication and alignment with key stakeholders",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Communication",
        importance: "High",
        calculation: "Average stakeholder feedback score",
        linkedIndicators: ["Project Delivery Rate", "Stakeholder Satisfaction"],
      },
      {
        name: "Market Analysis Updates",
        type: "leading",
        description: "Frequency of competitive analysis and market research updates",
        target: "≥ 2/month",
        frequency: "Monthly",
        category: "Strategy",
        importance: "Medium",
        calculation: "Count of market analysis reports",
        linkedIndicators: ["Market Share Growth", "Revenue Impact"],
      },
      {
        name: "Roadmap Clarity Score",
        type: "leading",
        description: "Team understanding and alignment on product roadmap",
        target: "≥ 4.0/5.0",
        frequency: "Monthly",
        category: "Planning",
        importance: "High",
        calculation: "Team survey score on roadmap clarity",
        linkedIndicators: ["Team Velocity", "Feature Delivery Time"],
      },
      {
        name: "Feature Specification Completeness",
        type: "leading",
        description: "Percentage of features with complete specifications before development",
        target: "≥ 95%",
        frequency: "Sprint",
        category: "Planning",
        importance: "High",
        calculation: "(Complete Specifications / Total Features) × 100",
        linkedIndicators: ["Development Velocity", "Feature Quality Score"],
      },
      {
        name: "Feature Adoption Rate",
        type: "lagging",
        description: "Percentage of users adopting new features within 30 days",
        target: "≥ 25%",
        frequency: "Monthly",
        category: "Product Success",
        importance: "High",
        calculation: "(Users Adopting Feature / Total Active Users) × 100",
        linkedIndicators: ["User Research Sessions", "Market Analysis Updates"],
      },
      {
        name: "User Satisfaction Score",
        type: "lagging",
        description: "Net Promoter Score or Customer Satisfaction Score",
        target: "≥ 8.0/10",
        frequency: "Quarterly",
        category: "Customer Success",
        importance: "High",
        calculation: "Average customer satisfaction rating",
        linkedIndicators: ["User Research Sessions", "Stakeholder Engagement Score"],
      },
      {
        name: "Revenue Impact",
        type: "lagging",
        description: "Revenue attributed to product initiatives",
        target: "≥ 15% growth",
        frequency: "Quarterly",
        category: "Business Impact",
        importance: "High",
        calculation: "Revenue growth attributed to product changes",
        linkedIndicators: ["Market Analysis Updates", "Feature Adoption Rate"],
      },
      {
        name: "Feature Delivery Time",
        type: "lagging",
        description: "Average time from feature conception to release",
        target: "≤ 8 weeks",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "Average days from feature planning to release",
        linkedIndicators: ["Roadmap Clarity Score", "Feature Specification Completeness"],
      },
      {
        name: "Product-Market Fit Score",
        type: "lagging",
        description: "Measure of how well product satisfies market demand",
        target: "≥ 40% very disappointed",
        frequency: "Quarterly",
        category: "Market Validation",
        importance: "High",
        calculation: "Percentage of users who would be very disappointed without product",
        linkedIndicators: ["User Research Sessions", "Market Analysis Updates"],
      },
    ],
  },
  "UX Designer": {
    department: "Product",
    description: "Creates user-centered designs and improves user experience across products",
    kpis: [
      {
        name: "User Testing Sessions",
        type: "leading",
        description: "Number of usability tests and user feedback sessions conducted",
        target: "≥ 6/month",
        frequency: "Weekly",
        category: "Research",
        importance: "High",
        calculation: "Count of user testing sessions",
        linkedIndicators: ["User Experience Score", "Design Iteration Rate"],
      },
      {
        name: "Design System Contributions",
        type: "leading",
        description: "Components added or updated in the design system",
        target: "≥ 4/month",
        frequency: "Monthly",
        category: "Consistency",
        importance: "Medium",
        calculation: "Count of design system updates",
        linkedIndicators: ["Design Consistency Score", "Development Efficiency"],
      },
      {
        name: "Prototype Completion Rate",
        type: "leading",
        description: "Percentage of designs that include interactive prototypes",
        target: "≥ 80%",
        frequency: "Monthly",
        category: "Process",
        importance: "Medium",
        calculation: "(Designs with Prototypes / Total Designs) × 100",
        linkedIndicators: ["Design Approval Rate", "Development Handoff Quality"],
      },
      {
        name: "Cross-functional Collaboration",
        type: "leading",
        description: "Regular collaboration sessions with PM, Engineering, and Research teams",
        target: "≥ 8 sessions/month",
        frequency: "Weekly",
        category: "Collaboration",
        importance: "High",
        calculation: "Count of cross-functional collaboration sessions",
        linkedIndicators: ["Project Delivery Rate", "Design Implementation Quality"],
      },
      {
        name: "Accessibility Compliance Rate",
        type: "leading",
        description: "Percentage of designs meeting accessibility standards",
        target: "≥ 100%",
        frequency: "Monthly",
        category: "Accessibility",
        importance: "High",
        calculation: "(Accessible Designs / Total Designs) × 100",
        linkedIndicators: ["User Experience Score", "Compliance Score"],
      },
      {
        name: "User Experience Score",
        type: "lagging",
        description: "User satisfaction with interface and interaction design",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "User Success",
        importance: "High",
        calculation: "Average user experience rating from surveys",
        linkedIndicators: ["User Testing Sessions", "Accessibility Compliance Rate"],
      },
      {
        name: "Design Approval Rate",
        type: "lagging",
        description: "Percentage of designs approved without major revisions",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Quality",
        importance: "Medium",
        calculation: "(Approved Designs / Total Designs Submitted) × 100",
        linkedIndicators: ["User Testing Sessions", "Cross-functional Collaboration"],
      },
      {
        name: "Design Implementation Quality",
        type: "lagging",
        description: "Accuracy of design implementation by development team",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Handoff Quality",
        importance: "Medium",
        calculation: "Design QA score comparing implementation to designs",
        linkedIndicators: ["Design System Contributions", "Prototype Completion Rate"],
      },
      {
        name: "Design Iteration Rate",
        type: "lagging",
        description: "Number of design iterations required before approval",
        target: "≤ 2 iterations",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "Average number of iterations per design project",
        linkedIndicators: ["User Testing Sessions", "Cross-functional Collaboration"],
      },
      {
        name: "User Task Completion Rate",
        type: "lagging",
        description: "Percentage of users successfully completing key tasks",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Usability",
        importance: "High",
        calculation: "(Successful Task Completions / Total Task Attempts) × 100",
        linkedIndicators: ["User Testing Sessions", "Design Implementation Quality"],
      },
    ],
  },

  // Sales & Marketing
  "Sales Representative": {
    department: "Sales",
    description: "Generates leads, manages prospects, and closes deals to drive revenue growth",
    kpis: [
      {
        name: "Prospecting Activities",
        type: "leading",
        description: "Number of new prospects contacted per day",
        target: "≥ 20 contacts/day",
        frequency: "Daily",
        category: "Pipeline Building",
        importance: "High",
        calculation: "Count of new prospect contacts per day",
        linkedIndicators: ["Pipeline Value", "Conversion Rate"],
      },
      {
        name: "Follow-up Consistency",
        type: "leading",
        description: "Percentage of prospects with timely follow-up communications",
        target: "≥ 90%",
        frequency: "Weekly",
        category: "Process",
        importance: "High",
        calculation: "(Prospects with Timely Follow-up / Total Prospects) × 100",
        linkedIndicators: ["Deal Velocity", "Customer Satisfaction"],
      },
      {
        name: "Product Knowledge Assessment",
        type: "leading",
        description: "Regular testing of product knowledge and sales skills",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Development",
        importance: "Medium",
        calculation: "Score on product knowledge assessments",
        linkedIndicators: ["Close Rate", "Deal Size"],
      },
      {
        name: "CRM Data Quality",
        type: "leading",
        description: "Completeness and accuracy of customer data in CRM system",
        target: "≥ 95%",
        frequency: "Weekly",
        category: "Data Management",
        importance: "Medium",
        calculation: "Percentage of complete and accurate CRM records",
        linkedIndicators: ["Sales Forecast Accuracy", "Team Collaboration"],
      },
      {
        name: "Sales Activity Volume",
        type: "leading",
        description: "Total number of sales activities (calls, emails, meetings) per week",
        target: "≥ 50 activities/week",
        frequency: "Weekly",
        category: "Activity",
        importance: "High",
        calculation: "Count of all sales activities per week",
        linkedIndicators: ["Pipeline Generation", "Meeting Conversion Rate"],
      },
      {
        name: "Revenue Achievement",
        type: "lagging",
        description: "Percentage of sales quota achieved",
        target: "≥ 100%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "(Actual Revenue / Sales Quota) × 100",
        linkedIndicators: ["Prospecting Activities", "Follow-up Consistency"],
      },
      {
        name: "Pipeline Value",
        type: "lagging",
        description: "Total value of qualified opportunities in sales pipeline",
        target: "≥ 3x quota",
        frequency: "Weekly",
        category: "Pipeline Health",
        importance: "High",
        calculation: "Sum of weighted pipeline opportunities",
        linkedIndicators: ["Prospecting Activities", "Sales Activity Volume"],
      },
      {
        name: "Deal Velocity",
        type: "lagging",
        description: "Average time from first contact to closed deal",
        target: "≤ 45 days",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "Average days from lead to close",
        linkedIndicators: ["Follow-up Consistency", "Product Knowledge Assessment"],
      },
      {
        name: "Customer Satisfaction",
        type: "lagging",
        description: "Post-sale customer satisfaction score",
        target: "≥ 4.5/5.0",
        frequency: "Quarterly",
        category: "Customer Success",
        importance: "Medium",
        calculation: "Average customer satisfaction rating",
        linkedIndicators: ["Follow-up Consistency", "Product Knowledge Assessment"],
      },
      {
        name: "Win Rate",
        type: "lagging",
        description: "Percentage of qualified opportunities that result in closed deals",
        target: "≥ 25%",
        frequency: "Monthly",
        category: "Conversion",
        importance: "High",
        calculation: "(Closed Won Deals / Total Qualified Opportunities) × 100",
        linkedIndicators: ["Product Knowledge Assessment", "CRM Data Quality"],
      },
    ],
  },
  "Marketing Manager": {
    department: "Marketing",
    description: "Develops and executes marketing strategies to drive brand awareness and lead generation",
    kpis: [
      {
        name: "Campaign Planning Completeness",
        type: "leading",
        description: "Percentage of campaigns with complete strategic planning documentation",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Planning",
        importance: "High",
        calculation: "(Campaigns with Complete Plans / Total Campaigns) × 100",
        linkedIndicators: ["Campaign ROI", "Lead Quality Score"],
      },
      {
        name: "Content Production Rate",
        type: "leading",
        description: "Number of marketing assets created per month",
        target: "≥ 20 assets/month",
        frequency: "Weekly",
        category: "Content",
        importance: "Medium",
        calculation: "Count of marketing assets produced",
        linkedIndicators: ["Brand Awareness Score", "Engagement Rate"],
      },
      {
        name: "Market Research Activities",
        type: "leading",
        description: "Regular competitive analysis and market trend research",
        target: "≥ 4 reports/month",
        frequency: "Weekly",
        category: "Research",
        importance: "Medium",
        calculation: "Count of market research reports and analyses",
        linkedIndicators: ["Market Share Growth", "Campaign Effectiveness"],
      },
      {
        name: "Cross-team Collaboration Score",
        type: "leading",
        description: "Effectiveness of collaboration with Sales, Product, and other teams",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Collaboration",
        importance: "High",
        calculation: "Average collaboration effectiveness score from team feedback",
        linkedIndicators: ["Lead Conversion Rate", "Sales-Marketing Alignment"],
      },
      {
        name: "Marketing Automation Setup",
        type: "leading",
        description: "Percentage of campaigns using marketing automation",
        target: "≥ 80%",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "(Automated Campaigns / Total Campaigns) × 100",
        linkedIndicators: ["Lead Nurturing Score", "Campaign Efficiency"],
      },
      {
        name: "Campaign ROI",
        type: "lagging",
        description: "Return on investment for marketing campaigns",
        target: "≥ 300%",
        frequency: "Monthly",
        category: "Financial Impact",
        importance: "High",
        calculation: "(Campaign Revenue - Campaign Cost) / Campaign Cost × 100",
        linkedIndicators: ["Campaign Planning Completeness", "Market Research Activities"],
      },
      {
        name: "Lead Quality Score",
        type: "lagging",
        description: "Percentage of marketing qualified leads that convert to sales qualified leads",
        target: "≥ 25%",
        frequency: "Monthly",
        category: "Lead Generation",
        importance: "High",
        calculation: "(SQL from Marketing / Total MQLs) × 100",
        linkedIndicators: ["Campaign Planning Completeness", "Cross-team Collaboration Score"],
      },
      {
        name: "Brand Awareness Score",
        type: "lagging",
        description: "Brand recognition and recall metrics from surveys",
        target: "≥ 60%",
        frequency: "Quarterly",
        category: "Brand Impact",
        importance: "Medium",
        calculation: "Percentage of target audience recognizing brand",
        linkedIndicators: ["Content Production Rate", "Market Research Activities"],
      },
      {
        name: "Engagement Rate",
        type: "lagging",
        description: "Average engagement across all marketing channels",
        target: "≥ 5%",
        frequency: "Monthly",
        category: "Audience Engagement",
        importance: "Medium",
        calculation: "Average engagement rate across all marketing channels",
        linkedIndicators: ["Content Production Rate", "Marketing Automation Setup"],
      },
      {
        name: "Customer Acquisition Cost (CAC)",
        type: "lagging",
        description: "Cost to acquire a new customer through marketing efforts",
        target: "≤ $500",
        frequency: "Monthly",
        category: "Cost Efficiency",
        importance: "High",
        calculation: "Total Marketing Spend / Number of New Customers Acquired",
        linkedIndicators: ["Campaign Planning Completeness", "Lead Quality Score"],
      },
    ],
  },

  // Finance & Operations
  "Financial Analyst": {
    department: "Finance",
    description: "Analyzes financial data and provides insights for business decision-making",
    kpis: [
      {
        name: "Report Accuracy Rate",
        type: "leading",
        description: "Percentage of financial reports delivered without errors",
        target: "≥ 98%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Error-free Reports / Total Reports) × 100",
        linkedIndicators: ["Stakeholder Satisfaction", "Decision Impact Score"],
      },
      {
        name: "Analysis Turnaround Time",
        type: "leading",
        description: "Average time to complete financial analysis requests",
        target: "≤ 3 business days",
        frequency: "Weekly",
        category: "Efficiency",
        importance: "High",
        calculation: "Average days from request to completion",
        linkedIndicators: ["Stakeholder Satisfaction", "Business Impact"],
      },
      {
        name: "Data Source Validation",
        type: "leading",
        description: "Percentage of data sources validated for accuracy",
        target: "≥ 100%",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "(Validated Sources / Total Sources Used) × 100",
        linkedIndicators: ["Report Accuracy Rate", "Analysis Reliability"],
      },
      {
        name: "Stakeholder Communication Frequency",
        type: "leading",
        description: "Regular communication with business stakeholders",
        target: "≥ 2 meetings/week",
        frequency: "Weekly",
        category: "Communication",
        importance: "Medium",
        calculation: "Count of stakeholder meetings per week",
        linkedIndicators: ["Decision Impact Score", "Business Alignment"],
      },
      {
        name: "Financial Model Updates",
        type: "leading",
        description: "Frequency of financial model maintenance and updates",
        target: "≥ Monthly",
        frequency: "Monthly",
        category: "Maintenance",
        importance: "Medium",
        calculation: "Count of model updates per month",
        linkedIndicators: ["Forecast Accuracy", "Model Reliability"],
      },
      {
        name: "Decision Impact Score",
        type: "lagging",
        description: "Measurable business value from financial analysis recommendations",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Business Value",
        importance: "High",
        calculation: "Stakeholder assessment of analysis value",
        linkedIndicators: ["Report Accuracy Rate", "Stakeholder Communication Frequency"],
      },
      {
        name: "Forecast Accuracy",
        type: "lagging",
        description: "Accuracy of financial forecasts compared to actual results",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Prediction Quality",
        importance: "High",
        calculation: "Percentage accuracy of forecasts vs. actuals",
        linkedIndicators: ["Data Source Validation", "Financial Model Updates"],
      },
      {
        name: "Stakeholder Satisfaction",
        type: "lagging",
        description: "Satisfaction score from internal customers",
        target: "≥ 4.5/5.0",
        frequency: "Quarterly",
        category: "Service Quality",
        importance: "Medium",
        calculation: "Average satisfaction rating from stakeholders",
        linkedIndicators: ["Report Accuracy Rate", "Analysis Turnaround Time"],
      },
      {
        name: "Cost Variance Analysis Accuracy",
        type: "lagging",
        description: "Accuracy of budget variance explanations and predictions",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Analysis Quality",
        importance: "Medium",
        calculation: "Percentage of accurate variance explanations",
        linkedIndicators: ["Data Source Validation", "Financial Model Updates"],
      },
      {
        name: "Process Improvement Contributions",
        type: "lagging",
        description: "Number of process improvements implemented",
        target: "≥ 2/quarter",
        frequency: "Quarterly",
        category: "Innovation",
        importance: "Medium",
        calculation: "Count of implemented process improvements",
        linkedIndicators: ["Analysis Turnaround Time", "Stakeholder Communication Frequency"],
      },
    ],
  },
  "Operations Manager": {
    department: "Operations",
    description: "Oversees daily operations and optimizes business processes",
    kpis: [
      {
        name: "Process Improvement Initiatives",
        type: "leading",
        description: "Number of process optimization projects initiated",
        target: "≥ 3/quarter",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Count of process improvement projects",
        linkedIndicators: ["Operational Efficiency", "Cost Reduction"],
      },
      {
        name: "Team Training Hours",
        type: "leading",
        description: "Hours of training provided to team members",
        target: "≥ 20 hours/month",
        frequency: "Monthly",
        category: "Development",
        importance: "Medium",
        calculation: "Total training hours provided",
        linkedIndicators: ["Team Productivity", "Employee Satisfaction"],
      },
      {
        name: "Quality Control Checks",
        type: "leading",
        description: "Number of quality control assessments performed",
        target: "≥ Weekly",
        frequency: "Weekly",
        category: "Quality",
        importance: "High",
        calculation: "Count of quality control checks",
        linkedIndicators: ["Quality Score", "Customer Satisfaction"],
      },
      {
        name: "Cross-departmental Collaboration",
        type: "leading",
        description: "Regular coordination meetings with other departments",
        target: "≥ 3 meetings/week",
        frequency: "Weekly",
        category: "Collaboration",
        importance: "Medium",
        calculation: "Count of cross-departmental meetings",
        linkedIndicators: ["Project Delivery Rate", "Organizational Alignment"],
      },
      {
        name: "Resource Utilization Planning",
        type: "leading",
        description: "Percentage of resources with optimized allocation plans",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Resource Management",
        importance: "High",
        calculation: "(Planned Resources / Total Resources) × 100",
        linkedIndicators: ["Operational Efficiency", "Cost Management"],
      },
      {
        name: "Operational Efficiency",
        type: "lagging",
        description: "Overall efficiency score of operational processes",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "Weighted average of process efficiency metrics",
        linkedIndicators: ["Process Improvement Initiatives", "Resource Utilization Planning"],
      },
      {
        name: "Cost Reduction Achievement",
        type: "lagging",
        description: "Percentage reduction in operational costs",
        target: "≥ 5% annually",
        frequency: "Quarterly",
        category: "Financial Impact",
        importance: "High",
        calculation: "((Previous Costs - Current Costs) / Previous Costs) × 100",
        linkedIndicators: ["Process Improvement Initiatives", "Resource Utilization Planning"],
      },
      {
        name: "Team Productivity Score",
        type: "lagging",
        description: "Measure of team output relative to input",
        target: "≥ 4.0/5.0",
        frequency: "Monthly",
        category: "Productivity",
        importance: "Medium",
        calculation: "Output metrics weighted by resource input",
        linkedIndicators: ["Team Training Hours", "Process Improvement Initiatives"],
      },
      {
        name: "Customer Satisfaction Score",
        type: "lagging",
        description: "Customer satisfaction with operational delivery",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Customer Success",
        importance: "High",
        calculation: "Average customer satisfaction rating",
        linkedIndicators: ["Quality Control Checks", "Operational Efficiency"],
      },
      {
        name: "SLA Compliance Rate",
        type: "lagging",
        description: "Percentage of service level agreements met",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Service Quality",
        importance: "High",
        calculation: "(Met SLAs / Total SLAs) × 100",
        linkedIndicators: ["Quality Control Checks", "Cross-departmental Collaboration"],
      },
    ],
  },

  // Human Resources
  "HR Manager": {
    department: "Human Resources",
    description: "Manages human resources strategy, policies, and employee relations",
    kpis: [
      {
        name: "Employee Engagement Activities",
        type: "leading",
        description: "Number of engagement initiatives and programs implemented",
        target: "≥ 4/month",
        frequency: "Monthly",
        category: "Engagement",
        importance: "High",
        calculation: "Count of engagement activities",
        linkedIndicators: ["Employee Satisfaction", "Retention Rate"],
      },
      {
        name: "Training Program Delivery",
        type: "leading",
        description: "Number of training programs delivered to employees",
        target: "≥ 6/quarter",
        frequency: "Monthly",
        category: "Development",
        importance: "High",
        calculation: "Count of training programs delivered",
        linkedIndicators: ["Employee Skill Development", "Performance Improvement"],
      },
      {
        name: "Policy Review Frequency",
        type: "leading",
        description: "Regular review and update of HR policies",
        target: "≥ Quarterly",
        frequency: "Quarterly",
        category: "Compliance",
        importance: "Medium",
        calculation: "Count of policy reviews per quarter",
        linkedIndicators: ["Compliance Score", "Employee Satisfaction"],
      },
      {
        name: "Manager Coaching Sessions",
        type: "leading",
        description: "Number of coaching sessions provided to managers",
        target: "≥ 8/month",
        frequency: "Monthly",
        category: "Leadership Development",
        importance: "High",
        calculation: "Count of manager coaching sessions",
        linkedIndicators: ["Management Effectiveness", "Team Performance"],
      },
      {
        name: "Diversity Initiative Implementation",
        type: "leading",
        description: "Number of diversity and inclusion initiatives launched",
        target: "≥ 2/quarter",
        frequency: "Quarterly",
        category: "Diversity & Inclusion",
        importance: "Medium",
        calculation: "Count of D&I initiatives implemented",
        linkedIndicators: ["Diversity Metrics", "Inclusive Culture Score"],
      },
      {
        name: "Employee Retention Rate",
        type: "lagging",
        description: "Percentage of employees retained over a 12-month period",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Retention",
        importance: "High",
        calculation: "((Employees at End - New Hires) / Employees at Start) × 100",
        linkedIndicators: ["Employee Engagement Activities", "Training Program Delivery"],
      },
      {
        name: "Employee Satisfaction Score",
        type: "lagging",
        description: "Overall employee satisfaction from surveys",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Satisfaction",
        importance: "High",
        calculation: "Average employee satisfaction survey score",
        linkedIndicators: ["Employee Engagement Activities", "Policy Review Frequency"],
      },
      {
        name: "Time to Fill Positions",
        type: "lagging",
        description: "Average days to fill open positions",
        target: "≤ 30 days",
        frequency: "Monthly",
        category: "Recruitment Efficiency",
        importance: "Medium",
        calculation: "Average days from job posting to offer acceptance",
        linkedIndicators: ["Training Program Delivery", "Manager Coaching Sessions"],
      },
      {
        name: "Performance Review Completion Rate",
        type: "lagging",
        description: "Percentage of performance reviews completed on time",
        target: "≥ 95%",
        frequency: "Quarterly",
        category: "Performance Management",
        importance: "Medium",
        calculation: "(Completed Reviews / Total Due Reviews) × 100",
        linkedIndicators: ["Manager Coaching Sessions", "Policy Review Frequency"],
      },
      {
        name: "Workplace Safety Incident Rate",
        type: "lagging",
        description: "Number of workplace safety incidents per month",
        target: "≤ 1/month",
        frequency: "Monthly",
        category: "Safety",
        importance: "High",
        calculation: "Count of safety incidents per month",
        linkedIndicators: ["Training Program Delivery", "Policy Review Frequency"],
      },
    ],
  },
  Recruiter: {
    department: "Human Resources",
    description: "Sources, screens, and hires qualified candidates for open positions",
    kpis: [
      {
        name: "Candidate Sourcing Rate",
        type: "leading",
        description: "Number of qualified candidates sourced per week",
        target: "≥ 15/week",
        frequency: "Weekly",
        category: "Sourcing",
        importance: "High",
        calculation: "Count of qualified candidates sourced",
        linkedIndicators: ["Time to Fill", "Hire Quality Score"],
      },
      {
        name: "Interview Scheduling Efficiency",
        type: "leading",
        description: "Percentage of interviews scheduled within 48 hours",
        target: "≥ 90%",
        frequency: "Weekly",
        category: "Process Efficiency",
        importance: "High",
        calculation: "(Interviews Scheduled ≤48hrs / Total Interviews) × 100",
        linkedIndicators: ["Candidate Experience Score", "Time to Fill"],
      },
      {
        name: "Candidate Pipeline Health",
        type: "leading",
        description: "Number of active candidates per open position",
        target: "≥ 5 candidates/position",
        frequency: "Weekly",
        category: "Pipeline Management",
        importance: "High",
        calculation: "Total Active Candidates / Open Positions",
        linkedIndicators: ["Time to Fill", "Hire Success Rate"],
      },
      {
        name: "Diversity Sourcing Rate",
        type: "leading",
        description: "Percentage of diverse candidates in sourcing pipeline",
        target: "≥ 40%",
        frequency: "Monthly",
        category: "Diversity",
        importance: "Medium",
        calculation: "(Diverse Candidates / Total Candidates) × 100",
        linkedIndicators: ["Diversity Hire Rate", "Inclusive Hiring Score"],
      },
      {
        name: "Candidate Communication Response Rate",
        type: "leading",
        description: "Percentage of candidates responding to initial outreach",
        target: "≥ 25%",
        frequency: "Weekly",
        category: "Communication",
        importance: "Medium",
        calculation: "(Candidate Responses / Total Outreach) × 100",
        linkedIndicators: ["Candidate Experience Score", "Sourcing Efficiency"],
      },
      {
        name: "Time to Fill",
        type: "lagging",
        description: "Average days from job posting to offer acceptance",
        target: "≤ 30 days",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "High",
        calculation: "Average days from posting to hire",
        linkedIndicators: ["Candidate Sourcing Rate", "Interview Scheduling Efficiency"],
      },
      {
        name: "Hire Quality Score",
        type: "lagging",
        description: "Performance rating of new hires after 90 days",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Quality",
        importance: "High",
        calculation: "Average 90-day performance score of new hires",
        linkedIndicators: ["Candidate Sourcing Rate", "Candidate Pipeline Health"],
      },
      {
        name: "Offer Acceptance Rate",
        type: "lagging",
        description: "Percentage of job offers accepted by candidates",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Conversion",
        importance: "Medium",
        calculation: "(Accepted Offers / Total Offers) × 100",
        linkedIndicators: ["Interview Scheduling Efficiency", "Candidate Communication Response Rate"],
      },
      {
        name: "Candidate Experience Score",
        type: "lagging",
        description: "Candidate satisfaction with recruitment process",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Experience",
        importance: "Medium",
        calculation: "Average candidate experience survey score",
        linkedIndicators: ["Interview Scheduling Efficiency", "Candidate Communication Response Rate"],
      },
      {
        name: "Cost per Hire",
        type: "lagging",
        description: "Total recruitment cost divided by number of hires",
        target: "≤ $3,000",
        frequency: "Monthly",
        category: "Cost Efficiency",
        importance: "Medium",
        calculation: "Total Recruitment Costs / Number of Hires",
        linkedIndicators: ["Candidate Sourcing Rate", "Time to Fill"],
      },
    ],
  },

  // Customer Success
  "Customer Success Manager": {
    department: "Customer Success",
    description: "Ensures customer satisfaction, retention, and growth",
    kpis: [
      {
        name: "Customer Health Monitoring",
        type: "leading",
        description: "Frequency of customer health assessments and check-ins",
        target: "≥ 2/month per customer",
        frequency: "Weekly",
        category: "Proactive Support",
        importance: "High",
        calculation: "Count of customer health assessments",
        linkedIndicators: ["Customer Satisfaction", "Churn Rate"],
      },
      {
        name: "Onboarding Completion Rate",
        type: "leading",
        description: "Percentage of new customers completing onboarding process",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Onboarding",
        importance: "High",
        calculation: "(Completed Onboardings / Total New Customers) × 100",
        linkedIndicators: ["Time to Value", "Customer Satisfaction"],
      },
      {
        name: "Proactive Outreach Volume",
        type: "leading",
        description: "Number of proactive customer communications per week",
        target: "≥ 20/week",
        frequency: "Weekly",
        category: "Communication",
        importance: "High",
        calculation: "Count of proactive customer contacts",
        linkedIndicators: ["Customer Engagement Score", "Upsell Success Rate"],
      },
      {
        name: "Training Session Delivery",
        type: "leading",
        description: "Number of customer training sessions conducted",
        target: "≥ 8/month",
        frequency: "Monthly",
        category: "Education",
        importance: "Medium",
        calculation: "Count of customer training sessions",
        linkedIndicators: ["Product Adoption Rate", "Customer Satisfaction"],
      },
      {
        name: "Issue Resolution Response Time",
        type: "leading",
        description: "Average time to respond to customer issues",
        target: "≤ 4 hours",
        frequency: "Daily",
        category: "Support",
        importance: "High",
        calculation: "Average hours from issue report to first response",
        linkedIndicators: ["Customer Satisfaction", "Support Ticket Resolution"],
      },
      {
        name: "Customer Satisfaction Score",
        type: "lagging",
        description: "Average customer satisfaction rating",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Satisfaction",
        importance: "High",
        calculation: "Average customer satisfaction survey score",
        linkedIndicators: ["Customer Health Monitoring", "Issue Resolution Response Time"],
      },
      {
        name: "Customer Retention Rate",
        type: "lagging",
        description: "Percentage of customers retained over 12 months",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Retention",
        importance: "High",
        calculation: "((Customers at End - New Customers) / Customers at Start) × 100",
        linkedIndicators: ["Customer Health Monitoring", "Proactive Outreach Volume"],
      },
      {
        name: "Net Revenue Retention",
        type: "lagging",
        description: "Revenue retention including expansion from existing customers",
        target: "≥ 110%",
        frequency: "Monthly",
        category: "Revenue Growth",
        importance: "High",
        calculation: "(Starting MRR + Expansion - Churn) / Starting MRR × 100",
        linkedIndicators: ["Proactive Outreach Volume", "Training Session Delivery"],
      },
      {
        name: "Time to Value",
        type: "lagging",
        description: "Average time for customers to achieve first value",
        target: "≤ 30 days",
        frequency: "Monthly",
        category: "Onboarding Success",
        importance: "Medium",
        calculation: "Average days from signup to first value achievement",
        linkedIndicators: ["Onboarding Completion Rate", "Training Session Delivery"],
      },
      {
        name: "Product Adoption Rate",
        type: "lagging",
        description: "Percentage of customers actively using key product features",
        target: "≥ 80%",
        frequency: "Monthly",
        category: "Product Usage",
        importance: "Medium",
        calculation: "(Active Feature Users / Total Customers) × 100",
        linkedIndicators: ["Training Session Delivery", "Proactive Outreach Volume"],
      },
    ],
  },

  // Executive Roles
  "Chief Executive Officer": {
    department: "Executive",
    description: "Provides overall leadership and strategic direction for the organization",
    kpis: [
      {
        name: "Strategic Initiative Progress",
        type: "leading",
        description: "Percentage completion of key strategic initiatives",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Strategy",
        importance: "High",
        calculation: "(Completed Milestones / Total Milestones) × 100",
        linkedIndicators: ["Revenue Growth", "Market Share"],
      },
      {
        name: "Board Communication Frequency",
        type: "leading",
        description: "Regular communication and reporting to board of directors",
        target: "≥ Monthly",
        frequency: "Monthly",
        category: "Governance",
        importance: "High",
        calculation: "Count of board communications per month",
        linkedIndicators: ["Stakeholder Confidence", "Governance Score"],
      },
      {
        name: "Leadership Team Development",
        type: "leading",
        description: "Hours spent on leadership team coaching and development",
        target: "≥ 10 hours/month",
        frequency: "Monthly",
        category: "Leadership",
        importance: "High",
        calculation: "Hours spent on leadership development",
        linkedIndicators: ["Team Performance", "Organizational Capability"],
      },
      {
        name: "Market Expansion Activities",
        type: "leading",
        description: "Number of new market or product expansion initiatives",
        target: "≥ 2/quarter",
        frequency: "Quarterly",
        category: "Growth",
        importance: "Medium",
        calculation: "Count of expansion initiatives",
        linkedIndicators: ["Revenue Growth", "Market Share"],
      },
      {
        name: "Stakeholder Engagement Score",
        type: "leading",
        description: "Quality of engagement with key stakeholders",
        target: "≥ 4.5/5.0",
        frequency: "Quarterly",
        category: "Stakeholder Relations",
        importance: "High",
        calculation: "Average stakeholder engagement rating",
        linkedIndicators: ["Stakeholder Confidence", "Partnership Success"],
      },
      {
        name: "Revenue Growth",
        type: "lagging",
        description: "Year-over-year revenue growth percentage",
        target: "≥ 15%",
        frequency: "Quarterly",
        category: "Financial Performance",
        importance: "High",
        calculation: "((Current Revenue - Previous Revenue) / Previous Revenue) × 100",
        linkedIndicators: ["Strategic Initiative Progress", "Market Expansion Activities"],
      },
      {
        name: "Market Share Growth",
        type: "lagging",
        description: "Increase in market share within target markets",
        target: "≥ 5% annually",
        frequency: "Quarterly",
        category: "Market Position",
        importance: "High",
        calculation: "((Current Market Share - Previous Market Share) / Previous Market Share) × 100",
        linkedIndicators: ["Strategic Initiative Progress", "Market Expansion Activities"],
      },
      {
        name: "Employee Engagement Score",
        type: "lagging",
        description: "Overall employee engagement across the organization",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Organizational Health",
        importance: "Medium",
        calculation: "Average employee engagement survey score",
        linkedIndicators: ["Leadership Team Development", "Stakeholder Engagement Score"],
      },
      {
        name: "Profitability Margin",
        type: "lagging",
        description: "Net profit margin percentage",
        target: "≥ 20%",
        frequency: "Quarterly",
        category: "Financial Performance",
        importance: "High",
        calculation: "(Net Profit / Total Revenue) × 100",
        linkedIndicators: ["Strategic Initiative Progress", "Market Expansion Activities"],
      },
      {
        name: "Innovation Index",
        type: "lagging",
        description: "Number of new products or services launched",
        target: "≥ 2/year",
        frequency: "Quarterly",
        category: "Innovation",
        importance: "Medium",
        calculation: "Count of new product/service launches",
        linkedIndicators: ["Leadership Team Development", "Market Expansion Activities"],
      },
    ],
  },
  "Chief Technology Officer": {
    department: "Executive",
    description: "Leads technology strategy and innovation initiatives",
    kpis: [
      {
        name: "Technology Innovation Index",
        type: "leading",
        description: "Number of new technologies evaluated and adopted",
        target: "≥ 3/quarter",
        frequency: "Monthly",
        category: "Innovation",
        importance: "High",
        calculation: "Count of technology innovations implemented",
        linkedIndicators: ["System Performance", "Development Velocity"],
      },
      {
        name: "Technical Debt Management",
        type: "leading",
        description: "Percentage of technical debt addressed per quarter",
        target: "≥ 20%",
        frequency: "Monthly",
        category: "Technical Health",
        importance: "High",
        calculation: "(Technical Debt Resolved / Total Technical Debt) × 100",
        linkedIndicators: ["System Performance", "Development Velocity"],
      },
      {
        name: "Team Skill Development Investment",
        type: "leading",
        description: "Hours invested in team technical skill development",
        target: "≥ 40 hours/month",
        frequency: "Monthly",
        category: "Team Development",
        importance: "High",
        calculation: "Total team training hours per month",
        linkedIndicators: ["Team Performance", "Innovation Capability"],
      },
      {
        name: "Architecture Review Frequency",
        type: "leading",
        description: "Regular review of system architecture and scalability",
        target: "≥ Monthly",
        frequency: "Monthly",
        category: "Architecture",
        importance: "Medium",
        calculation: "Count of architecture reviews per month",
        linkedIndicators: ["System Scalability", "Performance Optimization"],
      },
      {
        name: "Security Assessment Coverage",
        type: "leading",
        description: "Percentage of systems with regular security assessments",
        target: "≥ 100%",
        frequency: "Monthly",
        category: "Security",
        importance: "High",
        calculation: "(Assessed Systems / Total Systems) × 100",
        linkedIndicators: ["Security Incident Rate", "Compliance Score"],
      },
      {
        name: "System Performance Score",
        type: "lagging",
        description: "Overall technology infrastructure performance rating",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Performance",
        importance: "High",
        calculation: "Weighted average of system performance metrics",
        linkedIndicators: ["Technology Innovation Index", "Technical Debt Management"],
      },
      {
        name: "Development Velocity",
        type: "lagging",
        description: "Rate of feature delivery across development teams",
        target: "≥ 20% improvement",
        frequency: "Monthly",
        category: "Productivity",
        importance: "High",
        calculation: "Story points delivered per sprint across all teams",
        linkedIndicators: ["Technology Innovation Index", "Team Skill Development Investment"],
      },
      {
        name: "System Uptime",
        type: "lagging",
        description: "Overall system availability percentage",
        target: "≥ 99.9%",
        frequency: "Monthly",
        category: "Reliability",
        importance: "High",
        calculation: "(Total Uptime / Total Time) × 100",
        linkedIndicators: ["Technical Debt Management", "Architecture Review Frequency"],
      },
      {
        name: "Security Incident Rate",
        type: "lagging",
        description: "Number of security incidents per quarter",
        target: "≤ 2/quarter",
        frequency: "Monthly",
        category: "Security",
        importance: "High",
        calculation: "Count of security incidents per quarter",
        linkedIndicators: ["Security Assessment Coverage", "Technical Debt Management"],
      },
      {
        name: "Technology ROI",
        type: "lagging",
        description: "Return on investment for technology initiatives",
        target: "≥ 200%",
        frequency: "Quarterly",
        category: "Financial Impact",
        importance: "Medium",
        calculation: "(Technology Benefits - Technology Costs) / Technology Costs × 100",
        linkedIndicators: ["Technology Innovation Index", "System Performance Score"],
      },
    ],
  },

  // Specialized Roles
  "Data Analyst": {
    department: "Analytics",
    description: "Analyzes data to provide insights and support business decision-making",
    kpis: [
      {
        name: "Data Quality Checks",
        type: "leading",
        description: "Regular validation and quality assessment of data sources",
        target: "Daily checks",
        frequency: "Daily",
        category: "Quality",
        importance: "High",
        calculation: "Count of data quality validations performed",
        linkedIndicators: ["Analysis Accuracy Rate", "Data Reliability Score"],
      },
      {
        name: "Stakeholder Consultation Hours",
        type: "leading",
        description: "Time spent understanding business requirements and context",
        target: "≥ 10 hours/week",
        frequency: "Weekly",
        category: "Collaboration",
        importance: "High",
        calculation: "Hours spent in stakeholder meetings and consultations",
        linkedIndicators: ["Business Impact Score", "Stakeholder Satisfaction"],
      },
      {
        name: "Analysis Documentation Rate",
        type: "leading",
        description: "Percentage of analyses that include comprehensive documentation",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Documentation",
        importance: "Medium",
        calculation: "(Documented Analyses / Total Analyses) × 100",
        linkedIndicators: ["Knowledge Transfer Score", "Analysis Reproducibility"],
      },
      {
        name: "Tool Proficiency Development",
        type: "leading",
        description: "Hours spent learning new analytical tools and techniques",
        target: "≥ 8 hours/month",
        frequency: "Monthly",
        category: "Development",
        importance: "Medium",
        calculation: "Hours spent on tool training and skill development",
        linkedIndicators: ["Technical Skill Score", "Analysis Efficiency"],
      },
      {
        name: "Dashboard Maintenance Frequency",
        type: "leading",
        description: "Regular updates and maintenance of analytical dashboards",
        target: "≥ Weekly",
        frequency: "Weekly",
        category: "Maintenance",
        importance: "Medium",
        calculation: "Count of dashboard updates per week",
        linkedIndicators: ["Dashboard Accuracy", "User Adoption Rate"],
      },
      {
        name: "Analysis Accuracy Rate",
        type: "lagging",
        description: "Percentage of analyses that are validated and error-free",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Quality",
        importance: "High",
        calculation: "(Accurate Analyses / Total Analyses) × 100",
        linkedIndicators: ["Data Quality Checks", "Analysis Documentation Rate"],
      },
      {
        name: "Business Impact Score",
        type: "lagging",
        description: "Measurable business value generated from analytical insights",
        target: "≥ 4.0/5.0",
        frequency: "Quarterly",
        category: "Business Value",
        importance: "High",
        calculation: "Stakeholder assessment of business value from analyses",
        linkedIndicators: ["Stakeholder Consultation Hours", "Tool Proficiency Development"],
      },
      {
        name: "Analysis Turnaround Time",
        type: "lagging",
        description: "Average time from request to delivery of analysis",
        target: "≤ 5 business days",
        frequency: "Monthly",
        category: "Efficiency",
        importance: "Medium",
        calculation: "Average days from analysis request to completion",
        linkedIndicators: ["Tool Proficiency Development", "Analysis Documentation Rate"],
      },
      {
        name: "Data Reliability Score",
        type: "lagging",
        description: "Consistency and reliability of data sources used in analyses",
        target: "≥ 98%",
        frequency: "Monthly",
        category: "Data Quality",
        importance: "High",
        calculation: "Percentage of data sources meeting quality standards",
        linkedIndicators: ["Data Quality Checks", "Stakeholder Consultation Hours"],
      },
      {
        name: "Dashboard User Adoption Rate",
        type: "lagging",
        description: "Percentage of target users actively using analytical dashboards",
        target: "≥ 80%",
        frequency: "Monthly",
        category: "User Engagement",
        importance: "Medium",
        calculation: "(Active Dashboard Users / Target Users) × 100",
        linkedIndicators: ["Dashboard Maintenance Frequency", "Stakeholder Consultation Hours"],
      },
    ],
  },
  "Project Manager": {
    department: "Operations",
    description: "Plans, executes, and delivers projects on time and within budget",
    kpis: [
      {
        name: "Risk Assessment Frequency",
        type: "leading",
        description: "Regular project risk assessments and mitigation planning",
        target: "≥ 2/month",
        frequency: "Weekly",
        category: "Risk Management",
        importance: "High",
        calculation: "Count of risk assessments performed",
        linkedIndicators: ["Project Success Rate", "Budget Variance"],
      },
      {
        name: "Stakeholder Communication Frequency",
        type: "leading",
        description: "Regular communication with project stakeholders",
        target: "≥ 3/week",
        frequency: "Weekly",
        category: "Communication",
        importance: "High",
        calculation: "Count of stakeholder communications per week",
        linkedIndicators: ["Stakeholder Satisfaction", "Project Delivery Rate"],
      },
      {
        name: "Project Planning Completeness",
        type: "leading",
        description: "Percentage of projects with complete planning documentation",
        target: "≥ 95%",
        frequency: "Monthly",
        category: "Planning",
        importance: "High",
        calculation: "(Projects with Complete Plans / Total Projects) × 100",
        linkedIndicators: ["Project Success Rate", "Timeline Adherence"],
      },
      {
        name: "Team Capacity Planning",
        type: "leading",
        description: "Accuracy of team capacity allocation and planning",
        target: "≥ 90%",
        frequency: "Weekly",
        category: "Resource Management",
        importance: "Medium",
        calculation: "(Accurate Capacity Allocations / Total Allocations) × 100",
        linkedIndicators: ["Team Productivity", "Project Delivery Rate"],
      },
      {
        name: "Change Request Processing Time",
        type: "leading",
        description: "Average time to process and approve change requests",
        target: "≤ 3 business days",
        frequency: "Weekly",
        category: "Change Management",
        importance: "Medium",
        calculation: "Average days from change request to approval",
        linkedIndicators: ["Project Flexibility", "Stakeholder Satisfaction"],
      },
      {
        name: "Project Success Rate",
        type: "lagging",
        description: "Percentage of projects delivered on time and within budget",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Delivery",
        importance: "High",
        calculation: "(Successful Projects / Total Projects) × 100",
        linkedIndicators: ["Risk Assessment Frequency", "Project Planning Completeness"],
      },
      {
        name: "Budget Variance",
        type: "lagging",
        description: "Percentage variance from planned project budgets",
        target: "≤ 10%",
        frequency: "Monthly",
        category: "Financial Management",
        importance: "High",
        calculation: "((Actual Cost - Planned Cost) / Planned Cost) × 100",
        linkedIndicators: ["Risk Assessment Frequency", "Team Capacity Planning"],
      },
      {
        name: "Stakeholder Satisfaction Score",
        type: "lagging",
        description: "Satisfaction rating from project stakeholders",
        target: "≥ 4.5/5.0",
        frequency: "Monthly",
        category: "Stakeholder Success",
        importance: "Medium",
        calculation: "Average stakeholder satisfaction survey score",
        linkedIndicators: ["Stakeholder Communication Frequency", "Change Request Processing Time"],
      },
      {
        name: "Team Productivity Score",
        type: "lagging",
        description: "Measure of team output relative to capacity",
        target: "≥ 85%",
        frequency: "Monthly",
        category: "Team Performance",
        importance: "Medium",
        calculation: "(Actual Output / Planned Output) × 100",
        linkedIndicators: ["Team Capacity Planning", "Project Planning Completeness"],
      },
      {
        name: "Project Timeline Adherence",
        type: "lagging",
        description: "Percentage of project milestones delivered on schedule",
        target: "≥ 90%",
        frequency: "Monthly",
        category: "Schedule Management",
        importance: "High",
        calculation: "(On-time Milestones / Total Milestones) × 100",
        linkedIndicators: ["Project Planning Completeness", "Risk Assessment Frequency"],
      },
    ],
  },
}

// HR Theory References
const hrTheories = [
  {
    name: "Job Demands-Resources Model",
    author: "Bakker & Demerouti",
    year: "2007",
    description:
      "Framework for understanding employee well-being and performance based on the balance between job demands and available resources.",
    application: "Use to assess workload sustainability and identify burnout risk factors.",
    keyPrinciples: [
      "High demands + Low resources = Burnout",
      "High demands + High resources = Engagement",
      "Resources can buffer the impact of demands",
    ],
    relevantPositions: ["All positions", "Particularly high-stress roles"],
    link: "https://doi.org/10.1146/annurev.psych.58.110405.085530",
  },
  {
    name: "Goal Setting Theory",
    author: "Locke & Latham",
    year: "1990",
    description:
      "Theory explaining how specific and challenging goals lead to higher performance when combined with feedback.",
    application: "Design effective performance goals and KPI targets for maximum motivation.",
    keyPrinciples: [
      "Specific goals are more effective than vague goals",
      "Challenging goals lead to higher performance",
      "Feedback is essential for goal effectiveness",
      "Goal commitment affects performance",
    ],
    relevantPositions: ["All positions", "Sales roles", "Project-based roles"],
    link: "https://doi.org/10.1037/0003-066X.45.2.125",
  },
  {
    name: "Self-Determination Theory",
    author: "Deci & Ryan",
    year: "1985",
    description:
      "Theory of motivation focusing on autonomy, competence, and relatedness as drivers of intrinsic motivation.",
    application: "Create work environments that foster intrinsic motivation and employee engagement.",
    keyPrinciples: [
      "Autonomy: Need for self-direction",
      "Competence: Need to feel effective",
      "Relatedness: Need for connection with others",
      "Intrinsic motivation leads to better performance",
    ],
    relevantPositions: ["Creative roles", "Knowledge workers", "Management positions"],
    link: "https://doi.org/10.1037/0003-066X.55.1.68",
  },
  {
    name: "Job Characteristics Model",
    author: "Hackman & Oldham",
    year: "1976",
    description:
      "Model identifying five core job characteristics that influence motivation, satisfaction, and performance.",
    application: "Design jobs with optimal characteristics to enhance employee motivation and performance.",
    keyPrinciples: [
      "Skill variety increases engagement",
      "Task identity creates meaning",
      "Task significance enhances motivation",
      "Autonomy increases satisfaction",
      "Feedback improves performance",
    ],
    relevantPositions: ["All positions", "Particularly routine or specialized roles"],
    link: "https://doi.org/10.1016/0030-5073(76)90016-7",
  },
  {
    name: "Situational Leadership Theory",
    author: "Hersey & Blanchard",
    year: "1969",
    description:
      "Leadership model suggesting that effective leadership style should adapt to the development level of followers.",
    application: "Adapt management approach based on team member competence and commitment levels.",
    keyPrinciples: [
      "Directing: High directive, low supportive",
      "Coaching: High directive, high supportive",
      "Supporting: Low directive, high supportive",
      "Delegating: Low directive, low supportive",
    ],
    relevantPositions: ["Management roles", "Team lead positions", "Mentoring roles"],
    link: "https://doi.org/10.1177/105960117700200404",
  },
]

export default function HRKPIGuidePage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("Software Engineer")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("kpis")

  const positions = Object.keys(kpiData)
  const currentPositionData = kpiData[selectedPosition as keyof typeof kpiData]

  const filteredTheories = hrTheories.filter(
    (theory) =>
      theory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theory.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theory.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIndicatorIcon = (type: "leading" | "lagging") => {
    return type === "leading" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-blue-600" />
    )
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SharedHeader />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">HR References & KPI Guide</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive guide to HR theories, KPIs, and performance indicators for effective workforce management.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kpis">Position KPIs</TabsTrigger>
            <TabsTrigger value="theories">HR Theories</TabsTrigger>
            <TabsTrigger value="connections">KPI Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="kpis" className="space-y-6">
            {/* Position Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Position</CardTitle>
                <CardDescription>Choose a position to view its KPIs and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position} - {kpiData[position as keyof typeof kpiData].department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Position Overview */}
            {currentPositionData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {selectedPosition}
                  </CardTitle>
                  <CardDescription>
                    {currentPositionData.department} • {currentPositionData.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Unified KPI Display */}
            {currentPositionData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Key Performance Indicators
                  </CardTitle>
                  <CardDescription>Leading and lagging indicators for performance measurement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentPositionData.kpis.map((kpi, index) => (
                      <Card
                        key={index}
                        className={`border-l-4 ${kpi.type === "leading" ? "border-l-green-500" : "border-l-blue-500"}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {kpi.type === "leading" ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-blue-600" />
                              )}
                              <CardTitle className="text-lg">{kpi.name}</CardTitle>
                            </div>
                            <div className="flex gap-1">
                              <Badge variant={kpi.type === "leading" ? "default" : "secondary"} className="text-xs">
                                {kpi.type === "leading" ? "Leading" : "Lagging"}
                              </Badge>
                              <Badge className={getImportanceColor(kpi.importance)}>{kpi.importance}</Badge>
                            </div>
                          </div>
                          <CardDescription>{kpi.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Target:</span>
                              <div className="text-muted-foreground">{kpi.target}</div>
                            </div>
                            <div>
                              <span className="font-medium">Frequency:</span>
                              <div className="text-muted-foreground">{kpi.frequency}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-sm">Calculation:</span>
                            <div className="text-sm text-muted-foreground mt-1 font-mono bg-muted p-2 rounded">
                              {kpi.calculation}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-sm">
                              {kpi.type === "leading" ? "Influences:" : "Influenced by:"}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {kpi.linkedIndicators.map((linked, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {linked}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="theories" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>HR Theory Reference Library</CardTitle>
                <CardDescription>Evidence-based theories to guide HR decision-making</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search theories, authors, or concepts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Theory Cards */}
            <div className="grid gap-6">
              {filteredTheories.map((theory, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {theory.name}
                        </CardTitle>
                        <CardDescription>
                          {theory.author} ({theory.year})
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={theory.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Reference
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{theory.description}</p>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Practical Application:</h4>
                      <p className="text-sm text-muted-foreground">{theory.application}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Principles:</h4>
                      <ul className="space-y-1">
                        {theory.keyPrinciples.map((principle, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            {principle}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Most Relevant For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {theory.relevantPositions.map((position, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {position}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  KPI Connection Map
                </CardTitle>
                <CardDescription>
                  Visual representation of how leading indicators influence lagging indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-full mb-6">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {currentPositionData && (
                  <div className="space-y-6">
                    {currentPositionData.kpis
                      .filter((kpi) => kpi.type === "lagging")
                      .map((lagging, index) => (
                        <Card key={index} className="border-2">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              {lagging.name}
                            </CardTitle>
                            <CardDescription>{lagging.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Target:</span>
                                <Badge variant="outline">{lagging.target}</Badge>
                                <span className="font-medium">Frequency:</span>
                                <Badge variant="outline">{lagging.frequency}</Badge>
                              </div>

                              <div>
                                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  Influenced by Leading Indicators:
                                </h4>
                                <div className="grid gap-3">
                                  {lagging.linkedIndicators.map((leadingName, idx) => {
                                    const leadingIndicator = currentPositionData.kpis.find(
                                      (l) => l.name === leadingName,
                                    )
                                    return (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                                      >
                                        <div className="flex-1">
                                          <div className="font-medium text-sm">{leadingName}</div>
                                          {leadingIndicator && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                              {leadingIndicator.description}
                                            </div>
                                          )}
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                              <div className="pt-3 border-t">
                                <div className="text-xs text-muted-foreground">
                                  <strong>Connection Logic:</strong> Improvements in the leading indicators above should
                                  positively impact the {lagging.name} metric. Monitor leading indicators closely to
                                  predict and influence lagging indicator performance.
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-blue-600" />
                          KPI Management Best Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Monitor Leading First:</strong> Focus on leading indicators to predict and
                              influence future performance
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Balance the Mix:</strong> Use 70% leading and 30% lagging indicators for optimal
                              performance management
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Regular Review:</strong> Review KPI connections quarterly to ensure they remain
                              relevant and predictive
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>
                              <strong>Action-Oriented:</strong> Ensure each KPI has clear action plans for improvement
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
