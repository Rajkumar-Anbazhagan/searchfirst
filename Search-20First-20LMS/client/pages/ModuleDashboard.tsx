import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Construction,
  Sparkles,
  Settings,
  Grid3X3,
  Users,
  BookOpen,
  Monitor,
  FileText,
  Building,
  Package,
  DollarSign,
  Award,
  Library,
  ShoppingCart,
  UserCheck,
  CreditCard,
  Building2,
  PenTool,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import { hasModuleAccess, getRoleDisplayName } from "@/utils/modulePermissions";
import { UserRole } from "@/contexts/AuthContext";

interface ModuleData {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  features: string[];
}

const getModuleIcon = (moduleId: string) => {
  const iconMap: { [key: string]: any } = {
    "academic-operation": BookOpen,
    admission: Users,
    "student-support": GraduationCap,
    lms: Monitor,
    examination: FileText,
    "alumni-management": Award,
    hostel: Building,
    library: Library,
    procurement: ShoppingCart,
    "asset-management": Package,
    "finance-management": DollarSign,
    hrms: UserCheck,
    payroll: CreditCard,
    affiliation: Building2,
    gte: PenTool,
    research: FlaskConical,
    "master-setup": Settings,
  };
  return iconMap[moduleId] || BookOpen;
};

// Available modules for Master Setup dashboard
const allModules = [
  {
    id: "academic-operation",
    title: "Academic Operation",
    description: "Comprehensive academic management",
  },
  {
    id: "admission",
    title: "Admission",
    description: "Student enrollment and registration",
  },
  {
    id: "student-support",
    title: "Student Support",
    description: "Student services and assistance",
  },
  { id: "lms", title: "LMS", description: "Learning Management System" },
  {
    id: "examination",
    title: "Examination",
    description: "Comprehensive exam management",
  },
  {
    id: "alumni-management",
    title: "Alumni Management",
    description: "Alumni network and engagement",
  },
  {
    id: "hostel",
    title: "Hostel",
    description: "Hostel and accommodation management",
  },
  {
    id: "library",
    title: "Library",
    description: "Digital and physical library management",
  },
  {
    id: "procurement",
    title: "Procurement",
    description: "Purchase and vendor management",
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Asset tracking and maintenance",
  },
  {
    id: "finance-management",
    title: "Finance Management",
    description: "Financial planning and control",
  },
  {
    id: "hrms",
    title: "HRMS",
    description: "Human Resource Management System",
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "Salary and compensation management",
  },
  {
    id: "affiliation",
    title: "Affiliation",
    description: "Institution affiliation management",
  },
  { id: "gte", title: "GTE", description: "Government Technical Education" },
  {
    id: "research",
    title: "Research",
    description: "Research and development portal",
  },
];

export default function ModuleDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const moduleData = location.state?.moduleData as ModuleData;
  const userRole = user?.role as UserRole;

  useEffect(() => {
    // Check if user has access to this module
    if (!moduleData || !userRole || !hasModuleAccess(userRole, moduleData.id)) {
      // Redirect to unauthorized page or show error
      console.log(
        "Access denied for module:",
        moduleData?.id,
        "user role:",
        userRole,
      );
    } else {
      // Redirect to shared dashboard with module context
      navigate('/dashboard', {
        state: {
          selectedModule: moduleData.id,
          moduleData: moduleData
        },
        replace: true
      });
    }
  }, [moduleData, userRole, navigate]);

  // Check permissions
  const hasAccess =
    moduleData && userRole && hasModuleAccess(userRole, moduleData.id);

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Module Selected</h2>
            <p className="text-gray-600 mb-4">
              Please select a module from the landing page.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Modules
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You don't have permission to access the{" "}
              <strong>{moduleData.title}</strong> module.
            </p>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your role:{" "}
                  <Badge variant="outline">
                    {getRoleDisplayName(userRole)}
                  </Badge>
                </AlertDescription>
              </Alert>
              <Button onClick={() => navigate("/")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Module Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Special handling for Master Setup module
  if (moduleData.id === "master-setup") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button onClick={() => navigate("/")} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Modules
              </Button>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {getRoleDisplayName(userRole)}
              </Badge>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${moduleData.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Settings className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {moduleData.title}
              </h1>
              <p className="text-lg text-gray-600">{moduleData.description}</p>
            </div>
          </div>

          {/* Master Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allModules.map((module) => {
              const IconComponent = getModuleIcon(module.id);
              const hasModulePermission = hasModuleAccess(userRole, module.id);

              return (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    hasModulePermission
                      ? "border-green-200 bg-white hover:bg-green-50"
                      : "border-red-200 bg-gray-50 opacity-60"
                  }`}
                  onClick={() => {
                    if (hasModulePermission) {
                      // Navigate to specific module dashboard
                      navigate("/dashboard", {
                        state: {
                          moduleData: {
                            ...module,
                            gradient: "from-blue-500/50 to-indigo-500/50",
                            features: ["Feature 1", "Feature 2"],
                            image:
                              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
                          },
                        },
                      });
                    }
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-lg ${hasModulePermission ? "bg-blue-100" : "bg-gray-200"} flex items-center justify-center`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${hasModulePermission ? "text-blue-600" : "text-gray-400"}`}
                        />
                      </div>
                      <Badge
                        variant={hasModulePermission ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {hasModulePermission ? "Accessible" : "Restricted"}
                      </Badge>
                    </div>
                    <CardTitle
                      className={`text-sm ${hasModulePermission ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Regular module dashboard
  const IconComponent = getModuleIcon(moduleData.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={() => navigate("/")} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Modules
            </Button>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {getRoleDisplayName(userRole)}
            </Badge>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${moduleData.gradient} flex items-center justify-center shadow-lg`}
              >
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {moduleData.title}
            </h1>
            <p className="text-lg text-gray-600">{moduleData.description}</p>
          </div>
        </div>

        {/* Module Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardContent className="p-8 flex items-center justify-center">
                <div className="text-center">
                  <Construction className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Module Under Development
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The {moduleData.title} module dashboard is currently being
                    developed.
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700"
                  >
                    Coming Soon
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {moduleData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Module Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
