export interface IListItem {
  item: string;
  checked: boolean;
}
export interface INote {
  title: string;
  payload: string[];
  imageUrl: string;
  type: string;
  list: IListItem[];
}
