import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FormData, getRules } from 'src/utils/rules'

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-primary'>
      <div className='flex justify-center items-center flex-col'>
        <div className='relative w-[1040px]'>
          <img
            src='https://down-vn.img.susercontent.com/file/sg-11134004-7rcdu-m6hs9t6ff10y6b'
            className='h-[600px] w-[1040px]'
            alt='Shopee Background'
          />

          <div className='absolute right-0 top-1/2 -translate-y-1/2  shadow-lg'>
            <form className='p-10 rounded bg-white shadow-sm w-[400px]' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <div className='mt-2'>
                  <input
                    type='email'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='Email'
                    {...register('email', rules.email)}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
                </div>
                <div className='mt-2'>
                  <input
                    type='password'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='Password'
                    autoComplete='on'
                    {...register('password', rules.password)}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
                </div>
                <div className='mt-2'>
                  <input
                    type='password'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='Confirm Password'
                    autoComplete='on'
                    {...register('confirm_password', { ...rules.confirm_password })}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
                </div>
              </div>
              <div className='mt-2'>
                <button className='cursor-pointer rounded w-full hover:bg-orange-600 text-center bg-primary shadow-[#00000017] text-white py-4 px-2 uppercase opacity-90 text-sm'>
                  Đăng Ký
                </button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-primary ml-1' to='/login'>
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
