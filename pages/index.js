import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import styles from '../styles/Layout.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import CookieConsent from "react-cookie-consent";
import { useTranslation } from 'react-i18next'
import NewsletterSubscribe from '../components/NewsletterSubscribe'

HomePage.getInitialProps = async (ctx) => {
  const mailChimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL
  const storeId = process.env.NEXT_PUBLIC_ECWID_STOREID
  const options = {headers: new Headers({'Content-Type': 'application/json'})}
  const resEN = await fetch('https://cms.ohbiohealth.club/documents', {
    method: 'GET', ...options
  })
  const resZH = await fetch('https://cms.ohbiohealth.club/documents?_locale=zh-Hant&&', {
    method: 'GET', ...options
  })
  const dataEN = await resEN.json()
  const dataZH = await resZH.json()

  return { 
      data: {
          link: mailChimpUrl,
          storeId: storeId,
          about: {
            en: dataEN.filter(item=> item.type==='aboutus')[0].text,
            zh: dataZH.filter(item=> item.type==='aboutus')[0].text
          },
          technology: {
            en: dataEN.filter(item=> item.type==='technology')[0].text,
            zh: dataZH.filter(item=> item.type==='technology')[0].text
          },
          BM: {
            en: dataEN.filter(item=> item.type==='BMfunctions')[0].text,
            zh: dataZH.filter(item=> item.type==='BMfunctions')[0].text
          },
          QM: {
            en: dataEN.filter(item=> item.type==='QMfunctions')[0].text,
            zh: dataZH.filter(item=> item.type==='QMfunctions')[0].text
          },
          BES: {
            en: dataEN.filter(item=> item.type==='BESfunctions')[0].text,
            zh: dataZH.filter(item=> item.type==='BESfunctions')[0].text
          },
          SEG: {
            en: dataEN.filter(item=> item.type==='SEGfunctions')[0].text,
            zh: dataZH.filter(item=> item.type==='SEGfunctions')[0].text
          },
          contact: {
            en: dataEN.filter(item=> item.type==='contact')[0].text,
            zh: dataZH.filter(item=> item.type==='contact')[0].text
          }
      }
  }
}

export default function HomePage({ currentUser, data }) {
  const { t, i18n } = useTranslation()
  const [aboutContent, setAboutContent] = useState(data.about[i18n.language])
  const [technologyContent, setTechnologyContent] = useState(data.technology[i18n.language])
  const [BMContent, setBMContent] = useState(data.BM[i18n.language])
  const [QMContent, setQMContent] = useState(data.QM[i18n.language])
  const [BESContent, setBESContent] = useState(data.BES[i18n.language])
  const [SEGContent, setSEGContent] = useState(data.SEG[i18n.language])
  const [contactContent, setContactContent] = useState(data.contact[i18n.language])

  useEffect(() => {
    setAboutContent(data.about[i18n.language])
    setTechnologyContent(data.technology[i18n.language])
    setBMContent(data.BM[i18n.language])
    setQMContent(data.QM[i18n.language])
    setBESContent(data.BES[i18n.language])
    setSEGContent(data.SEG[i18n.language])
    setContactContent(data.contact[i18n.language])
    
    
  },[i18n.language])

  const closeChatbot = () => {
    setShowChatBot(false)
  }

  return (
    <div>
      <Hero />
      <ToastContainer />
      <CookieConsent
        buttonText={t('ok')}
      >{t('cookie')}
      </CookieConsent>  
      <div id="about" className={styles.container}>
          <h1>{t('aboutus')}</h1>
          <p>{aboutContent}</p>
      </div>
      <div id="technology" className={styles.container}>
          <h1>{t('technology')}</h1>
          <p>{technologyContent}</p>
      </div>
      <div id="services" className={styles.container}>
            <h1>{t('services')}</h1>
            <img src="https://cms.ohbiohealth.club/uploads/Onour_224eb9361d.png"/>
            <img src="https://cms.ohbiohealth.club/uploads/woopie_27f9b598d3.png"/>
            <h1>{t('partners')}</h1>
            <img src="https://cms.ohbiohealth.club/uploads/cyberport_d8cac9ac3f.png"/>
            <img src="https://cms.ohbiohealth.club/uploads/jade_16a737d4f2.png"/>
      </div>
      <div id="productsBM" className={styles.container}>
          <h1>BM</h1>
          <p>{BMContent}</p>
      </div>
      <div id="productsQM" className={styles.container}>
          <h1>QM</h1>
          <p>{QMContent}</p>     
      </div>
      <div id="productsBES" className={styles.container}>
            <h1>BES</h1>
            <p>{BESContent}</p>
      </div>
      <div id="productsSEG" className={styles.container}>
            <h1>SEG</h1>
            <p>{SEGContent}</p>
      </div>
      <div id="faq" className={styles.container}>
            <h1>FAQ</h1>
      </div>
      <div id="contact" className={styles.container}>
            <h1>{t('contact')}</h1>
            <p>{contactContent}</p>
      </div>
      <div className={styles.container}> 
        <NewsletterSubscribe mailChimpUrl={data.link} />
      </div>
    </div>
  )
}
