import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

const NewsletterSubscribe = ({ mailChimpUrl }) => {
  return (
    <MailchimpSubscribe
      url={ mailChimpUrl }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
            status={ status }
            message={ message }
            onValidated={ formData => subscribe( formData ) }
          />
        );
      } }
    />
  );
};

export default NewsletterSubscribe;