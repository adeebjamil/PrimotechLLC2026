import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: 'footer' | 'popup';
  ip: string;
}

const SubscriberSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active',
  },
  source: {
    type: String,
    enum: ['footer', 'popup'],
    default: 'footer',
  },
  ip: {
    type: String,
    default: '',
  },
});

// Check if the model already exists before defining it
const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
