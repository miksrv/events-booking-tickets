import { TEvent } from '@/api/types'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import { Button, Grid } from 'semantic-ui-react'

import FormBooking from '@/components/form-booking'

import styles from './styles.module.sass'

type TEventRegistrationProps = {
    event: TEvent
}

const EventRegistration: React.FC<TEventRegistrationProps> = ({ event }) => {
    const [showRegistrationForm, setShowRegistrationForm] =
        React.useState<boolean>(false)

    return (
        <div className={styles.eventRegistration}>
            <h3 className={styles.sectionTitle}>{event.title}</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column
                        computer={9}
                        mobile={16}
                    >
                        {showRegistrationForm ? (
                            <FormBooking
                                event={event.id}
                                onCancelRegistration={() =>
                                    setShowRegistrationForm(false)
                                }
                            />
                        ) : (
                            <div className={styles.sectionImage}>
                                <Image
                                    className={styles.eventImage}
                                    src={`http://localhost:8080/images/${event.image}`}
                                    alt={event.title}
                                    width={500}
                                    height={200}
                                />
                            </div>
                        )}
                    </Grid.Column>
                    <Grid.Column
                        computer={7}
                        mobile={16}
                    >
                        <div className={styles.information}>
                            {event.address && (
                                <div className={styles.infoSection}>
                                    <h4>Место проведения</h4>
                                    <div>{event.address}</div>
                                    <div>
                                        {event.address_link && (
                                            <a
                                                href={event.address_link}
                                                title={
                                                    'Место проведения на Яндекс.Картах'
                                                }
                                            >
                                                Ссылка на карту
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                            {event.date && (
                                <div className={styles.infoSection}>
                                    <h4>Дата проведения</h4>
                                    {moment(event.date).format(
                                        'MMMM Do YYYY, H:mm'
                                    )}
                                </div>
                            )}
                            {event.registration_start && (
                                <div className={styles.infoSection}>
                                    <h4>Начало регистрации</h4>
                                    {moment(event.registration_start).format(
                                        'MMMM Do YYYY, H:mm'
                                    )}
                                </div>
                            )}
                            {event.registration_stop && (
                                <div className={styles.infoSection}>
                                    <h4>Окончание регистрации</h4>
                                    {moment(event.registration_stop).format(
                                        'MMMM Do YYYY, H:mm'
                                    )}
                                </div>
                            )}
                            {!!event?.registration_limit &&
                                event.registration_limit > 0 && (
                                    <div className={styles.infoSection}>
                                        <h4>Осталось мест</h4>
                                        <div className={styles.numbers}>
                                            {event.registration_limit -
                                                (event.members || 0)}
                                        </div>
                                    </div>
                                )}

                            {!event.registration_enable && (
                                <h4 className={styles.registrationClosed}>
                                    Регистрация закончена
                                </h4>
                            )}
                            {!showRegistrationForm &&
                                event.registration_enable && (
                                    <Button
                                        size={'large'}
                                        color={'orange'}
                                        className={styles.registrationButton}
                                        onClick={() =>
                                            setShowRegistrationForm(
                                                !showRegistrationForm
                                            )
                                        }
                                    >
                                        Зарегистрироваться
                                    </Button>
                                )}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className={styles.divider} />
            <h3 className={styles.sectionTitle}>Подробнее об астровыезде</h3>
            <p className={styles.description}>{event.text}</p>
        </div>
    )
}

export default EventRegistration
