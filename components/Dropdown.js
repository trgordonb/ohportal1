import { useTranslation } from 'react-i18next'

export default function DropDown({ title, items, short, links, isLanguageMenu=false }) {
    const { t, i18n } = useTranslation()  
    const zip = rows => rows[0].map((_,c)=>rows.map(row=>row[c]))
    const languageList = ['en','zh']

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <div className="relative group">
            {
                isLanguageMenu &&
                <button className="mt-1 block px-2 py-1 text-white font-semibold rounded group-hover:bg-gray-800 sm:mt-0 sm:ml-2">
                	&#127760;&nbsp;{title}
                </button>
            }
            {
                !isLanguageMenu &&
                <button className="mt-1 block px-2 py-1 text-white font-semibold rounded group-hover:bg-gray-800 sm:mt-0 sm:ml-2">
                	{title}
                </button>
            }
            
            <div className={`hidden group-hover:block absolute right-0 py-0 ${short? 'w-18':'w-36'} bg-white shadow-xl`}>
                {
                    !isLanguageMenu &&
                    zip([items,links]).map(([item, link]) => {
                        return (
                            <a key={item} className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white" href={link}>{item}</a>
                        )
                    })
                }
                {
                    isLanguageMenu &&
                    zip([items, links, languageList]).map(([item, link, lang]) => {
                        return (
                            <a key={item} className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white" href={link} onClick={()=>changeLanguage(lang)}>        
                                {item}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}