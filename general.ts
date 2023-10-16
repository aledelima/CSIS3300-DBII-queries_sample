db.users.find({
    "status": "A"
}).count()

db.users.find({
    "colours": "red"
}).count()

db.users.find({
    "address.province": "BC"
}).count()


db.users.find({
    "age":{$lt: 40}
})

//documents with no address 
db.users.find({
    "address": {$exists: false} 
}).count()

//users with at least one colour from red or blue
db.users.find({
    "colours": {$in: ["Red", "Blue"]} 
}).count()

db.users.find({
    "join_date": /^2013/
}).count()


//simple and
db.users.find({
    "age":{$lt: 40},
    "address.province": "BC"
})


//short cut for same field between query

//simple and
db.users.find({
    "age":{$gte: 20, $lte: 40},
    "address.province": "BC"
})

//and operator
db.users.find({
    $and: [
        {"join_date": {$gte: "2013-01-01"}},
        {"join_date": {$lte: "2013-12-31"}}
    ]
})

//how many users are in province BC AND 
//  (have colurs (Red or Pink)
//  OR joined in 2012)
db.users.find({
    $and: [
        {"address.province": "BC"},
        {$or : [
            {"colours": {$in: ["Red", "Pink"]} },
            {"join_date": /^2012/}
        ]}
    ]
})
// 38 documents


//how many users have .edu emails AND 
//  who are in one of these provinces BC, AB, ON
db.users.find({
    $and: [
        {"email": /.edu/},
        {"address.province": {$in: ["BC", "AB", "ON"]}}
    ]
}).count()