import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  School,
  Building,
  MapPin,
  Users,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Eye,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowLeft,
  Save,
  X,
  Globe,
  Phone,
  Mail,
  MapIcon,
  Calendar,
  BookOpen,
  GraduationCap,
  Award,
  Home,
  Bus,
  CheckCircle,
} from "lucide-react";

interface Entity {
  id: string;
  name: string;
  code: string;
  slug: string;
  type:
    | "university"
    | "college"
    | "institute"
    | "department"
    | "location"
    | "level";
  parentId?: string;
  educationalAuthority: string;
  affiliation_number: string;
  recognized_by: string[];
  university_type: string;
  description: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  latitude?: string;
  longitude?: string;
  contact_person: string;
  designation: string;
  email: string;
  phone: string;
  alternate_phone?: string;
  website: string;
  capacity: number;
  established_year: number;
  num_departments: number;
  num_faculties: number;
  num_students: number;
  programs_offered: string[];
  accreditation: string;
  is_autonomous: boolean;
  is_verified: boolean;
  hostel_available: boolean;
  transport_available: boolean;
  digital_library_url?: string;
  learning_management_url?: string;
  placement_cell_contact?: string;
  alumni_association_url?: string;
  status: "active" | "inactive";
  created_date: string;
  created_at: string;
  updated_at: string;
  remarks?: string;
  logo_url?: string;
}

export default function EntitySetup() {
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: "INST1001",
      name: "Hindustan Institute of Technology and Science",
      code: "TN068",
      slug: "hindustan-institute-of-technology",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "AU/2023/TN/0488",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "A premier institute offering engineering, management, and applied sciences programs.",
      address_line1: "Rajiv Gandhi Salai",
      address_line2: "Padur, OMR",
      city: "Chennai",
      district: "Chengalpattu",
      state: "Tamil Nadu",
      country: "India",
      pincode: "603103",
      latitude: "12.789456",
      longitude: "80.229876",
      contact_person: "Dr. Santhosh Kumar",
      designation: "Principal",
      email: "info@hindustanuniv.ac.in",
      phone: "+919876543210",
      alternate_phone: "+914427412310",
      website: "https://www.hindustanuniv.ac.in",
      capacity: 12000,
      established_year: 1985,
      num_departments: 14,
      num_faculties: 400,
      num_students: 10000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://dl.hindustanuniv.ac.in",
      learning_management_url: "https://lms.hindustanuniv.ac.in",
      placement_cell_contact: "+919845667788",
      alumni_association_url: "https://alumni.hindustanuniv.ac.in",
      status: "active",
      created_date: "2023-01-15",
      created_at: "2023-01-15T09:20:00Z",
      updated_at: "2025-08-07T10:00:00Z",
      remarks: "Top-ranked private technical university in Tamil Nadu.",
      logo_url: "https://hindustanuniv.ac.in/logo.png",
    },
    {
      id: "INST1002",
      name: "Anna University",
      code: "TN001",
      slug: "anna-university",
      type: "university",
      parentId: undefined,
      educationalAuthority: "Government of Tamil Nadu",
      affiliation_number: "GOV/2020/TN/0001",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "State University",
      description:
        "Premier technical university in Tamil Nadu offering engineering and technology programs.",
      address_line1: "Sardar Patel Road",
      address_line2: "Guindy",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600025",
      latitude: "13.0087",
      longitude: "80.2707",
      contact_person: "Dr. R. Velraj",
      designation: "Vice Chancellor",
      email: "registrar@annauniv.edu",
      phone: "+914422357070",
      alternate_phone: "+914422357080",
      website: "https://www.annauniv.edu",
      capacity: 25000,
      established_year: 1978,
      num_departments: 32,
      num_faculties: 850,
      num_students: 22000,
      programs_offered: ["UG", "PG", "PhD", "M.Tech"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.annauniv.edu",
      learning_management_url: "https://lms.annauniv.edu",
      placement_cell_contact: "+914422357090",
      alumni_association_url: "https://alumni.annauniv.edu",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks:
        "Leading technical university with excellent research facilities.",
      logo_url: "https://annauniv.edu/logo.png",
    },
    {
      id: "INST1003",
      name: "Indian Institute of Technology Madras",
      code: "TN002",
      slug: "iit-madras",
      type: "institute",
      parentId: undefined,
      educationalAuthority: "MHRD",
      affiliation_number: "IIT/2019/TN/0001",
      recognized_by: ["MHRD", "UGC", "AICTE"],
      university_type: "Institute of National Importance",
      description:
        "Premier technological institute offering world-class education in engineering and technology.",
      address_line1: "IIT Madras Campus",
      address_line2: "Sardar Patel Road",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600036",
      latitude: "12.9918",
      longitude: "80.2336",
      contact_person: "Prof. V. Kamakoti",
      designation: "Director",
      email: "director@iitm.ac.in",
      phone: "+914422578000",
      alternate_phone: "+914422578001",
      website: "https://www.iitm.ac.in",
      capacity: 15000,
      established_year: 1959,
      num_departments: 24,
      num_faculties: 550,
      num_students: 12000,
      programs_offered: ["UG", "PG", "PhD", "M.Tech", "MS"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.iitm.ac.in",
      learning_management_url: "https://courses.iitm.ac.in",
      placement_cell_contact: "+914422578100",
      alumni_association_url: "https://alumni.iitm.ac.in",
      status: "active",
      created_date: "2019-01-01",
      created_at: "2019-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Top-ranked IIT with excellent research and innovation.",
      logo_url: "https://iitm.ac.in/logo.png",
    },
    {
      id: "INST1004",
      name: "PSG College of Technology",
      code: "TN003",
      slug: "psg-college-technology",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2021/TN/0089",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Leading engineering college with excellent industry connections and placement records.",
      address_line1: "Avinashi Road",
      address_line2: "Peelamedu",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641004",
      latitude: "11.0168",
      longitude: "76.9558",
      contact_person: "Dr. R. Rudramoorthy",
      designation: "Principal",
      email: "principal@psgtech.edu",
      phone: "+914224572177",
      alternate_phone: "+914224572178",
      website: "https://www.psgtech.edu",
      capacity: 8000,
      established_year: 1951,
      num_departments: 18,
      num_faculties: 420,
      num_students: 7500,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.psgtech.edu",
      learning_management_url: "https://lms.psgtech.edu",
      placement_cell_contact: "+914224572185",
      alumni_association_url: "https://alumni.psgtech.edu",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Excellent placement record with top MNCs.",
      logo_url: "https://psgtech.edu/logo.png",
    },
    {
      id: "INST1005",
      name: "SSN College of Engineering",
      code: "TN004",
      slug: "ssn-college-engineering",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2020/TN/0156",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Premier engineering college with strong research focus and industry partnerships.",
      address_line1: "Old Mahabalipuram Road",
      address_line2: "Kalavakkam",
      city: "Chennai",
      district: "Chengalpattu",
      state: "Tamil Nadu",
      country: "India",
      pincode: "603110",
      latitude: "12.7550",
      longitude: "80.1932",
      contact_person: "Dr. Sangeetha Jamal",
      designation: "Principal",
      email: "principal@ssn.edu.in",
      phone: "+914427474555",
      alternate_phone: "+914427474556",
      website: "https://www.ssn.edu.in",
      capacity: 6000,
      established_year: 1996,
      num_departments: 12,
      num_faculties: 380,
      num_students: 5500,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.ssn.edu.in",
      learning_management_url: "https://lms.ssn.edu.in",
      placement_cell_contact: "+914427474570",
      alumni_association_url: "https://alumni.ssn.edu.in",
      status: "active",
      created_date: "2020-06-01",
      created_at: "2020-06-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Known for quality education and strong alumni network.",
      logo_url: "https://ssn.edu.in/logo.png",
    },
    {
      id: "INST1006",
      name: "Vellore Institute of Technology",
      code: "TN005",
      slug: "vit-vellore",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2022/TN/0234",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Leading private university with global outlook and diverse student community.",
      address_line1: "Katpadi",
      address_line2: "Vellore",
      city: "Vellore",
      district: "Vellore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "632014",
      latitude: "12.9692",
      longitude: "79.1559",
      contact_person: "Dr. Sekar Viswanathan",
      designation: "Vice President",
      email: "admissions@vit.ac.in",
      phone: "+914162202020",
      alternate_phone: "+914162202021",
      website: "https://vit.ac.in",
      capacity: 45000,
      established_year: 1984,
      num_departments: 28,
      num_faculties: 1200,
      num_students: 42000,
      programs_offered: ["UG", "PG", "PhD", "Integrated"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.vit.ac.in",
      learning_management_url: "https://vtop.vit.ac.in",
      placement_cell_contact: "+914162202030",
      alumni_association_url: "https://alumni.vit.ac.in",
      status: "active",
      created_date: "2022-01-01",
      created_at: "2022-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "International university with students from 60+ countries.",
      logo_url: "https://vit.ac.in/logo.png",
    },
    {
      id: "INST1007",
      name: "SRM Institute of Science and Technology",
      code: "TN006",
      slug: "srm-institute",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2021/TN/0445",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Multi-disciplinary university offering programs in engineering, medicine, and management.",
      address_line1: "SRM Nagar",
      address_line2: "Kattankulathur",
      city: "Chennai",
      district: "Chengalpattu",
      state: "Tamil Nadu",
      country: "India",
      pincode: "603203",
      latitude: "12.8230",
      longitude: "80.0437",
      contact_person: "Dr. C. Muthamizhchelvan",
      designation: "Pro-Vice Chancellor",
      email: "registrar@srmist.edu.in",
      phone: "+914427417000",
      alternate_phone: "+914427417001",
      website: "https://www.srmist.edu.in",
      capacity: 50000,
      established_year: 1985,
      num_departments: 35,
      num_faculties: 1500,
      num_students: 48000,
      programs_offered: ["UG", "PG", "PhD", "Medical", "Dental"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.srmist.edu.in",
      learning_management_url: "https://lms.srmist.edu.in",
      placement_cell_contact: "+914427417010",
      alumni_association_url: "https://alumni.srmist.edu.in",
      status: "active",
      created_date: "2021-03-01",
      created_at: "2021-03-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks:
        "Comprehensive university with medical and engineering programs.",
      logo_url: "https://srmist.edu.in/logo.png",
    },
    {
      id: "INST1008",
      name: "National Institute of Technology Tiruchirappalli",
      code: "TN007",
      slug: "nit-trichy",
      type: "institute",
      parentId: undefined,
      educationalAuthority: "MHRD",
      affiliation_number: "NIT/2019/TN/0008",
      recognized_by: ["MHRD", "UGC", "AICTE"],
      university_type: "Institute of National Importance",
      description:
        "Premier technical institute known for excellence in engineering education and research.",
      address_line1: "Tanjore Main Road",
      address_line2: "National Highway 67",
      city: "Tiruchirappalli",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      country: "India",
      pincode: "620015",
      latitude: "10.7590",
      longitude: "78.8147",
      contact_person: "Prof. Mini Shaji Thomas",
      designation: "Director",
      email: "director@nitt.edu",
      phone: "+914312503000",
      alternate_phone: "+914312503001",
      website: "https://www.nitt.edu",
      capacity: 8000,
      established_year: 1964,
      num_departments: 18,
      num_faculties: 320,
      num_students: 7200,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.nitt.edu",
      learning_management_url: "https://lms.nitt.edu",
      placement_cell_contact: "+914312503020",
      alumni_association_url: "https://alumni.nitt.edu",
      status: "active",
      created_date: "2019-01-01",
      created_at: "2019-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Top NIT with excellent placement records and research output.",
      logo_url: "https://nitt.edu/logo.png",
    },
    {
      id: "INST1009",
      name: "Thiagarajar College of Engineering",
      code: "TN008",
      slug: "tce-madurai",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2020/TN/0245",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Prestigious engineering college with strong emphasis on academic excellence and research.",
      address_line1: "Thiruparankundram",
      address_line2: "Madurai",
      city: "Madurai",
      district: "Madurai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "625015",
      latitude: "9.8774",
      longitude: "78.0820",
      contact_person: "Dr. K. Ramamoorthy",
      designation: "Principal",
      email: "principal@tce.edu",
      phone: "+914522482240",
      alternate_phone: "+914522482241",
      website: "https://www.tce.edu",
      capacity: 4500,
      established_year: 1957,
      num_departments: 14,
      num_faculties: 280,
      num_students: 4200,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.tce.edu",
      learning_management_url: "https://lms.tce.edu",
      placement_cell_contact: "+914522482250",
      alumni_association_url: "https://alumni.tce.edu",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Known for strong industry partnerships and quality education.",
      logo_url: "https://tce.edu/logo.png",
    },
    {
      id: "INST1010",
      name: "Coimbatore Institute of Technology",
      code: "TN009",
      slug: "cit-coimbatore",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2021/TN/0156",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Leading engineering college with modern infrastructure and innovative teaching methods.",
      address_line1: "CIT Campus",
      address_line2: "Kuniyamuthur",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641008",
      latitude: "10.9255",
      longitude: "76.9366",
      contact_person: "Dr. V. Sundaram",
      designation: "Principal",
      email: "principal@cit.edu.in",
      phone: "+914224381400",
      alternate_phone: "+914224381401",
      website: "https://www.citchennai.net",
      capacity: 6000,
      established_year: 1956,
      num_departments: 16,
      num_faculties: 350,
      num_students: 5800,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.citchennai.net",
      learning_management_url: "https://lms.citchennai.net",
      placement_cell_contact: "+914224381410",
      alumni_association_url: "https://alumni.citchennai.net",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong focus on practical learning and industry exposure.",
      logo_url: "https://citchennai.net/logo.png",
    },
    {
      id: "INST1011",
      name: "Kumaraguru College of Technology",
      code: "TN010",
      slug: "kct-coimbatore",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2022/TN/0178",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Innovative engineering college with emphasis on technology and entrepreneurship.",
      address_line1: "Chinnavedampatti",
      address_line2: "Sarkar Samakulam Road",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641049",
      latitude: "11.0481",
      longitude: "76.8997",
      contact_person: "Dr. V. Kathiravan",
      designation: "Principal",
      email: "principal@kct.ac.in",
      phone: "+914224051000",
      alternate_phone: "+914224051001",
      website: "https://www.kct.ac.in",
      capacity: 5500,
      established_year: 1984,
      num_departments: 15,
      num_faculties: 320,
      num_students: 5200,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.kct.ac.in",
      learning_management_url: "https://lms.kct.ac.in",
      placement_cell_contact: "+914224051020",
      alumni_association_url: "https://alumni.kct.ac.in",
      status: "active",
      created_date: "2022-01-01",
      created_at: "2022-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Known for entrepreneurship development and innovation.",
      logo_url: "https://kct.ac.in/logo.png",
    },
    {
      id: "INST1012",
      name: "Velammal Engineering College",
      code: "TN011",
      slug: "vec-chennai",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2020/TN/0299",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Premier engineering college with state-of-the-art facilities and experienced faculty.",
      address_line1: "Ambattur Red Hills Road",
      address_line2: "Surapet",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600066",
      latitude: "13.1354",
      longitude: "80.1550",
      contact_person: "Dr. A. Murugan",
      designation: "Principal",
      email: "principal@velammal.edu.in",
      phone: "+914426551333",
      alternate_phone: "+914426551334",
      website: "https://www.velammal.edu.in",
      capacity: 4800,
      established_year: 1995,
      num_departments: 13,
      num_faculties: 290,
      num_students: 4500,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.velammal.edu.in",
      learning_management_url: "https://lms.velammal.edu.in",
      placement_cell_contact: "+914426551340",
      alumni_association_url: "https://alumni.velammal.edu.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Focus on holistic development and industry readiness.",
      logo_url: "https://velammal.edu.in/logo.png",
    },
    {
      id: "INST1013",
      name: "Rajalakshmi Engineering College",
      code: "TN012",
      slug: "rec-chennai",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2021/TN/0234",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Quality engineering education with emphasis on research and innovation.",
      address_line1: "Rajalakshmi Nagar",
      address_line2: "Thandalam",
      city: "Chennai",
      district: "Kanchipuram",
      state: "Tamil Nadu",
      country: "India",
      pincode: "602105",
      latitude: "13.0370",
      longitude: "79.9956",
      contact_person: "Dr. S. Salivahanan",
      designation: "Principal",
      email: "principal@rajalakshmi.edu.in",
      phone: "+914426553344",
      alternate_phone: "+914426553345",
      website: "https://www.rajalakshmi.edu.in",
      capacity: 6200,
      established_year: 1997,
      num_departments: 17,
      num_faculties: 380,
      num_students: 5900,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.rajalakshmi.edu.in",
      learning_management_url: "https://lms.rajalakshmi.edu.in",
      placement_cell_contact: "+914426553350",
      alumni_association_url: "https://alumni.rajalakshmi.edu.in",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong research culture and industry collaborations.",
      logo_url: "https://rajalakshmi.edu.in/logo.png",
    },
    {
      id: "INST1014",
      name: "Panimalar Engineering College",
      code: "TN013",
      slug: "pec-chennai",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2020/TN/0187",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Engineering college committed to academic excellence and character development.",
      address_line1: "Bangalore Trunk Road",
      address_line2: "Varadharajapuram",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600123",
      latitude: "12.9646",
      longitude: "79.9724",
      contact_person: "Dr. M. Premkumar",
      designation: "Principal",
      email: "principal@panimalar.ac.in",
      phone: "+914426948095",
      alternate_phone: "+914426948096",
      website: "https://www.panimalar.ac.in",
      capacity: 4000,
      established_year: 2000,
      num_departments: 12,
      num_faculties: 250,
      num_students: 3800,
      programs_offered: ["UG", "PG"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.panimalar.ac.in",
      learning_management_url: "https://lms.panimalar.ac.in",
      placement_cell_contact: "+914426948100",
      alumni_association_url: "https://alumni.panimalar.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Focus on value-based education and skill development.",
      logo_url: "https://panimalar.ac.in/logo.png",
    },
    {
      id: "INST1015",
      name: "St. Joseph's College of Engineering",
      code: "TN014",
      slug: "sjce-chennai",
      type: "college",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2021/TN/0298",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous College",
      description:
        "Catholic minority institution providing quality technical education with moral values.",
      address_line1: "Old Mahabalipuram Road",
      address_line2: "Sholinganallur",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600119",
      latitude: "12.9008",
      longitude: "80.2267",
      contact_person: "Dr. A. Joseph Dorairaj",
      designation: "Principal",
      email: "principal@stjosephs.ac.in",
      phone: "+914424501210",
      alternate_phone: "+914424501211",
      website: "https://www.stjosephs.ac.in",
      capacity: 3600,
      established_year: 1996,
      num_departments: 11,
      num_faculties: 220,
      num_students: 3400,
      programs_offered: ["UG", "PG"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.stjosephs.ac.in",
      learning_management_url: "https://lms.stjosephs.ac.in",
      placement_cell_contact: "+914424501220",
      alumni_association_url: "https://alumni.stjosephs.ac.in",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Emphasis on ethical values and social responsibility.",
      logo_url: "https://stjosephs.ac.in/logo.png",
    },
    {
      id: "INST1016",
      name: "Loyola Institute of Technology",
      code: "TN015",
      slug: "lit-chennai",
      type: "institute",
      parentId: undefined,
      educationalAuthority: "AICTE",
      affiliation_number: "AICTE/2022/TN/0145",
      recognized_by: ["AICTE", "UGC", "NAAC"],
      university_type: "Autonomous Institute",
      description:
        "Jesuit institution committed to excellence in technical education and human formation.",
      address_line1: "Loyola Campus",
      address_line2: "Nungambakkam",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600034",
      latitude: "13.0732",
      longitude: "80.2609",
      contact_person: "Dr. A. Antonysamy",
      designation: "Director",
      email: "director@loyolait.ac.in",
      phone: "+914428175500",
      alternate_phone: "+914428175501",
      website: "https://www.loyolait.ac.in",
      capacity: 2800,
      established_year: 2001,
      num_departments: 8,
      num_faculties: 180,
      num_students: 2600,
      programs_offered: ["UG", "PG"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: false,
      transport_available: true,
      digital_library_url: "https://library.loyolait.ac.in",
      learning_management_url: "https://lms.loyolait.ac.in",
      placement_cell_contact: "+914428175510",
      alumni_association_url: "https://alumni.loyolait.ac.in",
      status: "active",
      created_date: "2022-01-01",
      created_at: "2022-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Focus on holistic development and social justice.",
      logo_url: "https://loyolait.ac.in/logo.png",
    },
    {
      id: "INST1017",
      name: "Madras Institute of Technology",
      code: "TN016",
      slug: "mit-chennai",
      type: "institute",
      parentId: "INST1002",
      educationalAuthority: "Government of Tamil Nadu",
      affiliation_number: "MIT/2020/TN/0001",
      recognized_by: ["Government of Tamil Nadu", "AICTE"],
      university_type: "Government Institute",
      description:
        "Constituent college of Anna University specializing in aerospace and automotive engineering.",
      address_line1: "MIT Campus",
      address_line2: "Chromepet",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600044",
      latitude: "12.9516",
      longitude: "80.1462",
      contact_person: "Dr. G. Raman",
      designation: "Dean",
      email: "dean@mitindia.edu",
      phone: "+914422201583",
      alternate_phone: "+914422201584",
      website: "https://www.mitindia.edu",
      capacity: 3200,
      established_year: 1949,
      num_departments: 9,
      num_faculties: 200,
      num_students: 3000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: false,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.mitindia.edu",
      learning_management_url: "https://lms.mitindia.edu",
      placement_cell_contact: "+914422201590",
      alumni_association_url: "https://alumni.mitindia.edu",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Premier institute for aerospace and automotive engineering.",
      logo_url: "https://mitindia.edu/logo.png",
    },
    {
      id: "INST1018",
      name: "College of Engineering Guindy",
      code: "TN017",
      slug: "ceg-chennai",
      type: "college",
      parentId: "INST1002",
      educationalAuthority: "Government of Tamil Nadu",
      affiliation_number: "CEG/2020/TN/0001",
      recognized_by: ["Government of Tamil Nadu", "AICTE"],
      university_type: "Government College",
      description:
        "Oldest technical institution in India and constituent college of Anna University.",
      address_line1: "Sardar Patel Road",
      address_line2: "Guindy",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600025",
      latitude: "13.0067",
      longitude: "80.2206",
      contact_person: "Dr. P. Narayanasamy",
      designation: "Dean",
      email: "dean@ceg.ac.in",
      phone: "+914422203086",
      alternate_phone: "+914422203087",
      website: "https://www.ceg.ac.in",
      capacity: 4000,
      established_year: 1794,
      num_departments: 15,
      num_faculties: 280,
      num_students: 3800,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A++",
      is_autonomous: false,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.ceg.ac.in",
      learning_management_url: "https://lms.ceg.ac.in",
      placement_cell_contact: "+914422203090",
      alumni_association_url: "https://alumni.ceg.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks:
        "Historic institution with rich legacy and excellent alumni network.",
      logo_url: "https://ceg.ac.in/logo.png",
    },
    {
      id: "INST1019",
      name: "Alagappa College of Technology",
      code: "TN018",
      slug: "act-chennai",
      type: "college",
      parentId: "INST1002",
      educationalAuthority: "Government of Tamil Nadu",
      affiliation_number: "ACT/2020/TN/0001",
      recognized_by: ["Government of Tamil Nadu", "AICTE"],
      university_type: "Government College",
      description:
        "Constituent college of Anna University offering diverse engineering programs.",
      address_line1: "Sardar Patel Road",
      address_line2: "Guindy",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600025",
      latitude: "13.0087",
      longitude: "80.2707",
      contact_person: "Dr. S. Kumaran",
      designation: "Dean",
      email: "dean@act.ac.in",
      phone: "+914422203100",
      alternate_phone: "+914422203101",
      website: "https://www.act.ac.in",
      capacity: 2400,
      established_year: 1944,
      num_departments: 8,
      num_faculties: 150,
      num_students: 2200,
      programs_offered: ["UG", "PG"],
      accreditation: "NAAC A+",
      is_autonomous: false,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.act.ac.in",
      learning_management_url: "https://lms.act.ac.in",
      placement_cell_contact: "+914422203110",
      alumni_association_url: "https://alumni.act.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong foundation in core engineering disciplines.",
      logo_url: "https://act.ac.in/logo.png",
    },
    {
      id: "INST1020",
      name: "Kalasalingam Academy of Research and Education",
      code: "TN019",
      slug: "kare-srivilliputtur",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2021/TN/0567",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Research-intensive university with focus on innovation and technology transfer.",
      address_line1: "Anand Nagar",
      address_line2: "Krishnankoil",
      city: "Srivilliputtur",
      district: "Virudhunagar",
      state: "Tamil Nadu",
      country: "India",
      pincode: "626126",
      latitude: "9.2061",
      longitude: "77.6943",
      contact_person: "Dr. S. Saravanan",
      designation: "Vice Chancellor",
      email: "vc@klu.ac.in",
      phone: "+914563289000",
      alternate_phone: "+914563289001",
      website: "https://www.klu.ac.in",
      capacity: 12000,
      established_year: 1984,
      num_departments: 20,
      num_faculties: 480,
      num_students: 11000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.klu.ac.in",
      learning_management_url: "https://lms.klu.ac.in",
      placement_cell_contact: "+914563289020",
      alumni_association_url: "https://alumni.klu.ac.in",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong research culture with industry partnerships.",
      logo_url: "https://klu.ac.in/logo.png",
    },
    {
      id: "INST1021",
      name: "Amrita Vishwa Vidyapeetham",
      code: "TN020",
      slug: "amrita-coimbatore",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2020/TN/0789",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Multi-campus university with focus on spiritual values and modern education.",
      address_line1: "Amrita Nagar",
      address_line2: "Ettimadai",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641112",
      latitude: "10.9027",
      longitude: "76.8997",
      contact_person: "Dr. P. Venkat Rangan",
      designation: "Vice Chancellor",
      email: "vc@amrita.edu",
      phone: "+914222685000",
      alternate_phone: "+914222685001",
      website: "https://www.amrita.edu",
      capacity: 18000,
      established_year: 2003,
      num_departments: 25,
      num_faculties: 750,
      num_students: 16500,
      programs_offered: ["UG", "PG", "PhD", "Medical"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.amrita.edu",
      learning_management_url: "https://lms.amrita.edu",
      placement_cell_contact: "+914222685020",
      alumni_association_url: "https://alumni.amrita.edu",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Integration of spiritual values with modern technology.",
      logo_url: "https://amrita.edu/logo.png",
    },
    {
      id: "INST1022",
      name: "Karunya Institute of Technology and Sciences",
      code: "TN021",
      slug: "karunya-coimbatore",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2021/TN/0445",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Christian minority institution committed to excellence in technical education.",
      address_line1: "Karunya Nagar",
      address_line2: "Coimbatore",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641114",
      latitude: "10.9364",
      longitude: "76.7360",
      contact_person: "Dr. Paul Dhinakaran",
      designation: "Chancellor",
      email: "chancellor@karunya.edu",
      phone: "+914262615000",
      alternate_phone: "+914262615001",
      website: "https://www.karunya.edu",
      capacity: 14000,
      established_year: 1986,
      num_departments: 22,
      num_faculties: 580,
      num_students: 13000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.karunya.edu",
      learning_management_url: "https://lms.karunya.edu",
      placement_cell_contact: "+914262615020",
      alumni_association_url: "https://alumni.karunya.edu",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Focus on character building and technical excellence.",
      logo_url: "https://karunya.edu/logo.png",
    },
    {
      id: "INST1023",
      name: "Government College of Technology",
      code: "TN022",
      slug: "gct-coimbatore",
      type: "college",
      parentId: undefined,
      educationalAuthority: "Government of Tamil Nadu",
      affiliation_number: "GCT/2020/TN/0001",
      recognized_by: ["Government of Tamil Nadu", "AICTE"],
      university_type: "Government College",
      description:
        "Premier government engineering college with excellent academic record.",
      address_line1: "Thadagam Road",
      address_line2: "Coimbatore",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641013",
      latitude: "11.0034",
      longitude: "76.9662",
      contact_person: "Dr. K. Prakasan",
      designation: "Principal",
      email: "principal@gct.ac.in",
      phone: "+914222574000",
      alternate_phone: "+914222574001",
      website: "https://www.gct.ac.in",
      capacity: 3600,
      established_year: 1945,
      num_departments: 12,
      num_faculties: 220,
      num_students: 3400,
      programs_offered: ["UG", "PG"],
      accreditation: "NAAC A+",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.gct.ac.in",
      learning_management_url: "https://lms.gct.ac.in",
      placement_cell_contact: "+914222574010",
      alumni_association_url: "https://alumni.gct.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Historic government college with strong alumni network.",
      logo_url: "https://gct.ac.in/logo.png",
    },
    {
      id: "INST1024",
      name: "SASTRA Deemed University",
      code: "TN023",
      slug: "sastra-thanjavur",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2019/TN/0234",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Multi-disciplinary university with strong emphasis on research and innovation.",
      address_line1: "Thirumalaisamudram",
      address_line2: "Thanjavur",
      city: "Thanjavur",
      district: "Thanjavur",
      state: "Tamil Nadu",
      country: "India",
      pincode: "613401",
      latitude: "10.7570",
      longitude: "79.0747",
      contact_person: "Dr. S. Vaidhyasubramaniam",
      designation: "Vice Chancellor",
      email: "vc@sastra.edu",
      phone: "+914362264101",
      alternate_phone: "+914362264102",
      website: "https://www.sastra.edu",
      capacity: 15000,
      established_year: 1984,
      num_departments: 28,
      num_faculties: 620,
      num_students: 14000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.sastra.edu",
      learning_management_url: "https://lms.sastra.edu",
      placement_cell_contact: "+914362264120",
      alumni_association_url: "https://alumni.sastra.edu",
      status: "active",
      created_date: "2019-01-01",
      created_at: "2019-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Excellence in academics with strong industry connections.",
      logo_url: "https://sastra.edu/logo.png",
    },
    {
      id: "INST1025",
      name: "Bharath Institute of Higher Education and Research",
      code: "TN024",
      slug: "biher-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2020/TN/0567",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Multi-disciplinary university offering diverse programs in engineering and sciences.",
      address_line1: "Selaiyur",
      address_line2: "Chennai",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600073",
      latitude: "12.8856",
      longitude: "80.2106",
      contact_person: "Dr. S. Sriram",
      designation: "Vice Chancellor",
      email: "vc@bharathuniv.ac.in",
      phone: "+914422743999",
      alternate_phone: "+914422744000",
      website: "https://www.bharathuniv.ac.in",
      capacity: 20000,
      established_year: 1984,
      num_departments: 30,
      num_faculties: 800,
      num_students: 18500,
      programs_offered: ["UG", "PG", "PhD", "Medical", "Dental"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.bharathuniv.ac.in",
      learning_management_url: "https://lms.bharathuniv.ac.in",
      placement_cell_contact: "+914422744020",
      alumni_association_url: "https://alumni.bharathuniv.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks:
        "Comprehensive university with medical and engineering programs.",
      logo_url: "https://bharathuniv.ac.in/logo.png",
    },
    {
      id: "INST1026",
      name: "Sathyabama Institute of Science and Technology",
      code: "TN025",
      slug: "sathyabama-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2021/TN/0389",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Technology-focused university with emphasis on research and innovation.",
      address_line1: "Jeppiaar Nagar",
      address_line2: "Rajiv Gandhi Salai",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600119",
      latitude: "12.8530",
      longitude: "80.2197",
      contact_person: "Dr. Marie Josephine Aruna",
      designation: "Vice Chancellor",
      email: "vc@sathyabama.ac.in",
      phone: "+914424503070",
      alternate_phone: "+914424503071",
      website: "https://www.sathyabama.ac.in",
      capacity: 16000,
      established_year: 1987,
      num_departments: 26,
      num_faculties: 650,
      num_students: 15000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.sathyabama.ac.in",
      learning_management_url: "https://lms.sathyabama.ac.in",
      placement_cell_contact: "+914424503080",
      alumni_association_url: "https://alumni.sathyabama.ac.in",
      status: "active",
      created_date: "2021-01-01",
      created_at: "2021-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong focus on technology and innovation.",
      logo_url: "https://sathyabama.ac.in/logo.png",
    },
    {
      id: "INST1027",
      name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute",
      code: "TN026",
      slug: "veltech-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2020/TN/0445",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Research and development focused university with industry partnerships.",
      address_line1: "Vel Tech Road",
      address_line2: "Avadi",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600062",
      latitude: "13.1194",
      longitude: "80.1106",
      contact_person: "Dr. R. Rangarajan",
      designation: "Chancellor",
      email: "chancellor@veltech.edu.in",
      phone: "+914426243275",
      alternate_phone: "+914426243276",
      website: "https://www.veltech.edu.in",
      capacity: 12000,
      established_year: 1997,
      num_departments: 24,
      num_faculties: 520,
      num_students: 11000,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.veltech.edu.in",
      learning_management_url: "https://lms.veltech.edu.in",
      placement_cell_contact: "+914426243285",
      alumni_association_url: "https://alumni.veltech.edu.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Strong R&D culture with industry collaborations.",
      logo_url: "https://veltech.edu.in/logo.png",
    },
    {
      id: "INST1028",
      name: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
      code: "TN027",
      slug: "crescent-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2019/TN/0567",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Islamic minority institution providing quality technical education.",
      address_line1: "GST Road",
      address_line2: "Vandalur",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600048",
      latitude: "12.8790",
      longitude: "80.0806",
      contact_person: "Dr. A. Mohamed Mansoor Roomi",
      designation: "Vice Chancellor",
      email: "vc@crescent.education",
      phone: "+914422651000",
      alternate_phone: "+914422651001",
      website: "https://www.crescent.education",
      capacity: 8000,
      established_year: 1984,
      num_departments: 18,
      num_faculties: 380,
      num_students: 7500,
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.crescent.education",
      learning_management_url: "https://lms.crescent.education",
      placement_cell_contact: "+914422651020",
      alumni_association_url: "https://alumni.crescent.education",
      status: "active",
      created_date: "2019-01-01",
      created_at: "2019-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Islamic values integrated with modern education.",
      logo_url: "https://crescent.education/logo.png",
    },
    {
      id: "INST1029",
      name: "SRM University",
      code: "TN028",
      slug: "srmu-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2022/TN/0234",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Private University",
      description:
        "Multi-campus university with global partnerships and research focus.",
      address_line1: "SRM Nagar",
      address_line2: "Kattankulathur",
      city: "Chennai",
      district: "Chengalpattu",
      state: "Tamil Nadu",
      country: "India",
      pincode: "603203",
      latitude: "12.8230",
      longitude: "80.0437",
      contact_person: "Dr. Sandeep Sancheti",
      designation: "Vice Chancellor",
      email: "vc@srmuniv.ac.in",
      phone: "+914427417100",
      alternate_phone: "+914427417101",
      website: "https://www.srmuniv.ac.in",
      capacity: 60000,
      established_year: 2002,
      num_departments: 40,
      num_faculties: 2000,
      num_students: 55000,
      programs_offered: ["UG", "PG", "PhD", "Medical", "Law"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.srmuniv.ac.in",
      learning_management_url: "https://lms.srmuniv.ac.in",
      placement_cell_contact: "+914427417120",
      alumni_association_url: "https://alumni.srmuniv.ac.in",
      status: "active",
      created_date: "2022-01-01",
      created_at: "2022-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Large-scale university with diverse programs and global reach.",
      logo_url: "https://srmuniv.ac.in/logo.png",
    },
    {
      id: "INST1030",
      name: "Dr. M.G.R. Educational and Research Institute",
      code: "TN029",
      slug: "mgr-chennai",
      type: "university",
      parentId: undefined,
      educationalAuthority: "UGC",
      affiliation_number: "UGC/2020/TN/0789",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Deemed University",
      description:
        "Comprehensive university offering programs in engineering, medicine, and management.",
      address_line1: "Maduravoyal",
      address_line2: "Chennai",
      city: "Chennai",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600095",
      latitude: "13.0482",
      longitude: "80.1335",
      contact_person: "Dr. A.C. Shanmugam",
      designation: "Vice Chancellor",
      email: "vc@drmgrdu.ac.in",
      phone: "+914423789000",
      alternate_phone: "+914423789001",
      website: "https://www.drmgrdu.ac.in",
      capacity: 25000,
      established_year: 1988,
      num_departments: 32,
      num_faculties: 950,
      num_students: 23000,
      programs_offered: ["UG", "PG", "PhD", "Medical", "Dental"],
      accreditation: "NAAC A",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.drmgrdu.ac.in",
      learning_management_url: "https://lms.drmgrdu.ac.in",
      placement_cell_contact: "+914423789020",
      alumni_association_url: "https://alumni.drmgrdu.ac.in",
      status: "active",
      created_date: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2025-01-15T12:00:00Z",
      remarks: "Multi-faculty university with strong healthcare programs.",
      logo_url: "https://drmgrdu.ac.in/logo.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  // Removed isCreateDialogOpen state as we're using page navigation now
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "view" | "edit" | "create">(
    "list",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntity, setEditedEntity] = useState<Entity | null>(null);
  const [entityToDelete, setEntityToDelete] = useState<Entity | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filterEducationalAuthority, setFilterEducationalAuthority] =
    useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [newEntity, setNewEntity] = useState({
    name: "PSG College of Technology",
    code: "TN201",
    slug: "psg-college-of-technology",
    type: "institution",
    parentId: "none",
    description:
      "One of the premier engineering institutions affiliated with Anna University.",
    educationalAuthority: "Anna University",
    affiliation_number: "AU/2023/TN/1234",
    recognized_by: ["UGC", "AICTE", "NAAC"] as string[],
    university_type: "Autonomous",
    address_line1: "Avinashi Road",
    address_line2: "Peelamedu",
    city: "Coimbatore",
    district: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    pincode: "641004",
    latitude: "11.029453",
    longitude: "77.000984",
    contact_person: "Dr. R. Venkatesan",
    designation: "Principal",
    email: "info@psgtech.ac.in",
    phone: "+919876543210",
    alternate_phone: "+914222572177",
    website: "https://www.psgtech.edu",
    capacity: "9000",
    established_year: "1951",
    num_departments: "25",
    num_faculties: "600",
    num_students: "8500",
    programs_offered: ["UG", "PG", "PhD"] as string[],
    accreditation: "NAAC A++",
    is_autonomous: true,
    is_verified: true,
    hostel_available: true,
    transport_available: true,
    digital_library_url: "https://library.psgtech.edu",
    learning_management_url: "https://lms.psgtech.edu",
    placement_cell_contact: "+919843210987",
    alumni_association_url: "https://alumni.psgtech.edu",
    remarks: "Well known for producing top-tier engineers in Tamil Nadu.",
    logo_url: "https://psgtech.edu/logo.png",
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "university":
        return <School className="h-4 w-4" />;
      case "college":
        return <Building className="h-4 w-4" />;
      case "institute":
        return <Building className="h-4 w-4" />;
      case "department":
        return <Building className="h-4 w-4" />;
      case "location":
        return <MapPin className="h-4 w-4" />;
      case "level":
        return <Users className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "university":
        return "bg-blue-100 text-blue-800";
      case "college":
        return "bg-green-100 text-green-800";
      case "institute":
        return "bg-purple-100 text-purple-800";
      case "department":
        return "bg-yellow-100 text-yellow-800";
      case "location":
        return "bg-pink-100 text-pink-800";
      case "level":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const filteredEntities = entities.filter((entity) => {
    const matchesSearch =
      entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || entity.type === filterType;
    const matchesStatus =
      filterStatus === "all" || entity.status === filterStatus;
    const matchesEducationalAuthority =
      filterEducationalAuthority === "all" ||
      entity.educationalAuthority === filterEducationalAuthority;
    const matchesTab = activeTab === "all" || entity.type === activeTab;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesEducationalAuthority &&
      matchesTab
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntities = filteredEntities.slice(startIndex, endIndex);

  // Update total items when filtered entities change
  React.useEffect(() => {
    setTotalItems(filteredEntities.length);
    if (
      currentPage > Math.ceil(filteredEntities.length / itemsPerPage) &&
      filteredEntities.length > 0
    ) {
      setCurrentPage(1);
    }
  }, [filteredEntities.length, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2),
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const stats = {
    universities: entities.filter((e) => e.type === "university").length,
    colleges: entities.filter((e) => e.type === "college").length,
    institutes: entities.filter((e) => e.type === "institute").length,
    active: entities.filter((e) => e.status === "active").length,
    total: entities.length,
  };

  const handleCreateEntity = () => {
    const entity: Entity = {
      id: `INST${Date.now()}`,
      ...newEntity,
      parentId: newEntity.parentId === "none" ? undefined : newEntity.parentId,
      capacity: newEntity.capacity ? parseInt(newEntity.capacity) : 0,
      established_year: newEntity.established_year
        ? parseInt(newEntity.established_year)
        : new Date().getFullYear(),
      num_departments: newEntity.num_departments
        ? parseInt(newEntity.num_departments)
        : 0,
      num_faculties: newEntity.num_faculties
        ? parseInt(newEntity.num_faculties)
        : 0,
      num_students: newEntity.num_students
        ? parseInt(newEntity.num_students)
        : 0,
      status: "active",
      created_date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setEntities([...entities, entity]);
    resetNewEntity();
    setViewMode("list");
  };

  const resetNewEntity = () => {
    setNewEntity({
      name: "PSG College of Technology",
      code: "TN201",
      slug: "psg-college-of-technology",
      type: "institution",
      parentId: "none",
      description:
        "One of the premier engineering institutions affiliated with Anna University.",
      educationalAuthority: "Anna University",
      affiliation_number: "AU/2023/TN/1234",
      recognized_by: ["UGC", "AICTE", "NAAC"],
      university_type: "Autonomous",
      address_line1: "Avinashi Road",
      address_line2: "Peelamedu",
      city: "Coimbatore",
      district: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641004",
      latitude: "11.029453",
      longitude: "77.000984",
      contact_person: "Dr. R. Venkatesan",
      designation: "Principal",
      email: "info@psgtech.ac.in",
      phone: "+919876543210",
      alternate_phone: "+914222572177",
      website: "https://www.psgtech.edu",
      capacity: "9000",
      established_year: "1951",
      num_departments: "25",
      num_faculties: "600",
      num_students: "8500",
      programs_offered: ["UG", "PG", "PhD"],
      accreditation: "NAAC A++",
      is_autonomous: true,
      is_verified: true,
      hostel_available: true,
      transport_available: true,
      digital_library_url: "https://library.psgtech.edu",
      learning_management_url: "https://lms.psgtech.edu",
      placement_cell_contact: "+919843210987",
      alumni_association_url: "https://alumni.psgtech.edu",
      remarks: "Well known for producing top-tier engineers in Tamil Nadu.",
      logo_url: "https://psgtech.edu/logo.png",
    });
  };

  const handleViewEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setEditedEntity({ ...entity });
    setViewMode("view");
    setIsEditing(false);
  };

  const handleEditEntity = () => {
    setIsEditing(true);
    setViewMode("edit");
  };

  const handleSaveEntity = () => {
    if (editedEntity && selectedEntity) {
      const updatedEntity = {
        ...editedEntity,
        updated_at: new Date().toISOString(),
      };

      setEntities(
        entities.map((e) => (e.id === selectedEntity.id ? updatedEntity : e)),
      );

      setSelectedEntity(updatedEntity);
      setIsEditing(false);
      setViewMode("view");
    }
  };

  const handleCancelEdit = () => {
    setEditedEntity(selectedEntity ? { ...selectedEntity } : null);
    setIsEditing(false);
    setViewMode("view");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedEntity(null);
    setEditedEntity(null);
    setIsEditing(false);
  };

  const handleCreateNewEntity = () => {
    setViewMode("create");
    resetNewEntity();
  };

  const handleCancelCreate = () => {
    setViewMode("list");
    resetNewEntity();
  };

  const universities = entities.filter((e) => e.type === "university");

  const handleDeleteEntity = (entity: Entity) => {
    setEntityToDelete(entity);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteEntity = () => {
    if (entityToDelete) {
      setEntities(entities.filter((e) => e.id !== entityToDelete.id));
      setEntityToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  const cancelDeleteEntity = () => {
    setEntityToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Create view mode - full page create form
  if (viewMode === "create") {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Plus className="h-8 w-8" />
                Create New Entity
              </h1>
              <p className="text-muted-foreground mt-1">
                Add a new institutional entity with comprehensive details
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelCreate}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleCreateEntity}
              disabled={!newEntity.name || !newEntity.code}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Create Entity
            </Button>
          </div>
        </div>

        {/* Create Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Institution Name</Label>
                        <Input
                          id="name"
                          value={newEntity.name}
                          onChange={(e) =>
                            setNewEntity({ ...newEntity, name: e.target.value })
                          }
                          placeholder="Institution Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="code">Institution Code</Label>
                        <Input
                          id="code"
                          value={newEntity.code}
                          onChange={(e) =>
                            setNewEntity({ ...newEntity, code: e.target.value })
                          }
                          placeholder="TN201"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={newEntity.slug}
                          onChange={(e) =>
                            setNewEntity({ ...newEntity, slug: e.target.value })
                          }
                          placeholder="psg-college-of-technology"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Entity Type</Label>
                        <Select
                          value={newEntity.type}
                          onValueChange={(value) =>
                            setNewEntity({ ...newEntity, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="university">
                              University
                            </SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="institute">Institute</SelectItem>
                            <SelectItem value="institution">
                              Institution
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="educationalAuthority">
                          Educational Authority
                        </Label>
                        <Select
                          value={newEntity.educationalAuthority}
                          onValueChange={(value) =>
                            setNewEntity({
                              ...newEntity,
                              educationalAuthority: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select authority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Anna University">
                              Anna University
                            </SelectItem>
                            <SelectItem value="DOTE">DOTE</SelectItem>
                            <SelectItem value="DOCE">DOCE</SelectItem>
                            <SelectItem value="Bharathiar University">
                              Bharathiar University
                            </SelectItem>
                            <SelectItem value="UGC">UGC</SelectItem>
                            <SelectItem value="AICTE">AICTE</SelectItem>
                            <SelectItem value="Government of Tamil Nadu">
                              Government of Tamil Nadu
                            </SelectItem>
                            <SelectItem value="MHRD">MHRD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="affiliation_number">
                          Affiliation Number
                        </Label>
                        <Input
                          id="affiliation_number"
                          value={newEntity.affiliation_number}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              affiliation_number: e.target.value,
                            })
                          }
                          placeholder="AU/2023/TN/1234"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="university_type">University Type</Label>
                        <Input
                          id="university_type"
                          value={newEntity.university_type}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              university_type: e.target.value,
                            })
                          }
                          placeholder="Autonomous"
                        />
                      </div>
                      <div>
                        <Label htmlFor="accreditation">Accreditation</Label>
                        <Input
                          id="accreditation"
                          value={newEntity.accreditation}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              accreditation: e.target.value,
                            })
                          }
                          placeholder="NAAC A++"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEntity.description}
                        onChange={(e) =>
                          setNewEntity({
                            ...newEntity,
                            description: e.target.value,
                          })
                        }
                        placeholder="Brief description of the entity"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address_line1">Address Line 1</Label>
                        <Input
                          id="address_line1"
                          value={newEntity.address_line1}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              address_line1: e.target.value,
                            })
                          }
                          placeholder="Avinashi Road"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address_line2">Address Line 2</Label>
                        <Input
                          id="address_line2"
                          value={newEntity.address_line2}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              address_line2: e.target.value,
                            })
                          }
                          placeholder="Peelamedu"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newEntity.city}
                          onChange={(e) =>
                            setNewEntity({ ...newEntity, city: e.target.value })
                          }
                          placeholder="Coimbatore"
                        />
                      </div>
                      <div>
                        <Label htmlFor="district">District</Label>
                        <Input
                          id="district"
                          value={newEntity.district}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              district: e.target.value,
                            })
                          }
                          placeholder="Coimbatore"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={newEntity.state}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              state: e.target.value,
                            })
                          }
                          placeholder="Tamil Nadu"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={newEntity.pincode}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              pincode: e.target.value,
                            })
                          }
                          placeholder="641004"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={newEntity.country}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              country: e.target.value,
                            })
                          }
                          placeholder="India"
                        />
                      </div>
                      <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          value={newEntity.latitude}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              latitude: e.target.value,
                            })
                          }
                          placeholder="11.029453"
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          value={newEntity.longitude}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              longitude: e.target.value,
                            })
                          }
                          placeholder="77.000984"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact_person">Contact Person</Label>
                        <Input
                          id="contact_person"
                          value={newEntity.contact_person}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              contact_person: e.target.value,
                            })
                          }
                          placeholder="Dr. R. Venkatesan"
                        />
                      </div>
                      <div>
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          value={newEntity.designation}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              designation: e.target.value,
                            })
                          }
                          placeholder="Principal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newEntity.email}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              email: e.target.value,
                            })
                          }
                          placeholder="info@psgtech.ac.in"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={newEntity.website}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://www.psgtech.edu"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Primary Phone</Label>
                        <Input
                          id="phone"
                          value={newEntity.phone}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+919876543210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alternate_phone">Alternate Phone</Label>
                        <Input
                          id="alternate_phone"
                          value={newEntity.alternate_phone}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              alternate_phone: e.target.value,
                            })
                          }
                          placeholder="+914222572177"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="placement_cell_contact">
                          Placement Cell Contact
                        </Label>
                        <Input
                          id="placement_cell_contact"
                          value={newEntity.placement_cell_contact}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              placement_cell_contact: e.target.value,
                            })
                          }
                          placeholder="+919843210987"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alumni_association_url">
                          Alumni Association URL
                        </Label>
                        <Input
                          id="alumni_association_url"
                          value={newEntity.alumni_association_url}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              alumni_association_url: e.target.value,
                            })
                          }
                          placeholder="https://alumni.psgtech.edu"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="capacity">Total Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newEntity.capacity}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              capacity: e.target.value,
                            })
                          }
                          placeholder="9000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="established_year">
                          Established Year
                        </Label>
                        <Input
                          id="established_year"
                          type="number"
                          value={newEntity.established_year}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              established_year: e.target.value,
                            })
                          }
                          placeholder="1951"
                        />
                      </div>
                      <div>
                        <Label htmlFor="num_departments">Departments</Label>
                        <Input
                          id="num_departments"
                          type="number"
                          value={newEntity.num_departments}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              num_departments: e.target.value,
                            })
                          }
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="num_faculties">Faculties</Label>
                        <Input
                          id="num_faculties"
                          type="number"
                          value={newEntity.num_faculties}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              num_faculties: e.target.value,
                            })
                          }
                          placeholder="600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="num_students">Current Students</Label>
                        <Input
                          id="num_students"
                          type="number"
                          value={newEntity.num_students}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              num_students: e.target.value,
                            })
                          }
                          placeholder="8500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="logo_url">Logo URL</Label>
                        <Input
                          id="logo_url"
                          value={newEntity.logo_url}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              logo_url: e.target.value,
                            })
                          }
                          placeholder="https://psgtech.edu/logo.png"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="digital_library_url">
                          Digital Library URL
                        </Label>
                        <Input
                          id="digital_library_url"
                          value={newEntity.digital_library_url}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              digital_library_url: e.target.value,
                            })
                          }
                          placeholder="https://library.psgtech.edu"
                        />
                      </div>
                      <div>
                        <Label htmlFor="learning_management_url">
                          Learning Management URL
                        </Label>
                        <Input
                          id="learning_management_url"
                          value={newEntity.learning_management_url}
                          onChange={(e) =>
                            setNewEntity({
                              ...newEntity,
                              learning_management_url: e.target.value,
                            })
                          }
                          placeholder="https://lms.psgtech.edu"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_autonomous"
                            checked={newEntity.is_autonomous}
                            onChange={(e) =>
                              setNewEntity({
                                ...newEntity,
                                is_autonomous: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="is_autonomous">Autonomous</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_verified"
                            checked={newEntity.is_verified}
                            onChange={(e) =>
                              setNewEntity({
                                ...newEntity,
                                is_verified: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="is_verified">Verified</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="hostel_available"
                            checked={newEntity.hostel_available}
                            onChange={(e) =>
                              setNewEntity({
                                ...newEntity,
                                hostel_available: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="hostel_available">
                            Hostel Available
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="transport_available"
                            checked={newEntity.transport_available}
                            onChange={(e) =>
                              setNewEntity({
                                ...newEntity,
                                transport_available: e.target.checked,
                              })
                            }
                          />
                          <Label htmlFor="transport_available">
                            Transport Available
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={newEntity.remarks}
                        onChange={(e) =>
                          setNewEntity({
                            ...newEntity,
                            remarks: e.target.value,
                          })
                        }
                        placeholder="Well known for producing top-tier engineers in Tamil Nadu."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={handleCreateEntity}
                  disabled={!newEntity.name || !newEntity.code}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Entity
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelCreate}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </CardContent>
            </Card>

            {/* Form Status */}
            <Card>
              <CardHeader>
                <CardTitle>Form Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-4 w-4 ${newEntity.name ? "text-green-500" : "text-gray-300"}`}
                  />
                  <span className="text-sm">Institution Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-4 w-4 ${newEntity.code ? "text-green-500" : "text-gray-300"}`}
                  />
                  <span className="text-sm">Institution Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-4 w-4 ${newEntity.educationalAuthority ? "text-green-500" : "text-gray-300"}`}
                  />
                  <span className="text-sm">Educational Authority</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-4 w-4 ${newEntity.email ? "text-green-500" : "text-gray-300"}`}
                  />
                  <span className="text-sm">Contact Email</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "view" || viewMode === "edit") {
    const currentEntity = isEditing ? editedEntity : selectedEntity;
    if (!currentEntity) return null;

    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                {getTypeIcon(currentEntity.type)}
                {currentEntity.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentEntity.code} • {currentEntity.type}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={handleEditEntity}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEntity}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Entity Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Institution Name
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.name}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, name: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold">
                        {currentEntity.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Code
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.code}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, code: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold">
                        {currentEntity.code}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Type
                    </Label>
                    {isEditing ? (
                      <Select
                        value={currentEntity.type}
                        onValueChange={(value) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, type: value as Entity["type"] }
                              : null,
                          )
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="institute">Institute</SelectItem>
                        
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant="outline"
                        className={`${getTypeColor(currentEntity.type)} mt-1`}
                      >
                        {currentEntity.type}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Educational Authority
                    </Label>
                    {isEditing ? (
                      <Select
                        value={currentEntity.educationalAuthority}
                        onValueChange={(value) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, educationalAuthority: value }
                              : null,
                          )
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UGC">UGC</SelectItem>
                          <SelectItem value="AICTE">AICTE</SelectItem>
                          <SelectItem value="Government of Tamil Nadu">
                            Government of Tamil Nadu
                          </SelectItem>
                          <SelectItem value="MHRD">MHRD</SelectItem>
                          <SelectItem value="State Board">
                            State Board
                          </SelectItem>
                          <SelectItem value="CBSE">CBSE</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1">
                        {currentEntity.educationalAuthority}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Description
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={currentEntity.description}
                      onChange={(e) =>
                        setEditedEntity((prev) =>
                          prev
                            ? { ...prev, description: e.target.value }
                            : null,
                        )
                      }
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1">{currentEntity.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      University Type
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.university_type}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, university_type: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.university_type}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Established Year
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={currentEntity.established_year}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  established_year: parseInt(e.target.value),
                                }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.established_year}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Accreditation
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.accreditation}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, accreditation: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 mt-1"
                      >
                        {currentEntity.accreditation}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Address Line 1
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.address_line1}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, address_line1: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.address_line1}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Address Line 2
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.address_line2 || ""}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, address_line2: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">
                        {currentEntity.address_line2 || "N/A"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      City
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.city}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, city: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.city}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      District
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.district}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, district: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.district}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      State
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.state}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, state: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.state}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Pincode
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.pincode}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, pincode: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.pincode}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Contact Person
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.contact_person}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, contact_person: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 font-medium">
                        {currentEntity.contact_person}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Designation
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.designation}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, designation: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{currentEntity.designation}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Primary Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.phone}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, phone: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {currentEntity.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Alternate Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.alternate_phone || ""}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, alternate_phone: e.target.value }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {currentEntity.alternate_phone || "N/A"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={currentEntity.email}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, email: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {currentEntity.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Website
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentEntity.website}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev ? { ...prev, website: e.target.value } : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={currentEntity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {currentEntity.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Capacity
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={currentEntity.capacity}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? { ...prev, capacity: parseInt(e.target.value) }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-semibold">
                        {currentEntity.capacity.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Departments
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={currentEntity.num_departments}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  num_departments: parseInt(e.target.value),
                                }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-semibold">
                        {currentEntity.num_departments}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Faculties
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={currentEntity.num_faculties}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  num_faculties: parseInt(e.target.value),
                                }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-semibold">
                        {currentEntity.num_faculties}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Students
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={currentEntity.num_students}
                        onChange={(e) =>
                          setEditedEntity((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  num_students: parseInt(e.target.value),
                                }
                              : null,
                          )
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-semibold">
                        {currentEntity.num_students.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Programs Offered
                  </Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {currentEntity.programs_offered.map((program, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Recognized By
                  </Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {currentEntity.recognized_by.map((org, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        {org}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Facilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span className="text-sm">Hostel</span>
                    <Badge
                      variant={
                        currentEntity.hostel_available ? "default" : "secondary"
                      }
                    >
                      {currentEntity.hostel_available
                        ? "Available"
                        : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bus className="h-4 w-4" />
                    <span className="text-sm">Transport</span>
                    <Badge
                      variant={
                        currentEntity.transport_available
                          ? "default"
                          : "secondary"
                      }
                    >
                      {currentEntity.transport_available
                        ? "Available"
                        : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">Autonomous</span>
                    <Badge
                      variant={
                        currentEntity.is_autonomous ? "default" : "secondary"
                      }
                    >
                      {currentEntity.is_autonomous ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Verified</span>
                    <Badge
                      variant={
                        currentEntity.is_verified ? "default" : "secondary"
                      }
                    >
                      {currentEntity.is_verified ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>

                {(currentEntity.digital_library_url ||
                  currentEntity.learning_management_url) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Digital Resources
                    </Label>
                    <div className="space-y-1">
                      {currentEntity.digital_library_url && (
                        <p className="text-sm">
                          <strong>Digital Library:</strong>{" "}
                          <a
                            href={currentEntity.digital_library_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {currentEntity.digital_library_url}
                          </a>
                        </p>
                      )}
                      {currentEntity.learning_management_url && (
                        <p className="text-sm">
                          <strong>LMS:</strong>{" "}
                          <a
                            href={currentEntity.learning_management_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {currentEntity.learning_management_url}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(currentEntity.status)} w-full justify-center py-2`}
                >
                  {currentEntity.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-gray-500">
                    Affiliation Number
                  </Label>
                  <p className="text-sm font-medium">
                    {currentEntity.affiliation_number}
                  </p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">
                    Slug
                  </Label>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {currentEntity.slug}
                  </p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">
                    Created Date
                  </Label>
                  <p className="text-sm">
                    {new Date(currentEntity.created_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">
                    Last Updated
                  </Label>
                  <p className="text-sm">
                    {new Date(currentEntity.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{currentEntity.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{currentEntity.email}</span>
                </div>
                {currentEntity.placement_cell_contact && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Placement: {currentEntity.placement_cell_contact}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Remarks */}
            {currentEntity.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle>Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {currentEntity.remarks}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entity Setup</h1>
          <p className="text-muted-foreground mt-2">
            Configure and manage institutional entities, departments, and
            organizational structure.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCreateNewEntity}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Entity
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Universities
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.universities}
                </p>
              </div>
              <School className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Colleges</p>
                <p className="text-3xl font-bold text-green-900">
                  {stats.colleges}
                </p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Institutes
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {stats.institutes}
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Schools</p>
                <p className="text-3xl font-bold text-orange-900">
                  {stats.schools}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card> */}

        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Active
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search entities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="university">University</SelectItem>
            <SelectItem value="college">College</SelectItem>
            <SelectItem value="institute">Institute</SelectItem>
      
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterEducationalAuthority}
          onValueChange={setFilterEducationalAuthority}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by authority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authorities</SelectItem>
            <SelectItem value="Anna University">Anna University</SelectItem>
            <SelectItem value="DOTE">DOTE</SelectItem>
            <SelectItem value="DOCE">DOCE</SelectItem>
            <SelectItem value="Bharathiar University">
              Bharathiar University
            </SelectItem>
            <SelectItem value="UGC">UGC</SelectItem>
            <SelectItem value="AICTE">AICTE</SelectItem>
            <SelectItem value="Government of Tamil Nadu">
              Government of Tamil Nadu
            </SelectItem>
            <SelectItem value="MHRD">MHRD</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="w-full sm:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Entities</TabsTrigger>
          <TabsTrigger value="university">Universities</TabsTrigger>
          <TabsTrigger value="college">Colleges</TabsTrigger>
          <TabsTrigger value="institute">Institutes</TabsTrigger>
         
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium">Entity</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">
                        Educational Authority
                      </th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Capacity</th>
                      <th className="text-left p-4 font-medium">Contact</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEntities.map((entity) => (
                      <tr key={entity.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(entity.type)}
                            <div>
                              <div className="font-medium">{entity.name}</div>
                              <div className="text-sm text-gray-500">
                                {entity.code}
                              </div>
                              <div className="text-xs text-gray-400 max-w-md truncate">
                                {entity.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={getTypeColor(entity.type)}
                          >
                            {entity.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">
                            {entity.educationalAuthority}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={getStatusColor(entity.status)}
                          >
                            {entity.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">
                            {entity.capacity?.toLocaleString() || "N/A"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div>{entity.contact_person || "N/A"}</div>
                            {entity.email && (
                              <div className="text-gray-500">
                                {entity.email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewEntity(entity)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEntity(entity)}
                              title="Delete Entity"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {paginatedEntities.length === 0 &&
                  filteredEntities.length === 0 && (
                    <div className="text-center py-12">
                      <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No entities found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  )}
              </div>
            </CardContent>

            {/* Pagination Footer */}
            {filteredEntities.length > 0 && (
              <div className="px-6 py-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredEntities.length)} of{" "}
                      {filteredEntities.length} entities
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* First page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    {/* Previous page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                      {generatePageNumbers().map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className="h-8 w-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      ))}
                    </div>

                    {/* Next page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Last page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{entityToDelete?.name}"? This
              action cannot be undone and will permanently remove the entity
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteEntity}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteEntity}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
