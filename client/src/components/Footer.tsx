import { Link } from "wouter";
import { SocialLink } from "@/types";
import { 
  Github, 
  Linkedin, 
  X, 
  Mail, 
  ExternalLink,
  Instagram
} from "lucide-react";

// Social links for footer
const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    url: "https://github.com/samsontejas86",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    url: "https://www.linkedin.com/in/samsontejas86/",
  },
  {
    name: "X",
    icon: <X className="h-5 w-5" />,
    url: "https://x.com/samsontejas12",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    url: "https://www.instagram.com/sammmy.x._",
  },
  {
    name: "Email",
    icon: <Mail className="h-5 w-5" />,
    url: "mailto:samsontejas.p@gmail.com",
  },
];

// Function to get the appropriate icon
const getIcon = (icon: string) => {
  switch (icon) {
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'x':
      return <X className="h-5 w-5" />;
    case 'mail':
      return <Mail className="h-5 w-5" />;
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link href="/">
              <a className="text-xl font-bold">
                Samson<span className="text-primary-light">Tejas</span>
              </a>
            </Link>
            <p className="text-gray-400 mt-2">Fullstack Developer & Designer</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">&copy; {currentYear} Samson Tejas. All rights reserved.</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
