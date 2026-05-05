import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({ name: String, category: String, subCategory: String });

async function test() {
  const uri = "mongodb+srv://primotechllc:primotechllc@primotechllc.bwr99bw.mongodb.net/primotechllc?appName=primotechllc";
  await mongoose.connect(uri);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  const prods = await Product.find({ category: 'Wi-Fi Camera' });
  console.log('WIFI_CAMERA_PRODUCTS:');
  prods.forEach(p => {
    console.log(`- ${p.name} -> subCategory: "${p.subCategory}"`);
  });
  await mongoose.disconnect();
}

test();
