import { Observable } from "rxjs";

/**
 *
 * @param {Promise<unknown>} promise
 * @returns
 */
export const fromPromise = (promise: Promise<unknown>) => {
  return new Observable((subscribe) => {
    promise.then((data) => {
      subscribe.next(data);
      subscribe.complete();
    });
    promise.catch((error) => {
      subscribe.error(error);
    });
  });
};
