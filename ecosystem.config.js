module.exports = {
    apps: [
      {
        name: "Backend", // Replace with your desired app name
        script: "npm run build && npx medusa migrations run && npx medusa start",
        args: "",
        watch: true,
      },
    ],
  };
  
