const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js or similar
const userModel = require('../models/user.model');
const mongoose = require('mongoose');
require('dotenv').config();


describe('User Routes', () => {
    beforeAll(async () => {
        // Connect to the test database 
        
         await mongoose.connect(process.env.MONGODB_URI);
    }); 
    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.connection.close();
    });
    afterEach(async () => {
        // Clear the database after each test
        await userModel.deleteMany({});
    });
    describe('Our firrst test', () => {
       
        it('should return hello world', () => {
            console.log("hello world");
        });
        it('shoudld register a new user', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    fullname: { firstname: 'John', lastname: 'Doe' },
                    email: 'john.doe@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
        });
        it('should return validation error for invalid input', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    fullname: { firstname: 'Jo', lastname: 'Doe' },
                    email: 'john.doe',
                    password: 'pass'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });
        it('should login an existing user', async () => {
            const user = new userModel({
                fullname: { firstname: 'John', lastname: 'Doe' },
                email: 'john.doe@example.com',
                password: await userModel.hashPassword('password123')
            });
            await user.save();
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'john.doe@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
        it('should return error for invalid credentials', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'john.doe@example.com',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Invalid email or password');
        });
        it('should get user profile for authenticated user', async () => {
            const user = new userModel({
                fullname: { firstname: 'John', lastname: 'Doe' },
                email: 'john.doe@example.com',
                password: await userModel.hashPassword('password123')
            });
            await user.save();
            const token = user.generateAuthToken();
            const res = await request(app)
                .get('/users/profile')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('email', 'john.doe@example.com');
        });
        it('should return unauthorized for unauthenticated user', async () => {
            const res = await request(app).get('/users/profile');
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Unauthorized');
        });
        it('should logout an authenticated user', async () => {
            const user = new userModel({
                fullname: { firstname: 'John', lastname: 'Doe' },
                email: 'john.doe@example.com',
                password: await userModel.hashPassword('password123')
            });
            await user.save();
            const token = user.generateAuthToken();
            const res = await request(app)
                .get('/users/logout')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Logged out');
        });
        it('should return unauthorized for unauthenticated user', async () => {
            const res = await request(app).get('/users/logout');
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Unauthorized');
        });

    });

});





