import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  parentCategory: string; // This will be the name or ID of the parent category
  image?: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentCategory: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' }
}, { timestamps: true });

export default mongoose.models.SubCategory || mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
