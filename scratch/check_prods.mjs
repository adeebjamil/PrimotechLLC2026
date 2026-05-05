import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  subCategory: String,
  status: String,
});

async function test() {
  const uri = "mongodb+srv://primotechllc:primotechllc@primotechllc.bwr99bw.mongodb.net/primotechllc?appName=primotechllc";
  await mongoose.connect(uri);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  const prods = await Product.find({});
  console.log('PRODUCTS_COUNT:', prods.length);
  prods.forEach(p => {
    console.log(`- ${p.name} -> subCategory: "${p.subCategory}" (status: ${p.status})`);
  });
  await mongoose.disconnect();
}

test();
