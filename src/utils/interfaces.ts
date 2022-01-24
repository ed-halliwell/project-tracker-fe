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
  created_at: string;
}
