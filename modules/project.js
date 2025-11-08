const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

//A1 - PART 3:

function initialize(){
    return new Promise((resolve,reject) => {
        try{
            projectData.forEach(projData => {
                const sectDataMatch = sectorData.find(
                    sectData => sectData.id === projData.sector_id)

                let combinedData = {}
                for(const i in projData){
                    combinedData[i] = projData[i]
                }
                if(sectDataMatch){
                    combinedData.sector = sectDataMatch.sector_name
                } else {
                    combinedData.sector = "null"
                }
                projects.push(combinedData)
            })
            resolve()
        } catch {
            reject(error, 'couldnt initialize properly')
        }
    })
}


function getAllProjects(){
    return new Promise ((resolve, reject) =>{
        if(projects != null){
            resolve(projects)
        } else {
            reject(error, 'Projects array was not initialized properly')
        }
    })
}

function getProjectById(projectId){
    return new Promise ((resolve, reject) => {
        try{
            resolve(projects.find(proj => proj.id === projectId))
        }catch {
            reject(error, 'that ID was not found')
    }
    })
}

function getProjectsBySector(sector){
    return new Promise ((resolve, reject) => {
        try{
            resolve(projects.filter(proj => proj.sector.toLowerCase().includes(sector.toLowerCase())))
        } catch {
            reject(error, 'that sector was not found')
    }
    })
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector }

//A1 - PART 2:

// function initialize(){
//    try{
//     projectData.forEach(projData => {
//         const sectDataMatch = sectorData.find(
//             sectData => sectData.id === projData.sector_id)

//         let combinedData = {}

//         for(const i in projData){
//             combinedData[i] = projData[i]
//         }
//         if(sectDataMatch){
//             combinedData.sector = sectDataMatch.sector_name
//         } else {
//             combinedData.sector = 'null'
//         }
//         projects.push(combinedData)
//     })
//    } catch {
//     console.log('couldnt initialize properly')
//    }
// }


// function getAllProjects(){
//     return projects
// }

// function getProjectById(projectId){
//     try{
//         return projects.find(proj => proj.id === projectId)
//     }catch {
//         console.log('that ID was not found')
//     }
// }

// function getProjectsBySector(sector){
//     try{
//         return projects.filter(proj => proj.sector.toLowerCase().includes(sector.toLowerCase()))
//     } catch {
//         console.log('that sector was not found')
//     }
// }

// initialize()
// getAllProjects()
//console.log(getProjectById(7))
//console.log(getProjectsBySector("culture"))