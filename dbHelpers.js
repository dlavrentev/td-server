// const knex = require('knex');
// const config = require('./knexfile');
// const db = knex(config.development)

const db = require('./dbConfig')  // ready for deployment

//USERS FUNCTIONS
function getAllUsers(){ 
    return db('users').orderBy('id','desc')
}

async function addUser(user){
  await db('users').insert(user)
  return db('users').where({username:user.username})
}

function findUserByUsername(username){
  return db('users').where({username:username}).first();
}

function findUserByUserId(id){
  return db('users').where({id:id}).first();

}

function removeUser(id){
  return db('users').where({id:id}).del()

}

function findUserById(id){
  return db('users').where({id:id}).first()
}

function getUserDestinations(user_id){
  return db('users')
  .join('destinations','users.id','destinations.user_id')
  .select(
    "users.id as UserId",
    "users.imageUrl as UserImage",
    "destinations.id as DestinationId",
    "destinations.title as DestinationTitle"
  )
  .where({user_id:user_id})
}

// DESTINATIONS FUNCTIONS

function getAllDestinations(){
  return db('destinations').orderBy('id','desc')
}

function findDestinationById(id){
  return db('destinations').where({id:id}).first()
}

async function addDestination(newDestination){
  await db('destinations')
  .where({user_id:newDestination.user_id})
  .insert(newDestination)
}

function removeDestination(id){
 return db('destinations').where({id:id}).del()
}

function updateDestination(id,newDestination){
  return db('destinations')
  .where({id:id})
  .update(newDestination)
}

function groupDestinations(){
  return db('destinations').count()
  .groupBy("title")
  .select(
    "destinations.id",
    "destinations.title"
  )
}


module.exports = {
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser,
    getAllDestinations,
    findUserById,
    addDestination,
    removeDestination,
    updateDestination,
    getUserDestinations,
    groupDestinations,
    findDestinationById,
    findUserByUserId
}

