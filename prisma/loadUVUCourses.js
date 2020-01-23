import fs from 'fs'

import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4466')

const mutation = `mutation createCourse(
    $name: String,
    $description: String,
    $defaultCredits: String,
    $courseCode: String,
    $issuer: IssuerCreateOneInput!,
    $endorsements: IssuerCreateManyInput,
    $additionalProperties: Json,
    $associations: AssociationCreateManyInput
    ) {
        createCourse(
            data: {
                name: $name
                description: $description
                defaultCredits: $defaultCredits
                courseCode: $courseCode
                issuer: $issuer
                endorsements: $endorsements
                additionalProperties: $additionalProperties
                associations: $associations
                type: Course
            }
        )
        {
            id
            name
        }
    }`

async function main() {
  const content = fs.readFileSync('./server/example_files/uvu_courses.json')
  const catalog = JSON.parse(content)
  const allCourses = catalog.comet.course
  const dgmCourses = allCourses.filter(
    course =>
      course.prefix._text === 'DGM' ||
      course.prefix._text === 'CS' ||
      course.prefix._text == 'IT' ||
      course.prefix_text === 'INFO',
  )

  for (let crs of dgmCourses) {
    let variables = {
      name: crs.title._text,
      description: crs.description._text,
      defaultCredits: crs.totalCredits._text,
      courseCode: `${crs.prefix._text} ${crs.number._text}`,
      issuer: {
        connect: {
          url: 'https://www.uvu.edu/',
        },
      },
      endorsements: {
        connect: {
          url: 'https://www.uvu.edu/',
        },
      },
      additionalProperties: {
        prefix: crs.prefix._text,
        subject: crs.subject._text,
        termsOffered: crs.termsOffered._text,
        prereq: crs.prereq._text,
        coreq: crs.coreq._text,
      },
    }
    await client
      .request(mutation, variables)
      .then(data => console.log(data))
      .catch(err => console.log(`${err}`))
  }
}
main()
