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
import { useAuth } from "@/contexts/AuthContext";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Clock,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Settings,
  Filter,
  Upload,
  Download,
  Users,
  CheckCircle,
  XCircle,
  Target,
  Shield,
  MoreVertical,
  Bell,
  Archive,
  BarChart3,
} from "lucide-react";

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
  course?: string;
  type?: string;
  graded?: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  faculty: string;
}

const mockCourses: Course[] = [
  {
    id: "C001",
    name: "Data Structures & Algorithms",
    code: "CS301",
    faculty: "Madhan",
  },
  {
    id: "C002",
    name: "Machine Learning Fundamentals",
    code: "AI301",
    faculty: "Madhan",
  },
  {
    id: "C003",
    name: "Web Development with React",
    code: "WD401",
    faculty: "Madhan",
  },
  {
    id: "C004",
    name: "Database Management Systems",
    code: "DB301",
    faculty: "Madhan",
  },
];

const mockAssignments: Assignment[] = [
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
    course: "Data Structures & Algorithms",
    type: "Programming",
    graded: 35,
  },
  {
    id: "A002",
    courseId: "C002",
    title: "ML Model Training Project",
    description:
      "Train and evaluate a machine learning model on provided dataset",
    dueDate: "2024-03-05",
    maxPoints: 120,
    submissions: 15,
    plagiarismCheck: true,
    autoGrading: true,
    status: "active",
    course: "Machine Learning Fundamentals",
    type: "Project",
    graded: 10,
  },
  {
    id: "A003",
    courseId: "C003",
    title: "Portfolio Website Development",
    description:
      "Create a personal portfolio website using React and modern web technologies",
    dueDate: "2024-03-25",
    maxPoints: 200,
    submissions: 35,
    plagiarismCheck: true,
    autoGrading: false,
    status: "active",
    course: "Web Development with React",
    type: "Project",
    graded: 30,
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
    course: "Data Structures & Algorithms",
    type: "Report",
    graded: 0,
  },
];

export default function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [courses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    description: "",
    dueDate: "",
    maxPoints: 100,
    type: "individual",
    plagiarismCheck: true,
    autoGrading: false,
    instructions: "",
  });

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || assignment.courseId === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      courseId: "",
      description: "",
      dueDate: "",
      maxPoints: 100,
      type: "individual",
      plagiarismCheck: true,
      autoGrading: false,
      instructions: "",
    });
  };

  const handleCreate = () => {
    const newAssignment: Assignment = {
      id: `A${String(assignments.length + 1).padStart(3, "0")}`,
      courseId: formData.courseId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      maxPoints: formData.maxPoints,
      submissions: 0,
      plagiarismCheck: formData.plagiarismCheck,
      autoGrading: formData.autoGrading,
      status: "draft",
      course: courses.find((c) => c.id === formData.courseId)?.name || "",
      type: formData.type,
      graded: 0,
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

  const openEditDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      courseId: assignment.courseId,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxPoints: assignment.maxPoints,
      type: assignment.type || "individual",
      plagiarismCheck: assignment.plagiarismCheck,
      autoGrading: assignment.autoGrading,
      instructions: "",
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "closed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const stats = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "active").length,
    submitted: assignments.reduce((sum, a) => sum + a.submissions, 0),
    graded: assignments.reduce((sum, a) => sum + (a.graded || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and grade assignments with plagiarism detection and
            rubric-based grading
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active
                </p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Submissions
                </p>
                <p className="text-2xl font-bold">{stats.submitted}</p>
              </div>
              <Upload className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Graded
                </p>
                <p className="text-2xl font-bold">{stats.graded}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assignment Management
          </CardTitle>
          <CardDescription>
            Manage assignments with grading, plagiarism detection, and
            submission tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
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
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {assignment.type} • ID: {assignment.id}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {assignment.plagiarismCheck && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Plagiarism Check
                            </Badge>
                          )}
                          {assignment.autoGrading && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Auto Grade
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{assignment.course}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {assignment.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {assignment.maxPoints} pts
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {assignment.submissions} submitted
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {assignment.graded || 0} graded
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(assignment)}
                          title="View Assignment"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(assignment)}
                          title="Edit Assignment"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Duplicate Assignment"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Delete Assignment"
                            >
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
                                {assignment.title}"? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(assignment.id)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * pageSize + 1,
                filteredAssignments.length,
              )}{" "}
              to {Math.min(currentPage * pageSize, filteredAssignments.length)}{" "}
              of {filteredAssignments.length} assignments
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      Math.ceil(filteredAssignments.length / pageSize),
                      currentPage + 1,
                    ),
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredAssignments.length / pageSize)
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Assignment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Create a new assignment with detailed requirements and grading
              criteria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Assignment Title</Label>
                <Input
                  placeholder="Enter assignment title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Course</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, courseId: value })
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
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Provide detailed assignment description and requirements"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Max Points</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.maxPoints}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxPoints: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Assignment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group Project</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="research">Research Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Submission Guidelines</Label>
              <Textarea
                placeholder="Specify file formats, submission instructions, etc."
                rows={2}
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="plagiarism"
                checked={formData.plagiarismCheck}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    plagiarismCheck: checked as boolean,
                  })
                }
              />
              <Label htmlFor="plagiarism">Enable plagiarism detection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-grade"
                checked={formData.autoGrading}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, autoGrading: checked as boolean })
                }
              />
              <Label htmlFor="auto-grade">Enable auto grading</Label>
            </div>
          </div>
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

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogDescription>
              Update assignment details and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Assignment Title</Label>
                <Input
                  placeholder="Enter assignment title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Course</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, courseId: value })
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
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Provide detailed assignment description and requirements"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Max Points</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.maxPoints}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxPoints: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Assignment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group Project</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="research">Research Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-plagiarism"
                checked={formData.plagiarismCheck}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    plagiarismCheck: checked as boolean,
                  })
                }
              />
              <Label htmlFor="edit-plagiarism">
                Enable plagiarism detection
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-auto-grade"
                checked={formData.autoGrading}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, autoGrading: checked as boolean })
                }
              />
              <Label htmlFor="edit-auto-grade">Enable auto grading</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              Assignment details and submission information
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Course
                  </Label>
                  <p className="font-semibold">{selectedAssignment.course}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Due Date
                  </Label>
                  <p className="font-semibold">{selectedAssignment.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Max Points
                  </Label>
                  <p className="font-semibold">
                    {selectedAssignment.maxPoints}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Status
                  </Label>
                  <Badge variant={getStatusColor(selectedAssignment.status)}>
                    {selectedAssignment.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Description
                </Label>
                <p className="mt-1">{selectedAssignment.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedAssignment.submissions}
                  </p>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedAssignment.graded || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Graded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {selectedAssignment.submissions > 0
                      ? Math.round(
                          ((selectedAssignment.graded || 0) /
                            selectedAssignment.submissions) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Completion</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Submissions
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Grade Analytics
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
