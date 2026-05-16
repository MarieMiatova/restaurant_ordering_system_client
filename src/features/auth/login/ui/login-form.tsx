import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoginForm } from '../model/use-login-form';
import { Input } from '../../../../shared/ui/input';
import { Button } from '../../../../shared/ui/button';
import type { RootState } from '../../../../shared/lib/store';

export const LoginForm: React.FC = () => {
  const { form, onSubmit, isLoading } = useLoginForm();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          error={form.formState.errors.username?.message}
        />
        
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={form.formState.errors.password?.message}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};
