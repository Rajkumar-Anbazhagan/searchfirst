import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, usePagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Download,
  Upload,
  MoreVertical,
  Edit3,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  TrendingUp,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { Student, mockStudents } from "@/mock/data";

type StudentFormData = Omit<Student, "id">;

export default function Students() {
  // Mock data and state management
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock API functions
  const apiCreateStudent = async (studentData: StudentFormData) => {
    setLoading(true);
    try {
      const newStudent: Student = {
        ...studentData,
        id: `S${String(students.length + 1).padStart(3, '0')}`,
        institution: studentData.institution || 'MIT'
      };
      setStudents(prev => [...prev, newStudent]);
      toast.success('Student added successfully!');
    } catch (err) {
      setError('Failed to add student');
      toast.error('Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  const apiUpdateStudent = async (id: string, studentData: StudentFormData) => {
    setLoading(true);
    try {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, ...studentData } : s));
      toast.success('Student updated successfully!');
    } catch (err) {
      setError('Failed to update student');
      toast.error('Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  const apiDeleteStudent = async (id: string) => {
    setLoading(true);
    try {
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Student removed successfully!');
    } catch (err) {
      setError('Failed to remove student');
      toast.error('Failed to remove student');
    } finally {
      setLoading(false);
    }
  };

  const apiBulkImport = async (studentsData: StudentFormData[]) => {
    setLoading(true);
    try {
      const newStudents: Student[] = studentsData.map((data, index) => ({
        ...data,
        id: `S${String(students.length + index + 1).padStart(3, '0')}`,
        institution: data.institution || 'MIT'
      }));
      setStudents(prev => [...prev, ...newStudents]);
      toast.success(`${newStudents.length} students imported successfully!`);
    } catch (err) {
      setError('Failed to import students');
      toast.error('Failed to import students');
    } finally {
      setLoading(false);
    }
  };

  const apiExport = async () => {
    try {
      const dataStr = JSON.stringify(students, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      saveAs(dataBlob, `students_export_${new Date().toISOString().split('T')[0]}.json`);
      toast.success('Students data exported successfully!');
    } catch (err) {
      toast.error('Failed to export students');
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedInstitution, setSelectedInstitution] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [isReportsDialogOpen, setIsReportsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [importProgress, setImportProgress] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addForm = useForm<StudentFormData>({
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      institution: "",
      program: "",
      year: 1,
      semester: 1,
      status: "active",
    },
  });

  const editForm = useForm<StudentFormData>({
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      institution: "",
      program: "",
      year: 1,
      semester: 1,
      status: "active",
    },
  });

  const watchedInstitution = addForm.watch("institution");
  const watchedEditInstitution = editForm.watch("institution");

  // Calculate dynamic stats
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const graduatedStudents = students.filter(
    (s) => s.status === "graduated",
  ).length;
  const inactiveStudents = students.filter(
    (s) => s.status === "inactive",
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents.toString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Students",
      value: activeStudents.toString(),
      change: "+8%",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Graduated",
      value: graduatedStudents.toString(),
      change: "+25%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Inactive",
      value: inactiveStudents.toString(),
      change: "-5%",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ];

  // Institution and their available programs
  const institutionPrograms = {
    MIT: [
      "Computer Science",
      "Electrical Engineering",
      "Mathematics",
      "Physics",
    ],
    Stanford: ["Computer Science", "Electrical Engineering", "Mathematics"],
    Harvard: ["Mathematics", "Physics", "Computer Science"],
    Caltech: ["Physics", "Mathematics", "Electrical Engineering"],
    "UC Berkeley": ["Computer Science", "Electrical Engineering"],
    "Carnegie Mellon": ["Computer Science", "Electrical Engineering"],
    Princeton: ["Mathematics", "Physics"],
    Yale: ["Mathematics", "Computer Science"],
  };

  const institutions = Object.keys(institutionPrograms);
  const programs = [
    "Computer Science",
    "Electrical Engineering",
    "Mathematics",
    "Physics",
  ];
  const statuses = ["active", "inactive", "graduated"];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram =
      selectedProgram === "all" || student.program === selectedProgram;
    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;
    const matchesInstitution =
      selectedInstitution === "all" ||
      student.institution === selectedInstitution;

    return (
      matchesSearch && matchesProgram && matchesStatus && matchesInstitution
    );
  });

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedStudents,
    handlePageChange,
    totalItems,
    pageSize
  } = usePagination(filteredStudents, itemsPerPage);



  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // CRUD Operations
  const handleAddStudent = async (data: StudentFormData) => {
    try {
      await apiCreateStudent(data);
      setIsAddDialogOpen(false);
      addForm.reset();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleEditStudent = async (data: StudentFormData) => {
    if (!editingStudent) return;

    try {
      await apiUpdateStudent(editingStudent.id, data);
      setIsEditDialogOpen(false);
      setEditingStudent(null);
      editForm.reset();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await apiDeleteStudent(studentId);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const openEditDialog = (student: Student) => {
    setOpenDropdownId(null); // Close any open dropdowns first
    setEditingStudent(student);
    editForm.reset({
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      institution: student.institution,
      program: student.program,
      year: student.year,
      semester: student.semester,
      status: student.status,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (student: Student) => {
    setOpenDropdownId(null); // Close any open dropdowns first
    setViewingStudent(student);
    setIsViewDialogOpen(true);
  };

  // Excel Export Functions
  const exportToExcel = () => {
    const exportData = students.map((student) => ({
      Name: student.name,
      Email: student.email,
      "Roll Number": student.rollNumber,
      Institution: student.institution,
      Program: student.program,
      Year: student.year,
      Semester: student.semester,
      Status: student.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      data,
      `students_export_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
    toast.success("Students data exported successfully!");
  };

  // JSON Export using API
  const exportToJSON = async () => {
    try {
      await apiExport();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const exportStudentProgress = () => {
    const progressData = students.map((student) => ({
      Name: student.name,
      "Roll Number": student.rollNumber,
      Institution: student.institution,
      Program: student.program,
      "Current Year": student.year,
      "Current Semester": student.semester,
      Status: student.status,
      Progress: `${(((student.year - 1) * 2 + student.semester) / 8) * 100}%`,
      "Expected Graduation": `${new Date().getFullYear() + (4 - student.year)}`,
      "Credits Completed": `${(student.year - 1) * 30 + student.semester * 15}`,
      GPA: (Math.random() * 1.5 + 2.5).toFixed(2), // Mock GPA
    }));

    const worksheet = XLSX.utils.json_to_sheet(progressData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Progress");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      data,
      `student_progress_report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
    toast.success("Student progress report exported successfully!");
  };

  const generateReports = (reportType: string) => {
    let reportData: any[] = [];
    let fileName = "";
    let sheetName = "";

    switch (reportType) {
      case "enrollment":
        const enrollmentByInstitution = institutions.map((institution) => {
          const institutionStudents = students.filter(
            (s) => s.institution === institution,
          );
          return {
            Institution: institution,
            "Total Students": institutionStudents.length,
            Active: institutionStudents.filter((s) => s.status === "active")
              .length,
            Inactive: institutionStudents.filter((s) => s.status === "inactive")
              .length,
            Graduated: institutionStudents.filter(
              (s) => s.status === "graduated",
            ).length,
            "Programs Offered": getAvailablePrograms(institution).length,
          };
        });
        reportData = enrollmentByInstitution;
        fileName = "enrollment_report";
        sheetName = "Enrollment by Institution";
        break;

      case "program":
        const programStats = programs.map((program) => {
          const programStudents = students.filter((s) => s.program === program);
          return {
            Program: program,
            "Total Students": programStudents.length,
            "Year 1": programStudents.filter((s) => s.year === 1).length,
            "Year 2": programStudents.filter((s) => s.year === 2).length,
            "Year 3": programStudents.filter((s) => s.year === 3).length,
            "Year 4": programStudents.filter((s) => s.year === 4).length,
            Active: programStudents.filter((s) => s.status === "active").length,
          };
        });
        reportData = programStats;
        fileName = "program_report";
        sheetName = "Program Statistics";
        break;

      case "detailed":
        reportData = students.map((student) => ({
          Name: student.name,
          Email: student.email,
          "Roll Number": student.rollNumber,
          Institution: student.institution,
          Program: student.program,
          Year: student.year,
          Semester: student.semester,
          Status: student.status,
          "Enrollment Date": new Date(
            2020 + student.year,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28),
          ).toLocaleDateString(),
          Contact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          Address: `${Math.floor(Math.random() * 999) + 1} Main St, City, State`,
        }));
        fileName = "detailed_student_report";
        sheetName = "Detailed Student Info";
        break;
    }

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success(`${sheetName} exported successfully!`);
  };

  // Excel Import Functions
  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setImportProgress("Processing file...");

        let jsonData: any[];

        if (file.name.endsWith(".json")) {
          // Handle JSON import
          const text = e.target?.result as string;
          jsonData = JSON.parse(text);
        } else {
          // Handle Excel import
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
        }

        const importedStudents = jsonData
          .map((row) => ({
            name: row["Name"] || row["name"] || "",
            email: row["Email"] || row["email"] || "",
            rollNumber:
              row["Roll Number"] ||
              row["rollNumber"] ||
              row["roll_number"] ||
              "",
            institution: row["Institution"] || row["institution"] || "",
            program: row["Program"] || row["program"] || "",
            year: Number(row["Year"] || row["year"]) || 1,
            semester: Number(row["Semester"] || row["semester"]) || 1,
            status: (row["Status"] || row["status"] || "active") as
              | "active"
              | "inactive"
              | "graduated",
          }))
          .filter((student) => student.name && student.email); // Filter out invalid entries

        setImportProgress(`Importing ${importedStudents.length} students...`);

        await apiBulkImport(importedStudents);
        setImportProgress(
          `Successfully imported ${importedStudents.length} students`,
        );
      } catch (error) {
        toast.error("Error importing file. Please check the file format.");
        setImportProgress("Import failed. Please check file format.");
      }
    };

    if (file.name.endsWith(".json")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        Name: "Manikandan",
        Email: "mani.selvan@example.com",
        "Roll Number": "CS2024001",
        Institution: "MIT",
        Program: "Computer Science",
        Year: 1,
        Semester: 1,
        Status: "active",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Template");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "student_import_template.xlsx");
    toast.success("Template downloaded successfully!");
  };

  // Get available programs for selected institution
  const getAvailablePrograms = (institution: string) => {
    return (
      institutionPrograms[institution as keyof typeof institutionPrograms] || []
    );
  };

  // Handle institution change - reset program if not available
  const handleInstitutionChange = (institution: string, form: any) => {
    const availablePrograms = getAvailablePrograms(institution);
    const currentProgram = form.getValues("program");

    if (currentProgram && !availablePrograms.includes(currentProgram)) {
      form.setValue("program", "");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student information, enrollment, and academic records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToExcel}>
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToJSON}>
                <Download className="mr-2 h-4 w-4" />
                Export to JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            key="bulk-import-dialog"
            modal={true}
            open={isBulkDialogOpen}
            onOpenChange={setIsBulkDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Import Students</DialogTitle>
                <DialogDescription>
                  Upload an Excel (.xlsx) or JSON file to bulk import students
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={downloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.json"
                      onChange={handleFileImport}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Excel/JSON File
                    </Button>
                  </div>
                  {importProgress && (
                    <p className="text-sm text-muted-foreground">
                      {importProgress}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsBulkDialogOpen(false);
                    setImportProgress("");
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            key="add-student-dialog"
            modal={true}
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the student information below.
                </DialogDescription>
              </DialogHeader>
              <Form {...addForm}>
                <form
                  onSubmit={addForm.handleSubmit(handleAddStudent)}
                  className="space-y-4"
                >
                  <FormField
                    control={addForm.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter student name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="rollNumber"
                    rules={{ required: "Roll number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="institution"
                    rules={{ required: "Institution is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleInstitutionChange(value, addForm);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select institution" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {institutions.map((institution) => (
                              <SelectItem key={institution} value={institution}>
                                {institution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addForm.control}
                      name="program"
                      rules={{ required: "Program is required" }}
                      render={({ field }) => {
                        const availablePrograms =
                          getAvailablePrograms(watchedInstitution);
                        return (
                          <FormItem>
                            <FormLabel>Program</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={!watchedInstitution}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      watchedInstitution
                                        ? "Select program"
                                        : "Select institution first"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availablePrograms.map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={addForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statuses.map((status) => (
                                <SelectItem
                                  key={status}
                                  value={status}
                                  className="capitalize"
                                >
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addForm.control}
                      name="year"
                      rules={{
                        required: "Year is required",
                        min: { value: 1, message: "Year must be at least 1" },
                        max: { value: 4, message: "Year cannot exceed 4" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1-4"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addForm.control}
                      name="semester"
                      rules={{
                        required: "Semester is required",
                        min: {
                          value: 1,
                          message: "Semester must be at least 1",
                        },
                        max: { value: 2, message: "Semester cannot exceed 2" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Semester</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1-2"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <span className="ml-2 text-sm text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            Search and filter students by program, status, and other criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show:</label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedInstitution}
              onValueChange={setSelectedInstitution}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Institution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="capitalize"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year/Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {student.institution}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {student.rollNumber}
                    </TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>
                      Year {student.year}, Sem {student.semester}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(student.status)}
                        variant="secondary"
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu
                        open={openDropdownId === student.id}
                        onOpenChange={(open) => setOpenDropdownId(open ? student.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              openViewDialog(student);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditDialog(student);
                            }}
                          >
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(`mailto:${student.email}`)
                            }
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Student
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently remove {student.name} from the
                                  system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteStudent(student.id)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove Student
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showPageInfo={true}
            pageSize={pageSize}
            totalItems={totalItems}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsBulkDialogOpen(true)}
        >
          <CardContent className="p-6 text-center">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Bulk Enrollment</h3>
            <p className="text-sm text-muted-foreground">
              Upload Excel or JSON file to enroll multiple students at once
            </p>
          </CardContent>
        </Card>

        <Dialog
          key="progress-dialog"
          modal={true}
          open={isProgressDialogOpen}
          onOpenChange={setIsProgressDialogOpen}
        >
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Student Progress</h3>
                <p className="text-sm text-muted-foreground">
                  View detailed academic progress and performance reports
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Student Progress Reports</DialogTitle>
              <DialogDescription>
                Generate comprehensive progress reports for all students
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button onClick={exportStudentProgress} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Progress Report
              </Button>
              <p className="text-sm text-muted-foreground">
                This will generate an Excel file with student progress, GPA,
                credits, and graduation timeline.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsProgressDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          key="reports-dialog"
          modal={true}
          open={isReportsDialogOpen}
          onOpenChange={setIsReportsDialogOpen}
        >
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Download className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Generate Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Create detailed student reports and analytics
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Reports</DialogTitle>
              <DialogDescription>
                Choose the type of report to generate
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  generateReports("enrollment");
                  setIsReportsDialogOpen(false);
                }}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Enrollment Report by Institution
              </Button>
              <Button
                onClick={() => {
                  generateReports("program");
                  setIsReportsDialogOpen(false);
                }}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Program Statistics Report
              </Button>
              <Button
                onClick={() => {
                  generateReports("detailed");
                  setIsReportsDialogOpen(false);
                }}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Detailed Student Report
              </Button>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsReportsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Student Dialog */}
      <Dialog
        key={editingStudent?.id || 'edit-dialog'}
        modal={true}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingStudent(null); // Clear state on close
            editForm.reset();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditStudent)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="rollNumber"
                rules={{ required: "Roll number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="institution"
                rules={{ required: "Institution is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleInstitutionChange(value, editForm);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select institution" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution} value={institution}>
                            {institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="program"
                  rules={{ required: "Program is required" }}
                  render={({ field }) => {
                    const availablePrograms = getAvailablePrograms(
                      watchedEditInstitution,
                    );
                    return (
                      <FormItem>
                        <FormLabel>Program</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!watchedEditInstitution}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  watchedEditInstitution
                                    ? "Select program"
                                    : "Select institution first"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availablePrograms.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="capitalize"
                            >
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="year"
                  rules={{
                    required: "Year is required",
                    min: { value: 1, message: "Year must be at least 1" },
                    max: { value: 4, message: "Year cannot exceed 4" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1-4"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="semester"
                  rules={{
                    required: "Semester is required",
                    min: { value: 1, message: "Semester must be at least 1" },
                    max: { value: 2, message: "Semester cannot exceed 2" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1-2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingStudent(null);
                    editForm.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Student</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Student Details Dialog */}
      <Dialog
        key={viewingStudent?.id || 'view-dialog'}
        modal={true}
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            // Ensure all states are properly reset
            setIsViewDialogOpen(false);
            setViewingStudent(null);
            setOpenDropdownId(null);
            // Small delay to ensure DOM cleanup
            setTimeout(() => {
              document.body.style.pointerEvents = '';
              document.body.style.overflow = '';
            }, 100);
          } else {
            setIsViewDialogOpen(true);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information for {viewingStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {viewingStudent && (
            <div className="space-y-6">
              {/* Student Header */}
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={viewingStudent.avatar} />
                  <AvatarFallback className="text-lg">
                    {viewingStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {viewingStudent.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {viewingStudent.email}
                  </p>
                  <Badge
                    className={getStatusColor(viewingStudent.status)}
                    variant="secondary"
                  >
                    {viewingStudent.status}
                  </Badge>
                </div>
              </div>

              {/* Student Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <p className="text-sm font-medium">
                        {viewingStudent.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Email Address
                      </label>
                      <p className="text-sm font-medium">
                        {viewingStudent.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Roll Number
                      </label>
                      <p className="text-sm font-medium font-mono">
                        {viewingStudent.rollNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">
                    Academic Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Institution
                      </label>
                      <p className="text-sm font-medium">
                        {viewingStudent.institution}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Program
                      </label>
                      <p className="text-sm font-medium">
                        {viewingStudent.program}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Academic Year
                      </label>
                      <p className="text-sm font-medium">
                        Year {viewingStudent.year}, Semester{" "}
                        {viewingStudent.semester}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Status
                      </label>
                      <p className="text-sm font-medium capitalize">
                        {viewingStudent.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`mailto:${viewingStudent.email}`)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    openEditDialog(viewingStudent);
                    setIsViewDialogOpen(false);
                  }}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const studentData = [viewingStudent].map((student) => ({
                      Name: student.name,
                      Email: student.email,
                      "Roll Number": student.rollNumber,
                      Institution: student.institution,
                      Program: student.program,
                      Year: student.year,
                      Semester: student.semester,
                      Status: student.status,
                    }));
                    const worksheet = XLSX.utils.json_to_sheet(studentData);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(
                      workbook,
                      worksheet,
                      "Student Info",
                    );
                    const excelBuffer = XLSX.write(workbook, {
                      bookType: "xlsx",
                      type: "array",
                    });
                    const data = new Blob([excelBuffer], {
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });
                    saveAs(
                      data,
                      `${viewingStudent.name.replace(/\s+/g, "_")}_info.xlsx`,
                    );
                    toast.success("Student info downloaded!");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Info
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setViewingStudent(null);
                setOpenDropdownId(null);
                // Ensure DOM is properly cleaned up
                setTimeout(() => {
                  document.body.style.pointerEvents = '';
                  document.body.style.overflow = '';
                }, 100);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading students...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
