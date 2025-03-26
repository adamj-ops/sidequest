// HomePage for OpsFX
import type { Metadata } from 'next';
import Link from 'next/link';

// UI Components
import { Button } from "@/components/ui/Button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradientBlob from "@/components/ui/gradient-blob";

// SVG Icons
import { 
  ArrowRight, 
  BarChart2, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  ClipboardCheck, 
  Database, 
  FilePieChart, 
  Layers, 
  MessageSquare, 
  Play, 
  Zap 
} from "lucide-react";

// Navigation and Header
import MegaMenu from '@/components/home/MegaMenu';

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
}) => {
  const getBgClass = () => {
    switch(background) {
      case 'grid':
        return 'bg-grid-pattern';
      case 'dots':
        return 'bg-dot-pattern';
      default:
        return '';
    }
  };

  return (
    <section 
      id={id} 
      className={`container mx-auto px-4 sm:px-6 ${getBgClass()} ${className}`}
    >
      {children}
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description
}) => {
  return (
    <Card className="bg-white border border-gray-100 h-full transition-all duration-200 hover:shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4 p-2 bg-red-50 inline-block rounded-lg">
          <Icon className="text-brand-red h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// Use Case Card Component
const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  metric
}) => {
  return (
    <Card className="border border-gray-100 shadow-sm bg-white">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="mb-4 p-2 bg-red-50 inline-block rounded-lg">
            <Icon className="text-brand-red h-6 w-6" />
          </div>
          <div className="bg-gray-50 px-3 py-1 rounded-full text-sm font-medium">
            {metric}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href="#" className="text-brand-red font-medium flex items-center">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  author,
  role,
  company
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
      <p className="text-xl font-medium mb-6">"{quote}"</p>
      <div className="flex items-center">
        <Avatar className="h-12 w-12 border-2 border-white">
          <AvatarFallback className="bg-red-50 text-brand-red">
            {author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-semibold">{author}</p>
          <p className="text-gray-600 text-sm">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

// Features data
const features = [
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Gain instant insights with comprehensive dashboards and reports that track KPIs in real-time."
  },
  {
    icon: Layers,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and streamline complex processes with our visual workflow builder."
  },
  {
    icon: Database,
    title: "Centralized Data",
    description: "Unify your operational data in one secure location for seamless access and management."
  },
  {
    icon: ClipboardCheck,
    title: "Customizable Templates",
    description: "Create standardized processes with templates tailored to your specific operational needs."
  }
];

// Use cases data
const useCases = [
  {
    icon: Calendar,
    title: "Project Management",
    description: "Track projects, assign tasks, and monitor progress with comprehensive visibility.",
    metric: "32% faster delivery"
  },
  {
    icon: FilePieChart,
    title: "Financial Operations",
    description: "Streamline budgeting, forecasting, and financial reporting across departments.",
    metric: "41% cost reduction"
  },
  {
    icon: Zap,
    title: "Supply Chain",
    description: "Optimize inventory, track suppliers, and improve logistics with end-to-end visibility.",
    metric: "53% efficiency boost"
  },
  {
    icon: MessageSquare,
    title: "Customer Success",
    description: "Enhance customer experience with integrated feedback and service management.",
    metric: "28% churn reduction"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header and Navigation */}
      <header className="border-b sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-brand-red flex items-center gap-2">
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
        <GradientBlob position="top-right" color="red" className="opacity-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Operations excellence.
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-6">
              In a single platform.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
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
            <div className="aspect-video bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              {/* This would be replaced with an actual hero image/visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Platform visualization</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Social Proof */}
      <Section className="py-12 border-y border-gray-100">
        <div className="text-center mb-8">
          <p className="text-gray-600">Trusted by industry-leading companies</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {/* These would be replaced with actual client logos */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="text-gray-400 font-semibold">
              <p className="text-lg md:text-xl">LOGO {index + 1}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Problem Statement */}
      <Section className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-red-50 text-brand-red hover:bg-red-100 border-none">
              The Challenge
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Operational inefficiency costs businesses millions every year
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Most organizations struggle with fragmented tools, siloed data, and manual processes that lead to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Wasted time on repetitive administrative tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Lack of visibility across departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Slow decision-making due to incomplete data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Difficulty scaling operations efficiently</span>
                </li>
              </ul>
            </div>
          </div>
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-red-50 text-brand-red hover:bg-red-100 border-none">
            The Solution
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A single platform for total operational control
          </h2>
          <p className="text-xl text-gray-600">
            OpsFX brings together all your operational needs in one intuitive platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </Section>

      {/* Use Cases Section */}
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
                <span>Saved 15+ hours per week on reporting</span>
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

      {/* CTA Section */}
      <Section background="dots" className="py-20">
        <GradientBlob position="bottom-left" color="red" className="opacity-10" />
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
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

      {/* Resources Section */}
      <Section className="py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Resources to help you succeed
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Explore our guides, webinars, and case studies
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
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden bg-white border border-gray-100">
              <div className="aspect-[16/9] bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Resource Image {index + 1}</p>
                </div>
              </div>
              <CardContent className="pt-6">
                <Badge className="mb-2">
                  {['Guide', 'Webinar', 'Case Study'][index]}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">Resource Title {index + 1}</h3>
                <p className="text-gray-600 mb-4">Short description of this resource and why it's valuable for operations professionals.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-brand-red mb-4 inline-block">
                OpsFX
              </Link>
              <p className="text-gray-600 mb-6 max-w-md">
                The comprehensive platform for operations excellence, helping businesses streamline workflows and drive efficiency.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
                {['Twitter', 'LinkedIn', 'Facebook'].map((social, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer navigation links */}
            {['Product', 'Resources', 'Company'].map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {Array.from({ length: 4 }).map((_, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-600 hover:text-gray-900">
                        {category} Link {linkIndex + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} OpsFX. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                <Link key={index} href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
