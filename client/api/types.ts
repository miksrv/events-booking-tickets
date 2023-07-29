export interface APIResponseError {
    status?: number
    code?: number
    messages?: any
}

export interface APIResponseEventsList {
    items: TEvent[]
    total: number
}

export interface APIResponseBooking {
    booking_id: number
}

export interface APIRequestBooking {
    event: string
    email: string
    phone: string
    name: string
    adults: number
    children: number
}

export type TEvent = {
    id: string
    title: string
    text: string
    address?: string
    address_link?: string
    image?: string
    date?: string
    views?: number
    members?: number
    registration_limit?: number
    registration_enable?: boolean
    registration_start?: string
    registration_stop?: string
}
