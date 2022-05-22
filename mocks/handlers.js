import { rest } from "msw";

export const handlers = [
  rest.get("http://178.63.13.157:8090/mock-api/api/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            userId: "rahej",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
          },
        ],
      })
    );
  }),

  rest.get(
    "http://178.63.13.157:8090/mock-api/api/gateways",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              gatewayId: "i6ssp",
              userIds: ["rahej"],
              name: "Gateway 1",
              type: "Stripe",
              apiKey: "sk_test_6eC49HqLyjWDarjtT1zdp7dc",
              secondaryApiKey: "",
              description:
                "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
            },
          ],
        })
      );
    }
  ),

  rest.get(
    "http://178.63.13.157:8090/mock-api/api/projects",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              projectId: "bgYhx",
              userIds: ["rahej"],
              rule: "Manual Selection",
              gatewayIds: ["gDJ2s"],
              structure: "Sole proprietorship",
              industry: "IT",
              website: "https://mvpmatch.co/",
              description:
                "Sit amet luctus venenatis lectus magna fringilla urna porttitor.",
              image: "https://mvpmatch.co/images/logo.svg",
              name: "Project 1",
            },
          ],
        })
      );
    }
  ),

  rest.post(
    "http://178.63.13.157:8090/mock-api/api/report",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              paymentId: "6149cf567833e57669e60455",
              amount: 2663.69,
              projectId: "ERdPQ",
              gatewayId: "i6ssp",
              userIds: ["rahej"],
              modified: "2021-09-20",
              created: "2021-04-11",
            },
          ],
        })
      );
    }
  ),
];
