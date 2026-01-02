import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { 
  BarChart3, 
  Calendar, 
  CalendarDays, 
  TrendingUp, 
  Users, 
  Globe, 
  MessageCircle,
  Brain,
  PieChart,
  LineChart,
  Send,
  User,
  Filter,
  Download,
  RefreshCw,
  Search,
  Settings,
  MoreHorizontal,
  Eye,
  Share,
  Bookmark,
  ChevronDown,
  Star,
  Plane,
  Target,
  MapPin
} from 'lucide-react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as ReLineChart, Line, ResponsiveContainer } from 'recharts';

// Authentication Context
const AuthContext = React.createContext();

// Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const login = (userData) => {
    setUser(userData);
    setFormData(userData);
  };

  const logout = () => {
    setUser(null);
    setFormData({ username: '', password: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, formData }}>
      {children}
    </AuthContext.Provider>
  );
}

// Signup Page
function SignupPage() {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate successful signup
    alert('Account created successfully! Please login.');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SLTDA Analytics</h1>
          <p className="text-blue-200">Power BI Tourism Dashboard</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Sign Up</CardTitle>
            <CardDescription className="text-center text-blue-200">
              Join the Sri Lanka Tourism Analytics Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                Create Account
              </Button>
            </form>
            <p className="text-center mt-4 text-sm text-blue-200">
              Already have an account?{' '}
              <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Sign In
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Login Page
function LoginPage() {
  const { login } = React.useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SLTDA Analytics</h1>
          <p className="text-blue-200">Power BI Tourism Dashboard</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-blue-200">
              Enter your credentials to access Power BI dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                Sign In
              </Button>
            </form>
            <p className="text-center mt-4 text-sm text-blue-200">
              Don't have an account?{' '}
              <a href="/signup" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Sign Up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Power BI Dashboard Component
function PowerBIDashboard() {
  const [mockCredentials] = useState({ username: 'analyst_user', password: 'powerbi123' });
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Power BI Header */}
      <header className="bg-gray-800 text-white border-b border-gray-700">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-black" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Power BI</div>
                <div className="text-xs text-gray-300">SLTDA Tourism Analytics</div>
              </div>
            </div>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center space-x-3">
              <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-300">Logged in as:</span>
              <span className="ml-2 font-semibold">{mockCredentials.username}</span>
            </div>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              <User className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Power BI Content Area */}
      <div className="flex h-[calc(100vh-60px)] bg-gray-50">
        {/* Vertical Sidebar Navigation */}
        <div className="w-56 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'predictions', label: 'Monthly Predictions', icon: Calendar },
                { id: 'daily-predictions', label: 'Daily Predictions', icon: CalendarDays },
                { id: 'trends', label: 'Tourism Trends', icon: TrendingUp },
                { id: 'demographics', label: 'Demographics', icon: Users },
                { id: 'external', label: 'External Factors', icon: Globe },
                { id: 'tdms', label: 'Distribution Management', icon: MapPin },
                { id: 'chatbot', label: 'AI Assistant', icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'predictions' && <PredictionsTab />}
            {activeTab === 'daily-predictions' && <DailyPredictionsTab />}
            {activeTab === 'trends' && <TrendsTab />}
            {activeTab === 'demographics' && <DemographicsTab />}
            {activeTab === 'external' && <ExternalFactorsTab />}
            {activeTab === 'tdms' && <TDMSComponent />}
            {activeTab === 'chatbot' && <ChatbotTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScenario, setCurrentScenario] = useState('baseline');
  const [nextMonthPrediction, setNextMonthPrediction] = useState(null);
  const [predictedGrowth, setPredictedGrowth] = useState(null);

  // Get next month name and year
  const getNextMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return {
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      monthYear: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  };

  React.useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const backendUrl = 'http://localhost:8000';
        console.log('Fetching monthly forecast data...');
        
        const response = await fetch(`${backendUrl}/api/forecasts/scenarios`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Monthly forecast data received:', data);
        
        if (!data) {
          throw new Error('No data received from server');
        }
        
        // Get the last 12 months of data for display
        const scenarioData = data[currentScenario] || [];
        console.log('Scenario data for', currentScenario, ':', scenarioData);
        
        if (scenarioData.length === 0) {
          console.warn('No scenario data found for', currentScenario);
          setMonthlyData([]);
          setIsLoading(false);
          return;
        }
        
        const last12Months = scenarioData.slice(-12).map(item => {
          console.log('Processing item:', item);
          return {
            date: item.date,
            month: new Date(item.date + '-01').toLocaleDateString('en-US', { month: 'short' }),
            year: new Date(item.date + '-01').getFullYear(),
            arrivals: Math.round(item.arrivals_forecast || item.total_forecast || 0)
          };
        });
        
        console.log('Processed monthly data:', last12Months);
        setMonthlyData(last12Months);
        
        // Calculate predicted growth percentage
        if (scenarioData.length >= 2) {
          // Get the most recent month and the same month from previous year
          const currentMonth = new Date();
          const currentYear = currentMonth.getFullYear();
          const currentMonthIndex = currentMonth.getMonth();
          
          // Find current month data and previous year same month data
          const currentMonthData = scenarioData.find(item => {
            const itemDate = new Date(item.date + '-01');
            return itemDate.getMonth() === currentMonthIndex && itemDate.getFullYear() === currentYear;
          });
          
          const previousYearData = scenarioData.find(item => {
            const itemDate = new Date(item.date + '-01');
            return itemDate.getMonth() === currentMonthIndex && itemDate.getFullYear() === currentYear - 1;
          });
          
          // If current year data not available, use next available month and compare with previous year
          let growthPercentage = 0;
          let comparisonMonth = '';
          
          if (currentMonthData && previousYearData) {
            const currentValue = currentMonthData.arrivals_forecast || currentMonthData.total_forecast || 0;
            const previousValue = previousYearData.arrivals_forecast || previousYearData.total_forecast || 0;
            growthPercentage = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
            comparisonMonth = new Date(currentMonthData.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          } else {
            // Fallback: use first available data point and compare with last year
            const firstData = scenarioData[0];
            const lastYearData = scenarioData.find(item => {
              const itemDate = new Date(item.date + '-01');
              const firstDate = new Date(firstData.date + '-01');
              return itemDate.getFullYear() === firstDate.getFullYear() - 1 && 
                     itemDate.getMonth() === firstDate.getMonth();
            });
            
            if (firstData && lastYearData) {
              const currentValue = firstData.arrivals_forecast || firstData.total_forecast || 0;
              const previousValue = lastYearData.arrivals_forecast || lastYearData.total_forecast || 0;
              growthPercentage = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
              comparisonMonth = new Date(firstData.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            } else {
              // Final fallback: use year-over-year growth from scenario summary if available
              growthPercentage = 15; // Default fallback
              comparisonMonth = 'Year-over-Year';
            }
          }
          
          console.log('Calculated growth percentage:', growthPercentage);
          setPredictedGrowth({
            percentage: growthPercentage,
            formatted: (growthPercentage >= 0 ? '+' : '') + growthPercentage.toFixed(1) + '%',
            comparison: comparisonMonth,
            confidence: growthPercentage > 10 ? 'High' : growthPercentage > 5 ? 'Medium' : 'Low'
          });
        }
        
        // Get next month prediction (first item in the array that's in the future)
        const currentDate = new Date();
        const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const nextMonthStr = nextMonthDate.toISOString().slice(0, 7); // YYYY-MM format
        
        console.log('Looking for next month:', nextMonthStr);
        console.log('Available dates in scenario data:', scenarioData.map(item => item.date));
        
        const nextMonthData = scenarioData.find(item => item.date === nextMonthStr);
        console.log('Next month data found:', nextMonthData);
        
        if (nextMonthData) {
          const prediction = Math.round(nextMonthData.arrivals_forecast || nextMonthData.total_forecast || 0);
          console.log('Prediction value:', prediction);
          setNextMonthPrediction({
            value: prediction,
            formatted: (prediction / 1000000).toFixed(2) + 'M',
            confidence: 94,
            month: getNextMonth().monthYear
          });
        } else {
          // If next month data not found, use the first available future month
          const futureData = scenarioData.find(item => {
            const itemDate = new Date(item.date + '-01');
            return itemDate > currentDate;
          });
          
          if (futureData) {
            const prediction = Math.round(futureData.arrivals_forecast || futureData.total_forecast || 0);
            console.log('Using future data:', futureData.date, 'Prediction:', prediction);
            setNextMonthPrediction({
              value: prediction,
              formatted: (prediction / 1000000).toFixed(2) + 'M',
              confidence: 94,
              month: new Date(futureData.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            });
          } else {
            // Fallback to the last available data point
            const lastData = scenarioData[scenarioData.length - 1];
            if (lastData) {
              const prediction = Math.round(lastData.arrivals_forecast || lastData.total_forecast || 0);
              console.log('Using last available data:', lastData.date, 'Prediction:', prediction);
              setNextMonthPrediction({
                value: prediction,
                formatted: (prediction / 1000000).toFixed(2) + 'M',
                confidence: 94,
                month: new Date(lastData.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              });
            }
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setIsLoading(false);
      }
    };
    
    fetchMonthlyData();
  }, [currentScenario]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tourism Analytics Overview</h2>
        <div className="text-sm text-gray-600">Last updated: 2 minutes ago</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Arrivals', value: '2.05M', change: '+38.1%', color: 'blue' },
          { title: 'Revenue (USD)', value: '$3.17B', change: '+53.1%', color: 'emerald' },
          { title: 'Avg. Stay (Days)', value: '8.42', change: '+0.2%', color: 'purple' },
          { title: 'Avg. Daily Spend (USD)', value: '$181.15', change: '+10.0%', color: 'orange' }
        ].map((kpi, index) => (
          <Card key={index} className="power-bi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{kpi.title}</p>
                    <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5">2024</Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <p className={`text-xs mt-1 font-medium text-${kpi.color}-600`}>{kpi.change} vs 2023</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${kpi.color}-100 flex items-center justify-center`}>
                  <TrendingUp className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                Monthly Tourist Arrivals
              </div>
              <div className="flex space-x-2">
                {['baseline', 'optimistic', 'pessimistic'].map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => setCurrentScenario(scenario)}
                    className={`px-2 py-1 text-xs rounded-md ${
                      currentScenario === scenario
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                  </button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center justify-center">
                <div className="text-blue-600">Loading monthly data...</div>
              </div>
            ) : monthlyData.length > 0 ? (
              <div className="h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-2">
                  {monthlyData.map((item, index) => {
                    const maxValue = Math.max(...monthlyData.map(d => d.arrivals));
                    const percentage = maxValue > 0 ? (item.arrivals / maxValue) * 100 : 0;
                    return (
                      <div key={item.date} className="flex items-center">
                        <span className="w-10 text-xs text-gray-600 text-right">{item.month}</span>
                        <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="w-20 text-xs font-semibold text-right">
                          {item.arrivals > 0 ? `${(item.arrivals / 1000).toFixed(0)}K` : 'N/A'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Showing {currentScenario} scenario forecast for the last 12 months
                </div>
              </div>
            ) : (
              <div className="h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center justify-center">
                <div className="text-blue-600">No data available</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Globe className="h-5 w-5 mr-2 text-emerald-600" />
              Top Source Markets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, country: 'India', share: 20.3, flag: '🇮🇳' },
                { rank: 2, country: 'Russia', share: 9.8, flag: '🇷🇺' },
                { rank: 3, country: 'United Kingdom', share: 8.6, flag: '🇬🇧' },
                { rank: 4, country: 'Germany', share: 6.6, flag: '🇩🇪' },
                { rank: 5, country: 'China', share: 6.4, flag: '🇨🇳' },
                { rank: 6, country: 'USA', share: 2.9, flag: '🇺🇸' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 text-xs font-semibold text-gray-600">#{item.rank}</span>
                    <span className="text-lg">{item.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{item.country}</div>
                      <div className="text-xs text-gray-500">{item.share}% market share</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${item.share * 4}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold w-12 text-right">{item.share}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ML Model Performance Summary */}
      <Card className="power-bi-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            ML Model Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">91.8%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '91.8%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {nextMonthPrediction ? nextMonthPrediction.formatted : '2.85M'}
              </div>
              <div className="text-sm text-gray-600">
                {nextMonthPrediction ? `${nextMonthPrediction.month} Prediction` : 'January 2026 Prediction'}
              </div>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {nextMonthPrediction ? `${nextMonthPrediction.confidence}% Confidence` : '94% Confidence'}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                {predictedGrowth ? predictedGrowth.formatted : '+15.0%'}
              </div>
              <div className="text-sm text-gray-600">
                {predictedGrowth ? `Predicted Growth (${predictedGrowth.comparison})` : 'Predicted Growth'}
              </div>
              <Badge className={`mt-2 ${
                predictedGrowth?.confidence === 'High' ? 'bg-emerald-100 text-emerald-800' :
                predictedGrowth?.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {predictedGrowth ? `${predictedGrowth.confidence} Confidence` : 'High Confidence'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Daily Predictions Tab
function DailyPredictionsTab() {
  // Set default date to January 1, 2026
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(1); // January
  const [selectedDay, setSelectedDay] = useState(1); // 1st
  const [forecastDays, setForecastDays] = useState(7);
  const [scenariosData, setScenariosData] = useState({});
  const [currentScenario, setCurrentScenario] = useState('baseline');
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = 'http://localhost:8000';
        console.log('Fetching daily forecast data...');
        
        const response = await fetch(`${backendUrl}/api/forecasts/daily`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Daily forecast data received:', data);
        
        if (!data) {
          throw new Error('No data received from server');
        }
        
        setScenariosData(data);
        
        // Keep the default date as January 1, 2026
        // No need to change the date based on data
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching daily forecast data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Generate forecast period based on selections
  const generateForecastPeriod = () => {
    if (isLoading || !scenariosData[currentScenario]) {
      console.log('No daily data available - loading:', isLoading, 'scenario data:', scenariosData[currentScenario]);
      return [];
    }

    const result = [];
    const currentDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    
    // Get the data for the current scenario
    const scenarioData = scenariosData[currentScenario] || [];
    
    // Create a map for fast lookup: "YYYY-MM-DD" -> data object
    const dataMap = new Map();
    scenarioData.forEach(item => {
      dataMap.set(item.date, item);
    });
    
    for (let i = 0; i < forecastDays; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      
      const dateStr = nextDate.toISOString().split('T')[0];
      const dataPoint = dataMap.get(dateStr);
      
      if (dataPoint) {
        result.push({
          date: dateStr,
          day: nextDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          prediction: dataPoint.total_forecast,
          confidence: 95 // Default confidence value
        });
      }
    }
    
    return result;
  };
  
  // Update forecast data when dependencies change
  React.useEffect(() => {
    const data = generateForecastPeriod();
    setForecastData(data);
  }, [selectedYear, selectedMonth, selectedDay, forecastDays, currentScenario, scenariosData]);
  
  // Generate years array (2026 to 2030)
  const years = Array.from({ length: 5 }, (_, i) => 2026 + i);

  // Generate months array
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  // Generate days array based on selected month and year
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handle scenario change
  const handleScenarioChange = (scenario) => {
    setCurrentScenario(scenario);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading daily predictions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="power-bi-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Daily Forecast Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
              <div className="flex space-x-2">
                {['baseline', 'optimistic', 'pessimistic'].map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => handleScenarioChange(scenario)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentScenario === scenario
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Duration</label>
              <select
                value={forecastDays}
                onChange={(e) => setForecastDays(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Showing <strong>{currentScenario}</strong> forecast starting from {selectedDay} {months[selectedMonth - 1].name} {selectedYear} for the next {forecastDays} days
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Daily Predictions Table */}
      <Card className="power-bi-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            {forecastDays}-Day Tourist Arrival Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-semibold text-gray-800">{item.day}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {item.prediction.toLocaleString()}
                  </div>
                  <Badge variant="outline">
                    Confidence: {item.confidence}%
                  </Badge>
                </div>
              </div>
            ))}
            {forecastData.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500">No data available for the selected period.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Monthly Predictions Tab
function PredictionsTab() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [forecastMonths, setForecastMonths] = useState(6);
  const [scenariosData, setScenariosData] = useState({});
  const [currentScenario, setCurrentScenario] = useState('baseline');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = 'http://localhost:8000';
        console.log('Fetching data from:', `${backendUrl}/api/forecasts/scenarios`);
        
        // First test the CORS connection
        try {
          const testResponse = await fetch(`${backendUrl}/api/test`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          const testData = await testResponse.json();
          console.log('Test endpoint response:', testData);
        } catch (testError) {
          console.warn('Test endpoint failed, continuing anyway:', testError);
        }
        
        // Fetch the actual data
        const response = await fetch(`${backendUrl}/api/forecasts/scenarios`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data) {
          throw new Error('No data received from server');
        }
        
        // Transform the data for easier access
        const transformedData = {};
        
        // Process each scenario
        Object.entries(data).forEach(([scenario, scenarioData]) => {
          if (Array.isArray(scenarioData)) {
            transformedData[scenario] = scenarioData.map(item => {
              // Extract external factors if they exist, or use empty object
              const externalFactors = item.external_factor_contributions_pct || {};
              
              return {
                ...item,
                // Extract year and month for easier filtering
                year: parseInt(item.date.split('-')[0]),
                month: parseInt(item.date.split('-')[1]),
                // Ensure we have external factors, defaulting to 0 if not present
                externalFactors: {
                  weather: externalFactors.weather || 0,
                  economy: externalFactors.economy || 0,
                  events: externalFactors.events || 0,
                  // Add more factors as needed
                  ...externalFactors
                }
              };
            });
          }
        });
        
        console.log('Transformed data:', transformedData);
        setScenariosData(transformedData);
        
        // Set default year to the first available year if not set
        if (Object.keys(transformedData).length > 0) {
          const firstScenario = Object.values(transformedData)[0];
          if (firstScenario.length > 0 && !selectedYear) {
            setSelectedYear(firstScenario[0].year);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Generate years array (2026 to 2030)
  const years = Array.from({ length: 5 }, (_, i) => 2026 + i);

  // Generate months array
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  // Generate forecast period based on selections
  const generateForecastPeriod = () => {
    if (isLoading || !scenariosData[currentScenario]) {
      console.log('No data available - loading:', isLoading, 'scenario data:', scenariosData[currentScenario]);
      return [];
    }

    const result = [];
    let currentMonth = parseInt(selectedMonth);
    let currentYear = parseInt(selectedYear);
    
    console.log('Generating forecast for:', { currentScenario, currentYear, currentMonth, forecastMonths });

    // Get the data for the current scenario
    const scenarioData = scenariosData[currentScenario] || [];
    console.log('Scenario data:', scenarioData);

    for (let i = 0; i < forecastMonths; i++) {
      // Handle month/year rollover
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }

      const monthName = new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' });
      
      // Find the data point for this month and year
      const dataPoint = scenarioData.find(
        item => item.year === currentYear && item.month === currentMonth
      );
      
      if (dataPoint) {
        // Get external factors, defaulting to an empty object if not present
        const externalFactors = dataPoint.externalFactors || {};
        
        // Filter out factors with 0% contribution for cleaner display
        const activeFactors = Object.entries(externalFactors)
          .filter(([_, value]) => value && parseFloat(value) !== 0)
          .map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            value: parseFloat(value).toFixed(1) // Format to 1 decimal place
          }));
        
        result.push({
          month: `${monthName} ${currentYear}`,
          monthValue: currentMonth,
          year: currentYear,
          prediction: dataPoint.total_forecast,
          confidence: 95, // Default confidence value
          externalFactors: activeFactors
        });
      } else {
        // If no data point is found, add a placeholder
        result.push({
          month: `${monthName} ${currentYear}`,
          monthValue: currentMonth,
          year: currentYear,
          prediction: '-',
          confidence: 0,
          externalFactors: []
        });
      }

      currentMonth++;
    }

    return result;
  };

  const forecastData = generateForecastPeriod();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Machine Learning Predictions</h2>
        {isLoading && <span className="text-sm text-gray-500 ml-4">Loading data...</span>}
        <div className="flex space-x-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-1" />
            Export Predictions
          </Button>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-1" />
            Retrain Model
          </Button>
        </div>
      </div>

      {/* Date and Scenario Selector */}
      <Card className="power-bi-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Forecast Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
              <select
                value={currentScenario}
                onChange={(e) => setCurrentScenario(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="baseline">Baseline</option>
                <option value="optimistic">Optimistic</option>
                <option value="pessimistic">Pessimistic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Duration</label>
              <select
                value={forecastMonths}
                onChange={(e) => setForecastMonths(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Showing <strong>{currentScenario}</strong> forecast from {months[selectedMonth - 1].name} {selectedYear} for the next {forecastMonths} months
            </p>
          </div>
        </CardContent>
      </Card>

{/* Predictions Table */}
      <Card className="power-bi-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            {forecastMonths}-Month Tourist Arrival Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="font-semibold text-gray-800">{item.month}</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {item.prediction !== '-' ? item.prediction.toLocaleString() : '-'}
                    </div>
                    <Badge variant="outline" className="bg-white">
                      Confidence: {item.confidence}%
                    </Badge>
                  </div>
                </div>
                
                {/* External Factors Section */}
                {item.externalFactors && item.externalFactors.length > 0 && (
                  <div className="px-4 pb-3 pt-1 bg-gray-100 border-t border-gray-200">
                    <div className="text-xs font-medium text-gray-500 mb-1">External Factors:</div>
                    <div className="flex flex-wrap gap-2">
                      {item.externalFactors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white">
                          {factor.name}: {factor.value}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {forecastData.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500">No data available for the selected period.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for future charts if needed */}
      </div>
    </div>
  );
}


// Tourism Trends Tab
function TrendsTab() {
  // Sample data for trends
  const monthlyTrends = [
    { month: 'Jan', visitors: 185000, yoy: '+12.5%', avgStay: 4.2 },
    { month: 'Feb', visitors: 165000, yoy: '+8.7%', avgStay: 3.8 },
    { month: 'Mar', visitors: 195000, yoy: '+15.2%', avgStay: 4.5 },
    { month: 'Apr', visitors: 210000, yoy: '+18.3%', avgStay: 5.1 },
    { month: 'May', visitors: 225000, yoy: '+14.9%', avgStay: 4.8 },
    { month: 'Jun', visitors: 245000, yoy: '+20.1%', avgStay: 5.3 },
    { month: 'Jul', visitors: 280000, yoy: '+22.6%', avgStay: 5.7 },
    { month: 'Aug', visitors: 310000, yoy: '+25.3%', avgStay: 6.2 },
    { month: 'Sep', visitors: 265000, yoy: '+18.9%', avgStay: 5.5 },
    { month: 'Oct', visitors: 240000, yoy: '+16.7%', avgStay: 5.0 },
    { month: 'Nov', visitors: 205000, yoy: '+14.2%', avgStay: 4.7 },
    { month: 'Dec', visitors: 320000, yoy: '+28.4%', avgStay: 6.5 }
  ];

  const topSourceCountries = [
    { country: 'United States', visitors: '285K', growth: '+18.2%', share: '22%' },
    { country: 'United Kingdom', visitors: '198K', growth: '+12.7%', share: '15%' },
    { country: 'Germany', visitors: '165K', growth: '+15.4%', share: '13%' },
    { country: 'China', visitors: '142K', growth: '+25.8%', share: '11%' },
    { country: 'France', visitors: '128K', growth: '+9.8%', share: '10%' },
    { country: 'Others', visitors: '382K', growth: '+14.6%', share: '29%' }
  ];

  const visitorDemographics = [
    { ageGroup: '18-24', percentage: 18, trend: '+2.1%', gender: { male: 48, female: 52 }, spending: 850 },
    { ageGroup: '25-34', percentage: 32, trend: '+3.5%', gender: { male: 51, female: 49 }, spending: 1250 },
    { ageGroup: '35-44', percentage: 27, trend: '+1.8%', gender: { male: 53, female: 47 }, spending: 1450 },
    { ageGroup: '45-54', percentage: 15, trend: '-0.5%', gender: { male: 55, female: 45 }, spending: 1800 },
    { ageGroup: '55+', percentage: 8, trend: '-1.2%', gender: { male: 52, female: 48 }, spending: 2200 }
  ];

  const travelPurpose = [
    { type: 'Leisure', percentage: 68, trend: '+4.2%', activities: ['Sightseeing (45%)', 'Beach (30%)', 'Adventure (15%)', 'Wellness (10%)'] },
    { type: 'Business', percentage: 22, trend: '+1.5%', activities: ['Conferences (60%)', 'Meetings (30%)', 'Training (10%)'] },
    { type: 'Visiting Friends/Relatives', percentage: 10, trend: '-0.8%', activities: ['Family Visits (70%)', 'Friends Visits (30%)'] }
  ];

  const popularAttractions = [
    { name: 'Historic Downtown', visitors: '420K', rating: '4.8', growth: '+12.5%' },
    { name: 'Mountain Resort', visitors: '385K', rating: '4.9', growth: '+18.2%' },
    { name: 'Beachfront Promenade', visitors: '350K', rating: '4.7', growth: '+15.7%' },
    { name: 'Cultural Museum', visitors: '295K', rating: '4.6', growth: '+8.9%' },
    { name: 'Adventure Park', visitors: '260K', rating: '4.5', growth: '+22.3%' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tourism Trends Analysis</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 12 Months
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Visitors', value: '2.8M', change: '+18.5%', trend: 'up' },
          { title: 'Average Stay', value: '5.2 Days', change: '+0.7%', trend: 'up' },
          { title: 'Avg. Spend/Visitor', value: '$1,250', change: '+5.3%', trend: 'up' },
          { title: 'Repeat Visitors', value: '42%', change: '+3.1%', trend: 'up' }
        ].map((metric, index) => (
          <Card key={index} className="power-bi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-full ${metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                </div>
              </div>
              <p className={`text-xs mt-2 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last year
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Visitor Trends</CardTitle>
            <CardDescription>Last 12 months with year-over-year comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-12 gap-2 text-center text-xs text-gray-500 mb-2">
                  {monthlyTrends.map((month, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="font-medium text-gray-700">{month.month}</span>
                      <div className="h-32 w-6 bg-gradient-to-t from-blue-100 to-blue-200 rounded-t-sm mt-2 relative">
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-sm"
                          style={{ height: `${(month.visitors / 350000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs">
                        <div className="font-semibold">{(month.visitors / 1000).toFixed(0)}K</div>
                        <div className={`text-xs ${month.yoy.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                          {month.yoy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Peak Month</p>
                <p className="font-semibold">December</p>
                <p className="text-xs text-emerald-600">+28.4% YoY</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Low Month</p>
                <p className="font-semibold">February</p>
                <p className="text-xs text-emerald-600">+8.7% YoY</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Avg. Stay</p>
                <p className="font-semibold">5.2 Days</p>
                <p className="text-xs text-emerald-600">+0.7% YoY</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Source Countries */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Source Countries</CardTitle>
            <CardDescription>Visitor distribution by country of origin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSourceCountries.map((country, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{country.country}</span>
                    <span className="text-gray-600">{country.visitors} visitors</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: country.share }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{country.share} of total</span>
                    <span className={`${country.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {country.growth} YoY
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visitor Demographics */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Age & Gender Distribution</CardTitle>
            <CardDescription>Breakdown of tourists by age group and gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visitorDemographics.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.ageGroup} years</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold mr-2">{item.percentage}%</span>
                      <span className={`text-xs ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Purpose */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Travel Purpose</CardTitle>
            <CardDescription>Primary reason for visit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                {travelPurpose.map((item, index) => {
                  const colors = ['#3b82f6', '#8b5cf6', '#10b981'];
                  const startAngle = index === 0 ? 0 :
                    travelPurpose.slice(0, index).reduce((a, b) => a + b.percentage, 0) / 100 * 360;
                  const endAngle = travelPurpose.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0) / 100 * 360;

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          from ${startAngle}deg,
                          ${colors[index]} 0%,
                          ${colors[index]} ${endAngle - startAngle}deg,
                          transparent ${endAngle - startAngle}deg,
                          transparent 360deg
                        )`,
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  );
                })}
                <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    {travelPurpose[0].percentage}%
                  </span>
                  <span className="text-xs text-gray-500">Leisure</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {travelPurpose.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'][index]
                      }}
                    />
                    <span>{item.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.percentage}%</span>
                    <span className={`text-xs ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Attractions */}
        <Card className="power-bi-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Tourist Attractions</CardTitle>
            <CardDescription>Most visited locations this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attraction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visitors
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularAttractions.map((attraction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">{attraction.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{attraction.name}</div>
                            <div className="text-sm text-gray-500">{attraction.visitors} visitors</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{attraction.visitors}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-900">{attraction.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${attraction.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {attraction.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Demographics Tab
function DemographicsTab() {
  // Sample data for demographics
  const ageGroups = [
    { age: '18-24', percentage: 18, trend: '+2.1%', gender: { male: 48, female: 52 }, spending: 850 },
    { age: '25-34', percentage: 32, trend: '+3.5%', gender: { male: 51, female: 49 }, spending: 1250 },
    { age: '35-44', percentage: 27, trend: '+1.8%', gender: { male: 53, female: 47 }, spending: 1450 },
    { age: '45-54', percentage: 15, trend: '-0.5%', gender: { male: 55, female: 45 }, spending: 1800 },
    { age: '55+', percentage: 8, trend: '-1.2%', gender: { male: 52, female: 48 }, spending: 2200 }
  ];

  const regions = [
    { name: 'Asia', percentage: 45, countries: ['China (28%)', 'India (22%)', 'Japan (15%)', 'South Korea (12%)', 'Others (23%)'] },
    { name: 'Europe', percentage: 35, countries: ['UK (32%)', 'Germany (25%)', 'France (18%)', 'Italy (15%)', 'Others (10%)'] },
    { name: 'North America', percentage: 20, countries: ['USA (75%)', 'Canada (25%)'] }
  ];

  const travelPurposes = [
    { type: 'Leisure', percentage: 68, trend: '+4.2%', activities: ['Sightseeing (45%)', 'Beach (30%)', 'Adventure (15%)', 'Wellness (10%)'] },
    { type: 'Business', percentage: 22, trend: '+1.5%', activities: ['Conferences (60%)', 'Meetings (30%)', 'Training (10%)'] },
    { type: 'Visiting Friends/Relatives', percentage: 10, trend: '-0.8%', activities: ['Family Visits (70%)', 'Friends Visits (30%)'] }
  ];

  const spendingPatterns = [
    { category: 'Accommodation', percentage: 35, trend: '+2.1%' },
    { category: 'Food & Dining', percentage: 25, trend: '+3.2%' },
    { category: 'Shopping', percentage: 20, trend: '+1.8%' },
    { category: 'Activities', percentage: 12, trend: '+4.5%' },
    { category: 'Transportation', percentage: 8, trend: '+0.9%' }
  ];

  const travelCompanions = [
    { type: 'Solo Travelers', percentage: 18, trend: '+3.2%' },
    { type: 'Couples', percentage: 32, trend: '+2.8%' },
    { type: 'Family with Children', percentage: 25, trend: '+1.5%' },
    { type: 'Group of Friends', percentage: 15, trend: '+4.1%' },
    { type: 'Business Groups', percentage: 10, trend: '-1.2%' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tourist Demographics & Behavior</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 12 Months
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Tourists', value: '2.8M', change: '+18.5%', trend: 'up' },
          { title: 'Avg. Stay Duration', value: '5.2 Days', change: '+0.7%', trend: 'up' },
          { title: 'Avg. Spend/Visitor', value: '$1,250', change: '+5.3%', trend: 'up' },
          { title: 'Repeat Visitors', value: '42%', change: '+3.1%', trend: 'up' }
        ].map((metric, index) => (
          <Card key={index} className="power-bi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-full ${metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                </div>
              </div>
              <p className={`text-xs mt-2 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last year
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution with Gender Split */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Age & Gender Distribution</CardTitle>
            <CardDescription>Breakdown of tourists by age group and gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ageGroups.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.age} years</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold mr-2">{item.percentage}%</span>
                      <span className={`text-xs ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Breakdown */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Regional Source Markets</CardTitle>
            <CardDescription>Visitor distribution by region and top countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regions.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{region.name}</span>
                    <span className="text-sm font-semibold">{region.percentage}% of total</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <p className="font-medium">Top Source Countries:</p>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {region.countries.map((country, i) => (
                        <div key={i} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                          <span>{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Purpose & Activities */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Travel Purpose & Activities</CardTitle>
            <CardDescription>Primary reasons for travel and preferred activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {travelPurposes.map((purpose, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{purpose.type}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold mr-2">{purpose.percentage}%</span>
                      <span className={`text-xs ${purpose.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {purpose.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-pink-600 h-2 rounded-full"
                      style={{ width: `${purpose.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <p className="font-medium">Popular Activities:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {purpose.activities.map((activity, i) => (
                        <span key={i} className="inline-block bg-gray-100 rounded-full px-2 py-0.5">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Patterns */}
        <Card className="power-bi-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending Patterns</CardTitle>
            <CardDescription>Average expenditure distribution per visitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                {spendingPatterns.map((item, index) => {
                  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
                  const startAngle = index === 0 ? 0 :
                    spendingPatterns.slice(0, index).reduce((a, b) => a + b.percentage, 0) / 100 * 360;
                  const endAngle = spendingPatterns.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0) / 100 * 360;

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          from ${startAngle}deg,
                          ${colors[index]} 0%,
                          ${colors[index]} ${endAngle - startAngle}deg,
                          transparent ${endAngle - startAngle}deg,
                          transparent 360deg
                        )`,
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  );
                })}
                <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    ${spendingPatterns[0].percentage}%
                  </span>
                  <span className="text-xs text-gray-500">Accommodation</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {spendingPatterns.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][index]
                      }}
                    />
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.percentage}%</span>
                    <span className={`text-xs ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Companions */}
        <Card className="power-bi-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Travel Companions</CardTitle>
            <CardDescription>Distribution of tourist groups and their characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Group Type Distribution</h4>
                <div className="space-y-3">
                  {travelCompanions.map((companion, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{companion.type}</span>
                        <span className="text-gray-600">{companion.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${companion.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Key Characteristics</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Average Stay Duration</p>
                    <p className="text-xs text-gray-600">Solo travelers stay longest (7.2 days), while business groups stay shortest (3.5 days)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Spending Patterns</p>
                    <p className="text-xs text-gray-600">Families spend most on activities, while business travelers spend most on accommodation</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Repeat Visits</p>
                    <p className="text-xs text-gray-600">Couples have the highest repeat visitor rate at 58%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// External Factors Tab
function ExternalFactorsTab() {
  // Sample data for external factors
  const economicIndicators = [
    { name: 'GDP Growth Rate', current: '3.2%', trend: '+0.4%', status: 'improving' },
    { name: 'Inflation Rate', current: '4.5%', trend: '-0.2%', status: 'improving' },
    { name: 'Unemployment Rate', current: '5.1%', trend: '-0.3%', status: 'improving' },
    { name: 'Exchange Rate (USD to LKR)', current: '320.50', trend: '-2.5', status: 'worsening' },
  ];

  const globalTrends = [
    { region: 'Global Tourism Recovery', value: '87%', trend: '+5.2%', status: 'improving' },
    { region: 'Asia Pacific', value: '92%', trend: '+6.8%', status: 'improving' },
    { region: 'Europe', value: '89%', trend: '+4.5%', status: 'improving' },
    { region: 'North America', value: '95%', trend: '+3.9%', status: 'improving' },
  ];

  const travelRestrictions = [
    { country: 'India', status: 'No Restrictions', requirements: 'Visa on Arrival', impact: 'Positive' },
    { country: 'China', status: 'Partial Restrictions', requirements: 'Pre-arrival Testing', impact: 'Neutral' },
    { country: 'UK', status: 'No Restrictions', requirements: 'None', impact: 'Positive' },
    { country: 'Russia', status: 'Restricted', requirements: 'Special Visa Required', impact: 'Negative' },
  ];

  const seasonalityFactors = [
    { month: 'Jan', factor: 'High Season', impact: 'Very High' },
    { month: 'Feb', factor: 'High Season', impact: 'Very High' },
    { month: 'Mar', factor: 'Shoulder Season', impact: 'Medium' },
    { month: 'Apr', factor: 'New Year Festival', impact: 'High' },
    { month: 'May', factor: 'Low Season', impact: 'Low' },
    { month: 'Jun', factor: 'Low Season', impact: 'Low' },
    { month: 'Jul', factor: 'Kandy Esala', impact: 'High' },
    { month: 'Aug', factor: 'Kataragama Festival', impact: 'High' },
    { month: 'Sep', factor: 'Shoulder Season', impact: 'Medium' },
    { month: 'Oct', factor: 'Shoulder Season', impact: 'Medium' },
    { month: 'Nov', factor: 'High Season', impact: 'High' },
    { month: 'Dec', factor: 'Peak Season', impact: 'Very High' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'improving': return 'bg-green-100 text-green-800';
      case 'worsening': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-blue-100 text-blue-800';
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'very high': return 'bg-purple-100 text-purple-800';
      case 'high': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">External Factors Analysis</h2>
        <div className="flex items-center space-x-2">
          <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Year to Date</option>
          </select>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Exchange Rate (USD/LKR)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320.50</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Global Travel Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5.2% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Flight Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-green-600">
              <span className="font-medium">+12%</span> vs pre-pandemic
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Hotel Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <div className="text-sm text-green-600">
              <span className="font-medium">+8%</span> vs last year
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Economic Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Economic Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {economicIndicators.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.trend.startsWith('+') ? 'Up ' : 'Down '}
                      {item.trend.replace('+', '').replace('-', '')} from last period
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.current}</div>
                    <Badge className={`mt-1 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Tourism Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-600" />
              Global Tourism Recovery
            </CardTitle>
            <CardDescription>Regional recovery rates vs pre-pandemic levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {globalTrends.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.region}</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getStatusColor(item.status).split(' ')[0]}`}
                      style={{ width: item.value }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.trend} from last quarter
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Plane className="h-5 w-5 mr-2 text-purple-600" />
              Key Market Travel Restrictions
            </CardTitle>
            <CardDescription>Current entry requirements for top source markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {travelRestrictions.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{item.country}</div>
                      <div className="text-sm text-gray-500">{item.requirements}</div>
                    </div>
                    <Badge className={getStatusColor(item.impact.toLowerCase())}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seasonality Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
            Monthly Seasonality Factors
          </CardTitle>
          <CardDescription>Key events and their impact on tourism</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Factors</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {seasonalityFactors.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.month}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.factor}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge className={getImpactColor(item.impact)}>
                        {item.impact}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weather and Climate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Weather Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-blue-800">Monsoon Season</div>
                    <div className="text-blue-600">May - September (Southwest), November - February (Northeast)</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">High Impact</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-800 font-medium">Best Time to Visit</div>
                  <div className="text-green-600">December - March (West & South)</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-yellow-800 font-medium">Shoulder Season</div>
                  <div className="text-yellow-600">April, September - November</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <svg className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Special Events Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Sinhala & Tamil New Year (April)', impact: 'High', trend: 'Increased domestic travel' },
                { name: 'Vesak Festival (May)', impact: 'Very High', trend: 'Peak international visitation' },
                { name: 'Kandy Esala Perahera (July/August)', impact: 'Very High', trend: 'High international interest' },
                { name: 'Christmas & New Year (Dec-Jan)', impact: 'High', trend: 'Peak season for European travelers' },
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 h-2 w-2 mt-1.5 rounded-full ${event.impact === 'Very High' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.trend}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Badge variant={event.impact === 'Very High' ? 'destructive' : 'default'}>
                      {event.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// AI Chatbot Tab
function ChatbotTab() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Power BI Tourism Analytics AI Assistant powered by Google Gemini. I can help you analyze tourism predictions, generate custom reports, and answer questions about the data. I have access to real-time backend data and web search capabilities.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const GEMINI_API_KEY = 'AIzaSyBmzgV6TBzW6mOeGqTvfoe7_BGDBVGlRtw';

  // Function to create enhanced context with backend data and web search
  const createEnhancedContext = (userQuestion, backendData, webSearchResults) => {
    const currentDate = new Date();
    
    // Determine if this is a data/analytics question or general tourism question
    const isAnalyticsQuery = /prediction|forecast|arrivals|revenue|growth|statistics|data|metrics|scenarios|baseline|optimistic|pessimistic|monthly|daily/i.test(userQuestion);
    const isAttractionQuery = /attractions|places|visit|see|do|tourist sites|landmarks|sigiriya|kandy|galle|nuwara eliya|anuradhapura|polonnaruwa|ella|mirissa/i.test(userQuestion);
    
    let context = `You are a tourism analytics AI assistant for Sri Lanka Tourism Development Authority (SLTDA). You have access to real-time data and web search capabilities.

CURRENT DATE: ${currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

    // Only include backend data for analytics questions
    if (isAnalyticsQuery && !isAttractionQuery) {
      context += `

REAL-TIME BACKEND DATA:
${backendData.monthlyPredictions ? `
MONTHLY PREDICTIONS:
- Scenarios Available: ${Object.keys(backendData.monthlyPredictions).join(', ')}
- Baseline Scenario: ${backendData.monthlyPredictions.baseline?.length || 0} data points
- Complete Date Range: ${backendData.monthlyPredictions.baseline?.[0]?.date || 'N/A'} to ${backendData.monthlyPredictions.baseline?.slice(-1)[0]?.date || 'N/A'}
- Total Years Covered: ${backendData.monthlyPredictions.baseline?.length ? Math.ceil(backendData.monthlyPredictions.baseline.length / 12) : 0} years
- 2026 Data Available: ${backendData.monthlyPredictions.baseline?.filter(item => item.date.startsWith('2026')).length || 0} months (full year available)
- Sample 2026 Data: ${backendData.monthlyPredictions.baseline?.filter(item => item.date.startsWith('2026')).slice(0, 3).map(item => `${item.date}: ${Math.round(item.arrivals_forecast || item.total_forecast || 0).toLocaleString()} arrivals`).join(', ') || 'No 2026 data'}
- Sample 2030 Data: ${backendData.monthlyPredictions.baseline?.filter(item => item.date.startsWith('2030')).slice(0, 3).map(item => `${item.date}: ${Math.round(item.arrivals_forecast || item.total_forecast || 0).toLocaleString()} arrivals`).join(', ') || 'No 2030 data'}
- Latest Available: ${backendData.monthlyPredictions.baseline?.slice(-1)[0]?.date ? `${backendData.monthlyPredictions.baseline.slice(-1)[0].date}: ${Math.round(backendData.monthlyPredictions.baseline.slice(-1)[0].arrivals_forecast || backendData.monthlyPredictions.baseline.slice(-1)[0].total_forecast || 0).toLocaleString()} arrivals` : 'No data'}
` : 'No monthly predictions data available'}

${backendData.dailyPredictions ? `
DAILY PREDICTIONS:
- Scenarios Available: ${Object.keys(backendData.dailyPredictions).join(', ')}
- Baseline Scenario: ${backendData.dailyPredictions.baseline?.length || 0} data points
- Daily Date Range: ${backendData.dailyPredictions.baseline?.[0]?.date || 'N/A'} to ${backendData.dailyPredictions.baseline?.slice(-1)[0]?.date || 'N/A'}
- Total Daily Forecasts: ${backendData.dailyPredictions.baseline?.length || 0} days
- Latest Daily Forecast: ${backendData.dailyPredictions.baseline?.slice(-1)[0]?.date ? `${backendData.dailyPredictions.baseline.slice(-1)[0].date}: ${Math.round(backendData.dailyPredictions.baseline.slice(-1)[0].total_forecast || 0).toLocaleString()} arrivals` : 'No data'}
- Daily Coverage: ${backendData.dailyPredictions.baseline?.length ? `Approximately ${Math.floor(backendData.dailyPredictions.baseline.length / 365)} years` : 'N/A'}
` : 'No daily predictions data available'}`;
    }

    // Always include web search results, but prioritize them for attraction questions
    if (webSearchResults.length > 0) {
      context += `

WEB SEARCH RESULTS:
${webSearchResults.map((result, index) => `${index + 1}. ${result.title} (${result.link}) - ${result.snippet?.slice(0, 300)}...`).join('\n')}`;
    }

    // Include static context only for analytics questions
    if (isAnalyticsQuery && !isAttractionQuery) {
      context += `

STATIC CONTEXT:
- Monthly tourist arrival predictions with ML model accuracy of 91.8%
- Revenue data: USD 3,168.6 Million in 2024 with 53.1% growth
- Average stay: 8.42 days with 0.2% growth  
- Average daily spend: USD 181.15 with 10.0% growth
- Top source markets: India (20.3%), Russia (9.8%), UK (8.6%), Germany (6.6%), China (6.4%), USA (2.9%)`;
    }

    context += `

CAPABILITIES:
- Analyze real-time tourism predictions from ML models
- Compare different forecast scenarios (baseline, optimistic, pessimistic)
- Access daily and monthly prediction data
- Provide insights based on current tourism trends
- Generate reports and analytics
- Search web for current tourism information and attractions

User question: ${userQuestion}

Instructions:
1. Use the real-time backend data to provide accurate, up-to-date responses ONLY for analytics questions
2. Use web search results for attraction questions, general tourism info, and current events
3. For attraction questions (like Sigiriya, Kandy, Galle, etc.), focus PRIMARILY on web search results
4. Do NOT include backend arrival/revenue data when answering about specific attractions
5. Reference specific data points from predictions when relevant to analytics queries
6. Incorporate web search results for current events and trends
7. If the user asks about predictions, use the actual forecast data
8. Provide actionable insights based on the combined data sources
9. If data is not available for a specific query, acknowledge limitations
10. Be specific about dates, numbers, and trends from the actual data

FORMATTING REQUIREMENTS:
- Use **bold text** for important numbers, dates, and key insights
- Use *italics* for emphasis and trends
- Use bullet points (•) for lists of data or insights
- Use numbered lists (1., 2., 3.) for sequential information
- Use emojis (📊, 📈, 🎯, 📅, 💰, 🌍) to make data more visual
- Use line breaks between sections for readability
- Use horizontal rules (---) to separate major sections
- Use code formatting (backticks) for specific values or technical terms
- Group related information under clear headings

EXAMPLE FORMAT:
📊 **Tourism Forecast Analysis**

**Key Predictions:**
• **March 2026**: 290,728 arrivals
• **Growth Trend**: *+5.2%* compared to February 2026
• **Confidence Level**: *High* (based on ML model accuracy)

📈 **Trend Analysis:**
1. *Seasonal Pattern*: Increased arrivals in spring months
2. *Year-over-Year Growth*: Consistent upward trajectory
3. *Market Performance*: Strong performance from top source markets

---

💡 **Actionable Insights:**
• Focus marketing efforts on *high-growth periods*
• Prepare infrastructure for *peak arrival months*
• Monitor *external factors* affecting tourism

Provide a comprehensive, well-formatted response that combines all available information sources.`;

    return context;
  };

  // Function to render formatted text
  const renderFormattedText = (text) => {
    // Convert markdown-style formatting to HTML
    let formattedText = text
      // Bold text: **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italics: *text* -> <em>text</em>
      // Code: `text` -> <code>text</code>
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
      // Horizontal rules: --- -> <hr>
      .replace(/---/g, '<hr class="my-3 border-gray-300">')
      // Bullet points: • text -> <li>text</li>
      .replace(/• (.*?)(\n|$)/g, '<li class="ml-4">• $1</li>')
      // Numbered lists: 1. text -> <li>text</li>
      .replace(/^\d+\. (.*?)(\n|$)/gm, '<li class="ml-4 list-decimal">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    return formattedText;
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages([...messages, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        // First, let's check what models are available
        console.log('Calling Gemini API with question:', inputMessage);
        
        let response;
        let modelName = 'gemini-pro'; // default
        
        try {
          // Try to list available models first
          const listModelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
          if (listModelsResponse.ok) {
            const modelsData = await listModelsResponse.json();
            console.log('Available models:', modelsData);
            
            // Find a suitable model for generateContent
            const textModel = modelsData.models?.find(model => 
              model.name.includes('gemini') && 
              model.supportedGenerationMethods?.includes('generateContent')
            );
            
            if (textModel) {
              modelName = textModel.name.split('/').pop(); // Extract model name from full path
              console.log('Using model:', modelName);
            }
          }
        } catch (error) {
          console.log('Could not list models, using default');
        }
        
        // Fetch real-time data from backend APIs
        let backendData = {};
        try {
          const backendUrl = 'http://localhost:8000';
          
          // Fetch monthly predictions
          const monthlyResponse = await fetch(`${backendUrl}/api/forecasts/scenarios`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
          });
          
          if (monthlyResponse.ok) {
            const monthlyData = await monthlyResponse.json();
            backendData.monthlyPredictions = monthlyData;
          }
          
          // Fetch daily predictions
          const dailyResponse = await fetch(`${backendUrl}/api/forecasts/daily`, {
            method: 'GET', 
            mode: 'cors',
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
          });
          
          if (dailyResponse.ok) {
            const dailyData = await dailyResponse.json();
            backendData.dailyPredictions = dailyData;
          }
          
          console.log('Backend data fetched:', backendData);
        } catch (error) {
          console.log('Could not fetch backend data:', error);
        }
        
        // Perform web search for current tourism information
        let webSearchResults = [];
        try {
          // Check if user is asking about attractions, places, or general tourism info
          const isAttractionQuery = /attractions|places|visit|see|do|tourist sites|landmarks/i.test(inputMessage);
          
          // Try multiple search approaches based on query type
          const searchQueries = isAttractionQuery ? [
            `main tourist attractions Sri Lanka`,
            `best places to visit Sri Lanka`,
            `top tourist destinations Sri Lanka`,
            `Sri Lanka attractions landmarks`
          ] : [
            `Sri Lanka tourism ${inputMessage}`,
            `Sri Lanka tourism news 2024`,
            `Sri Lanka tourist arrivals 2024`
          ];
          
          for (const query of searchQueries) {
            try {
              // Use DuckDuckGo Instant Answer API (free, no API key required)
              const searchQuery = encodeURIComponent(query);
              const searchResponse = await fetch(`https://api.duckduckgo.com/?q=${searchQuery}&format=json&pretty=1`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
              });
              
              if (searchResponse.ok) {
                const searchData = await searchResponse.json();
                console.log('DuckDuckGo search result:', searchData);
                
                // Extract relevant information from DuckDuckGo
                if (searchData.Abstract && searchData.Abstract.length > 30) {
                  webSearchResults.push({
                    title: searchData.Heading || 'Tourism Information',
                    link: searchData.AbstractURL || '',
                    snippet: searchData.Abstract.substring(0, 400) + (searchData.Abstract.length > 400 ? '...' : '')
                  });
                  break; // Stop if we got useful results
                }
                
                // Also check RelatedTopics for attraction queries
                if (isAttractionQuery && searchData.RelatedTopics) {
                  const attractionTopics = searchData.RelatedTopics.slice(0, 3).map(topic => ({
                    title: topic.Text?.split(' - ')[0] || 'Tourist Attraction',
                    snippet: topic.Text?.split(' - ')[1] || 'Popular tourist destination',
                    link: topic.FirstURL || ''
                  }));
                  webSearchResults.push(...attractionTopics);
                  break;
                }
              }
            } catch (searchError) {
              console.log(`Search failed for query: ${query}`, searchError);
            }
          }
          
          // If no results from DuckDuckGo, try Wikipedia as fallback
          if (webSearchResults.length === 0) {
            try {
              const wikiQuery = isAttractionQuery ? 'Tourism in Sri Lanka' : 'Sri Lanka tourism';
              const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiQuery)}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
              });
              
              if (wikiResponse.ok) {
                const wikiData = await wikiResponse.json();
                webSearchResults.push({
                  title: wikiData.title || 'Sri Lanka Tourism',
                  link: wikiData.content_urls?.desktop?.page || '',
                  snippet: wikiData.extract || 'General tourism information about Sri Lanka'
                });
              }
            } catch (wikiError) {
              console.log('Wikipedia search failed:', wikiError);
            }
          }
          
          // For attraction queries, also try a more specific Wikipedia search
          if (isAttractionQuery && webSearchResults.length > 0) {
            try {
              const attractionsResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/Tourism_in_Sri_Lanka`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
              });
              
              if (attractionsResponse.ok) {
                const attractionsData = await attractionsResponse.json();
                webSearchResults.push({
                  title: 'Tourist Attractions in Sri Lanka',
                  link: attractionsData.content_urls?.desktop?.page || '',
                  snippet: attractionsData.extract || 'Information about tourist attractions and destinations in Sri Lanka'
                });
              }
            } catch (attractionsError) {
              console.log('Attractions search failed:', attractionsError);
            }
          }
          
        } catch (error) {
          console.log('Web search failed:', error);
        }
        
        // Try different API versions and models
        const endpoints = [
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
          `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
          // Try some common model names as fallbacks
          `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${GEMINI_API_KEY}`,
        ];
        
        let lastError;
        for (const endpoint of endpoints) {
          try {
            console.log('Trying endpoint:', endpoint.replace(GEMINI_API_KEY, 'API_KEY'));
            
            // Create enhanced context with backend data and web search
            const enhancedContext = createEnhancedContext(inputMessage, backendData, webSearchResults);
            
            const requestBody = endpoint.includes('generateText') ? {
              prompt: enhancedContext
            } : {
              contents: [{
                parts: [{
                  text: enhancedContext
                }]
              }]
            };
            
            response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody)
            });
            
            if (response.ok) {
              console.log('Success with endpoint:', endpoint.replace(GEMINI_API_KEY, 'API_KEY'));
              break; // Success! Exit the loop
            } else {
              const errorText = await response.text();
              console.log('Failed with endpoint:', endpoint.replace(GEMINI_API_KEY, 'API_KEY'), 'Status:', response.status, 'Error:', errorText);
              lastError = `Endpoint failed: ${response.status} - ${errorText}`;
            }
          } catch (error) {
            console.log('Exception with endpoint:', endpoint.replace(GEMINI_API_KEY, 'API_KEY'), 'Error:', error.message);
            lastError = `Exception: ${error.message}`;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(`All endpoints failed. Last error: ${lastError}`);
        }

        console.log('Gemini API response status:', response.status);
        console.log('Gemini API response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Gemini API error response:', errorText);
          throw new Error(`Gemini API request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API response data:', data);
        
        let botResponseText;
        
        // Handle different API response formats
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          // Gemini API response format
          botResponseText = data.candidates[0].content.parts[0].text;
        } else if (data.candidates?.[0]?.output) {
          // PaLM API response format
          botResponseText = data.candidates[0].output;
        } else if (data.text) {
          // Alternative PaLM format
          botResponseText = data.text;
        } else {
          botResponseText = "I received a response but couldn't parse it. Please try again.";
        }

        const botResponse = {
          id: messages.length + 2,
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        
        // More detailed fallback response
        const fallbackResponse = {
          id: messages.length + 2,
          text: `I apologize, but I'm experiencing technical difficulties with the AI service. Error: ${error.message}. 

However, I can still help you with basic tourism analytics based on the current data:

📊 **2024 Performance Summary:**
- Total Arrivals: 2.05M (+38.1% growth)
- Revenue: USD 3,168.6 Million (+53.1% growth)
- Average Stay: 8.42 days (+0.2% growth)
- Average Daily Spend: USD 181.15 (+10.0% growth)

🎯 **Top Source Markets:**
1. India (20.3%)
2. Russia (9.8%)
3. United Kingdom (8.6%)
4. Germany (6.6%)
5. China (6.4%)

🤖 **ML Model Performance:**
- Prediction Accuracy: 91.8%
- Next month prediction available in the overview

Would you like me to help you with specific metrics or explain any of these tourism trends in more detail?`,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, fallbackResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">AI Tourism Analytics Assistant</h2>
        <Badge className="bg-purple-100 text-purple-800">Powered by Google Gemini</Badge>
      </div>

      {/* Chat Interface */}
      <Card className="power-bi-card border-0 shadow-lg">
        <CardHeader className="pb-0 border-b border-gray-200">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
            AI Tourism Analytics Assistant
            <Badge className="ml-3 bg-purple-100 text-purple-800">Powered by Google Gemini</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-0" style={{ minHeight: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl px-6 py-4 rounded-2xl ${message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                    }`}
                >
                  <div 
                    className="text-base" 
                    dangerouslySetInnerHTML={{ 
                      __html: message.sender === 'bot' ? renderFormattedText(message.text) : message.text 
                    }}
                  />
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'opacity-80' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-900 shadow-sm max-w-2xl px-6 py-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-base">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about predictions, trends, or generate reports..."
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                disabled={isLoading}
                className="flex-1 text-base py-5 px-5 rounded-xl border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading}
                className="h-auto px-6 py-5 bg-blue-600 hover:bg-blue-700 text-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span className="ml-2 hidden sm:inline">Send</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about tourism predictions, trends, or request custom reports
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// TDMS Component - Tourist Distribution Management System
function TDMSComponent() {
  const [selectedDate, setSelectedDate] = useState('2026-01-01');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSites, setAvailableSites] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [monthlyData, setMonthlyData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [sourceSite, setSourceSite] = useState('');
  const [targetSite, setTargetSite] = useState('');
  const [distributionPercentage, setDistributionPercentage] = useState(0);
  const [simulatedData, setSimulatedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('insights');

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [datesResponse, sitesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/tdms/dates'),
          axios.get('http://localhost:8000/api/tdms/sites')
        ]);
        
        if (datesResponse.data.dates.length > 0) {
          setAvailableDates(datesResponse.data.dates);
          setSelectedDate(datesResponse.data.dates[0]);
        }
        
        if (sitesResponse.data.sites.length > 0) {
          setAvailableSites(sitesResponse.data.sites);
          setSelectedSite(sitesResponse.data.sites[0]);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Load dashboard data when date changes
  useEffect(() => {
    if (selectedDate) {
      const fetchDashboardData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/tdms/dashboard/${selectedDate}`);
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardData();
    }
  }, [selectedDate]);

  // Load monthly data when site and year change
  useEffect(() => {
    if (selectedSite && selectedYear) {
      const fetchMonthlyData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/tdms/monthly/${encodeURIComponent(selectedSite)}/${selectedYear}`);
          setMonthlyData(response.data.monthly_data || []);
        } catch (error) {
          console.error('Error fetching monthly data:', error);
        }
      };
      fetchMonthlyData();
    }
  }, [selectedSite, selectedYear]);

  // Load trend data when site changes
  useEffect(() => {
    if (selectedSite) {
      const fetchTrendData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/tdms/weekly-trend/${encodeURIComponent(selectedSite)}`);
          setTrendData(response.data.trend_data || []);
        } catch (error) {
          console.error('Error fetching trend data:', error);
        }
      };
      fetchTrendData();
    }
  }, [selectedSite]);

  // Get VLI color based on score
  const getVLIColor = (vliScore) => {
    if (vliScore < 80) return 'bg-green-500';
    if (vliScore <= 100) return 'bg-blue-500';
    if (vliScore <= 120) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Get VLI text color
  const getVLITextColor = (vliScore) => {
    if (vliScore < 80) return 'text-green-600';
    if (vliScore <= 100) return 'text-blue-600';
    if (vliScore <= 120) return 'text-amber-600';
    return 'text-red-600';
  };

  // Handle distribution simulation
  const handleDistributionSimulation = () => {
    if (!sourceSite || !targetSite || !dashboardData) return;

    const sourceData = dashboardData.vli_scores.find(s => s.site === sourceSite);
    const targetData = dashboardData.vli_scores.find(s => s.site === targetSite);
    
    if (!sourceData || !targetData) return;

    const visitorsToMove = Math.floor(sourceData.visitors * (distributionPercentage / 100));
    
    const simulatedVLIScores = dashboardData.vli_scores.map(site => {
      let newVisitors = site.visitors;
      
      if (site.site === sourceSite) {
        newVisitors = site.visitors - visitorsToMove;
      } else if (site.site === targetSite) {
        newVisitors = site.visitors + visitorsToMove;
      }
      
      const newVLIScore = (newVisitors / site.capacity) * 100;
      
      return {
        ...site,
        original_vli: site.vli_score,
        simulated_vli: Math.round(newVLIScore * 10) / 10,
        original_visitors: site.visitors,
        simulated_visitors: newVisitors
      };
    });

    setSimulatedData(simulatedVLIScores);
  };

  // Update simulation when parameters change
  useEffect(() => {
    handleDistributionSimulation();
  }, [sourceSite, targetSite, distributionPercentage, dashboardData]);

  // Export system report
  const exportSystemReport = () => {
    if (!dashboardData) return;
    
    const report = {
      report_date: new Date().toISOString(),
      selected_date: selectedDate,
      national_network_status: {
        total_visitors: dashboardData.total_visitors,
        hotspot_count: dashboardData.hotspot_count,
        highest_loaded_site: dashboardData.highest_loaded_site
      },
      severe_hotspots: dashboardData.vli_scores.filter(site => site.vli_score > 120).map(site => ({
        site: site.site,
        vli_score: site.vli_score,
        visitors: site.visitors
      })),
      redistribution_simulation: simulatedData ? {
        source_site: sourceSite,
        target_site: targetSite,
        percentage: distributionPercentage,
        results: simulatedData.filter(site => site.site === sourceSite || site.site === targetSite)
      } : null
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TDMS_Report_${selectedDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reload TDMS data
  const reloadTDMSData = async () => {
    try {
      await axios.get('http://localhost:8000/api/tdms/reload');
      // Refresh all data
      const [datesResponse, sitesResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/tdms/dates'),
        axios.get('http://localhost:8000/api/tdms/sites')
      ]);
      
      if (datesResponse.data.dates.length > 0) {
        setAvailableDates(datesResponse.data.dates);
        setSelectedDate(datesResponse.data.dates[0]);
      }
      
      if (sitesResponse.data.sites.length > 0) {
        setAvailableSites(sitesResponse.data.sites);
        setSelectedSite(sitesResponse.data.sites[0]);
      }
      
      // Force dashboard data refresh
      if (selectedDate) {
        const response = await axios.get(`http://localhost:8000/api/tdms/dashboard/${selectedDate}`);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error reloading TDMS data:', error);
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading TDMS data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tourist Distribution Management System</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Select Date:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <Button onClick={exportSystemReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export System Report</span>
          </Button>
          <Button onClick={reloadTDMSData} variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Reload Data</span>
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Prediction Insights</TabsTrigger>
          <TabsTrigger value="vli">VLI Intelligence</TabsTrigger>
          <TabsTrigger value="redistribution">Redistribution Simulator</TabsTrigger>
        </TabsList>

        {/* View 1: Prediction Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site & Year Selection</CardTitle>
                <CardDescription>Select a site and year to view prediction insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Site</label>
                    <select
                      value={selectedSite}
                      onChange={(e) => setSelectedSite(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a site...</option>
                      {availableSites.map(site => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI Metrics</CardTitle>
                <CardDescription>Key performance indicators for selected site and year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Yearly Peak Demand</p>
                        <p className="text-xl font-bold text-blue-600">
                          {monthlyData.length > 0 ? Math.max(...monthlyData.map(m => m.total_visitors)).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Average Monthly Volume</p>
                        <p className="text-xl font-bold text-green-600">
                          {monthlyData.length > 0 ? Math.round(monthlyData.reduce((sum, m) => sum + m.total_visitors, 0) / monthlyData.length).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Aggregation Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Aggregation Chart</CardTitle>
              <CardDescription>Total predicted visitors per month for {selectedSite} - {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total_visitors" fill="#3B82F6" name="Total Visitors" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a site and year to view monthly data
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View 2: VLI Intelligence */}
        <TabsContent value="vli" className="space-y-6">
          {/* National Grid Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>National Grid Heatmap</CardTitle>
              <CardDescription>15-tile grid representing all sites in network - {selectedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {dashboardData?.vli_scores?.map((site) => (
                  <div
                    key={site.site}
                    className={`${getVLIColor(site.vli_score)} p-4 rounded-lg text-white text-center`}
                  >
                    <h3 className="font-semibold text-sm mb-2">{site.site}</h3>
                    <div className="text-2xl font-bold">{Math.round(site.vli_score)}%</div>
                    <div className="text-xs opacity-90">{site.visitors} visitors</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 5-Year Trajectory */}
          <Card>
            <CardHeader>
              <CardTitle>5-Year Trajectory</CardTitle>
              <CardDescription>Growth trend for selected site (weekly downsampled data)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a site...</option>
                  {availableSites.map(site => (
                    <option key={site} value={site}>{site}</option>
                  ))}
                </select>
                
                <div className="h-80">
                  {trendData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visitors" stroke="#3B82F6" name="Visitors" />
                        <Line type="monotone" dataKey="vli_score" stroke="#EF4444" name="VLI Score" />
                      </ReLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select a site to view 5-year trend
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View 3: Redistribution Simulator */}
        <TabsContent value="redistribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Redistribution Controls</CardTitle>
                <CardDescription>Configure visitor redistribution between sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source Node</label>
                      <select
                        value={sourceSite}
                        onChange={(e) => setSourceSite(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select source...</option>
                        {dashboardData?.vli_scores?.map((site) => (
                          <option key={site.site} value={site.site}>{site.site}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Node</label>
                      <select
                        value={targetSite}
                        onChange={(e) => setTargetSite(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select target...</option>
                        {dashboardData?.vli_scores?.map((site) => (
                          <option key={site.site} value={site.site}>{site.site}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distribution Percentage: {distributionPercentage}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={distributionPercentage}
                      onChange={(e) => setDistributionPercentage(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparison Chart</CardTitle>
                <CardDescription>Original vs Simulated VLI Scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {simulatedData && sourceSite && targetSite ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={simulatedData.filter(site => site.site === sourceSite || site.site === targetSite)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="site" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="original_vli" fill="#3B82F6" name="Original VLI" />
                        <Bar dataKey="simulated_vli" fill="#10B981" name="Simulated VLI" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select source and target sites to view comparison
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PowerBIDashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;