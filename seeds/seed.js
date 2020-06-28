exports.seed = function(knex, Promise) {
    return deleteTables()
      .then(function() {
        return knex('book_scope').insert([
          {
            id: 1,
            value: 'private'
          },
          {
            id: 2,
            value: 'public'
          },
      ])
      })
        .then(function() {
          return knex('charge').insert([
          {
            id: 1,
            value: 'free'
          },
          {
            id: 2,
            value: 'paid'
          },
        ])
      })
      .then(function() {
        return knex('status').insert([
          {
            id: 1,
            value: 'active'
          },
          {
            id: 2,
            value: 'inactive'
          }
        ])
      })

    function deleteTables() {
      return knex('book_scope').del()
        .then(() => knex('charge').del())
        .then(() =>  knex('status').del())
    }
  };
  