interface Captain {
    id: number,
    name: string,
    phone_number: string,
    vehicle: string,
    assigned_orders: number,
    status: string,
    captain_statistic: CaptainStatistic[],
    captain_attributes: CaptainAttribute[]


}

interface Order {
    id: number,
    customer_id: number,
    captain_id: number,
    item_id: number,
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
    id: number,
    name: string,
    phone_number: string,
    address: string,
    orders: Order[],
}

interface Item {
    id: number,
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
    id: number,
    name: string,
    vehicle_type:string,
    vehicle_model:string,
    vehicle_color:string,
    vehicle_plate_number:string,
}

export type { Captain, CaptainStatistic, CaptainAttribute, Order, Customer, Item };