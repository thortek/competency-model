import { Photon } from '@prisma/photon'
import fs from 'fs'

const bundle = JSON.parse(
  fs.readFileSync('prisma/example_files/challenge-bundle.json'),
)

const photon = new Photon()

const selectBlocks = [
  bundle['responsive-web-design'],
  bundle['javascript-algorithms-and-data-structures'],
  bundle['front-end-libraries'],
  bundle['data-visualization'],
  bundle['apis-and-microservices'],
  bundle['information-security-and-quality-assurance'],
]

// const selectBlocks = allChallengeBlocks.filter(block =>
//   blocksToCapture.find(element => element === block.superBlock),
// )

const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase())

console.log('Number of blocks: ' + selectBlocks.length)

async function loadAllChallenges() {
  let certArray = []
  let certEntityId = ''
  let tagArray = []
  let tagId = ''
  let categoryArray = []
  let categoryId = ''
  const challengeArray = []
  for (let superBlock of selectBlocks) {
  for (let [key, value] of Object.entries(superBlock.blocks)) {
    //order of the block of challenges' container within the whole FCC curriculum (e.g. 1 equals the first certification "Responsive Web Design Certification")
    console.log(key)
    const superOrder = value.meta.superOrder
    //order of the block within a particular certification (e.g. 0 equals "Basic HTML and HTML5 within Responsive Web Design Certification")
    const order = value.meta.order
    const category = value.meta.superBlock
    //let hyphenName = value.meta.name.replace(/\s/g, '-').toLowerCase()
    let spacedCategory = category.replace(/-/g, ' ').toLowerCase()
    let categoryCapitalized = capitalizeEveryWord(spacedCategory)
    const resourceURL = `https://learn.freecodecamp.org/${category}/${value.meta.dashedName}/`

    let compMap = value.challenges.map(challenge => {
        return {
          data: {
            type: 'Competency',
            name: challenge.title,
            description: challenge.description,
            sourcedId: challenge.id,
            issuer: {
              connect: {
                url: 'https://www.freecodecamp.org/',
              },
            },
            endorsements: {
              connect: {
                url: 'https://www.freecodecamp.org/',
              },
            },
            additionalProperties: JSON.stringify({
              videoUrl: challenge.videoUrl,
              tests: challenge.tests,
              forumTopicId: challenge.forumTopicId,
              challengeType: challenge.challengeType,
              solutions: challenge.solutions,
              instructions: challenge.instructions,
              files: challenge.files,
              time: challenge.time,
              challengeOrder: challenge.challengeOrder,
            }),
          },
        }
    })

    challengeArray.push(...compMap)

    /* let videoUrl = challenge.videoUrl
    const tagName = value.meta.name
    console.log(
      `${superOrder}    ${category}    ${hyphenName}    ${spacedCategory}    ${tagName}   ${order}`,
    )

    let certName = capitalizeEveryWord(spacedCategory) + ' Certification'
    let certFound = certArray.includes(certName)
    let categoryFound = categoryArray.includes(spacedCategory)
    let tagFound = tagArray.includes(tagName) */

    }

   /*  if (!categoryFound) {
      let catVars = {
        name: categoryCapitalized,
        description: `This tag "${tagName}" is identified by the issuer as part of the "${categoryCapitalized}" category.`,
        issuer: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
      }
      await client
        .request(categoryMutation, catVars)
        .then(data => {
          console.log(data)
          categoryId = data.createConceptualCategory.id || 'id_error'
          categoryArray.push(spacedCategory)
        })
        .catch(err => console.log(`${err}`))
    } */

/*     if (!tagFound) {
      let tagVars = {
        name: tagName,
        issuer: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
        conceptualCategory: {
          connect: {
            id: categoryId,
          },
        },
      }
      await client
        .request(tagMutation, tagVars)
        .then(data => {
          console.log(data)
          tagId = data.createTag.id || 'id_error'
          tagArray.push(tagName)
        })
        .catch(err => console.log(`${err}`))
    } */

    /* if (!certFound) {
      let certificateVars = {
        name: certName,
        issuer: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
        endorsements: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
        areaOfStudy: capitalizeEveryWord(spacedCategory),
        additionalProperties: {
          superOrder: superOrder,
          order: order,
        },
      }

      await client
        .request(certificateMutation, certificateVars)
        .then(data => {
          console.log(data)
          certEntityId = data.createCertificate.id || 'id_error'
          certArray.push(certName)
        })
        .catch(err => console.log(`${err}`))
    } */

   /*  for (let challenge of block.challenges) {
      let fullURL =
        resourceURL + challenge.title.replace(/\s/g, '-').toLowerCase()
      let competencyVars = {
        name: challenge.title,
        sourcedId: challenge.id,
        description: challenge.description.join('\n'),
        issuer: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
        associations: {
          create: {
            entityType: 'Certificate',
            associationType: 'IsChildOf',
            entityId: certEntityId,
          },
        },
        tags: {
          connect: {
            id: tagId,
          },
        },
        resources: {
          create: {
            url: fullURL,
            tags: {
              connect: {
                id: tagId,
              },
            },
            issuer: {
              connect: {
                url: 'https://www.freecodecamp.org/',
              },
            },
          },
        },
        endorsements: {
          connect: {
            url: 'https://www.freecodecamp.org/',
          },
        },
        additionalProperties: {
          videoURL: videoURL,
        },
      }

      await client
        .request(competencyMutation, competencyVars)
        .then(data => console.log(data))
        .catch(err => console.log(`${err}`))
    } */
  }
  return challengeArray
}

async function main() {
                        const allChallenges = await loadAllChallenges()
                        //console.log(allChallenges)
                        for (let crs of allChallenges) {
                          await photon.competencies
                            .create(crs)
                            .catch(err =>
                              console.log(
                                `Error trying to create FCC challenges: ${err}`,
                              ),
                            )
                        }
                      }

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })