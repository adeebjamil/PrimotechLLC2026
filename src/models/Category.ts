import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnology {
  title: string;
  icon: string;
  description: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  status: 'published' | 'draft';
  order: number;
  technologies: ITechnology[];
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema: Schema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
});

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description1: { type: String, required: true },
  description2: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  order: { type: Number, default: 0 },
  technologies: [TechnologySchema],
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
