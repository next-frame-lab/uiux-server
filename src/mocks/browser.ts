import { setupWorker } from "msw/browser";
import handlers from "./handlers.ts";

const worker = setupWorker(...handlers);

export default worker;
