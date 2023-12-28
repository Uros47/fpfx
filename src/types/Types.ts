export interface UsersType {
  id?: string;
  name: string;
  lastname: string;
  profit: [];
  loss: [];
}

export interface TableData {
  id: string;
  name: string;
  loss: number;
  profit: number;
  balance: number;
}

export interface CardData {
  profit: number;
  loss: number;
  balance: number;
}
