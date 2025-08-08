import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen, Plus, Search, Edit, Trash2, Download, Upload, Clock, Calendar,
  Users, Target, Eye, Settings, CheckCircle, AlertCircle, FileText,
  GitBranch, Award, Shield, UserCheck, School, Layers, BarChart3,
  ChevronRight, Filter, MoreVertical, Bell, Star, TrendingUp,
  Workflow, BookMarked, GraduationCap, ClipboardList, Database,
  Network, Code, Map, PlayCircle, PenTool, Globe
} from 'lucide-react';
import {
  QuickActionDialog, NewRegulationDialog, RegulationViewDialog, RegulationEditDialog,
  InitiateRevisionDialog, RevisionViewDialog, CreateLessonPlanDialog, AddUnitDialog,
  ConfigureOutcomesDialog, APIIntegrationsDialog, PendingApprovalsDialog,
  ManageElectivePoliciesDialog
} from './CurriculumDialogs';
import {
  AddTopicDialog, AddLearningOutcomeDialog, EditLessonPlanDialog,
  EditCourseOutcomeDialog, ProgramLearningOutcomesDialog, COPLOMappingDialog,
  RevisionEditDialog
} from './CurriculumDialogsExtended';
import {
  CreateNewCurriculumDialog, BulkUploadDialog
} from './CurriculumQuickActions';

import { useAuth } from '@/contexts/AuthContext';

// This will be replaced with useAuth hook below
const defaultUser = {
  role: 'Admin', // Admin, Faculty, Student, Parent
  id: 1,
  name: 'Dr.Manikandan',
  permissions: ['create', 'read', 'update', 'delete', 'approve']
};

// Role-based feature access matrix based on your requirements:
// Admin: Full access to all curriculum functionalities
// Faculty: Can add, edit syllabus and track progress
// Student & Parents: View-only access
const featureAccess = {
  'AM04_regulation_years': {
    admin: { view: true, create: true, edit: true, delete: true },
    faculty: { view: true, create: false, edit: false, delete: false },
    student: { view: true, create: false, edit: false, delete: false },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM05_revision_workflow': {
    admin: { view: true, create: true, edit: true, delete: true, approve: true },
    faculty: { view: true, create: true, edit: true, delete: false, approve: false },
    student: { view: true, create: false, edit: false, delete: false, approve: false },
    parent: { view: true, create: false, edit: false, delete: false, approve: false }
  },
  'AM06_academic_structure': {
    admin: { view: true, create: true, edit: true, delete: true, approve: true },
    faculty: { view: true, create: true, edit: true, delete: false, approve: false },
    student: { view: true, create: false, edit: false, delete: false, approve: false },
    parent: { view: true, create: false, edit: false, delete: false, approve: false }
  },
  'AM07_credit_points': {
    admin: { view: true, create: true, edit: true, delete: true },
    faculty: { view: true, create: false, edit: false, delete: false },
    student: { view: true, create: false, edit: false, delete: false },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM08_mandatory_optional': {
    admin: { view: true, create: true, edit: true, delete: true },
    faculty: { view: true, create: false, edit: false, delete: false },
    student: { view: true, create: false, edit: false, delete: false },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM09_elective_selection': {
    admin: { view: true, create: false, edit: true, delete: false, override: true },
    faculty: { view: true, create: false, edit: false, delete: false, recommend: true },
    student: { view: true, create: false, edit: true, delete: false, select: true },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM10_obe_cbcs': {
    admin: { view: true, create: true, edit: true, delete: true },
    faculty: { view: true, create: true, edit: true, delete: false },
    student: { view: true, create: false, edit: false, delete: false },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM11_syllabus_tracking': {
    admin: { view: true, create: true, edit: true, delete: true, analytics: true },
    faculty: { view: true, create: true, edit: true, delete: false, upload: true, progress: true },
    student: { view: true, create: false, edit: false, delete: false, track: true },
    parent: { view: true, create: false, edit: false, delete: false }
  },
  'AM12_api_integration': {
    admin: { view: true, create: true, edit: true, delete: true, manage: true },
    faculty: { view: false, create: false, edit: false, delete: false },
    student: { view: false, create: false, edit: false, delete: false },
    parent: { view: false, create: false, edit: false, delete: false }
  }
};

// Function to check if user has permission for a feature
const hasPermission = (feature: string, action: string, currentUser: any) => {
  const feature_roles = featureAccess[feature];
  if (!feature_roles || !currentUser?.role) return false;

  // Check if role exists directly
  if (feature_roles[currentUser.role]) {
    return feature_roles[currentUser.role][action] || false;
  }

  // Fallback mapping for new roles
  let fallbackRole = null;
  switch (currentUser.role) {
    case 'super-admin':
      fallbackRole = 'admin';
      break;
    case 'institution':
    case 'principal':
      fallbackRole = 'admin';
      break;
    case 'hod':
      fallbackRole = 'faculty';
      break;
    case 'staff':
      fallbackRole = 'faculty';
      break;
    default:
      return false;
  }

  return feature_roles[fallbackRole]?.[action] || false;
};

export default function Curriculum() {
  // Get current user from auth context
  const { user: authUser } = useAuth();
  const currentUser = authUser || defaultUser;

  // Convert role to lowercase for consistency with permissions matrix
  const userWithNormalizedRole = {
    ...currentUser,
    role: currentUser.role?.toLowerCase() || 'student'
  };
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProgram, setSelectedProgram] = useState('B.Tech CSE');
  const [selectedRegulation, setSelectedRegulation] = useState('R-2024');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');

  // Dialog states for various functionalities
  const [dialogStates, setDialogStates] = useState({
    quickAction: false,
    newRegulation: false,
    regulationView: false,
    regulationEdit: false,
    initiateRevision: false,
    revisionView: false,
    revisionEdit: false,
    createLessonPlan: false,
    addUnit: false,
    addTopic: false,
    addLearningOutcome: false,
    editLessonPlan: false,
    configureOutcomes: false,
    editCourseOutcome: false,
    manageElectivePolicies: false,
    programLearningOutcomes: false,
    coploMapping: false,
    apiIntegrations: false,
    pendingApprovals: false,
    createNewCurriculum: false,
    bulkUpload: false
  });

  // State for managing data
  const [regulations, setRegulations] = useState([
    { id: 1, year: 'R-2024', programs: ['B.Tech', 'M.Tech'], status: 'Active', effectiveFrom: '2024-06-01', students: 1250 },
    { id: 2, year: 'R-2023', programs: ['B.Tech', 'MBA'], status: 'Active', effectiveFrom: '2023-06-01', students: 980 },
    { id: 3, year: 'R-2022', programs: ['B.Tech'], status: 'Phasing Out', effectiveFrom: '2022-06-01', students: 450 }
  ]);

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      title: 'AI & ML Curriculum Update',
      program: 'B.Tech CSE',
      stage: 'Gap Analysis',
      status: 'In Progress',
      initiator: 'Dr.Manikandan',
      priority: 'High',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Elective Basket Revision',
      program: 'B.Tech ECE',
      stage: 'Faculty Review',
      status: 'Pending',
      initiator: 'Prof.Kumar',
      priority: 'Medium',
      dueDate: '2024-02-20'
    },
    {
      id: 3,
      title: 'Lab Curriculum Restructure',
      program: 'B.Tech CSE',
      stage: 'Department Head Approval',
      status: 'In Progress',
      initiator: 'Dr. Meenakshi',
      priority: 'High',
      dueDate: '2024-03-01'
    },
    {
      id: 4,
      title: 'Semester Schedule Finalization',
      program: 'B.Arch',
      stage: 'Registrar Review',
      status: 'Completed',
      initiator: 'Prof. Rajan',
      priority: 'Low',
      dueDate: '2024-01-15'
    },
    {
      id: 5,
      title: 'Update Lab Safety Protocols',
      program: 'M.Tech Chemical',
      stage: 'Faculty Review',
      status: 'Pending',
      initiator: 'Dr. Anitha',
      priority: 'High',
      dueDate: '2024-02-28'
    },
    {
      id: 6,
      title: 'Add Industry-Oriented Modules',
      program: 'B.Tech Mechanical',
      stage: 'Curriculum Committee',
      status: 'Pending',
      initiator: 'Prof. Senthil',
      priority: 'Medium',
      dueDate: '2024-03-10'
    },
    {
      id: 7,
      title: 'Review AI Elective Syllabus',
      program: 'B.Tech AI & DS',
      stage: 'Faculty Review',
      status: 'In Progress',
      initiator: 'Dr. Nandhini',
      priority: 'High',
      dueDate: '2024-03-05'
    },
    {
      id: 8,
      title: 'New Internship Guidelines',
      program: 'B.Tech IT',
      stage: 'Registrar Review',
      status: 'Pending',
      initiator: 'Prof. Ramesh',
      priority: 'Medium',
      dueDate: '2024-03-12'
    },
    {
      id: 9,
      title: 'Curriculum Mapping Audit',
      program: 'B.Sc Mathematics',
      stage: 'Faculty Review',
      status: 'Completed',
      initiator: 'Dr. Lavanya',
      priority: 'Low',
      dueDate: '2024-02-18'
    },
    {
      id: 10,
      title: 'Incorporate NEP Guidelines',
      program: 'B.Ed',
      stage: 'Curriculum Committee',
      status: 'Pending',
      initiator: 'Prof. Karthik',
      priority: 'High',
      dueDate: '2024-04-01'
    },
    {
      id: 11,
      title: 'Digital Tools Integration Plan',
      program: 'MCA',
      stage: 'Faculty Review',
      status: 'In Progress',
      initiator: 'Dr. Divya',
      priority: 'Medium',
      dueDate: '2024-03-20'
    },
    {
      id: 12,
      title: 'Include Open Electives',
      program: 'MBA',
      stage: 'Curriculum Committee',
      status: 'Pending',
      initiator: 'Dr. Shalini',
      priority: 'High',
      dueDate: '2025-09-22'
    },
    {
      id: 13,
      title: 'New Software Inclusion',
      program: 'MCA',
      stage: 'Curriculum Committee',
      status: 'Pending',
      initiator: 'Prof. Naveen',
      priority: 'Low',
      dueDate: '2025-09-29'
    },
    {
      id: 14,
      title: 'Revamp Course Outcomes',
      program: 'BBA',
      stage: 'Faculty Review',
      status: 'Pending',
      initiator: 'Dr. Shalini',
      priority: 'Low',
      dueDate: '2025-09-07'
    },
    {
      id: 15,
      title: 'Remove Obsolete Topics',
      program: 'B.Sc Physics',
      stage: 'Faculty Review',
      status: 'In Progress',
      initiator: 'Prof. Aravind',
      priority: 'High',
      dueDate: '2025-08-17'
    },
    {
      id: 16,
      title: 'Update Lab Manual',
      program: 'B.Tech CSE',
      stage: 'Curriculum Committee',
      status: 'In Progress',
      initiator: 'Dr. Kumar',
      priority: 'High',
      dueDate: '2025-09-27'
    },
    {
      id: 17,
      title: 'New Software Inclusion',
      program: 'MBA',
      stage: 'Faculty Review',
      status: 'In Progress',
      initiator: 'Dr. Priya',
      priority: 'High',
      dueDate: '2025-08-12'
    },
    {
      id: 18,
      title: 'Revamp Course Outcomes',
      program: 'MBA',
      stage: 'Registrar Review',
      status: 'Completed',
      initiator: 'Prof. Naveen',
      priority: 'Medium',
      dueDate: '2025-09-23'
    },
    {
      id: 19,
      title: 'Include Open Electives',
      program: 'MCA',
      stage: 'Curriculum Committee',
      status: 'Completed',
      initiator: 'Prof. Aravind',
      priority: 'Medium',
      dueDate: '2025-09-18'
    },
    {
      id: 20,
      title: 'Remove Obsolete Topics',
      program: 'MBA',
      stage: 'Faculty Review',
      status: 'In Progress',
      initiator: 'Prof. Rekha',
      priority: 'Medium',
      dueDate: '2025-09-21'
    },
    {
      id: 21,
      title: 'Faculty Training Schedule',
      program: 'B.Sc Physics',
      stage: 'Curriculum Committee',
      status: 'In Progress',
      initiator: 'Prof. Naveen',
      priority: 'High',
      dueDate: '2025-09-23'
    }

  ]);

  const [lessonPlans, setLessonPlans] = useState([
    {
      id: 1,
      subject: 'Data Structures & Algorithms',
      semester: 'Semester 3',
      topics: 8,
      units: 4,
      completion: 75,
      lastUpdated: '2024-01-15',
      faculty: 'Dr.Manikandan'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const openDialog = (dialogName: string, item = null) => {
    setSelectedItem(item);
    setDialogStates(prev => ({ ...prev, [dialogName]: true }));
  };

  const closeDialog = (dialogName: string) => {
    setDialogStates(prev => ({ ...prev, [dialogName]: false }));
    setSelectedItem(null);
  };

  // CRUD operations
  const handleCreateRegulation = (data: any) => {
    const newRegulation = {
      id: regulations.length + 1,
      year: data.year,
      programs: data.programs,
      status: 'Active',
      effectiveFrom: data.effectiveFrom,
      students: 0
    };
    setRegulations([...regulations, newRegulation]);
  };

  const handleUpdateRegulation = (data: any) => {
    setRegulations(regulations.map(reg =>
      reg.id === selectedItem?.id ? { ...reg, ...data } : reg
    ));
  };

  const handleDeleteRegulation = (id: number) => {
    if (confirm('Are you sure you want to delete this regulation?')) {
      setRegulations(regulations.filter(reg => reg.id !== id));
    }
  };

  const handleCreateRevision = (data: any) => {
    const newRevision = {
      id: workflows.length + 1,
      title: data.title,
      program: data.program,
      stage: 'Gap Analysis',
      status: 'In Progress',
      initiator: currentUser.name,
      priority: data.priority,
      dueDate: data.targetDate
    };
    setWorkflows([...workflows, newRevision]);
  };

  const handleCreateLessonPlan = (data: any) => {
    const newPlan = {
      id: lessonPlans.length + 1,
      subject: data.subject,
      semester: data.semester,
      topics: 0,
      units: parseInt(data.totalUnits) || 0,
      completion: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      faculty: data.faculty
    };
    setLessonPlans([...lessonPlans, newPlan]);
  };

  const handleApproveWorkflow = (id: number) => {
    setWorkflows(workflows.map(w =>
      w.id === id ? { ...w, status: 'Approved' } : w
    ));
  };

  const handleUpdateRevision = (data: any) => {
    setWorkflows(workflows.map(w =>
      w.id === selectedItem?.id ? { ...w, ...data } : w
    ));
  };

  const handleUpdateLessonPlan = (data: any) => {
    setLessonPlans(lessonPlans.map(plan =>
      plan.id === selectedItem?.id ? { ...plan, ...data } : plan
    ));
  };

  const handleCreateNewCurriculum = (data: any) => {
    console.log('Creating new curriculum:', data);
    // Add to regulations state as a new curriculum
    const newCurriculum = {
      id: regulations.length + 1,
      year: data.regulation,
      programs: [data.degree],
      status: 'Draft',
      effectiveFrom: data.effectiveFrom,
      students: 0,
      programName: data.programName,
      department: data.department,
      totalCredits: data.totalCredits,
      subjects: data.subjects
    };
    setRegulations([...regulations, newCurriculum]);
  };

  const handleBulkUpload = (data: any) => {
    console.log('Bulk upload data:', data);
    // Process bulk upload based on type
    if (data.type === 'subjects') {
      // Add subjects to lesson plans or curriculum
      console.log('Importing subjects:', data.data);
    } else if (data.type === 'regulations') {
      // Add regulations
      console.log('Importing regulations:', data.data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curriculum Management</h1>
    {/*      <p className="text-muted-foreground mt-2">
            Role-based curriculum development and delivery system • Current Role: <span className="font-semibold text-blue-600">{currentUser.role}</span>
          </p>*/}
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="B.Tech CSE">B.Tech CSE</SelectItem>
              <SelectItem value="B.Tech ECE">B.Tech ECE</SelectItem>
              <SelectItem value="MBA">MBA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegulation} onValueChange={setSelectedRegulation}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="R-2024">R-2024</SelectItem>
              <SelectItem value="R-2023">R-2023</SelectItem>
              <SelectItem value="R-2022">R-2022</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('quickAction')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Role-based Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Programs</p>
                <p className="text-3xl font-bold text-blue-900">12</p>
                <p className="text-xs text-blue-600">Across all regulations</p>
              </div>
              <School className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  {currentUser.role === 'Faculty' ? 'My Subjects' : 'Total Subjects'}
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {currentUser.role === 'Faculty' ? '6' : '248'}
                </p>
                <p className="text-xs text-green-600">
                  {currentUser.role === 'Faculty' ? 'Assigned to me' : 'Curriculum subjects'}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  {currentUser.role === 'Student' ? 'My Credits' : 'Total Credits'}
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {currentUser.role === 'Student' ? '24/180' : '1,680'}
                </p>
                <p className="text-xs text-purple-600">
                  {currentUser.role === 'Student' ? 'This semester' : 'All programs'}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  {currentUser.role === 'Faculty' ? 'Completion Rate' : 'Workflow Status'}
                </p>
                <p className="text-3xl font-bold text-orange-900">
                  {currentUser.role === 'Faculty' ? '87%' : '5'}
                </p>
                <p className="text-xs text-orange-600">
                  {currentUser.role === 'Faculty' ? 'Syllabus covered' : 'Pending approvals'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area with Role-based Tabs */}
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="w-full h-14 bg-gradient-to-r from-blue-50 to-purple-50 rounded-none border-b">
              <TabsTrigger value="overview" className="flex-1 h-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              
              {hasPermission('AM04_regulation_years', 'view', userWithNormalizedRole) && (
                <TabsTrigger value="regulation-years" className="flex-1 h-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Regulation Years
                </TabsTrigger>
              )}
              
              {hasPermission('AM05_revision_workflow', 'view', userWithNormalizedRole) && (
                <TabsTrigger value="revision-workflow" className="flex-1 h-full">
                  <Workflow className="h-4 w-4 mr-2" />
                  Revision Workflow
                </TabsTrigger>
              )}
              
              {hasPermission('AM06_academic_structure', 'view', userWithNormalizedRole) && (
                <TabsTrigger value="academic-structure" className="flex-1 h-full">
                  <Layers className="h-4 w-4 mr-2" />
                  Academic Structure
                </TabsTrigger>
              )}
              
              {hasPermission('AM10_obe_cbcs', 'view', userWithNormalizedRole) && (
                <TabsTrigger value="obe-cbcs" className="flex-1 h-full">
                  <Target className="h-4 w-4 mr-2" />
                  OBE & CBCS
                </TabsTrigger>
              )}
              
              {(hasPermission('AM09_elective_selection', 'view', userWithNormalizedRole) || hasPermission('AM09_elective_selection', 'select', userWithNormalizedRole)) && (
                <TabsTrigger value="electives" className="flex-1 h-full">
                  <Star className="h-4 w-4 mr-2" />
                  Electives
                </TabsTrigger>
              )}
              
              {hasPermission('AM11_syllabus_tracking', 'view', userWithNormalizedRole) && (
                <TabsTrigger value="syllabus-tracking" className="flex-1 h-full">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Syllabus Tracking
                </TabsTrigger>
              )}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 space-y-6">
              <OverviewSection openDialog={openDialog} closeDialog={closeDialog} currentUser={userWithNormalizedRole} />
            </TabsContent>

            {/* AM04: Regulation Years Tab */}
            {hasPermission('AM04_regulation_years', 'view', userWithNormalizedRole) && (
              <TabsContent value="regulation-years" className="p-6 space-y-6">
                <RegulationYearsSection
                  openDialog={openDialog}
                  closeDialog={closeDialog}
                  regulations={regulations}
                  onDelete={handleDeleteRegulation}
                  currentUser={userWithNormalizedRole}
                />
              </TabsContent>
            )}

            {/* AM05: Revision Workflow Tab */}
            {hasPermission('AM05_revision_workflow', 'view', userWithNormalizedRole) && (
              <TabsContent value="revision-workflow" className="p-6 space-y-6">
                <RevisionWorkflowSection
                  openDialog={openDialog}
                  closeDialog={closeDialog}
                  workflows={workflows}
                  onApprove={handleApproveWorkflow}
                  currentUser={userWithNormalizedRole}
                />
              </TabsContent>
            )}

            {/* AM06: Academic Structure Tab */}
            {hasPermission('AM06_academic_structure', 'view', userWithNormalizedRole) && (
              <TabsContent value="academic-structure" className="p-6 space-y-6">
                <AcademicStructureSection
                  openDialog={openDialog}
                  closeDialog={closeDialog}
                  lessonPlans={lessonPlans}
                  currentUser={userWithNormalizedRole}
                />
              </TabsContent>
            )}

            {/* AM10: OBE & CBCS Tab */}
            {hasPermission('AM10_obe_cbcs', 'view', userWithNormalizedRole) && (
              <TabsContent value="obe-cbcs" className="p-6 space-y-6">
                <OBECBCSSection openDialog={openDialog} closeDialog={closeDialog} currentUser={userWithNormalizedRole} />
              </TabsContent>
            )}

            {/* AM09: Electives Tab */}
            {(hasPermission('AM09_elective_selection', 'view', userWithNormalizedRole) || hasPermission('AM09_elective_selection', 'select', userWithNormalizedRole)) && (
              <TabsContent value="electives" className="p-6 space-y-6">
                <ElectivesSection openDialog={openDialog} closeDialog={closeDialog} currentUser={userWithNormalizedRole} />
              </TabsContent>
            )}

            {/* AM11: Syllabus Tracking Tab */}
            {hasPermission('AM11_syllabus_tracking', 'view', userWithNormalizedRole) && (
              <TabsContent value="syllabus-tracking" className="p-6 space-y-6">
                <SyllabusTrackingSection openDialog={openDialog} closeDialog={closeDialog} currentUser={userWithNormalizedRole} />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {/* All Dialogs */}
      <QuickActionDialog
        isOpen={dialogStates.quickAction}
        onClose={() => closeDialog('quickAction')}
        onSave={(action) => {
          closeDialog('quickAction');
          if (action === 'newRegulation') {
            openDialog('createNewCurriculum');
          } else if (action === 'bulkUpload') {
            openDialog('bulkUpload');
          } else {
            openDialog(action);
          }
        }}
      />

      <NewRegulationDialog
        isOpen={dialogStates.newRegulation}
        onClose={() => closeDialog('newRegulation')}
        onSave={handleCreateRegulation}
      />

      <RegulationViewDialog
        isOpen={dialogStates.regulationView}
        onClose={() => closeDialog('regulationView')}
        item={selectedItem}
      />

      <RegulationEditDialog
        isOpen={dialogStates.regulationEdit}
        onClose={() => closeDialog('regulationEdit')}
        item={selectedItem}
        onSave={handleUpdateRegulation}
      />

      <InitiateRevisionDialog
        isOpen={dialogStates.initiateRevision}
        onClose={() => closeDialog('initiateRevision')}
        onSave={handleCreateRevision}
      />

      <RevisionViewDialog
        isOpen={dialogStates.revisionView}
        onClose={() => closeDialog('revisionView')}
        item={selectedItem}
      />

      <CreateLessonPlanDialog
        isOpen={dialogStates.createLessonPlan}
        onClose={() => closeDialog('createLessonPlan')}
        onSave={handleCreateLessonPlan}
      />

      <AddUnitDialog
        isOpen={dialogStates.addUnit}
        onClose={() => closeDialog('addUnit')}
        onSave={(data) => console.log('Add unit:', data)}
      />

      <ConfigureOutcomesDialog
        isOpen={dialogStates.configureOutcomes}
        onClose={() => closeDialog('configureOutcomes')}
        onSave={(data) => console.log('Configure outcomes:', data)}
      />

      <APIIntegrationsDialog
        isOpen={dialogStates.apiIntegrations}
        onClose={() => closeDialog('apiIntegrations')}
      />

      <PendingApprovalsDialog
        isOpen={dialogStates.pendingApprovals}
        onClose={() => closeDialog('pendingApprovals')}
      />

      <ManageElectivePoliciesDialog
        isOpen={dialogStates.manageElectivePolicies}
        onClose={() => closeDialog('manageElectivePolicies')}
        onSave={(data) => console.log('Elective policies:', data)}
      />

      <AddTopicDialog
        isOpen={dialogStates.addTopic}
        onClose={() => closeDialog('addTopic')}
        onSave={(data) => console.log('Add topic:', data)}
      />

      <AddLearningOutcomeDialog
        isOpen={dialogStates.addLearningOutcome}
        onClose={() => closeDialog('addLearningOutcome')}
        onSave={(data) => console.log('Add learning outcome:', data)}
      />

      <EditLessonPlanDialog
        isOpen={dialogStates.editLessonPlan}
        onClose={() => closeDialog('editLessonPlan')}
        item={selectedItem}
        onSave={handleUpdateLessonPlan}
      />

      <EditCourseOutcomeDialog
        isOpen={dialogStates.editCourseOutcome}
        onClose={() => closeDialog('editCourseOutcome')}
        item={selectedItem}
        onSave={(data) => console.log('Edit course outcome:', data)}
      />

      <ProgramLearningOutcomesDialog
        isOpen={dialogStates.programLearningOutcomes}
        onClose={() => closeDialog('programLearningOutcomes')}
        onSave={(data) => console.log('Program learning outcomes:', data)}
      />

      <COPLOMappingDialog
        isOpen={dialogStates.coploMapping}
        onClose={() => closeDialog('coploMapping')}
        item={selectedItem}
        onSave={(data) => console.log('CO-PLO mapping:', data)}
      />

      <RevisionEditDialog
        isOpen={dialogStates.revisionEdit}
        onClose={() => closeDialog('revisionEdit')}
        item={selectedItem}
        onSave={handleUpdateRevision}
      />

      <CreateNewCurriculumDialog
        isOpen={dialogStates.createNewCurriculum}
        onClose={() => closeDialog('createNewCurriculum')}
        onSave={handleCreateNewCurriculum}
      />

      <BulkUploadDialog
        isOpen={dialogStates.bulkUpload}
        onClose={() => closeDialog('bulkUpload')}
        onSave={handleBulkUpload}
      />
    </div>
  );
}

// Overview Section Component
function OverviewSection({ openDialog, closeDialog, currentUser }: { openDialog: (name: string, item?: any) => void; closeDialog: (name: string) => void; currentUser: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <ClipboardList className="h-5 w-5" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>Common curriculum management tasks based on your role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentUser.role === 'Admin' && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('newRegulation')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure New Regulation Year
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('apiIntegrations')}
                >
                  <Network className="h-4 w-4 mr-2" />
                  Manage API Integrations
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('pendingApprovals')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Review Pending Approvals
                </Button>
              </>
            )}
            
            {currentUser.role === 'Faculty' && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('createLessonPlan')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Syllabus Content
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('configureOutcomes')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Map Course Outcomes
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('initiateRevision')}
                >
                  <GitBranch className="h-4 w-4 mr-2" />
                  Propose Curriculum Revision
                </Button>
              </>
            )}
            
            {currentUser.role === 'Student' && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveSection('electives')}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Select Elective Subjects
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveSection('syllabus-tracking')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Syllabus Progress
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveSection('obe-cbcs')}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Check Course Outcomes
                </Button>
              </>
            )}
            
            {currentUser.role === 'Parent' && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveSection('syllabus-tracking')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Student Progress
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveSection('obe-cbcs')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Academic Performance
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => openDialog('quickAction')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Academic Calendar
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <Clock className="h-5 w-5" />
              </div>
              Recent Activities
            </CardTitle>
            <CardDescription>Latest curriculum-related activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Syllabus uploaded for Data Structures', user: 'Dr.Manikandan', time: '2 hours ago', type: 'upload' },
                { action: 'Course outcomes mapped for AI & ML', user: 'Prof.Kumar', time: '4 hours ago', type: 'mapping' },
                { action: 'Elective selection opened for Sem 5', user: 'System', time: '6 hours ago', type: 'system' },
                { action: 'Curriculum revision approved', user: 'Academic Committee', time: '1 day ago', type: 'approval' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'upload' ? 'bg-blue-500' :
                      activity.type === 'mapping' ? 'bg-green-500' :
                      activity.type === 'system' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Access Matrix for Current Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Shield className="h-5 w-5" />
            </div>
            Your Curriculum Permissions ({currentUser.role})
          </CardTitle>
          <CardDescription>Features and actions available to your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(featureAccess).map(([feature, roles]) => {
              // Map new roles to existing role permissions for backward compatibility
              const getRolePermissions = (role: string) => {
                if (roles[role]) return roles[role];

                // Fallback mapping for new roles
                switch (role) {
                  case 'super-admin':
                    return roles['admin'] || { view: true, create: true, edit: true, delete: true };
                  case 'institution':
                  case 'principal':
                    return roles['admin'] || { view: true, create: true, edit: true, delete: true };
                  case 'hod':
                    return roles['faculty'] || { view: true, create: true, edit: true, delete: false };
                  case 'staff':
                    return roles['faculty'] || { view: true, create: false, edit: false, delete: false };
                  default:
                    return null;
                }
              };

              const userPermissions = getRolePermissions(currentUser.role);
              const hasAnyPermission = userPermissions ? Object.values(userPermissions).some(Boolean) : false;
              
              if (!hasAnyPermission) return null;
              
              const featureNames = {
                'AM04_regulation_years': 'Regulation Years',
                'AM05_revision_workflow': 'Revision Workflow',
                'AM06_academic_structure': 'Academic Structure',
                'AM07_credit_points': 'Credit Points & Hours',
                'AM08_mandatory_optional': 'Subject Configuration',
                'AM09_elective_selection': 'Elective Selection',
                'AM10_obe_cbcs': 'OBE & CBCS',
                'AM11_syllabus_tracking': 'Syllabus Tracking',
                'AM12_api_integration': 'API Integration'
              };
              
              return (
                <Card key={feature} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{featureNames[feature]}</h4>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(userPermissions).map(([action, allowed]) => 
                        allowed ? (
                          <Badge key={action} variant="secondary" className="text-xs">
                            {action}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// AM04: Regulation Years Section
function RegulationYearsSection({ openDialog, closeDialog, regulations, onDelete, currentUser }: {
  openDialog: (name: string, item?: any) => void;
  closeDialog: (name: string) => void;
  regulations: any[];
  onDelete: (id: number) => void;
  currentUser: any;
}) {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Regulation Year Configuration</h2>
        {hasPermission('AM04_regulation_years', 'create', currentUser) && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('newRegulation')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Regulation
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regulation Years Management</CardTitle>
          <CardDescription>
            Configure regulation years for programs by entity and track curriculum changes across academic years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Regulation Year</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Effective From</TableHead>
                <TableHead>Students Affected</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regulations.map((regulation) => (
                <TableRow key={regulation.id}>
                  <TableCell className="font-mono font-medium">{regulation.year}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {regulation.programs.map((program, index) => (
                        <Badge key={index} variant="outline">{program}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={regulation.status === 'Active' ? 'default' : 'secondary'}>
                      {regulation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{regulation.effectiveFrom}</TableCell>
                  <TableCell>{regulation.students.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDialog('regulationView', regulation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasPermission('AM04_regulation_years', 'edit', currentUser) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDialog('regulationEdit', regulation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {hasPermission('AM04_regulation_years', 'delete', currentUser) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(regulation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}

// AM05: Revision Workflow Section
function RevisionWorkflowSection({ openDialog, closeDialog, workflows, onApprove, currentUser }: {
  openDialog: (name: string, item?: any) => void;
  closeDialog: (name: string) => void;
  workflows: any[];
  onApprove: (id: number) => void;
  currentUser: any;
}) {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Curriculum Revision Workflow</h2>
        {hasPermission('AM05_revision_workflow', 'create', currentUser) && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('initiateRevision')}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Initiate Revision
          </Button>
        )}
      </div>

      {/* Workflow Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Revision Pipeline</CardTitle>
          <CardDescription>Track curriculum revision requests through approval workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[
              { stage: 'Gap Analysis', count: 2, color: 'blue' },
              { stage: 'Faculty Review', count: 3, color: 'yellow' },
              { stage: 'Committee Review', count: 1, color: 'purple' },
              { stage: 'Final Approval', count: 2, color: 'green' },
              { stage: 'Implementation', count: 1, color: 'gray' }
            ].map((stage, index) => (
              <div key={index} className={`p-4 rounded-lg bg-${stage.color}-50 border border-${stage.color}-200`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-${stage.color}-700`}>{stage.count}</div>
                  <div className={`text-sm text-${stage.color}-600`}>{stage.stage}</div>
                </div>
              </div>
            ))}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Revision Title</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Initiator</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{workflow.program}</Badge>
                  </TableCell>
                  <TableCell>{workflow.stage}</TableCell>
                  <TableCell>
                    <Badge variant={
                      workflow.status === 'Approved' ? 'default' : 
                      workflow.status === 'In Progress' ? 'secondary' : 'outline'
                    }>
                      {workflow.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{workflow.initiator}</TableCell>
                  <TableCell>
                    <Badge variant={workflow.priority === 'High' ? 'destructive' : 'secondary'}>
                      {workflow.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{workflow.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDialog('revisionView', workflow)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasPermission('AM05_revision_workflow', 'edit') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDialog('revisionEdit', workflow)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {hasPermission('AM05_revision_workflow', 'approve') && workflow.stage === 'Final Approval' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onApprove(workflow.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
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
    </div>
  );
}

// AM06: Academic Structure Section
function AcademicStructureSection({ openDialog, closeDialog, lessonPlans, currentUser }: {
  openDialog: (name: string, item?: any) => void;
  closeDialog: (name: string) => void;
  lessonPlans: any[];
  currentUser: any;
}) {
  const [selectedSubject, setSelectedSubject] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Academic Structure - Topics & Lesson Plans</h2>
        {hasPermission('AM06_academic_structure', 'create', currentUser) && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('createLessonPlan')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Create Lesson Plan
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Selection</CardTitle>
            <CardDescription>Choose subject to manage topics and lesson plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                <SelectItem value="dbms">Database Management Systems</SelectItem>
                <SelectItem value="os">Operating Systems</SelectItem>
                <SelectItem value="cn">Computer Networks</SelectItem>
              </SelectContent>
            </Select>

            {selectedSubject && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Subject Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Credits:</span>
                      <span className="font-medium">4 (3-1-0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge variant="outline">Core</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Prerequisites:</span>
                      <span className="font-medium">Programming Fundamentals</span>
                    </div>
                  </div>
                </div>

                {hasPermission('AM06_academic_structure', 'create', currentUser) && (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => openDialog('addUnit')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Unit
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => openDialog('addTopic')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Add Topic
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => openDialog('addLearningOutcome')}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Add Learning Outcome
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lesson Plans Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lesson Plans Overview</CardTitle>
            <CardDescription>
              {currentUser.role === 'Faculty' ? 'Manage your assigned lesson plans' : 'All lesson plans across subjects'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessonPlans.map((plan) => (
                <Card key={plan.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{plan.subject}</h4>
                        <p className="text-sm text-gray-600">{plan.semester} • {plan.faculty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{plan.completion}% Complete</Badge>
                        {hasPermission('AM06_academic_structure', 'edit') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDialog('editLessonPlan', plan)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{plan.units}</div>
                        <div className="text-xs text-blue-600">Units</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{plan.topics}</div>
                        <div className="text-xs text-green-600">Topics</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{plan.completion}%</div>
                        <div className="text-xs text-purple-600">Progress</div>
                      </div>
                    </div>

                    <Progress value={plan.completion} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">Last updated: {plan.lastUpdated}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// AM10: OBE & CBCS Section
function OBECBCSSection({ openDialog, closeDialog, currentUser }: { openDialog: (name: string, item?: any) => void; closeDialog: (name: string) => void; currentUser: any }) {
  const [activeOBETab, setActiveOBETab] = useState('outcomes');
  const [cbcsSettings, setCbcsSettings] = useState({
    minCredits: '18',
    maxCredits: '26',
    totalCredits: '180'
  });

  const handleCbcsChange = (field: string, value: string) => {
    setCbcsSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Outcome-Based Education & CBCS Support</h2>
        {hasPermission('AM10_obe_cbcs', 'create', currentUser) && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('configureOutcomes')}
          >
            <Target className="h-4 w-4 mr-2" />
            Configure Outcomes
          </Button>
        )}
      </div>

      <Tabs value={activeOBETab} onValueChange={setActiveOBETab}>
        <TabsList>
          <TabsTrigger value="outcomes">Course Outcomes</TabsTrigger>
          <TabsTrigger value="plos">Program Learning Outcomes</TabsTrigger>
          <TabsTrigger value="mapping">CO-PLO Mapping</TabsTrigger>
          <TabsTrigger value="cbcs">CBCS Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Outcomes (COs)</CardTitle>
              <CardDescription>Define and manage course-specific learning outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'CO1', description: 'Understand fundamental data structures and their applications', subject: 'Data Structures', level: 'Understanding' },
                  { id: 'CO2', description: 'Implement algorithms for searching and sorting', subject: 'Data Structures', level: 'Applying' },
                  { id: 'CO3', description: 'Analyze time and space complexity of algorithms', subject: 'Data Structures', level: 'Analyzing' },
                  { id: 'CO4', description: 'Design efficient solutions for complex problems', subject: 'Data Structures', level: 'Creating' }
                ].map((outcome, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="font-mono">{outcome.id}</Badge>
                            <Badge variant="secondary">{outcome.level}</Badge>
                          </div>
                          <p className="text-sm mb-2">{outcome.description}</p>
                          <p className="text-xs text-gray-600">Subject: {outcome.subject}</p>
                        </div>
                        {hasPermission('AM10_obe_cbcs', 'edit') && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDialog('editCourseOutcome', outcome)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDialog('coploMapping', outcome)}
                            >
                              <Target className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Learning Outcomes (PLOs)</CardTitle>
              <CardDescription>Define program-level learning outcomes and competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'PLO1', description: 'Apply knowledge of mathematics, science, and engineering fundamentals', domain: 'Knowledge', level: 'Apply' },
                  { id: 'PLO2', description: 'Design and conduct experiments to analyze and interpret data', domain: 'Problem Analysis', level: 'Analyze' },
                  { id: 'PLO3', description: 'Design systems and processes to meet specified requirements', domain: 'Design/Development', level: 'Create' },
                  { id: 'PLO4', description: 'Work effectively in multidisciplinary teams', domain: 'Individual and Team Work', level: 'Apply' },
                  { id: 'PLO5', description: 'Communicate effectively with diverse audiences', domain: 'Communication', level: 'Evaluate' }
                ].map((plo, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="font-mono">{plo.id}</Badge>
                            <Badge variant="secondary">{plo.domain}</Badge>
                            <Badge variant="outline">{plo.level}</Badge>
                          </div>
                          <p className="text-sm mb-2">{plo.description}</p>
                        </div>
                        {hasPermission('AM10_obe_cbcs', 'edit') && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDialog('editCourseOutcome', plo)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDialog('coploMapping', plo)}
                            >
                              <Target className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {hasPermission('AM10_obe_cbcs', 'create') && (
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => openDialog('programLearningOutcomes')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Program Learning Outcome
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CO-PLO Mapping Matrix</CardTitle>
              <CardDescription>Map Course Outcomes to Program Learning Outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left">Course Outcomes</th>
                      <th className="border border-gray-300 p-2 text-center">PLO1</th>
                      <th className="border border-gray-300 p-2 text-center">PLO2</th>
                      <th className="border border-gray-300 p-2 text-center">PLO3</th>
                      <th className="border border-gray-300 p-2 text-center">PLO4</th>
                      <th className="border border-gray-300 p-2 text-center">PLO5</th>
                      <th className="border border-gray-300 p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { co: 'CO1', plo1: 3, plo2: 2, plo3: 1, plo4: 0, plo5: 1 },
                      { co: 'CO2', plo1: 2, plo2: 3, plo3: 2, plo4: 1, plo5: 2 },
                      { co: 'CO3', plo1: 1, plo2: 3, plo3: 3, plo4: 2, plo5: 1 },
                      { co: 'CO4', plo1: 2, plo2: 2, plo3: 3, plo4: 3, plo5: 2 }
                    ].map((mapping, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-medium">{mapping.co}</td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Badge variant={mapping.plo1 === 3 ? 'default' : mapping.plo1 === 2 ? 'secondary' : mapping.plo1 === 1 ? 'outline' : 'outline'}>
                            {mapping.plo1}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Badge variant={mapping.plo2 === 3 ? 'default' : mapping.plo2 === 2 ? 'secondary' : mapping.plo2 === 1 ? 'outline' : 'outline'}>
                            {mapping.plo2}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Badge variant={mapping.plo3 === 3 ? 'default' : mapping.plo3 === 2 ? 'secondary' : mapping.plo3 === 1 ? 'outline' : 'outline'}>
                            {mapping.plo3}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Badge variant={mapping.plo4 === 3 ? 'default' : mapping.plo4 === 2 ? 'secondary' : mapping.plo4 === 1 ? 'outline' : 'outline'}>
                            {mapping.plo4}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Badge variant={mapping.plo5 === 3 ? 'default' : mapping.plo5 === 2 ? 'secondary' : mapping.plo5 === 1 ? 'outline' : 'outline'}>
                            {mapping.plo5}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDialog('coploMapping', mapping)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Mapping Legend:</h4>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">3</Badge>
                    <span>High Correlation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">2</Badge>
                    <span>Medium Correlation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">1</Badge>
                    <span>Low Correlation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">0</Badge>
                    <span>No Correlation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cbcs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Structure</CardTitle>
                <CardDescription>CBCS credit allocation and constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Credits/Semester</Label>
                    <Input
                      type="number"
                      value={cbcsSettings.minCredits}
                      onChange={(e) => handleCbcsChange('minCredits', e.target.value)}
                      readOnly={!hasPermission('AM10_obe_cbcs', 'edit')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Credits/Semester</Label>
                    <Input
                      type="number"
                      value={cbcsSettings.maxCredits}
                      onChange={(e) => handleCbcsChange('maxCredits', e.target.value)}
                      readOnly={!hasPermission('AM10_obe_cbcs', 'edit')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Total Program Credits</Label>
                  <Input
                    type="number"
                    value={cbcsSettings.totalCredits}
                    onChange={(e) => handleCbcsChange('totalCredits', e.target.value)}
                    readOnly={!hasPermission('AM10_obe_cbcs', 'edit')}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Credit Distribution</h4>
                  {[
                    { type: 'Core Courses', current: 90, total: 180, percentage: 50 },
                    { type: 'Elective Courses', current: 54, total: 180, percentage: 30 },
                    { type: 'Project Work', current: 36, total: 180, percentage: 20 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm text-gray-600">{item.current}/{item.total} credits</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Categories</CardTitle>
                <CardDescription>CBCS subject classification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Foundation Core', subjects: 8, credits: 24, color: 'blue' },
                    { category: 'Discipline Core', subjects: 18, credits: 66, color: 'green' },
                    { category: 'Discipline Elective', subjects: 12, credits: 36, color: 'purple' },
                    { category: 'Open Elective', subjects: 6, credits: 18, color: 'orange' },
                    { category: 'Project/Internship', subjects: 4, credits: 36, color: 'red' }
                  ].map((category, index) => (
                    <div key={index} className={`p-3 border rounded-lg bg-${category.color}-50 border-${category.color}-200`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{category.category}</h4>
                          <p className="text-sm text-gray-600">{category.subjects} subjects • {category.credits} credits</p>
                        </div>
                        <div className={`text-2xl font-bold text-${category.color}-600`}>
                          {category.credits}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// AM09: Electives Section
function ElectivesSection({ openDialog, closeDialog, currentUser }: { openDialog: (name: string, item?: any) => void; closeDialog: (name: string) => void; currentUser: any }) {
  const [electiveBaskets, setElectiveBaskets] = useState([
    {
      id: 1,
      name: 'Computer Science Specialization',
      semester: 'Semester 5',
      subjects: ['AI & Machine Learning', 'Data Science', 'Cybersecurity', 'Cloud Computing'],
      minSelection: 2,
      maxSelection: 3,
      availableSeats: { 'AI & Machine Learning': 45, 'Data Science': 50, 'Cybersecurity': 40, 'Cloud Computing': 35 },
      deadline: '2024-02-20'
    },
    {
      id: 2,
      name: 'Open Electives',
      semester: 'Semester 6',
      subjects: ['Digital Marketing', 'Entrepreneurship', 'Environmental Science', 'Psychology'],
      minSelection: 1,
      maxSelection: 2,
      availableSeats: { 'Digital Marketing': 30, 'Entrepreneurship': 25, 'Environmental Science': 40, 'Psychology': 35 },
      deadline: '2024-03-15'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Elective Subject Selection</h2>
        {hasPermission('AM09_elective_selection', 'override') && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('manageElectivePolicies')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Elective Policies
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {electiveBaskets.map((basket) => (
          <Card key={basket.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{basket.name}</CardTitle>
                  <CardDescription>
                    {basket.semester} • Select {basket.minSelection}-{basket.maxSelection} subjects • Deadline: {basket.deadline}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {currentUser.role === 'Student' && hasPermission('AM09_elective_selection', 'select') && (
                    <Button
                      size="sm"
                      onClick={() => console.log('Student elective selection')}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Select Electives
                    </Button>
                  )}
                  {currentUser.role === 'Faculty' && hasPermission('AM09_elective_selection', 'recommend') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog('manageElectivePolicies')}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Recommend
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basket.subjects.map((subject, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{subject}</h4>
                        <Badge variant={basket.availableSeats[subject] > 20 ? 'default' : 'destructive'}>
                          {basket.availableSeats[subject]} seats
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Credits:</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Prerequisites:</span>
                          <span className="font-medium">None</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Faculty:</span>
                          <span className="font-medium">Dr. {subject.split(' ')[0]}</span>
                        </div>
                      </div>

                      {currentUser.role === 'Student' && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Select this subject</span>
                            <Switch />
                          </div>
                        </div>
                      )}

                      {(currentUser.role === 'Admin' || currentUser.role === 'Faculty') && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Enrolled:</span>
                            <span className="font-medium">{50 - basket.availableSeats[subject]}/50</span>
                          </div>
                          <Progress value={((50 - basket.availableSeats[subject]) / 50) * 100} className="h-2 mt-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {currentUser.role === 'Student' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Selection Guidelines</h4>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• You must select between {basket.minSelection} and {basket.maxSelection} subjects from this basket</li>
                    <li>• Selection deadline: {basket.deadline}</li>
                    <li>• You can modify your selection until the deadline</li>
                    <li>• Seats are allocated on first-come, first-served basis</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// AM11: Syllabus Tracking Section
function SyllabusTrackingSection({ openDialog, closeDialog, currentUser }: { openDialog: (name: string, item?: any) => void; closeDialog: (name: string) => void; currentUser: any }) {
  const [syllabusData, setSyllabusData] = useState([
    {
      id: 1,
      subject: 'Data Structures & Algorithms',
      faculty: 'Dr.Manikandan',
      semester: 'Semester 3',
      totalUnits: 4,
      completedUnits: 3,
      totalTopics: 16,
      completedTopics: 12,
      lastUpdated: '2024-01-15',
      status: 'On Track'
    },
    {
      id: 2,
      subject: 'Database Management Systems',
      faculty: 'Prof.Kumar',
      semester: 'Semester 4',
      totalUnits: 5,
      completedUnits: 2,
      totalTopics: 20,
      completedTopics: 8,
      lastUpdated: '2024-01-10',
      status: 'Behind Schedule'
    },
    {
      id: 3,
      subject: 'Operating Systems',
      faculty: 'Dr.Joshua',
      semester: 'Semester 4',
      totalUnits: 4,
      completedUnits: 4,
      totalTopics: 18,
      completedTopics: 18,
      lastUpdated: '2024-01-12',
      status: 'Completed'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Syllabus Configuration & Completion Tracking</h2>
        {hasPermission('AM11_syllabus_tracking', 'upload') && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openDialog('createLessonPlan')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Syllabus
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-green-600">Average Completion</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-600">Subjects Tracked</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-orange-600">Behind Schedule</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-purple-600">Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tracking Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentUser.role === 'Faculty' ? 'My Syllabus Progress' : 'All Syllabus Tracking'}
          </CardTitle>
          <CardDescription>
            {currentUser.role === 'Faculty' ? 'Track and update your syllabus completion' : 
             currentUser.role === 'Student' ? 'View syllabus progress for your enrolled subjects' :
             'Monitor syllabus completion across all subjects and faculty'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syllabusData.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{item.subject}</h4>
                      <p className="text-sm text-gray-600">{item.semester} • {item.faculty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        item.status === 'Completed' ? 'default' :
                        item.status === 'On Track' ? 'secondary' : 'destructive'
                      }>
                        {item.status}
                      </Badge>
                      {hasPermission('AM11_syllabus_tracking', 'upload') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDialog('editLessonPlan', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Units Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Units Progress</span>
                        <span className="text-sm text-gray-600">
                          {item.completedUnits}/{item.totalUnits} units
                        </span>
                      </div>
                      <Progress value={(item.completedUnits / item.totalUnits) * 100} className="h-3" />
                      <div className="text-sm text-gray-600">
                        {Math.round((item.completedUnits / item.totalUnits) * 100)}% Complete
                      </div>
                    </div>

                    {/* Topics Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Topics Progress</span>
                        <span className="text-sm text-gray-600">
                          {item.completedTopics}/{item.totalTopics} topics
                        </span>
                      </div>
                      <Progress value={(item.completedTopics / item.totalTopics) * 100} className="h-3" />
                      <div className="text-sm text-gray-600">
                        {Math.round((item.completedTopics / item.totalTopics) * 100)}% Complete
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Last updated: {item.lastUpdated}
                    </span>
                    {currentUser.role === 'Faculty' && hasPermission('AM11_syllabus_tracking', 'upload') && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog('editLessonPlan', item)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Update Progress
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
