import Omise from "omise";

export const omise = Omise({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

export const createCharges = async (
  source: string,
  amount: number,
  order_id: string
) => {
  return new Promise((resolve, reject) => {
    return omise.charges.create(
      {
        source,
        amount: amount * 100,
        currency: "THB",
        return_uri: `${process.env.CLIENT_URL}/order/${order_id}/complete`,
        metadata: {
          order_id,
        },
      },
      (err, res) => {
        if (err) {
          reject(new Error("Failed to create source"));
        }
        resolve(res);
      }
    );
  });
};
