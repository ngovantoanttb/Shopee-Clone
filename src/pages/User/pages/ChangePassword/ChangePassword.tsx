import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import * as yup from 'yup'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password']) as yup.ObjectSchema<FormData>

export default function ChangePassword() {
  const methods = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = methods

  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='px-7 text-sm pb-10 bg-white shadow'>
      <Helmet>
              <title>Shopee | Mua và bán online</title>
              <meta name='description' content='Shopee Mua bán online' />
            </Helmet>
      <div className='py-5.5 border-b border-gray-200'>
        <div className='text-lg '>Thêm mật khẩu</div>
        <div className='text-gray-500'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
      </div>

      <form className='pt-5.5' onSubmit={onSubmit}>
        <div className=''>
          <div className='space-y-4 w-full flex flex-col'>
            <div className='flex items-start w-full'>
              <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Mật khẩu cũ</label>
              <Input
                register={register}
                type='password'
                name='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
                className='relative'
                classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
              />
            </div>

            <div className='flex items-start w-full'>
              <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Mật khẩu mới</label>
              <Input
                type='password'
                name='new_password'
                placeholder='Mật khẩu mới'
                register={register}
                errorMessage={errors.new_password?.message}
                className='relative'
                classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
              />
            </div>

            <div className='flex items-start w-full'>
              <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Nhập lại mật khẩu</label>
              <Input
                type='password'
                name='confirm_password'
                placeholder='Nhập lại mật khẩu'
                register={register}
                errorMessage={errors.confirm_password?.message}
                className='relative'
                classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
              />
            </div>
          </div>

          <Button className='py-2 px-5 text-white bg-primary my-3 cursor-pointer rounded-sm ml-40'>Xác nhận</Button>
        </div>
      </form>
    </div>
  )
}
