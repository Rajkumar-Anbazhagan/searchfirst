import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { PermissionGuard, usePermissions } from "@/components/PermissionGuard";
import {
  BookOpen,
  Plus,
  Search,
  Users,
  Calendar,
  Star,
  TrendingUp,
  PlayCircle,
  FileText,
  MoreVertical,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Award,
  BarChart3,
  Filter,
  Upload,
  Download,
  Settings,
  Target,
  Trophy,
  Users2,
  BookOpenCheck,
  Zap,
  AlertTriangle,
  MessageSquare,
  Video,
  Globe,
  Bookmark,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  UserMinus,
  Mail,
  Bell,
  Camera,
  Mic,
  Screen,
  Shield,
  QrCode,
  FileCheck,
  Brain,
  Gamepad2,
  MessageCircle,
  ThumbsUp,
  Share2,
  Lightbulb,
  GraduationCap,
  PieChart,
  LineChart,
  Activity,
  Notification,
  Speaker,
  Smartphone,
  Wifi,
  Archive,
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  subcategory: string;
  credits: number;
  learningHours: number;
  practicalHours: number;
  department: string;
  faculty: string;
  students: number;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  type: "Mandatory" | "Elective";
  completion: number;
  rating: number;
  outcomes: string[];
  competencyScale: string;
  activities: string[];
  cohorts: string[];
  enrolled: number;
  maxCapacity: number;
  prerequisites: string[];
  badges: string[];
  certificates: string[];
  enrollmentMode: "manual" | "self" | "api" | "bulk";
  proctoring: boolean;
  adaptiveLearning: boolean;
  virtualClassroom: boolean;
  collaborationTools: string[];
  contentTypes: string[];
  assignments: number;
  assessments: number;
  discussions: number;
  lessonPlans: number;
  gamificationEnabled: boolean;
  certificatesGenerated: number;
  notifications: string[];
  integrations: string[];
}

interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  enrollmentDate: string;
  status: "pending" | "enrolled" | "completed" | "withdrawn";
  progress: number;
  lastActivity: string;
  grade: string;
  enrollmentType: "manual" | "self" | "api" | "bulk";
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  courses: string[];
  sequencing: "linear" | "adaptive" | "flexible";
  restrictions: string[];
  prerequisites: string[];
  estimatedDuration: number;
}

interface VirtualSession {
  id: string;
  courseId: string;
  title: string;
  platform: "zoom" | "teams" | "meet" | "webex";
  scheduledDate: string;
  duration: number;
  attendees: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  recordingAvailable: boolean;
}

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  submissions: number;
  plagiarismCheck: boolean;
  autoGrading: boolean;
  status: "active" | "closed" | "draft";
}

interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: "quiz" | "exam" | "survey" | "assignment";
  questions: number;
  duration: number;
  attempts: number;
  autoGrade: boolean;
  proctored: boolean;
  status: "active" | "closed" | "draft";
}

interface Certificate {
  id: string;
  courseId: string;
  studentId: string;
  template: string;
  issueDate: string;
  qrCode: string;
  verificationUrl: string;
  status: "issued" | "revoked" | "expired";
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: "email" | "sms" | "push" | "in-app";
  trigger: string;
  subject: string;
  content: string;
  active: boolean;
}

const initialCourses: Course[] = [
  {
    id: "C001",
    name: "Data Structures & Algorithms",
    code: "CS301",
    category: "Computer Science",
    subcategory: "Programming",
    credits: 4,
    learningHours: 60,
    practicalHours: 30,
    department: "Computer Science",
    faculty: "Dr. John Smith",
    students: 45,
    description:
      "Comprehensive course covering fundamental data structures and algorithmic concepts with hands-on programming assignments.",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    type: "Mandatory",
    completion: 75,
    rating: 4.8,
    outcomes: [
      "Algorithm Design",
      "Problem Solving",
      "Time Complexity Analysis",
      "Data Structure Implementation",
    ],
    competencyScale: "Advanced",
    activities: [
      "Lessons",
      "Assignments",
      "Assessments",
      "Discussion Forum",
      "Virtual Classroom",
      "Peer Review",
    ],
    cohorts: ["CS Batch 2024A", "CS Batch 2024B"],
    enrolled: 45,
    maxCapacity: 50,
    prerequisites: ["Programming Fundamentals", "Mathematics"],
    badges: ["Algorithm Master", "Problem Solver", "Code Optimizer"],
    certificates: [
      "Data Structures Completion",
      "Advanced Programming Certificate",
    ],
    enrollmentMode: "manual",
    proctoring: true,
    adaptiveLearning: true,
    virtualClassroom: true,
    collaborationTools: [
      "Discussion Forums",
      "Chat",
      "Peer Review",
      "Study Groups",
    ],
    contentTypes: [
      "Video Lectures",
      "Interactive Simulations",
      "Code Examples",
      "SCORM Packages",
    ],
    assignments: 8,
    assessments: 12,
    discussions: 15,
    lessonPlans: 24,
    gamificationEnabled: true,
    certificatesGenerated: 42,
    notifications: ["Email", "Push", "In-App"],
    integrations: ["GitHub", "LeetCode", "Moodle", "Canvas"],
  },
  {
    id: "C002",
    name: "Digital Marketing Strategy",
    code: "MKT201",
    category: "Business",
    subcategory: "Marketing",
    credits: 3,
    learningHours: 45,
    practicalHours: 15,
    department: "Marketing",
    faculty: "Prof. Sarah Wilson",
    students: 32,
    description:
      "Modern digital marketing strategies and tools for the digital age with real-world case studies.",
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2024-05-30",
    type: "Elective",
    completion: 60,
    rating: 4.6,
    outcomes: [
      "Digital Strategy",
      "Analytics",
      "Campaign Management",
      "ROI Analysis",
    ],
    competencyScale: "Intermediate",
    activities: [
      "Lessons",
      "Case Studies",
      "Virtual Classroom",
      "Assessments",
      "Group Projects",
    ],
    cohorts: ["Marketing Batch 2024"],
    enrolled: 32,
    maxCapacity: 40,
    prerequisites: ["Marketing Fundamentals"],
    badges: ["Digital Strategist", "Analytics Expert", "Campaign Manager"],
    certificates: ["Digital Marketing Certification"],
    enrollmentMode: "self",
    proctoring: false,
    adaptiveLearning: false,
    virtualClassroom: true,
    collaborationTools: ["Discussion Forums", "Chat", "Blogging"],
    contentTypes: ["Video Lectures", "Case Studies", "Interactive Tools"],
    assignments: 6,
    assessments: 8,
    discussions: 12,
    lessonPlans: 18,
    gamificationEnabled: true,
    certificatesGenerated: 28,
    notifications: ["Email", "In-App"],
    integrations: ["Google Analytics", "Facebook Ads", "LinkedIn Learning"],
  },
  {
    id: "C003",
    name: "Machine Learning Fundamentals",
    code: "CS401",
    category: "Computer Science",
    subcategory: "Artificial Intelligence",
    credits: 4,
    learningHours: 48,
    practicalHours: 32,
    department: "Computer Science",
    faculty: "Dr. Alice Kumar",
    students: 28,
    description:
      "Introduction to machine learning algorithms, models, and applications with Python programming.",
    status: "Active",
    startDate: "2024-01-20",
    endDate: "2024-05-20",
    type: "Elective",
    completion: 45,
    rating: 4.9,
    outcomes: [
      "ML Algorithm Understanding",
      "Model Development",
      "Data Analysis",
      "Python Programming",
    ],
    competencyScale: "Advanced",
    activities: [
      "Lessons",
      "Labs",
      "Projects",
      "Peer Review",
      "Research Papers",
    ],
    cohorts: ["AI Specialization 2024"],
    enrolled: 28,
    maxCapacity: 30,
    prerequisites: ["Statistics", "Programming", "Linear Algebra"],
    badges: ["ML Practitioner", "AI Developer", "Data Scientist"],
    certificates: ["Machine Learning Certificate", "AI Specialist Certificate"],
    enrollmentMode: "api",
    proctoring: true,
    adaptiveLearning: true,
    virtualClassroom: true,
    collaborationTools: [
      "Discussion Forums",
      "Chat",
      "Peer Review",
      "Collaborative Coding",
    ],
    contentTypes: [
      "Video Lectures",
      "Jupyter Notebooks",
      "Datasets",
      "Interactive Labs",
    ],
    assignments: 10,
    assessments: 15,
    discussions: 20,
    lessonPlans: 32,
    gamificationEnabled: true,
    certificatesGenerated: 25,
    notifications: ["Email", "SMS", "Push", "In-App"],
    integrations: ["Jupyter Hub", "Google Colab", "TensorFlow", "Kaggle"],
  },
];

const categories = [
  "Computer Science",
  "Business",
  "Engineering",
  "Mathematics",
  "Science",
  "Arts",
  "Medicine",
];
const subcategories = [
  "Programming",
  "Marketing",
  "Artificial Intelligence",
  "Data Science",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
];
const courseTypes = ["Mandatory", "Elective"];
const competencyScales = ["Beginner", "Intermediate", "Advanced", "Expert"];
const activityTypes = [
  "Lessons",
  "Assignments",
  "Assessments",
  "Discussion Forum",
  "Virtual Classroom",
  "Chat",
  "Feedback",
  "Attendance",
  "Documents",
  "Videos",
  "Peer Review",
  "Group Projects",
  "Case Studies",
  "Simulations",
];
const enrollmentModes = ["manual", "self", "api", "bulk"];
const collaborationTools = [
  "Discussion Forums",
  "Chat",
  "Peer Review",
  "Study Groups",
  "Blogging",
  "Collaborative Coding",
  "Video Calls",
  "Screen Sharing",
];
const contentTypes = [
  "Video Lectures",
  "Interactive Simulations",
  "Code Examples",
  "SCORM Packages",
  "Case Studies",
  "Jupyter Notebooks",
  "Datasets",
  "Interactive Tools",
  "Research Papers",
];
const integrationOptions = [
  "GitHub",
  "Google Analytics",
  "Moodle",
  "Canvas",
  "Blackboard",
  "Zoom",
  "Teams",
  "Google Meet",
  "Slack",
  "Microsoft 365",
];
const notificationTypes = ["Email", "SMS", "Push", "In-App"];

export default function Courses() {
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    // Add mock enrollments for student demo
    if (user?.role === "student") {
      return [
        {
          id: "E001",
          courseId: "C001",
          studentId: user?.id || "student-1",
          studentName: user?.name || "Student",
          enrollmentDate: "2024-01-15",
          status: "enrolled",
          progress: 75,
          lastActivity: new Date().toISOString(),
          grade: "A-",
          enrollmentType: "self",
        },
        {
          id: "E002",
          courseId: "C002",
          studentId: user?.id || "student-1",
          studentName: user?.name || "Student",
          enrollmentDate: "2024-02-01",
          status: "enrolled",
          progress: 60,
          lastActivity: new Date().toISOString(),
          grade: "B+",
          enrollmentType: "self",
        },
      ];
    }
    return [];
  });
  const [virtualSessions, setVirtualSessions] = useState<VirtualSession[]>([
    {
      id: "VS001",
      courseId: "C001",
      title: "Data Structures - Live Coding Session",
      platform: "zoom",
      scheduledDate: "2024-02-15T10:00:00Z",
      duration: 90,
      attendees: 42,
      status: "completed",
      recordingAvailable: true,
    },
    {
      id: "VS002",
      courseId: "C002",
      title: "Digital Marketing Strategy Workshop",
      platform: "teams",
      scheduledDate: "2024-02-20T14:00:00Z",
      duration: 120,
      attendees: 28,
      status: "scheduled",
      recordingAvailable: false,
    },
    {
      id: "VS003",
      courseId: "C003",
      title: "Machine Learning Lab Session",
      platform: "meet",
      scheduledDate: "2024-02-18T16:00:00Z",
      duration: 180,
      attendees: 25,
      status: "ongoing",
      recordingAvailable: false,
    },
  ]);
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "A001",
      courseId: "C001",
      title: "Implement Binary Search Tree",
      description:
        "Create a complete BST implementation with insertion, deletion, and traversal methods",
      dueDate: "2024-02-25",
      maxPoints: 100,
      submissions: 38,
      plagiarismCheck: true,
      autoGrading: false,
      status: "active",
    },
    {
      id: "A002",
      courseId: "C002",
      title: "Digital Campaign Analysis",
      description:
        "Analyze a real digital marketing campaign and present findings",
      dueDate: "2024-02-28",
      maxPoints: 80,
      submissions: 25,
      plagiarismCheck: true,
      autoGrading: false,
      status: "active",
    },
    {
      id: "A003",
      courseId: "C003",
      title: "ML Model Training Project",
      description:
        "Train and evaluate a machine learning model on provided dataset",
      dueDate: "2024-03-05",
      maxPoints: 120,
      submissions: 15,
      plagiarismCheck: true,
      autoGrading: true,
      status: "active",
    },
    {
      id: "A004",
      courseId: "C001",
      title: "Algorithm Complexity Analysis",
      description:
        "Analyze time and space complexity of various sorting algorithms",
      dueDate: "2024-03-10",
      maxPoints: 90,
      submissions: 0,
      plagiarismCheck: true,
      autoGrading: false,
      status: "draft",
    },
  ]);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: "AS001",
      courseId: "C001",
      title: "Midterm Examination - Data Structures",
      type: "exam",
      questions: 50,
      duration: 120,
      attempts: 1,
      autoGrade: true,
      proctored: true,
      status: "active",
    },
    {
      id: "AS002",
      courseId: "C002",
      title: "Digital Marketing Quiz",
      type: "quiz",
      questions: 25,
      duration: 45,
      attempts: 2,
      autoGrade: true,
      proctored: false,
      status: "active",
    },
    {
      id: "AS003",
      courseId: "C003",
      title: "ML Concepts Assessment",
      type: "assignment",
      questions: 15,
      duration: 90,
      attempts: 1,
      autoGrade: false,
      proctored: true,
      status: "active",
    },
    {
      id: "AS004",
      courseId: "C001",
      title: "Weekly Progress Survey",
      type: "survey",
      questions: 10,
      duration: 15,
      attempts: 1,
      autoGrade: true,
      proctored: false,
      status: "active",
    },
    {
      id: "AS005",
      courseId: "C002",
      title: "Final Project Assessment",
      type: "exam",
      questions: 35,
      duration: 180,
      attempts: 1,
      autoGrade: false,
      proctored: true,
      status: "draft",
    },
  ]);
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    // Add mock certificates for student demo
    if (user?.role === "student") {
      return [
        {
          id: "CERT001",
          courseId: "C001",
          studentId: user?.id || "student-1",
          template: "completion",
          issueDate: "2024-01-20",
          qrCode: "QR12345",
          verificationUrl: "https://verify.lms.edu/cert/CERT001",
          status: "issued",
        },
      ];
    }
    return [];
  });
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: "LP001",
      name: "Computer Science Fundamentals",
      description: "Complete learning path for CS fundamentals",
      courses: ["C001", "C003"],
      sequencing: "linear",
      restrictions: ["Prerequisites must be completed"],
      prerequisites: ["Programming Fundamentals"],
      estimatedDuration: 16,
    },
    {
      id: "LP002",
      name: "Digital Marketing Specialization",
      description: "Comprehensive digital marketing track",
      courses: ["C002"],
      sequencing: "flexible",
      restrictions: [],
      prerequisites: ["Marketing Fundamentals"],
      estimatedDuration: 12,
    },
    {
      id: "LP003",
      name: "AI & Machine Learning Track",
      description: "Advanced AI and ML specialization path",
      courses: ["C001", "C003"],
      sequencing: "adaptive",
      restrictions: ["Math proficiency required"],
      prerequisites: ["Statistics", "Linear Algebra", "Programming"],
      estimatedDuration: 20,
    },
  ]);
  const [notificationTemplates, setNotificationTemplates] = useState<
    NotificationTemplate[]
  >([
    {
      id: "NT001",
      name: "Course Enrollment Confirmation",
      type: "email",
      trigger: "enrollment",
      subject: "Welcome to {course_name}",
      content:
        "You have been successfully enrolled in {course_name}. Start date: {start_date}",
      active: true,
    },
    {
      id: "NT002",
      name: "Assignment Due Reminder",
      type: "push",
      trigger: "assignment_due",
      subject: "Assignment Due Soon",
      content: 'Your assignment "{assignment_title}" is due on {due_date}',
      active: true,
    },
    {
      id: "NT003",
      name: "Grade Published",
      type: "in-app",
      trigger: "grade_published",
      subject: "New Grade Available",
      content: "Your grade for {assessment_title} has been published",
      active: true,
    },
    {
      id: "NT004",
      name: "Virtual Class Reminder",
      type: "sms",
      trigger: "virtual_class",
      subject: "Virtual Class Starting Soon",
      content: "Your virtual class for {course_name} starts in 15 minutes",
      active: true,
    },
    {
      id: "NT005",
      name: "Course Completion",
      type: "email",
      trigger: "course_completion",
      subject: "Congratulations! Course Completed",
      content:
        "You have successfully completed {course_name}. Your certificate is being processed.",
      active: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeView, setActiveView] = useState("courses");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] = useState(false);
  const [isBulkEnrollmentDialogOpen, setIsBulkEnrollmentDialogOpen] =
    useState(false);
  const [isVirtualClassroomDialogOpen, setIsVirtualClassroomDialogOpen] =
    useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isAssessmentDialogOpen, setIsAssessmentDialogOpen] = useState(false);
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const [isLearningPathDialogOpen, setIsLearningPathDialogOpen] =
    useState(false);
  const [isProctoringDialogOpen, setIsProctoringDialogOpen] = useState(false);
  const [isCreateLearningPathDialogOpen, setIsCreateLearningPathDialogOpen] =
    useState(false);
  const [isEditLearningPathDialogOpen, setIsEditLearningPathDialogOpen] =
    useState(false);
  const [isCreateNotificationDialogOpen, setIsCreateNotificationDialogOpen] =
    useState(false);
  const [isEditNotificationDialogOpen, setIsEditNotificationDialogOpen] =
    useState(false);
  const [
    isCreateVirtualSessionDialogOpen,
    setIsCreateVirtualSessionDialogOpen,
  ] = useState(false);
  const [isEditVirtualSessionDialogOpen, setIsEditVirtualSessionDialogOpen] =
    useState(false);
  const [isCreateAssignmentDialogOpen, setIsCreateAssignmentDialogOpen] =
    useState(false);
  const [isEditAssignmentDialogOpen, setIsEditAssignmentDialogOpen] =
    useState(false);
  const [isCreateAssessmentDialogOpen, setIsCreateAssessmentDialogOpen] =
    useState(false);
  const [isEditAssessmentDialogOpen, setIsEditAssessmentDialogOpen] =
    useState(false);
  const [isCreateCertificateDialogOpen, setIsCreateCertificateDialogOpen] =
    useState(false);
  const [isEditCertificateDialogOpen, setIsEditCertificateDialogOpen] =
    useState(false);

  // Advanced functionality states
  const [isBulkOperationsDialogOpen, setIsBulkOperationsDialogOpen] =
    useState(false);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  const [isIntegrationsDialogOpen, setIsIntegrationsDialogOpen] =
    useState(false);
  const [isAdvancedCourseDialogOpen, setIsAdvancedCourseDialogOpen] =
    useState(false);
  const [isExportOptionsDialogOpen, setIsExportOptionsDialogOpen] =
    useState(false);
  const [isQuestionBankDialogOpen, setIsQuestionBankDialogOpen] =
    useState(false);
  const [isCreateQuestionDialogOpen, setIsCreateQuestionDialogOpen] =
    useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [isAdvancedFilterDialogOpen, setIsAdvancedFilterDialogOpen] =
    useState(false);
  const [isQuickAnalyticsDialogOpen, setIsQuickAnalyticsDialogOpen] =
    useState(false);
  const [isGradingInterfaceDialogOpen, setIsGradingInterfaceDialogOpen] =
    useState(false);

  // Selection states
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [bulkImportFile, setBulkImportFile] = useState<File | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLearningPath, setSelectedLearningPath] =
    useState<LearningPath | null>(null);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationTemplate | null>(null);
  const [selectedVirtualSession, setSelectedVirtualSession] =
    useState<VirtualSession | null>(null);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollment | null>(null);
  const [bulkEnrollmentFile, setBulkEnrollmentFile] = useState<File | null>(
    null
  );
  const [enrollmentData, setEnrollmentData] = useState({
    courseId: "",
    studentId: "",
    enrollmentType: "manual" as "manual" | "self" | "api" | "bulk",
    notes: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    subcategory: "",
    credits: 0,
    learningHours: 0,
    practicalHours: 0,
    department: "",
    faculty: "",
    description: "",
    status: "Draft",
    startDate: "",
    endDate: "",
    type: "Mandatory" as "Mandatory" | "Elective",
    maxCapacity: 0,
    outcomes: [] as string[],
    competencyScale: "",
    activities: [] as string[],
    prerequisites: [] as string[],
    badges: [] as string[],
    certificates: [] as string[],
    enrollmentMode: "manual" as "manual" | "self" | "api" | "bulk",
    proctoring: false,
    adaptiveLearning: false,
    virtualClassroom: false,
    collaborationTools: [] as string[],
    contentTypes: [] as string[],
    gamificationEnabled: false,
    notifications: [] as string[],
    integrations: [] as string[],
  });

  // Form data for other entities
  const [learningPathFormData, setLearningPathFormData] = useState({
    name: "",
    description: "",
    courses: [] as string[],
    sequencing: "linear" as "linear" | "adaptive" | "flexible",
    restrictions: [] as string[],
    prerequisites: [] as string[],
    estimatedDuration: 0,
  });

  const [notificationFormData, setNotificationFormData] = useState({
    name: "",
    type: "email" as "email" | "sms" | "push" | "in-app",
    trigger: "",
    subject: "",
    content: "",
    active: true,
  });

  const [virtualSessionFormData, setVirtualSessionFormData] = useState({
    courseId: "",
    title: "",
    platform: "zoom" as "zoom" | "teams" | "meet" | "webex",
    scheduledDate: "",
    duration: 60,
    attendees: 0,
    status: "scheduled" as "scheduled" | "ongoing" | "completed" | "cancelled",
    recordingAvailable: false,
  });

  const [assignmentFormData, setAssignmentFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100,
    submissions: 0,
    plagiarismCheck: true,
    autoGrading: false,
    status: "draft" as "active" | "closed" | "draft",
  });

  const [assessmentFormData, setAssessmentFormData] = useState({
    courseId: "",
    title: "",
    type: "quiz" as "quiz" | "exam" | "survey" | "assignment",
    questions: 10,
    duration: 30,
    attempts: 1,
    autoGrade: true,
    proctored: false,
    status: "draft" as "active" | "closed" | "draft",
  });

  const [certificateFormData, setCertificateFormData] = useState({
    courseId: "",
    studentId: "",
    template: "completion",
    issueDate: "",
    qrCode: "",
    verificationUrl: "",
    status: "issued" as "issued" | "revoked" | "expired",
  });

  console.log(user?.role);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || course.status.toLowerCase() === statusFilter;
    const matchesType =
      typeFilter === "all" || course.type.toLowerCase() === typeFilter;

    const hasAccess =
      user?.role === "super-admin" ||
      user?.role === "admin" ||
      user?.role === "faculty" ||
      (user?.role === "student" &&
        (course.status === "Published" || course.status === "Active")) ||
      (user?.role === "parent" &&
        (course.status === "Published" || course.status === "Active"));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesType &&
      hasAccess
    );
  });

  const stats = {
    total: courses.length,
    active: courses.filter((c) => c.status === "Active").length,
    enrolled: courses.reduce((sum, c) => sum + c.enrolled, 0),
    avgCompletion: Math.round(
      courses.reduce((sum, c) => sum + c.completion, 0) / courses.length
    ),
    categories: new Set(courses.map((c) => c.category)).size,
    totalCapacity: courses.reduce((sum, c) => sum + c.maxCapacity, 0),
    certificatesIssued: courses.reduce(
      (sum, c) => sum + c.certificatesGenerated,
      0
    ),
    virtualSessions: virtualSessions.length,
    totalAssignments: courses.reduce((sum, c) => sum + c.assignments, 0),
    totalAssessments: courses.reduce((sum, c) => sum + c.assessments, 0),
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      category: "",
      subcategory: "",
      credits: 0,
      learningHours: 0,
      practicalHours: 0,
      department: "",
      faculty: "",
      description: "",
      status: "Draft",
      startDate: "",
      endDate: "",
      type: "Mandatory",
      maxCapacity: 0,
      outcomes: [],
      competencyScale: "",
      activities: [],
      prerequisites: [],
      badges: [],
      certificates: [],
      enrollmentMode: "manual",
      proctoring: false,
      adaptiveLearning: false,
      virtualClassroom: false,
      collaborationTools: [],
      contentTypes: [],
      gamificationEnabled: false,
      notifications: [],
      integrations: [],
    });
  };

  const handleCreate = () => {
    const newCourse: Course = {
      id: `C${String(courses.length + 1).padStart(3, "0")}`,
      ...formData,
      students: 0,
      completion: 0,
      rating: 0,
      enrolled: 0,
      cohorts: [],
      assignments: 0,
      assessments: 0,
      discussions: 0,
      lessonPlans: 0,
      certificatesGenerated: 0,
    };
    setCourses([...courses, newCourse]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedCourse) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id ? { ...course, ...formData } : course
        )
      );
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
      resetForm();
    }
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleDuplicate = (course: Course) => {
    const duplicatedCourse: Course = {
      ...course,
      id: `C${String(courses.length + 1).padStart(3, "0")}`,
      name: `${course.name} (Copy)`,
      code: `${course.code}_COPY`,
      status: "Draft",
      students: 0,
      enrolled: 0,
      completion: 0,
    };
    setCourses([...courses, duplicatedCourse]);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      category: course.category,
      subcategory: course.subcategory,
      credits: course.credits,
      learningHours: course.learningHours,
      practicalHours: course.practicalHours,
      department: course.department,
      faculty: course.faculty,
      description: course.description,
      status: course.status,
      startDate: course.startDate,
      endDate: course.endDate,
      type: course.type,
      maxCapacity: course.maxCapacity,
      outcomes: course.outcomes,
      competencyScale: course.competencyScale,
      activities: course.activities,
      prerequisites: course.prerequisites,
      badges: course.badges,
      certificates: course.certificates,
      enrollmentMode: course.enrollmentMode,
      proctoring: course.proctoring,
      adaptiveLearning: course.adaptiveLearning,
      virtualClassroom: course.virtualClassroom,
      collaborationTools: course.collaborationTools,
      contentTypes: course.contentTypes,
      gamificationEnabled: course.gamificationEnabled,
      notifications: course.notifications,
      integrations: course.integrations,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  // Edit dialog openers for other entities
  const openEditLearningPathDialog = (path: LearningPath) => {
    setSelectedLearningPath(path);
    setLearningPathFormData({
      name: path.name,
      description: path.description,
      courses: path.courses,
      sequencing: path.sequencing,
      restrictions: path.restrictions,
      prerequisites: path.prerequisites,
      estimatedDuration: path.estimatedDuration,
    });
    setIsEditLearningPathDialogOpen(true);
  };

  const openEditNotificationDialog = (notification: NotificationTemplate) => {
    setSelectedNotification(notification);
    setNotificationFormData({
      name: notification.name,
      type: notification.type,
      trigger: notification.trigger,
      subject: notification.subject,
      content: notification.content,
      active: notification.active,
    });
    setIsEditNotificationDialogOpen(true);
  };

  const openEditVirtualSessionDialog = (session: VirtualSession) => {
    setSelectedVirtualSession(session);
    setVirtualSessionFormData({
      courseId: session.courseId,
      title: session.title,
      platform: session.platform,
      scheduledDate: session.scheduledDate,
      duration: session.duration,
      attendees: session.attendees,
      status: session.status,
      recordingAvailable: session.recordingAvailable,
    });
    setIsEditVirtualSessionDialogOpen(true);
  };

  const openEditAssignmentDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentFormData({
      courseId: assignment.courseId,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxPoints: assignment.maxPoints,
      submissions: assignment.submissions,
      plagiarismCheck: assignment.plagiarismCheck,
      autoGrading: assignment.autoGrading,
      status: assignment.status,
    });
    setIsEditAssignmentDialogOpen(true);
  };

  const openEditAssessmentDialog = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setAssessmentFormData({
      courseId: assessment.courseId,
      title: assessment.title,
      type: assessment.type,
      questions: assessment.questions,
      duration: assessment.duration,
      attempts: assessment.attempts,
      autoGrade: assessment.autoGrade,
      proctored: assessment.proctored,
      status: assessment.status,
    });
    setIsEditAssessmentDialogOpen(true);
  };

  const openEditCertificateDialog = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setCertificateFormData({
      courseId: certificate.courseId,
      studentId: certificate.studentId,
      template: certificate.template,
      issueDate: certificate.issueDate,
      qrCode: certificate.qrCode,
      verificationUrl: certificate.verificationUrl,
      status: certificate.status,
    });
    setIsEditCertificateDialogOpen(true);
  };

  const openEditEnrollmentDialog = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setEnrollmentData({
      courseId: enrollment.courseId,
      studentId: enrollment.studentId,
      enrollmentType: enrollment.enrollmentType,
      notes: "",
    });
    setIsEnrollmentDialogOpen(true);
  };

  const handleArrayFieldChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean
  ) => {
    if (Array.isArray(formData[field])) {
      setFormData((prev) => ({
        ...prev,
        [field]: checked
          ? [...(prev[field] as string[]), value]
          : (prev[field] as string[]).filter((item) => item !== value),
      }));
    }
  };

  const handleEnrollStudent = () => {
    const newEnrollment: Enrollment = {
      id: `E${String(enrollments.length + 1).padStart(3, "0")}`,
      courseId: enrollmentData.courseId,
      studentId: enrollmentData.studentId,
      studentName: `Student ${enrollmentData.studentId}`,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "enrolled",
      progress: 0,
      lastActivity: new Date().toISOString(),
      grade: "",
      enrollmentType: enrollmentData.enrollmentType,
    };
    setEnrollments([...enrollments, newEnrollment]);

    setCourses(
      courses.map((course) =>
        course.id === enrollmentData.courseId
          ? { ...course, enrolled: course.enrolled + 1 }
          : course
      )
    );

    setIsEnrollmentDialogOpen(false);
    setEnrollmentData({
      courseId: "",
      studentId: "",
      enrollmentType: "manual",
      notes: "",
    });
  };

  const handleBulkEnrollmentFromFile = () => {
    if (bulkEnrollmentFile) {
      setIsBulkEnrollmentDialogOpen(false);
      setBulkEnrollmentFile(null);
    }
  };

  const handleCreateVirtualSession = (courseId: string) => {
    const newSession: VirtualSession = {
      id: `VS${String(virtualSessions.length + 1).padStart(3, "0")}`,
      courseId,
      title: `Virtual Session for ${
        courses.find((c) => c.id === courseId)?.name
      }`,
      platform: "zoom",
      scheduledDate: new Date().toISOString(),
      duration: 60,
      attendees: 0,
      status: "scheduled",
      recordingAvailable: false,
    };
    setVirtualSessions([...virtualSessions, newSession]);
  };

  const handleCreateAssignment = (courseId: string) => {
    const newAssignment: Assignment = {
      id: `A${String(assignments.length + 1).padStart(3, "0")}`,
      courseId,
      title: "New Assignment",
      description: "Assignment description",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      maxPoints: 100,
      submissions: 0,
      plagiarismCheck: true,
      autoGrading: false,
      status: "draft",
    };
    setAssignments([...assignments, newAssignment]);

    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, assignments: course.assignments + 1 }
          : course
      )
    );
  };

  const handleCreateAssessment = (courseId: string) => {
    const newAssessment: Assessment = {
      id: `AS${String(assessments.length + 1).padStart(3, "0")}`,
      courseId,
      title: "New Assessment",
      type: "quiz",
      questions: 10,
      duration: 30,
      attempts: 1,
      autoGrade: true,
      proctored: false,
      status: "draft",
    };
    setAssessments([...assessments, newAssessment]);

    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, assessments: course.assessments + 1 }
          : course
      )
    );
  };

  const handleGenerateCertificate = (courseId: string, studentId: string) => {
    const newCertificate: Certificate = {
      id: `CERT${String(certificates.length + 1).padStart(3, "0")}`,
      courseId,
      studentId,
      template: "default",
      issueDate: new Date().toISOString().split("T")[0],
      qrCode: `QR${Math.random().toString(36).substring(7)}`,
      verificationUrl: `https://verify.lms.edu/cert/${certificates.length + 1}`,
      status: "issued",
    };
    setCertificates([...certificates, newCertificate]);

    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              certificatesGenerated: course.certificatesGenerated + 1,
            }
          : course
      )
    );
  };

  // CRUD Operations for Learning Paths
  const handleCreateLearningPath = () => {
    const newLearningPath: LearningPath = {
      id: `LP${String(learningPaths.length + 1).padStart(3, "0")}`,
      ...learningPathFormData,
    };
    setLearningPaths([...learningPaths, newLearningPath]);
    setIsCreateLearningPathDialogOpen(false);
    resetLearningPathForm();
  };

  const handleUpdateLearningPath = () => {
    if (selectedLearningPath) {
      setLearningPaths(
        learningPaths.map((path) =>
          path.id === selectedLearningPath.id
            ? { ...path, ...learningPathFormData }
            : path
        )
      );
      setIsEditLearningPathDialogOpen(false);
      setSelectedLearningPath(null);
      resetLearningPathForm();
    }
  };

  const handleDeleteLearningPath = (pathId: string) => {
    setLearningPaths(learningPaths.filter((path) => path.id !== pathId));
  };

  const resetLearningPathForm = () => {
    setLearningPathFormData({
      name: "",
      description: "",
      courses: [],
      sequencing: "linear",
      restrictions: [],
      prerequisites: [],
      estimatedDuration: 0,
    });
  };

  // CRUD Operations for Notifications
  const handleCreateNotification = () => {
    const newNotification: NotificationTemplate = {
      id: `NT${String(notificationTemplates.length + 1).padStart(3, "0")}`,
      ...notificationFormData,
    };
    setNotificationTemplates([...notificationTemplates, newNotification]);
    setIsCreateNotificationDialogOpen(false);
    resetNotificationForm();
  };

  const handleUpdateNotification = () => {
    if (selectedNotification) {
      setNotificationTemplates(
        notificationTemplates.map((template) =>
          template.id === selectedNotification.id
            ? { ...template, ...notificationFormData }
            : template
        )
      );
      setIsEditNotificationDialogOpen(false);
      setSelectedNotification(null);
      resetNotificationForm();
    }
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotificationTemplates(
      notificationTemplates.filter((template) => template.id !== notificationId)
    );
  };

  const resetNotificationForm = () => {
    setNotificationFormData({
      name: "",
      type: "email",
      trigger: "",
      subject: "",
      content: "",
      active: true,
    });
  };

  // CRUD Operations for Virtual Sessions
  const handleCreateVirtualSessionComplete = () => {
    const newSession: VirtualSession = {
      id: `VS${String(virtualSessions.length + 1).padStart(3, "0")}`,
      ...virtualSessionFormData,
    };
    setVirtualSessions([...virtualSessions, newSession]);
    setIsCreateVirtualSessionDialogOpen(false);
    resetVirtualSessionForm();
  };

  const handleUpdateVirtualSession = () => {
    if (selectedVirtualSession) {
      setVirtualSessions(
        virtualSessions.map((session) =>
          session.id === selectedVirtualSession.id
            ? { ...session, ...virtualSessionFormData }
            : session
        )
      );
      setIsEditVirtualSessionDialogOpen(false);
      setSelectedVirtualSession(null);
      resetVirtualSessionForm();
    }
  };

  const handleDeleteVirtualSession = (sessionId: string) => {
    setVirtualSessions(
      virtualSessions.filter((session) => session.id !== sessionId)
    );
  };

  const resetVirtualSessionForm = () => {
    setVirtualSessionFormData({
      courseId: "",
      title: "",
      platform: "zoom",
      scheduledDate: "",
      duration: 60,
      attendees: 0,
      status: "scheduled",
      recordingAvailable: false,
    });
  };

  // CRUD Operations for Assignments
  const handleCreateAssignmentComplete = () => {
    const newAssignment: Assignment = {
      id: `A${String(assignments.length + 1).padStart(3, "0")}`,
      ...assignmentFormData,
    };
    setAssignments([...assignments, newAssignment]);
    setIsCreateAssignmentDialogOpen(false);
    resetAssignmentForm();
  };

  const handleUpdateAssignment = () => {
    if (selectedAssignment) {
      setAssignments(
        assignments.map((assignment) =>
          assignment.id === selectedAssignment.id
            ? { ...assignment, ...assignmentFormData }
            : assignment
        )
      );
      setIsEditAssignmentDialogOpen(false);
      setSelectedAssignment(null);
      resetAssignmentForm();
    }
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(
      assignments.filter((assignment) => assignment.id !== assignmentId)
    );
  };

  const resetAssignmentForm = () => {
    setAssignmentFormData({
      courseId: "",
      title: "",
      description: "",
      dueDate: "",
      maxPoints: 100,
      submissions: 0,
      plagiarismCheck: true,
      autoGrading: false,
      status: "draft",
    });
  };

  // CRUD Operations for Assessments
  const handleCreateAssessmentComplete = () => {
    const newAssessment: Assessment = {
      id: `AS${String(assessments.length + 1).padStart(3, "0")}`,
      ...assessmentFormData,
    };
    setAssessments([...assessments, newAssessment]);
    setIsCreateAssessmentDialogOpen(false);
    resetAssessmentForm();
  };

  const handleUpdateAssessment = () => {
    if (selectedAssessment) {
      setAssessments(
        assessments.map((assessment) =>
          assessment.id === selectedAssessment.id
            ? { ...assessment, ...assessmentFormData }
            : assessment
        )
      );
      setIsEditAssessmentDialogOpen(false);
      setSelectedAssessment(null);
      resetAssessmentForm();
    }
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setAssessments(
      assessments.filter((assessment) => assessment.id !== assessmentId)
    );
  };

  const resetAssessmentForm = () => {
    setAssessmentFormData({
      courseId: "",
      title: "",
      type: "quiz",
      questions: 10,
      duration: 30,
      attempts: 1,
      autoGrade: true,
      proctored: false,
      status: "draft",
    });
  };

  // CRUD Operations for Certificates
  const handleCreateCertificateComplete = () => {
    const newCertificate: Certificate = {
      id: `CERT${String(certificates.length + 1).padStart(3, "0")}`,
      ...certificateFormData,
      qrCode: `QR${Math.random().toString(36).substring(7)}`,
      verificationUrl: `https://verify.lms.edu/cert/${certificates.length + 1}`,
    };
    setCertificates([...certificates, newCertificate]);
    setIsCreateCertificateDialogOpen(false);
    resetCertificateForm();
  };

  const handleUpdateCertificate = () => {
    if (selectedCertificate) {
      setCertificates(
        certificates.map((certificate) =>
          certificate.id === selectedCertificate.id
            ? { ...certificate, ...certificateFormData }
            : certificate
        )
      );
      setIsEditCertificateDialogOpen(false);
      setSelectedCertificate(null);
      resetCertificateForm();
    }
  };

  const handleDeleteCertificate = (certificateId: string) => {
    setCertificates(
      certificates.filter((certificate) => certificate.id !== certificateId)
    );
  };

  const resetCertificateForm = () => {
    setCertificateFormData({
      courseId: "",
      studentId: "",
      template: "completion",
      issueDate: "",
      qrCode: "",
      verificationUrl: "",
      status: "issued",
    });
  };

  // CRUD Operations for Enrollments
  const handleUpdateEnrollment = () => {
    if (selectedEnrollment) {
      setEnrollments(
        enrollments.map((enrollment) =>
          enrollment.id === selectedEnrollment.id
            ? { ...enrollment, ...enrollmentData }
            : enrollment
        )
      );
      setIsEnrollmentDialogOpen(false);
      setSelectedEnrollment(null);
      setEnrollmentData({
        courseId: "",
        studentId: "",
        enrollmentType: "manual",
        notes: "",
      });
    }
  };

  const handleDeleteEnrollment = (enrollmentId: string) => {
    setEnrollments(
      enrollments.filter((enrollment) => enrollment.id !== enrollmentId)
    );
  };

  // Advanced Course Management Functions
  const handleBulkDuplicate = () => {
    const duplicatedCourses = selectedCourses
      .map((courseId) => {
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          return {
            ...course,
            id: `C${String(
              courses.length + selectedCourses.indexOf(courseId) + 1
            ).padStart(3, "0")}`,
            name: `${course.name} (Copy)`,
            code: `${course.code}_COPY`,
            status: "Draft",
            enrolled: 0,
            completion: 0,
          };
        }
        return null;
      })
      .filter(Boolean) as Course[];

    setCourses([...courses, ...duplicatedCourses]);
    setSelectedCourses([]);
    setIsBulkOperationsDialogOpen(false);
  };

  const handleBulkArchive = () => {
    setCourses(
      courses.map((course) =>
        selectedCourses.includes(course.id)
          ? { ...course, status: "Archived" }
          : course
      )
    );
    setSelectedCourses([]);
    setIsBulkOperationsDialogOpen(false);
  };

  const handleBulkEnrollment = () => {
    // Implementation for bulk enrollment
    alert("Bulk enrollment functionality executed for selected courses");
    setSelectedCourses([]);
    setIsBulkOperationsDialogOpen(false);
  };

  const handleBulkGenerateCertificates = () => {
    selectedCourses.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        // Generate certificates for all enrolled students in selected courses
        const enrolledStudents = enrollments.filter(
          (e) => e.courseId === courseId
        );
        enrolledStudents.forEach((enrollment) => {
          const newCertificate: Certificate = {
            id: `CERT${String(certificates.length + 1).padStart(3, "0")}`,
            courseId,
            studentId: enrollment.studentId,
            template: "completion",
            issueDate: new Date().toISOString().split("T")[0],
            qrCode: `QR${Math.random().toString(36).substring(7)}`,
            verificationUrl: `https://verify.lms.edu/cert/${
              certificates.length + 1
            }`,
            status: "issued",
          };
          setCertificates((prev) => [...prev, newCertificate]);
        });
      }
    });
    setSelectedCourses([]);
    setIsBulkOperationsDialogOpen(false);
  };

  // Template Functions
  const handleApplyTemplate = (templateType: string) => {
    if (selectedCourses.length === 0) return;

    const templateConfigs = {
      "computer-science": {
        category: "Computer Science",
        contentTypes: ["Video Lectures", "Code Examples", "Interactive Labs"],
        activities: ["Assignments", "Assessments", "Peer Review"],
        integrations: ["GitHub", "Stack Overflow"],
      },
      engineering: {
        category: "Engineering",
        contentTypes: ["Video Lectures", "Simulations", "CAD Files"],
        activities: ["Projects", "Lab Work", "Design Reviews"],
        integrations: ["AutoCAD", "MATLAB"],
      },
      business: {
        category: "Business",
        contentTypes: ["Case Studies", "Video Lectures", "Interactive Tools"],
        activities: ["Case Analysis", "Group Projects", "Presentations"],
        integrations: ["LinkedIn Learning", "Salesforce"],
      },
    };

    const config =
      templateConfigs[templateType as keyof typeof templateConfigs];
    if (config) {
      setCourses(
        courses.map((course) =>
          selectedCourses.includes(course.id)
            ? { ...course, ...config }
            : course
        )
      );
    }
    setSelectedCourses([]);
    setIsTemplatesDialogOpen(false);
  };

  // Integration Functions
  const handleLTIIntegration = () => {
    alert("LTI Integration configured for selected courses");
    setIsIntegrationsDialogOpen(false);
  };

  const handleMoodleSync = () => {
    alert("Moodle synchronization initiated");
    setIsIntegrationsDialogOpen(false);
  };

  const handleCanvasConnect = () => {
    alert("Canvas connection established");
    setIsIntegrationsDialogOpen(false);
  };

  const handleBlackboardLink = () => {
    alert("Blackboard link configured");
    setIsIntegrationsDialogOpen(false);
  };

  // Export Functions
  const handleExportCSV = () => {
    alert("Exporting data as CSV...");
    setIsExportOptionsDialogOpen(false);
  };

  const handleExportExcel = () => {
    alert("Exporting data as Excel...");
    setIsExportOptionsDialogOpen(false);
  };

  const handleExportGrades = () => {
    alert("Exporting grades...");
    setIsExportOptionsDialogOpen(false);
  };

  const handleExportAnalytics = () => {
    alert("Exporting analytics...");
    setIsExportOptionsDialogOpen(false);
  };

  // Question Bank Functions
  const handleCreateQuestionBank = () => {
    alert("Creating new question bank...");
    setIsQuestionBankDialogOpen(false);
  };

  const handleViewQuestionBank = () => {
    alert("Opening question bank view...");
  };

  const handleEditQuestionBank = () => {
    alert("Opening question bank editor...");
  };

  const handleSaveDraft = () => {
    alert("Question saved as draft");
    setIsCreateQuestionDialogOpen(false);
  };

  const handleAddQuestion = () => {
    alert("Question added successfully");
    setIsCreateQuestionDialogOpen(false);
  };

  // Bulk Import Functions
  const handleChooseFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls,.csv,.xml,.zip";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setBulkImportFile(file);
      }
    };
    input.click();
  };

  const handleDownloadTemplate = () => {
    alert("Downloading import template...");
  };

  const handleImportQuestions = () => {
    if (bulkImportFile) {
      alert(`Importing questions from ${bulkImportFile.name}...`);
      setBulkImportFile(null);
      setIsBulkImportDialogOpen(false);
    }
  };

  const handleImportAssessment = () => {
    if (bulkImportFile) {
      alert(`Importing assessment from ${bulkImportFile.name}...`);
      setBulkImportFile(null);
      setIsBulkImportDialogOpen(false);
    }
  };

  const handleImportQTI = () => {
    if (bulkImportFile) {
      alert(`Importing QTI package from ${bulkImportFile.name}...`);
      setBulkImportFile(null);
      setIsBulkImportDialogOpen(false);
    }
  };

  // Filter Functions
  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setTypeFilter("all");
    alert("Filters reset successfully");
  };

  const handleApplyFilters = () => {
    alert("Advanced filters applied");
    setIsAdvancedFilterDialogOpen(false);
  };

  // Analytics Functions
  const handleViewPerformance = () => {
    alert("Opening performance analytics...");
    setIsQuickAnalyticsDialogOpen(false);
  };

  const handleAnalyseQuestions = () => {
    alert("Analyzing question performance...");
    setIsQuickAnalyticsDialogOpen(false);
  };

  const handleTimePatterns = () => {
    alert("Analyzing time patterns...");
    setIsQuickAnalyticsDialogOpen(false);
  };

  const handleCheckAnomalies = () => {
    alert("Checking for anomalies...");
    setIsQuickAnalyticsDialogOpen(false);
  };

  // Assessment Export Functions
  const handleExportResults = () => {
    alert("Exporting assessment results...");
  };

  const handleExportQuestions = () => {
    alert("Exporting questions...");
  };

  const handleExportResponses = () => {
    alert("Exporting student responses...");
  };

  // Grading Functions
  const handleOpenGradingInterface = () => {
    alert("Opening grading interface...");
    setIsGradingInterfaceDialogOpen(true);
  };

  const handleContinueManualInterface = () => {
    alert("Continuing with manual grading interface...");
    setIsGradingInterfaceDialogOpen(false);
  };

  const handleStudentEnrollment = (courseId: string) => {
    if (!user?.id) return;

    const newEnrollment: Enrollment = {
      id: `E${String(enrollments.length + 1).padStart(3, "0")}`,
      courseId,
      studentId: user.id,
      studentName: user.name || "Student",
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "enrolled",
      progress: 0,
      lastActivity: new Date().toISOString(),
      grade: "",
      enrollmentType: "self",
    };

    setEnrollments([...enrollments, newEnrollment]);

    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: course.enrolled + 1 }
          : course
      )
    );
  };

  const renderRoleBasedView = () => {
    switch (user?.role) {
      case "admin":
        return renderAdminView();
      case "faculty":
        return renderFacultyView();
      case "student":
        return renderStudentView();
      case "parent":
        return renderParentView();
      default:
        return renderGuestView();
    }
  };

  const renderAdminView = () => (
    <div className="space-y-8">
      <div className="page-header flex-col items-center">
        <div className="w-full text-left mx-4">
          <h1 className="text-3xl font-bold tracking-tight">
            LMS Administration
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete learning management system with enrollment, content design,
            adaptive learning, and analytics
          </p>
        </div>
        <div className="flex mx-8 mt-5 w-full items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Import Courses</DialogTitle>
                <DialogDescription>
                  Upload Excel, CSV, or SCORM packages
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="excel" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="excel">Excel/CSV</TabsTrigger>
                  <TabsTrigger value="scorm">SCORM</TabsTrigger>
                  <TabsTrigger value="lti">LTI</TabsTrigger>
                </TabsList>
                <TabsContent value="excel" className="space-y-4">
                  <div>
                    <Label htmlFor="bulk-file">Select File</Label>
                    <Input
                      id="bulk-file"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Supported: Excel (.xlsx, .xls) and CSV (.csv) files
                  </div>
                </TabsContent>
                <TabsContent value="scorm" className="space-y-4">
                  <div>
                    <Label htmlFor="scorm-file">SCORM Package</Label>
                    <Input id="scorm-file" type="file" accept=".zip" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Upload SCORM 1.2 or SCORM 2004 packages
                  </div>
                </TabsContent>
                <TabsContent value="lti" className="space-y-4">
                  <div>
                    <Label htmlFor="lti-url">LTI Tool URL</Label>
                    <Input
                      id="lti-url"
                      placeholder="https://tool.example.com/lti"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lti-key">Consumer Key</Label>
                    <Input id="lti-key" placeholder="Enter consumer key" />
                  </div>
                  <div>
                    <Label htmlFor="lti-secret">Shared Secret</Label>
                    <Input
                      id="lti-secret"
                      type="password"
                      placeholder="Enter shared secret"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => console.log("Bulk import cancelled")}
                >
                  Cancel
                </Button>
                <Button>Import Content</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Lightbulb className="h-4 w-4 mr-2" />
                Learning Paths
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Learning Path Management</DialogTitle>
                <DialogDescription>
                  Create and manage structured learning pathways
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Learning Path
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Paths
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {learningPaths.map((path) => (
                    <Card key={path.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{path.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {path.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span>Courses: {path.courses.length}</span>
                            <span>
                              Duration: {path.estimatedDuration} weeks
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {path.sequencing}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditLearningPathDialog(path)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Learning Path
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{path.name}"?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteLearningPath(path.id)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Notification Management</DialogTitle>
                <DialogDescription>
                  Configure automated notification templates
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    onClick={() => setIsCreateNotificationDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Global Settings
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {template.subject}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {template.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{template.trigger}</TableCell>
                        <TableCell>
                          <Badge
                            variant={template.active ? "default" : "secondary"}
                          >
                            {template.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openEditNotificationDialog(template)
                              }
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Notification Template
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {template.name}"? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteNotification(template.id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>LMS Analytics Dashboard</DialogTitle>
                <DialogDescription>
                  Comprehensive analytics and reporting
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="content">Content Usage</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Learners
                            </p>
                            <p className="text-2xl font-bold">
                              {stats.enrolled}
                            </p>
                          </div>
                          <Users className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Completion Rate
                            </p>
                            <p className="text-2xl font-bold">
                              {stats.avgCompletion}%
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Certificates
                            </p>
                            <p className="text-2xl font-bold">
                              {stats.certificatesIssued}
                            </p>
                          </div>
                          <Award className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="enrollment">
                  <div className="space-y-4">
                    <p>
                      Enrollment analytics and trends would be displayed here
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="performance">
                  <div className="space-y-4">
                    <p>
                      Performance metrics and learning outcomes would be
                      displayed here
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="content">
                  <div className="space-y-4">
                    <p>
                      Content usage analytics and engagement metrics would be
                      displayed here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                System Config
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>System Configuration</DialogTitle>
                <DialogDescription>
                  Configure LMS settings and integrations
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
                  <TabsTrigger value="gamification">Gamification</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="self-enrollment" defaultChecked />
                      <Label htmlFor="self-enrollment">
                        Allow self-enrollment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="adaptive-learning" defaultChecked />
                      <Label htmlFor="adaptive-learning">
                        Enable adaptive learning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="virtual-classrooms" defaultChecked />
                      <Label htmlFor="virtual-classrooms">
                        Virtual classrooms
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="collaboration-tools" defaultChecked />
                      <Label htmlFor="collaboration-tools">
                        Collaboration tools
                      </Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via email
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications via SMS
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send push notifications
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Show in-app notifications
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="integrations" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Google Workspace</h4>
                            <p className="text-sm text-muted-foreground">
                              Calendar, Meet, Drive
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Microsoft 365</h4>
                            <p className="text-sm text-muted-foreground">
                              Teams, SharePoint
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Zoom</h4>
                            <p className="text-sm text-muted-foreground">
                              Video conferencing
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Canvas LTI</h4>
                            <p className="text-sm text-muted-foreground">
                              External tools
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="proctoring" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Proctoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Remote proctoring for assessments
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                    <div>
                      <Label>Proctoring Provider</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proctorio">Proctorio</SelectItem>
                          <SelectItem value="respondus">
                            Respondus Monitor
                          </SelectItem>
                          <SelectItem value="examity">Examity</SelectItem>
                          <SelectItem value="honorlock">Honorlock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="gamification" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Gamification</Label>
                        <p className="text-sm text-muted-foreground">
                          Points, badges, and leaderboards
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Digital Badges</Label>
                        <p className="text-sm text-muted-foreground">
                          Award badges for achievements
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leaderboards</Label>
                        <p className="text-sm text-muted-foreground">
                          Show student rankings
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Progress Tracking</Label>
                        <p className="text-sm text-muted-foreground">
                          Visual progress indicators
                        </p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Advanced Course Management Buttons */}
          {/*<Button variant="outline" onClick={() => setIsAdvancedCourseDialogOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Advanced Course
          </Button>

          <Button variant="outline" onClick={() => setIsBulkOperationsDialogOpen(true)}>
            <Users className="h-4 w-4 mr-2" />
            Bulk Operations
          </Button>

          <Button variant="outline" onClick={() => setIsTemplatesDialogOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>

          <Button variant="outline" onClick={() => setIsIntegrationsDialogOpen(true)}>
            <Zap className="h-4 w-4 mr-2" />
            Integrations
          </Button>*/}

          <PermissionGuard resource="courses" operation="create">
            <Button className="btn-primary" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </PermissionGuard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Courses</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">{stats.active} active</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Enrolled</p>
              <p className="text-3xl font-bold text-green-900">
                {stats.enrolled}
              </p>
              <p className="text-xs text-green-600">learners</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Completion</p>
              <p className="text-3xl font-bold text-purple-900">
                {stats.avgCompletion}%
              </p>
              <p className="text-xs text-purple-600">average</p>
            </div>
            <Trophy className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Utilization</p>
              <p className="text-3xl font-bold text-yellow-900">
                {Math.round((stats.enrolled / stats.totalCapacity) * 100)}%
              </p>
              <p className="text-xs text-yellow-600">capacity</p>
            </div>
            <BarChart3 className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">{renderCoursesTable()}</TabsContent>

        <TabsContent value="content">{renderContentManagement()}</TabsContent>

        <TabsContent value="enrollment">
          {renderEnrollmentManagement()}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderFacultyView = () => (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your courses, students, and teaching activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">My Courses</p>
              <p className="text-3xl font-bold text-blue-900">
                {
                  courses.filter((c) => c.faculty.includes(user?.name || ""))
                    .length
                }
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Students</p>
              <p className="text-3xl font-bold text-green-900">
                {courses
                  .filter((c) => c.faculty.includes(user?.name || ""))
                  .reduce((sum, c) => sum + c.enrolled, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Assignments</p>
              <p className="text-3xl font-bold text-purple-900">
                {
                  assignments.filter((a) =>
                    courses.find(
                      (c) =>
                        c.id === a.courseId &&
                        c.faculty.includes(user?.name || "")
                    )
                  ).length
                }
              </p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Virtual Sessions
              </p>
              <p className="text-3xl font-bold text-orange-900">
                {
                  virtualSessions.filter((v) =>
                    courses.find(
                      (c) =>
                        c.id === v.courseId &&
                        c.faculty.includes(user?.name || "")
                    )
                  ).length
                }
              </p>
            </div>
            <Video className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Classes</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="my-courses">
          {renderCoursesTable(
            courses.filter((c) => c.faculty.includes(user?.name || ""))
          )}
        </TabsContent>

        <TabsContent value="students">
          {renderEnrollmentManagement()}
        </TabsContent>

        <TabsContent value="assignments">
          {renderAssignmentManagement()}
        </TabsContent>

        <TabsContent value="assessments">
          {renderAssessmentManagement()}
        </TabsContent>

        <TabsContent value="virtual">{renderVirtualClassrooms()}</TabsContent>

        <TabsContent value="grading">
          {renderAssessmentManagement()}
        </TabsContent>

        <TabsContent value="certificates">
          {renderCertificateManagement()}
        </TabsContent>

        <TabsContent value="analytics">{renderAdvancedAnalytics()}</TabsContent>
      </Tabs>
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">
          My Learning Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your progress and engage with course content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Enrolled Courses
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {enrollments.filter((e) => e.studentId === user?.id).length}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Overall Progress
              </p>
              <p className="text-3xl font-bold text-green-900">
                {Math.round(
                  enrollments
                    .filter((e) => e.studentId === user?.id)
                    .reduce((sum, e) => sum + e.progress, 0) /
                    enrollments.filter((e) => e.studentId === user?.id)
                      .length || 0
                )}
                %
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Assignments Due
              </p>
              <p className="text-3xl font-bold text-purple-900">3</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Certificates
              </p>
              <p className="text-3xl font-bold text-orange-900">
                {certificates.filter((c) => c.studentId === user?.id).length}
              </p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Classes</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="discussion">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled">{renderStudentCourses()}</TabsContent>

        <TabsContent value="available">{renderAvailableCourses()}</TabsContent>

        <TabsContent value="assignments">
          {renderStudentAssignments()}
        </TabsContent>

        <TabsContent value="progress">{renderStudentProgress()}</TabsContent>

        <TabsContent value="certificates">
          {renderStudentCertificates()}
        </TabsContent>

        <TabsContent value="assessments">
          {renderStudentAssessments()}
        </TabsContent>

        <TabsContent value="virtual">
          {renderStudentVirtualClasses()}
        </TabsContent>

        <TabsContent value="discussion">
          {renderStudentDiscussions()}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderParentView = () => (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your child's learning progress and activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Enrolled Courses
              </p>
              <p className="text-3xl font-bold text-blue-900">5</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Overall Progress
              </p>
              <p className="text-3xl font-bold text-green-900">78%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Assignments Due
              </p>
              <p className="text-3xl font-bold text-purple-900">3</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Certificates
              </p>
              <p className="text-3xl font-bold text-orange-900">2</p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Child's Learning Progress</CardTitle>
          <CardDescription>
            Monitor course enrollment and academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {course.faculty}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {course.completion}% Complete
                  </p>
                  <Progress
                    value={course.completion}
                    className="w-24 h-2 mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGuestView = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Access Required</h3>
        <p className="text-muted-foreground">
          Please log in to access the learning management system.
        </p>
      </div>
    </div>
  );

  const renderCoursesTable = (coursesToShow = filteredCourses) => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          Course Management
        </CardTitle>
        <CardDescription>
          Comprehensive course directory with enrollment, content design, and
          learning analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setIsAdvancedFilterDialogOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced
          </Button>

          <Button variant="outline" onClick={handleResetFilters}>
            <XCircle className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>

          <Button variant="outline" onClick={handleApplyFilters}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsExportOptionsDialogOpen(true)}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Options
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedCourses.length === coursesToShow.length &&
                    coursesToShow.length > 0
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCourses(coursesToShow.map((c) => c.id));
                    } else {
                      setSelectedCourses([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesToShow.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCourses([...selectedCourses, course.id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter((id) => id !== course.id)
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.code} • {course.faculty}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <Badge
                        variant={
                          course.type === "Mandatory" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {course.type}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      {course.enrolled}/{course.maxCapacity}
                    </div>
                    <Progress
                      value={(course.enrolled / course.maxCapacity) * 100}
                      className="w-16 h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      {Math.round((course.enrolled / course.maxCapacity) * 100)}
                      % full
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{course.completion}%</div>
                    <Progress value={course.completion} className="w-16 h-2" />
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {course.virtualClassroom && (
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Virtual
                      </Badge>
                    )}
                    {course.adaptiveLearning && (
                      <Badge variant="outline" className="text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        Adaptive
                      </Badge>
                    )}
                    {course.proctoring && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Proctored
                      </Badge>
                    )}
                    {course.gamificationEnabled && (
                      <Badge variant="outline" className="text-xs">
                        <Gamepad2 className="h-3 w-3 mr-1" />
                        Gamified
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      course.status === "Active"
                        ? "default"
                        : course.status === "Draft"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(course)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {(user?.role === "admin" || user?.role === "faculty") && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsEnrollmentDialogOpen(true);
                          }}
                          title="Enroll Student"
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCreateVirtualSession(course.id)}
                          title="Schedule Virtual Class"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCreateAssignment(course.id)}
                          title="Create Assignment"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCreateAssessment(course.id)}
                          title="Create Assessment"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleGenerateCertificate(course.id, "demo-student")
                          }
                          title="Generate Certificate"
                        >
                          <Award className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicate(course)}
                          title="Duplicate Course"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <PermissionGuard resource="courses" operation="update">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(course)}
                            title="Edit Course"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </PermissionGuard>
                        <PermissionGuard resource="courses" operation="delete">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Delete Course"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Course
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{course.name}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(course.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </PermissionGuard>
                      </>
                    )}

                    {user?.role === "student" &&
                      course.enrollmentMode === "self" && (
                        <Button
                          size="sm"
                          onClick={() => handleStudentEnrollment(course.id)}
                          disabled={enrollments.some(
                            (e) =>
                              e.courseId === course.id &&
                              e.studentId === user?.id
                          )}
                          title={
                            enrollments.some(
                              (e) =>
                                e.courseId === course.id &&
                                e.studentId === user?.id
                            )
                              ? "Already Enrolled"
                              : "Enroll in Course"
                          }
                        >
                          {enrollments.some(
                            (e) =>
                              e.courseId === course.id &&
                              e.studentId === user?.id
                          ) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <UserPlus className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderEnrollmentManagement = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-50 text-green-600">
            <UserPlus className="h-5 w-5" />
          </div>
          Enrollment Management
        </CardTitle>
        <CardDescription>
          Manage student enrollments with manual, bulk, and API integration
          options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => setIsEnrollmentDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Manual Enrollment
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsBulkEnrollmentDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Enrollment
          </Button>
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            API Integration
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Self-Enrollment Settings
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{enrollment.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      {enrollment.studentId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {courses.find((c) => c.id === enrollment.courseId)?.name}
                  </div>
                </TableCell>
                <TableCell>{enrollment.enrollmentDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {enrollment.enrollmentType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{enrollment.progress}%</div>
                    <Progress
                      value={enrollment.progress}
                      className="w-16 h-2"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      enrollment.status === "enrolled"
                        ? "default"
                        : enrollment.status === "completed"
                        ? "secondary"
                        : enrollment.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {enrollment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="View Enrollment Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditEnrollmentDialog(enrollment)}
                      title="Edit Enrollment"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Remove Enrollment"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Enrollment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this student's
                            enrollment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDeleteEnrollment(enrollment.id)
                            }
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderContentManagement = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <FileText className="h-5 w-5" />
          </div>
          Content Design & Management
        </CardTitle>
        <CardDescription>
          Manage learning content, SCORM packages, LTI tools, and learning
          outcomes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Lesson Design</h4>
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create structured learning lessons
              </p>
              <Button
                className="w-full"
                size="sm"
                onClick={() =>
                  alert("Lesson creation functionality to be implemented")
                }
              >
                Create Lesson
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">SCORM Content</h4>
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Upload SCORM packages
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() =>
                  alert("SCORM upload functionality to be implemented")
                }
              >
                Upload SCORM
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">LTI Integration</h4>
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect external tools
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() =>
                  alert("LTI integration functionality to be implemented")
                }
              >
                Add LTI Tool
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Learning Outcomes</h4>
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Define learning objectives
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() =>
                  alert("Learning outcomes management to be implemented")
                }
              >
                Manage Outcomes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Completion Rules</h4>
                <CheckCircle className="h-5 w-5 text-teal-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Set completion criteria
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() =>
                  alert("Completion rules configuration to be implemented")
                }
              >
                Configure Rules
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Progress Tracking</h4>
                <Activity className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor learning progress
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() =>
                  alert("Progress analytics view to be implemented")
                }
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Question Banks</h4>
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Manage assessment questions
              </p>
              <Button
                className="w-full"
                size="sm"
                onClick={() => setIsQuestionBankDialogOpen(true)}
              >
                Manage Banks
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Assessment Tools</h4>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced assessment features
              </p>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                onClick={() => setIsQuickAnalyticsDialogOpen(true)}
              >
                Quick Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  const renderVirtualClassrooms = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
            <Video className="h-5 w-5" />
          </div>
          Virtual Classroom Integration
        </CardTitle>
        <CardDescription>
          Manage virtual sessions with Zoom, Teams, Google Meet integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => setIsCreateVirtualSessionDialogOpen(true)}>
            <Video className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              alert("Calendar sync functionality to be implemented")
            }
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar Sync
          </Button>
          <Button
            variant="outline"
            onClick={() => alert("Platform settings to be implemented")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {virtualSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{session.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {session.id}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {courses.find((c) => c.id === session.courseId)?.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {session.platform === "zoom" && (
                      <Video className="h-4 w-4" />
                    )}
                    {session.platform === "teams" && (
                      <Users className="h-4 w-4" />
                    )}
                    {session.platform === "meet" && (
                      <Video className="h-4 w-4" />
                    )}
                    <span className="capitalize">{session.platform}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(session.scheduledDate).toLocaleString()}
                </TableCell>
                <TableCell>{session.duration} min</TableCell>
                <TableCell>{session.attendees}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      session.status === "scheduled"
                        ? "outline"
                        : session.status === "ongoing"
                        ? "default"
                        : session.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    {session.recordingAvailable && (
                      <Button variant="ghost" size="sm">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderAssignmentManagement = () => (
    <div className="space-y-6">
      {/* Assignment Creation & Configuration */}
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>
            Assignment Creation & Management System
          </CardTitle>
          <CardDescription>
            Create assignments with configurable grading methods, plagiarism
            detection, and annotation tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-4 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <Plus className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-medium mb-2">Create New Assignment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Design assignments with detailed requirements
                </p>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <div className="text-center">
                <Settings className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-medium mb-2">Grading Configuration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up manual and rubrics-based grading
                </p>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Grading
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-medium mb-2">Plagiarism Detection</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure anti-plagiarism tools
                </p>
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Setup Detection
                </Button>
              </div>
            </Card>
          </div>

          {/* Grading Methods Configuration */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Grading Methods & Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Grading</TabsTrigger>
                  <TabsTrigger value="rubrics">
                    Rubrics-Based Grading
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">
                        Manual Grading Features
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Faculty annotation tools
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Custom point allocation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Feedback comments
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Grade modification history
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Annotation Tools</h4>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Text Annotations
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment Bubbles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Highlight & Mark
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="rubrics" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Rubrics Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Customizable criteria
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Performance levels
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Weighted scoring
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Automated calculations
                        </li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Sample Rubric</h4>
                      <div className="text-xs">
                        <div className="grid grid-cols-3 gap-1 border rounded">
                          <div className="p-2 bg-muted font-medium">
                            Criteria
                          </div>
                          <div className="p-2 bg-muted font-medium">Weight</div>
                          <div className="p-2 bg-muted font-medium">Points</div>
                          <div className="p-1">Content Quality</div>
                          <div className="p-1">40%</div>
                          <div className="p-1">0-40</div>
                          <div className="p-1">Organization</div>
                          <div className="p-1">30%</div>
                          <div className="p-1">0-30</div>
                          <div className="p-1">Grammar</div>
                          <div className="p-1">30%</div>
                          <div className="p-1">0-30</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Rubric
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Plagiarism Detection Integration */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Plagiarism Detection Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-medium mb-2">Turnitin Integration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Industry-standard plagiarism detection
                  </p>
                  <Badge variant="outline">Connected</Badge>
                </Card>
                <Card className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h4 className="font-medium mb-2">Grammarly Business</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Grammar and plagiarism checking
                  </p>
                  <Badge variant="outline">Available</Badge>
                </Card>
                <Card className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <h4 className="font-medium mb-2">Custom Detection</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Internal plagiarism engine
                  </p>
                  <Badge variant="outline">Active</Badge>
                </Card>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h5 className="font-medium mb-2">Detection Settings</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Similarity Threshold</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-flagging</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reference Checking</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Internet Search</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Submission Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Student Submission & Faculty Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="submission" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="submission">
                    Student Submission
                  </TabsTrigger>
                  <TabsTrigger value="evaluation">
                    Faculty Evaluation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="submission" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">
                        Text Editor Submission
                      </h4>
                      <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3">
                        <div className="text-sm text-muted-foreground">
                          Rich text editor with:
                        </div>
                        <ul className="text-xs space-y-1 mt-2">
                          <li>• Mathematical symbols support</li>
                          <li>• Code syntax highlighting</li>
                          <li>• Image insertion</li>
                          <li>• Citation tools</li>
                        </ul>
                      </div>
                      <Button size="sm" className="w-full">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Open Text Editor
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">
                        File Upload Submission
                      </h4>
                      <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <div className="text-center text-sm text-muted-foreground">
                          Supported formats: PDF, DOC, DOCX, TXT
                          <br />
                          Max size: 50MB
                        </div>
                      </div>
                      <Button size="sm" className="w-full" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="evaluation" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Annotation Workspace</h4>
                      <div className="border rounded p-3 mb-3">
                        <div className="text-sm mb-2">Annotation Tools:</div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Text
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Comment
                          </Button>
                          <Button size="sm" variant="outline">
                            <Target className="h-3 w-3 mr-1" />
                            Highlight
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-3 w-3 mr-1" />
                            Error
                          </Button>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Open Annotation View
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Grading Interface</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Score</Label>
                          <div className="flex items-center gap-2">
                            <Input className="w-16 h-8" placeholder="85" />
                            <span className="text-sm text-muted-foreground">
                              / 100
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Feedback</Label>
                          <Textarea
                            className="mt-1 h-20"
                            placeholder="Provide detailed feedback..."
                          />
                        </div>
                        <Button size="sm" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Grade
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderAssessmentManagement = () => (
    <div className="space-y-6">
      {/* Question Bank & Assessment Creation */}
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            Advanced Assessment & Question Bank System
          </CardTitle>
          <CardDescription>
            Create various question types, manage question banks, configure
            assessments, and handle evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-4 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-medium mb-2">Question Bank</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage question repository
                </p>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Questions
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-medium mb-2">Bulk Upload</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Import questions from files
                </p>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-medium mb-2">Create Assessment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure and schedule assessments
                </p>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
              </div>
            </Card>
          </div>

          {/* Question Types */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Question Types & Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mcq" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="mcq">MCQ</TabsTrigger>
                  <TabsTrigger value="short">Short Answer</TabsTrigger>
                  <TabsTrigger value="long">Long Answer</TabsTrigger>
                  <TabsTrigger value="match">Match Following</TabsTrigger>
                  <TabsTrigger value="numerical">Numerical</TabsTrigger>
                </TabsList>

                <TabsContent value="mcq" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">
                      Multiple Choice Questions
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your question..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Option A</Label>
                          <Input placeholder="Option A" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option B</Label>
                          <Input placeholder="Option B" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option C</Label>
                          <Input placeholder="Option C" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option D</Label>
                          <Input placeholder="Option D" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="text-sm">Correct Answer:</Label>
                        <RadioGroup defaultValue="a" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="a" id="a" />
                            <Label htmlFor="a">A</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="b" id="b" />
                            <Label htmlFor="b">B</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="c" id="c" />
                            <Label htmlFor="c">C</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="d" id="d" />
                            <Label htmlFor="d">D</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="10" />
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="short" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Short Answer Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your question..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">
                          Expected Answer (for auto-grading)
                        </Label>
                        <Input
                          placeholder="Expected answer keywords..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Max Length (words)</Label>
                          <Input placeholder="100" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Points</Label>
                          <Input placeholder="15" className="mt-1" />
                        </div>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="long" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Long Answer Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your essay question..."
                          className="mt-1 h-20"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Grading Rubric</Label>
                        <Textarea
                          placeholder="Define grading criteria..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Min Length (words)</Label>
                          <Input placeholder="200" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Max Length (words)</Label>
                          <Input placeholder="500" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="25" />
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="match" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Match the Following</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Instructions</Label>
                        <Input
                          placeholder="Match items from Column A with Column B"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm">Column A</Label>
                          <div className="space-y-2 mt-1">
                            <Input placeholder="Item 1" />
                            <Input placeholder="Item 2" />
                            <Input placeholder="Item 3" />
                            <Input placeholder="Item 4" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Column B</Label>
                          <div className="space-y-2 mt-1">
                            <Input placeholder="Match 1" />
                            <Input placeholder="Match 2" />
                            <Input placeholder="Match 3" />
                            <Input placeholder="Match 4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points per match:</Label>
                          <Input className="w-20" placeholder="2" />
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="numerical" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Numerical Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter numerical problem..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-sm">Correct Answer</Label>
                          <Input placeholder="42.5" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Tolerance (±)</Label>
                          <Input placeholder="0.1" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Unit</Label>
                          <Input placeholder="meters" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="formulas" />
                        <Label htmlFor="formulas" className="text-sm">
                          Allow mathematical formulas
                        </Label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="10" />
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Assessment Configuration */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Assessment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Assessment Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Assessment Title</Label>
                      <Input
                        placeholder="Midterm Examination"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Start Date</Label>
                        <Input type="datetime-local" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">End Date</Label>
                        <Input type="datetime-local" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Duration (minutes)</Label>
                        <Input placeholder="120" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Attempts Allowed</Label>
                        <Input placeholder="1" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Grading Configuration</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Total Marks</Label>
                        <Input placeholder="100" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Passing Marks</Label>
                        <Input placeholder="60" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Grading Method</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select grading method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">
                            Automatic Grading
                          </SelectItem>
                          <SelectItem value="manual">Manual Grading</SelectItem>
                          <SelectItem value="hybrid">
                            Hybrid (Auto + Manual)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="randomize" />
                      <Label htmlFor="randomize" className="text-sm">
                        Randomize question order
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="feedback" />
                      <Label htmlFor="feedback" className="text-sm">
                        Instant feedback
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation & Re-grading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Evaluation & Re-grading System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="evaluation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="evaluation">Auto Evaluation</TabsTrigger>
                  <TabsTrigger value="manual">Manual Review</TabsTrigger>
                  <TabsTrigger value="regrade">Re-grading</TabsTrigger>
                </TabsList>

                <TabsContent value="evaluation" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Automated Evaluation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          MCQ automatic scoring
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Numerical answer validation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Match following auto-check
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Keyword matching for short answers
                        </li>
                      </ul>
                      <Button className="w-full mt-3">
                        <Zap className="h-4 w-4 mr-2" />
                        Run Auto Evaluation
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Evaluation Status</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Total Submissions</span>
                          <Badge variant="secondary">45</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Auto-graded</span>
                          <Badge variant="default">40</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Manual Review Required</span>
                          <Badge variant="destructive">5</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Rate</span>
                          <Badge variant="outline">89%</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Manual Review Queue</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: John Doe</span>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: Jane Smith</span>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: Mike Johnson</span>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Review Interface</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Question Review</Label>
                          <div className="border rounded p-2 text-sm bg-muted">
                            Long answer review interface with annotation tools
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Score" className="w-20" />
                          <span className="text-sm self-center">/ 25</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Grade
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="regrade" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">
                        Individual Re-grading
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Student ID/Name</Label>
                          <Input
                            placeholder="Enter student ID or name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">New Score</Label>
                          <div className="flex gap-2 mt-1">
                            <Input placeholder="85" className="w-20" />
                            <span className="text-sm self-center">/ 100</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Reason for Change</Label>
                          <Textarea
                            placeholder="Explain reason for re-grading..."
                            className="mt-1"
                          />
                        </div>
                        <Button className="w-full">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Update Grade
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Bulk Re-grading</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Select Students</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Students</SelectItem>
                              <SelectItem value="failed">
                                Failed Students
                              </SelectItem>
                              <SelectItem value="custom">
                                Custom Selection
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Adjustment Type</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select adjustment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="add">Add Points</SelectItem>
                              <SelectItem value="multiply">
                                Multiply by Factor
                              </SelectItem>
                              <SelectItem value="curve">Apply Curve</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Value</Label>
                          <Input placeholder="5" className="mt-1" />
                        </div>
                        <Button className="w-full" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Apply Bulk Changes
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderCertificateManagement = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
            <Award className="h-5 w-5" />
          </div>
          Certificate & Transcript Management
        </CardTitle>
        <CardDescription>
          Generate certificates with QR verification and transcript access
          control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => setIsCertificateDialogOpen(true)}>
            <Award className="h-4 w-4 mr-2" />
            Generate Certificate
          </Button>
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            QR Verification
          </Button>
          <Button variant="outline">
            <FileCheck className="h-4 w-4 mr-2" />
            Transcript Access
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Templates
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{certificate.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {certificate.template}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{certificate.studentId}</TableCell>
                <TableCell>
                  {courses.find((c) => c.id === certificate.courseId)?.name}
                </TableCell>
                <TableCell>{certificate.issueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span className="text-sm font-mono">
                      {certificate.qrCode}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={certificate.verificationUrl}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Verify Certificate
                  </a>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      certificate.status === "issued"
                        ? "default"
                        : certificate.status === "revoked"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {certificate.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderAdvancedAnalytics = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-50 text-red-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          Advanced Analytics & Reports
        </CardTitle>
        <CardDescription>
          Comprehensive learning analytics and performance tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Learning Analytics</h4>
                <PieChart className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Student engagement and progress
              </p>
              <Button className="w-full" size="sm">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Performance Reports</h4>
                <LineChart className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Course and student performance
              </p>
              <Button className="w-full" size="sm" variant="outline">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Custom Dashboards</h4>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Role-based dashboards
              </p>
              <Button className="w-full" size="sm" variant="outline">
                Customize
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  const renderStudentCourses = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle>My Enrolled Courses</CardTitle>
        <CardDescription>
          Track your progress and access course materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.slice(0, 4).map((course) => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.faculty}
                    </p>
                  </div>
                  <Badge
                    variant={course.status === "Active" ? "default" : "outline"}
                  >
                    {course.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} className="w-full h-2" />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm">Continue Learning</Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderAvailableCourses = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle>Available Courses</CardTitle>
        <CardDescription>Discover and enroll in new courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses
            .filter((c) => c.enrollmentMode === "self")
            .map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.faculty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="font-medium">{course.enrolled}</span>{" "}
                      enrolled
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{course.credits}</span>{" "}
                      credits
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleStudentEnrollment(course.id)}
                    disabled={enrollments.some(
                      (e) =>
                        e.courseId === course.id && e.studentId === user?.id
                    )}
                  >
                    {enrollments.some(
                      (e) =>
                        e.courseId === course.id && e.studentId === user?.id
                    )
                      ? "Already Enrolled"
                      : "Enroll Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderStudentAssignments = () => {
    const studentCourses = courses.filter((c) =>
      enrollments.some((e) => e.courseId === c.id && e.studentId === user?.id)
    );

    const mockAssignments = [
      {
        id: "A001",
        courseId: "C001",
        title: "Data Structures Implementation",
        description:
          "Implement basic data structures in your preferred programming language",
        dueDate: "2024-02-15",
        maxPoints: 100,
        status: "submitted",
        grade: 85,
        submittedDate: "2024-02-14",
      },
      {
        id: "A002",
        courseId: "C002",
        title: "Digital Marketing Strategy Analysis",
        description: "Analyze a real-world digital marketing campaign",
        dueDate: "2024-02-20",
        maxPoints: 80,
        status: "pending",
        grade: null,
        submittedDate: null,
      },
      {
        id: "A003",
        courseId: "C003",
        title: "Machine Learning Model Training",
        description: "Train and evaluate a machine learning model",
        dueDate: "2024-02-25",
        maxPoints: 120,
        status: "not_submitted",
        grade: null,
        submittedDate: null,
      },
    ];

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            My Assignments
          </CardTitle>
          <CardDescription>
            View and manage your course assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            {mockAssignments.map((assignment) => {
              const course = courses.find((c) => c.id === assignment.courseId);
              if (
                !course ||
                !enrollments.some(
                  (e) => e.courseId === course.id && e.studentId === user?.id
                )
              )
                return null;

              return (
                <Card key={assignment.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assignment.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        assignment.status === "submitted"
                          ? "default"
                          : assignment.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {assignment.status === "submitted"
                        ? "Submitted"
                        : assignment.status === "pending"
                        ? "Pending Review"
                        : "Not Submitted"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Due Date
                      </Label>
                      <p className="font-medium">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Max Points
                      </Label>
                      <p className="font-medium">{assignment.maxPoints}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Grade
                      </Label>
                      <p className="font-medium">
                        {assignment.grade
                          ? `${assignment.grade}/${assignment.maxPoints}`
                          : "Not graded"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Submitted
                      </Label>
                      <p className="font-medium">
                        {assignment.submittedDate || "Not submitted"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {assignment.status === "not_submitted" && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                    )}
                    {assignment.grade && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Feedback
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStudentProgress = () => {
    const studentEnrollments = enrollments.filter(
      (e) => e.studentId === user?.id
    );

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            Learning Progress
          </CardTitle>
          <CardDescription>
            Track your academic progress across all enrolled courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Overall Progress</h4>
                <Badge variant="secondary">
                  {Math.round(
                    studentEnrollments.reduce((sum, e) => sum + e.progress, 0) /
                      studentEnrollments.length || 0
                  )}
                  %
                </Badge>
              </div>
              <Progress
                value={
                  studentEnrollments.reduce((sum, e) => sum + e.progress, 0) /
                    studentEnrollments.length || 0
                }
                className="w-full h-3"
              />
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Courses Completed</h4>
                <Badge variant="default">
                  {
                    studentEnrollments.filter((e) => e.status === "completed")
                      .length
                  }
                  /{studentEnrollments.length}
                </Badge>
              </div>
              <Progress
                value={
                  (studentEnrollments.filter((e) => e.status === "completed")
                    .length /
                    studentEnrollments.length) *
                    100 || 0
                }
                className="w-full h-3"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Course Progress Details</h4>
            {studentEnrollments.map((enrollment) => {
              const course = courses.find((c) => c.id === enrollment.courseId);
              if (!course) return null;

              return (
                <Card key={enrollment.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium">{course.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {course.faculty} • {course.credits} credits
                      </p>
                    </div>
                    <Badge
                      variant={
                        enrollment.status === "completed"
                          ? "default"
                          : enrollment.status === "enrolled"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {enrollment.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <Progress
                      value={enrollment.progress}
                      className="w-full h-2"
                    />
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Last Activity
                        </Label>
                        <p className="text-sm">
                          {new Date(
                            enrollment.lastActivity
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Current Grade
                        </Label>
                        <p className="text-sm">
                          {enrollment.grade || "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStudentCertificates = () => {
    const studentCertificates = certificates.filter(
      (c) => c.studentId === user?.id
    );

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
              <Award className="h-5 w-5" />
            </div>
            My Certificates
          </CardTitle>
          <CardDescription>
            View and download your earned certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {studentCertificates.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground">
                Complete courses to earn certificates
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCertificates.map((certificate) => {
                const course = courses.find(
                  (c) => c.id === certificate.courseId
                );
                if (!course) return null;

                return (
                  <Card key={certificate.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.faculty}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Certificate ID: {certificate.id}
                        </p>
                      </div>
                      <Badge
                        variant={
                          certificate.status === "issued"
                            ? "default"
                            : certificate.status === "revoked"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {certificate.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Issue Date
                        </Label>
                        <p className="font-medium">{certificate.issueDate}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Template
                        </Label>
                        <p className="font-medium capitalize">
                          {certificate.template}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Sample certificates for demo */}
          {studentCertificates.length === 0 && (
            <div className="mt-8">
              <h4 className="font-medium mb-4">Sample Certificates (Demo)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border-dashed">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        Course Completion Certificate
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Available after course completion
                      </p>
                    </div>
                    <Badge variant="outline">Sample</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complete any enrolled course to earn your first certificate
                  </div>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderStudentAssessments = () => {
    const studentCourses = courses.filter((c) =>
      enrollments.some((e) => e.courseId === c.id && e.studentId === user?.id)
    );

    const studentAssessments = assessments.filter((a) =>
      studentCourses.some((c) => c.id === a.courseId)
    );

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            My Assessments
          </CardTitle>
          <CardDescription>
            View and take your course assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {studentAssessments.map((assessment) => {
              const course = courses.find((c) => c.id === assessment.courseId);
              if (!course) return null;

              return (
                <Card key={assessment.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{assessment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>Questions: {assessment.questions}</span>
                        <span>Duration: {assessment.duration} min</span>
                        <span>Attempts: {assessment.attempts}</span>
                        <Badge variant="outline" className="capitalize">
                          {assessment.type}
                        </Badge>
                        {assessment.proctored && (
                          <Badge variant="secondary">Proctored</Badge>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        assessment.status === "active"
                          ? "default"
                          : assessment.status === "closed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {assessment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" disabled={assessment.status !== "active"}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      {assessment.status === "active"
                        ? "Start Assessment"
                        : "Assessment Closed"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {assessment.type === "survey" && (
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Give Feedback
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStudentVirtualClasses = () => {
    const studentCourses = courses.filter((c) =>
      enrollments.some((e) => e.courseId === c.id && e.studentId === user?.id)
    );

    const studentSessions = virtualSessions.filter((v) =>
      studentCourses.some((c) => c.id === v.courseId)
    );

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <Video className="h-5 w-5" />
            </div>
            My Virtual Classes
          </CardTitle>
          <CardDescription>
            Join live classes and access recordings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {studentSessions.map((session) => {
              const course = courses.find((c) => c.id === session.courseId);
              if (!course) return null;

              const sessionDate = new Date(session.scheduledDate);
              const isUpcoming = sessionDate > new Date();
              const isOngoing = session.status === "ongoing";

              return (
                <Card key={session.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>Date: {sessionDate.toLocaleDateString()}</span>
                        <span>Time: {sessionDate.toLocaleTimeString()}</span>
                        <span>Duration: {session.duration} min</span>
                        <Badge variant="outline" className="capitalize">
                          {session.platform}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      variant={
                        session.status === "ongoing"
                          ? "default"
                          : session.status === "completed"
                          ? "secondary"
                          : session.status === "scheduled"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOngoing && (
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Now
                      </Button>
                    )}
                    {isUpcoming && (
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    )}
                    {session.recordingAvailable && (
                      <Button size="sm" variant="outline">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Class Chat
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStudentDiscussions = () => {
    const studentCourses = courses.filter((c) =>
      enrollments.some((e) => e.courseId === c.id && e.studentId === user?.id)
    );

    const mockDiscussions = [
      {
        id: "D001",
        courseId: "C001",
        title: "Data Structures Implementation Discussion",
        description:
          "Discuss best practices for implementing various data structures",
        posts: 45,
        lastActivity: "2024-02-15T10:30:00Z",
        isParticipating: true,
      },
      {
        id: "D002",
        courseId: "C002",
        title: "Digital Marketing Case Studies",
        description: "Share and analyze real-world digital marketing campaigns",
        posts: 28,
        lastActivity: "2024-02-14T16:45:00Z",
        isParticipating: false,
      },
      {
        id: "D003",
        courseId: "C003",
        title: "ML Algorithm Performance",
        description:
          "Compare different machine learning algorithms and their performance",
        posts: 67,
        lastActivity: "2024-02-16T09:15:00Z",
        isParticipating: true,
      },
    ];

    const studentDiscussions = mockDiscussions.filter((d) =>
      studentCourses.some((c) => c.id === d.courseId)
    );

    return (
      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            Course Discussions
          </CardTitle>
          <CardDescription>
            Participate in course discussions and forums
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {studentDiscussions.map((discussion) => {
              const course = courses.find((c) => c.id === discussion.courseId);
              if (!course) return null;

              return (
                <Card key={discussion.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{discussion.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {discussion.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>Posts: {discussion.posts}</span>
                        <span>
                          Last activity:{" "}
                          {new Date(
                            discussion.lastActivity
                          ).toLocaleDateString()}
                        </span>
                        {discussion.isParticipating && (
                          <Badge variant="default" className="text-xs">
                            Participating
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {discussion.isParticipating
                        ? "Continue Discussion"
                        : "Join Discussion"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Posts
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {renderRoleBasedView()}

      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Set up a comprehensive course with all LMS features including
              enrollment, content design, and analytics.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="learning">Learning Setup</TabsTrigger>
              <TabsTrigger value="features">LMS Features</TabsTrigger>
              <TabsTrigger value="content">Content & Tools</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="credits">Credit Points</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Credits"
                  />
                </div>
                <div>
                  <Label htmlFor="learningHours">Learning Hours</Label>
                  <Input
                    id="learningHours"
                    type="number"
                    value={formData.learningHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learningHours: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Hours"
                  />
                </div>
                <div>
                  <Label htmlFor="practicalHours">Practical Hours</Label>
                  <Input
                    id="practicalHours"
                    type="number"
                    value={formData.practicalHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        practicalHours: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Hours"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="Department name"
                  />
                </div>
                <div>
                  <Label htmlFor="faculty">Faculty</Label>
                  <Input
                    id="faculty"
                    value={formData.faculty}
                    onChange={(e) =>
                      setFormData({ ...formData, faculty: e.target.value })
                    }
                    placeholder="Faculty name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the course content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Course Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "Mandatory" | "Elective") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxCapacity">Max Capacity</Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxCapacity: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Maximum students"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="competencyScale">Competency Scale</Label>
                <Select
                  value={formData.competencyScale}
                  onValueChange={(value) =>
                    setFormData({ ...formData, competencyScale: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select competency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {competencyScales.map((scale) => (
                      <SelectItem key={scale} value={scale}>
                        {scale}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Learning Outcomes</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Algorithm Design",
                    "Problem Solving",
                    "Critical Thinking",
                    "Technical Writing",
                    "Team Collaboration",
                    "Project Management",
                    "Data Analysis",
                    "System Design",
                  ].map((outcome) => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={`outcome-${outcome}`}
                        checked={formData.outcomes.includes(outcome)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "outcomes",
                            outcome,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`outcome-${outcome}`} className="text-sm">
                        {outcome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Prerequisites</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Programming Fundamentals",
                    "Mathematics",
                    "Statistics",
                    "Data Structures",
                    "Database Systems",
                    "Web Development",
                    "Linear Algebra",
                    "Discrete Mathematics",
                  ].map((prereq) => (
                    <div key={prereq} className="flex items-center space-x-2">
                      <Checkbox
                        id={`prereq-${prereq}`}
                        checked={formData.prerequisites.includes(prereq)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "prerequisites",
                            prereq,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`prereq-${prereq}`} className="text-sm">
                        {prereq}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div>
                <Label>Enrollment Mode</Label>
                <RadioGroup
                  value={formData.enrollmentMode}
                  onValueChange={(value: "manual" | "self" | "api" | "bulk") =>
                    setFormData({ ...formData, enrollmentMode: value })
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual">
                      Manual Enrollment (Admin/Faculty controlled)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self">
                      Self Enrollment (Students can join)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="api" id="api" />
                    <Label htmlFor="api">
                      API Integration (External system)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bulk" id="bulk" />
                    <Label htmlFor="bulk">
                      Bulk Enrollment (CSV/Excel upload)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="virtualClassroom"
                    checked={formData.virtualClassroom}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        virtualClassroom: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="virtualClassroom">
                    Enable Virtual Classroom (Zoom, Teams, Google Meet)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adaptiveLearning"
                    checked={formData.adaptiveLearning}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        adaptiveLearning: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="adaptiveLearning">
                    Adaptive Learning (Personalized learning paths)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="proctoring"
                    checked={formData.proctoring}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        proctoring: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="proctoring">
                    Enable Proctoring for Assessments
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gamificationEnabled"
                    checked={formData.gamificationEnabled}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        gamificationEnabled: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="gamificationEnabled">
                    Gamification (Badges, Points, Leaderboards)
                  </Label>
                </div>
              </div>

              <div>
                <Label>Collaboration Tools</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {collaborationTools.map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={`collab-${tool}`}
                        checked={formData.collaborationTools.includes(tool)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "collaborationTools",
                            tool,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`collab-${tool}`} className="text-sm">
                        {tool}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label>Content Types</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {contentTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`content-${type}`}
                        checked={formData.contentTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "contentTypes",
                            type,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`content-${type}`} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Learning Activities</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {activityTypes.map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`activity-${activity}`}
                        checked={formData.activities.includes(activity)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "activities",
                            activity,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`activity-${activity}`}
                        className="text-sm"
                      >
                        {activity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>System Integrations</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {integrationOptions.map((integration) => (
                    <div
                      key={integration}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`integration-${integration}`}
                        checked={formData.integrations.includes(integration)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "integrations",
                            integration,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`integration-${integration}`}
                        className="text-sm"
                      >
                        {integration}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div>
                <Label htmlFor="status">Course Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Notification Settings</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {notificationTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`notification-${type}`}
                        checked={formData.notifications.includes(type)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "notifications",
                            type,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`notification-${type}`}
                        className="text-sm"
                      >
                        {type} Notifications
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Digital Badges</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Course Completion",
                    "Excellence Award",
                    "Top Performer",
                    "Quick Learner",
                    "Collaborative Student",
                    "Innovation Award",
                    "Perfect Attendance",
                    "Assignment Master",
                  ].map((badge) => (
                    <div key={badge} className="flex items-center space-x-2">
                      <Checkbox
                        id={`badge-${badge}`}
                        checked={formData.badges.includes(badge)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "badges",
                            badge,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`badge-${badge}`} className="text-sm">
                        {badge}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Certificates</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Course Completion Certificate",
                    "Participation Certificate",
                    "Excellence Certificate",
                    "Advanced Certificate",
                    "Specialization Certificate",
                    "Professional Certificate",
                  ].map((certificate) => (
                    <div
                      key={certificate}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`cert-${certificate}`}
                        checked={formData.certificates.includes(certificate)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "certificates",
                            certificate,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`cert-${certificate}`}
                        className="text-sm"
                      >
                        {certificate}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manual Enrollment Dialog */}
      <Dialog
        open={isEnrollmentDialogOpen}
        onOpenChange={setIsEnrollmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Student Enrollment</DialogTitle>
            <DialogDescription>
              Enroll a student in a course manually
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="enrollment-course">Course</Label>
              <Select
                value={enrollmentData.courseId}
                onValueChange={(value) =>
                  setEnrollmentData({ ...enrollmentData, courseId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="enrollment-student">Student ID</Label>
              <Input
                id="enrollment-student"
                value={enrollmentData.studentId}
                onChange={(e) =>
                  setEnrollmentData({
                    ...enrollmentData,
                    studentId: e.target.value,
                  })
                }
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <Label htmlFor="enrollment-notes">Notes (Optional)</Label>
              <Textarea
                id="enrollment-notes"
                value={enrollmentData.notes}
                onChange={(e) =>
                  setEnrollmentData({
                    ...enrollmentData,
                    notes: e.target.value,
                  })
                }
                placeholder="Additional notes"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEnrollmentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEnrollStudent}>Enroll Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Enrollment Dialog */}
      <Dialog
        open={isBulkEnrollmentDialogOpen}
        onOpenChange={setIsBulkEnrollmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Student Enrollment</DialogTitle>
            <DialogDescription>
              Upload CSV or Excel file to enroll multiple students
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bulk-file">Select File</Label>
              <Input
                id="bulk-file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) =>
                  setBulkEnrollmentFile(e.target.files?.[0] || null)
                }
              />
              <div className="text-sm text-muted-foreground mt-2">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">File Format Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Column 1: Student ID</li>
                <li>• Column 2: Course Code</li>
                <li>• Column 3: Enrollment Date (optional)</li>
                <li>• Column 4: Notes (optional)</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBulkEnrollmentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkEnrollmentFromFile}
              disabled={!bulkEnrollmentFile}
            >
              Process Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information and LMS features.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="learning">Learning Setup</TabsTrigger>
              <TabsTrigger value="features">LMS Features</TabsTrigger>
              <TabsTrigger value="content">Content & Tools</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-code">Course Code</Label>
                  <Input
                    id="edit-code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-subcategory">Subcategory</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Course Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the course content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-credits">Credit Points</Label>
                  <Input
                    id="edit-credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Credits"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-learningHours">Learning Hours</Label>
                  <Input
                    id="edit-learningHours"
                    type="number"
                    value={formData.learningHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learningHours: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Hours"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-maxCapacity">Max Capacity</Label>
                  <Input
                    id="edit-maxCapacity"
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxCapacity: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Maximum students"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-virtualClassroom"
                    checked={formData.virtualClassroom}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        virtualClassroom: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-virtualClassroom">
                    Enable Virtual Classroom
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-adaptiveLearning"
                    checked={formData.adaptiveLearning}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        adaptiveLearning: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-adaptiveLearning">
                    Adaptive Learning
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-proctoring"
                    checked={formData.proctoring}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        proctoring: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-proctoring">Enable Proctoring</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-gamificationEnabled"
                    checked={formData.gamificationEnabled}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        gamificationEnabled: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-gamificationEnabled">Gamification</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label>Content Types</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {contentTypes.slice(0, 6).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-content-${type}`}
                        checked={formData.contentTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "contentTypes",
                            type,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`edit-content-${type}`}
                        className="text-sm"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div>
                <Label htmlFor="edit-status">Course Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              Complete course information and LMS features
            </DialogDescription>
          </DialogHeader>

          {selectedCourse && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <BookOpenCheck className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedCourse.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCourse.code} • {selectedCourse.category}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        selectedCourse.type === "Mandatory"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedCourse.type}
                    </Badge>
                    <Badge
                      variant={
                        selectedCourse.status === "Active"
                          ? "default"
                          : "outline"
                      }
                    >
                      {selectedCourse.status}
                    </Badge>
                    <Badge variant="outline">
                      {selectedCourse.competencyScale}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {selectedCourse.enrollmentMode}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      COURSE STRUCTURE
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Credits:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.credits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Learning Hours:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.learningHours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Practical Hours:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.practicalHours}h
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      ENROLLMENT
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Capacity</span>
                        <span className="text-sm">
                          {selectedCourse.enrolled}/{selectedCourse.maxCapacity}
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedCourse.enrolled /
                            selectedCourse.maxCapacity) *
                          100
                        }
                        className="w-full h-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      LMS FEATURES
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Virtual Classroom:</span>
                        <span className="text-sm">
                          {selectedCourse.virtualClassroom
                            ? "✓ Enabled"
                            : "✗ Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Adaptive Learning:</span>
                        <span className="text-sm">
                          {selectedCourse.adaptiveLearning
                            ? "✓ Enabled"
                            : "✗ Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Proctoring:</span>
                        <span className="text-sm">
                          {selectedCourse.proctoring
                            ? "✓ Enabled"
                            : "✗ Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gamification:</span>
                        <span className="text-sm">
                          {selectedCourse.gamificationEnabled
                            ? "✓ Enabled"
                            : "✗ Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      SCHEDULE
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Start Date:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.startDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">End Date:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Faculty:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.faculty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      PERFORMANCE
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">
                          {selectedCourse.completion}%
                        </span>
                      </div>
                      <Progress
                        value={selectedCourse.completion}
                        className="w-full h-2"
                      />
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">
                          {selectedCourse.rating}/5.0 rating
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      CONTENT STATISTICS
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Assignments:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.assignments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Assessments:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.assessments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Discussions:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.discussions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Certificates:</span>
                        <span className="text-sm font-medium">
                          {selectedCourse.certificatesGenerated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  DESCRIPTION
                </Label>
                <p className="text-sm mt-2 p-3 bg-muted rounded-md">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    LEARNING OUTCOMES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.outcomes.map((outcome) => (
                      <Badge
                        key={outcome}
                        variant="outline"
                        className="text-xs"
                      >
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    ACTIVITIES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.activities.map((activity) => (
                      <Badge
                        key={activity}
                        variant="secondary"
                        className="text-xs"
                      >
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    COLLABORATION TOOLS
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.collaborationTools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    CONTENT TYPES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.contentTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    INTEGRATIONS
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.integrations.map((integration) => (
                      <Badge
                        key={integration}
                        variant="outline"
                        className="text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    NOTIFICATIONS
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.notifications.map((notification) => (
                      <Badge
                        key={notification}
                        variant="outline"
                        className="text-xs"
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        {notification}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedCourse.prerequisites.length > 0 && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    PREREQUISITES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    DIGITAL BADGES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.badges.map((badge) => (
                      <Badge key={badge} variant="default" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    CERTIFICATES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.certificates.map((cert) => (
                      <Badge key={cert} variant="default" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            {user?.role === "admin" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  if (selectedCourse) openEditDialog(selectedCourse);
                }}
              >
                Edit Course
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Learning Path Dialog */}
      <Dialog
        open={isCreateLearningPathDialogOpen}
        onOpenChange={setIsCreateLearningPathDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Learning Path</DialogTitle>
            <DialogDescription>
              Create a structured learning pathway
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="path-name">Path Name</Label>
              <Input
                id="path-name"
                value={learningPathFormData.name}
                onChange={(e) =>
                  setLearningPathFormData({
                    ...learningPathFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter path name"
              />
            </div>
            <div>
              <Label htmlFor="path-description">Description</Label>
              <Textarea
                id="path-description"
                value={learningPathFormData.description}
                onChange={(e) =>
                  setLearningPathFormData({
                    ...learningPathFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the learning path"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="path-sequencing">Sequencing</Label>
                <Select
                  value={learningPathFormData.sequencing}
                  onValueChange={(value: "linear" | "adaptive" | "flexible") =>
                    setLearningPathFormData({
                      ...learningPathFormData,
                      sequencing: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sequencing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="adaptive">Adaptive</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="path-duration">Duration (weeks)</Label>
                <Input
                  id="path-duration"
                  type="number"
                  value={learningPathFormData.estimatedDuration}
                  onChange={(e) =>
                    setLearningPathFormData({
                      ...learningPathFormData,
                      estimatedDuration: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Duration"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateLearningPathDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateLearningPath}>Create Path</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Learning Path Dialog */}
      <Dialog
        open={isEditLearningPathDialogOpen}
        onOpenChange={setIsEditLearningPathDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Learning Path</DialogTitle>
            <DialogDescription>
              Update learning path information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-path-name">Path Name</Label>
              <Input
                id="edit-path-name"
                value={learningPathFormData.name}
                onChange={(e) =>
                  setLearningPathFormData({
                    ...learningPathFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter path name"
              />
            </div>
            <div>
              <Label htmlFor="edit-path-description">Description</Label>
              <Textarea
                id="edit-path-description"
                value={learningPathFormData.description}
                onChange={(e) =>
                  setLearningPathFormData({
                    ...learningPathFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the learning path"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-path-sequencing">Sequencing</Label>
                <Select
                  value={learningPathFormData.sequencing}
                  onValueChange={(value: "linear" | "adaptive" | "flexible") =>
                    setLearningPathFormData({
                      ...learningPathFormData,
                      sequencing: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sequencing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="adaptive">Adaptive</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-path-duration">Duration (weeks)</Label>
                <Input
                  id="edit-path-duration"
                  type="number"
                  value={learningPathFormData.estimatedDuration}
                  onChange={(e) =>
                    setLearningPathFormData({
                      ...learningPathFormData,
                      estimatedDuration: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Duration"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditLearningPathDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateLearningPath}>Update Path</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Notification Template Dialog */}
      <Dialog
        open={isCreateNotificationDialogOpen}
        onOpenChange={setIsCreateNotificationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Notification Template</DialogTitle>
            <DialogDescription>
              Create a new notification template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notif-name">Template Name</Label>
              <Input
                id="notif-name"
                value={notificationFormData.name}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter template name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notif-type">Type</Label>
                <Select
                  value={notificationFormData.type}
                  onValueChange={(value: "email" | "sms" | "push" | "in-app") =>
                    setNotificationFormData({
                      ...notificationFormData,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                    <SelectItem value="in-app">In-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notif-trigger">Trigger</Label>
                <Input
                  id="notif-trigger"
                  value={notificationFormData.trigger}
                  onChange={(e) =>
                    setNotificationFormData({
                      ...notificationFormData,
                      trigger: e.target.value,
                    })
                  }
                  placeholder="Event trigger"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notif-subject">Subject</Label>
              <Input
                id="notif-subject"
                value={notificationFormData.subject}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    subject: e.target.value,
                  })
                }
                placeholder="Notification subject"
              />
            </div>
            <div>
              <Label htmlFor="notif-content">Content</Label>
              <Textarea
                id="notif-content"
                value={notificationFormData.content}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    content: e.target.value,
                  })
                }
                placeholder="Notification content"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notif-active"
                checked={notificationFormData.active}
                onCheckedChange={(checked) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    active: checked as boolean,
                  })
                }
              />
              <Label htmlFor="notif-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateNotificationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateNotification}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notification Template Dialog */}
      <Dialog
        open={isEditNotificationDialogOpen}
        onOpenChange={setIsEditNotificationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notification Template</DialogTitle>
            <DialogDescription>Update notification template</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-notif-name">Template Name</Label>
              <Input
                id="edit-notif-name"
                value={notificationFormData.name}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter template name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-notif-type">Type</Label>
                <Select
                  value={notificationFormData.type}
                  onValueChange={(value: "email" | "sms" | "push" | "in-app") =>
                    setNotificationFormData({
                      ...notificationFormData,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                    <SelectItem value="in-app">In-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-notif-trigger">Trigger</Label>
                <Input
                  id="edit-notif-trigger"
                  value={notificationFormData.trigger}
                  onChange={(e) =>
                    setNotificationFormData({
                      ...notificationFormData,
                      trigger: e.target.value,
                    })
                  }
                  placeholder="Event trigger"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-notif-subject">Subject</Label>
              <Input
                id="edit-notif-subject"
                value={notificationFormData.subject}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    subject: e.target.value,
                  })
                }
                placeholder="Notification subject"
              />
            </div>
            <div>
              <Label htmlFor="edit-notif-content">Content</Label>
              <Textarea
                id="edit-notif-content"
                value={notificationFormData.content}
                onChange={(e) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    content: e.target.value,
                  })
                }
                placeholder="Notification content"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-notif-active"
                checked={notificationFormData.active}
                onCheckedChange={(checked) =>
                  setNotificationFormData({
                    ...notificationFormData,
                    active: checked as boolean,
                  })
                }
              />
              <Label htmlFor="edit-notif-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditNotificationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateNotification}>Update Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Virtual Session Dialog */}
      <Dialog
        open={isCreateVirtualSessionDialogOpen}
        onOpenChange={setIsCreateVirtualSessionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Virtual Session</DialogTitle>
            <DialogDescription>
              Schedule a new virtual class session
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="session-course">Course</Label>
              <Select
                value={virtualSessionFormData.courseId}
                onValueChange={(value) =>
                  setVirtualSessionFormData({
                    ...virtualSessionFormData,
                    courseId: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="session-title">Session Title</Label>
              <Input
                id="session-title"
                value={virtualSessionFormData.title}
                onChange={(e) =>
                  setVirtualSessionFormData({
                    ...virtualSessionFormData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter session title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="session-platform">Platform</Label>
                <Select
                  value={virtualSessionFormData.platform}
                  onValueChange={(value: "zoom" | "teams" | "meet" | "webex") =>
                    setVirtualSessionFormData({
                      ...virtualSessionFormData,
                      platform: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                    <SelectItem value="meet">Google Meet</SelectItem>
                    <SelectItem value="webex">WebEx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="session-duration">Duration (minutes)</Label>
                <Input
                  id="session-duration"
                  type="number"
                  value={virtualSessionFormData.duration}
                  onChange={(e) =>
                    setVirtualSessionFormData({
                      ...virtualSessionFormData,
                      duration: parseInt(e.target.value) || 60,
                    })
                  }
                  placeholder="Duration"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="session-date">Scheduled Date & Time</Label>
              <Input
                id="session-date"
                type="datetime-local"
                value={virtualSessionFormData.scheduledDate}
                onChange={(e) =>
                  setVirtualSessionFormData({
                    ...virtualSessionFormData,
                    scheduledDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateVirtualSessionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateVirtualSessionComplete}>
              Create Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Assignment Dialog */}
      <Dialog
        open={isCreateAssignmentDialogOpen}
        onOpenChange={setIsCreateAssignmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogDescription>
              Create a new course assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assignment-course">Course</Label>
              <Select
                value={assignmentFormData.courseId}
                onValueChange={(value) =>
                  setAssignmentFormData({
                    ...assignmentFormData,
                    courseId: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignment-title">Assignment Title</Label>
              <Input
                id="assignment-title"
                value={assignmentFormData.title}
                onChange={(e) =>
                  setAssignmentFormData({
                    ...assignmentFormData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter assignment title"
              />
            </div>
            <div>
              <Label htmlFor="assignment-description">Description</Label>
              <Textarea
                id="assignment-description"
                value={assignmentFormData.description}
                onChange={(e) =>
                  setAssignmentFormData({
                    ...assignmentFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Assignment description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignment-due">Due Date</Label>
                <Input
                  id="assignment-due"
                  type="date"
                  value={assignmentFormData.dueDate}
                  onChange={(e) =>
                    setAssignmentFormData({
                      ...assignmentFormData,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="assignment-points">Max Points</Label>
                <Input
                  id="assignment-points"
                  type="number"
                  value={assignmentFormData.maxPoints}
                  onChange={(e) =>
                    setAssignmentFormData({
                      ...assignmentFormData,
                      maxPoints: parseInt(e.target.value) || 100,
                    })
                  }
                  placeholder="Max points"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assignment-plagiarism"
                  checked={assignmentFormData.plagiarismCheck}
                  onCheckedChange={(checked) =>
                    setAssignmentFormData({
                      ...assignmentFormData,
                      plagiarismCheck: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="assignment-plagiarism">
                  Enable Plagiarism Check
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assignment-autograde"
                  checked={assignmentFormData.autoGrading}
                  onCheckedChange={(checked) =>
                    setAssignmentFormData({
                      ...assignmentFormData,
                      autoGrading: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="assignment-autograde">Auto Grading</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateAssignmentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAssignmentComplete}>
              Create Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Assessment Dialog */}
      <Dialog
        open={isCreateAssessmentDialogOpen}
        onOpenChange={setIsCreateAssessmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Assessment</DialogTitle>
            <DialogDescription>
              Create a new course assessment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assessment-course">Course</Label>
              <Select
                value={assessmentFormData.courseId}
                onValueChange={(value) =>
                  setAssessmentFormData({
                    ...assessmentFormData,
                    courseId: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assessment-title">Assessment Title</Label>
              <Input
                id="assessment-title"
                value={assessmentFormData.title}
                onChange={(e) =>
                  setAssessmentFormData({
                    ...assessmentFormData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter assessment title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assessment-type">Type</Label>
                <Select
                  value={assessmentFormData.type}
                  onValueChange={(
                    value: "quiz" | "exam" | "survey" | "assignment"
                  ) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="survey">Survey</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assessment-questions">
                  Number of Questions
                </Label>
                <Input
                  id="assessment-questions"
                  type="number"
                  value={assessmentFormData.questions}
                  onChange={(e) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      questions: parseInt(e.target.value) || 10,
                    })
                  }
                  placeholder="Questions"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assessment-duration">Duration (minutes)</Label>
                <Input
                  id="assessment-duration"
                  type="number"
                  value={assessmentFormData.duration}
                  onChange={(e) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      duration: parseInt(e.target.value) || 30,
                    })
                  }
                  placeholder="Duration"
                />
              </div>
              <div>
                <Label htmlFor="assessment-attempts">Attempts Allowed</Label>
                <Input
                  id="assessment-attempts"
                  type="number"
                  value={assessmentFormData.attempts}
                  onChange={(e) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      attempts: parseInt(e.target.value) || 1,
                    })
                  }
                  placeholder="Attempts"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assessment-autograde"
                  checked={assessmentFormData.autoGrade}
                  onCheckedChange={(checked) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      autoGrade: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="assessment-autograde">Auto Grade</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assessment-proctor"
                  checked={assessmentFormData.proctored}
                  onCheckedChange={(checked) =>
                    setAssessmentFormData({
                      ...assessmentFormData,
                      proctored: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="assessment-proctor">Proctored</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateAssessmentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAssessmentComplete}>
              Create Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Course Management Dialog */}
      <Dialog
        open={isAdvancedCourseDialogOpen}
        onOpenChange={setIsAdvancedCourseDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Advanced Course Management</DialogTitle>
            <DialogDescription>
              Advanced tools for course management and configuration
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="bulk" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="bulk" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setIsBulkOperationsDialogOpen(true)}
                  className="h-20 flex-col"
                >
                  <Copy className="h-8 w-8 mb-2" />
                  Bulk Operations
                </Button>
                <Button
                  onClick={() => setIsExportOptionsDialogOpen(true)}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <Download className="h-8 w-8 mb-2" />
                  Export Options
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={() => handleApplyTemplate("computer-science")}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <FileText className="h-8 w-8 mb-2" />
                  Computer Science
                </Button>
                <Button
                  onClick={() => handleApplyTemplate("engineering")}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <Settings className="h-8 w-8 mb-2" />
                  Engineering
                </Button>
                <Button
                  onClick={() => handleApplyTemplate("business")}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <TrendingUp className="h-8 w-8 mb-2" />
                  Business
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleLTIIntegration}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <Zap className="h-8 w-8 mb-2" />
                  LTI Integration
                </Button>
                <Button
                  onClick={handleMoodleSync}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <Globe className="h-8 w-8 mb-2" />
                  Moodle Sync
                </Button>
                <Button
                  onClick={handleCanvasConnect}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <BookOpen className="h-8 w-8 mb-2" />
                  Canvas Connect
                </Button>
                <Button
                  onClick={handleBlackboardLink}
                  variant="outline"
                  className="h-20 flex-col"
                >
                  <Users className="h-8 w-8 mb-2" />
                  Blackboard Link
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Bulk Operations Dialog */}
      <Dialog
        open={isBulkOperationsDialogOpen}
        onOpenChange={setIsBulkOperationsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Operations</DialogTitle>
            <DialogDescription>
              Perform bulk operations on {selectedCourses.length} selected
              course(s)
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleBulkDuplicate}
              disabled={selectedCourses.length === 0}
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate Selected
            </Button>
            <Button
              onClick={handleBulkArchive}
              disabled={selectedCourses.length === 0}
              variant="outline"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Selected
            </Button>
            <Button
              onClick={handleBulkEnrollment}
              disabled={selectedCourses.length === 0}
              variant="outline"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Bulk Enrollment
            </Button>
            <Button
              onClick={handleBulkGenerateCertificates}
              disabled={selectedCourses.length === 0}
              variant="outline"
            >
              <Award className="h-4 w-4 mr-2" />
              Generate Certificates
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBulkOperationsDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Options Dialog */}
      <Dialog
        open={isExportOptionsDialogOpen}
        onOpenChange={setIsExportOptionsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Options</DialogTitle>
            <DialogDescription>
              Choose export format and data type
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleExportCSV}>
              <FileText className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button onClick={handleExportExcel} variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export as Excel
            </Button>
            <Button onClick={handleExportGrades} variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
            <Button onClick={handleExportAnalytics} variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsExportOptionsDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Bank Dialog */}
      <Dialog
        open={isQuestionBankDialogOpen}
        onOpenChange={setIsQuestionBankDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Question Bank Management</DialogTitle>
            <DialogDescription>
              Manage your question banks and assessment tools
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Button onClick={handleCreateQuestionBank}>
                <Plus className="h-4 w-4 mr-2" />
                New Bank
              </Button>
              <Button onClick={handleViewQuestionBank} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button onClick={handleEditQuestionBank} variant="outline">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => setIsCreateQuestionDialogOpen(true)}
                variant="outline"
              >
                <FileText className="h-4 w-4 mr-2" />
                Create Questions
              </Button>
              <Button
                onClick={() => setIsBulkImportDialogOpen(true)}
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Quick Analytics</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleViewPerformance} variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Performance
                </Button>
                <Button onClick={handleAnalyseQuestions} variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  Analyse Questions
                </Button>
                <Button onClick={handleTimePatterns} variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Patterns
                </Button>
                <Button onClick={handleCheckAnomalies} variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Check Anomalies
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Export Options</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleExportResults} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
                <Button onClick={handleExportQuestions} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Questions
                </Button>
                <Button
                  onClick={() => handleExportAnalytics()}
                  variant="outline"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Analytics
                </Button>
                <Button onClick={handleExportResponses} variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Export Responses
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Assessment Grading</h4>
              <div className="flex gap-4">
                <Button onClick={handleOpenGradingInterface}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Open Grading Interface
                </Button>
                <Button
                  onClick={handleContinueManualInterface}
                  variant="outline"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Continue Manual Interface
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Question Dialog */}
      <Dialog
        open={isCreateQuestionDialogOpen}
        onOpenChange={setIsCreateQuestionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Question</DialogTitle>
            <DialogDescription>
              Add a new question to the question bank
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Question Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="short">Short Answer</SelectItem>
                  <SelectItem value="long">Long Answer</SelectItem>
                  <SelectItem value="numerical">Numerical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Question Text</Label>
              <Textarea placeholder="Enter your question..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleSaveDraft}>
              <FileText className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleAddQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Dialog */}
      <Dialog
        open={isBulkImportDialogOpen}
        onOpenChange={setIsBulkImportDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Import</DialogTitle>
            <DialogDescription>
              Import questions, assessments, or QTI packages
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={handleChooseFile} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <Button onClick={handleDownloadTemplate} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>

            {bulkImportFile && (
              <div className="p-4 border rounded-lg bg-muted">
                <p className="text-sm">Selected file: {bulkImportFile.name}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <Button
                onClick={handleImportQuestions}
                disabled={!bulkImportFile}
              >
                <FileText className="h-4 w-4 mr-2" />
                Import Questions
              </Button>
              <Button
                onClick={handleImportAssessment}
                disabled={!bulkImportFile}
                variant="outline"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Import Assessment
              </Button>
              <Button
                onClick={handleImportQTI}
                disabled={!bulkImportFile}
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import QTI Package
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBulkImportDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filter Dialog */}
      <Dialog
        open={isAdvancedFilterDialogOpen}
        onOpenChange={setIsAdvancedFilterDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
            <DialogDescription>
              Apply advanced filtering options
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date Range</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Instructor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Instructors</SelectItem>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Prof. Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Enrollment Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Credit Hours</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Credits</SelectItem>
                    <SelectItem value="1-2">1-2 Credits</SelectItem>
                    <SelectItem value="3-4">3-4 Credits</SelectItem>
                    <SelectItem value="5+">5+ Credits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleResetFilters}>
              <XCircle className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
            <Button onClick={handleApplyFilters}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Analytics Dialog */}
      <Dialog
        open={isQuickAnalyticsDialogOpen}
        onOpenChange={setIsQuickAnalyticsDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Quick Analytics</DialogTitle>
            <DialogDescription>
              Analyze performance and patterns
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="font-medium mb-4">Performance Analytics</h4>
              <div className="space-y-2">
                <Button
                  onClick={handleViewPerformance}
                  className="w-full justify-start"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Performance
                </Button>
                <Button
                  onClick={handleAnalyseQuestions}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Analyse Questions
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-4">Pattern Analysis</h4>
              <div className="space-y-2">
                <Button
                  onClick={handleTimePatterns}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Time Patterns
                </Button>
                <Button
                  onClick={handleCheckAnomalies}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Check Anomalies
                </Button>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Grading Interface Dialog */}
      <Dialog
        open={isGradingInterfaceDialogOpen}
        onOpenChange={setIsGradingInterfaceDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Assessment Grading Interface</DialogTitle>
            <DialogDescription>
              Grade assessments and manage scoring
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Auto Grading</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Automatically grade multiple choice and numerical questions
                </p>
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Auto Grading
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Manual Grading</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Manually review and grade essay questions
                </p>
                <Button
                  onClick={handleContinueManualInterface}
                  variant="outline"
                  className="w-full"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Continue Manual Grading
                </Button>
              </Card>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Grading Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">
                    Total Submissions
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">38</p>
                  <p className="text-sm text-muted-foreground">Auto Graded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">
                    Pending Review
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGradingInterfaceDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
