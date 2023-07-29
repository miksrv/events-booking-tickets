import { useBookingPostMutation } from '@/api/api'
import { APIRequestBooking, APIResponseError } from '@/api/types'
import React, { useCallback, useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

import styles from './styles.module.sass'

type TBookingForm = {
    email: string
    phone: string
    name: string
    adults: number
    children: number
}

type TFormBookingProps = {
    event: string
}

const FormBooking: React.FC<TFormBookingProps> = ({ event }) => {
    const [booking, { isLoading, isSuccess, isError, error }] =
        useBookingPostMutation()

    const [submitted, setSubmitted] = useState<boolean>(false)
    const [formState, setFormState] = useState<TBookingForm>(mapFormProps())

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handleKeyDown = (e: { key: string }) =>
        e.key === 'Enter' && handleSubmit()

    const findError = (field: keyof APIRequestBooking) =>
        (error as APIResponseError)?.messages?.[field] || undefined

    const handleSubmit = useCallback(() => {
        setSubmitted(true)
        booking({
            event,
            ...formState
        })
    }, [formState, booking])

    return (
        <div className={styles.bookingForm}>
            <Form
                onSubmit={handleSubmit}
                loading={isLoading}
                success={isSuccess && submitted}
                error={isError && submitted}
                size={'small'}
            >
                <Message
                    error
                    header={'Ошибка сохранения'}
                    content={
                        'При сохранении автора были допущены ошибки, проверьте правильность заполнения полей'
                    }
                />
                <Message
                    success
                    header={'Автор сохранен'}
                    content={'Все данные автора успешно сохранены'}
                />
                <Form.Input
                    fluid
                    required={true}
                    name={'name'}
                    label={'Как вас зовут?'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={findError('name')}
                    defaultValue={formState?.name}
                />
                <Form.Input
                    fluid
                    required={true}
                    name={'email'}
                    label={'Email'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={findError('email')}
                    defaultValue={formState?.email}
                />
                <Form.Input
                    fluid
                    name={'phone'}
                    label={'Номер телефона'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={findError('phone')}
                    defaultValue={formState?.phone}
                />
                <Form.Input
                    fluid
                    required={true}
                    type={'number'}
                    name={'adults'}
                    label={'Количество взрослых'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={findError('adults')}
                    defaultValue={formState?.adults}
                />
                <Form.Input
                    fluid
                    required={true}
                    type={'number'}
                    name={'children'}
                    label={'Количество детей'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={findError('children')}
                    defaultValue={formState?.children}
                />
            </Form>
            <Button
                size={'tiny'}
                onClick={handleSubmit}
                color={'green'}
                disabled={isLoading || !formState?.name}
                loading={isLoading}
            >
                Сохранить
            </Button>
            <Button
                size={'small'}
                color={'grey'}
            >
                Отмена
            </Button>
        </div>
    )
}

const mapFormProps = (value?: TBookingForm | undefined): TBookingForm => ({
    adults: value?.adults ?? 1,
    children: value?.children ?? 0,
    email: value?.email ?? '',
    name: value?.name ?? '',
    phone: value?.phone ?? ''
})

export default FormBooking
