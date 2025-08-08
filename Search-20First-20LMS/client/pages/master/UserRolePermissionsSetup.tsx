import { useState } from 'react';
import { useFormHandler } from '@/hooks/useFormHandlers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Shield, Plus, Edit3, Trash2, Users, Lock, CheckCircle, XCircle, Settings, Eye, EyeOff } from 'lucide-react';
import { FormField } from '@/components/forms/FormField';

interface Permission {
  id: string;
  name: string;
  module: string;
  action: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  type: 'system' | 'custom';
  userCount: number;
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockPermissions: Permission[] = [
  { id: '1', name: 'Create Students', module: 'Academics', action: 'create', description: 'Can create new student records' },
  { id: '2', name: 'Edit Students', module: 'Academics', action: 'edit', description: 'Can modify student information' },
  { id: '3', name: 'Delete Students', module: 'Academics', action: 'delete', description: 'Can remove student records' },
  { id: '4', name: 'View Students', module: 'Academics', action: 'view', description: 'Can view student information' },
  { id: '5', name: 'Create Courses', module: 'LMS', action: 'create', description: 'Can create new courses' },
  { id: '6', name: 'Edit Courses', module: 'LMS', action: 'edit', description: 'Can modify course content' },
  { id: '7', name: 'Delete Courses', module: 'LMS', action: 'delete', description: 'Can remove courses' },
  { id: '8', name: 'View Courses', module: 'LMS', action: 'view', description: 'Can view course information' },
  { id: '9', name: 'Schedule Exams', module: 'Examinations', action: 'create', description: 'Can schedule new examinations' },
  { id: '10', name: 'Edit Exam Schedule', module: 'Examinations', action: 'edit', description: 'Can modify exam schedules' },
  { id: '11', name: 'View Exam Results', module: 'Examinations', action: 'view', description: 'Can view examination results' },
  { id: '12', name: 'Publish Results', module: 'Examinations', action: 'publish', description: 'Can publish exam results' },
  { id: '13', name: 'Manage Users', module: 'System', action: 'manage', description: 'Can manage user accounts' },
  { id: '14', name: 'System Settings', module: 'System', action: 'configure', description: 'Can modify system settings' }
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    type: 'system',
    userCount: 3,
    permissions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Faculty',
    description: 'Teaching staff with academic and course management access',
    type: 'system',
    userCount: 45,
    permissions: ['1', '2', '4', '5', '6', '8', '9', '10', '11'],
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Student',
    description: 'Students with limited view access',
    type: 'system',
    userCount: 1250,
    permissions: ['4', '8', '11'],
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Exam Coordinator',
    description: 'Staff responsible for examination management',
    type: 'custom',
    userCount: 8,
    permissions: ['4', '8', '9', '10', '11', '12'],
    status: 'active',
    createdAt: '2024-02-15'
  }
];

export default function UserRolePermissionsSetup() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [selectedRole, setSelectedRole] = useState<string>('1');
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isViewRoleModalOpen, setIsViewRoleModalOpen] = useState(false);
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false);
  const [selectedRoleForAction, setSelectedRoleForAction] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState('roles');

  const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = useState(false);
  const [selectedPermissionForEdit, setSelectedPermissionForEdit] = useState<Permission | null>(null);

  const roleFormHandler = useFormHandler(
    ['name', 'description', 'type'],
    {
      name: '',
      description: '',
      type: 'custom'
    }
  );

  // Helper functions
  const getFormData = (handler: any) => {
    return Object.keys(handler.formState).reduce((acc, key) => {
      acc[key] = handler.formState[key].value;
      return acc;
    }, {} as Record<string, any>);
  };

  const getFormErrors = (handler: any) => {
    return Object.keys(handler.formState).reduce((acc, key) => {
      acc[key] = handler.formState[key].error;
      return acc;
    }, {} as Record<string, any>);
  };

  const handleInputChange = (handler: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    handler.updateField(e.target.name, e.target.value);
  };

  const handleSubmit = (handler: any, onSubmit: (data: any) => Promise<void>) => (e: React.FormEvent) => {
    e.preventDefault();
    handler.submitForm(onSubmit);
  };

  const onCreateRole = async (data: any) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      type: data.type as 'system' | 'custom',
      userCount: 0,
      permissions: [],
      status: 'active',
      createdAt: new Date().toISOString()
    };

    setRoles(prev => [...prev, newRole]);
    setIsCreateRoleModalOpen(false);
    roleFormHandler.resetForm();
  };

  const handleEditRole = (role: Role) => {
    setSelectedRoleForAction(role);
    roleFormHandler.updateFields({
      name: role.name,
      description: role.description,
      type: role.type
    });
    setIsEditRoleModalOpen(true);
  };

  const onUpdateRole = async (data: any) => {
    if (!selectedRoleForAction) return;

    setRoles(prev => prev.map(role =>
      role.id === selectedRoleForAction.id
        ? {
            ...role,
            name: data.name,
            description: data.description,
            type: data.type as 'system' | 'custom'
          }
        : role
    ));

    setIsEditRoleModalOpen(false);
    setSelectedRoleForAction(null);
    roleFormHandler.resetForm();
  };

  const handleViewRole = (role: Role) => {
    setSelectedRoleForAction(role);
    setIsViewRoleModalOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRoleForAction(role);
    setIsDeleteRoleModalOpen(true);
  };

  const confirmDeleteRole = () => {
    if (!selectedRoleForAction) return;

    setRoles(prev => prev.filter(role => role.id !== selectedRoleForAction.id));

    // If we're deleting the currently selected role, select the first available role
    if (selectedRole === selectedRoleForAction.id && roles.length > 1) {
      const remainingRoles = roles.filter(role => role.id !== selectedRoleForAction.id);
      setSelectedRole(remainingRoles[0].id);
    }

    setIsDeleteRoleModalOpen(false);
    setSelectedRoleForAction(null);
  };



  const handleEditPermission = (permission: Permission) => {
    setSelectedPermissionForEdit(permission);
    setIsEditPermissionModalOpen(true);
  };

  const handleUpdatePermission = (updatedPermission: Permission) => {
    setPermissions(prev => prev.map(p =>
      p.id === updatedPermission.id ? updatedPermission : p
    ));
    setIsEditPermissionModalOpen(false);
    setSelectedPermissionForEdit(null);
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view':
        return <Eye className="h-3 w-3" />;
      case 'create':
        return <Plus className="h-3 w-3" />;
      case 'edit':
        return <Edit3 className="h-3 w-3" />;
      case 'delete':
        return <Trash2 className="h-3 w-3" />;
      case 'manage':
        return <Settings className="h-3 w-3" />;
      case 'publish':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Shield className="h-3 w-3" />;
    }
  };

  const groupPermissionsByModule = () => {
    const grouped: Record<string, Permission[]> = {};
    permissions.forEach(permission => {
      if (!grouped[permission.module]) {
        grouped[permission.module] = [];
      }
      grouped[permission.module].push(permission);
    });
    return grouped;
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole);
  const groupedPermissions = groupPermissionsByModule();

  const stats = {
    totalRoles: roles.length,
    activeRoles: roles.filter(r => r.status === 'active').length,
    totalUsers: roles.reduce((sum, r) => sum + r.userCount, 0),
    totalPermissions: permissions.length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Role & Permissions</h1>
          <p className="text-muted-foreground mt-2">
            Define roles and assign permissions to control system access
          </p>
        </div>
        <Dialog open={isCreateRoleModalOpen} onOpenChange={setIsCreateRoleModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Create New Role
              </DialogTitle>
              <DialogDescription>
                Create a new user role and assign permissions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(roleFormHandler, onCreateRole)} className="space-y-4">
              <FormField
                label="Role Name"
                name="name"
                value={getFormData(roleFormHandler).name}
                onChange={handleInputChange(roleFormHandler)}
                error={getFormErrors(roleFormHandler).name}
                placeholder="Exam Coordinator"
                required
              />
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={getFormData(roleFormHandler).description}
                onChange={handleInputChange(roleFormHandler)}
                error={getFormErrors(roleFormHandler).description}
                placeholder="Role description and responsibilities..."
                rows={3}
                required
              />
              <FormField
                label="Role Type"
                name="type"
                type="select"
                value={getFormData(roleFormHandler).type}
                onChange={handleInputChange(roleFormHandler)}
                error={getFormErrors(roleFormHandler).type}
                options={[
                  { label: 'Custom Role', value: 'custom' },
                  { label: 'System Role', value: 'system' }
                ]}
                required
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateRoleModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={roleFormHandler.isSubmitting}>
                  Create Role
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Roles</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalRoles}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Roles</p>
                <p className="text-3xl font-bold text-green-900">{stats.activeRoles}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Permissions</p>
                <p className="text-3xl font-bold text-orange-900">{stats.totalPermissions}</p>
              </div>
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles
              </CardTitle>
              <CardDescription>
                Select a role to manage permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedRole === role.id
                        ? 'bg-blue-50 border-blue-200 shadow-md'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{role.name}</h3>
                          <Badge className={getStatusColor(role.status)}>{role.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{role.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-blue-600">
                            <Users className="h-3 w-3" />
                            {role.userCount} users
                          </span>
                          <span className="flex items-center gap-1 text-green-600">
                            <Lock className="h-3 w-3" />
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <div className="mt-2">
                          <Badge variant={role.type === 'system' ? 'default' : 'outline'}>
                            {role.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRole(role);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
                          }}
                          disabled={role.type === 'system'}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role);
                          }}
                          disabled={role.type === 'system'}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Permissions for {selectedRoleData?.name}
              </CardTitle>
              <CardDescription>
                Toggle permissions for the selected role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                  <div key={module} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <div className="p-2 rounded bg-blue-100 text-blue-600">
                        {module === 'System' && <Settings className="h-4 w-4" />}
                        {module === 'Academics' && <Users className="h-4 w-4" />}
                        {module === 'LMS' && <Shield className="h-4 w-4" />}
                        {module === 'Examinations' && <CheckCircle className="h-4 w-4" />}
                      </div>
                      {module}
                    </h3>
                    <div className="grid gap-3">
                      {modulePermissions.map((permission) => {
                        const hasPermission = selectedRoleData?.permissions.includes(permission.id) || false;
                        return (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded bg-white">
                                {getActionIcon(permission.action)}
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{permission.name}</h4>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPermission(permission)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Switch
                                checked={hasPermission}
                                onCheckedChange={() => togglePermission(selectedRole, permission.id)}
                                disabled={selectedRoleData?.type === 'system' && selectedRoleData?.name === 'Administrator'}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Role
            </DialogTitle>
            <DialogDescription>
              Update role information and settings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(roleFormHandler, onUpdateRole)} className="space-y-4">
            <FormField
              label="Role Name"
              name="name"
              value={getFormData(roleFormHandler).name}
              onChange={handleInputChange(roleFormHandler)}
              error={getFormErrors(roleFormHandler).name}
              placeholder="Exam Coordinator"
              required
            />
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={getFormData(roleFormHandler).description}
              onChange={handleInputChange(roleFormHandler)}
              error={getFormErrors(roleFormHandler).description}
              placeholder="Role description and responsibilities..."
              rows={3}
              required
            />
            <FormField
              label="Role Type"
              name="type"
              type="select"
              value={getFormData(roleFormHandler).type}
              onChange={handleInputChange(roleFormHandler)}
              error={getFormErrors(roleFormHandler).type}
              options={[
                { label: 'Custom Role', value: 'custom' },
                { label: 'System Role', value: 'system' }
              ]}
              required
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditRoleModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={roleFormHandler.isSubmitting}>
                Update Role
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Role Dialog */}
      <Dialog open={isViewRoleModalOpen} onOpenChange={setIsViewRoleModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Role Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected role.
            </DialogDescription>
          </DialogHeader>

          {selectedRoleForAction && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRoleForAction.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRoleForAction.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(selectedRoleForAction.status)}>
                      {selectedRoleForAction.status}
                    </Badge>
                    <Badge variant={selectedRoleForAction.type === 'system' ? 'default' : 'outline'}>
                      {selectedRoleForAction.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">ASSIGNED USERS</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" />
                    {selectedRoleForAction.userCount} users
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">PERMISSIONS</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Lock className="h-3 w-3" />
                    {selectedRoleForAction.permissions.length} permissions
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">CREATED DATE</span>
                  <div className="mt-1">
                    {new Date(selectedRoleForAction.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">ROLE TYPE</span>
                  <div className="mt-1">
                    {selectedRoleForAction.type === 'system' ? 'System Role' : 'Custom Role'}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground">ASSIGNED PERMISSIONS</span>
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {selectedRoleForAction.permissions.map(permissionId => {
                    const permission = permissions.find(p => p.id === permissionId);
                    return permission ? (
                      <div key={permission.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        {getActionIcon(permission.action)}
                        <span className="text-sm">{permission.name}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {permission.module}
                        </Badge>
                      </div>
                    ) : null;
                  })}
                  {selectedRoleForAction.permissions.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No permissions assigned</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewRoleModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation */}
      <AlertDialog open={isDeleteRoleModalOpen} onOpenChange={setIsDeleteRoleModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{selectedRoleForAction?.name}"?
              This action cannot be undone and will affect {selectedRoleForAction?.userCount} users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteRole}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



      {/* Edit Permission Dialog */}
      <Dialog open={isEditPermissionModalOpen} onOpenChange={setIsEditPermissionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Permission
            </DialogTitle>
            <DialogDescription>
              Modify permission details and description.
            </DialogDescription>
          </DialogHeader>

          {selectedPermissionForEdit && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Permission Name</label>
                <input
                  type="text"
                  defaultValue={selectedPermissionForEdit.name}
                  className="w-full p-2 border rounded-md mt-1"
                  onChange={(e) => {
                    if (selectedPermissionForEdit) {
                      setSelectedPermissionForEdit({
                        ...selectedPermissionForEdit,
                        name: e.target.value
                      });
                    }
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Module</label>
                <select
                  defaultValue={selectedPermissionForEdit.module}
                  className="w-full p-2 border rounded-md mt-1"
                  onChange={(e) => {
                    if (selectedPermissionForEdit) {
                      setSelectedPermissionForEdit({
                        ...selectedPermissionForEdit,
                        module: e.target.value
                      });
                    }
                  }}
                >
                  <option value="System">System</option>
                  <option value="Academics">Academics</option>
                  <option value="LMS">LMS</option>
                  <option value="Examinations">Examinations</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Action</label>
                <select
                  defaultValue={selectedPermissionForEdit.action}
                  className="w-full p-2 border rounded-md mt-1"
                  onChange={(e) => {
                    if (selectedPermissionForEdit) {
                      setSelectedPermissionForEdit({
                        ...selectedPermissionForEdit,
                        action: e.target.value
                      });
                    }
                  }}
                >
                  <option value="view">View</option>
                  <option value="create">Create</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                  <option value="manage">Manage</option>
                  <option value="publish">Publish</option>
                  <option value="configure">Configure</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  defaultValue={selectedPermissionForEdit.description}
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                  onChange={(e) => {
                    if (selectedPermissionForEdit) {
                      setSelectedPermissionForEdit({
                        ...selectedPermissionForEdit,
                        description: e.target.value
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditPermissionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedPermissionForEdit) {
                  handleUpdatePermission(selectedPermissionForEdit);
                }
              }}
            >
              Update Permission
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
