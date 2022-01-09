import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

const Section = (props) => (
  <div
    className={`max-w-screen-lg mx-auto px-3 ${
      props.yPadding ? props.yPadding : 'py-16'
    }`}
  >
    {(props.title || props.description) && (
      <div className="mb-12 text-center">
        {props.title && (
          <h2 className="text-4xl text-gray-900 font-bold">{props.title}</h2>
        )}
        {props.description && props.large && (
          <ReactMarkdown className="mt-6 text-xl leading-9 whitespace-pre-wrap" children={props.description} escapeHtml={true} />
        )}
        {props.description && !props.large && (
          <ReactMarkdown className="mt-6 text-base leading-6 whitespace-pre-wrap" children={props.description} escapeHtml={true} />
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
