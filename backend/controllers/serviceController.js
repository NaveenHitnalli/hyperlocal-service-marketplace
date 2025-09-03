

// const Service = require('../models/Service');

// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().populate('provider', 'name email');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id).populate('provider', 'name email');
//     if (!service) {
//       return res.status(404).json({ error: 'Service not found' });
//     }
//     res.json(service);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createService = async (req, res) => {
//   try {
//     const { title, description, category, price, location } = req.body;
//     const service = await Service.create({
//       title,
//       description,
//       category,
//       price,
//       location,
//       provider: req.user.id
//     });
//     res.status(201).json(service);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// Importing the Service model to interact with the services collection in MongoDB
const Service = require('../models/Service');


// Controller to fetch all available services
exports.getAllServices = async (req, res) => {
  try {
    // Fetch all services from the database and populate the 'provider' field with name and email
    const services = await Service.find().populate('provider', 'name email');
    
    // Send the list of services as a JSON response
    res.json(services);
  } catch (err) {
    // If an error occurs, return a 500 status with the error message
    res.status(500).json({ error: err.message });
  }
};


// Controller to fetch a single service by its ID
exports.getServiceById = async (req, res) => {
  try {
    // Find the service by ID from the URL parameter and populate provider info
    const service = await Service.findById(req.params.id).populate('provider', 'name email');

    // If no service found, return 404 Not Found
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Return the found service as a JSON response
    res.json(service);
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ error: err.message });
  }
};


// Controller to create a new service
exports.createService = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const { title, description, category, price, location } = req.body;

    // Create a new service document using the request data and logged-in provider ID
    const service = await Service.create({
      title,            // Title of the service (e.g., "Plumbing")
      description,      // Description about the service
      category,         // Category (e.g., electrician, beauty)
      price,            // Service price
      location,         // Location where the service is available
      provider: req.user.id  // Provider's ID from the authenticated token (req.user injected by middleware)
    });

    // Respond with status 201 (Created) and return the created service object
    res.status(201).json(service);
  } catch (err) {
    // If validation or other error occurs, return 400 with error message
    res.status(400).json({ error: err.message });
  }
};
