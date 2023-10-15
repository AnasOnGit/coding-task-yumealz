interface Captain {
    id: string,
    name: string,
    phone_number: string,
    vehicle: string,
    assigned_orders: number,
    status: string,
    captain_statistic: CaptainStatistic[],
    captain_attributes: CaptainAttribute[]


}

interface Order {
    id: string,
    customer_id: string,
    captain_id: string,
    item_id: string,
    order_status: string,
    delivered: boolean,
    order_date: Date,
    delivery_date: Date,
    total_distance: number,
    total_duration: number,
    total_cost: number,
    customer: Customer,
    captain: Captain,
    item: Item,

}

interface Customer {
    id: string,
    name: string,
    phone_number: string,
    address: string,
    orders: Order[],
}

interface Item {
    id: string,
    name: string,
    price: number,
    orders: Order[],
}

interface CaptainStatistic {
    total_rating: number,
    total_deliveries: number,
    total_earning: number,
    total_distance: number,
    total_duration: number,
    total_orders_rejected: number,
    total_orders_accepted: number,
    total_orders_delivered: number,
    total_orders_canceled: number,
    total_distance_traveled: number,
   
}

interface CaptainAttribute {
    id: string,
    name: string,
    vehicle_type:string,
    vehicle_model:string,
    vehicle_color:string,
    vehicle_plate_number:string,
}

export type { Captain, CaptainStatistic, CaptainAttribute, Order, Customer, Item };