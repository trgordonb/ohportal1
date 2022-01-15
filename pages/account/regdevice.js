import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
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
    <div className='py-16'>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <h1 className="mt-10 mb-10 px-4 font-bold text-3xl">{t('regdevice')}</h1>
      </div>
      <ToastContainer />
      <div className="w-full md:w-96 md:max-w-full mx-auto p-4 bg-indigo-100">
        <div className="p-6 border border-gray-300 sm:rounded-md">
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
        <p className='mt-6 mb-6'>{fileName}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-6">
                <span className="text-gray-700">{t('deviceid')}</span>
                <input
                  id='deviceId'
                  name='deviceId'
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
                  value={deviceId}
                  type="text"
                  onChange={(e) => setDeviceId(e.target.value)}
                />
              </label>
              <input 
                type='submit' 
                value={t('submit')} 
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
      </div>
    </div>
  )
}