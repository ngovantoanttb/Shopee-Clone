import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginSchema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import { LoginAccount } from 'src/types/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import images from 'src/assets'

type FormData = Omit<Schema, 'confirm_password'>

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => LoginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
          <img
            src={images.banner}
            className='h-[600px] w-[1040px]'
            alt='Shopee Background'
          />

          <div className='absolute right-0 top-1/2 -translate-y-1/2 shadow-lg'>
            <form className='p-10 rounded bg-white shadow-sm w-[400px]' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
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
                  className='mt-4'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                />
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='cursor-pointer hover:bg-orange-600 rounded w-full text-center bg-primary shadow-[#00000017] text-white py-4 px-2 uppercase opacity-90 text-sm'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                  <Link className='text-primary ml-1' to='/register'>
                    Đăng kí
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

