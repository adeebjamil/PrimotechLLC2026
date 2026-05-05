import mongoose, { Schema, Document } from 'mongoose';

export interface ISpecItem {
  label: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  subTitle: string;
  description: string;
  images: string[];
  keyFeatures: string[];
  keyHighlights: string[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  technicalSpecs: Map<string, ISpecItem[]>;
  createdAt: Date;
  updatedAt: Date;
}

const SpecItemSchema: Schema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  subTitle: { type: String },
  description: { type: String, required: true },
  images: { type: [String], required: true, validate: [(val: string[]) => val.length >= 1, '{PATH} must have at least 1 image'] },
  keyFeatures: { type: [String], required: true },
  keyHighlights: { type: [String], default: [] },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  isFeatured: { type: Boolean, default: false },
  technicalSpecs: {
    type: Map,
    of: [SpecItemSchema],
    default: {}
  }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
