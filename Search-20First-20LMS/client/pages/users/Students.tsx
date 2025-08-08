import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  User,
  Calendar,
  Eye,
  Filter,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Download,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  rollNo: string;
  dob: string;
  guardian: string;
  guardianPhone: string;
  status: string;
  admission: string;
  avatar: string;
  studentId: string;
  grade: string;
  section: string;
  feeStatus: string;
  attendance: number;
  performance: number;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  previousSchool: string;
  notes: string;
}

const initialStudents: Student[] = [
  {
    id: "ST001",
    name: "Balu",
    email: "balu.kumar@student.edu",
    phone: "+1 234-567-8909",
    class: "Grade 10-A",
    rollNo: "001",
    dob: "2008-05-15",
    guardian: "Mr. kumar",
    guardianPhone: "+1 234-567-8910",
    status: "Active",
    admission: "2023-06-01",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    studentId: "ST001",
    grade: "10",
    section: "A",
    feeStatus: "Paid",
    attendance: 95,
    performance: 88,
    address: "123 Student Lane, Academic City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8920",
    previousSchool: "ABC Elementary School",
    notes:
      "Excellent student with strong academic performance. Active in extracurricular activities.",
  },
  {
    id: "ST002",
    name: "Raji",
    email: "raji.sentil@student.edu",
    phone: "+1 234-567-8911",
    class: "Grade 11-B",
    rollNo: "015",
    dob: "2007-08-22",
    guardian: "Mr. senthil",
    guardianPhone: "+1 234-567-8912",
    status: "Active",
    admission: "2022-06-01",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    studentId: "ST002",
    grade: "11",
    section: "B",
    feeStatus: "Pending",
    attendance: 82,
    performance: 75,
    address: "456 Learning Street, Education Town",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8921",
    previousSchool: "XYZ Middle School",
    notes:
      "Good student, needs improvement in mathematics. Very social and friendly.",
  },
  {
    id: "ST003",
    name: "Hari",
    email: "hari.nesan@student.edu",
    phone: "+1 234-567-8913",
    class: "Grade 9-C",
    rollNo: "008",
    dob: "2009-03-10",
    guardian: "Mr. Nesan",
    guardianPhone: "+1 234-567-8914",
    status: "Active",
    admission: "2024-06-01",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    studentId: "ST003",
    grade: "9",
    section: "C",
    feeStatus: "Paid",
    attendance: 90,
    performance: 92,
    address: "789 Scholar Avenue, Knowledge City",
    bloodGroup: "B+",
    emergencyContact: "+1 234-567-8922",
    previousSchool: "PQR Elementary School",
    notes:
      "New student showing excellent adaptation. Strong in science subjects.",
  },
  {
    id: "ST004",
    name: "Punitha ",
    email: "punitha.kiruba@student.edu",
    phone: "+1 234-567-8915",
    class: "Grade 12-A",
    rollNo: "023",
    dob: "2006-11-28",
    guardian: "Mrs. Kiruba",
    guardianPhone: "+1 234-567-8916",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    studentId: "ST004",
    grade: "12",
    section: "A",
    feeStatus: "Paid",
    attendance: 96,
    performance: 94,
    address: "321 Graduate Lane, Future City",
    bloodGroup: "AB+",
    emergencyContact: "+1 234-567-8923",
    previousSchool: "DEF High School",
    notes:
      "Graduated with honors. Planning to pursue engineering. Class valedictorian.",
  },
  {
    id: "ST005",
    name: "Vignesh R",
    email: "vignesh.r@student.edu",
    phone: "+1 234-567-8920",
    class: "Grade 12-B",
    rollNo: "024",
    dob: "2006-05-14",
    guardian: "Mr. Rajan",
    guardianPhone: "+1 234-567-8921",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    studentId: "ST005",
    grade: "12",
    section: "B",
    feeStatus: "Paid",
    attendance: 93,
    performance: 90,
    address: "543 Success Street, Bright Town",
    bloodGroup: "B+",
    emergencyContact: "+1 234-567-8930",
    previousSchool: "GHI Public School",
    notes: "Consistent academic performer, interested in computer science.",
  },
  {
    id: "ST006",
    name: "Nandhini S",
    email: "nandhini.s@student.edu",
    phone: "+1 234-567-8932",
    class: "Grade 12-A",
    rollNo: "025",
    dob: "2006-09-22",
    guardian: "Mr. Srinivasan",
    guardianPhone: "+1 234-567-8933",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    studentId: "ST006",
    grade: "12",
    section: "A",
    feeStatus: "Unpaid",
    attendance: 89,
    performance: 85,
    address: "98 Horizon Drive, Learning City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8935",
    previousSchool: "JKL Model School",
    notes: "Excellent in extracurriculars, requires fee clearance.",
  },
  {
    id: "ST008",
    name: "Deepa R",
    email: "deepa.r@student.edu",
    phone: "+1 234-567-8943",
    class: "Grade 11-A",
    rollNo: "017",
    dob: "2007-01-17",
    guardian: "Mr. Rajan",
    guardianPhone: "+1 234-567-8944",
    status: "Active",
    admission: "2023-06-01",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    studentId: "ST008",
    grade: "11",
    section: "A",
    feeStatus: "Paid",
    attendance: 93,
    performance: 87,
    address: "45 Blossom Avenue, Edu Town",
    bloodGroup: "O-",
    emergencyContact: "+1 234-567-8945",
    previousSchool: "Sunshine Middle School",
    notes: "Creative thinker, strong in arts and literature.",
  },
  {
    id: "ST009",
    name: "Karthik M",
    email: "karthik.m@student.edu",
    phone: "+1 234-567-8946",
    class: "Grade 10-C",
    rollNo: "012",
    dob: "2008-02-10",
    guardian: "Mrs. Meena",
    guardianPhone: "+1 234-567-8947",
    status: "Active",
    admission: "2022-06-01",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    studentId: "ST009",
    grade: "10",
    section: "C",
    feeStatus: "Pending",
    attendance: 88,
    performance: 80,
    address: "72 Maple Street, Green City",
    bloodGroup: "A-",
    emergencyContact: "+1 234-567-8948",
    previousSchool: "Maple Grove School",
    notes: "Needs improvement in attendance. Excellent in computer skills.",
  },
  {
    id: "ST010",
    name: "Priya S",
    email: "priya.s@student.edu",
    phone: "+1 234-567-8949",
    class: "Grade 9-B",
    rollNo: "018",
    dob: "2009-12-25",
    guardian: "Mr. Suresh",
    guardianPhone: "+1 234-567-8950",
    status: "Active",
    admission: "2024-06-01",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    studentId: "ST010",
    grade: "9",
    section: "B",
    feeStatus: "Paid",
    attendance: 92,
    performance: 91,
    address: "19 Harmony Road, Edu Valley",
    bloodGroup: "B-",
    emergencyContact: "+1 234-567-8951",
    previousSchool: "St. Mary's Elementary",
    notes: "Highly active in school clubs and leadership programs.",
  },
  {
    id: "ST011",
    name: "Arun V",
    email: "arun.v@student.edu",
    phone: "+1 234-567-8952",
    class: "Grade 11-C",
    rollNo: "027",
    dob: "2007-04-02",
    guardian: "Mrs. Vimala",
    guardianPhone: "+1 234-567-8953",
    status: "Active",
    admission: "2022-06-01",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    studentId: "ST011",
    grade: "11",
    section: "C",
    feeStatus: "Unpaid",
    attendance: 85,
    performance: 78,
    address: "104 Tech Park Lane, Knowledge Town",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8954",
    previousSchool: "Govt High School",
    notes: "Shows strong interest in robotics and coding.",
  },
  {
    id: "ST012",
    name: "Keerthi B",
    email: "keerthi.b@student.edu",
    phone: "+1 234-567-8955",
    class: "Grade 10-B",
    rollNo: "005",
    dob: "2008-06-18",
    guardian: "Mr. Balaji",
    guardianPhone: "+1 234-567-8956",
    status: "Active",
    admission: "2023-06-01",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    studentId: "ST012",
    grade: "10",
    section: "B",
    feeStatus: "Paid",
    attendance: 94,
    performance: 89,
    address: "230 Student Square, Academic Town",
    bloodGroup: "AB-",
    emergencyContact: "+1 234-567-8957",
    previousSchool: "Crescent Middle School",
    notes: "Team player and outstanding in group projects.",
  },
  {
    id: "ST013",
    name: "Ajay R",
    email: "ajay.r@student.edu",
    phone: "+1 234-567-8958",
    class: "Grade 11-B",
    rollNo: "011",
    dob: "2007-07-29",
    guardian: "Mrs. Rekha",
    guardianPhone: "+1 234-567-8959",
    status: "Active",
    admission: "2022-06-01",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    studentId: "ST013",
    grade: "11",
    section: "B",
    feeStatus: "Pending",
    attendance: 80,
    performance: 76,
    address: "17 Aspire Road, Future Zone",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8960",
    previousSchool: "Sunrise Secondary School",
    notes: "Good in sports, needs academic mentoring.",
  },
  {
    id: "ST014",
    name: "Meena L",
    email: "meena.l@student.edu",
    phone: "+1 234-567-8961",
    class: "Grade 10-C",
    rollNo: "021",
    dob: "2008-10-11",
    guardian: "Mr. Loganathan",
    guardianPhone: "+1 234-567-8962",
    status: "Active",
    admission: "2023-06-01",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    studentId: "ST014",
    grade: "10",
    section: "C",
    feeStatus: "Paid",
    attendance: 91,
    performance: 85,
    address: "61 Beacon Avenue, Smart City",
    bloodGroup: "B+",
    emergencyContact: "+1 234-567-8963",
    previousSchool: "Hope Academy",
    notes: "Helpful nature, participates in community programs.",
  },
  {
    id: "ST015",
    name: "Saran D",
    email: "saran.d@student.edu",
    phone: "+1 234-567-8964",
    class: "Grade 9-A",
    rollNo: "007",
    dob: "2009-01-03",
    guardian: "Mrs. Divya",
    guardianPhone: "+1 234-567-8965",
    status: "Active",
    admission: "2024-06-01",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    studentId: "ST015",
    grade: "9",
    section: "A",
    feeStatus: "Paid",
    attendance: 95,
    performance: 93,
    address: "33 Talent Road, Bright Zone",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8966",
    previousSchool: "New Horizon Elementary",
    notes: "Excellent in math and science. Top of the class.",
  },
  {
    id: "ST016",
    name: "Revathi K",
    email: "revathi.k@student.edu",
    phone: "+1 234-567-8967",
    class: "Grade 9-C",
    rollNo: "022",
    dob: "2009-11-16",
    guardian: "Mr. Krishnan",
    guardianPhone: "+1 234-567-8968",
    status: "Active",
    admission: "2024-06-01",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    studentId: "ST016",
    grade: "9",
    section: "C",
    feeStatus: "Paid",
    attendance: 89,
    performance: 84,
    address: "29 Harmony Street, Learning Ville",
    bloodGroup: "A-",
    emergencyContact: "+1 234-567-8969",
    previousSchool: "Little Star School",
    notes: "Punctual and attentive in class.",
  },
  {
    id: "ST017",
    name: "Vinod P",
    email: "vinod.p@student.edu",
    phone: "+1 234-567-8970",
    class: "Grade 10-A",
    rollNo: "030",
    dob: "2008-04-21",
    guardian: "Mrs. Padma",
    guardianPhone: "+1 234-567-8971",
    status: "Active",
    admission: "2023-06-01",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    studentId: "ST017",
    grade: "10",
    section: "A",
    feeStatus: "Pending",
    attendance: 86,
    performance: 79,
    address: "18 Star Avenue, Edu Core",
    bloodGroup: "B-",
    emergencyContact: "+1 234-567-8972",
    previousSchool: "Bright Path School",
    notes: "Needs regular monitoring and parental follow-up.",
  },
  {
    id: "ST018",
    name: "Sneha T",
    email: "sneha.t@student.edu",
    phone: "+1 234-567-8973",
    class: "Grade 11-A",
    rollNo: "014",
    dob: "2007-03-30",
    guardian: "Mr. Thiru",
    guardianPhone: "+1 234-567-8974",
    status: "Active",
    admission: "2022-06-01",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    studentId: "ST018",
    grade: "11",
    section: "A",
    feeStatus: "Paid",
    attendance: 92,
    performance: 88,
    address: "87 Smart Town Road, Eduland",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8975",
    previousSchool: "KLM High School",
    notes: "Consistent performer with leadership qualities.",
  },
  {
    id: "ST019",
    name: "Manoj K",
    email: "manoj.k@student.edu",
    phone: "+1 234-567-8976",
    class: "Grade 12-C",
    rollNo: "029",
    dob: "2006-12-09",
    guardian: "Mrs. Kala",
    guardianPhone: "+1 234-567-8977",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    studentId: "ST019",
    grade: "12",
    section: "C",
    feeStatus: "Paid",
    attendance: 97,
    performance: 95,
    address: "14 Scholar Street, Top Town",
    bloodGroup: "AB+",
    emergencyContact: "+1 234-567-8978",
    previousSchool: "Alpha Public School",
    notes: "Class topper. Received state-level science award.",
  },
  {
    id: "ST020",
    name: "Divya R",
    email: "divya.r@student.edu",
    phone: "+1 234-567-8979",
    class: "Grade 12-B",
    rollNo: "028",
    dob: "2006-08-18",
    guardian: "Mr. Raj",
    guardianPhone: "+1 234-567-8980",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    studentId: "ST020",
    grade: "12",
    section: "B",
    feeStatus: "Paid",
    attendance: 96,
    performance: 90,
    address: "201 Brilliance Blvd, Academic Heights",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8981",
    previousSchool: "Beta Academy",
    notes: "Excelled in science fairs and group projects.",
  },
  {
    id: "ST021",
    name: "Jeevan R",
    email: "jeevan.r@student.edu",
    phone: "+1 234-567-8941",
    class: "Grade 12-A",
    rollNo: "040",
    dob: "2006-05-16",
    guardian: "Mr. Rajendran",
    guardianPhone: "+1 234-567-8942",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST021",
    grade: "12",
    section: "A",
    feeStatus: "Paid",
    attendance: 90,
    performance: 88,
    address: "90 Unity St, Future City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8943",
    previousSchool: "LMN High School",
    notes: "Excellent in computer science and programming.",
  },
  {
    id: "ST022",
    name: "Pavithra S",
    email: "pavithra.s@student.edu",
    phone: "+1 234-567-8944",
    class: "Grade 12-B",
    rollNo: "041",
    dob: "2006-06-08",
    guardian: "Mrs. Shanthi",
    guardianPhone: "+1 234-567-8945",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST022",
    grade: "12",
    section: "B",
    feeStatus: "Unpaid",
    attendance: 85,
    performance: 82,
    address: "23 Lotus Avenue, Future City",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8946",
    previousSchool: "OPQ Matriculation School",
    notes: "Creative and artistic, active in extracurriculars.",
  },
  {
    id: "ST023",
    name: "Mohan K",
    email: "mohan.k@student.edu",
    phone: "+1 234-567-8947",
    class: "Grade 12-A",
    rollNo: "042",
    dob: "2006-02-20",
    guardian: "Mr. Kandasamy",
    guardianPhone: "+1 234-567-8948",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST023",
    grade: "12",
    section: "A",
    feeStatus: "Paid",
    attendance: 97,
    performance: 93,
    address: "12 Victory Rd, Future City",
    bloodGroup: "B+",
    emergencyContact: "+1 234-567-8949",
    previousSchool: "XYZ Public School",
    notes: "Class topper, pursuing engineering entrance coaching.",
  },
  {
    id: "ST024",
    name: "Revathi M",
    email: "revathi.m@student.edu",
    phone: "+1 234-567-8950",
    class: "Grade 12-C",
    rollNo: "043",
    dob: "2006-12-05",
    guardian: "Mr. Mani",
    guardianPhone: "+1 234-567-8951",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST024",
    grade: "12",
    section: "C",
    feeStatus: "Paid",
    attendance: 93,
    performance: 90,
    address: "67 Blossom Street, Future City",
    bloodGroup: "AB+",
    emergencyContact: "+1 234-567-8952",
    previousSchool: "DEF Higher Secondary School",
    notes: "Excellent in business studies, active in debate club.",
  },
  {
    id: "ST025",
    name: "Arun V",
    email: "arun.v@student.edu",
    phone: "+1 234-567-8953",
    class: "Grade 12-B",
    rollNo: "044",
    dob: "2006-08-29",
    guardian: "Mr. Venkatesh",
    guardianPhone: "+1 234-567-8954",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST025",
    grade: "12",
    section: "B",
    feeStatus: "Unpaid",
    attendance: 80,
    performance: 75,
    address: "44 Crescent Rd, Future City",
    bloodGroup: "O-",
    emergencyContact: "+1 234-567-8955",
    previousSchool: "JKL High School",
    notes:
      "Needs improvement in time management, very enthusiastic in science.",
  },
  {
    id: "ST026",
    name: "Divya R",
    email: "divya.r@student.edu",
    phone: "+1 234-567-8956",
    class: "Grade 12-A",
    rollNo: "045",
    dob: "2006-10-12",
    guardian: "Mrs. Rekha",
    guardianPhone: "+1 234-567-8957",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST026",
    grade: "12",
    section: "A",
    feeStatus: "Paid",
    attendance: 95,
    performance: 91,
    address: "101 Orchid Ave, Future City",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8958",
    previousSchool: "Alpha High School",
    notes: "Top performer in biology.",
  },
  {
    id: "ST027",
    name: "Sathish K",
    email: "sathish.k@student.edu",
    phone: "+1 234-567-8959",
    class: "Grade 12-C",
    rollNo: "046",
    dob: "2006-07-08",
    guardian: "Mr. Kannan",
    guardianPhone: "+1 234-567-8960",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST027",
    grade: "12",
    section: "C",
    feeStatus: "Unpaid",
    attendance: 81,
    performance: 76,
    address: "58 Lake View, Future City",
    bloodGroup: "B+",
    emergencyContact: "+1 234-567-8961",
    previousSchool: "Beta Matric School",
    notes: "Shows interest in electronics.",
  },
  {
    id: "ST028",
    name: "Harini P",
    email: "harini.p@student.edu",
    phone: "+1 234-567-8962",
    class: "Grade 12-B",
    rollNo: "047",
    dob: "2006-11-11",
    guardian: "Mr. Prakash",
    guardianPhone: "+1 234-567-8963",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST028",
    grade: "12",
    section: "B",
    feeStatus: "Paid",
    attendance: 92,
    performance: 89,
    address: "75 Green Street, Future City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8964",
    previousSchool: "Sigma School",
    notes: "Excellent in English literature.",
  },
  {
    id: "ST029",
    name: "Vikram A",
    email: "vikram.a@student.edu",
    phone: "+1 234-567-8965",
    class: "Grade 12-C",
    rollNo: "048",
    dob: "2006-03-29",
    guardian: "Mrs. Anjali",
    guardianPhone: "+1 234-567-8966",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST029",
    grade: "12",
    section: "C",
    feeStatus: "Unpaid",
    attendance: 77,
    performance: 70,
    address: "33 North Hill, Future City",
    bloodGroup: "AB+",
    emergencyContact: "+1 234-567-8967",
    previousSchool: "Gamma Public School",
    notes: "Needs academic support, excels in sports.",
  },
  {
    id: "ST030",
    name: "Sneha L",
    email: "sneha.l@student.edu",
    phone: "+1 234-567-8968",
    class: "Grade 12-A",
    rollNo: "049",
    dob: "2006-09-22",
    guardian: "Mr. Loganathan",
    guardianPhone: "+1 234-567-8969",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST030",
    grade: "12",
    section: "A",
    feeStatus: "Paid",
    attendance: 96,
    performance: 94,
    address: "120 Bright Rd, Future City",
    bloodGroup: "A-",
    emergencyContact: "+1 234-567-8970",
    previousSchool: "New Era School",
    notes: "School topper in previous term.",
  },
  {
    id: "ST031",
    name: "Karthik M",
    email: "karthik.m@student.edu",
    phone: "+1 234-567-8971",
    class: "Grade 12-B",
    rollNo: "050",
    dob: "2006-06-10",
    guardian: "Mrs. Meena",
    guardianPhone: "+1 234-567-8972",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST031",
    grade: "12",
    section: "B",
    feeStatus: "Paid",
    attendance: 88,
    performance: 84,
    address: "15 Rose St, Future City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8973",
    previousSchool: "Little Flower Hr Sec School",
    notes: "Participates actively in coding contests.",
  },
  {
    id: "ST032",
    name: "Revathi V",
    email: "revathi.v@student.edu",
    phone: "+1 234-567-8974",
    class: "Grade 12-C",
    rollNo: "051",
    dob: "2006-01-30",
    guardian: "Mr. Velayudham",
    guardianPhone: "+1 234-567-8975",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST032",
    grade: "12",
    section: "C",
    feeStatus: "Paid",
    attendance: 91,
    performance: 87,
    address: "89 Main Rd, Future City",
    bloodGroup: "B-",
    emergencyContact: "+1 234-567-8976",
    previousSchool: "Sunbeam School",
    notes: "Creative writer and singer.",
  },
  {
    id: "ST033",
    name: "Ravi T",
    email: "ravi.t@student.edu",
    phone: "+1 234-567-8977",
    class: "Grade 12-A",
    rollNo: "052",
    dob: "2006-04-05",
    guardian: "Mrs. Thangam",
    guardianPhone: "+1 234-567-8978",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST033",
    grade: "12",
    section: "A",
    feeStatus: "Unpaid",
    attendance: 82,
    performance: 79,
    address: "53 River Bank, Future City",
    bloodGroup: "A+",
    emergencyContact: "+1 234-567-8979",
    previousSchool: "Maharishi Vidya Mandir",
    notes: "Good in mathematics and logical thinking.",
  },
  {
    id: "ST034",
    name: "Deepa M",
    email: "deepa.m@student.edu",
    phone: "+1 234-567-8980",
    class: "Grade 12-B",
    rollNo: "053",
    dob: "2006-02-11",
    guardian: "Mr. Murugan",
    guardianPhone: "+1 234-567-8981",
    status: "Active",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST034",
    grade: "12",
    section: "B",
    feeStatus: "Paid",
    attendance: 94,
    performance: 90,
    address: "39 Garden Avenue, Future City",
    bloodGroup: "AB-",
    emergencyContact: "+1 234-567-8982",
    previousSchool: "Green Valley School",
    notes: "Ranked among top 5 in academics.",
  },
  {
    id: "ST035",
    name: "Ajith S",
    email: "ajith.s@student.edu",
    phone: "+1 234-567-8983",
    class: "Grade 12-C",
    rollNo: "054",
    dob: "2006-10-15",
    guardian: "Mrs. Shantha",
    guardianPhone: "+1 234-567-8984",
    status: "Graduated",
    admission: "2021-06-01",
    avatar: "",
    studentId: "ST035",
    grade: "12",
    section: "C",
    feeStatus: "Paid",
    attendance: 93,
    performance: 91,
    address: "41 Hill View, Future City",
    bloodGroup: "O+",
    emergencyContact: "+1 234-567-8985",
    previousSchool: "Oxford Matric School",
    notes: "Cleared JEE Mains, awaiting Advanced results.",
  },
];

const grades = ["9", "10", "11", "12"];
const sections = ["A", "B", "C", "D"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const feeStatuses = ["Paid", "Pending", "Overdue", "Partial"];

export default function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [feeFilter, setFeeFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    dob: "",
    guardian: "",
    guardianPhone: "",
    status: "Active",
    admission: "",
    studentId: "",
    grade: "",
    section: "",
    feeStatus: "Pending",
    attendance: 0,
    performance: 0,
    address: "",
    bloodGroup: "",
    emergencyContact: "",
    previousSchool: "",
    notes: "",
  });

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.guardian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status.toLowerCase() === statusFilter;
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesFee =
      feeFilter === "all" || student.feeStatus.toLowerCase() === feeFilter;
    return matchesSearch && matchesStatus && matchesGrade && matchesFee;
  });

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "Active").length,
    classes: new Set(students.map((s) => s.class)).size,
    newAdmissions: students.filter(
      (s) => new Date(s.admission).getFullYear() === new Date().getFullYear(),
    ).length,
    avgAttendance: Math.round(
      students.reduce((sum, s) => sum + s.attendance, 0) / students.length,
    ),
    feePending: students.filter(
      (s) => s.feeStatus === "Pending" || s.feeStatus === "Overdue",
    ).length,
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      rollNo: "",
      dob: "",
      guardian: "",
      guardianPhone: "",
      status: "Active",
      admission: "",
      studentId: "",
      grade: "",
      section: "",
      feeStatus: "Pending",
      attendance: 0,
      performance: 0,
      address: "",
      bloodGroup: "",
      emergencyContact: "",
      previousSchool: "",
      notes: "",
    });
  };

  const generateStudentId = () => {
    const maxId = Math.max(
      ...students.map((s) => parseInt(s.id.replace("ST", ""))),
      0,
    );
    return `ST${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleCreate = () => {
    const newStudent: Student = {
      id: generateStudentId(),
      ...formData,
      class: `Grade ${formData.grade}-${formData.section}`,
      avatar: "",
    };
    setStudents([...students, newStudent]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedStudent) {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                ...formData,
                class: `Grade ${formData.grade}-${formData.section}`,
              }
            : student,
        ),
      );
      setIsEditDialogOpen(false);
      setSelectedStudent(null);
      resetForm();
    }
  };

  const handleDelete = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId));
  };

  const openCreateDialog = () => {
    resetForm();
    setFormData((prev) => ({
      ...prev,
      studentId: generateStudentId(),
      admission: new Date().toISOString().split("T")[0],
    }));
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      rollNo: student.rollNo,
      dob: student.dob,
      guardian: student.guardian,
      guardianPhone: student.guardianPhone,
      status: student.status,
      admission: student.admission,
      studentId: student.studentId,
      grade: student.grade,
      section: student.section,
      feeStatus: student.feeStatus,
      attendance: student.attendance,
      performance: student.performance,
      address: student.address,
      bloodGroup: student.bloodGroup,
      emergencyContact: student.emergencyContact,
      previousSchool: student.previousSchool,
      notes: student.notes,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      [
        "Student ID",
        "Name",
        "Email",
        "Phone",
        "Class",
        "Roll No",
        "Date of Birth",
        "Guardian",
        "Guardian Phone",
        "Fee Status",
        "Attendance",
        "Performance",
        "Status",
        "Admission Date",
        "Blood Group",
        "Address",
        "Emergency Contact",
        "Previous School",
        "Notes",
      ].join(","),
      ...filteredStudents.map((student) =>
        [
          student.id,
          student.name,
          student.email,
          student.phone,
          student.class,
          student.rollNo,
          student.dob,
          student.guardian,
          student.guardianPhone,
          student.feeStatus,
          student.attendance.toString() + "%",
          student.performance.toString() + "%",
          student.status,
          student.admission,
          student.bloodGroup,
          student.address,
          student.emergencyContact,
          student.previousSchool,
          student.notes.replace(/,/g, ";"),
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `students_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Student Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage student enrollment, academic records, and personal
            information.
          </p>
        </div>
        <Button className="btn-primary" onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Total Students
              </p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">
                {stats.active} active students
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Avg Attendance
              </p>
              <p className="text-3xl font-bold text-green-900">
                {stats.avgAttendance}%
              </p>
              <p className="text-xs text-green-600">Overall attendance rate</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Classes</p>
              <p className="text-3xl font-bold text-purple-900">
                {stats.classes}
              </p>
              <p className="text-xs text-purple-600">Across 4 grades</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Fee Pending</p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.feePending}
              </p>
              <p className="text-xs text-orange-600">
                Students with pending fees
              </p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            Student Directory
          </CardTitle>
          <CardDescription>
            View and manage all student records and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
                <SelectItem value="dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={feeFilter} onValueChange={setFeeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Fee Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fees</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Class & Roll</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {student.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="outline">{student.class}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        Roll: {student.rollNo}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {student.guardian}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {student.guardianPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Attendance:</span>
                        <Progress
                          value={student.attendance}
                          className="w-16 h-2"
                        />
                        <span className="text-xs">{student.attendance}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Academic:</span>
                        <Progress
                          value={student.performance}
                          className="w-16 h-2"
                        />
                        <span className="text-xs">{student.performance}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.feeStatus === "Paid"
                          ? "default"
                          : student.feeStatus === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Student</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {student.name}?
                              This action cannot be undone and will remove all
                              student records.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(student.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Register a new student with complete information.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="guardian">Guardian & Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    placeholder="Auto-generated ID"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) =>
                      setFormData({ ...formData, bloodGroup: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) =>
                      setFormData({ ...formData, grade: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) =>
                      setFormData({ ...formData, section: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    value={formData.rollNo}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNo: e.target.value })
                    }
                    placeholder="Enter roll number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admission">Admission Date</Label>
                  <Input
                    id="admission"
                    type="date"
                    value={formData.admission}
                    onChange={(e) =>
                      setFormData({ ...formData, admission: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="feeStatus">Fee Status</Label>
                  <Select
                    value={formData.feeStatus}
                    onValueChange={(value) =>
                      setFormData({ ...formData, feeStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {feeStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="attendance">Attendance (%)</Label>
                  <Input
                    id="attendance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter attendance percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="performance">Academic Performance (%)</Label>
                  <Input
                    id="performance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        performance: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter performance percentage"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) =>
                    setFormData({ ...formData, previousSchool: e.target.value })
                  }
                  placeholder="Enter previous school name"
                />
              </div>
            </TabsContent>

            <TabsContent value="guardian" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardian">Guardian Name</Label>
                  <Input
                    id="guardian"
                    value={formData.guardian}
                    onChange={(e) =>
                      setFormData({ ...formData, guardian: e.target.value })
                    }
                    placeholder="Enter guardian's name"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guardianPhone: e.target.value,
                      })
                    }
                    placeholder="Enter guardian's phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Enter emergency contact"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Transferred">Transferred</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes about the student"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Register Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student Information</DialogTitle>
            <DialogDescription>
              Update student information and academic records.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="guardian">Guardian & Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-studentId">Student ID</Label>
                  <Input
                    id="edit-studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    placeholder="Enter student ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-dob">Date of Birth</Label>
                  <Input
                    id="edit-dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) =>
                      setFormData({ ...formData, bloodGroup: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-grade">Grade</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) =>
                      setFormData({ ...formData, grade: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) =>
                      setFormData({ ...formData, section: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-rollNo">Roll Number</Label>
                  <Input
                    id="edit-rollNo"
                    value={formData.rollNo}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNo: e.target.value })
                    }
                    placeholder="Enter roll number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-admission">Admission Date</Label>
                  <Input
                    id="edit-admission"
                    type="date"
                    value={formData.admission}
                    onChange={(e) =>
                      setFormData({ ...formData, admission: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-feeStatus">Fee Status</Label>
                  <Select
                    value={formData.feeStatus}
                    onValueChange={(value) =>
                      setFormData({ ...formData, feeStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {feeStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-attendance">Attendance (%)</Label>
                  <Input
                    id="edit-attendance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter attendance percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-performance">
                    Academic Performance (%)
                  </Label>
                  <Input
                    id="edit-performance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        performance: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter performance percentage"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-previousSchool">Previous School</Label>
                <Input
                  id="edit-previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) =>
                    setFormData({ ...formData, previousSchool: e.target.value })
                  }
                  placeholder="Enter previous school name"
                />
              </div>
            </TabsContent>

            <TabsContent value="guardian" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-guardian">Guardian Name</Label>
                  <Input
                    id="edit-guardian"
                    value={formData.guardian}
                    onChange={(e) =>
                      setFormData({ ...formData, guardian: e.target.value })
                    }
                    placeholder="Enter guardian's name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-guardianPhone">Guardian Phone</Label>
                  <Input
                    id="edit-guardianPhone"
                    value={formData.guardianPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guardianPhone: e.target.value,
                      })
                    }
                    placeholder="Enter guardian's phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-emergencyContact">
                    Emergency Contact
                  </Label>
                  <Input
                    id="edit-emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Enter emergency contact"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Transferred">Transferred</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes about the student"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information about the student.
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedStudent.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.class} • Roll: {selectedStudent.rollNo}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        selectedStudent.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedStudent.status}
                    </Badge>
                    <Badge variant="outline">{selectedStudent.id}</Badge>
                    <Badge
                      variant={
                        selectedStudent.feeStatus === "Paid"
                          ? "default"
                          : selectedStudent.feeStatus === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {selectedStudent.feeStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    EMAIL
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {selectedStudent.email}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    PHONE
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" />
                    {selectedStudent.phone}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    DATE OF BIRTH
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {selectedStudent.dob}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    BLOOD GROUP
                  </Label>
                  <div className="mt-1">{selectedStudent.bloodGroup}</div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    ADMISSION DATE
                  </Label>
                  <div className="mt-1">{selectedStudent.admission}</div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    PREVIOUS SCHOOL
                  </Label>
                  <div className="mt-1">{selectedStudent.previousSchool}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    ATTENDANCE
                  </Label>
                  <div className="mt-1">
                    <Progress
                      value={selectedStudent.attendance}
                      className="w-full h-2"
                    />
                    <span className="text-xs">
                      {selectedStudent.attendance}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    ACADEMIC PERFORMANCE
                  </Label>
                  <div className="mt-1">
                    <Progress
                      value={selectedStudent.performance}
                      className="w-full h-2"
                    />
                    <span className="text-xs">
                      {selectedStudent.performance}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  GUARDIAN INFORMATION
                </Label>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <span className="font-medium">
                      {selectedStudent.guardian}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {selectedStudent.guardianPhone}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">
                  ADDRESS
                </Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                  {selectedStudent.address}
                </p>
              </div>

              {selectedStudent.notes && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">
                    NOTES
                  </Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                    {selectedStudent.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
