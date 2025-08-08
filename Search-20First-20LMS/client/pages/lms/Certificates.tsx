import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import {
  Award, Plus, Download, Upload, Share, Eye, Edit, Trash2, Search,
  Shield, Star, Trophy, Medal, FileImage, Palette,
  Clock, User, BookOpen, Settings, CheckCircle, XCircle, Calendar,
  BarChart, TrendingUp, Users, Target, Zap
} from 'lucide-react';
import { IssueBadgeDialog } from '@/components/IssueBadgeDialog';

interface DigitalBadge {
  id: string;
  name: string;
  description: string;
  category: 'Achievement' | 'Skill' | 'Completion' | 'Progress' | 'Participation';
  criteria: string;
  imageUrl: string;
  backgroundColor: string;
  borderColor: string;
  issuingOrganization: string;
  validityPeriod?: number; // in months
  prerequisites: string[];
  skills: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  points: number;
  isActive: boolean;
  createdDate: string;
  totalIssued: number;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  templateId: string;
  templateName: string;
  courseId: string;
  courseName: string;
  category: 'Completion' | 'Achievement' | 'Participation' | 'Excellence';
  completionCriteria: CertificateCriteria;
  design: CertificateDesign;
  digitalSignature: DigitalSignature;
  issuingAuthority: string;
  validityPeriod?: number; // in months
  verificationCode: string;
  blockchainVerified: boolean;
  isActive: boolean;
  createdDate: string;
  totalIssued: number;
}

interface CertificateCriteria {
  completionPercentage: number;
  minimumGrade: number;
  attendancePercentage: number;
  assignmentCompletion: boolean;
  examCompletion: boolean;
  projectSubmission: boolean;
  timeLimit?: number; // in days
}

interface CertificateDesign {
  templateType: 'Classic' | 'Modern' | 'Elegant' | 'Corporate' | 'Custom';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string;
  backgroundImage?: string;
  layout: 'Portrait' | 'Landscape';
  size: 'A4' | 'Letter' | 'Certificate';
}

interface DigitalSignature {
  signatoryName: string;
  signatoryTitle: string;
  signatoryImage?: string;
  organizationSeal?: string;
  digitalKey: string;
  timestamp: boolean;
}

interface IssuedCredential {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  credentialType: 'Badge' | 'Certificate';
  credentialId: string;
  credentialName: string;
  issueDate: string;
  expiryDate?: string;
  verificationUrl: string;
  status: 'Valid' | 'Expired' | 'Revoked' | 'Pending';
  earnedPoints?: number;
  blockchainHash?: string;
}

const sampleBadges: DigitalBadge[] = [
  {
    id: '1',
    name: 'JavaScript Master',
    description: 'Demonstrates advanced proficiency in JavaScript programming',
    category: 'Skill',
    criteria: 'Complete all JavaScript modules with 85% average score',
    imageUrl: '/badges/javascript-master.svg',
    backgroundColor: '#F7DF1E',
    borderColor: '#323330',
    issuingOrganization: 'Tamil Nadu Polytechnic College',
    validityPeriod: 24,
    prerequisites: ['JavaScript Basics', 'ES6 Fundamentals'],
    skills: ['JavaScript', 'ES6+', 'Async Programming', 'DOM Manipulation'],
    level: 'Advanced',
    points: 150,
    isActive: true,
    createdDate: '2024-01-15',
    totalIssued: 42
  },
  {
    id: '2',
    name: 'Course Completion Champion',
    description: 'Successfully completed course within the designated timeframe',
    category: 'Completion',
    criteria: 'Complete course with 90% attendance and submit final project',
    imageUrl: '/badges/completion-champion.svg',
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
    issuingOrganization: 'Tamil Nadu Polytechnic College',
    prerequisites: [],
    skills: ['Time Management', 'Dedication', 'Consistency'],
    level: 'Beginner',
    points: 100,
    isActive: true,
    createdDate: '2024-01-10',
    totalIssued: 156
  }
];

const sampleCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web Development Certificate',
    description: 'Professional certificate for completing comprehensive web development program',
    templateId: 'template-1',
    templateName: 'Professional Modern',
    courseId: 'CSE2024',
    courseName: 'B.E Computer Science Engineering',
    category: 'Completion',
    completionCriteria: {
      completionPercentage: 90,
      minimumGrade: 80,
      attendancePercentage: 85,
      assignmentCompletion: true,
      examCompletion: true,
      projectSubmission: true,
      timeLimit: 180
    },
    design: {
      templateType: 'Modern',
      primaryColor: '#1E40AF',
      secondaryColor: '#3B82F6',
      accentColor: '#F59E0B',
      font: 'Playfair Display',
      logoUrl: '/logos/techedu-logo.png',
      layout: 'Landscape',
      size: 'A4'
    },
    digitalSignature: {
      signatoryName: 'Dr. Rajesh Kumar',
      signatoryTitle: 'Principal',
      digitalKey: 'cert-key-12345',
      timestamp: true
    },
    issuingAuthority: 'Tamil Nadu Polytechnic College',
    validityPeriod: 36,
    verificationCode: 'CERT-2024-WD-001',
    blockchainVerified: true,
    isActive: true,
    createdDate: '2024-01-15',
    totalIssued: 28
  }
];

const sampleIssuedCredentials: IssuedCredential[] = [
  {
    id: '1',
    recipientId: 'TN2401001',
    recipientName: 'Arjun Kumar',
    recipientEmail: 'arjun.kumar@tnpolytechnic.edu.in',
    credentialType: 'Certificate',
    credentialId: '1',
    credentialName: 'Full Stack Web Development Certificate',
    issueDate: '2024-02-10',
    expiryDate: '2027-02-10',
    verificationUrl: 'https://verify.techedu.com/CERT-2024-WD-001',
    status: 'Valid',
    blockchainHash: '0x1234567890abcdef'
  },
  {
    id: '2',
    recipientId: 'TN2401002',
    recipientName: 'Priya Sharma',
    recipientEmail: 'priya.sharma@tnpolytechnic.edu.in',
    credentialType: 'Badge',
    credentialId: '1',
    credentialName: 'JavaScript Master',
    issueDate: '2024-02-05',
    expiryDate: '2026-02-05',
    verificationUrl: 'https://verify.techedu.com/BADGE-JS-MASTER-456',
    status: 'Valid',
    earnedPoints: 150
  }
];

export default function Certificates() {
  const [badges, setBadges] = useState<DigitalBadge[]>(sampleBadges);
  const [certificates, setCertificates] = useState<Certificate[]>(sampleCertificates);
  const [issuedCredentials, setIssuedCredentials] = useState<IssuedCredential[]>(sampleIssuedCredentials);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateBadge = (formData: any) => {
    const newBadge: DigitalBadge = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      criteria: formData.criteria,
      imageUrl: formData.imageUrl || '/badges/default.svg',
      backgroundColor: formData.backgroundColor,
      borderColor: formData.borderColor,
      issuingOrganization: formData.issuingOrganization,
      validityPeriod: formData.validityPeriod,
      prerequisites: formData.prerequisites,
      skills: formData.skills,
      level: formData.level,
      points: parseInt(formData.points),
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      totalIssued: 0
    };
    
    setBadges([...badges, newBadge]);
    setIsCreateDialogOpen(false);
  };

  const handleCreateCertificate = (formData: any) => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      templateId: formData.templateId,
      templateName: formData.templateName,
      courseId: formData.courseId,
      courseName: formData.courseName,
      category: formData.category,
      completionCriteria: formData.completionCriteria,
      design: formData.design,
      digitalSignature: formData.digitalSignature,
      issuingAuthority: formData.issuingAuthority,
      validityPeriod: formData.validityPeriod,
      verificationCode: `CERT-${Date.now()}`,
      blockchainVerified: formData.blockchainVerified,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      totalIssued: 0
    };
    
    setCertificates([...certificates, newCertificate]);
    setIsCreateDialogOpen(false);
  };

  const handleDownloadCertificate = (certificateId: string, certificateTitle: string) => {
    // Simulate certificate download
    const blob = new Blob([`Certificate: ${certificateTitle}\nGenerated on: ${new Date().toISOString()}`],
      { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificateTitle.replace(/\s+/g, '_')}_certificate.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadBadge = (badgeId: string, badgeName: string) => {
    // Simulate badge download
    const blob = new Blob([`Digital Badge: ${badgeName}\nGenerated on: ${new Date().toISOString()}`],
      { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${badgeName.replace(/\s+/g, '_')}_badge.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates & Digital Badges</h1>
          <p className="text-muted-foreground">
            Manage digital credentials, certificates, and achievement badges
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Credential
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Credential</DialogTitle>
                <DialogDescription>
                  Design and configure digital badges or certificates
                </DialogDescription>
              </DialogHeader>
              <CreateCredentialForm 
                onSubmitBadge={handleCreateBadge}
                onSubmitCertificate={handleCreateCertificate}
                onCancel={() => setIsCreateDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Badges</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {badges.filter(b => b.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">Digital badges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Certificates</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {certificates.filter(c => c.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">Certificate templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {issuedCredentials.length}
            </div>
            <p className="text-xs text-muted-foreground">Credentials awarded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">98%</div>
            <p className="text-xs text-muted-foreground">Blockchain verified</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="badges">Digital Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="issued">Issued Credentials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Digital Badges
                </CardTitle>
                <CardDescription>
                  Create and manage skill-based digital badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Badges</span>
                    <Badge variant="outline">{badges.filter(b => b.isActive).length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Issued</span>
                    <Badge variant="outline">{badges.reduce((sum, b) => sum + b.totalIssued, 0)}</Badge>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('badges')}>
                    <Eye className="h-4 w-4 mr-2" />
                    Manage Badges
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  Certificates
                </CardTitle>
                <CardDescription>
                  Design and issue professional certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Templates</span>
                    <Badge variant="outline">{certificates.filter(c => c.isActive).length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Issued</span>
                    <Badge variant="outline">{certificates.reduce((sum, c) => sum + c.totalIssued, 0)}</Badge>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('certificates')}>
                    <Eye className="h-4 w-4 mr-2" />
                    Manage Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Issued Credentials
                </CardTitle>
                <CardDescription>
                  Track and verify issued credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Valid Credentials</span>
                    <Badge variant="outline">{issuedCredentials.filter(c => c.status === 'Valid').length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blockchain Verified</span>
                    <Badge variant="outline">{issuedCredentials.filter(c => c.blockchainHash).length}</Badge>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('issued')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Issued
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest credential issuance and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuedCredentials.slice(0, 5).map((credential) => (
                  <div key={credential.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-full">
                      {credential.credentialType === 'Badge' ?
                        <Shield className="h-4 w-4 text-blue-600" /> :
                        <Award className="h-4 w-4 text-green-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{credential.credentialName}</div>
                      <div className="text-sm text-muted-foreground">
                        Issued to {credential.recipientName} on {credential.issueDate}
                      </div>
                    </div>
                    <Badge variant={credential.status === 'Valid' ? 'default' : 'secondary'}>
                      {credential.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="skill">Skill</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="completion">Completion</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: badge.backgroundColor, borderColor: badge.borderColor, borderWidth: '2px' }}
                    >
                      <Shield className="h-6 w-6" style={{ color: badge.borderColor }} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <Badge variant="outline">{badge.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Level:</span>
                      <Badge variant="secondary">{badge.level}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Points:</span>
                      <span className="font-medium">{badge.points}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Issued:</span>
                      <span className="font-medium">{badge.totalIssued}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(badge)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{badge.name}</DialogTitle>
                          <DialogDescription>Digital badge details and settings</DialogDescription>
                        </DialogHeader>
                        {selectedItem && <BadgeDetailView badge={selectedItem} />}
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(badge)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Badge</DialogTitle>
                          <DialogDescription>Modify digital badge design and criteria</DialogDescription>
                        </DialogHeader>
                        {selectedItem && <EditBadgeDialog badge={selectedItem} onSave={(data) => console.log('Saving badge:', data)} onCancel={() => console.log('Badge edit cancelled')} />}
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(badge)}>
                          <Award className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Issue Badge</DialogTitle>
                          <DialogDescription>
                            Award this badge to students who meet the criteria
                          </DialogDescription>
                        </DialogHeader>
                        {selectedItem && <IssueBadgeDialog badge={selectedItem} onIssue={(data) => console.log('Issuing badge:', data)} />}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Badge</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this badge? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="completion">Completion</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="participation">Participation</SelectItem>
                <SelectItem value="excellence">Excellence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-full">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{certificate.title}</CardTitle>
                      <Badge variant="outline">{certificate.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{certificate.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course:</span>
                      <span className="font-medium">{certificate.courseName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Template:</span>
                      <span className="font-medium">{certificate.templateName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Issued:</span>
                      <span className="font-medium">{certificate.totalIssued}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Blockchain:</span>
                      <Badge variant={certificate.blockchainVerified ? 'default' : 'secondary'}>
                        {certificate.blockchainVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(certificate)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{certificate.title}</DialogTitle>
                          <DialogDescription>Certificate template details and preview</DialogDescription>
                        </DialogHeader>
                        {selectedItem && <CertificateDetailView certificate={selectedItem} />}
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(certificate)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Certificate</DialogTitle>
                          <DialogDescription>Modify certificate template settings and design</DialogDescription>
                        </DialogHeader>
                        {selectedItem && <EditCertificateDialog certificate={selectedItem} onSave={(data) => console.log('Saving certificate:', data)} onCancel={() => console.log('Certificate edit cancelled')} />}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Award className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadCertificate(certificate.id, certificate.title)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issued" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issued credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Credentials
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Issued Credentials</DialogTitle>
                  <DialogDescription>
                    Bulk upload credential records from external systems or manual issuance
                  </DialogDescription>
                </DialogHeader>
                <UploadCredentialsDialog />
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Credential</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issuedCredentials.map((credential) => (
                <TableRow key={credential.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{credential.recipientName}</div>
                      <div className="text-sm text-muted-foreground">{credential.recipientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {credential.credentialType === 'Badge' ?
                        <Shield className="h-4 w-4 text-blue-500" /> :
                        <Award className="h-4 w-4 text-green-500" />
                      }
                      {credential.credentialName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{credential.credentialType}</Badge>
                  </TableCell>
                  <TableCell>{credential.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      credential.status === 'Valid' ? 'default' :
                      credential.status === 'Expired' ? 'secondary' :
                      credential.status === 'Revoked' ? 'destructive' : 'outline'
                    }>
                      {credential.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {credential.blockchainHash && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Blockchain
                        </Badge>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedItem(credential)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Credential Details</DialogTitle>
                            <DialogDescription>
                              View detailed information and verification status
                            </DialogDescription>
                          </DialogHeader>
                          {selectedItem && <CredentialDetailView credential={selectedItem} />}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (credential.credentialType === 'Badge') {
                            handleDownloadBadge(credential.credentialId, credential.credentialName);
                          } else {
                            handleDownloadCertificate(credential.credentialId, credential.credentialName);
                          }
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke Credential</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to revoke this credential? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Revoke</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credential Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Digital Badges</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Certificates</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Blockchain Verified</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Digital Signature</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                      <span className="text-sm">22%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Issuance Trends</CardTitle>
              <CardDescription>Monthly credential issuance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {[45, 52, 38, 65, 73, 81, 69, 88, 94, 76, 82, 67].map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(value / 100) * 200}px` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CreateCredentialForm({ 
  onSubmitBadge, 
  onSubmitCertificate, 
  onCancel 
}: { 
  onSubmitBadge: (data: any) => void;
  onSubmitCertificate: (data: any) => void;
  onCancel: () => void;
}) {
  const [credentialType, setCredentialType] = useState<'badge' | 'certificate'>('badge');
  const [formData, setFormData] = useState<any>({
    // Badge fields
    name: '',
    description: '',
    category: 'Skill',
    criteria: '',
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
    issuingOrganization: '',
    validityPeriod: 24,
    prerequisites: [],
    skills: [],
    level: 'Beginner',
    points: 100,
    
    // Certificate fields
    title: '',
    templateName: 'Professional Modern',
    courseId: '',
    courseName: '',
    design: {
      templateType: 'Modern',
      primaryColor: '#1E40AF',
      secondaryColor: '#3B82F6',
      accentColor: '#F59E0B',
      font: 'Playfair Display',
      layout: 'Landscape',
      size: 'A4'
    },
    completionCriteria: {
      completionPercentage: 90,
      minimumGrade: 80,
      attendancePercentage: 85,
      assignmentCompletion: true,
      examCompletion: true,
      projectSubmission: true
    },
    digitalSignature: {
      signatoryName: '',
      signatoryTitle: '',
      digitalKey: '',
      timestamp: true
    },
    issuingAuthority: '',
    blockchainVerified: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentialType === 'badge') {
      onSubmitBadge(formData);
    } else {
      onSubmitCertificate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Label>Credential Type:</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="badge"
              checked={credentialType === 'badge'}
              onChange={(e) => setCredentialType(e.target.value as 'badge')}
            />
            <Shield className="h-4 w-4" />
            Digital Badge
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="certificate"
              checked={credentialType === 'certificate'}
              onChange={(e) => setCredentialType(e.target.value as 'certificate')}
            />
            <Award className="h-4 w-4" />
            Certificate
          </label>
        </div>
      </div>

      {credentialType === 'badge' ? (
        <BadgeForm formData={formData} setFormData={setFormData} />
      ) : (
        <CertificateForm formData={formData} setFormData={setFormData} />
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">
          Create {credentialType === 'badge' ? 'Badge' : 'Certificate'}
        </Button>
      </div>
    </form>
  );
}

function BadgeForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <Tabs defaultValue="basic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="basic">Basic Information</TabsTrigger>
        <TabsTrigger value="design">Design & Appearance</TabsTrigger>
        <TabsTrigger value="criteria">Criteria & Requirements</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="badge-name">Badge Name</Label>
            <Input 
              id="badge-name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter badge name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Skill">Skill</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
                <SelectItem value="Completion">Completion</SelectItem>
                <SelectItem value="Progress">Progress</SelectItem>
                <SelectItem value="Participation">Participation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge-description">Description</Label>
          <Textarea 
            id="badge-description" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe what this badge represents"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="badge-level">Difficulty Level</Label>
            <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge-points">Points Value</Label>
            <Input 
              id="badge-points" 
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({...formData, points: e.target.value})}
              placeholder="Point value"
              min="1"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex gap-2">
              <Input 
                id="bg-color" 
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                className="w-20"
              />
              <Input 
                value={formData.backgroundColor}
                onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                placeholder="#4CAF50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="border-color">Border Color</Label>
            <div className="flex gap-2">
              <Input 
                id="border-color" 
                type="color"
                value={formData.borderColor}
                onChange={(e) => setFormData({...formData, borderColor: e.target.value})}
                className="w-20"
              />
              <Input 
                value={formData.borderColor}
                onChange={(e) => setFormData({...formData, borderColor: e.target.value})}
                placeholder="#2E7D32"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge-preview">Badge Preview</Label>
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: formData.backgroundColor, borderColor: formData.borderColor, borderWidth: '3px' }}
              >
                <Shield className="h-8 w-8" style={{ color: formData.borderColor }} />
              </div>
              <div>
                <div className="font-medium">{formData.name || 'Badge Name'}</div>
                <div className="text-sm text-muted-foreground">{formData.category}</div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="criteria" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="badge-criteria">Earning Criteria</Label>
          <Textarea 
            id="badge-criteria" 
            value={formData.criteria}
            onChange={(e) => setFormData({...formData, criteria: e.target.value})}
            placeholder="Describe how students can earn this badge"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="badge-organization">Issuing Organization</Label>
            <Input 
              id="badge-organization" 
              value={formData.issuingOrganization}
              onChange={(e) => setFormData({...formData, issuingOrganization: e.target.value})}
              placeholder="Organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge-validity">Validity Period (months)</Label>
            <Input 
              id="badge-validity" 
              type="number"
              value={formData.validityPeriod}
              onChange={(e) => setFormData({...formData, validityPeriod: parseInt(e.target.value)})}
              placeholder="24"
              min="1"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function CertificateForm({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <Tabs defaultValue="basic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="basic">Basic Information</TabsTrigger>
        <TabsTrigger value="design">Design & Layout</TabsTrigger>
        <TabsTrigger value="criteria">Completion Criteria</TabsTrigger>
        <TabsTrigger value="signature">Digital Signature</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cert-title">Certificate Title</Label>
          <Input 
            id="cert-title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter certificate title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cert-description">Description</Label>
          <Textarea 
            id="cert-description" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the certificate purpose"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cert-course">Course</Label>
            <Select value={formData.courseId} onValueChange={(value) => setFormData({...formData, courseId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course-1">Full Stack Web Development</SelectItem>
                <SelectItem value="course-2">Data Science Fundamentals</SelectItem>
                <SelectItem value="course-3">Mobile App Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completion">Completion</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
                <SelectItem value="Participation">Participation</SelectItem>
                <SelectItem value="Excellence">Excellence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cert-template">Template Type</Label>
            <Select 
              value={formData.design.templateType} 
              onValueChange={(value) => setFormData({
                ...formData, 
                design: {...formData.design, templateType: value}
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Classic">Classic</SelectItem>
                <SelectItem value="Modern">Modern</SelectItem>
                <SelectItem value="Elegant">Elegant</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-layout">Layout</Label>
            <Select 
              value={formData.design.layout} 
              onValueChange={(value) => setFormData({
                ...formData, 
                design: {...formData.design, layout: value}
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Portrait">Portrait</SelectItem>
                <SelectItem value="Landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cert-primary">Primary Color</Label>
            <Input 
              id="cert-primary" 
              type="color"
              value={formData.design.primaryColor}
              onChange={(e) => setFormData({
                ...formData, 
                design: {...formData.design, primaryColor: e.target.value}
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-secondary">Secondary Color</Label>
            <Input 
              id="cert-secondary" 
              type="color"
              value={formData.design.secondaryColor}
              onChange={(e) => setFormData({
                ...formData, 
                design: {...formData.design, secondaryColor: e.target.value}
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-accent">Accent Color</Label>
            <Input 
              id="cert-accent" 
              type="color"
              value={formData.design.accentColor}
              onChange={(e) => setFormData({
                ...formData, 
                design: {...formData.design, accentColor: e.target.value}
              })}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="criteria" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="completion-percentage">Completion Percentage</Label>
            <Input
              id="completion-percentage"
              type="number"
              value={formData.completionCriteria.completionPercentage}
              onChange={(e) => setFormData({
                ...formData,
                completionCriteria: {...formData.completionCriteria, completionPercentage: parseInt(e.target.value)}
              })}
              min="0"
              max="100"
              placeholder="90"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum-grade">Minimum Grade (%)</Label>
            <Input
              id="minimum-grade"
              type="number"
              value={formData.completionCriteria.minimumGrade}
              onChange={(e) => setFormData({
                ...formData,
                completionCriteria: {...formData.completionCriteria, minimumGrade: parseInt(e.target.value)}
              })}
              min="0"
              max="100"
              placeholder="80"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="assignment-completion">Assignment Completion Required</Label>
            <Switch
              id="assignment-completion"
              checked={formData.completionCriteria.assignmentCompletion}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                completionCriteria: {...formData.completionCriteria, assignmentCompletion: checked}
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="exam-completion">Exam Completion Required</Label>
            <Switch
              id="exam-completion"
              checked={formData.completionCriteria.examCompletion}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                completionCriteria: {...formData.completionCriteria, examCompletion: checked}
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="project-submission">Project Submission Required</Label>
            <Switch
              id="project-submission"
              checked={formData.completionCriteria.projectSubmission}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                completionCriteria: {...formData.completionCriteria, projectSubmission: checked}
              })}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="signature" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signatory-name">Signatory Name</Label>
            <Input 
              id="signatory-name" 
              value={formData.digitalSignature.signatoryName}
              onChange={(e) => setFormData({
                ...formData, 
                digitalSignature: {...formData.digitalSignature, signatoryName: e.target.value}
              })}
              placeholder="Full name of signatory"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signatory-title">Signatory Title</Label>
            <Input 
              id="signatory-title" 
              value={formData.digitalSignature.signatoryTitle}
              onChange={(e) => setFormData({
                ...formData, 
                digitalSignature: {...formData.digitalSignature, signatoryTitle: e.target.value}
              })}
              placeholder="Title or position"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuing-authority">Issuing Authority</Label>
          <Input 
            id="issuing-authority" 
            value={formData.issuingAuthority}
            onChange={(e) => setFormData({...formData, issuingAuthority: e.target.value})}
            placeholder="Organization or institution name"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="blockchain-verified">Blockchain Verification</Label>
          <Switch
            id="blockchain-verified"
            checked={formData.blockchainVerified}
            onCheckedChange={(checked) => setFormData({...formData, blockchainVerified: checked})}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

function BadgeDetailView({ badge }: { badge: DigitalBadge }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: badge.backgroundColor, borderColor: badge.borderColor, borderWidth: '3px' }}
        >
          <Shield className="h-10 w-10" style={{ color: badge.borderColor }} />
        </div>
        <div>
          <h3 className="text-xl font-medium">{badge.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{badge.category}</Badge>
            <Badge variant="secondary">{badge.level}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Description</Label>
            <p className="text-sm">{badge.description}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Earning Criteria</Label>
            <p className="text-sm">{badge.criteria}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Skills</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {badge.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Issuing Organization</Label>
            <p className="text-sm">{badge.issuingOrganization}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Points Value</Label>
            <p className="text-sm">{badge.points} points</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Validity Period</Label>
            <p className="text-sm">{badge.validityPeriod} months</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Total Issued</Label>
            <p className="text-sm">{badge.totalIssued} badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateDetailView({ certificate }: { certificate: Certificate }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Course</Label>
              <p className="text-sm">{certificate.courseName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <p className="text-sm">{certificate.category}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Template</Label>
              <p className="text-sm">{certificate.templateName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Verification Code</Label>
              <p className="text-sm font-mono">{certificate.verificationCode}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Completion:</span>
              <span className="text-sm font-medium">{certificate.completionCriteria.completionPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Minimum Grade:</span>
              <span className="text-sm font-medium">{certificate.completionCriteria.minimumGrade}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Assignments:</span>
              <Badge variant={certificate.completionCriteria.assignmentCompletion ? 'default' : 'secondary'}>
                {certificate.completionCriteria.assignmentCompletion ? 'Required' : 'Optional'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Exams:</span>
              <Badge variant={certificate.completionCriteria.examCompletion ? 'default' : 'secondary'}>
                {certificate.completionCriteria.examCompletion ? 'Required' : 'Optional'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="aspect-[4/3] border-2 rounded-lg p-8 text-center"
            style={{ 
              backgroundColor: `${certificate.design.primaryColor}10`,
              borderColor: certificate.design.primaryColor 
            }}
          >
            <div className="h-full flex flex-col justify-center space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: certificate.design.primaryColor }}>
                Certificate of {certificate.category}
              </h2>
              <p className="text-lg">{certificate.title}</p>
              <div className="text-sm text-muted-foreground">
                <p>This is to certify that</p>
                <p className="text-lg font-medium text-black">[Student Name]</p>
                <p>has successfully completed the requirements for</p>
                <p className="font-medium">{certificate.courseName}</p>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <div className="text-sm">
                  <p>{certificate.digitalSignature.signatoryName}</p>
                  <p>{certificate.digitalSignature.signatoryTitle}</p>
                </div>
                <div className="text-sm">
                  <p>{certificate.issuingAuthority}</p>
                  <p>Date: [Issue Date]</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UploadCredentialsDialog() {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'manual'>('file');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState({
    recipientName: '',
    recipientEmail: '',
    credentialType: 'Certificate',
    credentialName: '',
    issueDate: '',
    expiryDate: '',
    status: 'Valid'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Manual credential upload:', manualData);
  };

  return (
    <div className="space-y-6">
      <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'file' | 'manual')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">Bulk Upload</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <h3 className="text-lg font-medium">Upload Credential File</h3>
                <p className="text-sm text-muted-foreground">
                  Upload CSV or Excel file containing credential records
                </p>
              </div>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
              {uploadFile && (
                <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-md">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">{uploadFile.name}</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Required Columns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Recipient Name</div>
                <div>• Recipient Email</div>
                <div>• Credential Type</div>
                <div>• Credential Name</div>
                <div>• Issue Date</div>
                <div>• Expiry Date (optional)</div>
                <div>• Status</div>
                <div>• Verification URL (optional)</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button disabled={!uploadFile}>
              <Upload className="h-4 w-4 mr-2" />
              Process Upload
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient-name">Recipient Name</Label>
                <Input
                  id="recipient-name"
                  value={manualData.recipientName}
                  onChange={(e) => setManualData({...manualData, recipientName: e.target.value})}
                  placeholder="Enter recipient name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-email">Recipient Email</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  value={manualData.recipientEmail}
                  onChange={(e) => setManualData({...manualData, recipientEmail: e.target.value})}
                  placeholder="Enter recipient email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credential-type">Credential Type</Label>
                <Select value={manualData.credentialType} onValueChange={(value) => setManualData({...manualData, credentialType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Badge">Digital Badge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credential-name">Credential Name</Label>
                <Input
                  id="credential-name"
                  value={manualData.credentialName}
                  onChange={(e) => setManualData({...manualData, credentialName: e.target.value})}
                  placeholder="Enter credential name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue-date">Issue Date</Label>
                <Input
                  id="issue-date"
                  type="date"
                  value={manualData.issueDate}
                  onChange={(e) => setManualData({...manualData, issueDate: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date (optional)</Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={manualData.expiryDate}
                  onChange={(e) => setManualData({...manualData, expiryDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={manualData.status} onValueChange={(value) => setManualData({...manualData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Valid">Valid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Credential Record
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CredentialDetailView({ credential }: { credential: IssuedCredential }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-full">
          {credential.credentialType === 'Badge' ?
            <Shield className="h-8 w-8 text-blue-600" /> :
            <Award className="h-8 w-8 text-green-600" />
          }
        </div>
        <div>
          <h3 className="text-xl font-medium">{credential.credentialName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{credential.credentialType}</Badge>
            <Badge variant={
              credential.status === 'Valid' ? 'default' :
              credential.status === 'Expired' ? 'secondary' :
              credential.status === 'Revoked' ? 'destructive' : 'outline'
            }>
              {credential.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recipient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">NAME</Label>
              <p className="text-sm font-medium">{credential.recipientName}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">EMAIL</Label>
              <p className="text-sm">{credential.recipientEmail}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">RECIPIENT ID</Label>
              <p className="text-sm font-mono">{credential.recipientId}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Credential Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">ISSUE DATE</Label>
              <p className="text-sm">{credential.issueDate}</p>
            </div>
            {credential.expiryDate && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground">EXPIRY DATE</Label>
                <p className="text-sm">{credential.expiryDate}</p>
              </div>
            )}
            <div>
              <Label className="text-xs font-medium text-muted-foreground">VERIFICATION URL</Label>
              <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                {credential.verificationUrl}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {credential.blockchainHash && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Blockchain Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">BLOCKCHAIN HASH</Label>
                <p className="text-sm font-mono break-all">{credential.blockchainHash}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Verified on blockchain
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {credential.earnedPoints && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Achievement Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {credential.earnedPoints} points
            </div>
            <p className="text-sm text-muted-foreground">Earned for this credential</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button>
          <Eye className="h-4 w-4 mr-2" />
          View Full Credential
        </Button>
      </div>
    </div>
  );
}

function EditCertificateDialog({ certificate, onSave, onCancel }: { certificate: Certificate; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: certificate.title,
    description: certificate.description,
    category: certificate.category,
    design: { ...certificate.design },
    completionCriteria: { ...certificate.completionCriteria },
    digitalSignature: { ...certificate.digitalSignature },
    issuingAuthority: certificate.issuingAuthority,
    validityPeriod: certificate.validityPeriod,
    blockchainVerified: certificate.blockchainVerified
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="criteria">Criteria</TabsTrigger>
          <TabsTrigger value="signature">Signature</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cert-title">Certificate Title</Label>
            <Input
              id="cert-title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-description">Description</Label>
            <Textarea
              id="cert-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completion">Completion</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
                <SelectItem value="Participation">Participation</SelectItem>
                <SelectItem value="Excellence">Excellence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <Input
                type="color"
                value={formData.design.primaryColor}
                onChange={(e) => setFormData({
                  ...formData,
                  design: {...formData.design, primaryColor: e.target.value}
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <Input
                type="color"
                value={formData.design.secondaryColor}
                onChange={(e) => setFormData({
                  ...formData,
                  design: {...formData.design, secondaryColor: e.target.value}
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <Input
                type="color"
                value={formData.design.accentColor}
                onChange={(e) => setFormData({
                  ...formData,
                  design: {...formData.design, accentColor: e.target.value}
                })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Completion Percentage</Label>
              <Input
                type="number"
                value={formData.completionCriteria.completionPercentage}
                onChange={(e) => setFormData({
                  ...formData,
                  completionCriteria: {...formData.completionCriteria, completionPercentage: parseInt(e.target.value)}
                })}
                min="0" max="100"
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Grade</Label>
              <Input
                type="number"
                value={formData.completionCriteria.minimumGrade}
                onChange={(e) => setFormData({
                  ...formData,
                  completionCriteria: {...formData.completionCriteria, minimumGrade: parseInt(e.target.value)}
                })}
                min="0" max="100"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signature" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Signatory Name</Label>
              <Input
                value={formData.digitalSignature.signatoryName}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalSignature: {...formData.digitalSignature, signatoryName: e.target.value}
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Signatory Title</Label>
              <Input
                value={formData.digitalSignature.signatoryTitle}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalSignature: {...formData.digitalSignature, signatoryTitle: e.target.value}
                })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}

function EditBadgeDialog({ badge, onSave, onCancel }: { badge: DigitalBadge; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: badge.name,
    description: badge.description,
    category: badge.category,
    criteria: badge.criteria,
    backgroundColor: badge.backgroundColor,
    borderColor: badge.borderColor,
    level: badge.level,
    points: badge.points,
    validityPeriod: badge.validityPeriod
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="criteria">Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label>Badge Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Skill">Skill</SelectItem>
                  <SelectItem value="Achievement">Achievement</SelectItem>
                  <SelectItem value="Completion">Completion</SelectItem>
                  <SelectItem value="Progress">Progress</SelectItem>
                  <SelectItem value="Participation">Participation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                  className="w-20"
                />
                <Input
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Border Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.borderColor}
                  onChange={(e) => setFormData({...formData, borderColor: e.target.value})}
                  className="w-20"
                />
                <Input
                  value={formData.borderColor}
                  onChange={(e) => setFormData({...formData, borderColor: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Badge Preview</Label>
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: formData.backgroundColor, borderColor: formData.borderColor, borderWidth: '3px' }}
                >
                  <Shield className="h-8 w-8" style={{ color: formData.borderColor }} />
                </div>
                <div>
                  <div className="font-medium">{formData.name || 'Badge Name'}</div>
                  <div className="text-sm text-muted-foreground">{formData.category}</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <div className="space-y-2">
            <Label>Earning Criteria</Label>
            <Textarea
              value={formData.criteria}
              onChange={(e) => setFormData({...formData, criteria: e.target.value})}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Points Value</Label>
              <Input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label>Validity Period (months)</Label>
              <Input
                type="number"
                value={formData.validityPeriod}
                onChange={(e) => setFormData({...formData, validityPeriod: parseInt(e.target.value)})}
                min="1"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
