//@ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import BaseRepository from "@app/repositories/base.repository";
import Cookies from "js-cookie";

export function addToken() {
  return function <T extends BaseRepository>(target: T, key: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const instance = this as T;

      // Obtener el token de las cookies
      const Authorization = Cookies.get('token');
      
      // Si existe el token, añadirlo a los headers
      if (Authorization) {
        instance.setHeaders({
          Authorization,
        });
      }

      // Llamar al método original
      return originalMethod.apply(instance, args);
    };
  };
}