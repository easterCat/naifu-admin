/*
 * @Description: app actions
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-29 08:46:37
 */
import { ActionTree, ActionContext } from 'vuex';
import { RootState, useStore } from '@/store';
import { state, UserState } from './state';
import { Mutations } from './mutations';
import { UserMutationTypes } from './mutation-types';
import { UserActionTypes } from './action-types';
import { loginRequest, userInfoRequest } from '@/apis/user';
import { removeToken, setToken } from '@/utils/cookies';
import { PermissionActionType } from '../permission/action-types';
import router, { resetRouter } from '@/router';
import { RouteRecordRaw } from 'vue-router';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;

export interface Actions {
    [UserActionTypes.ACTION_LOGIN](
        { commit }: AugmentedActionContext,
        userInfo: { username: string; password: string },
    ): void;
    [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void;
    [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void;
    [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string): void;
    [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<UserState, RootState> & Actions = {
    async [UserActionTypes.ACTION_LOGIN](
        { commit }: AugmentedActionContext,
        userInfo: { username: string; password: string },
    ) {
        let { username, password } = userInfo;
        username = username.trim();
        await loginRequest({ username, password })
            .then(async (res) => {
                if (res?.code === 200 && res.data.access_token) {
                    const { data } = res;
                    setToken(data.access_token);
                    commit(UserMutationTypes.SET_TOKEN, data.access_token);
                    // const { user } = data;
                    // commit(UserMutationTypes.SET_ROLES, ['admin']);
                    // commit(UserMutationTypes.SET_NAME, user.username);
                    // commit(UserMutationTypes.SET_AVATAR, '');
                    // commit(UserMutationTypes.SET_INTRODUCTION, user.nickname);
                    // commit(UserMutationTypes.SET_EMAIL, user.email);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },

    [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
        removeToken();
        commit(UserMutationTypes.SET_TOKEN, '');
        commit(UserMutationTypes.SET_ROLES, ['admin']);
    },

    async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
        if (state.token === '') {
            throw Error('token is undefined!');
        }
        await userInfoRequest().then((res) => {
            if (res?.code === 200) {
                const { user } = res.data;
                commit(UserMutationTypes.SET_ROLES, ['admin']);
                commit(UserMutationTypes.SET_NAME, user.username);
                commit(UserMutationTypes.SET_AVATAR, '');
                commit(UserMutationTypes.SET_INTRODUCTION, user.nickname);
                commit(UserMutationTypes.SET_EMAIL, user.email);
                return res;
            } else {
                throw Error('Verification failed, please Login again.');
            }
        });
    },

    async [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string) {
        const token = role + '-token';
        const store = useStore();
        commit(UserMutationTypes.SET_TOKEN, token);
        setToken(token);
        await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined);
        store.dispatch(PermissionActionType.ACTION_SET_ROUTES, state.roles);
        store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
            router.addRoute(item);
        });
    },

    [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
        console.log(commit);
        removeToken();
        commit(UserMutationTypes.SET_TOKEN, '');
        commit(UserMutationTypes.SET_ROLES, ['admin']);
        resetRouter();
    },
};
