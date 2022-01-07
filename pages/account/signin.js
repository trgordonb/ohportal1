import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/Form.module.css'
import { useTranslation } from 'react-i18next'

export default function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { t, i18n } = useTranslation()

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
    
    await doRequest()
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
          <FaUser /> {t('login')}
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

          <input type='submit' value={t('login')} className='btn' />
        </form>

        <p>
          {t('noaccount')} <Link href='/account/signup'>{t('register')}</Link>
        </p>
      </div>
    </div>
  )
}