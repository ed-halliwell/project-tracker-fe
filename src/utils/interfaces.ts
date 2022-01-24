export interface IUser {
  id: number;
  user_name: string;
  email: string;
  created_at: string;
  profile_image: string;
  is_admin: boolean;
}

export interface IBoard {
  id: number;
  board_name: string;
  created_by: number;
  user_name: string;
  created_at: string;
}

export interface IBoardTickets {
  board_id: number;
  board_name: string;
  column_id: number;
  column_name: string;
  column_order: number;
  ticket_id: number;
  ticket_name: string;
  description: string;
  assigned_to: number;
  assigned_to_user_name: string;
  created_by: number;
  created_at: string;
  priority_order: number;
}
