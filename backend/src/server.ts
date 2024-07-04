import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import categoryRoutes from "./routes/category.routes";
import profileRoutes from "./routes/profile.routes";
import adminUserRoutes from "./routes/admin-user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Configure CORS
 */
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));



/**
 * Middleware to parse JSON requests
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use('/profile', profileRoutes);
app.use("/admin/users", adminUserRoutes);


app.get("/", (req, res) => {
  res.send("Shoppie API is running");
});

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});