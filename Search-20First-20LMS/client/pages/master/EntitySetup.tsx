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
} from "lucide-react";

interface Entity {
  id: string;
  name: string;
  code: string;
  type: "institution" | "department" | "location" | "level";
  parentId?: string;
  description: string;
  address?: string;
  capacity?: number;
  status: "active" | "inactive";
  createdDate: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
}

export default function EntitySetup() {
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: "1",
      name: "Main University",
      code: "MAIN",
      type: "institution",
      description: "Primary educational institution",
      address: "123 University Avenue, Education City",
      capacity: 5000,
      status: "active",
      createdDate: "2024-01-01",
      contactPerson: "Dr. Sarah Johnson",
      phone: "+1-234-567-8900",
      email: "admin@university.edu",
    },
    {
      id: "2",
      name: "Computer Science Department",
      code: "CSE",
      type: "department",
      parentId: "1",
      description: "Department of Computer Science and Engineering",
      capacity: 500,
      status: "active",
      createdDate: "2024-01-15",
      contactPerson: "Prof. Kumar",
      phone: "+1-234-567-8901",
      email: "cse@university.edu",
    },
    {
      id: "3",
      name: "North Campus",
      code: "NC",
      type: "location",
      parentId: "1",
      description: "Main academic campus with lecture halls and labs",
      address: "North Wing, University Complex",
      capacity: 2000,
      status: "active",
      createdDate: "2024-01-10",
    },
    {
      id: "4",
      name: "Undergraduate Level",
      code: "UG",
      type: "level",
      description: "Bachelor degree programs and courses",
      capacity: 3000,
      status: "active",
      createdDate: "2024-01-05",
    },
    {
      id: "5",
      name: "Mechanical Engineering Department",
      code: "ME",
      type: "department",
      parentId: "1",
      description: "Department of Mechanical Engineering",
      capacity: 400,
      status: "active",
      createdDate: "2024-01-20",
      contactPerson: "Dr. Smith",
      phone: "+1-234-567-8902",
      email: "me@university.edu",
    },
    {
      id: "6",
      name: "South Campus",
      code: "SC",
      type: "location",
      parentId: "1",
      description: "Research facilities and postgraduate programs",
      address: "South Wing, University Complex",
      capacity: 1500,
      status: "active",
      createdDate: "2024-01-12",
    },
    {
      id: "7",
      name: "Postgraduate Level",
      code: "PG",
      type: "level",
      description: "Master and Doctoral degree programs",
      capacity: 1200,
      status: "active",
      createdDate: "2024-01-08",
    },
    {
      id: "8",
      name: "Business Administration Department",
      code: "MBA",
      type: "department",
      parentId: "1",
      description: "Department of Business Administration",
      capacity: 300,
      status: "inactive",
      createdDate: "2024-02-01",
      contactPerson: "Prof. Brown",
      phone: "+1-234-567-8903",
      email: "mba@university.edu",
    },

    {
      id: "9",
      name: "Anna University",
      code: "TN009",
      type: "institution",
      description: "Details about Anna University",
      address: "Sardar Patel Road, Guindy, Chennai, Tamil Nadu",
      capacity: 1200,
      status: "active",
      createdDate: "2022-11-15",
      contactPerson: "Dr. Rajesh Kumar",
      phone: "044-22357000",
      email: "rajesh@annauniv.edu",
    },
    {
      id: "10",
      name: "Electrical Engineering",
      code: "TN010",
      type: "department",
      parentId: "9",
      description: "Details about the Electrical Engineering department",
      address: "Anna University Campus, Chennai",
      status: "active",
      createdDate: "2023-03-10",
      contactPerson: "Prof. Anitha",
      phone: "044-22357200",
      email: "anitha@annauniv.edu",
    },
    {
      id: "11",
      name: "Chennai Campus",
      code: "TN011",
      type: "location",
      parentId: "9",
      description: "Details about the Chennai Campus",
      address: "Guindy, Chennai, Tamil Nadu",
      capacity: 850,
      status: "active",
      createdDate: "2021-07-05",
      contactPerson: "Mr. Suresh",
      phone: "044-22357300",
      email: "suresh@annauniv.edu",
    },
    {
      id: "12",
      name: "First Year",
      code: "TN012",
      type: "level",
      parentId: "10",
      description: "Details about First Year students",
      status: "active",
      createdDate: "2024-01-01",
      contactPerson: "Ms. Karthika",
      phone: "044-22357400",
      email: "karthika@annauniv.edu",
    },
    {
      id: "13",
      name: "IIT Madras",
      code: "TN013",
      type: "institution",
      description: "Details about IIT Madras",
      address: "IIT Madras, Sardar Patel Road, Chennai, Tamil Nadu",
      capacity: 1500,
      status: "inactive",
      createdDate: "2020-09-22",
      contactPerson: "Dr. Venkat",
      phone: "044-22570000",
      email: "venkat@iitm.ac.in",
    },
    {
      id: "14",
      name: "Information Technology",
      code: "TN014",
      type: "department",
      parentId: "13",
      description: "Details about the Information Technology department",
      address: "IIT Madras Campus, Chennai",
      status: "active",
      createdDate: "2022-08-11",
      contactPerson: "Prof. Deepika",
      phone: "044-22570101",
      email: "deepika@iitm.ac.in",
    },
    {
      id: "15",
      name: "Madurai Campus",
      code: "TN015",
      type: "location",
      parentId: "13",
      description: "Details about Madurai Campus",
      address: "Madurai, Tamil Nadu",
      capacity: 600,
      status: "inactive",
      createdDate: "2021-05-20",
      contactPerson: "Mr. Arun",
      phone: "0452-2652000",
      email: "arun@iitm.ac.in",
    },
    {
      id: "16",
      name: "Second Year",
      code: "TN016",
      type: "level",
      parentId: "14",
      description: "Details about Second Year students",
      status: "active",
      createdDate: "2023-06-18",
      contactPerson: "Ms. Sneha",
      phone: "044-22570222",
      email: "sneha@iitm.ac.in",
    },
    {
      id: "17",
      name: "PSG College of Technology",
      code: "TN017",
      type: "institution",
      description: "Details about PSG College of Technology",
      address: "Peelamedu, Coimbatore, Tamil Nadu",
      capacity: 1100,
      status: "active",
      createdDate: "2020-12-01",
      contactPerson: "Dr. Ravi",
      phone: "0422-2572177",
      email: "ravi@psgtech.ac.in",
    },
    {
      id: "18",
      name: "Software Engineering",
      code: "TN018",
      type: "department",
      parentId: "17",
      description: "Details about Software Engineering department",
      address: "PSG Tech Campus, Coimbatore",
      status: "active",
      createdDate: "2022-03-14",
      contactPerson: "Prof. Aishwarya",
      phone: "0422-2572188",
      email: "aishwarya@psgtech.ac.in",
    },
    {
      id: "19",
      name: "Coimbatore Campus",
      code: "TN019",
      type: "location",
      parentId: "17",
      description: "Details about Coimbatore Campus",
      address: "Coimbatore, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2023-09-09",
      contactPerson: "Mr. Balamurugan",
      phone: "0422-2572199",
      email: "bala@psgtech.ac.in",
    },
    {
      id: "20",
      name: "Third Year",
      code: "TN020",
      type: "level",
      parentId: "18",
      description: "Details about Third Year students",
      status: "active",
      createdDate: "2024-02-12",
      contactPerson: "Ms. Swathi",
      phone: "0422-2572200",
      email: "swathi@psgtech.ac.in",
    },
    {
      id: "21",
      name: "SSN College of Engineering",
      code: "TN021",
      type: "institution",
      description: "Details about SSN College of Engineering",
      address: "Kalavakkam, Chennai, Tamil Nadu",
      capacity: 1000,
      status: "inactive",
      createdDate: "2021-04-15",
      contactPerson: "Dr. Priya",
      phone: "044-27469700",
      email: "priya@ssn.edu.in",
    },
    {
      id: "22",
      name: "Mechanical Engineering",
      code: "TN022",
      type: "department",
      parentId: "21",
      description: "Details about Mechanical Engineering department",
      address: "SSN Campus, Chennai",
      status: "active",
      createdDate: "2022-01-20",
      contactPerson: "Prof. Hari",
      phone: "044-27469701",
      email: "hari@ssn.edu.in",
    },
    {
      id: "23",
      name: "Salem Campus",
      code: "TN023",
      type: "location",
      parentId: "21",
      description: "Details about Salem Campus",
      address: "Salem, Tamil Nadu",
      capacity: 720,
      status: "inactive",
      createdDate: "2023-03-01",
      contactPerson: "Mr. Manikandan",
      phone: "0427-2334000",
      email: "mani@ssn.edu.in",
    },
    {
      id: "24",
      name: "Fourth Year",
      code: "TN024",
      type: "level",
      parentId: "22",
      description: "Details about Fourth Year students",
      status: "active",
      createdDate: "2024-03-30",
      contactPerson: "Ms. Keerthi",
      phone: "044-27469702",
      email: "keerthi@ssn.edu.in",
    },
    {
      id: "25",
      name: "NIT Trichy",
      code: "TN025",
      type: "institution",
      description: "Details about NIT Trichy",
      address: "Tanjore Main Road, Trichy, Tamil Nadu",
      capacity: 1400,
      status: "active",
      createdDate: "2019-08-23",
      contactPerson: "Dr. Gokul",
      phone: "0431-2503000",
      email: "gokul@nitt.edu",
    },
    {
      id: "26",
      name: "Civil Engineering",
      code: "TN026",
      type: "department",
      parentId: "25",
      description: "Details about Civil Engineering department",
      address: "NIT Campus, Trichy",
      status: "active",
      createdDate: "2020-06-07",
      contactPerson: "Prof. Lavanya",
      phone: "0431-2503001",
      email: "lavanya@nitt.edu",
    },
    {
      id: "27",
      name: "Trichy Campus",
      code: "TN027",
      type: "location",
      parentId: "25",
      description: "Details about Trichy Campus",
      address: "Trichy, Tamil Nadu",
      capacity: 880,
      status: "active",
      createdDate: "2021-12-10",
      contactPerson: "Mr. Sivaraman",
      phone: "0431-2503002",
      email: "sivaraman@nitt.edu",
    },
    {
      id: "28",
      name: "Postgraduate",
      code: "TN028",
      type: "level",
      parentId: "26",
      description: "Details about Postgraduate students",
      status: "inactive",
      createdDate: "2022-09-28",
      contactPerson: "Ms. Shruthi",
      phone: "0431-2503003",
      email: "shruthi@nitt.edu",
    },
    {
      id: "29",
      name: "Velammal Engineering College",
      code: "TN029",
      type: "institution",
      description: "Details about Velammal Engineering College",
      address: "Surapet, Chennai, Tamil Nadu",
      capacity: 1050,
      status: "active",
      createdDate: "2020-05-05",
      contactPerson: "Dr. Kumaravel",
      phone: "044-39666000",
      email: "kumar@velammal.edu.in",
    },
    {
      id: "30",
      name: "Electrical Engineering",
      code: "TN030",
      type: "department",
      parentId: "29",
      description: "Details about Electrical Engineering department",
      address: "Velammal Campus, Chennai",
      status: "active",
      createdDate: "2021-10-19",
      contactPerson: "Prof. Shalini",
      phone: "044-39666001",
      email: "shalini@velammal.edu.in",
    },
    {
      id: "31",
      name: "Chennai Campus",
      code: "TN031",
      type: "location",
      parentId: "29",
      description: "Details about Chennai Campus",
      address: "Chennai, Tamil Nadu",
      capacity: 930,
      status: "active",
      createdDate: "2023-01-10",
      contactPerson: "Mr. Arvind",
      phone: "044-39666002",
      email: "arvind@velammal.edu.in",
    },
    {
      id: "32",
      name: "First Year",
      code: "TN032",
      type: "level",
      parentId: "30",
      description: "Details about First Year students",
      status: "active",
      createdDate: "2024-07-03",
      contactPerson: "Ms. Nandhini",
      phone: "044-39666003",
      email: "nandhini@velammal.edu.in",
    },
    {
      id: "33",
      name: "SRM Institute of Science and Technology",
      code: "TN033",
      type: "institution",
      description: "Details about SRM Institute of Science and Technology",
      address: "Kattankulathur, Chengalpattu, Tamil Nadu",
      capacity: 1600,
      status: "active",
      createdDate: "2022-06-15",
      contactPerson: "Dr. Ramya",
      phone: "044-27417000",
      email: "ramya@srmist.edu.in",
    },

    {
      id: "34",
      name: "SRM Institute of Science and Technology",
      code: "TN034",
      type: "institution",
      description: "Details about SRM Institute",
      address: "Potheri, Chengalpattu, Tamil Nadu",
      capacity: 1400,
      status: "active",
      createdDate: "2022-03-20",
      contactPerson: "Dr. Raghavan",
      phone: "044-27453191",
      email: "raghavan@srm.edu.in",
    },
    {
      id: "35",
      name: "Information Technology",
      code: "TN035",
      type: "department",
      parentId: "34",
      description: "Details about the Information Technology department",
      address: "SRM Campus, Potheri",
      status: "active",
      createdDate: "2023-02-10",
      contactPerson: "Prof. Priya",
      phone: "044-27453192",
      email: "priya@srm.edu.in",
    },
    {
      id: "36",
      name: "Coimbatore Campus",
      code: "TN036",
      type: "location",
      parentId: "34",
      description: "Details about the Coimbatore Campus",
      address: "Avinashi Road, Coimbatore, Tamil Nadu",
      capacity: 1000,
      status: "inactive",
      createdDate: "2021-11-14",
      contactPerson: "Mr. Aravind",
      phone: "0422-2615000",
      email: "aravind@srm.edu.in",
    },
    {
      id: "37",
      name: "Second Year",
      code: "TN037",
      type: "level",
      parentId: "35",
      description: "Details about Second Year students",
      status: "active",
      createdDate: "2023-07-01",
      contactPerson: "Ms. Divya",
      phone: "044-27453193",
      email: "divya@srm.edu.in",
    },
    {
      id: "38",
      name: "VIT Vellore",
      code: "TN038",
      type: "institution",
      description: "Details about VIT Vellore",
      address: "Katpadi, Vellore, Tamil Nadu",
      capacity: 1800,
      status: "active",
      createdDate: "2020-10-05",
      contactPerson: "Dr. Manikandan",
      phone: "0416-2243091",
      email: "manikandan@vit.ac.in",
    },
    {
      id: "39",
      name: "Mechanical Engineering",
      code: "TN039",
      type: "department",
      parentId: "38",
      description: "Details about the Mechanical Engineering department",
      address: "VIT Vellore Campus",
      status: "active",
      createdDate: "2022-04-18",
      contactPerson: "Prof. Keerthana",
      phone: "0416-2243092",
      email: "keerthana@vit.ac.in",
    },
    {
      id: "40",
      name: "Madurai Campus",
      code: "TN040",
      type: "location",
      parentId: "38",
      description: "Details about the Madurai Campus",
      address: "Thiruparankundram, Madurai, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2021-09-15",
      contactPerson: "Mr. Kannan",
      phone: "0452-2489123",
      email: "kannan@vit.ac.in",
    },
    {
      id: "41",
      name: "Third Year",
      code: "TN041",
      type: "level",
      parentId: "39",
      description: "Details about Third Year students",
      status: "active",
      createdDate: "2024-03-01",
      contactPerson: "Ms. Ramya",
      phone: "0416-2243093",
      email: "ramya@vit.ac.in",
    },
    {
      id: "42",
      name: "Bharath Institute of Higher Education",
      code: "TN042",
      type: "institution",
      description: "Details about Bharath Institute",
      address: "Selaiyur, Chennai, Tamil Nadu",
      capacity: 1000,
      status: "inactive",
      createdDate: "2021-06-30",
      contactPerson: "Dr. Mahesh",
      phone: "044-22290161",
      email: "mahesh@bharathuniv.ac.in",
    },
    {
      id: "43",
      name: "Civil Engineering",
      code: "TN043",
      type: "department",
      parentId: "42",
      description: "Details about the Civil Engineering department",
      address: "Bharath University Campus",
      status: "active",
      createdDate: "2023-01-10",
      contactPerson: "Prof. Nalini",
      phone: "044-22290162",
      email: "nalini@bharathuniv.ac.in",
    },
    {
      id: "44",
      name: "Salem Campus",
      code: "TN044",
      type: "location",
      parentId: "42",
      description: "Details about the Salem Campus",
      address: "Omalur, Salem, Tamil Nadu",
      capacity: 700,
      status: "inactive",
      createdDate: "2022-10-05",
      contactPerson: "Mr. Dinesh",
      phone: "0427-2915000",
      email: "dinesh@bharathuniv.ac.in",
    },
    {
      id: "45",
      name: "Final Year",
      code: "TN045",
      type: "level",
      parentId: "43",
      description: "Details about Final Year students",
      status: "active",
      createdDate: "2024-04-01",
      contactPerson: "Ms. Lavanya",
      phone: "044-22290163",
      email: "lavanya@bharathuniv.ac.in",
    },
    {
      id: "46",
      name: "Amrita Vishwa Vidyapeetham",
      code: "TN046",
      type: "institution",
      description: "Details about Amrita University",
      address: "Ettimadai, Coimbatore, Tamil Nadu",
      capacity: 1100,
      status: "active",
      createdDate: "2020-05-12",
      contactPerson: "Dr. Ravi Kumar",
      phone: "0422-2685000",
      email: "ravi@amrita.edu",
    },
    {
      id: "47",
      name: "Computer Science Engineering",
      code: "TN047",
      type: "department",
      parentId: "46",
      description: "Details about the Computer Science department",
      address: "Amrita University, Coimbatore",
      status: "active",
      createdDate: "2021-12-20",
      contactPerson: "Prof. Sudha",
      phone: "0422-2685001",
      email: "sudha@amrita.edu",
    },
    {
      id: "48",
      name: "Trichy Campus",
      code: "TN048",
      type: "location",
      parentId: "46",
      description: "Details about the Trichy Campus",
      address: "Thillai Nagar, Trichy, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2023-06-05",
      contactPerson: "Mr. Naveen",
      phone: "0431-2456000",
      email: "naveen@amrita.edu",
    },
    {
      id: "49",
      name: "Bridge Course",
      code: "TN049",
      type: "level",
      parentId: "47",
      description: "Details about Bridge Course",
      status: "inactive",
      createdDate: "2022-08-01",
      contactPerson: "Ms. Shalini",
      phone: "0422-2685002",
      email: "shalini@amrita.edu",
    },
    {
      id: "50",
      name: "Karunya Institute of Technology",
      code: "TN050",
      type: "institution",
      description: "Details about Karunya Institute",
      address: "Karunya Nagar, Coimbatore, Tamil Nadu",
      capacity: 1000,
      status: "active",
      createdDate: "2021-04-09",
      contactPerson: "Dr. Ashok",
      phone: "0422-2614300",
      email: "ashok@karunya.edu",
    },
    {
      id: "51",
      name: "SASTRA University",
      code: "TN051",
      type: "institution",
      description: "Details about SASTRA University",
      address: "Tirumalaisamudram, Thanjavur, Tamil Nadu",
      capacity: 1200,
      status: "active",
      createdDate: "2022-01-12",
      contactPerson: "Dr. Kumaravel",
      phone: "04362-264101",
      email: "kumaravel@sastra.edu",
    },
    {
      id: "52",
      name: "Electronics and Communication Engineering",
      code: "TN052",
      type: "department",
      parentId: "51",
      description: "Details about ECE Department",
      address: "SASTRA Campus, Thanjavur",
      status: "active",
      createdDate: "2023-02-14",
      contactPerson: "Prof. Meena",
      phone: "04362-264102",
      email: "meena@sastra.edu",
    },
    {
      id: "53",
      name: "Thanjavur Campus",
      code: "TN053",
      type: "location",
      parentId: "51",
      description: "Details about Thanjavur Campus",
      address: "SASTRA Main Campus, Thanjavur, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2021-08-09",
      contactPerson: "Mr. Vignesh",
      phone: "04362-264103",
      email: "vignesh@sastra.edu",
    },
    {
      id: "54",
      name: "First Semester",
      code: "TN054",
      type: "level",
      parentId: "52",
      description: "Details about First Semester students",
      status: "active",
      createdDate: "2024-01-10",
      contactPerson: "Ms. Ranjitha",
      phone: "04362-264104",
      email: "ranjitha@sastra.edu",
    },
    {
      id: "55",
      name: "PSG College of Technology",
      code: "TN055",
      type: "institution",
      description: "Details about PSG College",
      address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu",
      capacity: 1300,
      status: "active",
      createdDate: "2020-07-18",
      contactPerson: "Dr. Narayanan",
      phone: "0422-2572177",
      email: "narayanan@psgtech.ac.in",
    },
    {
      id: "56",
      name: "Artificial Intelligence and Data Science",
      code: "TN056",
      type: "department",
      parentId: "55",
      description: "Details about AI & DS Department",
      address: "PSG Campus, Coimbatore",
      status: "active",
      createdDate: "2022-12-22",
      contactPerson: "Prof. Sneha",
      phone: "0422-2572178",
      email: "sneha@psgtech.ac.in",
    },
    {
      id: "57",
      name: "Peelamedu Campus",
      code: "TN057",
      type: "location",
      parentId: "55",
      description: "Details about Peelamedu Campus",
      address: "Avinashi Road, Coimbatore, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2021-04-05",
      contactPerson: "Mr. Arjun",
      phone: "0422-2572179",
      email: "arjun@psgtech.ac.in",
    },
    {
      id: "58",
      name: "Third Semester",
      code: "TN058",
      type: "level",
      parentId: "56",
      description: "Details about Third Semester students",
      status: "active",
      createdDate: "2023-08-15",
      contactPerson: "Ms. Bhuvana",
      phone: "0422-2572180",
      email: "bhuvana@psgtech.ac.in",
    },
    {
      id: "59",
      name: "Government College of Technology",
      code: "TN059",
      type: "institution",
      description: "Details about GCT Coimbatore",
      address: "Thadagam Road, Coimbatore, Tamil Nadu",
      capacity: 1100,
      status: "inactive",
      createdDate: "2021-02-19",
      contactPerson: "Dr. Rajalakshmi",
      phone: "0422-2432221",
      email: "rajalakshmi@gct.ac.in",
    },
    {
      id: "60",
      name: "Biomedical Engineering",
      code: "TN060",
      type: "department",
      parentId: "59",
      description: "Details about Biomedical Engineering department",
      address: "GCT Campus, Coimbatore",
      status: "active",
      createdDate: "2022-06-01",
      contactPerson: "Prof. Harish",
      phone: "0422-2432222",
      email: "harish@gct.ac.in",
    },
    {
      id: "61",
      name: "Erode Campus",
      code: "TN061",
      type: "location",
      parentId: "59",
      description: "Details about Erode Campus",
      address: "Perundurai Road, Erode, Tamil Nadu",
      capacity: 800,
      status: "active",
      createdDate: "2023-05-11",
      contactPerson: "Mr. Ramesh",
      phone: "0424-2255000",
      email: "ramesh@gct.ac.in",
    },
    {
      id: "62",
      name: "Internship Batch",
      code: "TN062",
      type: "level",
      parentId: "60",
      description: "Details about Internship Batch students",
      status: "inactive",
      createdDate: "2023-11-01",
      contactPerson: "Ms. Deepika",
      phone: "0422-2432223",
      email: "deepika@gct.ac.in",
    },
    {
      id: "63",
      name: "Hindustan Institute of Technology and Science",
      code: "TN063",
      type: "institution",
      description: "Details about Hindustan Institute",
      address: "Padur, Chennai, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2021-08-25",
      contactPerson: "Dr. Santhosh",
      phone: "044-27474262",
      email: "santhosh@hindustanuniv.ac.in",
    },
    {
      id: "64",
      name: "Aeronautical Engineering",
      code: "TN064",
      type: "department",
      parentId: "63",
      description: "Details about Aeronautical Engineering department",
      address: "HITS Campus, Chennai",
      status: "active",
      createdDate: "2023-02-05",
      contactPerson: "Prof. Geetha",
      phone: "044-27474263",
      email: "geetha@hindustanuniv.ac.in",
    },
    {
      id: "65",
      name: "Padur Campus",
      code: "TN065",
      type: "location",
      parentId: "63",
      description: "Details about Padur Campus",
      address: "Rajiv Gandhi Salai, Padur, Chennai, Tamil Nadu",
      capacity: 850,
      status: "active",
      createdDate: "2020-12-12",
      contactPerson: "Mr. Bala",
      phone: "044-27474264",
      email: "bala@hindustanuniv.ac.in",
    },
    {
      id: "66",
      name: "Final Semester",
      code: "TN066",
      type: "level",
      parentId: "64",
      description: "Details about Final Semester students",
      status: "active",
      createdDate: "2024-06-01",
      contactPerson: "Ms. Rithika",
      phone: "044-27474265",
      email: "rithika@hindustanuniv.ac.in",
    },
    {
      id: "67",
      name: "Vel Tech University",
      code: "TN067",
      type: "institution",
      description: "Details about Vel Tech University",
      address: "Avadi, Chennai, Tamil Nadu",
      capacity: 1050,
      status: "inactive",
      createdDate: "2022-02-28",
      contactPerson: "Dr. Elango",
      phone: "044-26840605",
      email: "elango@veltech.edu.in",
    },
    {
      id: "68",
      name: "Mechatronics",
      code: "TN068",
      type: "department",
      parentId: "67",
      description: "Details about Mechatronics department",
      address: "Vel Tech Campus, Avadi",
      status: "active",
      createdDate: "2023-01-15",
      contactPerson: "Prof. Harini",
      phone: "044-26840606",
      email: "harini@veltech.edu.in",
    },
    {
      id: "69",
      name: "Avadi Campus",
      code: "TN069",
      type: "location",
      parentId: "67",
      description: "Details about Avadi Campus",
      address: "Vel Tech Road, Avadi, Chennai, Tamil Nadu",
      capacity: 800,
      status: "active",
      createdDate: "2021-05-22",
      contactPerson: "Mr. Vivek",
      phone: "044-26840607",
      email: "vivek@veltech.edu.in",
    },
    {
      id: "70",
      name: "Project Semester",
      code: "TN070",
      type: "level",
      parentId: "68",
      description: "Details about Project Semester students",
      status: "active",
      createdDate: "2024-02-10",
      contactPerson: "Ms. Renu",
      phone: "044-26840608",
      email: "renu@veltech.edu.in",
    },
    {
      id: "71",
      name: "SRM Institute of Science and Technology",
      code: "TN071",
      type: "institution",
      description: "Details about SRM University",
      address: "Kattankulathur, Chengalpattu, Tamil Nadu",
      capacity: 1600,
      status: "active",
      createdDate: "2022-01-20",
      contactPerson: "Dr. Manikandan",
      phone: "044-27455510",
      email: "manikandan@srmist.edu.in",
    },
    {
      id: "72",
      name: "Computer Science and Engineering",
      code: "TN072",
      type: "department",
      parentId: "71",
      description: "CSE department details",
      address: "SRM Kattankulathur Campus",
      status: "active",
      createdDate: "2023-02-14",
      contactPerson: "Prof. Kavitha",
      phone: "044-27455511",
      email: "kavitha@srmist.edu.in",
    },
    {
      id: "73",
      name: "Kattankulathur Campus",
      code: "TN073",
      type: "location",
      parentId: "71",
      description: "Details about SRM Kattankulathur Campus",
      address: "SRM Nagar, Kattankulathur, Tamil Nadu",
      capacity: 1400,
      status: "active",
      createdDate: "2021-03-12",
      contactPerson: "Mr. Deepak",
      phone: "044-27455512",
      email: "deepak@srmist.edu.in",
    },
    {
      id: "74",
      name: "Second Year",
      code: "TN074",
      type: "level",
      parentId: "72",
      description: "Second-year student details",
      status: "active",
      createdDate: "2024-04-10",
      contactPerson: "Ms. Nivetha",
      phone: "044-27455513",
      email: "nivetha@srmist.edu.in",
    },
    {
      id: "75",
      name: "Vellore Institute of Technology",
      code: "TN075",
      type: "institution",
      description: "Details about VIT",
      address: "Katpadi, Vellore, Tamil Nadu",
      capacity: 1700,
      status: "active",
      createdDate: "2020-11-17",
      contactPerson: "Dr. Bhaskar",
      phone: "0416-2243091",
      email: "bhaskar@vit.ac.in",
    },
    {
      id: "76",
      name: "Information Security",
      code: "TN076",
      type: "department",
      parentId: "75",
      description: "Cyber security and information systems",
      address: "VIT Campus, Vellore",
      status: "active",
      createdDate: "2023-06-25",
      contactPerson: "Prof. Lavanya",
      phone: "0416-2243092",
      email: "lavanya@vit.ac.in",
    },
    {
      id: "77",
      name: "Katpadi Campus",
      code: "TN077",
      type: "location",
      parentId: "75",
      description: "VIT main campus details",
      address: "Katpadi, Vellore, Tamil Nadu",
      capacity: 1200,
      status: "active",
      createdDate: "2022-07-05",
      contactPerson: "Mr. Naveen",
      phone: "0416-2243093",
      email: "naveen@vit.ac.in",
    },
    {
      id: "78",
      name: "Research Scholars",
      code: "TN078",
      type: "level",
      parentId: "76",
      description: "Details about PhD and research scholars",
      status: "active",
      createdDate: "2023-11-10",
      contactPerson: "Ms. Haripriya",
      phone: "0416-2243094",
      email: "haripriya@vit.ac.in",
    },
    {
      id: "79",
      name: "Karunya Institute of Technology",
      code: "TN079",
      type: "institution",
      description: "Karunya Deemed University information",
      address: "Karunya Nagar, Coimbatore, Tamil Nadu",
      capacity: 1100,
      status: "inactive",
      createdDate: "2021-02-14",
      contactPerson: "Dr. Pradeep",
      phone: "0422-2614300",
      email: "pradeep@karunya.edu",
    },
    {
      id: "80",
      name: "Robotics and Automation",
      code: "TN080",
      type: "department",
      parentId: "79",
      description: "Automation and robotics department info",
      address: "Karunya Campus, Coimbatore",
      status: "active",
      createdDate: "2023-01-01",
      contactPerson: "Prof. Shalini",
      phone: "0422-2614301",
      email: "shalini@karunya.edu",
    },
    {
      id: "81",
      name: "Karunya Nagar Campus",
      code: "TN081",
      type: "location",
      parentId: "79",
      description: "Campus location in Karunya Nagar",
      address: "Karunya Nagar, Coimbatore, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2022-09-12",
      contactPerson: "Mr. Kiran",
      phone: "0422-2614302",
      email: "kiran@karunya.edu",
    },
    {
      id: "82",
      name: "Fourth Semester",
      code: "TN082",
      type: "level",
      parentId: "80",
      description: "Details about Fourth Semester students",
      status: "active",
      createdDate: "2024-02-20",
      contactPerson: "Ms. Janani",
      phone: "0422-2614303",
      email: "janani@karunya.edu",
    },
    {
      id: "83",
      name: "Thiagarajar College of Engineering",
      code: "TN083",
      type: "institution",
      description: "TCE Madurai information",
      address: "Thiruparankundram, Madurai, Tamil Nadu",
      capacity: 1000,
      status: "active",
      createdDate: "2020-06-18",
      contactPerson: "Dr. Senthil",
      phone: "0452-2482240",
      email: "senthil@tce.edu",
    },
    {
      id: "84",
      name: "Automobile Engineering",
      code: "TN084",
      type: "department",
      parentId: "83",
      description: "Automobile department overview",
      address: "TCE Campus, Madurai",
      status: "active",
      createdDate: "2023-05-25",
      contactPerson: "Prof. Meera",
      phone: "0452-2482241",
      email: "meera@tce.edu",
    },
    {
      id: "85",
      name: "Madurai Campus",
      code: "TN085",
      type: "location",
      parentId: "83",
      description: "Details about TCE Madurai Campus",
      address: "Thiruparankundram, Madurai, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2021-12-09",
      contactPerson: "Mr. Dinesh",
      phone: "0452-2482242",
      email: "dinesh@tce.edu",
    },
    {
      id: "86",
      name: "Evening Batch",
      code: "TN086",
      type: "level",
      parentId: "84",
      description: "Evening batch students information",
      status: "active",
      createdDate: "2023-09-01",
      contactPerson: "Ms. Sowmiya",
      phone: "0452-2482243",
      email: "sowmiya@tce.edu",
    },
    {
      id: "87",
      name: "Alagappa University",
      code: "TN087",
      type: "institution",
      description: "Details about Alagappa University",
      address: "Karaikudi, Tamil Nadu",
      capacity: 1200,
      status: "active",
      createdDate: "2022-10-18",
      contactPerson: "Dr. Murugan",
      phone: "04565-223100",
      email: "murugan@alagappauniv.ac.in",
    },
    {
      id: "88",
      name: "Education Technology",
      code: "TN088",
      type: "department",
      parentId: "87",
      description: "EdTech department overview",
      address: "Alagappa Campus, Karaikudi",
      status: "active",
      createdDate: "2023-03-30",
      contactPerson: "Prof. Revathi",
      phone: "04565-223101",
      email: "revathi@alagappauniv.ac.in",
    },
    {
      id: "89",
      name: "Karaikudi Campus",
      code: "TN089",
      type: "location",
      parentId: "87",
      description: "Main campus in Karaikudi",
      address: "College Road, Karaikudi, Tamil Nadu",
      capacity: 1000,
      status: "active",
      createdDate: "2021-10-05",
      contactPerson: "Mr. Aravind",
      phone: "04565-223102",
      email: "aravind@alagappauniv.ac.in",
    },
    {
      id: "90",
      name: "Online Program",
      code: "TN090",
      type: "level",
      parentId: "88",
      description: "Students enrolled in online learning mode",
      status: "active",
      createdDate: "2024-03-10",
      contactPerson: "Ms. Shobana",
      phone: "04565-223103",
      email: "shobana@alagappauniv.ac.in",
    },
    {
      id: "91",
      name: "Bharath Institute of Higher Education and Research",
      code: "TN091",
      type: "institution",
      description: "Details about Bharath Institute",
      address: "Selaiyur, Chennai, Tamil Nadu",
      capacity: 1300,
      status: "active",
      createdDate: "2022-06-18",
      contactPerson: "Dr. Karthikeyan",
      phone: "044-22290247",
      email: "karthikeyan@bharathuniv.ac.in",
    },
    {
      id: "92",
      name: "Mechanical Engineering",
      code: "TN092",
      type: "department",
      parentId: "91",
      description: "Mechanical Engineering Department",
      address: "BIHER Campus, Selaiyur",
      status: "active",
      createdDate: "2023-02-10",
      contactPerson: "Prof. Subhashini",
      phone: "044-22290248",
      email: "subhashini@bharathuniv.ac.in",
    },
    {
      id: "93",
      name: "Selaiyur Campus",
      code: "TN093",
      type: "location",
      parentId: "91",
      description: "Main campus in Selaiyur",
      address: "Tambaram East, Chennai, Tamil Nadu",
      capacity: 1100,
      status: "active",
      createdDate: "2021-12-01",
      contactPerson: "Mr. Arul",
      phone: "044-22290249",
      email: "arul@bharathuniv.ac.in",
    },
    {
      id: "94",
      name: "Third Semester",
      code: "TN094",
      type: "level",
      parentId: "92",
      description: "Details of third semester students",
      status: "active",
      createdDate: "2024-01-12",
      contactPerson: "Ms. Sangeetha",
      phone: "044-22290250",
      email: "sangeetha@bharathuniv.ac.in",
    },
    {
      id: "95",
      name: "Sastra University",
      code: "TN095",
      type: "institution",
      description: "Details about Sastra Deemed University",
      address: "Thirumalaisamudram, Thanjavur, Tamil Nadu",
      capacity: 1400,
      status: "active",
      createdDate: "2020-08-14",
      contactPerson: "Dr. Mahadevan",
      phone: "04362-264101",
      email: "mahadevan@sastra.ac.in",
    },
    {
      id: "96",
      name: "Electronics and Instrumentation",
      code: "TN096",
      type: "department",
      parentId: "95",
      description: "Details of EIE department",
      address: "Sastra Main Campus",
      status: "active",
      createdDate: "2023-05-05",
      contactPerson: "Prof. Malini",
      phone: "04362-264102",
      email: "malini@sastra.ac.in",
    },
    {
      id: "97",
      name: "Thanjavur Campus",
      code: "TN097",
      type: "location",
      parentId: "95",
      description: "Sastra University Campus, Thanjavur",
      address: "Thirumalaisamudram, Tamil Nadu",
      capacity: 1300,
      status: "active",
      createdDate: "2021-10-23",
      contactPerson: "Mr. Prem",
      phone: "04362-264103",
      email: "prem@sastra.ac.in",
    },
    {
      id: "98",
      name: "Final Year",
      code: "TN098",
      type: "level",
      parentId: "96",
      description: "Final year students information",
      status: "active",
      createdDate: "2024-03-04",
      contactPerson: "Ms. Sneha",
      phone: "04362-264104",
      email: "sneha@sastra.ac.in",
    },
    {
      id: "99",
      name: "Government College of Technology",
      code: "TN099",
      type: "institution",
      description: "Govt. Engineering College in Coimbatore",
      address: "Thadagam Road, Coimbatore, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2022-04-11",
      contactPerson: "Dr. Anbarasu",
      phone: "0422-2432221",
      email: "anbarasu@gct.ac.in",
    },
    {
      id: "100",
      name: "Textile Technology",
      code: "TN100",
      type: "department",
      parentId: "99",
      description: "Department of Textile Tech at GCT",
      address: "GCT Campus, Coimbatore",
      status: "active",
      createdDate: "2023-06-01",
      contactPerson: "Prof. Raji",
      phone: "0422-2432222",
      email: "raji@gct.ac.in",
    },
    {
      id: "101",
      name: "PSG College of Technology",
      code: "TN101",
      type: "institution",
      description: "Details about PSG Tech",
      address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu",
      capacity: 1600,
      status: "active",
      createdDate: "2020-09-01",
      contactPerson: "Dr. Jayakumar",
      phone: "0422-2572177",
      email: "jayakumar@psgtech.ac.in",
    },
    {
      id: "102",
      name: "Civil Engineering",
      code: "TN102",
      type: "department",
      parentId: "101",
      description: "Civil Engineering Department",
      address: "PSG Tech Main Block",
      status: "active",
      createdDate: "2022-03-12",
      contactPerson: "Prof. Priya",
      phone: "0422-2572188",
      email: "priya@psgtech.ac.in",
    },
    {
      id: "103",
      name: "Peelamedu Campus",
      code: "TN103",
      type: "location",
      parentId: "101",
      description: "Main PSG Tech Campus",
      address: "Peelamedu, Coimbatore, Tamil Nadu",
      capacity: 1400,
      status: "active",
      createdDate: "2021-11-10",
      contactPerson: "Mr. Dinesh",
      phone: "0422-2572199",
      email: "dinesh@psgtech.ac.in",
    },
    {
      id: "104",
      name: "Second Year",
      code: "TN104",
      type: "level",
      parentId: "102",
      description: "Details of Second Year Civil students",
      status: "active",
      createdDate: "2023-02-15",
      contactPerson: "Ms. Pavithra",
      phone: "0422-2572200",
      email: "pavithra@psgtech.ac.in",
    },
    {
      id: "105",
      name: "SRM Institute of Science and Technology",
      code: "TN105",
      type: "institution",
      description: "Details about SRMIST",
      address: "Kattankulathur, Chengalpattu District, Tamil Nadu",
      capacity: 2000,
      status: "active",
      createdDate: "2019-08-20",
      contactPerson: "Dr. Ganesh",
      phone: "044-27417000",
      email: "ganesh@srmist.edu.in",
    },
    {
      id: "106",
      name: "Computer Science Engineering",
      code: "TN106",
      type: "department",
      parentId: "105",
      description: "CSE Department of SRM",
      address: "SRM Main Block",
      status: "active",
      createdDate: "2022-01-25",
      contactPerson: "Prof. Lavanya",
      phone: "044-27417001",
      email: "lavanya@srmist.edu.in",
    },
    {
      id: "107",
      name: "Kattankulathur Campus",
      code: "TN107",
      type: "location",
      parentId: "105",
      description: "Main campus of SRMIST",
      address: "SRM Nagar, Kattankulathur, Tamil Nadu",
      capacity: 1900,
      status: "active",
      createdDate: "2021-06-18",
      contactPerson: "Mr. Mani",
      phone: "044-27417002",
      email: "mani@srmist.edu.in",
    },
    {
      id: "108",
      name: "Fourth Year",
      code: "TN108",
      type: "level",
      parentId: "106",
      description: "Final year Computer Science students",
      status: "active",
      createdDate: "2023-07-03",
      contactPerson: "Ms. Swathi",
      phone: "044-27417003",
      email: "swathi@srmist.edu.in",
    },
    {
      id: "109",
      name: "Madurai Kamaraj University",
      code: "TN109",
      type: "institution",
      description: "Details about MKU",
      address: "Palkalai Nagar, Madurai, Tamil Nadu",
      capacity: 1200,
      status: "active",
      createdDate: "2020-04-11",
      contactPerson: "Dr. Ravi",
      phone: "0452-2458471",
      email: "ravi@mkuniversity.ac.in",
    },
    {
      id: "110",
      name: "Physics Department",
      code: "TN110",
      type: "department",
      parentId: "109",
      description: "Physics Department at MKU",
      address: "Science Block, MKU Campus",
      status: "active",
      createdDate: "2022-05-07",
      contactPerson: "Prof. Meena",
      phone: "0452-2458472",
      email: "meena@mkuniversity.ac.in",
    },
    {
      id: "111",
      name: "Palkalai Nagar Campus",
      code: "TN111",
      type: "location",
      parentId: "109",
      description: "MKU's main campus",
      address: "Palkalai Nagar, Madurai",
      capacity: 1000,
      status: "active",
      createdDate: "2021-08-24",
      contactPerson: "Mr. Arvind",
      phone: "0452-2458473",
      email: "arvind@mkuniversity.ac.in",
    },
    {
      id: "112",
      name: "Postgraduate Level",
      code: "TN112",
      type: "level",
      parentId: "110",
      description: "Postgraduate Physics students",
      status: "active",
      createdDate: "2023-03-12",
      contactPerson: "Ms. Divya",
      phone: "0452-2458474",
      email: "divya@mkuniversity.ac.in",
    },
    {
      id: "113",
      name: "Alagappa University",
      code: "TN113",
      type: "institution",
      description: "Details about Alagappa University",
      address: "College Road, Karaikudi, Tamil Nadu",
      capacity: 950,
      status: "active",
      createdDate: "2019-12-02",
      contactPerson: "Dr. Sivan",
      phone: "04565-226001",
      email: "sivan@alagappauniv.ac.in",
    },
    {
      id: "114",
      name: "Mathematics Department",
      code: "TN114",
      type: "department",
      parentId: "113",
      description: "Department of Mathematics",
      address: "Main Academic Block",
      status: "active",
      createdDate: "2022-09-21",
      contactPerson: "Prof. Keerthi",
      phone: "04565-226002",
      email: "keerthi@alagappauniv.ac.in",
    },
    {
      id: "115",
      name: "Karaikudi Campus",
      code: "TN115",
      type: "location",
      parentId: "113",
      description: "Main campus in Karaikudi",
      address: "Karaikudi, Tamil Nadu",
      capacity: 880,
      status: "active",
      createdDate: "2021-02-14",
      contactPerson: "Mr. Naveen",
      phone: "04565-226003",
      email: "naveen@alagappauniv.ac.in",
    },
    {
      id: "116",
      name: "Ph.D Level",
      code: "TN116",
      type: "level",
      parentId: "114",
      description: "Ph.D students of Mathematics",
      status: "active",
      createdDate: "2023-11-01",
      contactPerson: "Ms. Rekha",
      phone: "04565-226004",
      email: "rekha@alagappauniv.ac.in",
    },
    {
      id: "117",
      name: "Periyar University",
      code: "TN117",
      type: "institution",
      description: "State University in Salem, TN",
      address: "Periyar Palkalai Nagar, Salem, Tamil Nadu",
      capacity: 1050,
      status: "active",
      createdDate: "2020-07-16",
      contactPerson: "Dr. Arumugam",
      phone: "0427-2345766",
      email: "arumugam@periyaruniv.ac.in",
    },
    {
      id: "118",
      name: "Biochemistry Department",
      code: "TN118",
      type: "department",
      parentId: "117",
      description: "Biochemistry studies and research",
      address: "Science Block, Periyar University",
      status: "active",
      createdDate: "2022-08-01",
      contactPerson: "Prof. Gayathri",
      phone: "0427-2345767",
      email: "gayathri@periyaruniv.ac.in",
    },
    {
      id: "119",
      name: "Salem Campus",
      code: "TN119",
      type: "location",
      parentId: "117",
      description: "Main University campus in Salem",
      address: "Periyar Palkalai Nagar, Salem",
      capacity: 950,
      status: "active",
      createdDate: "2021-09-11",
      contactPerson: "Mr. Harish",
      phone: "0427-2345768",
      email: "harish@periyaruniv.ac.in",
    },
    {
      id: "120",
      name: "Undergraduate Level",
      code: "TN120",
      type: "level",
      parentId: "118",
      description: "UG level Biochemistry students",
      status: "active",
      createdDate: "2023-10-20",
      contactPerson: "Ms. Deepa",
      phone: "0427-2345769",
      email: "deepa@periyaruniv.ac.in",
    },
    {
      id: "121",
      name: "Bharathiar University",
      code: "TN121",
      type: "institution",
      description: "Details about Bharathiar University",
      address: "Maruthamalai Road, Coimbatore, Tamil Nadu",
      capacity: 1300,
      status: "active",
      createdDate: "2020-01-08",
      contactPerson: "Dr. Shanmugam",
      phone: "0422-2428100",
      email: "shanmugam@buc.edu.in",
    },
    {
      id: "122",
      name: "Zoology Department",
      code: "TN122",
      type: "department",
      parentId: "121",
      description: "Department of Zoology",
      address: "Science Block, Bharathiar University",
      status: "active",
      createdDate: "2022-06-12",
      contactPerson: "Prof. Kalaivani",
      phone: "0422-2428101",
      email: "kalaivani@buc.edu.in",
    },
    {
      id: "123",
      name: "Coimbatore Campus",
      code: "TN123",
      type: "location",
      parentId: "121",
      description: "Main Campus of Bharathiar University",
      address: "Maruthamalai, Coimbatore",
      capacity: 1100,
      status: "active",
      createdDate: "2021-10-15",
      contactPerson: "Mr. Balaji",
      phone: "0422-2428102",
      email: "balaji@buc.edu.in",
    },
    {
      id: "124",
      name: "M.Phil Level",
      code: "TN124",
      type: "level",
      parentId: "122",
      description: "M.Phil level students in Zoology",
      status: "active",
      createdDate: "2023-05-01",
      contactPerson: "Ms. Mahalakshmi",
      phone: "0422-2428103",
      email: "mahalakshmi@buc.edu.in",
    },
    {
      id: "125",
      name: "Tamil University",
      code: "TN125",
      type: "institution",
      description: "Specialized university for Tamil studies",
      address: "Thanjavur, Tamil Nadu",
      capacity: 800,
      status: "active",
      createdDate: "2018-09-27",
      contactPerson: "Dr. Natarajan",
      phone: "04362-226720",
      email: "natarajan@tamiluniv.ac.in",
    },
    {
      id: "126",
      name: "Tamil Literature Department",
      code: "TN126",
      type: "department",
      parentId: "125",
      description: "Department for Tamil Literature studies",
      address: "Main Academic Block",
      status: "active",
      createdDate: "2022-02-18",
      contactPerson: "Prof. Revathi",
      phone: "04362-226721",
      email: "revathi@tamiluniv.ac.in",
    },
    {
      id: "127",
      name: "Thanjavur Campus",
      code: "TN127",
      type: "location",
      parentId: "125",
      description: "Campus of Tamil University",
      address: "Thanjavur, Tamil Nadu",
      capacity: 750,
      status: "active",
      createdDate: "2021-01-10",
      contactPerson: "Mr. Babu",
      phone: "04362-226722",
      email: "babu@tamiluniv.ac.in",
    },
    {
      id: "128",
      name: "Research Level",
      code: "TN128",
      type: "level",
      parentId: "126",
      description: "Doctoral level Tamil studies",
      status: "active",
      createdDate: "2023-08-11",
      contactPerson: "Ms. Kavitha",
      phone: "04362-226723",
      email: "kavitha@tamiluniv.ac.in",
    },
    {
      id: "129",
      name: "Vellore Institute of Technology",
      code: "TN129",
      type: "institution",
      description: "Deemed university for science and tech",
      address: "Katpadi, Vellore, Tamil Nadu",
      capacity: 2000,
      status: "active",
      createdDate: "2017-07-01",
      contactPerson: "Dr. Deepak",
      phone: "0416-2202020",
      email: "deepak@vit.ac.in",
    },
    {
      id: "130",
      name: "Biotechnology Department",
      code: "TN130",
      type: "department",
      parentId: "129",
      description: "Biotechnology research and teaching",
      address: "VIT Main Block",
      status: "active",
      createdDate: "2021-04-05",
      contactPerson: "Prof. Sneha",
      phone: "0416-2202021",
      email: "sneha@vit.ac.in",
    },
    {
      id: "131",
      name: "VIT Vellore Campus",
      code: "TN131",
      type: "location",
      parentId: "129",
      description: "Main campus of VIT in Katpadi",
      address: "Katpadi, Vellore",
      capacity: 1800,
      status: "active",
      createdDate: "2020-10-01",
      contactPerson: "Mr. Arul",
      phone: "0416-2202022",
      email: "arul@vit.ac.in",
    },
    {
      id: "132",
      name: "Integrated M.Sc. Level",
      code: "TN132",
      type: "level",
      parentId: "130",
      description: "5-year integrated M.Sc. Biotechnology program",
      status: "active",
      createdDate: "2023-09-12",
      contactPerson: "Ms. Sandhya",
      phone: "0416-2202023",
      email: "sandhya@vit.ac.in",
    },
    {
      id: "133",
      name: "Manonmaniam Sundaranar University",
      code: "TN133",
      type: "institution",
      description: "State university located in Tirunelveli",
      address: "Abishekapatti, Tirunelveli, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2018-12-05",
      contactPerson: "Dr. Mohanraj",
      phone: "0462-2333741",
      email: "mohanraj@msuniv.ac.in",
    },
    {
      id: "134",
      name: "History Department",
      code: "TN134",
      type: "department",
      parentId: "133",
      description: "Department of History studies",
      address: "Main Block, MSU Campus",
      status: "active",
      createdDate: "2022-10-01",
      contactPerson: "Prof. Uma",
      phone: "0462-2333742",
      email: "uma@msuniv.ac.in",
    },
    {
      id: "135",
      name: "Tirunelveli Campus",
      code: "TN135",
      type: "location",
      parentId: "133",
      description: "Campus at Abishekapatti, Tirunelveli",
      address: "Tirunelveli, Tamil Nadu",
      capacity: 880,
      status: "active",
      createdDate: "2021-02-10",
      contactPerson: "Mr. Harikrishnan",
      phone: "0462-2333743",
      email: "harikrishnan@msuniv.ac.in",
    },
    {
      id: "136",
      name: "First Year UG",
      code: "TN136",
      type: "level",
      parentId: "134",
      description: "First-year students in History",
      status: "active",
      createdDate: "2023-04-16",
      contactPerson: "Ms. Ranjani",
      phone: "0462-2333744",
      email: "ranjani@msuniv.ac.in",
    },
    {
      id: "137",
      name: "Mother Teresa Women’s University",
      code: "TN137",
      type: "institution",
      description: "Women-focused university in Kodaikanal",
      address: "Attuvampatti, Kodaikanal, Tamil Nadu",
      capacity: 600,
      status: "active",
      createdDate: "2019-11-12",
      contactPerson: "Dr. Vasanthi",
      phone: "04542-241122",
      email: "vasanthi@mtwu.ac.in",
    },
    {
      id: "138",
      name: "Women’s Studies Department",
      code: "TN138",
      type: "department",
      parentId: "137",
      description: "Dedicated to women and gender studies",
      address: "Main Block, MTWU Campus",
      status: "active",
      createdDate: "2022-12-01",
      contactPerson: "Prof. Janani",
      phone: "04542-241123",
      email: "janani@mtwu.ac.in",
    },
    {
      id: "139",
      name: "Kodaikanal Campus",
      code: "TN139",
      type: "location",
      parentId: "137",
      description: "Main MTWU campus in Kodaikanal",
      address: "Attuvampatti, Tamil Nadu",
      capacity: 620,
      status: "active",
      createdDate: "2020-08-19",
      contactPerson: "Mr. Murugan",
      phone: "04542-241124",
      email: "murugan@mtwu.ac.in",
    },
    {
      id: "140",
      name: "Postgraduate Diploma",
      code: "TN140",
      type: "level",
      parentId: "138",
      description: "PG diploma in Women’s Studies",
      status: "active",
      createdDate: "2023-06-08",
      contactPerson: "Ms. Anupriya",
      phone: "04542-241125",
      email: "anupriya@mtwu.ac.in",
    },
    {
      id: "141",
      name: "Periyar University",
      code: "TN141",
      type: "institution",
      description: "Periyar University based in Salem, Tamil Nadu",
      address: "Periyar Palkalai Nagar, Salem, Tamil Nadu",
      capacity: 1100,
      status: "active",
      createdDate: "2018-06-12",
      contactPerson: "Dr. Ilango",
      phone: "0427-2345766",
      email: "ilango@periyaruniv.ac.in",
    },
    {
      id: "142",
      name: "Commerce Department",
      code: "TN142",
      type: "department",
      parentId: "141",
      description: "Handles UG and PG commerce programs",
      address: "Commerce Block, Periyar University",
      status: "active",
      createdDate: "2021-09-15",
      contactPerson: "Prof. Sumathi",
      phone: "0427-2345767",
      email: "sumathi@periyaruniv.ac.in",
    },
    {
      id: "143",
      name: "Salem Campus",
      code: "TN143",
      type: "location",
      parentId: "141",
      description: "Main campus of Periyar University",
      address: "Periyar Nagar, Salem",
      capacity: 950,
      status: "active",
      createdDate: "2020-02-28",
      contactPerson: "Mr. Ramesh",
      phone: "0427-2345768",
      email: "ramesh@periyaruniv.ac.in",
    },
    {
      id: "144",
      name: "Final Year B.Com",
      code: "TN144",
      type: "level",
      parentId: "142",
      description: "Final year students in Commerce",
      status: "active",
      createdDate: "2023-04-01",
      contactPerson: "Ms. Rathi",
      phone: "0427-2345769",
      email: "rathi@periyaruniv.ac.in",
    },
    {
      id: "145",
      name: "Alagappa University",
      code: "TN145",
      type: "institution",
      description: "University located in Karaikudi",
      address: "College Road, Karaikudi, Tamil Nadu",
      capacity: 900,
      status: "active",
      createdDate: "2017-08-08",
      contactPerson: "Dr. Ravi",
      phone: "04565-226250",
      email: "ravi@alagappauniv.ac.in",
    },
    {
      id: "146",
      name: "Mathematics Department",
      code: "TN146",
      type: "department",
      parentId: "145",
      description: "Mathematics UG, PG and PhD courses",
      address: "Math Block, Alagappa University",
      status: "active",
      createdDate: "2021-01-10",
      contactPerson: "Prof. Hemalatha",
      phone: "04565-226251",
      email: "hemalatha@alagappauniv.ac.in",
    },
    {
      id: "147",
      name: "Karaikudi Campus",
      code: "TN147",
      type: "location",
      parentId: "145",
      description: "Campus in Karaikudi",
      address: "College Road, Karaikudi",
      capacity: 800,
      status: "active",
      createdDate: "2020-10-01",
      contactPerson: "Mr. Dinesh",
      phone: "04565-226252",
      email: "dinesh@alagappauniv.ac.in",
    },
    {
      id: "148",
      name: "First Year MSc",
      code: "TN148",
      type: "level",
      parentId: "146",
      description: "MSc Mathematics students in first year",
      status: "active",
      createdDate: "2023-06-15",
      contactPerson: "Ms. Divya",
      phone: "04565-226253",
      email: "divya@alagappauniv.ac.in",
    },
    {
      id: "149",
      name: "Annamalai University",
      code: "TN149",
      type: "institution",
      description: "One of the largest public residential universities",
      address: "Annamalainagar, Chidambaram, Tamil Nadu",
      capacity: 1700,
      status: "active",
      createdDate: "2016-11-19",
      contactPerson: "Dr. Kannan",
      phone: "04144-238282",
      email: "kannan@annamalaiuniv.ac.in",
    },
    {
      id: "150",
      name: "Agriculture Department",
      code: "TN150",
      type: "department",
      parentId: "149",
      description: "Studies in Agricultural Science",
      address: "Agri Block, Annamalai University",
      status: "active",
      createdDate: "2022-03-10",
      contactPerson: "Prof. Leela",
      phone: "04144-238283",
      email: "leela@annamalaiuniv.ac.in",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [newEntity, setNewEntity] = useState({
    name: "",
    code: "",
    type: "department",
    parentId: "none",
    description: "",
    address: "",
    capacity: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "institution":
        return <School className="h-4 w-4" />;
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
      case "institution":
        return "bg-blue-100 text-blue-800";
      case "department":
        return "bg-green-100 text-green-800";
      case "location":
        return "bg-purple-100 text-purple-800";
      case "level":
        return "bg-orange-100 text-orange-800";
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
      false ||
      entity.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesType = filterType === "all" || entity.type === filterType;
    const matchesStatus =
      filterStatus === "all" || entity.status === filterStatus;
    const matchesTab = activeTab === "all" || entity.type === activeTab;

    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntities = filteredEntities.slice(startIndex, endIndex);

  // Update total items when filtered entities change
  React.useEffect(() => {
    setTotalItems(filteredEntities.length);
    // Reset to first page if current page is out of bounds
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
    setCurrentPage(1); // Reset to first page
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
    institutions: entities.filter((e) => e.type === "institution").length,
    departments: entities.filter((e) => e.type === "department").length,
    locations: entities.filter((e) => e.type === "location").length,
    levels: entities.filter((e) => e.type === "level").length,
    active: entities.filter((e) => e.status === "active").length,
    total: entities.length,
  };

  const handleCreateEntity = () => {
    const entity: Entity = {
      id: Date.now().toString(),
      ...newEntity,
      parentId: newEntity.parentId === "none" ? undefined : newEntity.parentId,
      capacity: newEntity.capacity ? parseInt(newEntity.capacity) : undefined,
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setEntities([...entities, entity]);
    setNewEntity({
      name: "",
      code: "",
      type: "department",
      parentId: "none",
      description: "",
      address: "",
      capacity: "",
      contactPerson: "",
      phone: "",
      email: "",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditEntity = () => {
    if (selectedEntity) {
      const updatedEntity = {
        ...selectedEntity,
        ...newEntity,
        parentId:
          newEntity.parentId === "none" ? undefined : newEntity.parentId,
        capacity: newEntity.capacity
          ? parseInt(newEntity.capacity)
          : selectedEntity.capacity,
      };

      setEntities(
        entities.map((e) => (e.id === selectedEntity.id ? updatedEntity : e)),
      );
      setIsEditDialogOpen(false);
      setSelectedEntity(null);
      setNewEntity({
        name: "",
        code: "",
        type: "department",
        parentId: "none",
        description: "",
        address: "",
        capacity: "",
        contactPerson: "",
        phone: "",
        email: "",
      });
    }
  };

  const handleDeleteEntity = () => {
    if (selectedEntity) {
      setEntities(entities.filter((e) => e.id !== selectedEntity.id));
      setSelectedEntity(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (entity: Entity) => {
    setSelectedEntity(entity);
    setNewEntity({
      name: entity.name,
      code: entity.code,
      type: entity.type,
      parentId: entity.parentId || "none",
      description: entity.description,
      address: entity.address || "",
      capacity: entity.capacity?.toString() || "",
      contactPerson: entity.contactPerson || "",
      phone: entity.phone || "",
      email: entity.email || "",
    });
    setIsEditDialogOpen(true);
  };

  const institutions = entities.filter((e) => e.type === "institution");

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
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="h-4 w-4 mr-2" />
                Add Entity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Entity</DialogTitle>
                <DialogDescription>
                  Add a new institutional entity (institution, department,
                  location, or level)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Entity Name</Label>
                    <Input
                      id="name"
                      value={newEntity.name}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, name: e.target.value })
                      }
                      placeholder="Computer Science Department"
                    />
                  </div>
                  <div>
                    <Label htmlFor="code">Entity Code</Label>
                    <Input
                      id="code"
                      value={newEntity.code}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, code: e.target.value })
                      }
                      placeholder="CSE"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="institution">Institution</SelectItem>
                        <SelectItem value="department">Department</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="level">Academic Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="parentId">Parent Institution</Label>
                    <Select
                      value={newEntity.parentId}
                      onValueChange={(value) =>
                        setNewEntity({ ...newEntity, parentId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {institutions.map((inst) => (
                          <SelectItem key={inst.id} value={inst.id}>
                            {inst.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Address (optional)</Label>
                    <Input
                      id="address"
                      value={newEntity.address}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, address: e.target.value })
                      }
                      placeholder="Building address or location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity (optional)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newEntity.capacity}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, capacity: e.target.value })
                      }
                      placeholder="Maximum capacity"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={newEntity.contactPerson}
                      onChange={(e) =>
                        setNewEntity({
                          ...newEntity,
                          contactPerson: e.target.value,
                        })
                      }
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newEntity.phone}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, phone: e.target.value })
                      }
                      placeholder="+1-234-567-8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEntity.email}
                      onChange={(e) =>
                        setNewEntity({ ...newEntity, email: e.target.value })
                      }
                      placeholder="contact@university.edu"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateEntity}
                    disabled={!newEntity.name || !newEntity.code}
                  >
                    Create Entity
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Institutions
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.institutions}
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
                <p className="text-sm font-medium text-green-600">
                  Departments
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {stats.departments}
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
                <p className="text-sm font-medium text-purple-600">Locations</p>
                <p className="text-3xl font-bold text-purple-900">
                  {stats.locations}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  Academic Levels
                </p>
                <p className="text-3xl font-bold text-orange-900">
                  {stats.levels}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
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
            <SelectItem value="institution">Institution</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="level">Academic Level</SelectItem>
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
          <TabsTrigger value="institution">Institutions</TabsTrigger>
          <TabsTrigger value="department">Departments</TabsTrigger>
          <TabsTrigger value="location">Locations</TabsTrigger>
          <TabsTrigger value="level">Levels</TabsTrigger>
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
                          <Badge
                            variant="outline"
                            className={getStatusColor(entity.status)}
                          >
                            {entity.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">
                            {entity.capacity || "N/A"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div>{entity.contactPerson || "N/A"}</div>
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
                              onClick={() => {
                                setSelectedEntity(entity);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(entity)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedEntity(entity);
                                setIsDeleteDialogOpen(true);
                              }}
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

      {/* View Entity Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedEntity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getTypeIcon(selectedEntity.type)}
                  {selectedEntity.name}
                </DialogTitle>
                <DialogDescription>
                  Entity Code: {selectedEntity.code}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Type
                    </Label>
                    <Badge
                      variant="outline"
                      className={getTypeColor(selectedEntity.type)}
                    >
                      {selectedEntity.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedEntity.status)}
                    >
                      {selectedEntity.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Description
                  </Label>
                  <p className="text-sm mt-1">{selectedEntity.description}</p>
                </div>
                {selectedEntity.address && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Address
                    </Label>
                    <p className="text-sm mt-1">{selectedEntity.address}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Capacity
                    </Label>
                    <p className="text-sm">
                      {selectedEntity.capacity || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Created Date
                    </Label>
                    <p className="text-sm">{selectedEntity.createdDate}</p>
                  </div>
                </div>
                {(selectedEntity.contactPerson ||
                  selectedEntity.phone ||
                  selectedEntity.email) && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Contact Information
                    </Label>
                    <div className="text-sm mt-1 space-y-1">
                      {selectedEntity.contactPerson && (
                        <p>Person: {selectedEntity.contactPerson}</p>
                      )}
                      {selectedEntity.phone && (
                        <p>Phone: {selectedEntity.phone}</p>
                      )}
                      {selectedEntity.email && (
                        <p>Email: {selectedEntity.email}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Entity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Entity</DialogTitle>
            <DialogDescription>
              Update entity information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Entity Name</Label>
                <Input
                  id="edit-name"
                  value={newEntity.name}
                  onChange={(e) =>
                    setNewEntity({ ...newEntity, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-code">Entity Code</Label>
                <Input
                  id="edit-code"
                  value={newEntity.code}
                  onChange={(e) =>
                    setNewEntity({ ...newEntity, code: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Entity Type</Label>
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
                    <SelectItem value="institution">Institution</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="level">Academic Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={newEntity.capacity}
                  onChange={(e) =>
                    setNewEntity({ ...newEntity, capacity: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newEntity.description}
                onChange={(e) =>
                  setNewEntity({ ...newEntity, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditEntity}>Update Entity</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEntity}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
