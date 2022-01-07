import styles from '../styles/Layout.module.css'
import { useTranslation } from 'react-i18next'
import ProductBrowser from '../components/ProductBrowser'

ShopPgae.getInitialProps = () => {
    const storeId = process.env.NEXT_PUBLIC_ECWID_STOREID
    return { 
        data: storeId 
    }
}

export default function ShopPage({ data, currentUser }) {
    const { t, i18n } = useTranslation()
    
    return (
        <div className={styles.container}>
            {
                <ProductBrowser
                    storeId={data}
                    currentUser={currentUser}
                />
            }
            
        </div>
    )
}

