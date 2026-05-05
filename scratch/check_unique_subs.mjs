import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({ subCategory: String });

async function test() {
  const uri = "mongodb+srv://primotechllc:primotechllc@primotechllc.bwr99bw.mongodb.net/primotechllc?appName=primotechllc";
  await mongoose.connect(uri);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  const subs = await Product.distinct('subCategory');
  console.log('UNIQUE_SUBCATEGORIES_IN_PRODUCTS:');
  console.log(JSON.stringify(subs, null, 2));
  await mongoose.disconnect();
}

test();
