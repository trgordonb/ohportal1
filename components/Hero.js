import styles from '@/styles/Hero.module.css'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t, i18n } = useTranslation()

  return (
    <div className={styles.hero}>
      <h1>{t('welcome')}</h1>
      <h2>{t('energy')}</h2>
    </div>
  )
}