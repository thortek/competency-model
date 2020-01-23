import { Photon, CourseClient } from '@prisma/photon'
import fs from 'fs'

const uvu_courses = fs.readFileSync('prisma/example_files/uvu_courses.json')

const photon = new Photon()

const issuers = [
  {
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/',
    logo: '../../assets/fcc-glyph.jpg',
    issuingPersonFullName: 'freeCodeCamp',
    issuingPersonTitle: 'Unknown',
    type: 'Provider',
  },
  {
    name: 'Utah Valley University',
    url: 'https://www.uvu.edu/',
    logo: '../../assets/uvu.png',
    issuingPersonFullName: 'Jane Smith',
    issuingPersonTitle: 'Instructional Designer',
    type: 'Provider',
  },
  {
    name: 'Neumont College of Computer Science',
    url: 'https://www.neumont.edu/',
    logo: '../../assets/neumont.png',
    issuingPersonFullName: 'Britta Holt',
    issuingPersonTitle: 'Director, Career Services',
    type: 'Provider',
  },
  {
    name: 'Pluralsight',
    url: 'https://www.pluralsight.com/',
    logo: '../../assets/pluralsight.png',
    issuingPersonFullName: 'John Smith',
    issuingPersonTitle: 'Curriculum Designer',
    type: 'Provider',
  },
  {
    name: 'Helio Training',
    url: 'https://www.heliotraining.com/',
    logo: '../../assets/helio.png',
    issuingPersonFullName: 'Sandra Williams',
    issuingPersonTitle: 'Lead Instructor',
    type: 'Provider',
  },
  {
    name: 'Pluralsight',
    url: 'https://www.pluralsight.com/hr/',
    logo: '../../assets/pluralsight.png',
    issuingPersonFullName: 'Trevor Hansen',
    issuingPersonTitle: 'Talent Acquisition',
    type: 'Employer',
  },
  {
    name: 'Adobe',
    url: 'https://www.adobe.com/',
    logo: '../../assets/adobe.png',
    issuingPersonFullName: 'Sandra Adams',
    issuingPersonTitle: 'Engineering Hiring Manager',
    type: 'Employer',
  },
  {
    name: 'Ebay',
    url: 'https://www.ebay.com/',
    logo: '../../assets/ebay.png',
    issuingPersonFullName: 'Ali Connors',
    issuingPersonTitle: 'Lead Recruiter',
    type: 'Employer',
  },
]

async function createIssuers() {
  const  mappedIssuers = issuers.map(i => {
    return {
      data: {
        name: i.name,
        url: i.url,
        logo: i.logo,
        issuingPersonFullName: i.issuingPersonFullName,
        issuingPersonTitle: i.issuingPersonTitle,
      }
    }
  })
  for (let mpdIssuer of mappedIssuers) {
  await photon.issuers
    .create(mpdIssuer)
    .catch(err =>
      console.log(
        `Error.  Probably trying to create a new issuer when one already exists with their unique URL. ${err}`,
      ),
    )
      }
}

function loadUVUCourses() {
  const catalog = JSON.parse(uvu_courses)
  const allCourses = catalog.comet.course
  const dgmCourses = allCourses.filter(
    course =>
      course.prefix._text === 'DGM' ||
      course.prefix._text === 'CS' ||
      course.prefix._text == 'IT' ||
      course.prefix_text === 'INFO',
  )
  return allCourses.map(crs => {
    return {
      data: {
        type: 'Course',
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
        additionalProperties: JSON.stringify({
          prefix: crs.prefix._text,
          subject: crs.subject._text,
          termsOffered: crs.termsOffered._text,
          prereq: crs.prereq._text,
          coreq: crs.coreq._text,
        }),
      },
    }
  })
}

async function main() {
  await createIssuers()
  const allCourses = loadUVUCourses()
  for (let crs of allCourses) {
    await photon.courses
      .create(crs)
      .catch(err => console.log(`Error trying to create UVU courses: ${err}`))
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
