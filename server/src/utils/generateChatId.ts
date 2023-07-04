import { customAlphabet } from "nanoid";

function generateChatId() {
  const nanoid = customAlphabet("1234567890", 24);
  return nanoid();
}

export { generateChatId };
