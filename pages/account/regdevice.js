import { FaRocket } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import styles from '../../styles/Form.module.css'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

DeviceRegPage.getInitialProps = async (ctx) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
  return {
      cloudName,
      preset
  };
}

export default function DeviceRegPage({ cloudName, preset }) {
  const [deviceId, setDeviceId] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('-')
  const { t } = useTranslation()

  const { doRequest, errors } = useRequest({
    url: 'https://ohbiohealth.xyz/api/devices',
    method: 'put',
    body: {
      deviceId: deviceId,
      purchaseProofUrl: fileUrl
    },
    withCredentials: true,
    onSuccess: (data) => {
      if (data && data.id) {
        toast.info('Device sucessfully registered')
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
        <WidgetLoader />
        <Widget
          sources={['local']}
          cloudName={cloudName}
          uploadPreset={preset}
          folder={'ohbiohealth'}
          logging={false}
          onSuccess={(res) => {
            let tmpFileUrl = res.info.url
            if (res.info.format === 'pdf'){
              tmpFileUrl = tmpFileUrl.slice(0, tmpFileUrl.length-3) + 'jpg'
            }
            setFileName(res.info.original_filename)
            setFileUrl(tmpFileUrl)
          }}
          onFailure={(res) => console.log(res)}
        />
        <p>{fileName}</p>
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
            
          <input type='submit' value={t('submit')} className='btn' />
        </form>

      </div>
    </div>
  )
}