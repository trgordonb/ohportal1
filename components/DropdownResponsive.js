import { useState } from "react"
import { useTranslation } from 'react-i18next'

export default function DropDownResponsive({ title, items, links, isLanguageMenu=false }) {
    const { t, i18n } = useTranslation()  
    const [isOpen, setIsOpen] = useState(false)
    const languageList = ['en','zh']

    const zip = rows => rows[0].map((_,c)=>rows.map(row=>row[c]))
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <div className="px-2 py-1 sm:hidden mt-2">
            {
                isLanguageMenu &&
                <button onClick={() => setIsOpen(!isOpen)} className="text-white font-semibold block">
                    &#127760;&nbsp;{title}&nbsp;&#x25BC;
                </button>
            }
            {
                !isLanguageMenu &&
                <button onClick={() => setIsOpen(!isOpen)} className="text-white font-semibold block">
                    {title}&nbsp;&#x25BC;
                </button>
            }
            
            <div className="">
                {
                    !isLanguageMenu && isOpen && zip([items, links]).map(([item, link]) => {
                        return (
                            <a key={item} className="mt-2 block text-gray-400 hover:text-white" href={link}>{item}</a>
                        )
                    })
                }
                {
                    isLanguageMenu && isOpen && zip([items, links, languageList]).map(([item, link, lang]) => {
                        return (
                            <a key={item} className="mt-2 block text-gray-400 hover:text-white" href={link} onClick={()=>{changeLanguage(lang)}}>
                                 {item}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}