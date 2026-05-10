/**
 * water-log controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::water-log.water-log', ({strapi}) => ({
    async create(ctx) {
        const user = ctx.state.user

        if(!user) return ctx.unauthorized('Login required')
        const body = ctx.request.body.data
        body.users_permissions_user = user.id;

        // Strapi 5 might use documentService, but entityService is often still used/compatible
        const entry = await strapi.entityService.create("api::water-log.water-log", {
            data: body,
            populate: ["users_permissions_user"]
        })
        return entry
    },
    async find(ctx) {
        const user = ctx.state.user
        if(!user) return ctx.unauthorized('Login required')

        const result = await strapi.entityService.findMany("api::water-log.water-log", {
           filters: {users_permissions_user: user.id},
            populate: ["users_permissions_user"]
        })
        return result
    },
    async findOne(ctx) {
        const user = ctx.state.user;
        if(!user) return ctx.unauthorized('Login required')
        const {id} = ctx.params;

        const result = await strapi.entityService.findMany("api::water-log.water-log", {
            filters: {id, users_permissions_user: user.id},
            populate: ["users_permissions_user"]
        })
        if(!result.length) return ctx.notFound("Not found or not yours")
        return result[0];
    }
}));
