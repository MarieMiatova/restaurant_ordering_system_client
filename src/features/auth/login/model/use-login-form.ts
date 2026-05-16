import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../entities/user/model';
import { loginSchema, type LoginFormData } from '../lib/validations';
import type { RootState, AppDispatch } from '../../../shared/lib/store';

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login(data));
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
