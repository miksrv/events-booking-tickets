import {
    eventsGetList,
    getRunningQueriesThunk,
    useEventsGetListQuery
} from '@/api/api'
import { wrapper } from '@/api/store'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { Header } from 'semantic-ui-react'

import FormBooking from '@/components/form-booking'

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        store.dispatch(eventsGetList.initiate())

        await Promise.all(store.dispatch(getRunningQueriesThunk()))

        return {
            props: { object: {} }
        }
    }
)

const Main: NextPage = () => {
    const { data: eventsData, isLoading: eventsLoading } =
        useEventsGetListQuery()

    const openRegistrationEvent = useMemo(
        () =>
            eventsData?.items.find(
                ({ registration_enable }) => registration_enable
            ),
        [eventsData?.items]
    )

    return (
        <div>
            <Header>111</Header>
            <h1>Астрономические мероприятия</h1>
            {openRegistrationEvent && (
                <FormBooking event={openRegistrationEvent.id} />
            )}
            <h2>Архив астрономичкских мероприятий</h2>
            {eventsData?.items
                .filter(({ registration_enable }) => !registration_enable)
                ?.map((event) => (
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <div>{event.text}</div>
                        <div>Участников: {event.members}</div>
                    </div>
                ))}
        </div>
    )
}

export default Main
