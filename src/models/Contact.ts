import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please select a subject.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
