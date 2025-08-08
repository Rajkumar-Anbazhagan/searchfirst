import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  hasModuleAccess,
  ModuleType,
  isValidModuleId,
} from "@/utils/modulePermissions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Users,
  GraduationCap,
  Monitor,
  FileText,
  Award,
  Building,
  Library,
  ShoppingCart,
  Package,
  DollarSign,
  UserCheck,
  CreditCard,
  Building2,
  PenTool,
  FlaskConical,
  Moon,
  Sun,
  School,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Users2,
  Settings,
} from "lucide-react";

const userRoles = [
  {
    id: "super-admin",
    title: "Super Admin",
    icon: Crown,
    description: "Full system access",
    gradient: "from-red-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Administrative privileges",
    gradient: "from-blue-500 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "institution-principal",
    title: "Institution / Principal",
    icon: Building2,
    description: "Institution management",
    gradient: "from-purple-500 to-violet-500",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "staff",
    title: "Staff",
    icon: Users2,
    description: "Faculty and staff members",
    gradient: "from-green-500 to-emerald-500",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b332c1ad?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "student",
    title: "Student",
    icon: GraduationCap,
    description: "Student portal access",
    gradient: "from-orange-500 to-yellow-500",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
  },
];

const modules = [
  {
    id: "master-setup",
    title: "Master Setup",
    icon: Settings,
    description: "Master admin control panel",
    image:

      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
    features: [
      "System Configuration",
      "Module Management",
      "User Administration",
      "Global Settings",
      "Security Controls",
      "Database Management",
      "Integration Setup",
      "Backup & Restore",
    ],
    gradient: "from-slate-500/50 to-zinc-500/50",
    glowColor: "shadow-slate-500/25",
  },
  {
    id: "academic-operation",
    title: "Academic Operation",
    icon: BookOpen,
    description: "Comprehensive academic management",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
    features: [
      "Master setup (Entity, Institute, Program)",
      "Staff Allotment",
      "Curriculum Development",
      "Calendar & Timetable",
      "Notice and Circular",
      "Service Request",
      "Attendance Management",
      "Scholarship Management",
      "Semester Dropout",
    ],
    gradient: "from-blue-500/50 to-cyan-500/50",
    glowColor: "shadow-blue-500/25",
  },
  {
    id: "student-support",
    title: "Student Support",
    icon: GraduationCap,
    description: "Student services and assistance",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    features: [
      "Student Dashboard",
      "Fees Payment",
      "Notice & Circular",
      "Timetable & Calendar",
      "Notification",
      "Service Request",
      "Scholarship",
      "Library",
      "Hostel",
      "LMS",
      "Mobility Features",
      "Reports",
    ],
    gradient: "from-green-500/50 to-emerald-500/50",
    glowColor: "shadow-green-500/25",
  },
  {
    id: "lms",
    title: "LMS",
    icon: Monitor,
    description: "Learning Management System",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&h=200&fit=crop",
    features: [
      "Course Setup & User Enrollment",
      "Content Design & Progress",
      "Self Learning (lessons, Video, Doc, SCORM)",
      "Virtual Classroom",
      "Adaptive Learning",
      "Collaboration Features(Blogs, Forum)",
      "Online Assignment (Rubrics, Plagiarism)",
      "online Assessment, Badges",
      "Certificate/ Transcript",
      "Email/ Notification, Online Proctoring",
    ],
    gradient: "from-orange-500/50 to-red-500/50",
    glowColor: "shadow-orange-500/25",
  },
  {
    id: "admission",
    title: "Admission",
    icon: Users,
    description: "Student enrollment and registration",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
    features: [
      "Student Registration& Tracking(Entity & Program Specific)",
      "Scheduling(Marks, Program & Institute)",
      "Counseling (Institute & State Level)",
      "Admission & Online Payment",
      "Certificate Verification (Digital/ Manual)",
      "Reports",
    ],
    gradient: "from-purple-500/50 to-pink-500/50",
    glowColor: "shadow-purple-500/25",
  },
  {
    id: "examination",
    title: "Examination",
    icon: FileText,
    description: "Comprehensive exam management",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
    features: [
      "Examination Planning",
      "Hall Ticket Generation",
      "Question Bank Preparation",
      "Question Bank & Answer Key Creation",
      "Staff Allocation",
      "Seat Allocation",
      "Conduct Examination",
      "Answer sheet Evaluation",
      "Result & Reports",
      "Re-evaluation",
      "Transcript/ Certificate",
    ],
    gradient: "from-indigo-500/50 to-purple-500/50",
    glowColor: "shadow-indigo-500/25",
  },
  {
    id: "alumni-management",
    title: "Alumni Management",
    icon: Award,
    description: "Alumni network and engagement",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop",
    features: [
      "Alumni Registration (Auto/Manual)",
      "Alumni Facilities (Network, Job/ Internship)",
      "Service Request",
      "Communication (Meetings, Orientation Monitoring)",
      "Reports",
    ],
    gradient: "from-pink-500/50 to-rose-500/50",
    glowColor: "shadow-pink-500/25",
  },
  {
    id: "hostel",
    title: "Hostel",
    icon: Building,
    description: "Hostel and accommodation management",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop",
    features: [
      "Capacity Planning (Room Size, Type, Capacity)",
      "Room Booking (Online Booking, Payment, Approval, Allocation)",
      "Attendance",
      "Change Room",
      "Discipline Register",
      "Reports",
    ],
    gradient: "from-cyan-500/50 to-blue-500/50",
    glowColor: "shadow-cyan-500/25",
  },
  {
    id: "library",
    title: "Library",
    icon: Library,
    description: "Digital and physical library management",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    features: [
      "Library Stock Management",
      "Book Request",
      "Book Allotment",
      "Book Return & Penalty",
      "Reports",
    ],
    gradient: "from-emerald-500/50 to-teal-500/50",
    glowColor: "shadow-emerald-500/25",
  },
  {
    id: "procurement",
    title: "Procurement",
    icon: ShoppingCart,
    description: "Purchase and vendor management",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
    features: [
      "Purchase Requisition and approval",
      "Request for Quotation",
      "RFP Shortlisting",
      "Purchase Order",
      "Good Receipt Notes",
      "Invoice & Payment",
      "Stock / Return Management",
      "Return Items",
      "Purchase Request (Beyond Limit)",
      "Reports",
    ],
    gradient: "from-yellow-500/50 to-orange-500/50",
    glowColor: "shadow-yellow-500/25",
  },
  {
    id: "asset-management",
    title: "Asset Management",
    icon: Package,
    description: "Asset tracking and maintenance",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
    features: [
      "Asset Allocation",
      "Assets Tracking",
      "Asset Depreciation",
      "Asset Maintenance",
      "Asset Disposal",
      "Report",
    ],
    gradient: "from-slate-500/50 to-gray-500/50",
    glowColor: "shadow-slate-500/25",
  },
  {
    id: "finance-management",
    title: "Finance Management",
    icon: DollarSign,
    description: "Financial planning and control",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
    features: [
      "Account Masters Configuration & Budgeting",
      "Opening Balance Masters and Closing Balance",
      "Student Finance",
      "Account Entries",
      "Transaction from Government Entities",
      "Bank Reconciliation",
      "Financial Reporting",
      "Audit and Fund s Reports",
      "Account Entry for Payroll Processing",
      "Final Modified Appropriation",
    ],
    gradient: "from-green-600/50 to-emerald-600/50",
    glowColor: "shadow-green-500/25",
  },
  {
    id: "hrms",
    title: "HRMS",
    icon: UserCheck,
    description: "Human Resource Management System",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    features: [
      "Resource Planning (Vacancy)",
      "Resource Onboarding (Service Book)",
      "Attendance Biometric",
      "Leave",
      "Payroll Management (Self Payroll or IHRMS)",
      "Promotion",
      "Increment",
      "Transfer",
      "Exit / Retirement",
      "Reports",
    ],
    gradient: "from-violet-500/50 to-purple-500/50",
    glowColor: "shadow-violet-500/25",
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: CreditCard,
    description: "Salary and compensation management",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=200&fit=crop",
    features: [
      "Statutory & Compensation Setup",
      "Integrate Employee Details",
      "Track Attendance & Leave Management",
      "Investments & Flexible Benefits",
      "Loans & Advance Managements",
      "Increments & Promotions",
      "Tax & Salary Processing",
      "E-TDS Challan Generation",
      "Payroll Compliance Reports",
      "Employee Self Service",
      "Exit Management",
      "Reports",
    ],
    gradient: "from-blue-600/50 to-indigo-600/50",
    glowColor: "shadow-blue-500/25",
  },
  {
    id: "affiliation",
    title: "Affiliation",
    icon: Building2,
    description: "Institution affiliation management",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    features: [
      "Faculty Management (Course, Building, Student Capacity)",
      "Renewal Management",
      "Reports",
    ],
    gradient: "from-teal-500/50 to-cyan-500/50",
    glowColor: "shadow-teal-500/25",
  },
  {
    id: "gte",
    title: "GTE",
    icon: PenTool,
    description: "Government Technical Education",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    features: [
      "Typewriting",
      "Shorthand",
      "Accountancy",
      "Office Automation",
      "Reports",
    ],
    gradient: "from-red-500/50 to-pink-500/50",
    glowColor: "shadow-red-500/25",
  },
  {
    id: "research",
    title: "Research",
    icon: FlaskConical,
    description: "Research and development portal",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
    features: ["Online Application", "Validation", "Fund Sanctions", "Reports"],
    gradient: "from-amber-500/50 to-yellow-500/50",
    glowColor: "shadow-amber-500/25",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const handleCardClick = (moduleId: string) => {
    // Check if user has access to this module
    if (
      user &&
      isValidModuleId(moduleId) &&
      !hasModuleAccess(user.role, moduleId)
    ) {
      // Redirect to access denied or show message
      navigate("/access-denied", {
        state: {
          module: moduleId,
          userRole: user.role,
        },
      });
      return;
    }

    const selectedModuleData = modules.find((m) => m.id === moduleId);
    // Exclude the icon component as it's not serializable
    const serializableModuleData = selectedModuleData
      ? {
          id: selectedModuleData.id,
          title: selectedModuleData.title,
          description: selectedModuleData.description,
          image: selectedModuleData.image,
          gradient: selectedModuleData.gradient,
          glowColor: selectedModuleData.glowColor,
          features: selectedModuleData.features,
        }
      : null;

    navigate("/login", {
      state: {
        selectedModule: moduleId,
        moduleData: serializableModuleData,
      },
    });
  };

  const handleRoleClick = (roleId: string) => {
    // Map role IDs to the actual role values used in the system
    const roleMapping: { [key: string]: string } = {
      "super-admin": "super-admin",
      admin: "admin",
      "institution-principal": "principal", // This covers both institution and principal
      staff: "faculty", // Map staff to faculty for simplicity
      student: "student",
    };

    const selectedRole = roleMapping[roleId] || roleId;

    // Find the role data for additional context
    const selectedRoleData = userRoles.find((role) => role.id === roleId);

    navigate("/login", {
      state: {
        selectedRole: selectedRole,
        rolePreselected: true,
        roleData: selectedRoleData
          ? {
              id: selectedRoleData.id,
              title: selectedRoleData.title,
              description: selectedRoleData.description,
              gradient: selectedRoleData.gradient,
            }
          : null,
      },
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Filter modules based on user role
  const getVisibleModules = () => {
    if (!user) {
      // If no user is logged in, show all modules for demo purposes
      return modules;
    }

    return modules.filter((module) => {
      if (!isValidModuleId(module.id)) {
        console.warn(`Invalid module ID: ${module.id}`);
        return false;
      }
      return hasModuleAccess(user.role, module.id as ModuleType);
    });
  };

  const visibleModules = getVisibleModules();

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Modern Header Section */}
        <div className="mb-12">
          {/* Top Controls Bar */}
          <div className="flex justify-end mb-6">
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className={`rounded-full px-4 py-2 ${
                darkMode
                  ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                  : "border-gray-200 bg-white/80 hover:bg-white text-gray-700"
              } backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {darkMode ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </div>

          {/* Main Header Content */}
          <div
            className={`relative rounded-3xl overflow-hidden ${
              darkMode
                ? "bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95"
                : "bg-gradient-to-br from-white via-blue-50/70 to-indigo-50/80"
            } backdrop-blur-xl border-2 ${
              darkMode ? "border-white/10" : "border-white/40"
            } shadow-2xl transition-all duration-500`}
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute -top-4 -right-4 w-32 h-32 rounded-full ${darkMode ? "bg-blue-500/10" : "bg-blue-200/30"} blur-2xl`}
              ></div>
              <div
                className={`absolute -bottom-6 -left-6 w-40 h-40 rounded-full ${darkMode ? "bg-indigo-500/10" : "bg-indigo-200/30"} blur-2xl`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full ${darkMode ? "bg-purple-500/5" : "bg-purple-200/20"} blur-3xl`}
              ></div>
            </div>

            {/* Header Grid Layout */}
            <div className="relative z-10 p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left Official Section */}
                <div className="md:col-span-3 lg:col-span-3 flex flex-col items-center space-y-3 md:space-y-4">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                      <img
                        src="/cm.jpeg"
                        alt="Chief Minister"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"} leading-tight`}
                    >
                      Thiru M.K.Stalin
                    </p>
                    <p
                      className={`text-xs ${darkMode ? "text-blue-200" : "text-blue-600"} font-medium`}
                    >
                      Honourable Chief Minister
                    </p>
                  </div>
                </div>

                {/* Center Content */}
                <div className="md:col-span-6 lg:col-span-6 text-center space-y-4 md:space-y-6">
                  {/* Institution Logo with Enhanced Styling */}
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
                      ></div>
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 p-1.5 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
                          <div className="w-full h-full rounded-full bg-gradient-to-b from-orange-400 to-red-500 flex items-center justify-center overflow-hidden">
                            <img
                              src="/tamilnadu.webp"
                              alt="Tamil Nadu Government"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Institution Banner Image (New Custom Field) */}
                  <div className="flex justify-center">
                    <div
                      className={`relative rounded-2xl overflow-hidden ${darkMode ? "bg-white/5" : "bg-white/50"} backdrop-blur-sm border ${darkMode ? "border-white/10" : "border-white/30"} shadow-lg`}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=120&fit=crop"
                        alt="Institution Banner"
                        className="w-72 sm:w-80 h-16 sm:h-20 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${darkMode ? "from-blue-900/40 to-indigo-900/40" : "from-blue-600/20 to-indigo-600/20"}`}
                      ></div>
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="space-y-3">
                    <h1
                      className={`text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r ${darkMode ? "from-white via-blue-100 to-indigo-200" : "from-gray-900 via-blue-800 to-indigo-900"} bg-clip-text text-transparent leading-tight`}
                    >
                      தொழில்நுட்பக் கல்வி இயக்ககம்
                    </h1>
                    <h2
                      className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? "text-blue-300" : "text-blue-700"} tracking-wide`}
                    >
                      Directorate of Technical Education
                    </h2>
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full ${darkMode ? "bg-white/10 text-gray-200" : "bg-blue-100 text-blue-800"} border ${darkMode ? "border-white/20" : "border-blue-200"} shadow-sm`}
                    >
                      <School className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">
                        Government of Tamil Nadu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Official Section */}
                <div className="md:col-span-3 lg:col-span-3 flex flex-col items-center space-y-3 md:space-y-4">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                      <img
                        src="/minister.avif"
                        alt="Education Minister"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"} leading-tight`}
                    >
                      Dr. Govi Chezhiaan
                    </p>
                    <p
                      className={`text-xs ${darkMode ? "text-blue-200" : "text-blue-600"} font-medium`}
                    >
                      Minister for Higher Education
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="mt-8 flex justify-center">
                <div
                  className={`w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* ERP System Introduction */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className={`p-3 rounded-2xl ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                } shadow-2xl`}
              >
                <School className="h-8 w-8 text-white" />
              </div>
              <h1
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-white to-blue-200"
                    : "from-gray-800 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Search First
              </h1>
            </div>

            <h2
              className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Complete Education Management Solution
            </h2>
            <p
              className={`text-base sm:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } leading-relaxed mb-6`}
            >
              Streamline your educational institution with our comprehensive ERP
              suite. From academics to administration, manage everything
              seamlessly under the Directorate of Technical Education,
              Government of Tamil Nadu.
            </p>

            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {user
                    ? `${visibleModules.length} Available Modules`
                    : "17 Integrated Modules"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Government Approved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-blue-500" />
                <span
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Secure & Scalable
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Role Cards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3
              className={`text-2xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {user
                ? `Welcome, ${user.name?.split(" ")[0]}!`
                : "Select Your Role"}
            </h3>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {user
                ? `Role: ${user.role} • ${visibleModules.length} modules available`
                : "Choose your access level to continue"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto mb-8">
            {userRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  onClick={() => handleRoleClick(role.id)}
                  className={`group cursor-pointer h-auto rounded-xl border transition-all duration-500 hover:scale-110 hover:-translate-y-2 relative overflow-hidden ${
                    darkMode
                      ? "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40"
                      : "bg-white hover:bg-white/95 border-gray-200 hover:border-gray-300"
                  } hover:shadow-xl hover:shadow-${role.gradient.split(" ")[1]}/20`}
                  style={{
                    animation: `slideInUp 0.6s ease-out forwards ${index * 0.1}s`,
                  }}
                >
                  {/* Subtle role card glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 rounded-xl`}
                  ></div>
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-3">
                      <div
                        className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl`}
                      >
                        <IconComponent className="h-8 w-8 text-white group-hover:animate-pulse drop-shadow-lg" />
                      </div>
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 mb-2`}
                      ></div>
                    </div>
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {role.title}
                    </h4>
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {role.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 max-w-full mx-auto">
          {visibleModules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card
                key={module.id}
                onClick={() => handleCardClick(module.id)}
                className={`group cursor-pointer h-auto rounded-2xl border transition-all duration-700 hover:scale-[1.08] hover:-translate-y-3 transform-gpu ${
                  darkMode
                    ? "bg-white/10 hover:bg-white/15 backdrop-blur-xl shadow-lg hover:shadow-2xl border-white/10 hover:border-white/30"
                    : "bg-white/70 hover:bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-2xl border-gray-200/50 hover:border-gray-300/70"
                } hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:ring-1 ${darkMode ? "hover:ring-blue-400/30" : "hover:ring-blue-500/20"} relative overflow-hidden`}
                style={{
                  animation: `slideInUp 0.6s ease-out forwards ${index * 0.1}s`,
                  boxShadow: darkMode
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Subtle animated background glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-2xl`}
                ></div>

                {/* Animated border glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${module.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700 -z-10 scale-105`}
                ></div>
                <CardHeader className="pb-3">
                  {/* Module Image/Icon Header */}
                  <div className="relative mb-4">
                    <div className="h-32 rounded-xl overflow-hidden relative">
                      {/* Module-specific image */}
                      <img
                        src={module.image}
                        alt={module.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-80`}
                      ></div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        {/* Module Icon */}
                        <div className="flex justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <IconComponent className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>
                        </div>

                        {/* Module Title */}
                        <div className="text-center">
                          <h3 className="text-white font-bold text-sm drop-shadow-md">
                            {module.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-1">
                    <CardDescription
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } leading-relaxed`}
                    >
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 px-4">
                  {/* Feature List */}
                  <div className="mb-4">
                    <h4
                      className={`text-xs font-semibold mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {module.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className={`text-xs flex items-start gap-2 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          } transition-colors duration-300`}
                        >
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-500" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                      {module.features.length > 4 && (
                        <li
                          className={`text-xs ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          } italic pl-5`}
                        >
                          +{module.features.length - 4} more features...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-gray-200/20">
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full text-xs font-medium relative z-10 ${
                          darkMode
                            ? "border-white/20 text-white hover:bg-white/10"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        } transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:${module.gradient} group-hover:text-white group-hover:shadow-xl group-hover:shadow-${module.gradient.split(" ")[1]}/25 hover:scale-[1.02]`}
                      >
                        <IconComponent className="h-3 w-3 mr-2 group-hover:animate-pulse" />
                        Access {module.title}
                        <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>

                      {/* Button glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${module.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 rounded-md -z-10`}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p
            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Click any module to access the system • Secure • Scalable •
            Comprehensive
          </p>
        </div>
      </div>

      {/* Add custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .card-glow:hover {
          animation: subtleGlow 2s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
