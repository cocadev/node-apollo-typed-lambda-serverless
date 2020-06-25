import mongoose from 'mongoose';
await mongoose.connect('mongodb://172.31.11.148/poemDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
