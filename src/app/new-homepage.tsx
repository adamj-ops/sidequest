import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';

// UI Components
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientBlob } from "@/components/ui/gradient-blob";

// SVG Icons
import { 
  ArrowRight, 
  BarChart, 
  CheckCircle, 
  ChevronRight, 
  Database, 
  Globe, 
  Laptop, 
  LucideIcon, 
  MessageSquare, 
  Play, 
  Settings, 
  Smile, 
  Workflow 
} from "lucide-react";

// Navigation and Header
import { MegaMenu } from '@/components/home/MegaMenu';

// Define metadata for the page
export const metadata: Metadata = {
  title: "OpsFX - Operations Excellence Platform",
  description: "Streamline workflows, centralize information, and make data-driven decisions with our comprehensive operations platform.",
};

// Section Container Component
const Section = ({ 
  id, 
  className = "", 
  background = "none", 
  children 
}: { 
  id?: string;
  className?: string;
  background?: "none" | "grid" | "dots" | "gradient";
  children: React.ReactNode;
}) => {
  return (
    <section 
      id={id} 
      className={`relative py-16 md:py-24 overflow-hidden ${className}`}
    >
      {background === "grid" && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="h-full w-full bg-[url('/grid.svg')] bg-repeat" />
        </div>
      )}
      {background === "dots" && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="h-full w-full bg-[url('/dots.svg')] bg-repeat" />
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  return (
    <Card className="bg-white border border-gray-100 h-full transition-all duration-200 hover:shadow-md">
      <CardContent className="pt-6">
        <div className="w-12 h-12 mb-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// UseCase Card Component
const UseCaseCard = ({
  title,
  metric,
  description,
  icon: Icon,
}: {
  title: string;
  metric: string;
  description: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="min-w-[280px] md:min-w-[320px] p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-brand-red mr-3">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-3xl font-bold mb-2 text-brand-black">{metric}</div>
      <p className="text-sm text-gray-600 flex-grow">{description}</p>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  avatarSrc,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSrc?: string;
}) => {
  return (
    <Card className="border border-gray-100 shadow-sm bg-white">
      <CardContent className="pt-6">
        <blockquote className="text-xl font-medium mb-4 italic text-gray-800">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={author} />
            ) : (
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-gray-500">
              {role}, {company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Home Page Component
export default function HomePage() {
  const clientLogos = [
    { name: "Company 1", logo: "/logos/logo1.svg" },
    { name: "Company 2", logo: "/logos/logo2.svg" },
    { name: "Company 3", logo: "/logos/logo3.svg" },
    { name: "Company 4", logo: "/logos/logo4.svg" },
    { name: "Company 5", logo: "/logos/logo5.svg" },
  ];

  const useCases = [
    { 
      title: "Product Teams", 
      metric: "30%", 
      description: "Faster time-to-market by streamlining handoffs and approvals", 
      icon: Laptop 
    },
    { 
      title: "Customer Success", 
      metric: "45%", 
      description: "Reduction in churn through proactive intervention workflows", 
      icon: Smile
    },
    { 
      title: "Operations", 
      metric: "60%", 
      description: "Less time spent on manual reporting and data aggregation", 
      icon: Settings
    },
    { 
      title: "Enterprise", 
      metric: "$1.2M", 
      description: "Annual savings through operational efficiency improvements", 
      icon: Globe
    },
  ];

  const features = [
    {
      title: "Workflow Automation",
      description: "Design and implement custom workflows without code. Connect systems, automate approvals, and streamline processes.",
      icon: Workflow,
    },
    {
      title: "Data Integration",
      description: "Connect all your tools and systems in one platform. Import, transform, and utilize data from any source.",
      icon: Database,
    },
    {
      title: "Analytics Dashboard",
      description: "Measure what matters with customizable reports. Track KPIs, visualize trends, and gain actionable insights.",
      icon: BarChart,
    },
  ];

  const resources = [
    {
      title: "Operational Excellence Playbook",
      description: "Learn the fundamental principles of operational excellence and how to implement them.",
      image: "/resources/playbook.jpg",
      readTime: "10 min read",
    },
    {
      title: "Workflow Automation Guide",
      description: "Step-by-step instructions for building your first automated workflow.",
      image: "/resources/automation.jpg",
      readTime: "8 min read",
    },
    {
      title: "Data Integration Best Practices",
      description: "Optimize your data pipelines and ensure clean, reliable data across your organization.",
      image: "/resources/data.jpg",
      readTime: "12 min read",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-white">
      {/* Header/Navigation - Fixed at the top */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl mr-8">
              OpsFX
            </Link>
            <MegaMenu />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              Sign In
            </Button>
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Section background="grid" className="pt-24 pb-16">
        <GradientBlob position="right" color="red" className="opacity-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Operations excellence.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Streamline workflows, centralize information, and make data-driven decisions with our comprehensive operations platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
              <div className="w-full h-full">
                {/* This would be replaced with an actual image or animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/hero-app-interface.png" 
                    alt="Operations Platform Interface" 
                    width={600} 
                    height={400} 
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -right-10 -bottom-10 w-24 h-24 bg-red-50 rounded-full z-0 opacity-50" />
          </div>
        </div>
      </Section>

      {/* Social Proof Bar */}
      <Section className="py-10 bg-gray-50">
        <div className="text-center mb-6">
          <p className="text-gray-500 font-medium">Trusted by innovative companies</p>
        </div>
        <div className="flex justify-center flex-wrap gap-8 md:gap-12 items-center opacity-70">
          {clientLogos.map((client, index) => (
            <div key={index} className="h-8 flex items-center">
              <div className="w-24 h-8 bg-gray-300 rounded-md" />
              {/* In a real implementation, uncomment this and use actual logos: */}
              {/* <Image src={client.logo} alt={client.name} width={96} height={32} /> */}
            </div>
          ))}
        </div>
      </Section>

      {/* Problem Statement */}
      <Section className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From chaos to clarity
          </h2>
          <p className="text-xl text-gray-600">
            Most businesses waste 20+ hours weekly on operational inefficiency
          </p>
        </div>
        
        <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white max-w-4xl mx-auto">
          <div className="aspect-[16/9] w-full">
            {/* This would be replaced with an actual visualization of operational chaos */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="outline" className="flex gap-2 items-center">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Solution Overview */}
      <Section background="dots" className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The OpsFX solution
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive platform addresses all aspects of operational excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border border-gray-100">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mb-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Centralization</h3>
              <p className="text-gray-600">One source of truth for all operational data</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mb-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red">
                <Settings size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automation</h3>
              <p className="text-gray-600">Eliminate manual tasks and reduce errors by 90%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mb-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visibility</h3>
              <p className="text-gray-600">Real-time insights into your operational performance</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mb-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scalability</h3>
              <p className="text-gray-600">Systems that grow with your business needs</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Use Case Showcase */}
      <Section className="py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Real results for every team
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              See how different departments leverage OpsFX to drive efficiency
            </p>
          </div>
          <div className="hidden md:block">
            <Button variant="ghost">
              View all use cases
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-4 pb-4 w-max">
            {useCases.map((useCase, index) => (
              <UseCaseCard 
                key={index}
                title={useCase.title}
                metric={useCase.metric}
                description={useCase.description}
                icon={useCase.icon}
              />
            ))}
          </div>
        </ScrollArea>
      </Section>

      {/* Testimonial Section */}
      <Section background="grid" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-red-50 text-brand-red hover:bg-red-100 border-none">
              Customer Success
            </Badge>
            <TestimonialCard 
              quote="OpsFX transformed how we manage operations. We've cut reporting time by 70% and now have real-time visibility into our entire workflow."
              author="Sarah Johnson"
              role="Head of Operations"
              company="TechCorp"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Hear from our customers
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
                <span>Reduced operational costs by 35%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
                <span>Improved team productivity by 40%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
                <span>Decreased error rates by 90%</span>
              </div>
            </div>
            <Button variant="outline">
              Read the case study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Feature Highlights */}
      <Section className="py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful features, simple interface
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to transform your operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dots" className="py-20">
        <GradientBlob position="left" color="red" className="opacity-10" />
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your operations?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join hundreds of businesses that have revolutionized their workflows with OpsFX
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Book a Demo
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Resources Preview */}
      <Section className="py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Learn and grow
            </h2>
            <p className="text-gray-600 text-lg">
              Latest insights to help you master operational excellence
            </p>
          </div>
          <div className="hidden md:block">
            <Button variant="ghost">
              Browse all resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="overflow-hidden bg-white border border-gray-100">
              <div className="aspect-[16/9] relative bg-gray-100">
                {/* This would be replaced with actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Resource Image
                </div>
                {/* <Image 
                  src={resource.image} 
                  alt={resource.title} 
                  layout="fill" 
                  objectFit="cover" 
                /> */}
              </div>
              <CardContent className="pt-6">
                <Badge className="mb-2">{resource.readTime}</Badge>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link href="#" className="text-brand-red font-medium flex items-center">
                  Read More 
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">OpsFX</div>
              <p className="text-gray-600 mb-4 max-w-xs">
                Streamline your operations and drive efficiency with our comprehensive platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Use Cases</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Guides</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Webinars</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Press</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} OpsFX. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
