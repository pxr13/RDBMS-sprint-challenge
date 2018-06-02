let project;
let action;
let context;

exports.seed = (knex, Promise) =>
  knex('action_context')
    .del()
    .then(() => knex('action_context').del())
    .then(() => knex('project_context').del())
    .then(() => knex('action').del())
    .then(() => knex('context').del())
    .then(() => knex('project').del())
    .then(() =>
      knex('project')
        .insert(
        [
          {
            name: 'Graph Algorithm Visualizer',
            description: 'Fun way to visualize how common graph algorithms work.',
          },
          {
            name: 'New Tab Productivity Booster',
            description:
                'See a cool picture, the time, the current weather and a to-do list for every new tab you open in Chrome.',
          },
          {
            name: 'Spotify Playlist Generator',
            description:
                'Create a Spotify playlist with a keyword, save to your account, and play from inside the browser.',
          },
        ],
          'id',
        )
        .then((createdProjects) => {
          const [visualizerProject, productivityProject, playlistProject] = createdProjects;
          project = createdProjects;

          return knex('action').insert(
            [
              {
                project_id: visualizerProject,
                description: 'Learn D3.',
                notes: 'Read the docs. Watch some videos.',
              },
              {
                project_id: productivityProject,
                description: 'Brainstorm features.',
                notes: 'Heavy on front-end stuff like React.',
              },
              {
                project_id: playlistProject,
                description: "Manually test to make sure there aren't any major bugs.",
                notes: 'Especially on mobile!',
              },
            ],
            'id',
          );
        })
        .then((createdActions) => {
          action = createdActions;

          return knex('context').insert(
            [{ context: 'Home' }, { context: 'Office' }, { context: 'At computer' }],
            'id',
          );
        })
        .then((createdContexts) => {
          const [home, office, computer] = createdContexts;
          context = createdContexts;

          return knex('project_context').insert([
            { project_id: project[0], context_id: home },
            { project_id: project[0], context_id: computer },
            { project_id: project[1], context_id: office },
            { project_id: project[1], context_id: home },
            { project_id: project[2], context_id: computer },
          ]);
        })
        .then(createdProjectContexts =>
          knex('action_context').insert([
            { action_id: action[0], context_id: context[0] },
            { action_id: action[0], context_id: context[1] },
            { action_id: action[1], context_id: context[1] },
            { action_id: action[1], context_id: context[2] },
            { action_id: action[2], context_id: context[2] },
          ]),
        )
        .then()
        .catch(err => console.log(`Error => ${err}`)),
    );
