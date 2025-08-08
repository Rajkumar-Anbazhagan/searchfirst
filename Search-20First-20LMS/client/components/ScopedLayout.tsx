import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { useSidebar } from '@/hooks/useDashboard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NotificationSystem from '@/components/NotificationSystem';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  Menu,
  X,
  School,
  UserCheck,
  Calendar,
  ClipboardList,
  Award,
  MessageSquare,
  Video,
  BarChart3,
  FileQuestion,
  MapPin,
  Trophy,
  ChevronDown,
  ArrowLeft,
  Home
} from 'lucide-react';
import { ModuleType } from '@/utils/modulePermissions';

interface MenuItem {
  title: string;
  icon: any;
  href?: string;
  children?: MenuItem[];
  module?: string;
  allowedRoles?: UserRole[];
}

// Get module-specific menu items
const getModuleMenuItems = (moduleId: ModuleType): MenuItem[] => {
  switch (moduleId) {
    case 'academic-operation':
      return [
        {
          title: 'Dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Students',
          icon: Users,
          href: '/academics/students',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Curriculum',
          icon: BookOpen,
          href: '/academics/curriculum',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Timetable',
          icon: Calendar,
          href: '/academics/timetable',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Lesson Plans',
          icon: ClipboardList,
          href: '/academics/lesson-plans',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Attendance',
          icon: UserCheck,
          href: '/academics/attendance',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Feedback',
          icon: MessageSquare,
          href: '/academics/feedback',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'student']
        },
        {
          title: 'Scholarships',
          icon: Award,
          href: '/academics/scholarships',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Reports',
          icon: BarChart3,
          href: '/academics/reports',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        }
      ];

    case 'lms':
      return [
        {
          title: 'Dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Courses',
          icon: BookOpen,
          href: '/lms/courses',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Assignments',
          icon: ClipboardList,
          href: '/lms/assignments',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'student']
        },
        {
          title: 'Assessments',
          icon: FileText,
          href: '/lms/assessments',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'student']
        },
        {
          title: 'Progress',
          icon: BarChart3,
          href: '/lms/progress',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Virtual Classrooms',
          icon: Video,
          href: '/lms/virtual-classrooms',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'student']
        },
        {
          title: 'Reports',
          icon: BarChart3,
          href: '/lms/reports',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        }
      ];

    case 'examination':
      return [
        {
          title: 'Dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        },
        {
          title: 'Planning',
          icon: Calendar,
          href: '/exams/planning',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Eligibility',
          icon: UserCheck,
          href: '/exams/eligibility',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Hall Tickets',
          icon: FileText,
          href: '/exams/halltickets',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Question Bank',
          icon: FileQuestion,
          href: '/exams/question-bank',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Results',
          icon: BarChart3,
          href: '/exams/results',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        },
        {
          title: 'Reports',
          icon: BarChart3,
          href: '/exams/reports',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty']
        }
      ];

    default:
      return [
        {
          title: 'Dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          allowedRoles: ['super-admin', 'admin', 'institution', 'principal', 'hod', 'faculty', 'staff', 'student']
        }
      ];
  }
};

interface ScopedLayoutProps {
  children: React.ReactNode;
  moduleId: ModuleType;
  moduleName: string;
}

export default function ScopedLayout({ children, moduleId, moduleName }: ScopedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showNotification } = useApp();
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  const menuItems = getModuleMenuItems(moduleId);

  // Filter menu items based on user role
  const filterMenuItemsByRole = (items: MenuItem[], userRole: UserRole): MenuItem[] => {
    return items.filter(item => {
      if (!item.allowedRoles) return true;
      return item.allowedRoles.includes(userRole) ||
        (item.allowedRoles.includes('institution') && userRole === 'principal') ||
        (item.allowedRoles.includes('principal') && userRole === 'institution');
    });
  };

  const filteredMenuItems = user ? filterMenuItemsByRole(menuItems, user.role) : [];

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.href) {
      showNotification({
        type: 'info',
        title: `Navigating to ${item.title}`,
        message: `Loading ${item.title}...`,
        read: false
      });
      setSidebarOpen(false);
    }
  };

  const handleExitModule = () => {
    navigate('/dashboard', { replace: true });
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.href === location.pathname;

    return (
      <Link
        key={item.title}
        to={item.href!}
        state={{
          scopedToModule: true,
          selectedModule: moduleId,
          moduleData: { title: moduleName, id: moduleId }
        }}
        className={cn(
          "flex items-center text-sm font-medium rounded-lg transition-colors",
          sidebarCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
          "text-gray-700 hover:text-blue-700 hover:bg-gray-50",
          isActive && "bg-blue-50 text-blue-700 font-semibold"
        )}
        onClick={() => {
          handleMenuItemClick(item);
          setSidebarOpen(false);
        }}
        title={sidebarCollapsed ? item.title : undefined}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300",
        "xl:static xl:inset-0",
        sidebarCollapsed ? "w-16 sm:w-20" : "w-64 sm:w-72 md:w-64",
        sidebarOpen || !sidebarCollapsed ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <div className={cn(
              "flex items-center gap-2 sm:gap-3",
              sidebarCollapsed && "justify-center w-full"
            )}>
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <School className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <span className="text-sm font-bold text-gray-900">{moduleName}</span>
                  <div className="text-xs text-gray-600">Module Dashboard</div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Exit Module Button */}
          {!sidebarCollapsed && (
            <div className="p-2 sm:p-4 border-b border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={handleExitModule}
              >
                <ArrowLeft className="h-4 w-4" />
                Exit Module
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <nav className={cn(
              "space-y-1 sm:space-y-2",
              sidebarCollapsed && "px-1"
            )}>
              {filteredMenuItems.map(item => renderMenuItem(item))}
            </nav>
          </div>

          {/* User Menu */}
          <div className="p-2 sm:p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "w-full gap-3",
                  sidebarCollapsed ? "justify-center p-2" : "justify-start"
                )}>
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium truncate">{user?.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile-settings')}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/help-support')}>
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  showNotification({
                    type: 'success',
                    title: 'Signed Out',
                    message: 'You have been successfully signed out',
                    read: false
                  });
                  logout();
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden xl:flex text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              title="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {moduleName} Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 capitalize">
                {user?.role} Access • Module View
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NotificationSystem />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile-settings')}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  showNotification({
                    type: 'success',
                    title: 'Signed Out',
                    message: 'You have been successfully signed out',
                    read: false
                  });
                  logout();
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile and tablet */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
