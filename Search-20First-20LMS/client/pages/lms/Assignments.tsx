import React, { useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { PermissionGuard, usePermissions } from "@/components/PermissionGuard";
import {
  ClipboardList,
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  FileText,
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  Filter,
  BarChart3,
  MessageSquare,
  PenTool,
  Users,
  GraduationCap,
  AlertTriangle,
  Settings,
  Mic,
  Video,
  Save,
  ZoomIn,
  Image,
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  course: string;
  courseId: string;
  instructor: string;
  description: string;
  dueDate: string;
  createdDate: string;
  submissions: number;
  totalStudents: number;
  status: "Draft" | "Active" | "Closed" | "Graded";
  type:
    | "Essay"
    | "Problem Set"
    | "Lab Report"
    | "Project"
    | "Quiz"
    | "Research Paper";
  maxPoints: number;
  gradingMethod: "Manual" | "Rubric" | "Auto" | "Peer Review";
  allowLateness: boolean;
  latePenalty: number;
  attempts: number;
  fileFormats: string[];
  plagiarismCheck: boolean;
  peerReview: boolean;
  anonymousGrading: boolean;
  groupAssignment: boolean;
  rubricCriteria: string[];
  learningOutcomes: string[];
  avgScore: number;
  submissionMethod: "Upload" | "Text" | "Both";
  annotationsEnabled: boolean;
  feedbackType: "Written" | "Audio" | "Video" | "All";
}

const initialAssignments: Assignment[] = [
  {
    id: "A001",
    title: "Data Structures Implementation",
    course: "Data Structures & Algorithms",
    courseId: "CS301",
    instructor: "Dr. John Smith",
    description:
      "Implement basic data structures including linked lists, stacks, and queues with comprehensive documentation.",
    dueDate: "2024-02-15",
    createdDate: "2024-01-15",
    submissions: 23,
    totalStudents: 30,
    status: "Active",
    type: "Problem Set",
    maxPoints: 100,
    gradingMethod: "Rubric",
    allowLateness: true,
    latePenalty: 10,
    attempts: 2,
    fileFormats: ["py", "java", "cpp", "pdf"],
    plagiarismCheck: true,
    peerReview: false,
    anonymousGrading: false,
    groupAssignment: false,
    rubricCriteria: [
      "Code Quality",
      "Documentation",
      "Functionality",
      "Testing",
    ],
    learningOutcomes: [
      "Algorithm Implementation",
      "Code Documentation",
      "Problem Solving",
    ],
    avgScore: 85,
    submissionMethod: "Upload",
    annotationsEnabled: true,
    feedbackType: "All",
  },
  {
    id: "A002",
    title: "Machine Learning Research Paper",
    course: "Machine Learning Fundamentals",
    courseId: "CS401",
    instructor: "Dr. Alice Kumar",
    description:
      "Write a comprehensive research paper on a recent advancement in machine learning with proper citations and analysis.",
    dueDate: "2024-02-20",
    createdDate: "2024-01-20",
    submissions: 15,
    totalStudents: 28,
    status: "Active",
    type: "Research Paper",
    maxPoints: 150,
    gradingMethod: "Manual",
    allowLateness: false,
    latePenalty: 0,
    attempts: 1,
    fileFormats: ["pdf", "docx"],
    plagiarismCheck: true,
    peerReview: true,
    anonymousGrading: true,
    groupAssignment: false,
    rubricCriteria: [
      "Research Quality",
      "Writing Style",
      "Citations",
      "Analysis Depth",
    ],
    learningOutcomes: [
      "Research Skills",
      "Technical Writing",
      "Critical Analysis",
    ],
    avgScore: 78,
    submissionMethod: "Upload",
    annotationsEnabled: true,
    feedbackType: "Written",
  },
  {
    id: "A003",
    title: "Digital Marketing Campaign Analysis",
    course: "Digital Marketing Strategy",
    courseId: "MKT201",
    instructor: "Prof. Sarah Wilson",
    description:
      "Analyze a real-world digital marketing campaign and present findings with recommendations.",
    dueDate: "2024-02-10",
    createdDate: "2024-01-10",
    submissions: 32,
    totalStudents: 32,
    status: "Graded",
    type: "Project",
    maxPoints: 120,
    gradingMethod: "Rubric",
    allowLateness: true,
    latePenalty: 5,
    attempts: 1,
    fileFormats: ["pdf", "pptx", "mp4"],
    plagiarismCheck: true,
    peerReview: true,
    anonymousGrading: false,
    groupAssignment: true,
    rubricCriteria: [
      "Analysis Quality",
      "Presentation",
      "Recommendations",
      "Team Collaboration",
    ],
    learningOutcomes: [
      "Data Analysis",
      "Presentation Skills",
      "Strategic Thinking",
    ],
    avgScore: 92,
    submissionMethod: "Both",
    annotationsEnabled: true,
    feedbackType: "All",
  },
];

const assignmentTypes = [
  "Essay",
  "Problem Set",
  "Lab Report",
  "Project",
  "Quiz",
  "Research Paper",
];
const gradingMethods = ["Manual", "Rubric", "Auto", "Peer Review"];
const submissionMethods = ["Upload", "Text", "Both"];
const feedbackTypes = ["Written", "Audio", "Video", "All"];
const fileFormats = [
  "pdf",
  "docx",
  "txt",
  "py",
  "java",
  "cpp",
  "js",
  "html",
  "css",
  "pptx",
  "mp4",
  "zip",
];
const courses = [
  "Data Structures & Algorithms",
  "Machine Learning Fundamentals",
  "Digital Marketing Strategy",
  "Web Development",
  "Database Systems",
];

export default function Assignments() {
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions();
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    courseId: "",
    instructor: "",
    description: "",
    dueDate: "",
    type: "Essay" as Assignment["type"],
    maxPoints: 100,
    gradingMethod: "Manual" as Assignment["gradingMethod"],
    allowLateness: false,
    latePenalty: 0,
    attempts: 1,
    fileFormats: [] as string[],
    plagiarismCheck: false,
    peerReview: false,
    anonymousGrading: false,
    groupAssignment: false,
    rubricCriteria: [] as string[],
    learningOutcomes: [] as string[],
    submissionMethod: "Upload" as Assignment["submissionMethod"],
    annotationsEnabled: true,
    feedbackType: "Written" as Assignment["feedbackType"],
  });

  // Check if user has read access to assignments
  if (!canRead("assignments")) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            You don't have permission to view assignments.
          </p>
        </div>
      </div>
    );
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      assignment.status.toLowerCase() === statusFilter;
    const matchesType =
      typeFilter === "all" || assignment.type.toLowerCase() === typeFilter;
    const matchesCourse =
      courseFilter === "all" || assignment.course === courseFilter;

    // Role-based access: Students can only see published assignments for their courses
    const hasAccess =
      user?.role === "admin" ||
      user?.role === "faculty" ||
      (user?.role === "student" && assignment.status === "Published");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType &&
      matchesCourse &&
      hasAccess
    );
  });

  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "Active").length,
    submissions: assignments.reduce((sum, a) => sum + a.submissions, 0),
    avgGrade: Math.round(
      assignments.reduce((sum, a) => sum + a.avgScore, 0) / assignments.length,
    ),
    graded: assignments.filter((a) => a.status === "Graded").length,
    pending: assignments.filter(
      (a) => a.status === "Active" && a.submissions < a.totalStudents,
    ).length,
  };

  const resetForm = () => {
    setFormData({
      title: "",
      course: "",
      courseId: "",
      instructor: "",
      description: "",
      dueDate: "",
      type: "Essay",
      maxPoints: 100,
      gradingMethod: "Manual",
      allowLateness: false,
      latePenalty: 0,
      attempts: 1,
      fileFormats: [],
      plagiarismCheck: false,
      peerReview: false,
      anonymousGrading: false,
      groupAssignment: false,
      rubricCriteria: [],
      learningOutcomes: [],
      submissionMethod: "Upload",
      annotationsEnabled: true,
      feedbackType: "Written",
    });
  };

  const handleCreate = () => {
    const newAssignment: Assignment = {
      id: `A${String(assignments.length + 1).padStart(3, "0")}`,
      ...formData,
      submissions: 0,
      totalStudents: 30,
      status: "Draft",
      createdDate: new Date().toISOString().split("T")[0],
      avgScore: 0,
    };
    setAssignments([...assignments, newAssignment]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedAssignment) {
      setAssignments(
        assignments.map((assignment) =>
          assignment.id === selectedAssignment.id
            ? { ...assignment, ...formData }
            : assignment,
        ),
      );
      setIsEditDialogOpen(false);
      setSelectedAssignment(null);
      resetForm();
    }
  };

  const handleDelete = (assignmentId: string) => {
    setAssignments(
      assignments.filter((assignment) => assignment.id !== assignmentId),
    );
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      course: assignment.course,
      courseId: assignment.courseId,
      instructor: assignment.instructor,
      description: assignment.description,
      dueDate: assignment.dueDate,
      type: assignment.type,
      maxPoints: assignment.maxPoints,
      gradingMethod: assignment.gradingMethod,
      allowLateness: assignment.allowLateness,
      latePenalty: assignment.latePenalty,
      attempts: assignment.attempts,
      fileFormats: assignment.fileFormats,
      plagiarismCheck: assignment.plagiarismCheck,
      peerReview: assignment.peerReview,
      anonymousGrading: assignment.anonymousGrading,
      groupAssignment: assignment.groupAssignment,
      rubricCriteria: assignment.rubricCriteria,
      learningOutcomes: assignment.learningOutcomes,
      submissionMethod: assignment.submissionMethod,
      annotationsEnabled: assignment.annotationsEnabled,
      feedbackType: assignment.feedbackType,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsViewDialogOpen(true);
  };

  const openGradeDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsGradeDialogOpen(true);
  };

  const handleArrayFieldChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean,
  ) => {
    if (
      field === "fileFormats" ||
      field === "rubricCriteria" ||
      field === "learningOutcomes"
    ) {
      setFormData((prev) => ({
        ...prev,
        [field]: checked
          ? [...prev[field], value]
          : prev[field].filter((item) => item !== value),
      }));
    }
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          console.log("Processing bulk upload file:", file.name);
          alert(`Bulk upload initiated for file: ${file.name}`);
        } catch (error) {
          console.error("Error processing bulk upload:", error);
          alert("Error processing file. Please check the format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSubmissions = (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (assignment) {
      const blob = new Blob(
        [
          `Submissions for ${assignment.title}\nGenerated on: ${new Date().toISOString()}`,
        ],
        { type: "text/plain" },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${assignment.title}_submissions.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleBulkGradeUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          console.log("Processing bulk grade upload:", file.name);
          alert(`Bulk grade upload initiated for file: ${file.name}`);
        } catch (error) {
          console.error("Error processing bulk grade upload:", error);
          alert("Error processing grades file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assignment Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and grade assignments with rubrics, plagiarism
            detection, and detailed feedback
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => document.getElementById("bulk-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <input
            id="bulk-upload"
            type="file"
            accept=".csv,.xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleBulkUpload}
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl">
              <DialogHeader>
                <DialogTitle>Assignment Analytics Dashboard</DialogTitle>
                <DialogDescription>
                  Comprehensive analytics and insights for assignment
                  performance
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-sm text-muted-foreground">
                          Average Completion Rate
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">4.2/5</div>
                        <p className="text-sm text-muted-foreground">
                          Average Score
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">12%</div>
                        <p className="text-sm text-muted-foreground">
                          Late Submissions
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Grade Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>A (90-100%)</span>
                            <span>25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                          <div className="flex justify-between">
                            <span>B (80-89%)</span>
                            <span>35%</span>
                          </div>
                          <Progress value={35} className="h-2" />
                          <div className="flex justify-between">
                            <span>C (70-79%)</span>
                            <span>25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                          <div className="flex justify-between">
                            <span>D (60-69%)</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                          <div className="flex justify-between">
                            <span>F (Below 60%)</span>
                            <span>5%</span>
                          </div>
                          <Progress value={5} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Top Performing Assignments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Research Paper</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Lab Report #3</span>
                            <span className="text-sm font-medium">89%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Problem Set 5</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="submissions" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Submission Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Early (2+ days)</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">On Time</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Late (1-2 days)</span>
                            <span className="text-sm font-medium">12%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Very Late (3+ days)</span>
                            <span className="text-sm font-medium">8%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          File Format Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">PDF</span>
                            <span className="text-sm font-medium">60%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">DOCX</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">TXT</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="trends" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Performance Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        📈 Upward trend in submission quality over semester
                        <br />
                        📊 Average scores improved by 15% since midterm
                        <br />
                        ⏰ Late submission rate decreased by 8%
                        <br />
                        👥 Class participation increased by 22%
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Advanced Assignment Management</DialogTitle>
                <DialogDescription>
                  Advanced tools and bulk operations for assignment management
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="bulk" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                </TabsList>
                <TabsContent value="bulk" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="h-6 w-6 mb-2" />
                      <span>Bulk Grade Import</span>
                      <span className="text-xs text-muted-foreground">
                        CSV/Excel
                      </span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Export All Submissions</span>
                      <span className="text-xs text-muted-foreground">
                        ZIP Archive
                      </span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>Bulk Feedback</span>
                      <span className="text-xs text-muted-foreground">
                        Send to Multiple
                      </span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Clock className="h-6 w-6 mb-2" />
                      <span>Extend Deadlines</span>
                      <span className="text-xs text-muted-foreground">
                        Bulk Extension
                      </span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="automation" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-remind" />
                      <Label htmlFor="auto-remind">
                        Automatic deadline reminders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-grade" />
                      <Label htmlFor="auto-grade">
                        Auto-grade objective questions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="plagiarism-check" />
                      <Label htmlFor="plagiarism-check">
                        Automatic plagiarism detection
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="late-penalty" />
                      <Label htmlFor="late-penalty">
                        Automatic late penalty calculation
                      </Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="templates" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 flex-col">
                      <FileText className="h-5 w-5 mb-1" />
                      <span className="text-sm">Essay Assignment</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <PenTool className="h-5 w-5 mb-1" />
                      <span className="text-sm">Lab Report</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Target className="h-5 w-5 mb-1" />
                      <span className="text-sm">Problem Set</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <GraduationCap className="h-5 w-5 mb-1" />
                      <span className="text-sm">Research Project</span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="integration" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Turnitin Integration
                    </Button>
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Google Classroom
                    </Button>
                    <Button variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Canvas LTI
                    </Button>
                    <Button variant="outline">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Blackboard Sync
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <PermissionGuard resource="assignments" operation="create">
            <Button className="btn-primary" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </PermissionGuard>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Total Assignments
              </p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">{stats.active} active</p>
            </div>
            <ClipboardList className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Submissions</p>
              <p className="text-3xl font-bold text-green-900">
                {stats.submissions}
              </p>
              <p className="text-xs text-green-600">total received</p>
            </div>
            <Upload className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Avg Grade</p>
              <p className="text-3xl font-bold text-purple-900">
                {stats.avgGrade}%
              </p>
              <p className="text-xs text-purple-600">class average</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Graded</p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.graded}
              </p>
              <p className="text-xs text-orange-600">completed grading</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Pending</p>
              <p className="text-3xl font-bold text-red-900">{stats.pending}</p>
              <p className="text-xs text-red-600">need grading</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">On Time</p>
              <p className="text-3xl font-bold text-teal-900">94%</p>
              <p className="text-xs text-teal-600">submission rate</p>
            </div>
            <Clock className="h-8 w-8 text-teal-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            Assignment Directory
          </CardTitle>
          <CardDescription>
            Manage assignments with grading methods, plagiarism tools, and
            annotation features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {assignmentTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Advanced Assignment Filters</DialogTitle>
                  <DialogDescription>
                    Apply advanced filters and sorting options for assignment
                    directory
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="filters" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
                    <TabsTrigger value="sorting">Sorting Options</TabsTrigger>
                    <TabsTrigger value="export">Export Options</TabsTrigger>
                  </TabsList>
                  <TabsContent value="filters" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Grade Range Filter</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Grades</SelectItem>
                            <SelectItem value="90-100">90-100% (A)</SelectItem>
                            <SelectItem value="80-89">80-89% (B)</SelectItem>
                            <SelectItem value="70-79">70-79% (C)</SelectItem>
                            <SelectItem value="60-69">60-69% (D)</SelectItem>
                            <SelectItem value="below-60">
                              Below 60% (F)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Submission Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by submission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Submissions</SelectItem>
                            <SelectItem value="complete">
                              Fully Submitted
                            </SelectItem>
                            <SelectItem value="partial">
                              Partially Submitted
                            </SelectItem>
                            <SelectItem value="missing">
                              Missing Submissions
                            </SelectItem>
                            <SelectItem value="late">
                              Late Submissions
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-plagiarism" />
                        <Label htmlFor="filter-plagiarism">
                          Show only assignments with plagiarism detection
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-peer-review" />
                        <Label htmlFor="filter-peer-review">
                          Show only peer-reviewed assignments
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-group" />
                        <Label htmlFor="filter-group">
                          Show only group assignments
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-rubric" />
                        <Label htmlFor="filter-rubric">
                          Show only rubric-graded assignments
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sorting" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Sort By</Label>
                        <Select defaultValue="due-date">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="due-date">Due Date</SelectItem>
                            <SelectItem value="created-date">
                              Created Date
                            </SelectItem>
                            <SelectItem value="title">
                              Assignment Title
                            </SelectItem>
                            <SelectItem value="course">Course Name</SelectItem>
                            <SelectItem value="submission-rate">
                              Submission Rate
                            </SelectItem>
                            <SelectItem value="avg-grade">
                              Average Grade
                            </SelectItem>
                            <SelectItem value="max-points">
                              Maximum Points
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Sort Order</Label>
                        <Select defaultValue="asc">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="group-by-course" />
                        <Label htmlFor="group-by-course">Group by course</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="group-by-instructor" />
                        <Label htmlFor="group-by-instructor">
                          Group by instructor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="group-by-type" />
                        <Label htmlFor="group-by-type">
                          Group by assignment type
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="export" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export as CSV</span>
                        <span className="text-xs text-muted-foreground">
                          Assignment list
                        </span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export as Excel</span>
                        <span className="text-xs text-muted-foreground">
                          Formatted report
                        </span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Grades</span>
                        <span className="text-xs text-muted-foreground">
                          Grade book format
                        </span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Analytics</span>
                        <span className="text-xs text-muted-foreground">
                          Performance data
                        </span>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-submissions" />
                        <Label htmlFor="include-submissions">
                          Include submission data
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-grades" />
                        <Label htmlFor="include-grades">
                          Include grading information
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-feedback" />
                        <Label htmlFor="include-feedback">
                          Include feedback comments
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button variant="outline">Reset Filters</Button>
                  <Button>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Grading</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs mr-2">
                          {assignment.type}
                        </Badge>
                        {assignment.maxPoints} points
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">
                        {assignment.course}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assignment.instructor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{assignment.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {assignment.submissions}/{assignment.totalStudents}
                      </div>
                      <Progress
                        value={
                          (assignment.submissions / assignment.totalStudents) *
                          100
                        }
                        className="w-20 h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        {Math.round(
                          (assignment.submissions / assignment.totalStudents) *
                            100,
                        )}
                        % submitted
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">
                        {assignment.gradingMethod}
                      </Badge>
                      {assignment.avgScore > 0 && (
                        <div className="text-sm">
                          Avg: {assignment.avgScore}%
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.plagiarismCheck && (
                        <Badge variant="outline" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          Plagiarism
                        </Badge>
                      )}
                      {assignment.peerReview && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Peer Review
                        </Badge>
                      )}
                      {assignment.annotationsEnabled && (
                        <Badge variant="outline" className="text-xs">
                          <PenTool className="h-3 w-3 mr-1" />
                          Annotations
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assignment.status === "Active"
                          ? "default"
                          : assignment.status === "Graded"
                            ? "outline"
                            : assignment.status === "Draft"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(assignment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(assignment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openGradeDialog(assignment)}
                      >
                        <GraduationCap className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Assignment
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "
                              {assignment.title}"? This action cannot be undone
                              and will remove all submissions and grades.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(assignment.id)}
                            >
                              Delete Assignment
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

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogDescription>
              Modify assignment details, grading methods, and evaluation tools.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="grading">Grading Setup</TabsTrigger>
              <TabsTrigger value="submission">Submission Rules</TabsTrigger>
              <TabsTrigger value="features">Advanced Features</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Assignment Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-course">Course</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      setFormData({ ...formData, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-courseId">Course Code</Label>
                  <Input
                    id="edit-courseId"
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                    placeholder="e.g., CS301"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-instructor">Instructor</Label>
                  <Input
                    id="edit-instructor"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    placeholder="Instructor name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Assignment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Assignment["type"]) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the assignment requirements and objectives"
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="grading" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-maxPoints">Maximum Points</Label>
                  <Input
                    id="edit-maxPoints"
                    type="number"
                    value={formData.maxPoints}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxPoints: parseInt(e.target.value) || 100,
                      })
                    }
                    placeholder="Total points"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-gradingMethod">Grading Method</Label>
                  <Select
                    value={formData.gradingMethod}
                    onValueChange={(value: Assignment["gradingMethod"]) =>
                      setFormData({ ...formData, gradingMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Rubric Criteria (for Rubric grading)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Code Quality",
                    "Documentation",
                    "Functionality",
                    "Testing",
                    "Creativity",
                    "Research Quality",
                    "Writing Style",
                    "Citations",
                    "Analysis Depth",
                    "Presentation",
                  ].map((criteria) => (
                    <div key={criteria} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-criteria-${criteria}`}
                        checked={formData.rubricCriteria.includes(criteria)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "rubricCriteria",
                            criteria,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`edit-criteria-${criteria}`}
                        className="text-sm"
                      >
                        {criteria}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Learning Outcomes</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Algorithm Implementation",
                    "Problem Solving",
                    "Critical Thinking",
                    "Technical Writing",
                    "Research Skills",
                    "Data Analysis",
                    "Presentation Skills",
                    "Team Collaboration",
                  ].map((outcome) => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-outcome-${outcome}`}
                        checked={formData.learningOutcomes.includes(outcome)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "learningOutcomes",
                            outcome,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`edit-outcome-${outcome}`}
                        className="text-sm"
                      >
                        {outcome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="submission" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-submissionMethod">
                    Submission Method
                  </Label>
                  <Select
                    value={formData.submissionMethod}
                    onValueChange={(value: Assignment["submissionMethod"]) =>
                      setFormData({ ...formData, submissionMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {submissionMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-attempts">Maximum Attempts</Label>
                  <Input
                    id="edit-attempts"
                    type="number"
                    value={formData.attempts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attempts: parseInt(e.target.value) || 1,
                      })
                    }
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div>
                <Label>Allowed File Formats</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {fileFormats.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-format-${format}`}
                        checked={formData.fileFormats.includes(format)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "fileFormats",
                            format,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`edit-format-${format}`}
                        className="text-sm"
                      >
                        .{format}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-allowLateness"
                  checked={formData.allowLateness}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      allowLateness: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="edit-allowLateness">
                  Allow late submissions
                </Label>
              </div>

              {formData.allowLateness && (
                <div>
                  <Label htmlFor="edit-latePenalty">Late Penalty (%)</Label>
                  <Input
                    id="edit-latePenalty"
                    type="number"
                    value={formData.latePenalty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latePenalty: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    placeholder="Percentage deducted per day"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-plagiarismCheck"
                    checked={formData.plagiarismCheck}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        plagiarismCheck: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-plagiarismCheck">
                    Enable plagiarism detection
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-peerReview"
                    checked={formData.peerReview}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        peerReview: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-peerReview">Enable peer review</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-anonymousGrading"
                    checked={formData.anonymousGrading}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        anonymousGrading: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-anonymousGrading">
                    Anonymous grading
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-groupAssignment"
                    checked={formData.groupAssignment}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        groupAssignment: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-groupAssignment">Group assignment</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-annotationsEnabled"
                    checked={formData.annotationsEnabled}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        annotationsEnabled: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="edit-annotationsEnabled">
                    Enable answer sheet annotations
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-feedbackType">Feedback Type</Label>
                <Select
                  value={formData.feedbackType}
                  onValueChange={(value: Assignment["feedbackType"]) =>
                    setFormData({ ...formData, feedbackType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
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
            <Button onClick={handleEdit}>Update Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Assignment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Set up a new assignment with grading methods, rubrics, and
              evaluation tools.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="grading">Grading Setup</TabsTrigger>
              <TabsTrigger value="submission">Submission Rules</TabsTrigger>
              <TabsTrigger value="features">Advanced Features</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      setFormData({ ...formData, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseId">Course Code</Label>
                  <Input
                    id="courseId"
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                    placeholder="e.g., CS301"
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    placeholder="Instructor name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Assignment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Assignment["type"]) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the assignment requirements and objectives"
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="grading" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxPoints">Maximum Points</Label>
                  <Input
                    id="maxPoints"
                    type="number"
                    value={formData.maxPoints}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxPoints: parseInt(e.target.value) || 100,
                      })
                    }
                    placeholder="Total points"
                  />
                </div>
                <div>
                  <Label htmlFor="gradingMethod">Grading Method</Label>
                  <Select
                    value={formData.gradingMethod}
                    onValueChange={(value: Assignment["gradingMethod"]) =>
                      setFormData({ ...formData, gradingMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Rubric Criteria (for Rubric grading)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Code Quality",
                    "Documentation",
                    "Functionality",
                    "Testing",
                    "Creativity",
                    "Research Quality",
                    "Writing Style",
                    "Citations",
                    "Analysis Depth",
                    "Presentation",
                  ].map((criteria) => (
                    <div key={criteria} className="flex items-center space-x-2">
                      <Checkbox
                        id={`criteria-${criteria}`}
                        checked={formData.rubricCriteria.includes(criteria)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "rubricCriteria",
                            criteria,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`criteria-${criteria}`}
                        className="text-sm"
                      >
                        {criteria}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Learning Outcomes</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Algorithm Implementation",
                    "Problem Solving",
                    "Critical Thinking",
                    "Technical Writing",
                    "Research Skills",
                    "Data Analysis",
                    "Presentation Skills",
                    "Team Collaboration",
                  ].map((outcome) => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={`outcome-${outcome}`}
                        checked={formData.learningOutcomes.includes(outcome)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "learningOutcomes",
                            outcome,
                            checked as boolean,
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
            </TabsContent>

            <TabsContent value="submission" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="submissionMethod">Submission Method</Label>
                  <Select
                    value={formData.submissionMethod}
                    onValueChange={(value: Assignment["submissionMethod"]) =>
                      setFormData({ ...formData, submissionMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {submissionMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="attempts">Maximum Attempts</Label>
                  <Input
                    id="attempts"
                    type="number"
                    value={formData.attempts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attempts: parseInt(e.target.value) || 1,
                      })
                    }
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div>
                <Label>Allowed File Formats</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {fileFormats.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={`format-${format}`}
                        checked={formData.fileFormats.includes(format)}
                        onCheckedChange={(checked) =>
                          handleArrayFieldChange(
                            "fileFormats",
                            format,
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor={`format-${format}`} className="text-sm">
                        .{format}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowLateness"
                  checked={formData.allowLateness}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      allowLateness: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="allowLateness">Allow late submissions</Label>
              </div>

              {formData.allowLateness && (
                <div>
                  <Label htmlFor="latePenalty">Late Penalty (%)</Label>
                  <Input
                    id="latePenalty"
                    type="number"
                    value={formData.latePenalty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latePenalty: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    placeholder="Percentage deducted per day"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="plagiarismCheck"
                    checked={formData.plagiarismCheck}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        plagiarismCheck: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="plagiarismCheck">
                    Enable plagiarism detection
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="peerReview"
                    checked={formData.peerReview}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        peerReview: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="peerReview">Enable peer review</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymousGrading"
                    checked={formData.anonymousGrading}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        anonymousGrading: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="anonymousGrading">Anonymous grading</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="groupAssignment"
                    checked={formData.groupAssignment}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        groupAssignment: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="groupAssignment">Group assignment</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="annotationsEnabled"
                    checked={formData.annotationsEnabled}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        annotationsEnabled: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="annotationsEnabled">
                    Enable answer sheet annotations
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select
                  value={formData.feedbackType}
                  onValueChange={(value: Assignment["feedbackType"]) =>
                    setFormData({ ...formData, feedbackType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <Button onClick={handleCreate}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Assignment Details</DialogTitle>
            <DialogDescription>
              Complete assignment information and configuration
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <ClipboardList className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedAssignment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssignment.course} •{" "}
                    {selectedAssignment.instructor}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedAssignment.type}</Badge>
                    <Badge
                      variant={
                        selectedAssignment.status === "Active"
                          ? "default"
                          : "outline"
                      }
                    >
                      {selectedAssignment.status}
                    </Badge>
                    <Badge variant="secondary">
                      {selectedAssignment.gradingMethod}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      ASSIGNMENT DETAILS
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Max Points:</span>
                        <span className="text-sm font-medium">
                          {selectedAssignment.maxPoints}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Due Date:</span>
                        <span className="text-sm font-medium">
                          {selectedAssignment.dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attempts:</span>
                        <span className="text-sm font-medium">
                          {selectedAssignment.attempts}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      SUBMISSION RULES
                    </Label>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm">
                        Method: {selectedAssignment.submissionMethod}
                      </div>
                      <div className="text-sm">
                        Late Submissions:{" "}
                        {selectedAssignment.allowLateness
                          ? `Allowed (${selectedAssignment.latePenalty}% penalty)`
                          : "Not Allowed"}
                      </div>
                      <div className="text-sm">
                        File Formats:{" "}
                        {selectedAssignment.fileFormats.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      SUBMISSIONS
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">
                          {selectedAssignment.submissions}/
                          {selectedAssignment.totalStudents}
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedAssignment.submissions /
                            selectedAssignment.totalStudents) *
                          100
                        }
                        className="w-full h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(
                          (selectedAssignment.submissions /
                            selectedAssignment.totalStudents) *
                            100,
                        )}
                        % submitted
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      PERFORMANCE
                    </Label>
                    <div className="mt-2">
                      {selectedAssignment.avgScore > 0 ? (
                        <>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Average Score</span>
                            <span className="text-sm">
                              {selectedAssignment.avgScore}%
                            </span>
                          </div>
                          <Progress
                            value={selectedAssignment.avgScore}
                            className="w-full h-2"
                          />
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No grades available yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  DESCRIPTION
                </Label>
                <p className="text-sm mt-2 p-3 bg-muted rounded-md">
                  {selectedAssignment.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    RUBRIC CRITERIA
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAssignment.rubricCriteria.map((criteria) => (
                      <Badge
                        key={criteria}
                        variant="outline"
                        className="text-xs"
                      >
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    LEARNING OUTCOMES
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAssignment.learningOutcomes.map((outcome) => (
                      <Badge
                        key={outcome}
                        variant="secondary"
                        className="text-xs"
                      >
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  ENABLED FEATURES
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAssignment.plagiarismCheck && (
                    <Badge variant="default" className="text-xs">
                      <Target className="h-3 w-3 mr-1" />
                      Plagiarism Detection
                    </Badge>
                  )}
                  {selectedAssignment.peerReview && (
                    <Badge variant="default" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      Peer Review
                    </Badge>
                  )}
                  {selectedAssignment.annotationsEnabled && (
                    <Badge variant="default" className="text-xs">
                      <PenTool className="h-3 w-3 mr-1" />
                      Annotations
                    </Badge>
                  )}
                  {selectedAssignment.anonymousGrading && (
                    <Badge variant="default" className="text-xs">
                      Anonymous Grading
                    </Badge>
                  )}
                  {selectedAssignment.groupAssignment && (
                    <Badge variant="default" className="text-xs">
                      Group Assignment
                    </Badge>
                  )}
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
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                if (selectedAssignment) openEditDialog(selectedAssignment);
              }}
            >
              Edit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grading Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Grade Assignment</DialogTitle>
            <DialogDescription>
              Manage grading and provide detailed feedback with annotations
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedAssignment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssignment.submissions} submissions to grade •{" "}
                    {selectedAssignment.gradingMethod} grading
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Grading Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Graded:</span>
                        <span>
                          {selectedAssignment.status === "Graded"
                            ? selectedAssignment.submissions
                            : Math.floor(selectedAssignment.submissions * 0.7)}
                          /{selectedAssignment.submissions}
                        </span>
                      </div>
                      <Progress
                        value={
                          selectedAssignment.status === "Graded" ? 100 : 70
                        }
                        className="w-full h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        {selectedAssignment.status === "Graded"
                          ? "All submissions graded"
                          : "Grading in progress"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Grade Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average:</span>
                        <span>{selectedAssignment.avgScore}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Highest:</span>
                        <span>
                          {Math.min(100, selectedAssignment.avgScore + 15)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Lowest:</span>
                        <span>
                          {Math.max(0, selectedAssignment.avgScore - 20)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <Button className="w-full" variant="default">
                  <PenTool className="h-4 w-4 mr-2" />
                  Open Grading Interface
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    selectedAssignment &&
                    handleDownloadSubmissions(selectedAssignment.id)
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All Submissions
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("bulk-grade-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload Grades
                </Button>
                <input
                  id="bulk-grade-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleBulkGradeUpload}
                />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <Star className="h-5 w-5 mb-1" />
                        <span className="text-sm">Auto Grade</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Auto-Grade Assignment</DialogTitle>
                        <DialogDescription>
                          Configure automated grading for objective components
                        </DialogDescription>
                      </DialogHeader>
                      <AutoGradeDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <Users className="h-5 w-5 mb-1" />
                        <span className="text-sm">Peer Review</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Manage Peer Review</DialogTitle>
                        <DialogDescription>
                          Configure and monitor peer review assignments
                        </DialogDescription>
                      </DialogHeader>
                      <PeerReviewDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <Target className="h-5 w-5 mb-1" />
                        <span className="text-sm">Rubric Grade</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Rubric Grading Interface</DialogTitle>
                        <DialogDescription>
                          Grade submissions using detailed rubric criteria
                        </DialogDescription>
                      </DialogHeader>
                      <RubricGradingDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <PenTool className="h-5 w-5 mb-1" />
                        <span className="text-sm">Annotate</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Assignment Annotation Tool</DialogTitle>
                        <DialogDescription>
                          Annotate submissions with detailed feedback and
                          comments
                        </DialogDescription>
                      </DialogHeader>
                      <AnnotationDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <MessageSquare className="h-5 w-5 mb-1" />
                        <span className="text-sm">Feedback</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Comprehensive Feedback System</DialogTitle>
                        <DialogDescription>
                          Provide detailed written, audio, or video feedback
                        </DialogDescription>
                      </DialogHeader>
                      <FeedbackDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <BarChart3 className="h-5 w-5 mb-1" />
                        <span className="text-sm">Analytics</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <DialogTitle>Grading Analytics & Insights</DialogTitle>
                        <DialogDescription>
                          Analyze grading patterns and student performance
                          metrics
                        </DialogDescription>
                      </DialogHeader>
                      <GradingAnalyticsDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <CheckCircle className="h-5 w-5 mb-1" />
                        <span className="text-sm">Finalize</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Finalize Assignment Grading</DialogTitle>
                        <DialogDescription>
                          Review and finalize all grades before publishing to
                          students
                        </DialogDescription>
                      </DialogHeader>
                      <FinalizeGradingDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-12 flex-col">
                        <AlertTriangle className="h-5 w-5 mb-1" />
                        <span className="text-sm">Plagiarism</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Plagiarism Detection Results</DialogTitle>
                        <DialogDescription>
                          Review plagiarism detection results and similarity
                          reports
                        </DialogDescription>
                      </DialogHeader>
                      <PlagiarismDialog assignment={selectedAssignment} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {selectedAssignment.plagiarismCheck && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Plagiarism Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Scanned Submissions:</span>
                        <span>{selectedAssignment.submissions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Potential Issues:</span>
                        <span className="text-yellow-600">2 flagged</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        View Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGradeDialogOpen(false)}
            >
              Close
            </Button>
            <Button>
              <GraduationCap className="h-4 w-4 mr-2" />
              Open Full Grading Interface
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AutoGradeDialog({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return null;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Auto-Grading Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox defaultChecked />
              <Label>Enable objective grading for eligible submissions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox defaultChecked />
              <Label>Check document formatting and structure</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Preview Results</Button>
        <Button>
          <Star className="h-4 w-4 mr-2" />
          Run Auto-Grading
        </Button>
      </div>
    </div>
  );
}

function PeerReviewDialog({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return null;
  return (
    <Tabs defaultValue="setup" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="setup">Setup</TabsTrigger>
        <TabsTrigger value="monitor">Monitor</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
      </TabsList>
      <TabsContent value="setup" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Peer Review Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Reviews per submission</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 reviews</SelectItem>
                    <SelectItem value="3">3 reviews</SelectItem>
                    <SelectItem value="4">4 reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="monitor" className="space-y-4">
        <Card>
          <CardContent>
            <div className="text-center">Reviews completed: 67/90 (74%)</div>
            <Progress value={74} className="w-full h-2 mt-2" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="results" className="space-y-4">
        <Card>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average peer score:</span>
                <span className="text-sm font-medium">4.2/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function RubricGradingDialog({
  assignment,
}: {
  assignment: Assignment | null;
}) {
  if (!assignment) return null;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label>Select Student Submission</Label>
          <Select defaultValue="TN2401001">
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TN2401001">Arjun Kumar - Submitted</SelectItem>
              <SelectItem value="TN2401002">
                Priya Sharma - Submitted
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline">Rubric Grading Mode</Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Submission Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Submission Document</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Rubric Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignment.rubricCriteria.map((criteria) => (
                <div key={criteria} className="space-y-2">
                  <Label className="text-sm">{criteria}</Label>
                  <Input type="range" min="0" max="25" className="w-full" />
                  <Textarea
                    placeholder={`Comments for ${criteria}...`}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Save Draft</Button>
        <Button>Submit Grade</Button>
      </div>
    </div>
  );
}

function AnnotationDialog({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return null;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="TN2401001">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TN2401001">Arjun Kumar</SelectItem>
              <SelectItem value="TN2401002">Priya Sharma</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline">Page 1 of 5</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl">Document Viewer</p>
                  <p className="text-sm">Interactive annotation interface</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Annotation Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <PenTool className="h-4 w-4 mr-2" />
                Highlight
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeedbackDialog({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return null;
  return (
    <Tabs defaultValue="written" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="written">Written Feedback</TabsTrigger>
        <TabsTrigger value="audio">Audio Feedback</TabsTrigger>
        <TabsTrigger value="video">Video Feedback</TabsTrigger>
      </TabsList>
      <TabsContent value="written" className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Overall Comments</Label>
            <Textarea
              placeholder="Provide comprehensive feedback..."
              rows={6}
            />
          </div>
          <div>
            <Label>Strengths</Label>
            <Textarea placeholder="What the student did well..." rows={3} />
          </div>
          <div>
            <Label>Areas for Improvement</Label>
            <Textarea placeholder="Suggestions for improvement..." rows={3} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="audio" className="space-y-4">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">Record Audio Feedback</p>
              <Button>
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="video" className="space-y-4">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">Record Video Feedback</p>
              <Button>
                <Video className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function GradingAnalyticsDialog({
  assignment,
}: {
  assignment: Assignment | null;
}) {
  if (!assignment) return null;
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{assignment.avgScore}%</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">87%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="distribution" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">A (90-100%)</span>
                <span className="text-sm">27%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">B (80-89%)</span>
                <span className="text-sm">40%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="insights" className="space-y-4">
        <Card>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">
                  Strong Performance
                </div>
                <div className="text-blue-700">
                  Students excelled in problem-solving
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-900">
                  Areas for Improvement
                </div>
                <div className="text-yellow-700">
                  Documentation needs attention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function FinalizeGradingDialog({
  assignment,
}: {
  assignment: Assignment | null;
}) {
  if (!assignment) return null;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Grading Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {assignment.submissions}
              </div>
              <div className="text-sm text-muted-foreground">Graded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-muted-foreground">Missing</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Average Score:</span>
              <span className="text-sm font-medium">
                {assignment.avgScore}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Completion Rate:</span>
              <span className="text-sm font-medium">87%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Publication Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <Label>Send email notifications to students</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <Label>Include detailed feedback in notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox />
            <Label>Allow grade appeals for 7 days</Label>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Save as Draft</Button>
        <Button variant="outline">Preview Notifications</Button>
        <Button>
          <CheckCircle className="h-4 w-4 mr-2" />
          Publish Grades
        </Button>
      </div>
    </div>
  );
}

function PlagiarismDialog({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return null;
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
        <TabsTrigger value="settings">Detection Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <p className="text-sm text-muted-foreground">Clean Submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">13%</div>
              <p className="text-sm text-muted-foreground">
                Flagged for Review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">0%</div>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Flagged Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { student: "John Doe", similarity: 23, sources: 2 },
                { student: "Jane Smith", similarity: 18, sources: 1 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div>
                    <div className="font-medium">{item.student}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.sources} sources detected
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.similarity > 20 ? "destructive" : "secondary"
                      }
                    >
                      {item.similarity}% similarity
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Detailed Similarity Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg mb-2">Plagiarism Report</p>
                <p className="text-sm">
                  Detailed similarity analysis would appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Detection Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Sensitivity Level</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (30%+ similarity)</SelectItem>
                  <SelectItem value="medium">
                    Medium (20%+ similarity)
                  </SelectItem>
                  <SelectItem value="high">High (10%+ similarity)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked />
                <Label>Check against internet sources</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked />
                <Label>Check against academic databases</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
