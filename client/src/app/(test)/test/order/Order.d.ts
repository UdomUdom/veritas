interface OrderType {
  id: string;
  user_id: string;
  event_id: string;
  total: number;
  status: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: string;
    avatar: string;
    role_id: string;
  };
  event: {
    id: string;
    title: string;
    description: string;
    image: string;
    banner: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    info: string;
    scheduled_publish_at: string | null;
    category_id: string;
    organizer_id: string;
  };
  order_item: Array<{
    id: string;
    order_id: string;
    event_ticket_id: string;
    quantity: number;
    event_ticket: {
      id: string;
      event_id: string;
      type: string;
      price: number;
      available: number;
      sale_start: string;
      sale_end: string;
    };
  }>;
}
