import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'quote' | 'download';
  status: 'new' | 'in-progress' | 'resolved';
  productName: string;
  productId: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['quote', 'download'], default: 'quote' },
    status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
    productName: { type: String, required: true },
    productId: { type: String, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
