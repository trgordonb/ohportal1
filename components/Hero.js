import styles from '@/styles/Hero.module.css'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className={styles.hero}>
      <h1 className="text-3xl text-white font-semibold">{t('welcome')}</h1>
      <h2 className="text-xl text-white font-semibold">{t('energy')}</h2>
    </div>
  )
}