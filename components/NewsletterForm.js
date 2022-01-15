import { useState } from 'react';
import { decode } from 'html-entities';
import { useTranslation } from 'react-i18next'

const NewsletterForm = ( { status, message, onValidated }) => {
  const [ error, setError ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const { t } = useTranslation()

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
      <div className="w-full md:w-96 md:max-w-full mx-auto bg-indigo-300 rounded-lg shadow-lg">
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <label className="block mb-6">
            <span className="text-gray-700 text-xl font-bold">
              {t('subscribe')}
            </span>
            <input
              className="block px-2 py-2 w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(event) => setEmail(event?.target?.value ?? '')}
              type="email"
              placeholder={t('youremail')}
              onKeyUp={(event) => handleInputKeyEvent(event)}
            />
          </label>
          <div className="mb-6">
            <button className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800" onClick={handleFormSubmit}>
              {t('submit')}
            </button>
          </div>
          <div className="mb-6">
              {status === "sending" && <div>{t('sending')}</div>}
              {status === "error" || error ? (
                  <div dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}/>) : null }
              {status === "success" && status !== "error" && !error && (
                  <div>{t('thanksubscribe')}</div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsletterForm