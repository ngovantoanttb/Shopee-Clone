import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'
import * as yup from 'yup'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import Button from 'src/components/Button'
import { AppContext } from 'src/contexts/app.context'
import { setProfiletoLS } from 'src/utils/auth'
import { INVALID_AVATAR_URL } from 'src/assets'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'
import { Helmet } from 'react-helmet-async'

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      {/* Tên */}
      <div className='flex items-start w-full'>
        <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Tên</label>
        <Input
          register={register}
          name='name'
          placeholder='Tên'
          errorMessage={errors.name?.message}
          className=''
          classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
        />
      </div>

      {/* Số điện thoại */}
      <div className='flex items-start w-full'>
        <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Số điện thoại</label>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputNumber
              placeholder='Số điện thoại'
              errorMessage={errors.phone?.message}
              className=''
              classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </Fragment>
  )
}
type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick([
  'name',
  'address',
  'phone',
  'date_of_birth',
  'avatar'
]) as yup.ObjectSchema<FormData>

// Flow 1
// Nhấn Upload: Upload lên server luôn => server trả về url ảnh
// Nhấn Submit thì gửi url ảnh + data lên server

// Flow 2
// Nhấn Upload: không upload lên server
// Nhấn Submit thì tiến hành upload lên server, nếu upload thành công thì tiến hành gọi api updateProfile
export default function Profile() {
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : undefined
  }, [file])
  const { setProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({ queryKey: ['profile'], queryFn: userApi.getProfile })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })
  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch
  } = methods

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfiletoLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
          toast.error('Có lỗi xảy ra khi cập nhật ảnh')
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='px-7 text-sm pb-10 bg-white shadow'>
      <Helmet>
        <title>Shopee | Mua và bán online</title>
        <meta name='description' content='Shopee Mua bán online' />
      </Helmet>
      <div className='py-5.5 border-b border-gray-200'>
        <div className='text-lg '>Hồ Sơ Của Tôi</div>
        <div className='text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <FormProvider {...methods}>
        <form className='pt-5.5' onSubmit={onSubmit}>
          <div className=' grid grid-cols-3 gap-6 '>
            <div className='space-y-4 w-full flex flex-col col-span-2 border-r border-gray-200 pr-10'>
              {/* Tên đăng nhập */}
              <div className='flex items-center justify-start w-full mx-auto'>
                <label className='w-40 text-gray-600 text-sm text-right pr-4'>Tên đăng nhập</label>
                <span className='text-gray-800 ml-2'>{profile?.email.split('@gmail.com')}</span>
              </div>

              <Info />

              {/* Email */}
              <div className='flex items-center justify-start w-full'>
                <label className='w-40 text-gray-600 text-sm text-right pr-4'>Email</label>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-800'>{profile?.email}</span>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className='flex items-start w-full'>
                <label className='w-40 text-gray-600 text-sm text-right pr-4 mt-2'>Địa chỉ</label>
                <Input
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                  className=''
                  classNameInput='border border-gray-300 w-80 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-primary'
                />
              </div>

              {/* Ngày sinh */}
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* Button Lưu */}
              <div className='ml-40 mt-4'>
                <Button
                  type='submit'
                  className='bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm'
                >
                  Lưu
                </Button>
              </div>
            </div>

            {/* Avatar */}
            <div className='colspan-1 mx-auto text-center'>
              <div className=''>
                {previewImage ? (
                  <img src={previewImage} alt={profile?.name} className='rounded-full w-28 h-28 mx-auto object-cover' />
                ) : profile?.avatar && profile.avatar !== INVALID_AVATAR_URL ? (
                  <img
                    src={profile.avatar}
                    alt={profile?.name}
                    className='rounded-full w-28 h-28 mx-auto object-cover'
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className='text-6xl px-7 py-6 text-gray-300 bg-gray-100 rounded-full'
                  />
                )}
              </div>

              <InputFile onChange={handleChangeFile} />

              <div className='text-left text-gray-400'>
                <p>Dụng lượng file tối đa 1 MB. </p>
                <p>Định dạng:.JPEG, .PNG</p>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
