# COSC470 Project

Contains backend and frontend for our 470 project.

To see API documentation, check out our [Postman API Documentation](https://web.postman.co/workspace/a6c42954-0266-45ad-8e38-7752bda16afa/collection/39425129-5b7026f9-f405-4793-bf89-5dd58c4d0f1a).

Navigate to `localhost:3000` to see the website.  
Use `localhost:4000` to make API requests (only work with HTTP in Postman, not HTTPS).

### To run the development server of Next.js:
1. Navigate to the `frontend` directory in the command prompt.
2. Run the following commands:
   ```bash
   pnpm i
   pnpm dev
   ```
   
### To run the Docker containers:
1. Download this project.
2. Navigate to the `COSC470-project` directory in the command prompt.
3. Run the following commands (make sure you have Docker installed):
   ```bash
   docker-compose build
   docker-compose up
   ```

