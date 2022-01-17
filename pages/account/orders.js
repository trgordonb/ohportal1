import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useAppState } from '../../hooks/use-appstate'

//OrdersPage.getInitialProps = async (context, client, currentUser) => {
//  const res = await client.get(`/api/profiles/${currentUser.id}`)
//  return {
//      data: res.data.orders
//  }
//}

export default function OrdersPage() {
  const { t } = useTranslation()
  const { currentUser, setCurrentUser } = useAppState()
  const data = []

  useEffect(() => {
    setCurrentUser({
      usertype: 'client',
      email: 'trgordonb@icloud.com',
      id: '61d46e7e59e8f3a982c174b1',
      hasProvidedInfo: true,
      hasFinishedSurvey: false,
      hasBoughtDevice: true,
      hasRegDevice: false
    })
  },[])
  const lists = data.map((order) => { return (
    <li key={order._id}>
        <p>{new Date(order.orderDate).toISOString().slice(0,10)} &nbsp;&nbsp; {t('total')}: ${order.total}</p>
        {
          order.items.map((item) => { return (
            <p key={item.product.name}><a href={item.product.url}>{item.product.name}(SKU:{item.product.sku})</a> &nbsp;&nbsp; ${item.product.price} X {item.quantity}</p>
          )})
        }
    </li>
  )})

  return (
    <div className='py-16'>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <h1 className='mt-10 mb-10 px-4 font-bold text-3xl'>
          {t('order')}
        </h1>
        <ul>
            {lists}
        </ul>
      </div>
    </div>
  )
}