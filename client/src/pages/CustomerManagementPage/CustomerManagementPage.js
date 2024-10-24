import React, { useState } from 'react';
import './styles.css';

// Initial customer data
const initialCustomers = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St, Anytown, USA",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        billingInfo: "Visa ****1234",
        carMake: "Toyota",
        carModel: "Camry",
        carYear: 2022,
        carVin: "1HGBH41JXMN109186",
        accountStatus: "Active",
        paymentHistory: [
            { date: "2024-09-15", amount: "$150.00", status: "Paid" },
            { date: "2024-08-22", amount: "$200.00", status: "Paid" },
            { date: "2024-07-10", amount: "$175.00", status: "Paid" }
        ]
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        address: "456 Elm St, Othertown, USA",
        email: "jane.smith@example.com",
        phone: "(555) 987-6543",
        billingInfo: "Mastercard ****5678",
        carMake: "Honda",
        carModel: "Civic",
        carYear: 2023,
        carVin: "2HGES16515H562724",
        accountStatus: "Active",
        paymentHistory: [
            { date: "2024-09-20", amount: "$180.00", status: "Paid" },
            { date: "2024-08-15", amount: "$220.00", status: "Paid" }
        ]
    },
    {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        address: "789 Oak St, Anothercity, USA",
        email: "bob.johnson@example.com",
        phone: "(555) 246-8135",
        billingInfo: "American Express ****9012",
        carMake: "Ford",
        carModel: "Mustang",
        carYear: 2024,
        carVin: "1FATP8UH3K5159596",
        accountStatus: "Active",
        paymentHistory: [
            { date: "2024-09-25", amount: "$190.00", status: "Paid" },
            { date: "2024-08-18", amount: "$210.00", status: "Paid" },
            { date: "2024-07-22", amount: "$165.00", status: "Paid" }
        ]
    }
];

// Filter Component
const FilterSection = ({ filters, onFilterChange }) => (
    <div className="filter-container">
        <h2>Filters</h2>
        {Object.entries(filters).map(([key, value]) => (
            <div className="filter" key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                    type="text"
                    id={key}
                    value={value}
                    onChange={(e) => onFilterChange(key, e.target.value)}
                    placeholder={`Filter by ${key.toLowerCase()}`}
                />
            </div>
        ))}
    </div>
);

// Customer Card Component
const CustomerCard = ({ customer, onViewCustomer }) => (
    <div className="customer-card">
        <h3>{customer.firstName} {customer.lastName}</h3>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Car:</strong> {customer.carYear} {customer.carMake} {customer.carModel}</p>
        <p><strong>VIN:</strong> {customer.carVin}</p>
        <p className="account-status"><strong>Status:</strong> {customer.accountStatus}</p>
        <button className="btn" onClick={() => onViewCustomer(customer)}>View Customer</button>
    </div>
);

// Customer Modal Component
const CustomerModal = ({ customer, isOpen, onClose, onSave, onCloseAccount }) => {
    const [formData, setFormData] = useState(customer || {});

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="modal" style={{display: 'block'}}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Customer Details</h2>
                <form id="customerForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        required
                    />
                    <input
                        type="text"
                        id="billingInfo"
                        value={formData.billingInfo}
                        onChange={handleInputChange}
                        placeholder="Billing Information"
                        required
                    />

                    <table className="car-info">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>VIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        id="carMake"
                                        value={formData.carMake}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="carModel"
                                        value={formData.carModel}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        id="carYear"
                                        value={formData.carYear}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="carVin"
                                        value={formData.carVin}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="filter">
                        <label>Account Status:</label>
                        <span id="accountStatus" className="status-label">
                            {formData.accountStatus}
                        </span>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn">Save Changes</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => onCloseAccount(formData)}
                        >
                            Close Account
                        </button>
                    </div>
                </form>

                <div className="payment-history">
                    <h3>Payment History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Car Make</th>
                                <th>Car Model</th>
                                <th>Car Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.paymentHistory?.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.date}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.status}</td>
                                    <td>{formData.carMake}</td>
                                    <td>{formData.carModel}</td>
                                    <td>{formData.carYear}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Main Component
const CustomerManagementPage = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        make: '',
        model: '',
        year: '',
        vin: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const filterCustomers = () => {
        return customers.filter(customer => {
            const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            // Main search
            const matchesSearch = 
                fullName.includes(searchLower) ||
                customer.address.toLowerCase().includes(searchLower) ||
                customer.email.toLowerCase().includes(searchLower) ||
                customer.phone.toLowerCase().includes(searchLower) ||
                customer.carMake.toLowerCase().includes(searchLower) ||
                customer.carModel.toLowerCase().includes(searchLower) ||
                customer.carYear.toString().includes(searchLower) ||
                customer.carVin.toLowerCase().includes(searchLower);

            // Individual filters
            const matchesFilters = 
                fullName.includes(filters.name.toLowerCase()) &&
                customer.address.toLowerCase().includes(filters.location.toLowerCase()) &&
                customer.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
                customer.email.toLowerCase().includes(filters.email.toLowerCase()) &&
                customer.carMake.toLowerCase().includes(filters.make.toLowerCase()) &&
                customer.carModel.toLowerCase().includes(filters.model.toLowerCase()) &&
                customer.carYear.toString().includes(filters.year.toLowerCase()) &&
                customer.carVin.toLowerCase().includes(filters.vin.toLowerCase());

            return matchesSearch && matchesFilters;
        });
    };

    const handleViewCustomer = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleSaveCustomer = (updatedCustomer) => {
        setCustomers(prevCustomers =>
            prevCustomers.map(customer =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        handleCloseModal();
    };

    const handleCloseAccount = (customer) => {
        if (window.confirm(`Are you sure you want to close the account for ${customer.firstName} ${customer.lastName}?`)) {
            setCustomers(prevCustomers =>
                prevCustomers.map(c =>
                    c.id === customer.id
                        ? { ...c, accountStatus: 'Complete' }
                        : c
                )
            );
            handleCloseModal();
        }
    };

    const filteredCustomers = filterCustomers();

    return (
        <div>


            <div className="container">
                <FilterSection
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className="customer-container">
                    <h1>Customer Management</h1>
                    <input
                        type="text"
                        id="searchBar"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div id="customerCards">
                        {filteredCustomers.length === 0 ? (
                            <p>No customers found.</p>
                        ) : (
                            filteredCustomers.map(customer => (
                                <CustomerCard
                                    key={customer.id}
                                    customer={customer}
                                    onViewCustomer={handleViewCustomer}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CustomerModal
                    customer={selectedCustomer}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveCustomer}
                    onCloseAccount={handleCloseAccount}
                />
            )}
        </div>
    );
};

export default CustomerManagementPage;