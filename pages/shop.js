import { useTranslation } from 'react-i18next'
import ProductBrowser from '../components/ProductBrowser'

ShopPage.getInitialProps = async (ctx) => {
    const storeId = process.env.NEXT_PUBLIC_ECWID_STOREID
    return {
        data: storeId 
    }
}

export default function ShopPage({ data, currentUser }) {
    const { t } = useTranslation()
    
    return (
        <div className='m-auto p-5 max-w-4xl'>
            {
                <ProductBrowser
                    storeId={data}
                    currentUser={currentUser}
                />
            }
            
        </div>
    )
}

