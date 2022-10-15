import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

//Teste unitarios
describe('Tweet Tests', () => { 
  describe('Class Tweet', () => {
    it('should create a new tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'John Doe',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('John Doe');
    });
  });

  //Teste de integração 
  describe('Using MongoDB', () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      const host = 'localhost'
      conn = await mongoose.connect(
        `mongodb://root:root@db:27017/tweets_test?authSource=admin`,
      );
    });

    afterEach(async () => {
      await conn.disconnect();
    });

    it('should create a tweet document', async () => {
      const TweetModel = conn.model('Tweet', TweetSchema);
      const tweet = new TweetModel({
        content: 'Hello World',
        screen_name: 'John Doe',
      });

      await tweet.save();

      const tweetCreated = await TweetModel.findById(tweet._id);

      expect(tweetCreated.content).toBe('Hello World');
      expect(tweetCreated.screen_name).toBe('John Doe');
    });
  });
});
