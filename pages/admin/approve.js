import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

ApprovalPage.getInitialProps = async (appContext, client) => {
  const { data } = await client.get('https://ohbiohealth.xyz/api/devices/proofs');
  return { data }
}

export default function ApprovalPage({ data }) {
  const { t } = useTranslation()

  const { doRequest, errors } = useRequest({
    url: 'http://ohbiohealth.xyz/api/devices/proofs',
    method: 'put',
    onSuccess: (data) => {
      if (data) {
        toast.info('Approval status updated')
      }
    }
  });

  const handleSubmit = async (e) => {
    const action = e.target.id.slice(0,3) === 'app' ? 'approved' : 'rejected'
    const deviceId = e.target.id.slice(3, e.target.id.length)
    await doRequest({ 
        deviceId,
        action
    })
  }
  const lists = data.map((record) => { return (
    <li key={record._id}>
      <p>Device Id: {record._id}</p>
      <p>Email: {record.email}</p>
      <a href={record.purchaseProofUrl}>View receipt here</a>
      <button id={`app${record._id}`} onClick={handleSubmit}>Approve</button>
      <button id={`rej${record._id}`} onClick={handleSubmit}>Reject</button>
    </li>
  )})

  useEffect(() => {
    if (errors) {
      toast.error(errors)
    }
  },[errors])

  return (
    <div>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <ToastContainer />
        <h1 className='mt-10 font-bold text-xl'>
          {t('regdevice')}
        </h1>
        <ul>
          {lists}
        </ul>
      </div>
    </div>
  )
}