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
      <div className={`w-full sm:w-1/2 text-center sm:px-6 py-6 rounded-lg shadow-lg bg-gradient-to-r ${props.reverse? ' from-cyan-300 to-indigo-500': ' from-indigo-500 to-cyan-300'}`}>
        <h2 className="text-3xl text-gray-800 font-semibold">{props.title}</h2>
        <ReactMarkdown className="mt-6 text-base text-gray-800 leading-6 whitespace-pre-wrap list-disc" children={props.description} />
      </div>

      <div className="w-full sm:w-1/2 p-6">
        {
          props.imageOverride ?
          <img className='mx-auto p-4' src={`${router.basePath}${props.image}`} alt={props.imageAlt}/>:
          <img className='mx-auto p-4' src={`${router.basePath}${props.image}`} alt={props.imageAlt} width={300} height={300}/>
        }
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
