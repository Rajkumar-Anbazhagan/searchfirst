import { useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import ScopedLayout from './ScopedLayout';
import Layout from './Layout';
import { ModuleType, isValidModuleId, mapModuleId, getModuleDisplayName } from '@/utils/modulePermissions';
import { UserRole } from '@/contexts/AuthContext';

interface ProtectedScopedLayoutProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedScopedLayout({ children, allowedRoles }: ProtectedScopedLayoutProps) {
  const location = useLocation();

  // Try to get scoping info from location state first
  let scopedToModule = location.state?.scopedToModule;
  let selectedModule = location.state?.selectedModule;
  let moduleData = location.state?.moduleData;

  // If no state, try to infer from URL path
  if (!scopedToModule || !selectedModule) {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const possibleModule = pathSegments[0];

      // Map URL segments to module IDs
      let mappedModule: ModuleType | null = null;

      // Check direct module paths
      if (possibleModule === 'lms') {
        mappedModule = 'lms';
      } else if (possibleModule === 'academics') {
        mappedModule = 'academic-operation';
      } else if (possibleModule === 'exams') {
        mappedModule = 'examination';
      } else if (possibleModule === 'master') {
        mappedModule = 'master-setup';
      } else {
        // Try the general mapping function
        mappedModule = mapModuleId(possibleModule);
      }

      if (mappedModule) {
        // For module-specific URLs, we'll treat them as scoped unless they came from a direct URL entry
        scopedToModule = true;
        selectedModule = mappedModule;
        moduleData = {
          title: getModuleDisplayName(mappedModule),
          id: mappedModule
        };

        console.log('🔍 Inferred module scope from URL:', {
          pathname: location.pathname,
          selectedModule: mappedModule,
          scopedToModule: true
        });
      }
    }
  }

  // If we're in scoped mode and have a valid module, use ScopedLayout
  if (scopedToModule && selectedModule && isValidModuleId(selectedModule)) {
    const moduleName = moduleData?.title || getModuleDisplayName(selectedModule);

    console.log('✅ Using ScopedLayout for module:', selectedModule, 'at path:', location.pathname);

    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <ScopedLayout moduleId={selectedModule as ModuleType} moduleName={moduleName}>
          {children}
        </ScopedLayout>
      </ProtectedRoute>
    );
  }

  // Otherwise use the regular Layout
  console.log('❌ Using regular Layout for path:', location.pathname, 'state:', location.state);
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Layout>
        {children}
      </Layout>
    </ProtectedRoute>
  );
}
