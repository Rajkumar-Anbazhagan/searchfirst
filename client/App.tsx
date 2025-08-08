import "./global.css";
import "@/utils/authFix"; // Import auth debugging utilities
import "@/utils/roleAccessTester"; // Import role access testing utilities

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AutoLogin from "./pages/AutoLogin";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ModuleProtectedRoute, {
  MasterSetupProtection,
} from "./components/ModuleProtectedRoute";
import ModuleScopeProtectedRoute from "./components/ModuleScopeProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import RoleTest from "./pages/RoleTest";
import CalendarDemo from "./pages/CalendarDemo";
import ProfileSettings from "./pages/ProfileSettings";
import HelpSupport from "./pages/HelpSupport";
import ProfileDemo from "./pages/ProfileDemo";
import HelpDemo from "./pages/HelpDemo";
import ModuleDashboard from "./pages/ModuleDashboard";
import QuickLogin from "./pages/QuickLogin";
// Academic pages
import StudentsPage from "./pages/academics/Students";
import CurriculumPage from "./pages/academics/Curriculum";
import TimetablePage from "./pages/academics/Timetable";
import InteractiveTimetablePage from "./pages/academics/InteractiveTimetable";
import LessonPlansPage from "./pages/academics/LessonPlans";
import AttendancePage from "./pages/academics/Attendance";
import FeedbackPage from "./pages/academics/Feedback";
import ScholarshipsPage from "./pages/academics/Scholarships";
import DropoutsPage from "./pages/academics/Dropouts";
import CalendarPage from "./pages/academics/Calendar";
import AcademicReportsPage from "./pages/academics/Reports";
import NotificationsPage from "./pages/academics/Notifications";
import ServiceRequestsPage from "./pages/academics/ServiceRequests";

// LMS pages
import CoursesPage from "./pages/lms/Courses";
import AssignmentsPage from "./pages/lms/Assignments";
import AssessmentsPage from "./pages/lms/Assessments";
import ProgressPage from "./pages/lms/Progress";
import LessonsPage from "./pages/lms/Lessons";
import CohortsPage from "./pages/lms/Cohorts";
import DiscussionForumsPage from "./pages/lms/DiscussionForums";
import VirtualClassroomPage from "./pages/lms/VirtualClassroom";
import CertificatesPage from "./pages/lms/Certificates";
import ProctoringPage from "./pages/lms/Proctoring";
import ReportsPage from "./pages/lms/Reports";
import SessionsPage from "./pages/lms/Sessions";

// Core System pages
import EntitySetupPage from "./pages/master/EntitySetup";
import AcademicYearSetupPage from "./pages/master/AcademicYearSetup";
import ProgramSetupPage from "./pages/master/ProgramSetup";
import StreamCourseMappingSetupPage from "./pages/master/StreamCourseMappingSetup";
import TermSemesterSetupPage from "./pages/master/TermSemesterSetup";
import SubjectMasterSetupPage from "./pages/master/SubjectMasterSetup";
import RegistrationFormSetupPage from "./pages/master/RegistrationFormSetup";
import UserRolePermissionsSetupPage from "./pages/master/UserRolePermissionsSetup";
import StaffRolesPage from "./pages/staff/Roles";
import StaffAllotmentPage from "./pages/staff/Allotment";
import AdminsPage from "./pages/users/Admins";
import FacultyPage from "./pages/users/Faculty";
import UsersStudentsPage from "./pages/users/Students";
import PermissionsPage from "./pages/settings/Permissions";

// Exam pages
import ExamPlanningPage from "./pages/exams/Planning";
import ExamEligibilityPage from "./pages/exams/Eligibility";
import HallTicketsPage from "./pages/exams/HallTickets";
import QuestionBankPage from "./pages/exams/QuestionBank";
import ResultsPage from "./pages/exams/Results";
import PaperBlueprintPage from "./pages/exams/PaperBlueprint";
import PaperGenerationPage from "./pages/exams/PaperGeneration";
import InvigilatorsPage from "./pages/exams/Invigilators";
import SeatingPlanPage from "./pages/exams/SeatingPlan";
import EvaluationPage from "./pages/exams/Evaluation";
import RevaluationPage from "./pages/exams/Revaluation";
import TranscriptsPage from "./pages/exams/Transcripts";
import ExamReportsPage from "./pages/exams/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/auto-login" element={<AutoLogin />} />
              <Route path="/quick-login" element={<QuickLogin />} />
              <Route path="/calendar-demo" element={<CalendarDemo />} />
              <Route path="/profile-demo" element={<ProfileDemo />} />
              <Route path="/help-demo" element={<HelpDemo />} />
              <Route
                path="/module-dashboard"
                element={
                  <ProtectedLayout>
                    <ModuleDashboard />
                  </ProtectedLayout>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/dashboard/:role"
                element={
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/role-test"
                element={
                  <ProtectedLayout>
                    <RoleTest />
                  </ProtectedLayout>
                }
              />

              {/* Profile & Support - All Roles */}
              <Route
                path="/profile-settings"
                element={
                  <ProtectedLayout>
                    <ProfileSettings />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/help-support"
                element={
                  <ProtectedLayout>
                    <HelpSupport />
                  </ProtectedLayout>
                }
              />

              {/* Core System - Master Setup Module - Admin Only */}
              <Route
                path="/master/entity-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <EntitySetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/academic-year-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <AcademicYearSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/program-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <ProgramSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/stream-course-mapping"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StreamCourseMappingSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/term-semester-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <TermSemesterSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/subject-master-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <SubjectMasterSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/registration-form-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <RegistrationFormSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/master/user-role-permissions-setup"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <UserRolePermissionsSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/staff/roles"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StaffRolesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/staff/allotment"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StaffAllotmentPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/users/admins"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <AdminsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/users/faculty"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <FacultyPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/users/students"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <UsersStudentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/settings/permissions"
                element={
                  <ProtectedLayout
                    allowedRoles={["super-admin", "admin"]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <PermissionsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />

              {/* Academics Management */}
              <Route
                path="/academics/students"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <StudentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/curriculum"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <CurriculumPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/timetable"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <InteractiveTimetablePage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/lesson-plans"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <LessonPlansPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/attendance"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <AttendancePage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/feedback"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <FeedbackPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/scholarships"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <ScholarshipsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/dropouts"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <DropoutsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/calendar"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <CalendarPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/reports"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <AcademicReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/notifications"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <NotificationsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/academics/service-requests"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <ServiceRequestsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              {/* Academics Module Landing Page */}
              <Route
                path="/academics"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <ModuleDashboard />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />

              {/* Learning Management System (LMS) */}
              <Route
                path="/lms/courses"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "hod",
                      "faculty",
                      "staff",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CoursesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/assignments"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <AssignmentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/assessments"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <AssessmentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/progress"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                      "parent",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ProgressPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/lessons"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <LessonsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/cohorts"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CohortsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/discussion-forums"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <DiscussionForumsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/virtual-classrooms"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <VirtualClassroomPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/certificates"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CertificatesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/proctoring"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ProctoringPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/reports"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/lms/sessions"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "faculty",
                      "institution",
                      "principal",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <SessionsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              {/* LMS Module Landing Page */}
              <Route
                path="/lms"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ModuleDashboard />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              {/* Add remaining LMS routes as placeholders for now */}
              <Route
                path="/lms/*"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <PlaceholderPage
                        title="Learning Management"
                        module="lms"
                      />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />

              {/* Examinations Management System */}
              <Route
                path="/exams/planning"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamPlanningPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/eligibility"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamEligibilityPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/halltickets"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <HallTicketsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/question-bank"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <QuestionBankPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/results"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                      "parent",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ResultsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/paper-blueprint"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PaperBlueprintPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/paper-generation"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PaperGenerationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/invigilators"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <InvigilatorsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/seating-plan"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <SeatingPlanPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/evaluation"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <EvaluationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/revaluation"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <RevaluationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/transcripts"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <TranscriptsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              <Route
                path="/exams/reports"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              {/* Examinations Module Landing Page */}
              <Route
                path="/exams"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ModuleDashboard />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />
              {/* Add remaining exam routes as placeholders for now */}
              <Route
                path="/exams/*"
                element={
                  <ProtectedLayout
                    allowedRoles={[
                      "super-admin",
                      "admin",
                      "institution",
                      "principal",
                      "faculty",
                      "student",
                    ]}
                  >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PlaceholderPage title="Examinations" module="exams" />
                    </ModuleScopeProtectedRoute>
                  </ProtectedLayout>
                }
              />

              {/* Unimplemented Module Routes - Show Under Development */}
              <Route
                path="/student-support/*"
                element={<PlaceholderPage title="Student Support" module="core" />}
              />
              <Route
                path="/admission/*"
                element={<PlaceholderPage title="Admission" module="core" />}
              />
              <Route
                path="/alumni-management/*"
                element={<PlaceholderPage title="Alumni Management" module="core" />}
              />
              <Route
                path="/hostel/*"
                element={<PlaceholderPage title="Hostel" module="core" />}
              />
              <Route
                path="/library/*"
                element={<PlaceholderPage title="Library" module="core" />}
              />
              <Route
                path="/procurement/*"
                element={<PlaceholderPage title="Procurement" module="core" />}
              />
              <Route
                path="/asset-management/*"
                element={<PlaceholderPage title="Asset Management" module="core" />}
              />
              <Route
                path="/hrms/*"
                element={<PlaceholderPage title="HRMS" module="core" />}
              />
              <Route
                path="/payroll/*"
                element={<PlaceholderPage title="Payroll" module="core" />}
              />
              <Route
                path="/finance-management/*"
                element={<PlaceholderPage title="Finance Management" module="core" />}
              />
              <Route
                path="/affiliation/*"
                element={<PlaceholderPage title="Affiliation" module="core" />}
              />
              <Route
                path="/gte/*"
                element={<PlaceholderPage title="GTE" module="core" />}
              />
              <Route
                path="/research/*"
                element={<PlaceholderPage title="Research" module="core" />}
              />

              {/* Access Denied Route */}
              <Route path="/access-denied" element={<AccessDenied />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Fix for createRoot warning - only create root once
const container = document.getElementById("root")!;
let root = (container as any)._reactRoot;

if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(<App />);
