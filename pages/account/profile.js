import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-appstate'
import { useTranslation } from 'react-i18next'
import { useAppState } from '../../hooks/use-appstate'

export default function ProfilePage() {
    const [weight, setWeight] = useState()
    const [height, setHeight] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [gender, setGender] = useState()
    const { t } = useTranslation('common')
    const { currentUser, setCurrentUser } = useAppState()

    /**const { doRequest, errors } = useRequest({
        url: `https://ohbiohealth.xyz/api/profiles/${currentUser?.id}`,
        method: 'put',
        body: {
            weight,
            height,
            gender,
            dateOfBirth
        },
        withCredentials: true,
        onSuccess: () => Router.push({
            pathname: '/',
        })
    });*/

    const handleSelect = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        if (id === 'male' || id === 'female') {
            setGender(value)
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //doRequest()
        setCurrentUser({
            ...currentUser,
            hasProvidedInfo: true
        })
        Router.push('/')
    }

    const intRx = /\d/,
    integerChange = (event) => {
        if (
        (event.key.length > 1) || 
        ( (event.key === '-') && (!event.currentTarget.value.length)) || 
        intRx.test(event.key)
         ) return;
        event.preventDefault();
    };
  
    if (process.browser) {
        for (let input of document.querySelectorAll('input[type="number"][step="1"]')) 
            input.addEventListener("keydown", integerChange);
    }

    useEffect(() => {
        //if (errors) {
        //  toast.error(errors)
        //}
    },[])
  
    return (
        <div className='py-16'>
            <div className="w-full md:w-96 md:max-w-full mx-auto">
                <h1 className='mt-10 mb-10 px-4 font-bold text-2xl'>{t('moredetail')}</h1>
            </div>
            <ToastContainer />
            <div className="w-full md:w-96 md:max-w-full mx-auto p-4 bg-indigo-100">
                <div className="p-6 border border-gray-300 sm:rounded-md">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='block mb-6'>
                                <span className='text-gray-700'>{t('height')}</span>
                                <input
                                    id='height'
                                    name='height'
                                    value={height}
                                    type='number'
                                    min='0'
                                    step='1'
                                    pattern="/d+"
                                    className="
                                        block
                                        w-full
                                        mt-1
                                        border-gray-300
                                        rounded-md
                                        shadow-sm
                                        focus:border-indigo-300
                                        focus:ring
                                        focus:ring-indigo-200
                                        focus:ring-opacity-50
                                    "
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </label>
                            <label className='block mb-6'>
                                <span className='text-gray-700'>{t('weight')}</span>
                                <input
                                    id='weight'
                                    name='weight'
                                    type='number'
                                    value={weight}
                                    min='0'
                                    step='1'
                                    pattern="/d+"
                                    className="
                                        block
                                        w-full
                                        mt-1
                                        border-gray-300
                                        rounded-md
                                        shadow-sm
                                        focus:border-indigo-300
                                        focus:ring
                                        focus:ring-indigo-200
                                        focus:ring-opacity-50
                                    "
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </label>
                            <label className='block mb-6'>
                                <span className='text-gray-700'>{t('dateofbirth')}</span>
                                <input
                                    id='dateOfBirth'
                                    name='dateOfBirth'
                                    type='date'
                                    value={dateOfBirth}
                                    className="
                                        block
                                        w-full
                                        mt-1
                                        border-gray-300
                                        rounded-md
                                        shadow-sm
                                        focus:border-indigo-300
                                        focus:ring
                                        focus:ring-indigo-200
                                        focus:ring-opacity-50
                                    "
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </label>
                            <label className='block mb-6'>
                                <span className='text-gray-700'>{t('gender')}</span>
                                    <div class="mb-6">
                                        <div class="mt-2">
                                            <div>
                                                <label class="inline-flex items-center">
                                                    <input
                                                        name="gender"
                                                        id="male"
                                                        type="radio"
                                                        value="male"
                                                        onChange={handleSelect}
                                                        className="
                                                            text-indigo-600
                                                            border-gray-300
                                                            rounded-full
                                                            shadow-sm
                                                            focus:border-indigo-300
                                                            focus:ring
                                                            focus:ring-offset-0
                                                            focus:ring-indigo-200
                                                            focus:ring-opacity-50
                                                        "
                                                    />
                                                    <span class="ml-2">{t('male')}</span>
                                                </label>
                                            </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                                <input
                                                    name="gender"
                                                    id='female'
                                                    type="radio"
                                                    class="
                                                        text-indigo-600
                                                        border-gray-300
                                                        rounded-full
                                                        shadow-sm
                                                        focus:border-indigo-300
                                                        focus:ring
                                                        focus:ring-offset-0
                                                        focus:ring-indigo-200
                                                        focus:ring-opacity- 
                                                    "
                                                    value="female"
                                                    onChange={handleSelect}
                                                />
                                                <span class="ml-2">{t('female')}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <input 
                            type='submit' 
                            value={t('submit')} 
                            className="
                                h-10
                                px-5
                                text-indigo-100
                                bg-indigo-700
                                rounded-lg
                                transition-colors
                                duration-150
                                focus:shadow-outline
                                hover:bg-indigo-800
                            "
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}