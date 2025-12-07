'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/components/auth/actions';
import Link from 'next/link';
import { Mail, KeyRound, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { redirect } from 'next/navigation';

import  Button  from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import  Card  from '@/components/ui/Card';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      loading={pending}
      variant="primary"
      className="w-full text-lg"
    >
      {!pending && <><LogIn className="w-5 h-5" /> Sign In</>}
    </Button>
  );
}


export default function LoginPage() {
  const { user } = useAuth();
  const initialState = { message: '' };
  const [state, dispatch] = useFormState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  if (user) return redirect("/");

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-104px)] px-4 py-12 relative overflow-hidden">

      <Card className="w-full max-w-lg relative z-10">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-600">
            Sign in to access your account!
          </p>
        </div>

        <form action={dispatch} className="space-y-6">

          <div>
            <Label htmlFor="email">Email address</Label>
            
            <div className="relative">

              <Mail className="absolute w-5 h-5 text-gray-400 top-4 left-4 z-10" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="pl-12"
              />
            </div>

          </div>

          <div>

            <Label htmlFor="password">Password</Label>
            
            <div className="relative">
              <KeyRound className="absolute w-5 h-5 text-gray-400 top-4 left-4 z-10" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="pl-12 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-[#ff7e5f] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>

            </div>

          </div>

          {state?.message && (
            <div className="p-4 bg-red-50 border-2 border-red-100 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] text-center">
              <p className="text-red-600 font-bold">{state.message}</p>
            </div>
          )}

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>

        <p className="mt-8 text-center text-gray-600 text-lg">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-[#ff7e5f] hover:underline decoration-wavy decoration-2">
            Sign Up
          </Link>
        </p>
      </Card>
    </main>
  )
}