export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Benefits />
      <Features />
      <Privacy />
      <Footer />
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full bg-card py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-8">
            <div className="relative mx-auto my-4 h-[50px] w-[500px]">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                sizes="100%"
                quality={100}
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Revolutionizing Corporate Wellness
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground/50 md:text-xl">
              Empower your employees, optimize your organization, and transform
              corporate health with our comprehensive performance and wellness
              incentive platform.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg">App Store</Button>
            <Button size="lg">Google Play Store</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, HeartPulse } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      title: "For Employees",
      description:
        "Personalized wellness goals, AI-driven habit formation, and rewarding incentives.",
      icon: Users,
    },
    {
      title: "For Organizations",
      description:
        "Boost productivity, reduce absenteeism, and foster a culture of wellness and performance.",
      icon: Building,
    },
    {
      title: "For Insurance Providers",
      description:
        "Access anonymized health data to offer tailored insurance products and incentives.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Benefits for All Stakeholders
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <benefit.icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CheckCircle } from "lucide-react";

export function Features() {
  const features = [
    "Mobile app with fitness tracker integration",
    "AI and LLM-powered personalized goal setting",
    "Comprehensive health dashboard",
    "Gamification with LT Tokens",
    "Social engagement and sharing",
    "Customizable corporate wellness challenges",
    "Detailed reporting and insights",
    "Integration with existing wellness plans",
  ];

  return (
    <section className="flex w-full flex-col items-center gap-6 bg-card py-12 md:py-24 lg:py-32">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
        Key Features
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle className="text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Shield } from "lucide-react";

export function Privacy() {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Shield className="h-12 w-12 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Data Privacy & Security
          </h2>
          <p className="max-w-[600px] text-muted-foreground/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We prioritize your data privacy and security. Live Timeless complies
            with GDPR and HIPAA regulations, ensuring your sensitive health
            information is protected. Users have full control over their data
            sharing preferences.
          </p>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-card py-10">
      <div className="container mx-auto px-4 md:px-6">
        <ul className="flex items-center justify-end gap-4">
          <li>
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Live Timeless. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
