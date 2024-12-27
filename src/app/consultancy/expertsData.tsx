import { Expert } from "@/types/experts";


const expertsData: Record<string, Expert[]> = {
    'orthopedist': [
        {
            id: "1",
            name: "Amy Harmer",
            image: "/img/consultant/Amy-Harmer.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "Amy spent a couple of years working alongside an amateur rugby club based in Doncaster providing weekly MSK clinics and pitch-side first aid for first team players.",
            location: "Northampton, England",
            contact_number: "01604 601641",
            profession: "Orthopedist",
            email: "amy.harmer@example.com"
        },
        {
            id: "2",
            name: "John Smith",
            image: "/img/consultant/doc1.jpg",
            certification: "MD, Orthopedic Surgery",
            description: "John is a highly skilled orthopedic surgeon with over 15 years of experience in joint replacement and sports medicine.",
            location: "London, England",
            contact_number: "020 7946 0354",
            profession: "Orthopedist",
            email: "john.smith@example.com"
        },
        {
            id: "3",
            name: "Sarah Johnson",
            image: "/img/consultant/doc2.jpg",
            certification: "DO, Orthopedic Medicine",
            description: "Sarah specializes in non-surgical treatments for orthopedic conditions and has a particular interest in regenerative medicine.",
            location: "Manchester, England",
            contact_number: "0161 456 7890",
            profession: "Orthopedist",
            email: "sarah.johnson@example.com"
        },
        {
            id: "4",
            name: "Michael Chen",
            image: "/img/consultant/doc3.jpg",
            certification: "MD, PhD, Orthopedic Research",
            description: "Michael combines clinical practice with cutting-edge research in orthopedic biomechanics and tissue engineering.",
            location: "Cambridge, England",
            contact_number: "01223 456789",
            profession: "Orthopedist",
            email: "michael.chen@example.com"
        },

        {
            id: "5",
            name: "Jessy Taylor",
            image: "/img/consultant/doc6.webp",
            certification: "DPT, Orthopedic Surgery",
            description: "Jessy works with athletes of all levels to prevent injuries, improve performance, and facilitate return to sport after injury.",
            location: "Leeds, England",
            contact_number: "0113 243 0000",
            profession: "Orthopedist",
            email: "jessy.taylor@example.com"
        }
    ],
    'physical-therapist': [
        {
            id: "1",
            name: "Lucy Eggleton",
            image: "/img/consultant/lucy.jpg",
            certification: "MPT, Orthopedic Certified Specialist",
            description: "She has insight and knowledge of multiple sports disciplines, from grassroots to elite level, reinforced by her own prior experiences as a national-level gymnast.",
            location: "Northampton, England",
            contact_number: "01604 601641",
            profession: "Physical Therapist",
            email: "lucy.eggleton@example.com"
        },
        {
            id: "2",
            name: "Amelia Brown",
            image: "/img/consultant/doc4.jpg",
            certification: "DPT, Certified Hand Therapist",
            description: "Amelia specializes in hand and upper extremity rehabilitation, helping patients recover from injuries and surgeries.",
            location: "Birmingham, England",
            contact_number: "0121 456 7890",
            profession: "Physical Therapist",
            email: "anelia.brown@example.com"
        },
        {
            id: "3",
            name: "Devid Wilson",
            image: "/img/consultant/doc5.jpg",
            certification: "MSc, Neurological Rehabilitation Specialist",
            description: "Devid focuses on helping patients with neurological conditions improve their mobility and quality of life.",
            location: "Bristol, England",
            contact_number: "0117 925 7900",
            profession: "Physical Therapist",
            email: "devid.wilson@example.com"
        },
        {
            id: "4",
            name: "Oliver Thompson",
            image: "/img/consultant/doc20.jpg",
            certification: "DPT, Sports Certified Specialist",
            description: "Oliver specializes in sports rehabilitation, helping athletes recover from injuries and improve their performance.",
            location: "Liverpool, England",
            contact_number: "0151 794 5000",
            profession: "Physical Therapist",
            email: "oliver.thompson@example.com"
        },
        {
            id: "5",
            name: "Emma Roberts",
            image: "/img/consultant/doc22.webp",
            certification: "MPT, Certified in Vestibular Rehabilitation",
            description: "Emma focuses on treating balance disorders and dizziness, helping patients regain their stability and confidence.",
            location: "Newcastle, England",
            contact_number: "0191 208 6000",
            profession: "Physical Therapist",
            email: "emma.roberts@example.com"
        }
    ],
    'massage-therapist': [
        {
            id: "1",
            name: "Marc Evans",
            image: "/img/consultant/marc.jpg",
            certification: "PhD in Rehabilitation Sciences",
            description: "Marc is known for his excellent diagnostic skills and hands-on approach to back and neck issues, sports and work injuries and conditions.",
            location: "Northampton, England",
            contact_number: "01604 601641",
            profession: "Massage Therapist",
            email: "marc.evans@example.com"
        },
        {
            id: "2",
            name: "Sophie Green",
            image: "/img/consultant/doc7.jpg",
            certification: "LMT, Certified in Swedish and Deep Tissue Massage",
            description: "Sophie specializes in relaxation and stress relief techniques, helping clients unwind and improve their overall well-being.",
            location: "Brighton, England",
            contact_number: "01273 123456",
            profession: "Massage Therapist",
            email: "sophie.green@example.com"
        },
        {
            id: "3",
            name: "Ryana Cooper",
            image: "/img/consultant/doc8.webp",
            certification: "LMT, Sports Massage Therapist",
            description: "Ryana works with athletes to improve performance, prevent injuries, and speed up recovery times through targeted massage techniques.",
            location: "Liverpool, England",
            contact_number: "0151 234 5678",
            profession: "Massage Therapist",
            email: "ryana.cooper@example.com"
        },
        {
            id: "4",
            name: "Jesson Lee",
            image: "/img/consultant/doc9.jpg",
            certification: "LMT, Certified in Thai Massage and Reflexology",
            description: "Jesson combines traditional Eastern techniques with Western massage to provide a holistic approach to healing and relaxation.",
            location: "Oxford, England",
            contact_number: "01865 987654",
            profession: "Massage Therapist",
            email: "jesson.patel@example.com"
        },
        {
            id: "5",
            name: "Oliver Wright",
            image: "/img/consultant/doc23.webp",
            certification: "LMT, Certified in Myofascial Release",
            description: "Oliver specializes in myofascial release techniques to help clients with chronic pain and restricted mobility.",
            location: "Leeds, England",
            contact_number: "0113 243 1751",
            profession: "Massage Therapist",
            email: "oliver.wright@example.com"
        },
        {
            id: "6",
            name: "Sophia Chen",
            image: "/img/consultant/doc24.jpg",
            certification: "LMT, Certified in Prenatal and Postnatal Massage",
            description: "Sophia focuses on providing safe and effective massage therapy for expectant mothers and new parents.",
            location: "Manchester, England",
            contact_number: "0161 275 2000",
            profession: "Massage Therapist",
            email: "sophia.chen@example.com"
        },
        {
            id: "7",
            name: "Ethan Foster",
            image: "/img/consultant/doc20.webp",
            certification: "LMT, Certified in Lymphatic Drainage Massage",
            description: "Ethan specializes in lymphatic drainage massage to help clients with swelling, inflammation, and detoxification.",
            location: "Bristol, England",
            contact_number: "0117 928 9000",
            profession: "Massage Therapist",
            email: "ethan.foster@example.com"
        },
        {
            id: "8",
            name: "Ava Patel",
            image: "/img/consultant/doc26.webp",
            certification: "LMT, Certified in Hot Stone Massage",
            description: "Ava combines traditional massage techniques with hot stone therapy to provide deep relaxation and pain relief.",
            location: "Birmingham, England",
            contact_number: "0121 414 3344",
            profession: "Massage Therapist",
            email: "ava.patel@example.com"
        }
    ],
    'exercise-physiologist': [
        {
            id: "1",
            name: "Phil Pask",
            image: "/img/consultant/Phil_Pask.jpg",
            certification: "DPT, Sports Physiotherapy Specialist",
            description: "Phil is one of the world's best Physiotherapists at rehabilitation and the treatment of acute and chronic musculoskeletal injuries",
            location: "Northampton, England",
            contact_number: "01604 601641",
            profession: "Exercise Physiologist",
            email: "phil.pask@example.com"
        },
        {
            id: "2",
            name: "Devin Thompson",
            image: "/img/consultant/doc10.jpg",
            certification: "PhD, Exercise Physiology",
            description: "Devin specializes in designing exercise programs for patients with chronic diseases, helping them improve their quality of life through targeted physical activity.",
            location: "Sheffield, England",
            contact_number: "0114 222 0000",
            profession: "Exercise Physiologist",
            email: "devin.thompson@example.com"
        },
        {
            id: "3",
            name: "Daniel Harris",
            image: "/img/consultant/doc11.jpg",
            certification: "MSc, Clinical Exercise Physiology",
            description: "Daniel focuses on cardiac rehabilitation, working with patients recovering from heart conditions to safely improve their cardiovascular health.",
            location: "Newcastle, England",
            contact_number: "0191 208 1234",
            profession: "Exercise Physiologist",
            email: "daniel.harris@example.com"
        },
        {
            id: "4",
            name: "Rachel Foster",
            image: "/img/consultant/doc12.jpg",
            certification: "BSc, Exercise Science, Certified Strength and Conditioning Specialist",
            description: "Rachel works with both athletes and general population clients to improve performance, body composition, and overall fitness levels.",
            location: "Southampton, England",
            contact_number: "023 8059 5000",
            profession: "Exercise Physiologist",
            email: "rachel.foster@example.com"
        },
        {
            id: "5",
            name: "Liam Johnson",
            image: "/img/consultant/doc27.jpg",
            certification: "PhD, Exercise Physiology, Certified Clinical Exercise Physiologist",
            description: "Liam specializes in exercise programs for patients with pulmonary diseases, helping them improve their respiratory function and quality of life.",
            location: "Edinburgh, Scotland",
            contact_number: "0131 650 1000",
            profession: "Exercise Physiologist",
            email: "liam.johnson@example.com"
        },
        {
            id: "6",
            name: "Zoe Williams",
            image: "/img/consultant/doc28.jpg",
            certification: "MSc, Exercise Physiology, Certified Diabetes Educator",
            description: "Zoe focuses on developing exercise programs for individuals with diabetes, helping them manage their condition through physical activity.",
            location: "Cardiff, Wales",
            contact_number: "029 2087 4000",
            profession: "Exercise Physiologist",
            email: "zoe.williams@example.com"
        },
        {
            id: "7",
            name: "Noah Taylor",
            image: "/img/consultant/doc29.jpg",
            certification: "BSc, Exercise Science, Certified Cancer Exercise Trainer",
            description: "Noah specializes in exercise programs for cancer patients and survivors, helping them improve their strength and endurance during and after treatment.",
            location: "Glasgow, Scotland",
            contact_number: "0141 330 2000",
            profession: "Exercise Physiologist",
            email: "noah.taylor@example.com"
        },
        {
            id: "8",
            name: "Isabella Martinez",
            image: "/img/consultant/doc30.webp",
            certification: "PhD, Exercise Physiology, Certified in Occupational Physiology",
            description: "Isabella focuses on improving workplace ergonomics and developing exercise programs to prevent work-related injuries and enhance employee wellness.",
            location: "Belfast, Northern Ireland",
            contact_number: "028 9024 5133",
            profession: "Exercise Physiologist",
            email: "isabella.martinez@example.com"
        },
        {
            id: "9",
            name: "Ethan Brown",
            image: "/img/consultant/doc21.webp",
            certification: "MSc, Exercise Physiology, Certified Strength and Conditioning Specialist",
            description: "Ethan specializes in performance enhancement for elite athletes, developing personalized training programs to improve power, speed, and endurance.",
            location: "Leicester, England",
            contact_number: "0116 252 2522",
            profession: "Exercise Physiologist",
            email: "ethan.brown@example.com"
        }
    ],
    "athletic-trainer": [
        {
            id: "1",
            name: "Tom Wilson",
            image: "/img/consultant/doc14.jpg",
            certification: "MSc, Certified Athletic Trainer",
            description: "Tom has extensive experience working with professional soccer teams, specializing in injury prevention and on-field emergency care.",
            location: "Manchester, England",
            contact_number: "0161 275 2000",
            profession: "Athletic Trainer",
            email: "tom.wilson@example.com"
        },
        {
            id: "2",
            name: "Emily Clark",
            image: "/img/consultant/doc13.jpg",
            certification: "BSc, Certified Strength and Conditioning Specialist",
            description: "Emily focuses on performance enhancement for track and field athletes, developing customized training programs to improve speed and power.",
            location: "Birmingham, England",
            contact_number: "0121 414 3344",
            profession: "Athletic Trainer",
            email: "emily.clark@example.com"
        },
        {
            id: "3",
            name: "Alex Nguyen",
            image: "/img/consultant/doc15.jpg",
            certification: "DPT, Sports Certified Specialist",
            description: "Alex combines athletic training with physical therapy to provide comprehensive care for athletes recovering from injuries and surgeries.",
            location: "London, England",
            contact_number: "020 7946 0000",
            profession: "Athletic Trainer",
            email: "alex.nguyen@example.com"
        },
        {
            id: "4",
            name: "Samanth Lee",
            image: "/img/consultant/doc16.jpg",
            certification: "MSc, Certified Athletic Trainer, Corrective Exercise Specialist",
            description: "Samantha specializes in postural analysis and corrective exercise, helping athletes and fitness enthusiasts optimize their movement patterns and prevent injuries.",
            location: "Leeds, England",
            contact_number: "0113 243 1751",
            profession: "Athletic Trainer",
            email: "samantha.lee@example.com"
        },
        {
            id: "5",
            name: "Olivia White",
            image: "/img/consultant/doc31.webp",
            certification: "MSc, Certified Athletic Trainer, Certified Kinesio Taping Practitioner",
            description: "Olivia specializes in using kinesio taping techniques to support injured muscles and joints, enhancing recovery and performance for athletes.",
            location: "Nottingham, England",
            contact_number: "0115 951 5151",
            profession: "Athletic Trainer",
            email: "olivia.white@example.com"
        },
        {
            id: "6",
            name: "Ethan Davis",
            image: "/img/consultant/doc33.jpeg",
            certification: "BSc, Certified Athletic Trainer, Certified Functional Strength Coach",
            description: "Ethan focuses on developing functional strength programs for athletes, improving their overall performance and reducing the risk of injuries.",
            location: "Sheffield, England",
            contact_number: "0114 222 2000",
            profession: "Athletic Trainer",
            email: "ethan.davis@example.com"
        },
        {
            id: "7",
            name: "Sophia Anderson",
            image: "/img/consultant/doc32.jpg",
            certification: "MSc, Certified Athletic Trainer, Certified in Instrument Assisted Soft Tissue Mobilization",
            description: "Sophia specializes in using instrument assisted soft tissue mobilization techniques to treat muscle and fascia-related injuries in athletes.",
            location: "Bristol, England",
            contact_number: "0117 928 9000",
            profession: "Athletic Trainer",
            email: "sophia.anderson@example.com"
        },
        {
            id: "8",
            name: "Lucas Thompson",
            image: "/img/consultant/doc34.webp",
            certification: "DPT, Certified Athletic Trainer, Sports Nutrition Specialist",
            description: "Lucas combines his expertise in athletic training with sports nutrition to provide comprehensive care for athletes, optimizing both their performance and recovery.",
            location: "Liverpool, England",
            contact_number: "0151 794 2000",
            profession: "Athletic Trainer",
            email: "lucas.thompson@example.com"
        },
        {
            id: "9",
            name: "Emma Roberts",
            image: "/img/consultant/doc35.jpg",
            certification: "MSc, Certified Athletic Trainer, Certified in Dry Needling",
            description: "Emma specializes in using dry needling techniques to treat myofascial pain and improve muscle function in athletes.",
            location: "Newcastle, England",
            contact_number: "0191 208 6000",
            profession: "Athletic Trainer",
            email: "emma.roberts@example.com"
        },
        {
            id: "10",
            name: "Noah Parker",
            image: "/img/consultant/doc36.jpg",
            certification: "BSc, Certified Athletic Trainer, Certified Strength and Conditioning Specialist",
            description: "Noah focuses on developing sport-specific training programs for athletes, enhancing their power, agility, and overall athletic performance.",
            location: "Cardiff, Wales",
            contact_number: "029 2087 4000",
            profession: "Athletic Trainer",
            email: "noah.parker@example.com"
        }
    ],
    "physiatrist": [
        {
            id: "1",
            name: "Dr. Robert Johnson",
            image: "/img/consultant/doc17.jpg",
            certification: "MD, Physical Medicine and Rehabilitation",
            description: "Dr. Johnson specializes in non-surgical treatments for musculoskeletal conditions, with a focus on spine care and interventional pain management.",
            location: "London, England",
            contact_number: "020 7188 7188",
            profession: "Physiatrist",
            email: "robert.johnson@example.com"
        },
        {
            id: "2",
            name: "Dr. Addison Rodriguez",
            image: "/img/consultant/doc18.jpg",
            certification: "MD, Sports Medicine Fellowship",
            description: "Dr. Rodriguez combines her expertise in physical medicine with sports medicine to help athletes of all levels recover from injuries and improve performance.",
            location: "Manchester, England",
            contact_number: "0161 276 1234",
            profession: "Physiatrist",
            email: "addison.rodriguez@example.com"
        },
        {
            id: "3",
            name: "Dr. Andrew Kim",
            image: "/img/consultant/doc19.jpg",
            certification: "MD, Electrodiagnostic Medicine Specialist",
            description: "Dr. Kim focuses on diagnosing and treating nerve and muscle disorders using advanced electrodiagnostic techniques.",
            location: "Birmingham, England",
            contact_number: "0121 371 2000",
            profession: "Physiatrist",
            email: "andrew.kim@example.com"
        }
    ]
};

export default expertsData;

