// controllers/dashboardController.js
const Dashboard = require('../models/dashboard');
const User = require('../models/user');

// Buscar dashboard
const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.userId;
    
    let dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) {
      dashboard = new Dashboard({ userId });
      await dashboard.save();
    }

    const user = await User.findById(userId);

    res.json({
      success: true,
      dashboard,
      user: {
        nome: user.profile?.nome || user.username,
        plano: user.plano
      }
    });
  } catch (error) {
    next(error);
  }
};

// Registrar scan
const registrarScan = async (req, res, next) => {
  try {
    const userId = req.userId;
    const scanData = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId },
      { 
        $push: { scans: scanData },
        $inc: { 'estatisticas.totalScans': 1 }
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      dashboard
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardData,
  registrarScan
};