/* eslint-disable @typescript-eslint/no-explicit-any */

import BaseRepository from "@app/repositories/base.repository";
import Cookies from "js-cookie";

export function addToken() {
  return function <T extends BaseRepository>(target: Function) {
    return function (...args: any) {
      const instance = this as T;
      const Authorization = Cookies.get('token');
      if (Authorization) {
        instance.setHeaders({
          Authorization, 
        })
      }
      return target.apply(instance, args);
    }
  }
}