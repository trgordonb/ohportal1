import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { t, i18n } = useTranslation()

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
    <div>
      <div className={styles.form}>
        <h1>
          <FaUser /> {t('register')}
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>{t('email')}</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>{t('password')}</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>{t('confirmpwd')}</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <input type='submit' value={t('register')} className='btn' />
        </form>

        <p>
          {t('haveaccount')} <Link href='/account/signin'>{t('signin')}</Link>
        </p>
      </div>
    </div>
  )
}