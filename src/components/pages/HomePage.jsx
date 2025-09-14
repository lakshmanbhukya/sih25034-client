import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { 
  Target, 
  Briefcase, 
  User, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const HomePage = ({ onPageChange }) => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Target,
      title: 'Personalized Recommendations',
      description: 'Get internship suggestions based on your skills, location, and interests',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MapPin,
      title: 'Location-Based Search',
      description: 'Find internships near you or work remotely from anywhere',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Briefcase,
      title: 'Wide Range of Opportunities',
      description: 'Browse through hundreds of internships across various industries',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Easy Application Process',
      description: 'Apply to internships with just one click through our platform',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Internships' },
    { number: '50+', label: 'Companies' },
    { number: '1000+', label: 'Students Helped' },
    { number: '95%', label: 'Success Rate' }
  ];

  const steps = [
    {
      step: '1',
      title: 'Create Your Profile',
      description: 'Tell us about your skills, education, and career interests',
      icon: User
    },
    {
      step: '2',
      title: 'Get Recommendations',
      description: 'Receive personalized internship suggestions that match your profile',
      icon: Target
    },
    {
      step: '3',
      title: 'Apply & Succeed',
      description: 'Apply to internships and start your professional journey',
      icon: CheckCircle
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-brand-50 py-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
            🚀 Launch Your Career Journey
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="gradient-text block"> Dream Internship</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Discover amazing internship opportunities tailored to your skills and aspirations. 
            Join thousands of students who found their perfect match.
          </p>
          
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => onPageChange('recommendations')}
                variant="gradient"
                size="xl"
                className="shadow-xl"
              >
                <Target className="h-5 w-5 mr-2" />
                View My Recommendations
              </Button>
              <Button
                onClick={() => onPageChange('internships')}
                variant="outline"
                size="xl"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Browse All Internships
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => onPageChange('auth')}
                  variant="gradient"
                  size="xl"
                  className="shadow-xl group"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => onPageChange('internships')}
                  variant="outline"
                  size="xl"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Explore Internships
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                ✨ No credit card required • Join 10,000+ students
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Students Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              Join our growing community of successful interns
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 card-hover border border-gray-100">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-400 to-brand-400 rounded-full mx-auto mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ Platform Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose InternshipHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the most advanced internship matching platform designed for modern students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 card-hover border border-gray-100 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                    )}
                  </div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Internship Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have found their dream internships with us
          </p>
          
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('profile')}
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Complete Your Profile
              </Button>
              <Button
                onClick={() => onPageChange('recommendations')}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Recommendations
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => onPageChange('auth')}
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              Get Started Today
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
