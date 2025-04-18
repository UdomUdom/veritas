import Omise from "omise";

export const omise = Omise({
  publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
  omiseVersion: "2019-05-29",
});

export const createSource = async (amount: number) => {
  return new Promise((resolve, reject) => {
    return omise.sources.create(
      {
        type: "rabbit_linepay",
        amount: amount * 100,
        currency: "THB",
      },
      (err, res) => {
        if (err) {
          reject(new Error(`Failed to create source > ${err.message}`));
        }
        resolve(res);
      }
    );
  });
};
