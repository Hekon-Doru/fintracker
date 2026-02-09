import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Alert from '../components/common/Alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserCircleIcon, KeyIcon, BellIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      // TODO: Implement API call to update profile
      console.log('Updating profile:', data);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const onSubmitPassword = async (_data: PasswordFormData) => {
    try {
      // TODO: Implement API call to change password
      console.log('Changing password');
      setPasswordSuccess(true);
      resetPassword();
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: UserCircleIcon },
    { id: 'security' as const, label: 'Security', icon: KeyIcon },
    { id: 'notifications' as const, label: 'Notifications', icon: BellIcon },
    { id: 'appearance' as const, label: 'Appearance', icon: PaintBrushIcon },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Profile Information
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Update your account's profile information and email address.
            </p>

            {profileSuccess && (
              <Alert variant="success" className="mb-4">
                Profile updated successfully!
              </Alert>
            )}

            <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
              <Input
                type="text"
                label="Name"
                {...registerProfile('name')}
                error={profileErrors.name?.message}
              />

              <Input
                type="email"
                label="Email"
                {...registerProfile('email')}
                error={profileErrors.email?.message}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmittingProfile}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Change Password
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Ensure your account is using a long, random password to stay secure.
            </p>

            {passwordSuccess && (
              <Alert variant="success" className="mb-4">
                Password changed successfully!
              </Alert>
            )}

            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
              <Input
                type="password"
                label="Current Password"
                {...registerPassword('current_password')}
                error={passwordErrors.current_password?.message}
              />

              <Input
                type="password"
                label="New Password"
                {...registerPassword('new_password')}
                error={passwordErrors.new_password?.message}
                helperText="Must be at least 8 characters with uppercase, lowercase, and number"
              />

              <Input
                type="password"
                label="Confirm New Password"
                {...registerPassword('confirm_password')}
                error={passwordErrors.confirm_password?.message}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmittingPassword}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Notification Preferences
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Manage how you receive notifications and updates.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Budget Alerts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when you exceed budget limits
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Goal Milestones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when you reach goal milestones
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Weekly Reports</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive weekly spending summary reports
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Transaction Reminders</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Remind you to log daily transactions
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="primary">
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Appearance Settings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Customize how the application looks to you.
            </p>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
                  </p>
                </div>
                <Button variant="secondary" onClick={toggleTheme}>
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </Button>
              </div>

              {/* Currency Display */}
              <div className="py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Currency Display</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Choose your preferred currency format
                </p>
                <select className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              {/* Date Format */}
              <div className="py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Date Format</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Choose your preferred date format
                </p>
                <select className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Compact Mode</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use a more compact layout with reduced spacing
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="primary">
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
