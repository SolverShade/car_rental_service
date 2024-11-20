import './styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <h3>{customer.first_name} {customer.last_name}</h3>
    <p><strong>Email:</strong> {customer.email}</p>
    <p><strong>Phone:</strong> {customer.phone_number}</p>
    <p className="account-status"><strong>Status: Active</strong></p>
    <button className="btn" onClick={() => onViewCustomer(customer)}>View Customer</button>
  </div>
);

// Customer Modal Component
const CustomerModal = ({ customer, isOpen, onClose, onSave, onCloseAccount }) => {
  const [formData, setFormData] = useState(customer || {});

  if (!isOpen) return null;

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerId = parseInt(sessionStorage.getItem('currentCustomerId'), 10);

    console.log(formData.first_name);

    try {
      await axios.put(`http://localhost:5000/update_customer_first_name/${customerId}`, { first_name: formData.first_name });
      await axios.put(`http://localhost:5000/update_customer_last_name/${customerId}`, { last_name: formData.last_name });
      await axios.put(`http://localhost:5000/update_customer_email/${customerId}`, { email: formData.email });
      await axios.put(`http://localhost:5000/update_customer_phone/${customerId}`, { phone_number: formData.phone_number });

      console.log('Customer details updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Customer Details</h2>
        <form id="customerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
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
            id="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone"
            required
          />
          <div className="filter">
            <label>Account Status:</label>
            <span id="accountStatus" className="status-label">
              Active
            </span>
          </div>

          <div className="button-container">
            <button type="submit" className="btn" onClick={handleSubmit}>Save Changes</button>
            <button
              type="button"
              className="btn"
              onClick={() => onCloseAccount(formData)}
            >
              Close Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customers`);
        setCustomers(response.data);

      } catch (error) {
        console.error('Error fetching customers from database:', error);
      }
    };

    getCustomers();
  }, [customers]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filterCustomers = () => {
    return customers.filter(customer => {
      const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      // Main search
      const matchesSearch =
        fullName.includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone_number.toLowerCase().includes(searchLower);

      // Individual filters
      const matchesFilters =
        fullName.includes(filters.name.toLowerCase()) &&
        customer.phone_number.toLowerCase().includes(filters.phone.toLowerCase()) &&
        customer.email.toLowerCase().includes(filters.email.toLowerCase())

      return matchesSearch && matchesFilters;
    });
  };

  const handleViewCustomer = (customer) => {
    sessionStorage.setItem('currentCustomerId', customer.id);
    console.log(customer);
    console.log(customer.first_name);
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
    if (window.confirm(`Are you sure you want to close the account for ${customer.first_name} ${customer.last_name}?`)) {
      axios.delete(`http://localhost:5000/delete_customer/${customer.id}`)
        .then(response => {
          setCustomers(prevCustomers =>
            prevCustomers.map(c =>
              c.id === customer.id
                ? { ...c, accountStatus: 'Complete' }
                : c
            )
          );
          handleCloseModal();
        })
        .catch(error => {
          console.error('There was an error closing the account!', error);
        });
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
