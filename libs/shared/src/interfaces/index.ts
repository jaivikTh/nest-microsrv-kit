export interface MessagePattern {
  cmd: string;
}

export interface UserServicePatterns {
  CREATE_USER: 'create_user';
  GET_USER: 'get_user';
  GET_USERS: 'get_users';
  UPDATE_USER: 'update_user';
  DELETE_USER: 'delete_user';
}

export interface OrderServicePatterns {
  CREATE_ORDER: 'create_order';
  GET_ORDER: 'get_order';
  GET_ORDERS: 'get_orders';
  GET_USER_ORDERS: 'get_user_orders';
  UPDATE_ORDER: 'update_order';
  DELETE_ORDER: 'delete_order';
}