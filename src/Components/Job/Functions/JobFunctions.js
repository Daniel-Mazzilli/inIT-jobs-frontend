import { dropdownCities } from "../Data/Cities";

function convertDate(str){
    const strArr= str.split("T")[0].split("-")
    const arranged = [strArr[1], strArr[2], strArr[0].slice(2,4)].join("/")
    return arranged
}

function convertTasks(str) {
    const arr = str.split("__TASKBREAK__");
    return arr
  }

  function convertCities (str) {
    const match = dropdownCities.find(({val}) => str.toLowerCase() === val.toLowerCase())
    return match ? match.name : str

  }


export {
    convertDate,
    convertTasks,
    convertCities,
}