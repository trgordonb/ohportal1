import React from "react";
import { useTranslation } from 'react-i18next'

function YesNoOptions(props) {
  const { t, i18n } = useTranslation()
  const data = [
    {
      text: t('y'),
      handler: props.actionProvider.handleYes,
      id: 1
    },
    {
      text: t('n'),
      handler: props.actionProvider.handleNo,
      id: 2
    },
  ];
  const optionsList = data.map((option) => (
    <button className="bg-gray-300 cursor-pointer border-indigo-700 p-2 m-2 rounded-md min-w-fit focus:text-white focus:bg-indigo-500" key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));

  return (
    <div>
      <p>{optionsList}</p>
    </div>
  );
}

export default YesNoOptions;