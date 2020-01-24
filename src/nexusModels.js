import { objectType, enumType } from 'nexus'

const Association = objectType({
    name: 'Association',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.type()
        t.model.associationType()
        t.model.entityType()
        t.model.entityId()
        t.model.additionalProperties()
    }
})

const Competency = objectType({
    name: 'Competency',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.type()
        t.model.name()
        t.model.description()
        t.model.defaultCredits()
        t.model.defaultPoints()
        t.model.sourcedId()
        t.model.associations()
        t.model.alternativeLabel()
        t.model.additionalProperties()
        t.model.humanCodingScheme()
        t.model.CFDocumentURI()
        t.model.bloomCategory()
        t.model.resources()
        t.model.tags()
        t.model.issuer()
        t.model.endorsements()
    }
})

const Course = objectType({
    name: 'Course',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.type()
        t.model.name()
        t.model.description()
        t.model.defaultCredits()
        t.model.defaultPoints()
        t.model.sourcedId()
        t.model.associations()
        t.model.alternativeLabel()
        t.model.additionalProperties()
        t.model.courseCode()
        t.model.startDate()
        t.model.endDate()
        t.model.issuer()
        t.model.endorsements()
    }
})

const Issuer = objectType({
    name: 'Issuer',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.type()
        t.model.name()
        t.model.url()
        t.model.address()
        t.model.phone()
        t.model.logo()
        t.model.issuingPersonFullName()
        t.model.issuingPersonTitle()
        t.model.additionalProperties()
    }
})

const Resource = objectType({
    name: 'Resource',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.description()
        t.model.url()
        t.model.tags()
        t.model.issuer()
        t.model.endorsements()
    }
})

const Tag = objectType({
    name: 'Tag',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.issuer()
        t.model.name()
        t.model.conceptualCategory()
        t.model.orderWithinCategory()
    }
})

const ConceptualCategory = objectType({
    name: 'ConceptualCategory',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.issuer()
        t.model.name()
        t.model.description()
    }
})

 const AssociationType = enumType({
    name: "AssociationType",
    description: 'Indicates the nature of association between instructional entities.',
    members: ['ExactMatchOf','Precedes', 'IsChildOf','IsParentOf','HasSkillLevel','ReplacedBy','IsPartOf','Exemplar','IsRelatedTo','IsPeerOf'],
  })

   const EntityType = enumType({
    name: "EntityType",
    description: 'Indicates the type of the instructional entity.',
    members: ['Basic','Competency', 'Course','Degree','Certificate','Assessment','CoCurricular',],
  })

   const BloomLevel = enumType({
    name: "BloomLevel",
    description: 'Indicates instructional level of the entity based on Blooms Taxonomy(revised)',
    members: ['CREATE','EVALUATE', 'ANALYZE','APPLY','UNDERSTAND','REMEMBER','INFO',],
  })

export const Models = [Association, Competency, Course, Issuer, Resource, Tag, ConceptualCategory, AssociationType, EntityType, BloomLevel]