const { objectType, enumType } = require('nexus')

const Course = objectType({
    name: 'Course',
    definition(t) {
        t.model.id()
        t.model.description()
    }
})

export const Models = [Course]