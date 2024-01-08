import "dotenv/config";

const HOST = process.env.HOST || "";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pustakalay API",
      description: "Documentation for Pustakalay API.",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${HOST}/api/v1`,
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};

export default options;
