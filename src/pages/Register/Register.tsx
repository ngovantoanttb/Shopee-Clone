import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import images from 'src/assets'
import Button from 'src/components/Button'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate(path.login)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', { message: formError.email, type: 'Server'})
          // }
          // if (formError?.password) {
          //   setError('password', { message: formError.password, type: 'Server' })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-primary'>
      <div className='flex justify-center items-center flex-col'>
        <div className='relative w-[1040px]'>
          <img src={images.banner} className='h-[600px] w-[1040px]' alt='Shopee Background' />
          <div className='absolute right-0 top-1/2 -translate-y-1/2 shadow-lg'>
            <form className='p-10 rounded bg-white shadow-sm w-[400px]' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />
                <Input
                  name='password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  autoComplete='on'
                />
                <Input
                  name='confirm_password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.confirm_password?.message}
                  placeholder='Confirm Password'
                  autoComplete='on'
                />
              </div>
              <div className='mt-2'>
                <Button
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                  className=' hover:bg-orange-600 rounded w-full bg-primary shadow-[#00000017] text-white py-4 px-2 uppercase opacity-90 text-sm flex items-center justify-center'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-primary ml-1' to={path.login}>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
