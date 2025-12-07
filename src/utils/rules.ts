import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

export interface FormData {
  email: string
  password: string
  confirm_password: string,
}

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions<FormData>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Email không hợp lệ'
    },
    maxLength: {
      value: 160,
      message: 'Email không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Email không được ít hơn 6 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu không được ít hơn 6 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại mật khẩu không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu không được ít hơn 6 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const {price_min, price_max} = this.parent as {price_min: string, price_max: string}
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ')
    .max(160, 'Email không được quá 160 ký tự')
    .min(6, 'Email không được ít hơn 6 ký tự'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .max(160, 'Mật khẩu không được quá 160 ký tự')
    .min(6, 'Mật khẩu không được ít hơn 6 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu không được để trống')
    .max(160, 'Mật khẩu không được quá 160 ký tự')
    .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm không được để trống')
})

export type Schema = yup.InferType<typeof schema>
