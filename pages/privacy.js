import styles from '../styles/Layout.module.css'
import ReactMarkdown from 'react-markdown';

PrivacyPage.getInitialProps = async (ctx) => {
    const options = { headers: new Headers({'Content-Type': 'application/json'}) }
    const res = await fetch('https://cms.ohbiohealth.club/documents?type=privacy', {
        method: 'GET', ...options
    })
    const data = await res.json()
    return {
        data: data[0].text
    }
}

export default function PrivacyPage({ data }) {

    return (
        <div className={styles.container}>
            <h2 className="text-3xl text-gray-900 font-semibold">Privacy Policy</h2>
            <ReactMarkdown className="mt-6 text-ms leading-6 whitespace-pre-wrap" children={data} /> 
        </div>
    )
}

