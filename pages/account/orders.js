import styles from '../../styles/Form.module.css'
import { useTranslation } from 'react-i18next'

OrdersPage.getInitialProps = async (context, client, currentUser) => {
  const res = await client.get(`/api/profiles/${currentUser.id}`)
  return {
      data: res.data.orders
  }
}

export default function OrdersPage({ data }) {
  const { t } = useTranslation()

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
    <div>
      <div className={styles.form}>
        <h1>
          {t('order')}
        </h1>
        <ul>
            {lists}
        </ul>
      </div>
    </div>
  )
}