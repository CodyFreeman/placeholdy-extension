export interface MessageInterface {
  origin: string;
  type: string; // TODO: replace with type/enum
  payload: { [key: string]: any }; //TODO: narrow?
}
