import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

const CenteredFooter = (props) => (
  <div className="text-center">
    <nav>
      <ul className="navbar mt-5 flex flex-row justify-center font-medium text-xl text-gray-800">
        {props.children}
      </ul>
    </nav>
    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>
    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>
    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
);

export { CenteredFooter };
