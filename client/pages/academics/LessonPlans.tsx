import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, Clock, Users, BookOpen, Plus, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LessonPlan {
  id: string;
  title: string;
  code: string;
  subject: string;
  grade: string;
  teacher: string;
  duration: string;
  scheduledDate: string;
  learningObjectives: number;
  units: number;
  status: "Published" | "Draft" | "Under Review";
  category: string;
  type: string;
  credit: number;
  totalHours: number;
}

const lessonPlans: LessonPlan[] = [
  {
    id: "1",
    title: "Composite Materials",
    code: "1020235332",
    subject: "Engineering",
    grade: "Semester V",
    teacher: "Dr. Anandh",
    duration: "60 hours",
    scheduledDate: "2024-01-18",
    learningObjectives: 35,
    units: 5,
    status: "Published",
    category: "Program Elective-I",
    type: "Practicum",
    credit: 3,
    totalHours: 60
  },
  {
    id: "2",
    title: "Refrigeration and Air Conditioning",
    code: "1020235333",
    subject: "Mechanical Engineering",
    grade: "Semester V",
    teacher: "Dr. Sandeep",
    duration: "48 hours",
    scheduledDate: "2024-01-20",
    learningObjectives: 28,
    units: 5,
    status: "Published",
    category: "Core Subject",
    type: "Theory + Practical",
    credit: 4,
    totalHours: 48
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const {user} = useAuth()

  const stats = [
    {
      title: "Total Lessons",
      value: lessonPlans.length.toString(),
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Published",
      value: "100%",
      subtitle: "completion rate",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "This Week",
      value: "2",
      subtitle: "Scheduled lessons",
      icon: Calendar,
      color: "bg-orange-500"
    },
    {
      title: "Avg Duration",
      value: Math.round(lessonPlans.reduce((acc, plan) => acc + plan.totalHours, 0) / lessonPlans.length).toString(),
      subtitle: "Hours per lesson",
      icon: Clock,
      color: "bg-purple-500"
    }
  ];

  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lesson Plans</h1>
              <p className="text-gray-600 mt-1">Create, manage, and track detailed lesson plans for all subjects and grades.</p>
            </div>
            {/* {user?.role ==='super-admin' || user?.role === 'admin' ? (<div className="flex gap-2">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Upload className="w-4 h-4 mr-2" />
                Import Lesson
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Lesson Plan
              </Button>
            </div>) : null} */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Lesson Plans Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Lesson Plans</CardTitle>
                <p className="text-gray-600 text-sm mt-1">View and manage all lesson plans with detailed planning information</p>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by course code, title, subject, or teacher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button> */}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Lesson Title</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Subject & Grade</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Teacher</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Duration</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Scheduled Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Learning Objectives</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Units</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlans.map((plan) => (
                    <tr key={plan.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <Link to={`/academics/lesson/${plan.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                          {plan.title}
                        </Link>
                        <div className="text-sm text-gray-500">Code: {plan.code}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium">{plan.subject}</div>
                        <div className="text-sm text-gray-500">{plan.grade}</div>
                      </td>
                      <td className="py-4 px-2 text-gray-900">{plan.teacher}</td>
                      <td className="py-4 px-2 text-gray-900">{plan.duration}</td>
                      <td className="py-4 px-2 text-gray-900">{plan.scheduledDate}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {plan.learningObjectives}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-900">{plan.units}</td>
                      <td className="py-4 px-2">
                        <Badge 
                          variant={plan.status === "Published" ? "default" : plan.status === "Draft" ? "secondary" : "outline"}
                          className={plan.status === "Published" ? "bg-green-100 text-green-800" : ""}
                        >
                          {plan.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/lesson/${plan.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                      {plan.title}
                    </Link>
                    <Badge 
                      variant={plan.status === "Published" ? "default" : plan.status === "Draft" ? "secondary" : "outline"}
                      className={plan.status === "Published" ? "bg-green-100 text-green-800" : ""}
                    >
                      {plan.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Code: {plan.code}</div>
                    <div>Subject: {plan.subject} • {plan.grade}</div>
                    <div>Teacher: {plan.teacher}</div>
                    <div>Duration: {plan.duration}</div>
                    <div>Learning Objectives: {plan.learningObjectives} • Units: {plan.units}</div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No lesson plans found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
