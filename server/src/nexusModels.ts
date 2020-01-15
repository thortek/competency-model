import { objectType, enumType } from 'nexus'

const Course = objectType({
    name: 'Course',
    definition(t) {
        t.model.id()
        t.model.description()
    }
})

export const Models = [Course]