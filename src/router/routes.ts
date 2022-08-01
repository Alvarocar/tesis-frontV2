import withPublicLayout from '@components/layout/withPublicLayout'
import React from 'react'
import { HomePage } from './lazyComponents.routes'

type HighOrderComponent = (wrapped: React.FC) => React.FC

export interface RawRoute {
    path: string
    component: React.LazyExoticComponent<any>,
    middlewares?: HighOrderComponent[],
    subRoutes?: RawRoute[],
    layout?: HighOrderComponent,
}

export const routes: RawRoute[] = [
    {
        path: '/home',
        component: HomePage,
        layout: withPublicLayout,
    }
]