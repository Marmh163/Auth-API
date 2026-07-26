const objects ={
    user1 :{
        firstName : "maryam",
        lastName : "mahmoudi",
        age : 30
    },
    user2 :{
        firstName : "shayna",
        lastName : "shahi",
        age : 22
    },
    user3 :{
        firstName : "vida",
        lastName : "rahimi",
        age : 27
    }
}

let names = []
Object.values(objects).forEach(item => names.push(item.firstName))
console.log(names)

