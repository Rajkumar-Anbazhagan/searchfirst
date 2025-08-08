import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedScopedLayout from "./components/ProtectedScopedLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AutoLogin from "./pages/AutoLogin";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ModuleProtectedRoute, { MasterSetupProtection } from "./components/ModuleProtectedRoute";
import ModuleScopeProtectedRoute from "./components/ModuleScopeProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import RoleTest from "./pages/RoleTest";
import CalendarDemo from "./pages/CalendarDemo";
import ProfileSettings from "./pages/ProfileSettings";
import HelpSupport from "./pages/HelpSupport";
import ProfileDemo from "./pages/ProfileDemo";
import HelpDemo from "./pages/HelpDemo";
import ModuleDashboard from "./pages/ModuleDashboard";
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
                  <ProtectedScopedLayout>
                    <Dashboard />
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/dashboard/:role"
                element={
                  <ProtectedScopedLayout>
                    <Dashboard />
                  </ProtectedScopedLayout>
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
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <EntitySetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/academic-year-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <AcademicYearSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/program-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <ProgramSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/stream-course-mapping"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StreamCourseMappingSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/term-semester-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <TermSemesterSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/subject-master-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <SubjectMasterSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/registration-form-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <RegistrationFormSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/master/user-role-permissions-setup"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <UserRolePermissionsSetupPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/staff/roles"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StaffRolesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/staff/allotment"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <StaffAllotmentPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/users/admins"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <AdminsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/users/faculty"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <FacultyPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/users/students"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <UsersStudentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/settings/permissions"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin"]}>
                    <ModuleScopeProtectedRoute requiredModule="master-setup">
                      <PermissionsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />

              {/* Academics Management */}
              <Route
                path="/academics/students"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <StudentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/curriculum"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <CurriculumPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/timetable"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <InteractiveTimetablePage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/lesson-plans"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <LessonPlansPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/attendance"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <AttendancePage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/feedback"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <FeedbackPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/scholarships"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <ScholarshipsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/dropouts"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal"]}>
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <DropoutsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/calendar"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <CalendarPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/reports"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <AcademicReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/notifications"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <NotificationsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/academics/service-requests"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="academic-operation">
                      <ServiceRequestsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />

              {/* Learning Management System (LMS) */}
              <Route
                path="/lms/courses"
                element={
                  <ProtectedScopedLayout
                      allowedRoles={["super-admin", "admin", "institution", "principal", "hod", "faculty", "staff", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CoursesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/assignments"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin","institution","principal","faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <AssignmentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/assessments"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <AssessmentsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/progress"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student", "parent"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ProgressPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/lessons"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <LessonsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/cohorts"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CohortsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/discussion-forums"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <DiscussionForumsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/virtual-classrooms"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <VirtualClassroomPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/certificates"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <CertificatesPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/proctoring"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ProctoringPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/reports"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <ReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/lms/sessions"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "faculty", "institution", "principal", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <SessionsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              {/* Add remaining LMS routes as placeholders for now */}
              <Route
                path="/lms/*"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="lms">
                      <PlaceholderPage
                        title="Learning Management"
                        module="lms"
                      />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />

              {/* Examinations Management System */}
              <Route
                path="/exams/planning"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamPlanningPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/eligibility"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamEligibilityPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/halltickets"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <HallTicketsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/question-bank"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <QuestionBankPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/results"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student", "parent"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ResultsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/paper-blueprint"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PaperBlueprintPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/paper-generation"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PaperGenerationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/invigilators"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <InvigilatorsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/seating-plan"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <SeatingPlanPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/evaluation"
                element={
                  <ProtectedScopedLayout allowedRoles={["super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <EvaluationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/revaluation"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <RevaluationPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/transcripts"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin", "admin", "institution", "principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <TranscriptsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              <Route
                path="/exams/reports"
                element={
                  <ProtectedScopedLayout allowedRoles={[, "super-admin", "admin", "institution", "principal", "faculty"]}>
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <ExamReportsPage />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />
              {/* Add remaining exam routes as placeholders for now */}
              <Route
                path="/exams/*"
                element={
                  <ProtectedScopedLayout
                    allowedRoles={["super-admin","admin","institution","principal", "faculty", "student"]}
                    >
                    <ModuleScopeProtectedRoute requiredModule="examination">
                      <PlaceholderPage title="Examinations" module="exams" />
                    </ModuleScopeProtectedRoute>
                  </ProtectedScopedLayout>
                }
              />

              {/* Access Denied Route */}
              <Route
                path="/access-denied"
                element={<AccessDenied />}
              />

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
