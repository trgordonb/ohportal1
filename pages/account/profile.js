import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import styles from '../../styles/Form.module.css'
import useRequest from '../../hooks/use-request'
import { useTranslation } from 'react-i18next'

export default function ProfilePage({ currentUser }) {
    const [weight, setWeight] = useState()
    const [height, setHeight] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [gender, setGender] = useState()
    const { t } = useTranslation('common')

    const { doRequest, errors } = useRequest({
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
    });

    const handleSelect = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        if (id === 'male' || id === 'female') {
            setGender(value)
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        doRequest()
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
        if (errors) {
          toast.error(errors)
        }
    },[errors])
  
    return (
        <div>
        <div className={styles.form}>
            <h2>
            <FaUser /> {t('moredetail')}
            </h2>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='height'>{t('height')}</label>
                <input
                    id='height'
                    value={height}
                    type='number'
                    min='0'
                    step='1'
                    pattern="/d+"
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='weight'>{t('weight')}</label>
                <input
                    id='weight'
                    type='number'
                    value={weight}
                    min='0'
                    step='1'
                    pattern="/d+"
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='dateOfBirth'>{t('dateofbirth')}</label>
                <input
                    id='dateOfBirth'
                    type='date'
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div>
                <p>{t('gender')}</p>
                <div className={styles.genderselect}>
                    <label className={styles.selecttext}>
                        <input 
                            id="male"
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleSelect}
                        />
                        {t('male')}
                    </label>
                    <label className={styles.selecttext}>
                        <input 
                            id="female"
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleSelect}
                        />
                        {t('female')}
                    </label>
                </div>         
            </div>

            <input type='submit' value={t('submit')} className='btn' />
            </form>

        </div>
        </div>
    )
}