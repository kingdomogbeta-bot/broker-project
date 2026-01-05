import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    currency: '',
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany',
    'France', 'Japan', 'Singapore', 'Hong Kong', 'UAE', 'South Africa', 'Brazil',
    'Mexico', 'Nigeria', 'Other'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.username.length < 4) newErrors.username = 'Username must be at least 4 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
    return newErrors;
  };

  const handleNext = () => {
    let stepErrors = {};
    if (currentStep === 1) stepErrors = validateStep1();
    if (currentStep === 2) stepErrors = validateStep2();

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep3();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mb-4">
            <span className="text-white text-2xl font-bold">Ƃ</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join thousands of successful traders - Step {currentStep} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-all ${
                step <= currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl border border-slate-700 p-8 space-y-6">
          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.fullName ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe2024"
                  className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.username ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                <p className="text-slate-400 text-xs mt-1">4+ characters, letters and numbers only</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${
                    errors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </>
          )}

          {/* STEP 2: Security */}
          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-bold text-white mb-6">Set Your Password</h2>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition pr-12 ${
                      errors.password ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                <div className="mt-3 space-y-2">
                  <p className="text-slate-400 text-xs">Password strength:</p>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          formData.password.length >= i * 3 ? 'bg-green-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition pr-12 ${
                      errors.confirmPassword ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-400 text-sm mt-1 flex items-center gap-1"><Check size={16} /> Passwords match</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-300 text-xs font-semibold mb-2">Password requirements:</p>
                <ul className="text-slate-400 text-xs space-y-1">
                  <li>✓ At least 8 characters</li>
                  <li>✓ Mix of uppercase and lowercase</li>
                  <li>✓ Include numbers and special characters</li>
                </ul>
              </div>
            </>
          )}

          {/* STEP 3: Location & Verification */}
          {currentStep === 3 && (
            <>
              <h2 className="text-xl font-bold text-white mb-6">Location & Preferences</h2>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Country of Residence *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white focus:outline-none transition ${
                    errors.country ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Currency *</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-900 border rounded-lg text-white focus:outline-none transition ${
                    errors.currency ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                >
                  <option value="">Select a currency</option>
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
                {errors.currency && <p className="text-red-400 text-sm mt-1">{errors.currency}</p>}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-5 h-5 bg-slate-900 border border-slate-600 rounded cursor-pointer mt-0.5"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-slate-300 cursor-pointer leading-relaxed">
                    I agree to Aurex Capital's <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">Terms of Service</a>, <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">Privacy Policy</a>, and <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">Risk Disclosure</a> *
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-red-400 text-sm ml-8">{errors.agreeTerms}</p>}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleChange}
                    className="w-5 h-5 bg-slate-900 border border-slate-600 rounded cursor-pointer mt-0.5"
                  />
                  <label htmlFor="agreeMarketing" className="text-sm text-slate-300 cursor-pointer">
                    I'd like to receive trading tips, market updates, and promotional offers
                  </label>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  🔒 Your data is encrypted using SSL/TLS. By creating an account, you agree to our policies and consent to regulatory compliance verification.
                </p>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 py-3 border border-slate-600 text-slate-300 hover:text-white rounded-lg font-semibold transition-all"
              >
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-400 text-sm pt-2">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Sign in
            </button>
          </p>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm text-center">
            💳 No credit card required. Start trading with demo funds instantly after registration.
          </p>
        </div>
      </div>
    </div>
  );
}
