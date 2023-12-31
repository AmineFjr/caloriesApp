const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/HomePage.vue") },
      {
        path: "ingredients",
        component: () => import("src/pages/IngredientsPage.vue"),
      },
      {
        path: "recipes",
        component: () => import("src/pages/RecipesPage.vue"),
      },
      {
        path: "recipe_edit/:id",
        component: () => import("src/pages/RecipeEditPage.vue"),
      },
      {
        path: "login",
        component: () => import("src/pages/LoginPage.vue"),
      },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
