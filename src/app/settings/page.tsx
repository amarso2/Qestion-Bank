'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, ShieldCheck, Shield, Sparkles, ArrowUpRight, UploadCloud } from 'lucide-react';

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
  examCategory: string;
  timezone: string;
  notificationEmail: boolean;
  notificationSms: boolean;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const categories = ['SSC CGL', 'Banking IBPS', 'UPSC', 'Railways', 'GATE', 'CAT'];
const timezones = ['India Standard Time (IST)', 'UTC', 'GMT', 'Eastern', 'Central'];
const badges = [
  { label: 'Top Scorer', detail: '90%+ accuracy streak', color: 'from-amber-400 to-orange-500' },
  { label: 'Daily Streak', detail: '20 days of practice', color: 'from-sky-400 to-cyan-500' },
  { label: 'Fast Learner', detail: 'Improved 18% last month', color: 'from-fuchsia-500 to-violet-500' },
];

export default function SettingsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      fullName: 'Amardip Kumar',
      email: 'akpandit1211@gmail.com',
      phone: '9876543210',
      examCategory: 'SSC CGL',
      timezone: 'India Standard Time (IST)',
      notificationEmail: true,
      notificationSms: false,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));
  };

  const onSubmit = (data: ProfileForm) => {
    console.log('Save profile', data);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Your profile</p>
              <h1 className="mt-3 text-3xl font-semibold">Profile settings</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Update your personal information, exam preferences, security settings, and achievements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {badges.map((badge) => (
                <div key={badge.label} className={`rounded-3xl border border-border bg-slate-50 p-3 text-sm text-foreground shadow-sm dark:bg-slate-900`}>
                  <p className="font-semibold">{badge.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{badge.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_0.65fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-border pb-4 text-sm font-semibold text-foreground">
                <button onClick={() => setActiveTab('profile')} className={`py-2 transition ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
                  Personal info
                </button>
                <button onClick={() => setActiveTab('preferences')} className={`py-2 transition ${activeTab === 'preferences' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
                  Preferences
                </button>
                <button onClick={() => setActiveTab('security')} className={`py-2 transition ${activeTab === 'security' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
                  Security
                </button>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {activeTab === 'profile' && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold">Full name</label>
                        <input {...register('fullName', { required: 'Name is required' })} className="form-input w-full" />
                        {errors.fullName && <p className="text-danger text-xs">{errors.fullName.message}</p>}

                        <label className="block text-sm font-semibold">Email</label>
                        <input {...register('email', { required: 'Email is required' })} className="form-input w-full" />
                        {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}

                        <label className="block text-sm font-semibold">Phone</label>
                        <input {...register('phone', { required: 'Phone is required' })} className="form-input w-full" />
                        {errors.phone && <p className="text-danger text-xs">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-semibold">Exam category</label>
                        <select {...register('examCategory')} className="form-input w-full">
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>

                        <label className="block text-sm font-semibold">Timezone</label>
                        <select {...register('timezone')} className="form-input w-full">
                          {timezones.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>

                        <div className="rounded-3xl border border-border bg-muted p-4">
                          <p className="text-sm font-semibold">Profile picture</p>
                          <div className="mt-4 flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-100">
                              {selectedImage ? (
                                <img src={selectedImage} alt="Profile" className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                  <Camera size={24} />
                                </div>
                              )}
                            </div>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground shadow-sm hover:bg-muted">
                              <UploadCloud size={16} />
                              <span>Upload photo</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="space-y-6">
                      <div className="rounded-3xl border border-border bg-slate-50 p-6">
                        <p className="text-sm font-semibold">Notification settings</p>
                        <div className="mt-4 space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" {...register('notificationEmail')} className="h-4 w-4 rounded border-input text-primary" />
                            <span className="text-sm">Email notifications for exam reminders</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" {...register('notificationSms')} className="h-4 w-4 rounded border-input text-primary" />
                            <span className="text-sm">SMS alerts for practice goals</span>
                          </label>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-border bg-slate-50 p-6">
                        <p className="text-sm font-semibold">Exam preferences</p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <button type="button" className="rounded-3xl border border-border bg-white p-4 text-left shadow-sm hover:border-primary">
                            <p className="font-semibold">Adaptive practice</p>
                            <p className="text-xs text-muted-foreground mt-1">We adjust questions based on your weak topics.</p>
                          </button>
                          <button type="button" className="rounded-3xl border border-border bg-white p-4 text-left shadow-sm hover:border-primary">
                            <p className="font-semibold">Daily target</p>
                            <p className="text-xs text-muted-foreground mt-1">Set a daily mock or revision goal.</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="rounded-3xl border border-border bg-slate-50 p-6">
                        <p className="text-sm font-semibold">Change password</p>
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold">Current password</label>
                            <input type="password" {...register('currentPassword', { required: 'Enter current password' })} className="form-input w-full" />
                            {errors.currentPassword && <p className="text-danger text-xs">{errors.currentPassword.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold">New password</label>
                            <input type="password" {...register('newPassword', { minLength: { value: 8, message: 'At least 8 characters' } })} className="form-input w-full" />
                            {errors.newPassword && <p className="text-danger text-xs">{errors.newPassword.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold">Confirm new password</label>
                            <input type="password" {...register('confirmNewPassword', { validate: (value) => value === newPassword || 'Passwords must match' })} className="form-input w-full" />
                            {errors.confirmNewPassword && <p className="text-danger text-xs">{errors.confirmNewPassword.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-sky-500 p-3 text-white">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Achievement badge</p>
                  <p className="text-xs text-muted-foreground">Earned for consistent performance and top accuracy.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {badges.map((badge) => (
                  <div key={badge.label} className="rounded-3xl border border-border bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{badge.label}</p>
                        <p className="text-xs text-muted-foreground">{badge.detail}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold">Profile progress</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-3xl bg-muted p-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Profile completion</span>
                    <span>82%</span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[82%] rounded-full bg-primary" />
                  </div>
                </div>
                <div className="rounded-3xl bg-muted p-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Next milestone</span>
                    <span>Complete exam preferences</span>
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-foreground">Set your preferred exam types and reminders to unlock the next achievement.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
