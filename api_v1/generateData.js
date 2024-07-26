import { fakerPT_BR as faker } from "@faker-js/faker";
import moment from "moment";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const database = { purchases: [], campaign: [], products: [] };
const product = [];
const campaign = [];

const capitalizeWords = (name) => {
  const words = name?.split(" ");

  const capitalizedWords = words?.map((word) => {
    return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
  });

  return capitalizedWords?.join(" ");
};

for (let i = 1; i <= 4; i++) {
  const id = i;
  const campaignCode = faker.string.alphanumeric({
    length: 6,
    casing: "upper",
  });
  const campaignName = capitalizeWords(
    faker.word.adjective() + " " + faker.word.noun()
  );

  campaign.push({
    id,
    campaignCode,
    campaignName,
  });

  database.campaign.push({
    id,
    campaignCode,
    campaignName,
  });
}

for (let i = 1; i <= 10; i++) {
  const productId = i;
  const productName = "CCB " + faker.company.name();
  const productBuyingPrice = Number(
    faker.commerce.price({ min: 1000, max: 20000, dec: 0 })
  );
  const productInitialDate = faker.date.between({
    from: "2024-04-01T00:00:00.000Z",
    to: "2024-07-24T00:00:00.000Z",
  });
  const productFinalDate = moment(productInitialDate)
    .add(faker.number.int({ min: 1, max: 12 }), "month")
    .toDate();
  const productCommission = Number(faker.commerce.price({ min: 50, max: 150 }));

  product.push({
    productId,
    productName,
    productBuyingPrice,
    productInitialDate,
    productFinalDate,
    productCommission,
  });

  database.products.push({
    productId,
    productName,
    productBuyingPrice,
    productInitialDate,
    productFinalDate,
    productCommission,
  });
}

for (let i = 1; i <= 78; i++) {
  const randomProduct = product[getRandomInt(0, 9)];
  const randomCampaign = campaign[getRandomInt(0, 3)];

  if (randomProduct && randomCampaign) {
    const purchaseGenerated = {
      id: i,
      clientId: faker.number.int({ min: 1, max: 10 }),
      clientName: faker.person.fullName(),
      clientDocument: faker.string.numeric(11),
      productId: randomProduct.productId,
      productName: randomProduct.productName,
      productBuyingPrice: randomProduct.productBuyingPrice,
      productInitialDate: randomProduct.productInitialDate,
      productFinalDate: randomProduct.productFinalDate,
      productCommission: randomProduct.productCommission / 100,
      purchaseDate: faker.date.between({
        from: "2024-04-01T00:00:00.000Z",
        to: "2024-07-24T00:00:00.000Z",
      }),
      purchaseValue: Number(
        faker.commerce.price({ min: 100000, max: 2000000, dec: 0 })
      ),
      influencerCommission:
        Number(
          (
            ((randomProduct.productCommission / 100) *
              randomProduct.productBuyingPrice) /
            100
          ).toFixed(2)
        ) * 100,
      influencerCodeValue: randomCampaign.campaignCode,
    };

    database.purchases.push(purchaseGenerated);
  }
}

console.log(JSON.stringify(database));