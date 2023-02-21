import { IContext, createOvermind , createOvermindSSR, rehydrate  ,} from 'overmind';
import { namespaced } from 'overmind/config';
import {
    createStateHook,
    createActionsHook,
    createEffectsHook,
} from 'overmind-react';

const incrment:Action = ({state})=>{
    // eslint-disable-next-line no-param-reassign
    state.counter.counter +=1;
}
const counter = {
    state:{counter:0},
    actions:{incrment}

}
const NextConfig = {
    state:{},
    actions:{
        add:{
            // @ts-ignore
            changePage({ state }, mutations) {
                rehydrate(state, mutations || []);
              }
        }
    },

}

export const config = namespaced({
    counter,
    NextConfig
})
export const overmind = (typeof window !== 'undefined' ? createOvermind : createOvermindSSR)(config, {
    devtools: false
});
export type Context = IContext<typeof config>;

export type Action<Input = void, Output = void> = (
    contect: Context,
    input: Input
) => Output;

export type AsyncAction<Input = void, Output = void> = (
    contect: Context,
    input: Input
) => Promise<Output>;

export type Initialize<Input = void> = (contect: Context, input: Input) => void;
export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();