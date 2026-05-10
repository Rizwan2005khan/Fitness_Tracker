export default {
  routes: [
    {
      method: 'POST',
      path: '/workout-assistant/generate',
      handler: 'workout-assistant.generate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
