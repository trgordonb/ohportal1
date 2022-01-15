import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className="w-full h-96 bg-hero-pattern text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl text-white font-semibold z-20">{t('welcome')}</h1>
      <h2 className="text-2xl text-white font-semibold z-20">{t('energy')}</h2>
    </div>
  )
}