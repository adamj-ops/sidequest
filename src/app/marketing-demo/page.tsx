'use client';

import React from 'react';
import Image from 'next/image';
import { LaptopIcon, UsersIcon, BarChart3Icon, ZapIcon, ShieldCheckIcon, GlobeIcon } from 'lucide-react';
import {
  MarketingLayout,
  Section,
  Container,
  HeroSection,
  FeatureSection,
  TestimonialSection,
  CTASection,
  PricingSection,
  StatsSection
} from '@/components/marketing';

export default function MarketingDemo() {
  // Sample data for the marketing page
  const heroData = {
    title: "Customer relationship magic",
    subtitle: "Streamline workflows, centralize information, and make data-driven decisions with our comprehensive operations platform.",
    cta: {
      primary: {
        text: "Get Started",
        href: "#",
      },
      secondary: {
        text: "Learn More",
        href: "#",
      },
    },
    image: {
      src: "/placeholder.svg", // Using a simpler placeholder approach
      alt: "Platform Dashboard",
      width: 1200,
      height: 800,
    },
    logoCloud: {
      title: "Trusted by companies worldwide",
      logos: [
        { src: "/placeholder-logo.svg", alt: "Company Logo", width: 120, height: 40 },
        { src: "/placeholder-logo.svg", alt: "Company Logo", width: 120, height: 40 },
        { src: "/placeholder-logo.svg", alt: "Company Logo", width: 120, height: 40 },
        { src: "/placeholder-logo.svg", alt: "Company Logo", width: 120, height: 40 },
        { src: "/placeholder-logo.svg", alt: "Company Logo", width: 120, height: 40 },
      ],
    },
  };

  const featuresData = {
    title: "A CRM designed to grow with you",
    subtitle: "Manage your customer relationships with ease using our powerful yet simple tools",
    features: [
      {
        icon: <LaptopIcon className="w-6 h-6" />,
        title: "Universal Inbox",
        description: "Unify your email, chat, and social messaging into one place. Never miss a customer conversation.",
      },
      {
        icon: <UsersIcon className="w-6 h-6" />,
        title: "360° Customer View",
        description: "Get the complete picture of your customer including interactions, purchases, and behavior.",
      },
      {
        icon: <BarChart3Icon className="w-6 h-6" />,
        title: "Powerful Analytics",
        description: "Make data-driven decisions with real-time dashboards and comprehensive reporting.",
      },
      {
        icon: <ZapIcon className="w-6 h-6" />,
        title: "Workflow Automation",
        description: "Automate repetitive tasks and streamline your team's workflow with custom rules.",
      },
      {
        icon: <ShieldCheckIcon className="w-6 h-6" />,
        title: "Enterprise Security",
        description: "Bank-level encryption and security protocols to keep your customer data safe.",
      },
      {
        icon: <GlobeIcon className="w-6 h-6" />,
        title: "Global Scalability",
        description: "Whether you have 10 or 10,000 customers, our platform grows with your business.",
      },
    ],
    image: {
      src: "/placeholder.svg",
      alt: "Feature Showcase",
      width: 800,
      height: 600,
    },
  };

  const testimonialData = {
    title: "Trusted by thousands of companies",
    subtitle: "Don't just take our word for it. Here's what our customers have to say.",
    testimonials: [
      {
        quote: "This platform has completely transformed how we manage customer relationships. The automation features alone have saved us countless hours each week.",
        author: {
          name: "Sarah Johnson",
          title: "VP of Sales",
          company: "TechCorp",
          avatar: {
            src: "/placeholder-avatar.svg",
            alt: "Sarah Johnson",
          },
        },
        rating: 5,
      },
      {
        quote: "The analytics capabilities are unmatched. We can now make data-driven decisions that have measurably improved our customer retention rates.",
        author: {
          name: "Michael Chen",
          title: "Customer Success Manager",
          company: "GrowthBox",
          avatar: {
            src: "/placeholder-avatar.svg",
            alt: "Michael Chen",
          },
        },
        rating: 5,
      },
      {
        quote: "Implementation was smooth and the support team was incredibly helpful. We were up and running in days, not weeks.",
        author: {
          name: "Ava Williams",
          title: "Operations Director",
          company: "Retail Giant",
          avatar: {
            src: "/placeholder-avatar.svg",
            alt: "Ava Williams",
          },
        },
        rating: 4,
      },
    ],
  };

  const statsData = {
    title: "Proven results",
    subtitle: "Our customers have seen significant improvements in key metrics",
    stats: [
      {
        value: "99%",
        label: "Customer Satisfaction",
        description: "Based on customer feedback surveys",
      },
      {
        value: "50%",
        label: "Reduced Response Time",
        description: "Average improvement after 3 months",
      },
      {
        value: "35%",
        label: "Increase in Sales",
        description: "Average growth for our customers",
      },
      {
        value: "10x",
        label: "ROI",
        description: "Average return on investment",
      },
    ],
  };

  const pricingData = {
    title: "Flexible pricing for teams of all sizes",
    subtitle: "Choose the plan that best fits your needs. All plans include a 14-day free trial.",
    tiers: [
      {
        name: "Starter",
        description: "Perfect for small teams just getting started",
        price: {
          monthly: "$29",
          annually: "$290",
        },
        features: [
          { name: "Up to 5 team members", included: true },
          { name: "Basic analytics", included: true },
          { name: "24/7 email support", included: true },
          { name: "Workflow automation", included: false },
          { name: "Advanced integrations", included: false },
          { name: "Custom reporting", included: false },
        ],
        cta: {
          text: "Start free trial",
          href: "#",
        },
      },
      {
        name: "Professional",
        description: "For growing teams with advanced needs",
        price: {
          monthly: "$79",
          annually: "$790",
        },
        features: [
          { name: "Unlimited team members", included: true },
          { name: "Advanced analytics", included: true },
          { name: "24/7 priority support", included: true },
          { name: "Workflow automation", included: true },
          { name: "Advanced integrations", included: true },
          { name: "Custom reporting", included: false },
        ],
        cta: {
          text: "Start free trial",
          href: "#",
        },
        highlighted: true,
        badge: "Most Popular",
      },
      {
        name: "Enterprise",
        description: "Custom solutions for large organizations",
        price: {
          monthly: "$199",
          annually: "$1,990",
        },
        features: [
          { name: "Unlimited team members", included: true },
          { name: "Advanced analytics", included: true },
          { name: "24/7 premium support", included: true },
          { name: "Workflow automation", included: true },
          { name: "Advanced integrations", included: true },
          { name: "Custom reporting", included: true },
        ],
        cta: {
          text: "Contact sales",
          href: "#",
        },
      },
    ],
  };

  const ctaData = {
    title: "Ready to transform your customer relationships?",
    subtitle: "Join thousands of companies already using our platform to grow their business.",
    primaryCTA: {
      text: "Get Started Today",
      href: "#",
    },
    secondaryCTA: {
      text: "Talk to Sales",
      href: "#",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingLayout>
        {/* Hero Section */}
        <Section>
          <Container>
            <HeroSection {...heroData} variant="centered" />
          </Container>
        </Section>

        {/* Stats Section */}
        <StatsSection {...statsData} variant="grid" background="accent" />

        {/* Feature Section with Image Left */}
        <FeatureSection 
          {...featuresData} 
          variant="two-column" 
          imagePosition="left" 
        />

        {/* Feature Grid Section */}
        <Section background="light">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful features at your fingertips</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage your customer relationships in one place
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 text-accent-primary bg-accent-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Testimonial Section */}
        <TestimonialSection {...testimonialData} variant="cards" background="light" />

        {/* Featured Testimonial */}
        <TestimonialSection 
          testimonials={[testimonialData.testimonials[0]]} 
          variant="featured" 
          background="accent" 
        />

        {/* Pricing Section */}
        <PricingSection {...pricingData} showToggle={true} />

        {/* CTA Section */}
        <CTASection {...ctaData} variant="gradient" background="light" />
      </MarketingLayout>
    </div>
  );
}
