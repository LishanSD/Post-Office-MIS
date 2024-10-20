import express from "express";
import cors from "cors";
import MailRoutes from "./routers/mailroutes";
import EmployeeRoutes from "./routers/employeeroutes";
import AuthRoutes from "./routers/authroutes";
import DeliveryRoutes from "./routers/deliveryroutes";
import BundleRoutes from "./routers/bundleroutes";
import AddressRoutes from "./routers/addressroutes";

const app = express();
const router = express.Router();

// Update CORS for production frontend domains
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON
app.use(express.static("public")); // Uncomment if serving static files

// API Routes
app.use("/mail", MailRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/auth", AuthRoutes);
app.use("/delivery", DeliveryRoutes);
app.use("/bundles", BundleRoutes);
app.use("/address", AddressRoutes);

// Port configuration for production
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
