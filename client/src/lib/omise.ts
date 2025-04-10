import omise from "omise";

const o = omise({
  publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
  omiseVersion: "2019-05-29",
});

export const createSource = async (amount: number) => {
  return new Promise((resolve, reject) => {
    return o.sources.create(
      {
        type: "promptpay",
        amount: amount * 100,
        currency: "THB",
      },
      (_, res) => {
        if (!res) {
          reject(new Error("Failed to create source"));
        }
        resolve(res);
      }
    );
  });
};
