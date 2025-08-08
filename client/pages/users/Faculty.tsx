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
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Award,
  Clock,
  Eye,
  Filter,
  Calendar,
  Download,
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  FileText,
  School,
  Building,
} from "lucide-react";

// Updated comprehensive faculty interface based on JSON structure
interface Faculty {
  faculty_id: string;
  employee_number: string;
  joining_date: string;
  designation: string;
  department: string;
  specialization: string;
  employment_type: string;
  experience_years: number;
  employment_status: string;

  personal_info: {
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    date_of_birth: string;
    gender: string;
    blood_group: string;
    nationality: string;
    marital_status: string;
  };

  contact_info: {
    email: string;
    alternate_email: string;
    phone_number: string;
    alternate_phone_number: string;
    present_address: {
      line: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    };
    permanent_address: {
      line: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    };
    emergency_contact: {
      name: string;
      relationship: string;
      contact_number: string;
    };
  };

  qualification_info: {
    highest_qualification: string;
    discipline: string;
    ug_college: string;
    ug_year: number;
    pg_college: string;
    pg_year: number;
    phd_college?: string;
    phd_year?: number;
    phd_topic?: string;
  };

  professional_experience: Array<{
    institute: string;
    designation: string;
    from_year: number;
    to_year: number;
  }>;

  documents: {
    aadhaar_number: string;
    pan_number: string;
    resume: string;
    photo: string;
    highest_degree_certificate: string;
    experience_certificates: string[];
    offer_letter: string;
    appointment_letter: string;
  };

  bank_details: {
    bank_name: string;
    account_number: string;
    ifsc_code: string;
    branch: string;
  };

  login_account: {
    username: string;
    password_plain: string;
    role: string;
    otp_verified: boolean;
  };

  metadata: {
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
  };
}

// Interface for the comprehensive add faculty form
interface FacultyFormData {
  // Faculty Member details
  employee_number: string;
  joining_date: string;
  designation: string;
  department: string;
  specialization: string;
  employment_type: string;
  experience_years: number;
  employment_status: string;

  // Personal Info
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  nationality: string;
  marital_status: string;

  // Contact Info
  email: string;
  alternate_email: string;
  phone_number: string;
  alternate_phone_number: string;
  present_address_line: string;
  present_address_city: string;
  present_address_state: string;
  present_address_zip: string;
  present_address_country: string;
  permanent_address_line: string;
  permanent_address_city: string;
  permanent_address_state: string;
  permanent_address_zip: string;
  permanent_address_country: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_number: string;

  // Qualification Info
  highest_qualification: string;
  discipline: string;
  ug_college: string;
  ug_year: number;
  pg_college: string;
  pg_year: number;
  phd_college: string;
  phd_year: number;
  phd_topic: string;

  // Professional Experience
  experience_institute_1: string;
  experience_designation_1: string;
  experience_from_year_1: number;
  experience_to_year_1: number;
  experience_institute_2: string;
  experience_designation_2: string;
  experience_from_year_2: number;
  experience_to_year_2: number;

  // Documents
  aadhaar_number: string;
  pan_number: string;

  // Bank Details
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  branch: string;

  // Login Account
  username: string;
  password_plain: string;
  role: string;
}

// Sample faculty data based on your JSON structure
const initialFaculty: Faculty[] = [
  {
    faculty_id: "F2025001",
    employee_number: "EMP2025CSE001",
    joining_date: "2025-07-15",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    specialization: "Artificial Intelligence",
    employment_type: "Full-Time",
    experience_years: 4,
    employment_status: "Active",

    personal_info: {
      first_name: "Anjali",
      middle_name: "Meera",
      last_name: "",
      full_name: "Anjali Meera",
      date_of_birth: "1988-04-22",
      gender: "Female",
      blood_group: "O+",
      nationality: "Indian",
      marital_status: "Married",
    },

    contact_info: {
      email: "anjali.nair@college.edu",
      alternate_email: "anjalinair.personal@gmail.com",
      phone_number: "+919812345678",
      alternate_phone_number: "+919812345679",
      present_address: {
        line: "45 MG Road",
        city: "Chennai",
        state: "Tamil Nadu",
        zip_code: "600034",
        country: "India",
      },
      permanent_address: {
        line: "12 Beach Road",
        city: "Kochi",
        state: "Kerala",
        zip_code: "682001",
        country: "India",
      },
      emergency_contact: {
        name: "Ravi Nair",
        relationship: "Husband",
        contact_number: "+919812347890",
      },
    },

    qualification_info: {
      highest_qualification: "Ph.D.",
      discipline: "Computer Science",
      ug_college: "Anna University",
      ug_year: 2008,
      pg_college: "IIT Madras",
      pg_year: 2011,
      phd_college: "IIT Madras",
      phd_year: 2016,
      phd_topic: "Deep Learning in Medical Imaging",
    },

    professional_experience: [
      {
        institute: "XYZ Engineering College",
        designation: "Lecturer",
        from_year: 2016,
        to_year: 2019,
      },
      {
        institute: "ABC Institute of Tech",
        designation: "Assistant Professor",
        from_year: 2019,
        to_year: 2025,
      },
    ],

    documents: {
      aadhaar_number: "5678-9101-1234",
      pan_number: "ABCDE1234F",
      resume: "/uploads/docs/resume_F2025001.pdf",
      photo: "/uploads/photos/F2025001.jpg",
      highest_degree_certificate: "/uploads/docs/phd_cert_F2025001.pdf",
      experience_certificates: [
        "/uploads/docs/exp_XYZ.pdf",
        "/uploads/docs/exp_ABC.pdf",
      ],
      offer_letter: "/uploads/docs/offer_F2025001.pdf",
      appointment_letter: "/uploads/docs/appointment_F2025001.pdf",
    },

    bank_details: {
      bank_name: "State Bank of India",
      account_number: "123456789012",
      ifsc_code: "SBIN0001234",
      branch: "T. Nagar, Chennai",
    },

    login_account: {
      username: "anjali.nair",
      password_plain: "Anjali@123",
      role: "Faculty",
      otp_verified: true,
    },

    metadata: {
      created_at: "2025-07-15T09:00:00Z",
      created_by: "hr_admin",
      updated_at: "2025-08-01T12:00:00Z",
      updated_by: "hr_admin",
    },
  },
  {
    faculty_id: "F2025002",
    employee_number: "EMP2025ECE002",
    joining_date: "2023-08-10",
    designation: "Associate Professor",
    department: "Electronics and Communication Engineering",
    specialization: "VLSI Design",
    employment_type: "Full-Time",
    experience_years: 9,
    employment_status: "Active",
    personal_info: {
      first_name: "Rohit",
      middle_name: "Kumar",
      last_name: "",
      full_name: "Rohit Kumar",
      date_of_birth: "1984-09-12",
      gender: "Male",
      blood_group: "A+",
      nationality: "Indian",
      marital_status: "Married",
    },
    contact_info: {
      email: "rohit.verma@college.edu",
      alternate_email: "rkverma.ece@gmail.com",
      phone_number: "+919812345001",
      alternate_phone_number: "+919812345002",
      present_address: {
        line: "89 Tech Park",
        city: "Bangalore",
        state: "Karnataka",
        zip_code: "560037",
        country: "India",
      },
      permanent_address: {
        line: "45 Lake View",
        city: "Lucknow",
        state: "Uttar Pradesh",
        zip_code: "226001",
        country: "India",
      },
      emergency_contact: {
        name: "Priya Verma",
        relationship: "Wife",
        contact_number: "+919812345003",
      },
    },
    qualification_info: {
      highest_qualification: "Ph.D.",
      discipline: "Electronics",
      ug_college: "NIT Warangal",
      ug_year: 2006,
      pg_college: "IISc Bangalore",
      pg_year: 2008,
      phd_college: "IISc Bangalore",
      phd_year: 2014,
      phd_topic: "Low Power VLSI Architectures",
    },
    professional_experience: [
      {
        institute: "Techno India",
        designation: "Assistant Professor",
        from_year: 2014,
        to_year: 2018,
      },
      {
        institute: "BITS Pilani",
        designation: "Associate Professor",
        from_year: 2018,
        to_year: 2023,
      },
    ],
    documents: {
      aadhaar_number: "1234-5678-9012",
      pan_number: "FGHIJ5678K",
      resume: "/uploads/docs/resume_F2025002.pdf",
      photo: "/uploads/photos/F2025002.jpg",
      highest_degree_certificate: "/uploads/docs/phd_cert_F2025002.pdf",
      experience_certificates: [
        "/uploads/docs/exp_Techno.pdf",
        "/uploads/docs/exp_BITS.pdf",
      ],
      offer_letter: "/uploads/docs/offer_F2025002.pdf",
      appointment_letter: "/uploads/docs/appointment_F2025002.pdf",
    },
    bank_details: {
      bank_name: "HDFC Bank",
      account_number: "987654321098",
      ifsc_code: "HDFC0004567",
      branch: "Koramangala, Bangalore",
    },
    login_account: {
      username: "rohit.verma",
      password_plain: "Rohit@123",
      role: "Faculty",
      otp_verified: true,
    },
    metadata: {
      created_at: "2023-08-10T10:00:00Z",
      created_by: "hr_admin",
      updated_at: "2025-07-20T15:30:00Z",
      updated_by: "hr_admin",
    },
  },
  {
    faculty_id: "F2025003",
    employee_number: "EMP2025MECH003",
    joining_date: "2024-01-05",
    designation: "Professor",
    department: "Mechanical Engineering",
    specialization: "Robotics and Automation",
    employment_type: "Full-Time",
    experience_years: 15,
    employment_status: "Active",
    personal_info: {
      first_name: "Meena",
      middle_name: "",
      last_name: "kumari",
      full_name: "Meena kumari",
      date_of_birth: "1980-11-05",
      gender: "Female",
      blood_group: "B+",
      nationality: "Indian",
      marital_status: "Single",
    },
    contact_info: {
      email: "neha.singh@college.edu",
      alternate_email: "nehas.me@gmail.com",
      phone_number: "+919812340000",
      alternate_phone_number: "",
      present_address: {
        line: "150 Industrial Estate",
        city: "Pune",
        state: "Maharashtra",
        zip_code: "411038",
        country: "India",
      },
      permanent_address: {
        line: "20 Civil Lines",
        city: "Nagpur",
        state: "Maharashtra",
        zip_code: "440001",
        country: "India",
      },
      emergency_contact: {
        name: "Amit Singh",
        relationship: "Brother",
        contact_number: "+919812349999",
      },
    },
    qualification_info: {
      highest_qualification: "Ph.D.",
      discipline: "Mechanical Engineering",
      ug_college: "COEP",
      ug_year: 2001,
      pg_college: "IIT Bombay",
      pg_year: 2003,
      phd_college: "IIT Bombay",
      phd_year: 2008,
      phd_topic: "Autonomous Robotic Systems",
    },
    professional_experience: [
      {
        institute: "MIT Pune",
        designation: "Associate Professor",
        from_year: 2008,
        to_year: 2018,
      },
      {
        institute: "COEP Technological University",
        designation: "Professor",
        from_year: 2018,
        to_year: 2024,
      },
    ],
    documents: {
      aadhaar_number: "4321-8765-2109",
      pan_number: "LMNOP2345Q",
      resume: "/uploads/docs/resume_F2025003.pdf",
      photo: "/uploads/photos/F2025003.jpg",
      highest_degree_certificate: "/uploads/docs/phd_cert_F2025003.pdf",
      experience_certificates: [
        "/uploads/docs/exp_MIT.pdf",
        "/uploads/docs/exp_COEP.pdf",
      ],
      offer_letter: "/uploads/docs/offer_F2025003.pdf",
      appointment_letter: "/uploads/docs/appointment_F2025003.pdf",
    },
    bank_details: {
      bank_name: "ICICI Bank",
      account_number: "112233445566",
      ifsc_code: "ICIC0007890",
      branch: "Shivaji Nagar, Pune",
    },
    login_account: {
      username: "neha.singh",
      password_plain: "Neha@123",
      role: "Faculty",
      otp_verified: true,
    },
    metadata: {
      created_at: "2024-01-05T08:30:00Z",
      created_by: "hr_admin",
      updated_at: "2025-07-01T14:00:00Z",
      updated_by: "hr_admin",
    },
  },
  {
    faculty_id: "F2025004",
    employee_number: "EMP2025CIV004",
    joining_date: "2022-06-20",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    specialization: "Structural Engineering",
    employment_type: "Full-Time",
    experience_years: 6,
    employment_status: "Active",
    personal_info: {
      first_name: "Arjun",
      middle_name: "",
      last_name: "Raj",
      full_name: "Arjun raj",
      date_of_birth: "1990-03-18",
      gender: "Male",
      blood_group: "AB+",
      nationality: "Indian",
      marital_status: "Married",
    },
    contact_info: {
      email: "arjun.reddy@college.edu",
      alternate_email: "arjunraj.ce@gmail.com",
      phone_number: "+919812347001",
      alternate_phone_number: "",
      present_address: {
        line: "76 Main Road",
        city: "Chennai",
        state: "Tamilnadu",
        zip_code: "500001",
        country: "India",
      },
      permanent_address: {
        line: "32 Temple Street",
        city: "Vijayawada",
        state: "Andhra Pradesh",
        zip_code: "520001",
        country: "India",
      },
      emergency_contact: {
        name: "Sneha Reddy",
        relationship: "Wife",
        contact_number: "+919812347002",
      },
    },
    qualification_info: {
      highest_qualification: "M.Tech",
      discipline: "Civil Engineering",
      ug_college: "JNTU Hyderabad",
      ug_year: 2011,
      pg_college: "IIT Roorkee",
      pg_year: 2013,
      phd_college: "",
      phd_year: null,
      phd_topic: "",
    },
    professional_experience: [
      {
        institute: "SRM University",
        designation: "Lecturer",
        from_year: 2013,
        to_year: 2017,
      },
      {
        institute: "BITS Hyderabad",
        designation: "Assistant Professor",
        from_year: 2017,
        to_year: 2022,
      },
    ],
    documents: {
      aadhaar_number: "1010-2020-3030",
      pan_number: "QRSTU6789L",
      resume: "/uploads/docs/resume_F2025004.pdf",
      photo: "/uploads/photos/F2025004.jpg",
      highest_degree_certificate: "/uploads/docs/pg_cert_F2025004.pdf",
      experience_certificates: [
        "/uploads/docs/exp_SRM.pdf",
        "/uploads/docs/exp_BITS_HYD.pdf",
      ],
      offer_letter: "/uploads/docs/offer_F2025004.pdf",
      appointment_letter: "/uploads/docs/appointment_F2025004.pdf",
    },
    bank_details: {
      bank_name: "Axis Bank",
      account_number: "556677889900",
      ifsc_code: "UTIB0001100",
      branch: "Hitech City, Hyderabad",
    },
    login_account: {
      username: "arjun.reddy",
      password_plain: "Arjun@123",
      role: "Faculty",
      otp_verified: true,
    },
    metadata: {
      created_at: "2022-06-20T11:00:00Z",
      created_by: "hr_admin",
      updated_at: "2025-07-10T10:15:00Z",
      updated_by: "hr_admin",
    },
  },
];

const departments = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical and Electronics Engineering",
  "Information Technology",
  "Biomedical Engineering",
  "Chemical Engineering",
];

const qualifications = [
  "Ph.D",
  "M.Tech",
  "M.E",
  "M.Sc",
  "M.A",
  "MBA",
  "B.Tech",
  "B.E",
  "B.Sc",
  "B.A",
];

const designations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Senior Lecturer",
];

const employmentTypes = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Visiting",
];

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const employmentStatuses = ["Active", "On Leave", "Inactive", "Retired"];

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "add">("list");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState<FacultyFormData>({
    // Faculty Member details
    employee_number: "",
    joining_date: "",
    designation: "",
    department: "",
    specialization: "",
    employment_type: "Full-Time",
    experience_years: 0,
    employment_status: "Active",

    // Personal Info
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    nationality: "Indian",
    marital_status: "",

    // Contact Info
    email: "",
    alternate_email: "",
    phone_number: "",
    alternate_phone_number: "",
    present_address_line: "",
    present_address_city: "",
    present_address_state: "",
    present_address_zip: "",
    present_address_country: "India",
    permanent_address_line: "",
    permanent_address_city: "",
    permanent_address_state: "",
    permanent_address_zip: "",
    permanent_address_country: "India",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_number: "",

    // Qualification Info
    highest_qualification: "",
    discipline: "",
    ug_college: "",
    ug_year: 0,
    pg_college: "",
    pg_year: 0,
    phd_college: "",
    phd_year: 0,
    phd_topic: "",

    // Professional Experience
    experience_institute_1: "",
    experience_designation_1: "",
    experience_from_year_1: 0,
    experience_to_year_1: 0,
    experience_institute_2: "",
    experience_designation_2: "",
    experience_from_year_2: 0,
    experience_to_year_2: 0,

    // Documents
    aadhaar_number: "",
    pan_number: "",

    // Bank Details
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    branch: "",

    // Login Account
    username: "",
    password_plain: "",
    role: "Faculty",
  });

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.personal_info.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.contact_info.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      member.employment_status.toLowerCase() === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: faculty.length,
    active: faculty.filter((f) => f.employment_status === "Active").length,
    departments: new Set(faculty.map((f) => f.department)).size,
    phdHolders: faculty.filter((f) =>
      f.qualification_info.highest_qualification.includes("Ph.D")
    ).length,
    avgExperience:
      Math.round(
        (faculty.reduce((sum, f) => sum + f.experience_years, 0) /
          faculty.length) *
          10
      ) / 10,
  };

  const resetForm = () => {
    setFormData({
      // Faculty Member details
      employee_number: "",
      joining_date: "",
      designation: "",
      department: "",
      specialization: "",
      employment_type: "Full-Time",
      experience_years: 0,
      employment_status: "Active",

      // Personal Info
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      blood_group: "",
      nationality: "Indian",
      marital_status: "",

      // Contact Info
      email: "",
      alternate_email: "",
      phone_number: "",
      alternate_phone_number: "",
      present_address_line: "",
      present_address_city: "",
      present_address_state: "",
      present_address_zip: "",
      present_address_country: "India",
      permanent_address_line: "",
      permanent_address_city: "",
      permanent_address_state: "",
      permanent_address_zip: "",
      permanent_address_country: "India",
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_number: "",

      // Qualification Info
      highest_qualification: "",
      discipline: "",
      ug_college: "",
      ug_year: 0,
      pg_college: "",
      pg_year: 0,
      phd_college: "",
      phd_year: 0,
      phd_topic: "",

      // Professional Experience
      experience_institute_1: "",
      experience_designation_1: "",
      experience_from_year_1: 0,
      experience_to_year_1: 0,
      experience_institute_2: "",
      experience_designation_2: "",
      experience_from_year_2: 0,
      experience_to_year_2: 0,

      // Documents
      aadhaar_number: "",
      pan_number: "",

      // Bank Details
      bank_name: "",
      account_number: "",
      ifsc_code: "",
      branch: "",

      // Login Account
      username: "",
      password_plain: "",
      role: "Faculty",
    });
  };

  const handleCreate = () => {
    const facultyId = `F${new Date().getFullYear()}${String(faculty.length + 1).padStart(3, '0')}`;
    
    const newFaculty: Faculty = {
      faculty_id: facultyId,
      employee_number: formData.employee_number,
      joining_date: formData.joining_date,
      designation: formData.designation,
      department: formData.department,
      specialization: formData.specialization,
      employment_type: formData.employment_type,
      experience_years: formData.experience_years,
      employment_status: formData.employment_status,

      personal_info: {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        full_name: `${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim(),
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        blood_group: formData.blood_group,
        nationality: formData.nationality,
        marital_status: formData.marital_status,
      },

      contact_info: {
        email: formData.email,
        alternate_email: formData.alternate_email,
        phone_number: formData.phone_number,
        alternate_phone_number: formData.alternate_phone_number,
        present_address: {
          line: formData.present_address_line,
          city: formData.present_address_city,
          state: formData.present_address_state,
          zip_code: formData.present_address_zip,
          country: formData.present_address_country,
        },
        permanent_address: {
          line: formData.permanent_address_line,
          city: formData.permanent_address_city,
          state: formData.permanent_address_state,
          zip_code: formData.permanent_address_zip,
          country: formData.permanent_address_country,
        },
        emergency_contact: {
          name: formData.emergency_contact_name,
          relationship: formData.emergency_contact_relationship,
          contact_number: formData.emergency_contact_number,
        },
      },

      qualification_info: {
        highest_qualification: formData.highest_qualification,
        discipline: formData.discipline,
        ug_college: formData.ug_college,
        ug_year: formData.ug_year,
        pg_college: formData.pg_college,
        pg_year: formData.pg_year,
        phd_college: formData.phd_college || undefined,
        phd_year: formData.phd_year || undefined,
        phd_topic: formData.phd_topic || undefined,
      },

      professional_experience: [
        {
          institute: formData.experience_institute_1,
          designation: formData.experience_designation_1,
          from_year: formData.experience_from_year_1,
          to_year: formData.experience_to_year_1,
        },
        {
          institute: formData.experience_institute_2,
          designation: formData.experience_designation_2,
          from_year: formData.experience_from_year_2,
          to_year: formData.experience_to_year_2,
        },
      ].filter(exp => exp.institute), // Only include experiences with institute names

      documents: {
        aadhaar_number: formData.aadhaar_number,
        pan_number: formData.pan_number,
        resume: "",
        photo: "",
        highest_degree_certificate: "",
        experience_certificates: [],
        offer_letter: "",
        appointment_letter: "",
      },

      bank_details: {
        bank_name: formData.bank_name,
        account_number: formData.account_number,
        ifsc_code: formData.ifsc_code,
        branch: formData.branch,
      },

      login_account: {
        username: formData.username,
        password_plain: formData.password_plain,
        role: formData.role,
        otp_verified: false,
      },

      metadata: {
        created_at: new Date().toISOString(),
        created_by: "admin",
        updated_at: new Date().toISOString(),
        updated_by: "admin",
      },
    };

    setFaculty([...faculty, newFaculty]);
    setViewMode("list");
    resetForm();
  };

  const handleDelete = (facultyId: string) => {
    setFaculty(faculty.filter((member) => member.faculty_id !== facultyId));
  };

  const openAddFacultyForm = () => {
    resetForm();
    setViewMode("add");
  };

  const handleBackToList = () => {
    setViewMode("list");
    resetForm();
  };

  const handleExport = () => {
    const csvContent = [
      [
        "Faculty ID",
        "Employee Number",
        "Name",
        "Email",
        "Phone",
        "Department",
        "Designation",
        "Qualification",
        "Experience Years",
        "Specialization",
        "Employment Type",
        "Status",
        "Joining Date",
      ].join(","),
      ...filteredFaculty.map((member) =>
        [
          member.faculty_id,
          member.employee_number,
          member.personal_info.full_name,
          member.contact_info.email,
          member.contact_info.phone_number,
          member.department,
          member.designation,
          member.qualification_info.highest_qualification,
          member.experience_years.toString(),
          member.specialization,
          member.employment_type,
          member.employment_status,
          member.joining_date,
        ]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `faculty_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render add faculty form
  if (viewMode === "add") {
    return (
      <div className="space-y-8">
        {/* Header with Back Button */}
        <div className="page-header flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Faculty List
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Add New Faculty Member
              </h1>
              <p className="text-muted-foreground mt-2">
                Enter complete information for the new faculty member
              </p>
            </div>
          </div>
        </div>

        {/* Add Faculty Form */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="employment" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="qualification">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="other">Other Details</TabsTrigger>
              </TabsList>

              <TabsContent value="employment" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employee_number">Employee Number</Label>
                    <Input
                      id="employee_number"
                      value={formData.employee_number}
                      onChange={(e) => setFormData({ ...formData, employee_number: e.target.value })}
                      placeholder="Enter employee number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joining_date">Joining Date</Label>
                    <Input
                      id="joining_date"
                      type="date"
                      value={formData.joining_date}
                      onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Select
                      value={formData.designation}
                      onValueChange={(value) => setFormData({ ...formData, designation: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((designation) => (
                          <SelectItem key={designation} value={designation}>
                            {designation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="Enter specialization"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employment_type">Employment Type</Label>
                    <Select
                      value={formData.employment_type}
                      onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience_years">Experience Years</Label>
                    <Input
                      id="experience_years"
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                      placeholder="Enter years of experience"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employment_status">Employment Status</Label>
                    <Select
                      value={formData.employment_status}
                      onValueChange={(value) => setFormData({ ...formData, employment_status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personal" className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="middle_name">Middle Name</Label>
                    <Input
                      id="middle_name"
                      value={formData.middle_name}
                      onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Select
                      value={formData.blood_group}
                      onValueChange={(value) => setFormData({ ...formData, blood_group: value })}
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
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="Enter nationality"
                    />
                  </div>
                  <div>
                    <Label htmlFor="marital_status">Marital Status</Label>
                    <Select
                      value={formData.marital_status}
                      onValueChange={(value) => setFormData({ ...formData, marital_status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        {maritalStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Primary Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter primary email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternate_email">Alternate Email</Label>
                    <Input
                      id="alternate_email"
                      type="email"
                      value={formData.alternate_email}
                      onChange={(e) => setFormData({ ...formData, alternate_email: e.target.value })}
                      placeholder="Enter alternate email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternate_phone_number">Alternate Phone</Label>
                    <Input
                      id="alternate_phone_number"
                      value={formData.alternate_phone_number}
                      onChange={(e) => setFormData({ ...formData, alternate_phone_number: e.target.value })}
                      placeholder="Enter alternate phone"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Present Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="present_address_line">Address Line</Label>
                      <Input
                        id="present_address_line"
                        value={formData.present_address_line}
                        onChange={(e) => setFormData({ ...formData, present_address_line: e.target.value })}
                        placeholder="Enter address line"
                      />
                    </div>
                    <div>
                      <Label htmlFor="present_address_city">City</Label>
                      <Input
                        id="present_address_city"
                        value={formData.present_address_city}
                        onChange={(e) => setFormData({ ...formData, present_address_city: e.target.value })}
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="present_address_state">State</Label>
                      <Input
                        id="present_address_state"
                        value={formData.present_address_state}
                        onChange={(e) => setFormData({ ...formData, present_address_state: e.target.value })}
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="present_address_zip">ZIP Code</Label>
                      <Input
                        id="present_address_zip"
                        value={formData.present_address_zip}
                        onChange={(e) => setFormData({ ...formData, present_address_zip: e.target.value })}
                        placeholder="Enter ZIP code"
                      />
                    </div>
                    <div>
                      <Label htmlFor="present_address_country">Country</Label>
                      <Input
                        id="present_address_country"
                        value={formData.present_address_country}
                        onChange={(e) => setFormData({ ...formData, present_address_country: e.target.value })}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Emergency Contact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergency_contact_name">Contact Name</Label>
                      <Input
                        id="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                        placeholder="Enter contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                      <Input
                        id="emergency_contact_relationship"
                        value={formData.emergency_contact_relationship}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_relationship: e.target.value })}
                        placeholder="Enter relationship"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact_number">Contact Number</Label>
                      <Input
                        id="emergency_contact_number"
                        value={formData.emergency_contact_number}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_number: e.target.value })}
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="qualification" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="highest_qualification">Highest Qualification</Label>
                    <Select
                      value={formData.highest_qualification}
                      onValueChange={(value) => setFormData({ ...formData, highest_qualification: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((qual) => (
                          <SelectItem key={qual} value={qual}>
                            {qual}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="discipline">Discipline</Label>
                    <Input
                      id="discipline"
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      placeholder="Enter discipline"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Undergraduate Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ug_college">UG College</Label>
                      <Input
                        id="ug_college"
                        value={formData.ug_college}
                        onChange={(e) => setFormData({ ...formData, ug_college: e.target.value })}
                        placeholder="Enter UG college"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ug_year">UG Year</Label>
                      <Input
                        id="ug_year"
                        type="number"
                        value={formData.ug_year}
                        onChange={(e) => setFormData({ ...formData, ug_year: parseInt(e.target.value) || 0 })}
                        placeholder="Enter UG year"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Postgraduate Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pg_college">PG College</Label>
                      <Input
                        id="pg_college"
                        value={formData.pg_college}
                        onChange={(e) => setFormData({ ...formData, pg_college: e.target.value })}
                        placeholder="Enter PG college"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pg_year">PG Year</Label>
                      <Input
                        id="pg_year"
                        type="number"
                        value={formData.pg_year}
                        onChange={(e) => setFormData({ ...formData, pg_year: parseInt(e.target.value) || 0 })}
                        placeholder="Enter PG year"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Ph.D. Details (Optional)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phd_college">Ph.D. College</Label>
                      <Input
                        id="phd_college"
                        value={formData.phd_college}
                        onChange={(e) => setFormData({ ...formData, phd_college: e.target.value })}
                        placeholder="Enter Ph.D. college"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phd_year">Ph.D. Year</Label>
                      <Input
                        id="phd_year"
                        type="number"
                        value={formData.phd_year}
                        onChange={(e) => setFormData({ ...formData, phd_year: parseInt(e.target.value) || 0 })}
                        placeholder="Enter Ph.D. year"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phd_topic">Ph.D. Topic</Label>
                    <Input
                      id="phd_topic"
                      value={formData.phd_topic}
                      onChange={(e) => setFormData({ ...formData, phd_topic: e.target.value })}
                      placeholder="Enter Ph.D. topic"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Experience 1</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience_institute_1">Institute</Label>
                      <Input
                        id="experience_institute_1"
                        value={formData.experience_institute_1}
                        onChange={(e) => setFormData({ ...formData, experience_institute_1: e.target.value })}
                        placeholder="Enter institute name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_designation_1">Designation</Label>
                      <Input
                        id="experience_designation_1"
                        value={formData.experience_designation_1}
                        onChange={(e) => setFormData({ ...formData, experience_designation_1: e.target.value })}
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience_from_year_1">From Year</Label>
                      <Input
                        id="experience_from_year_1"
                        type="number"
                        value={formData.experience_from_year_1}
                        onChange={(e) => setFormData({ ...formData, experience_from_year_1: parseInt(e.target.value) || 0 })}
                        placeholder="Enter from year"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_to_year_1">To Year</Label>
                      <Input
                        id="experience_to_year_1"
                        type="number"
                        value={formData.experience_to_year_1}
                        onChange={(e) => setFormData({ ...formData, experience_to_year_1: parseInt(e.target.value) || 0 })}
                        placeholder="Enter to year"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Experience 2 (Optional)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience_institute_2">Institute</Label>
                      <Input
                        id="experience_institute_2"
                        value={formData.experience_institute_2}
                        onChange={(e) => setFormData({ ...formData, experience_institute_2: e.target.value })}
                        placeholder="Enter institute name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_designation_2">Designation</Label>
                      <Input
                        id="experience_designation_2"
                        value={formData.experience_designation_2}
                        onChange={(e) => setFormData({ ...formData, experience_designation_2: e.target.value })}
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience_from_year_2">From Year</Label>
                      <Input
                        id="experience_from_year_2"
                        type="number"
                        value={formData.experience_from_year_2}
                        onChange={(e) => setFormData({ ...formData, experience_from_year_2: parseInt(e.target.value) || 0 })}
                        placeholder="Enter from year"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_to_year_2">To Year</Label>
                      <Input
                        id="experience_to_year_2"
                        type="number"
                        value={formData.experience_to_year_2}
                        onChange={(e) => setFormData({ ...formData, experience_to_year_2: parseInt(e.target.value) || 0 })}
                        placeholder="Enter to year"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="other" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Documents</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="aadhaar_number">Aadhaar Number</Label>
                      <Input
                        id="aadhaar_number"
                        value={formData.aadhaar_number}
                        onChange={(e) => setFormData({ ...formData, aadhaar_number: e.target.value })}
                        placeholder="Enter Aadhaar number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pan_number">PAN Number</Label>
                      <Input
                        id="pan_number"
                        value={formData.pan_number}
                        onChange={(e) => setFormData({ ...formData, pan_number: e.target.value })}
                        placeholder="Enter PAN number"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Bank Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bank_name">Bank Name</Label>
                      <Input
                        id="bank_name"
                        value={formData.bank_name}
                        onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        placeholder="Enter branch"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="account_number">Account Number</Label>
                      <Input
                        id="account_number"
                        value={formData.account_number}
                        onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifsc_code">IFSC Code</Label>
                      <Input
                        id="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={(e) => setFormData({ ...formData, ifsc_code: e.target.value })}
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Login Account</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Enter username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password_plain">Password</Label>
                      <Input
                        id="password_plain"
                        type="password"
                        value={formData.password_plain}
                        onChange={(e) => setFormData({ ...formData, password_plain: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" onClick={handleBackToList}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>
                Create Faculty Member
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Faculty Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage faculty members, their assignments, and academic information.
          </p>
        </div>
        <Button className="btn-primary" onClick={openAddFacultyForm}>
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Faculty</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">
                {stats.active} active faculty
              </p>
            </div>
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Departments</p>
              <p className="text-3xl font-bold text-green-900">
                {stats.departments}
              </p>
              <p className="text-xs text-green-600">Academic departments</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">PhD Holders</p>
              <p className="text-3xl font-bold text-purple-900">
                {stats.phdHolders}
              </p>
              <p className="text-xs text-purple-600">
                {Math.round((stats.phdHolders / stats.total) * 100)}% of faculty
              </p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Avg Experience
              </p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.avgExperience}
              </p>
              <p className="text-xs text-orange-600">Years of experience</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            Faculty Directory
          </CardTitle>
          <CardDescription>
            View and manage all faculty members and their academic assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty members..."
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
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
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
                <TableHead>Faculty Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((member) => (
                <TableRow key={member.faculty_id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.documents.photo} />
                        <AvatarFallback>
                          {member.personal_info.first_name[0]}
                          {member.personal_info.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {member.personal_info.full_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.qualification_info.highest_qualification}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {member.contact_info.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {member.contact_info.phone_number}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{member.specialization}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.designation}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{member.employment_type}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.experience_years} years exp.
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(member.joining_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.employment_status === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {member.employment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {/* Edit functionality can be added here */}}
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
                            <AlertDialogTitle>
                              Delete Faculty Member
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              {member.personal_info.full_name}? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(member.faculty_id)}
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
    </div>
  );
}
