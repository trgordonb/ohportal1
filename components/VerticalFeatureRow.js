import className from 'classnames';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

const VerticalFeatureRow = (props) => {
  const verticalFeatureClass = className(
    'mt-20',
    'flex',
    'flex-wrap',
    'items-center',
    {
      'flex-row-reverse': props.reverse,
    }
  );

  const router = useRouter();

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h2 className="text-3xl text-gray-900 font-semibold">{props.title}</h2>
        <ReactMarkdown className="mt-6 text-base leading-6 whitespace-pre-wrap list-disc" children={props.description} />
      </div>

      <div className="w-full sm:w-1/2 p-6">
        {
          props.imageOverride ?
          <img className='mx-auto' src={`${router.basePath}${props.image}`} alt={props.imageAlt}/>:
          <img className='mx-auto' src={`${router.basePath}${props.image}`} alt={props.imageAlt} width={300} height={300}/>
        }
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
