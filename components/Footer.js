import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import styles from '../styles/Footer.module.css'
import GooglePlayIconEN from '../public/images/googleplaybadgeEN.png'
import GooglePlayIconZH from '../public/images/googleplaybadgeZH.png'

export default function Footer() {
    const { t, i18n } = useTranslation()
    const [GooglePlayIcon, setGooglePlayIcon] = useState(i18n.language === 'en' ? GooglePlayIconEN : GooglePlayIconZH)

    useEffect(() => {
        setGooglePlayIcon(i18n.language === 'en' ? GooglePlayIconEN : GooglePlayIconZH)
    },[i18n.language])

    return (   
        <footer className={styles.footer}>
            <div>
                <p>
                    <Link href="https://www.youtube.com/channel/UCXjd7VSLVHL3R3GUZ_LqtQw"><FaYoutube size={25} className={styles.icon}/></Link>
                    <Link href="https://www.instagram.com/ohbiohealth"><FaInstagram size={25} className={styles.icon}/></Link>
                    <Link href="https://www.facebook.com/OnourHolistic"><FaFacebook size={25} className={styles.icon}/></Link>
                    <Link href="https://play.google.com/store/apps/details?id=org.ohbiohealth.healthtracker"><Image src={GooglePlayIcon} width={100} height={40}/></Link>
                </p>
                <p>Copyright &copy; OH Biohealth 2022</p>
            </div>
        </footer>
    )
}