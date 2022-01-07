import React from 'react'
import { useEffect } from 'react'
import useRequest from '../hooks/use-request'

const ProductBrowser = (props) => {
    const { doRequest, errors } = useRequest({
        url: '/api/profiles/orders',
        method: 'post',
        onSuccess: (data) => {
        }
    });

    useEffect(() => {
        let ecwidLoaded = false;

        function load_ecwid() {
        if( typeof Ecwid != 'undefined' ) {
            Ecwid.OnAPILoaded.add(function() {
            if (!ecwidLoaded) {
                ecwidLoaded = true;
                if (props.currentUser) {
                    Ecwid.Cart.setCustomerEmail(props.currentUser.email)
                }
                xProductBrowser("categoriesPerRow=3", "views=grid(3,3) list(10) table(20)", "categoryView=grid", "searchView=list", "id=ecStoreProductBrowser");
            }
            });
            Ecwid.OnOrderPlaced.add(async (order) => {
                let sentOrder = { orderNumber: order.orderNumber, total: order.total, items: order.items }
                sentOrder.items = sentOrder.items.map(item => {
                    return({
                        product: {
                            price: item.product.price,
                            name: item.product.name,
                            sku: item.product.sku,
                            url: item.product.url
                        },
                        quantity: item.quantity
                    })
                })

                if (props.currentUser) {
                    await doRequest({ 
                        orderNumber: sentOrder.orderNumber,
                        total: sentOrder.total,
                        items: sentOrder.items
                    })
                }
            })
        }}

        window.ec = window.ec || {};
        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
        window.ec.config.storefrontUrls.cleanUrls = true;
        window.ec.config.storefrontUrls.queryBasedCleanUrls = true;

        window.ecwid_script_defer = true;
        window.ecwid_dynamic_widgets = true;
    
        if (!document.getElementById('ecwid-script')) {
            var script = document.createElement('script');
            script.charset = 'utf-8';
            script.type = 'text/javascript';
            script.src = 'https://app.ecwid.com/script.js?' + props.storeId + '&data_platform=nextjs';
            script.id = 'ecwid-script'
            script.onload = load_ecwid
            document.body.appendChild(script);
        } else {
        load_ecwid()
        }
    },[])

    return (
        <div id="ecStoreProductBrowser"></div>
    )
}

ProductBrowser.defaultProps = {storeId: 13433173};

export default ProductBrowser