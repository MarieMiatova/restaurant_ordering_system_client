export interface Favorite {
  id: number;
  user_id: number;
  menu_item_id: number;
}

export interface FavoriteCreate {
  menu_item_id: number;
}
