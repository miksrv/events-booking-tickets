import { TEvent } from '@/api/types'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import { Grid } from 'semantic-ui-react'

import FormBooking from '@/components/form-booking'

import styles from './styles.module.sass'

type TEventRegistrationProps = {
    event: TEvent
}

const EventRegistration: React.FC<TEventRegistrationProps> = ({ event }) => {
    return (
        <div className={styles.eventRegistration}>
            <Grid>
                <Grid.Row>
                    <Grid.Column
                        computer={8}
                        mobile={16}
                    >
                        <h3 className={styles.sectionTitle}>
                            Регистрация на астровыезд
                        </h3>
                        <h4 className={styles.eventTitle}>{event.title}</h4>
                        <div className={styles.sectionImage}>
                            <Image
                                className={styles.eventImage}
                                src={`http://localhost:8080/images/${event.image}`}
                                alt={event.title}
                                width={500}
                                height={200}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column
                        computer={8}
                        mobile={16}
                    >
                        <FormBooking event={event.id} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <p>{event.text}</p>
        </div>
    )
}

export default EventRegistration
