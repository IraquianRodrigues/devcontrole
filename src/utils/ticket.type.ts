
export interface TicketProps{
    id: string
    name: string
    status: string
    created_at: Date | null
    update_at: Date | null
    customerid: string | null
    userId: string | null
}