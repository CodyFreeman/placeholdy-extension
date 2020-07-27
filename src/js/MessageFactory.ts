import { MessageInterface } from "./interfaces/MessageInterface";

export function messageFactory(
  origin: string,
  type: string,
  payload: { [key: string]: any }
): MessageInterface {
  return {
    origin,
    type,
    payload,
  };
}
