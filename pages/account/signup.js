import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { t } = useTranslation()

  const { doRequest, errors } = useRequest({
      url: 'https://ohbiohealth.xyz/api/users/signup',
      method: 'post',
      body: {
        email,
        password
      },
      withCredentials: false,
      onSuccess: () => Router.push({
        pathname: '/account/profile',
      })
    });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!')
      return
    }

    doRequest()
  }

  useEffect(() => {
    if (errors) {
      toast.error(errors)
    }
  },[errors])

  return (
    <div className='py-16'>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <h1 className='mt-10 mb-10 px-4 font-bold text-3xl'>{t('register')}</h1>
      </div>
      <ToastContainer />
        <div className="w-full md:w-96 md:max-w-full mx-auto p-4 bg-indigo-100">
          <div className="p-6 border border-gray-300 sm:rounded-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-6">
                <span className="text-gray-700">{t('email')}</span>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">{t('password')}</span>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">{t('confirmpwd')}</span>
                <input
                  type='password'
                  id='passwordConfirm'
                  name='passwordConfirm'
                  className="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </label>
              <input 
                type='submit'   
                value={t('register')} 
                className="
                  h-10
                  px-5
                  text-indigo-100
                  bg-indigo-700
                  rounded-lg
                  transition-colors
                  duration-150
                  focus:shadow-outline
                  hover:bg-indigo-800
                "
              />
          </div>
        </form>
      </div>
      <p className='mt-2 p-6'>
        {t('haveaccount')} <Link href='/account/signin'>{t('signin')}</Link>
      </p>
    </div>
  </div>)
}