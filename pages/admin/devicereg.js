import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

export default function DeviceRegistrationPage() {
  const [deviceId, setDeviceId] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const { t } = useTranslation()

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
      <div className='w-full md:w-96 md:max-w-full mx-auto'>
        <h1 className='mt-10 font-bold text-xl'>{t('regdevice')}</h1>
      </div>
      <ToastContainer />
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label className='block mb-6'>
                <span className='text-gray-700'>{t('deviceid')}</span>
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
              <label class="block mb-6">
                <span class="text-gray-700">{t('devicetype')}</span>
                <select
                  name="devicetype"
                  id="devicetype"
                  class="
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
                  onChange={(e) => setDeviceType(e.target.value)}
                >
                  <option value="QM">QM</option>
                  <option value="BM">BM</option>
                  <option value="BES">BES</option>
                  <option value="SEG">SEG</option>
                </select>
              </label>
            </div>
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
          </form>
          <p>
            <Link href='/admin/approve'>{t('approve')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}