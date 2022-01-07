import { FaRocket } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/Form.module.css'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

export default function DeviceRegistrationPage() {
  const [deviceId, setDeviceId] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const { t, i18n } = useTranslation()

  const { doRequest, errors } = useRequest({
    url: 'https://ohbiohealth.xyz/api/devices',
    method: 'post',
    body: {
      deviceId,
      deviceType
    },
    onSuccess: (data) => {
      if (data && data.id) {
        toast.info('Device record added sucessfully')
      }
      setDeviceId('')
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <FaRocket /> {t('regdevice')}
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='deviceId'>{t('deviceid')}</label>
            <input
              id='deviceId'
              value={deviceId}
              type="text"
              onChange={(e) => setDeviceId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='devicetype'>{t('devicetype')}</label>
            <select onChange={(e) => setDeviceType(e.target.value)} id="devicetype" name="devicetype">
                <option value="QM">QM</option>
                <option value="BM">BM</option>
                <option value="BES">BES</option>
            </select>
          </div>

          <input type='submit' value={t('submit')} className='btn' />
        </form>

        <p>
          <Link href='/admin/approve'>{t('approve')}</Link>
        </p>

      </div>
    </div>
  )
}