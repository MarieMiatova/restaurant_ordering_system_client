import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../entities/user/model';
import { registerSchema, type RegisterFormData } from '../lib/validations';
import type { RootState, AppDispatch } from '../../../shared/lib/store';

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await dispatch(register({ ...data, role: data.role || 'user' }));
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
