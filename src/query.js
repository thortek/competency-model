import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('getCourseByID', {
      type: 'Course',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.courses.findOne({
          where: {
            id,
          },
        })
      },
    })

    t.list.field('getAllCourses', {
      type: 'Course',
      resolve: (parent, args, ctx) => {
        return ctx.photon.courses.findMany()
      },
    })
  },
})
