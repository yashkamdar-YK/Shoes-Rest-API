const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { _id, brand, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (_id) {
    // If _id is provided in query, fetch single product
    try {
      const product = await Product.findById(_id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }


  if (brand) {
    queryObject.brand = { $regex: brand , $options: 'i' };
  }

  if (featured) {
    queryObject.featured = featured
  }

  if (name) {
    queryObject.name = { $regex: name , $options: 'i' }
  }

  

  console.log("Queary Data",queryObject);

  
  let result = Product.find(queryObject);

  if(sort){
    let sortFix = sort.split(",").join(" ");
    result = result.sort(sortFix)
  }

  if (select) {
    const fields = select.split(",").join(" "); // Convert comma-separated values to space-separated
    result = result.select(fields);
  }

  try {
    const Products = await result
    res.status(200).json({ Products, nbhits: Products.length });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

//Testing API Function

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query).sort("name -price")
  res.status(200).json({ myData  });
};


const getProductById = async (req, res) => {
  try {
    const id = req.params.id || req.query._id;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
  getProductById,
}