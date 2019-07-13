
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Tony Stark', email: 'ironman@gmail.com', username: 'Tony', password: 'pepper', role:'Avenger'},
        {id: 2, name: 'Thanos', email: 'purple@gmail.com', username: 'Thanos', password: 'infinitystones', role:''},
        {id: 3, name: 'Hulk', email: 'gammaman@gmail.com', username: 'hulk', password: 'smash', role:'avenger'}
      ]);
    });
};
