import Link from 'next/link'
import { CenteredFooter } from './CenteredFooter';
import { Section } from './Section';
import { useTranslation } from 'react-i18next';

export default function Footer(props) {
    const { t, i18n } = useTranslation();
    return (
        <div className='bg-gray-100'>
            <Section>
                <CenteredFooter
                    iconList={
                        <>
                          <Link href="https://www.facebook.com/OnourHolistic">
                            <a>
                              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                              </svg>
                            </a>
                          </Link>
              
                          <Link href="https://www.youtube.com/channel/UCXjd7VSLVHL3R3GUZ_LqtQw">
                            <a>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                              </svg>
                            </a>
                          </Link>
              
                          <Link href="https://www.instagram.com/ohbiohealth">
                            <a>
                              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z" />
                              </svg>
                            </a>
                          </Link>
                        </>
                    }
                >
                    <li>
                        <Link href="/privacy">
                            <a>{t('privacy')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/terms">
                            <a>{t('terms')}</a>
                        </Link>
                    </li>
                </CenteredFooter>
            </Section>
        </div>
    )

}