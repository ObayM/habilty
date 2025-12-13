'use client';

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Check, X, LoaderCircle, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

const USERNAME_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}


export default function OnboardingForm() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  const debouncedUsername = useDebounce(username, 500);
  const router = useRouter();


  const checkAvailability = useCallback(async (name) => {

    if (!USERNAME_REGEX.test(name)) {
      setIsAvailable(false);
      return;
    }
    
    setIsChecking(true);
    setError(null);

    try {

      const res = await fetch(`/api/onboarding?username=${name}`);
      if (!res.ok) throw new Error("Check failed");

      const data = await res.json();
      setIsAvailable(data.isAvailable);

    } catch (e) {
      console.error(e);
      setIsAvailable(null);

    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    const name = debouncedUsername.trim().toLowerCase();

    if (name) checkAvailability(name);

    else setIsAvailable(null);
  }, [debouncedUsername, checkAvailability]);


  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const candidate = username.trim().toLowerCase();

    if (!isAvailable) return setError("Username unavailable.");
    if (!user) return setError("Please log in.");

    setLoading(true);

    try {

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: candidate }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }


      router.push("/dashboard");
      router.refresh();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const hasValidationError = username.length > 0 && !USERNAME_REGEX.test(username);

  return (
    <div className="w-full max-w-md mx-auto">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <Label htmlFor="username">Choose a username</Label>
          <div className="relative">

            <User className="absolute w-5 h-5 text-gray-400 top-4 left-4 z-10" />

            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g obay :)"
              className="pl-12 pr-12"
              maxLength={39}
              autoComplete="off"

              error={!isChecking && (isAvailable === false || hasValidationError) && username.length > 0}

            />

            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">

              {isChecking && <LoaderCircle className="h-5 w-5 text-slate-400 animate-spin" />}

              {!isChecking && isAvailable === true && <Check className="h-6 w-6 text-green-500" />}

              {!isChecking && (isAvailable === false || hasValidationError) && username.length > 0 && <X className="h-6 w-6 text-red-500" />}

            </div>
          </div>

          <p id="username-hint" className="mt-2 text-xs text-slate-500 font-medium">
            Lowercase letters, numbers, and hyphens. 3-39 characters.
          </p>

        </div>


        {error && (
          <div className="bg-red-50 border-2 border-red-100 p-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] text-center" role="alert">
            <p className="font-bold text-red-700">Error</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!error && isAvailable === false && !isChecking && username.length > 0 && (
          <p className="text-sm text-red-600 font-bold text-center">This username has already been taken.</p>
        )}

        {!error && hasValidationError && (
          <p className="text-sm text-red-600 font-bold text-center">Invalid format. Please follow the rules above.</p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || isChecking || !isAvailable || hasValidationError}
            loading={loading}
            variant="primary"
            className="w-full text-lg"
          >
            {!loading && "Complete Profile"}
          </Button>
        </div>
        
      </form>
    </div>
  );
}