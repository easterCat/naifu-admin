import { post, prefix, get } from '../requestDecorator';
import userList from '../mockdb/userList';
import * as Koa from 'koa';

@prefix('/auth')
export default class User {
    @post('/login')
    async login(ctx: any) {
        const { username } = ctx.request.body;
        for (const user of userList) {
            if (user.username === username) {
                return {
                    access_token: username + '-token',
                };
            }
        }
        return ctx.throw(401);
    }

    @get('/user/info')
    async getUserInfo(ctx: Koa.Context) {
        const token = ctx.request.header.token;
        console.log('userList :>> ', userList);
        return {
            user: token === 'admin-token' ? userList[0] : userList[1],
        };
    }

    @get('/getUsers')
    async getUsers(ctx: any) {
        const { name } = ctx.query;
        const users = userList.filter((user) => {
            const lowerCaseName = user.name.toLowerCase();
            return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0);
        });
        return {
            code: 20000,
            data: {
                items: users,
            },
        };
    }
}
