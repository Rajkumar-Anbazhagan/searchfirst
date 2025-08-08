import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasModuleAccess, ModuleType, isValidModuleId } from '@/utils/modulePermissions';
import AccessDenied from './AccessDenied';

interface ModuleScopeProtectedRouteProps {
  children: React.ReactNode;
  requiredModule: ModuleType;
}

export default function ModuleScopeProtectedRoute({ 
  children, 
  requiredModule 
}: ModuleScopeProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Get scoping information from location state
  const scopedToModule = location.state?.scopedToModule;
  const selectedModule = location.state?.selectedModule;

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has access to the required module
  if (!hasModuleAccess(user.role, requiredModule)) {
    return <AccessDenied 
      message={`You don't have permission to access the ${requiredModule} module.`}
    />;
  }

  // If we're in scoped mode, check if the current page's module matches the selected module
  if (scopedToModule && selectedModule && isValidModuleId(selectedModule)) {
    // Special case: if selected module is master-setup and user is super-admin, allow access to all modules
    if (selectedModule === 'master-setup' && user.role === 'super-admin') {
      return <>{children}</>;
    }

    // Otherwise, only allow access to the selected module
    if (requiredModule !== selectedModule) {
      return <Navigate 
        to="/dashboard" 
        state={{ 
          selectedModule: selectedModule,
          scopedToModule: true,
          moduleData: location.state?.moduleData
        }}
        replace 
      />;
    }
  }

  return <>{children}</>;
}
