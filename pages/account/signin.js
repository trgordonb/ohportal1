import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { useTranslation } from 'react-i18next'
import { useAppState } from '../../hooks/use-appstate'

export default function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCurrentUser } = useAppState()
  const { t } = useTranslation()

  const { doRequest, errors } = useRequest({
    url: 'https://ohbiohealth.xyz/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    withCredentials: false,
    onSuccess: (user) => {
      if (user && user.hasProvidedInfo) {
        Router.push('/')
      } else {
        Router.push('/account/profile')
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    //await doRequest()
    setCurrentUser({
      usertype: 'client',
      email,
      id: '61d46e7e59e8f3a982c174b1',
      hasProvidedInfo: true,
      hasFinishedSurvey: false,
      hasBoughtDevice: true,
      hasRegDevice: false
    })
    Router.push('/')
  }

  useEffect(() => {
    if (errors) {
      toast.error(errors)
    }
  },[errors])

  return (
    <div className='py-16'>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <h1 className='mt-10 mb-10 px-4 font-bold text-3xl'>{t('login')}</h1>
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
              <input 
                type='submit'   
                value={t('login')} 
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
          {t('noaccount')} <Link href='/account/signup'>{t('register')}</Link>
        </p>
      </div>
    </div>
  )
}