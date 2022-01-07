import { useState } from 'react';
import { decode } from 'html-entities';
import styles from '../styles/Newsletter.module.css'
import { useTranslation } from 'react-i18next'

const NewsletterForm = ( { status, message, onValidated }) => {
  const [ error, setError ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const { t, i18n } = useTranslation()

  const handleFormSubmit = () => {
    setError(null);

    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });
    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  const handleInputKeyEvent = ( event ) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  }

  const getMessage = (message) => {
    if ( !message ) {
     return null;
    }
    const result = message?.split('-') ?? null;
    if ( "0" !== result?.[0]?.trim() ) {
     return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode( formattedMessage ) : null;
  }

  return (
    <>
      <div className={styles.newsletter}>
          <h2>{t('subscribe')}</h2>
            <div className={styles.formgroup}>
                <input
                    onChange={(event) => setEmail(event?.target?.value ?? '')}
                    type="email"
                    placeholder={t('youremail')}
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                />
                <button className={styles.subscribeBtn} onClick={handleFormSubmit}>
                    {t('submit')}
                </button>
            </div>
            <div className={styles.message}>
                {status === "sending" && <div>{t('sending')}</div>}
                {status === "error" || error ? (
                    <div dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}/>) : null }
                {status === "success" && status !== "error" && !error && (
                    <div>{t('thanksubscribe')}</div>
                )}
            </div>
        </div>
    </>
  );
}

export default NewsletterForm