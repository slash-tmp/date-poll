// TODO: Remove this after fixing the issue in vue-router : https://github.com/vuejs/router/issues/845g

export default defineNuxtRouteMiddleware((to, from) => {
  // Iterate over each key in `from.params`
  Object.keys(from.params).forEach((key) => {
    // If the key does not exist in `to.params`, set it to '-'
    if (to.params[key] === undefined) {
      to.params[key] = " ";
    }
  });
});
