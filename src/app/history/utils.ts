import { CoreMessage } from "ai";

export function formatMessage(message: CoreMessage): string {
  const content = message.content;
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((msg) => {
        if (msg.type === "text") {
          return msg.text;
        } else {
          return "";
        }
      })
      .join("\n");
  }
  return "";
}
