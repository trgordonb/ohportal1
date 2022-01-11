import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { Section } from '../components/Section'
import {VerticalFeatureRow } from '../components/VerticalFeatureRow'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import CookieConsent from "react-cookie-consent";
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import { useTranslation } from 'react-i18next';

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
        },
        faq: {
          en: dataEN.filter(item => item.type==='faq')[0].text
        }
      }
    }
}

export default function HomePage({ currentUser, data }) {
  const { t, i18n } = useTranslation();
  const [aboutContent, setAboutContent] = useState(data.about[i18n.language])
  const [technologyContent, setTechnologyContent] = useState(data.technology[i18n.language])
  const [BMContent, setBMContent] = useState(data.BM[i18n.language])
  const [QMContent, setQMContent] = useState(data.QM[i18n.language])
  const [BESContent, setBESContent] = useState(data.BES[i18n.language])
  const [SEGContent, setSEGContent] = useState(data.SEG[i18n.language])
  const [contactContent, setContactContent] = useState(data.contact[i18n.language])
  const [faqContent, setFAQContent] = useState(data.faq.en)
  

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
      <Section
        id="about"
        title={t('aboutus')}
        description={aboutContent}
        large={true}
      >
        <div id="technology">
          <VerticalFeatureRow
            title={t('qtechnology')}
            description={technologyContent}
            image="/images/feature.svg"
            imageAlt="First feature alt text"
            imageOverride={true}
          />  
        </div> 
        <div id="productsBM">  
          <VerticalFeatureRow
            title='BM'
            description={BMContent}
            image="/images/BM.png"
            imageAlt="BM alt text"
            reverse={true}
          />   
        </div>
        <div id="productsQM">  
          <VerticalFeatureRow
            title='QM'
            description={QMContent}
            image="/images/QE.png"
            imageAlt="QM alt text"
          />   
        </div>
        <div id="productsBES">  
          <VerticalFeatureRow
            title='BES'
            description={BESContent}
            image="/images/BES.png"
            imageAlt="BES alt text"
            reverse={true}
          />   
        </div>
        <div id="productsSEG">  
          <VerticalFeatureRow
            title='SEG'
            description={SEGContent}
            image="/images/SEG.png"
            imageAlt="SEG alt text"
          />   
        </div>
      </Section>
      <div id="services" className='flex flex-wrap'>
        <div className="w-full sm:w-1/2 mt-20 text-center sm:px-6">
            <h3 className="text-3xl text-gray-900 font-semibold">{t('services')}</h3>
            <div className='mt-20 flex flex-wrap'>
              <div className="w-full sm:w-1/2 m-15">
                <img className='mx-auto' src="https://cms.ohbiohealth.club/uploads/Onour_224eb9361d.png" width={200} height={200}/>
              </div>
              <div className="w-full sm:w-1/2 m-15">
                <img className='mx-auto' src="https://cms.ohbiohealth.club/uploads/woopie_27f9b598d3.png" width={200} height={200}/>
              </div>
            </div> 
        </div>
        <div className="w-full sm:w-1/2 mt-20 text-center sm:px-6">
            <h3 className="text-3xl text-gray-900 font-semibold">{t('partners')}</h3>
            <div className='mt-20 flex flex-wrap'>
              <div className="w-full sm:w-1/2 m-15">
                <img className='mx-auto' src="https://cms.ohbiohealth.club/uploads/cyberport_d8cac9ac3f.png" width={200} height={200}/>
              </div>
              <div className="w-full sm:w-1/2 m-15">
                <img className='mx-auto' src="https://cms.ohbiohealth.club/uploads/jade_16a737d4f2.png" width={200} height={200}/>
              </div>
            </div>
        </div>
      </div>
      <div id="faq">
        <Section
          title={t('faq')}
          description={faqContent}
        />
      </div>
      <div id="contact">
        <Section
          title={t('contact')}
          description={contactContent}
        />
      </div>
      <div> 
        <Section>
          <NewsletterSubscribe mailChimpUrl={data.link} />
        </Section>
      </div>
    </div>
  )
}
