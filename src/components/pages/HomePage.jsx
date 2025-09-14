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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600"> Internship</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover amazing internship opportunities that match your skills and career goals. 
            Get personalized recommendations and apply with confidence.
          </p>
          
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('recommendations')}
                size="lg"
                className="text-lg px-8 py-3"
              >
                <Target className="h-5 w-5 mr-2" />
                View My Recommendations
              </Button>
              <Button
                onClick={() => onPageChange('internships')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Browse All Internships
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">
                Ready to start your internship journey?
              </p>
              <Button
                onClick={() => onPageChange('auth')}
                size="lg"
                className="text-lg px-8 py-3"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make finding the right internship simple and efficient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
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
