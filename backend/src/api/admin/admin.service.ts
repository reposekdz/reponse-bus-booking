import Company from '../companies/company.model';
import User from '../users/user.model';
import { AppError } from '../../utils/AppError';

// --- Company Services ---
export const createCompany = async (companyData: any) => {
    const { name, ownerName, ownerEmail, password, ...contactDetails } = companyData;

    // Check if a user with this email already exists
    const userExists = await User.findOne({ email: ownerEmail });
    if (userExists) {
        throw new AppError('A user with this email already exists and cannot be assigned as a company owner.', 400);
    }
    
    // Create the company manager user
    const owner = await User.create({
        name: ownerName,
        email: ownerEmail,
        password: password,
        role: 'company',
    });

    const company = await Company.create({
        name,
        contact: contactDetails,
        owner: owner._id,
        status: 'Active'
    });
    
    // Link company back to user
    // FIX: Cast company._id to 'any' to resolve ObjectId type mismatch error.
    owner.company = company._id as any;
    await owner.save();

    return company;
};

export const getAllCompanies = async () => {
    return Company.find().populate('owner', 'name email');
};

export const updateCompanyById = async (id: string, updateData: any) => {
    const company = await Company.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    if (!company) {
        throw new AppError('Company not found', 404);
    }
    return company;
};

export const deleteCompanyById = async (id: string) => {
    const company = await Company.findById(id);
    if (!company) {
        throw new AppError('Company not found', 404);
    }
    // In a real app, you'd handle cascading deletes (buses, routes, etc.)
    await company.deleteOne();
    return;
};


// --- Driver Services ---
export const createDriver = async (driverData: any) => {
    const { name, email, password, phone, companyId } = driverData;
    const company = await Company.findById(companyId);
    if (!company) {
        throw new AppError('Company not found', 404);
    }
    const driver = await User.create({ name, email, password, phone, role: 'driver', company: companyId });
    const driverResponse = driver.toObject();
    delete driverResponse.password;
    return driverResponse;
};

export const getAllDrivers = async () => {
    return User.find({ role: 'driver' }).populate('company', 'name');
};

export const updateDriverById = async (id: string, updateData: any) => {
    // Admins shouldn't change passwords here
    delete updateData.password;
    
    const driver = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!driver || driver.role !== 'driver') {
        throw new AppError('Driver not found', 404);
    }
    return driver;
};

export const deleteDriverById = async (id: string) => {
    const driver = await User.findById(id);
    if (!driver || driver.role !== 'driver') {
        throw new AppError('Driver not found', 404);
    }
    await driver.deleteOne();
    return;
};


// --- Agent Services ---
export const createAgent = async (agentData: any) => {
    const { name, email, password, phone, location, commissionRate, avatarUrl } = agentData;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new AppError('User with this email already exists.', 400);
    }
    
    const agent = await User.create({
        name,
        email,
        password,
        phone,
        role: 'agent',
        location,
        commissionRate,
        avatarUrl,
    });

    const agentResponse = agent.toObject();
    delete agentResponse.password;

    return agentResponse;
};

export const getAllAgents = async () => {
    return User.find({ role: 'agent' });
};

export const updateAgentById = async (id: string, updateData: any) => {
    delete updateData.password; // Password should be changed through a separate process
    const agent = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!agent || agent.role !== 'agent') {
        throw new AppError('Agent not found', 404);
    }
    return agent;
};

export const deleteAgentById = async (id: string) => {
    const agent = await User.findById(id);
    if (!agent || agent.role !== 'agent') {
        throw new AppError('Agent not found', 404);
    }
    await agent.deleteOne();
    return;
};


// --- User Services ---
export const getAllUsers = async () => {
    return User.find().populate('company', 'name');
};